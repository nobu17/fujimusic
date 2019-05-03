/* eslint-disable no-console */
import { APIBase, ApiError } from "./common/apibase";
import { AppEnv } from "./common/appenv";
//import { AppEnv } from "./common/appenv";
import firebase from "../../firebase/index";
import base64ToBlob from "b64-to-blob";

// アルバムストア
export const Album = {
  namespaced: true,
  state: {
    //アルバム一覧
    albumList: [],
    //現在表示のアルバム
    displayAlbumInfo: null,
    //編集前のアルバム情報
    beforeEditDisplayAlbumInfo: null
  },
  getters: {
    albumList: state => state.albumList,
    displayAlbumInfo: state => state.displayAlbumInfo
  },
  mutations: {
    setAlbumList(state, { albumList }) {
      state.albumList = albumList;
    },
    setDisplayAlbumInfo(state, { displayAlbumInfo }) {
      state.displayAlbumInfo = displayAlbumInfo;
      state.beforeEditDisplayAlbumInfo = JSON.parse(
        JSON.stringify(displayAlbumInfo)
      );
    }
  },
  actions: {
    //新規作成アルバム情報を読み込む
    async readNewAlbumInfo(context) {
      const newAlbum = api.readNewAlbumInfo();
      context.commit("setDisplayAlbumInfo", {
        displayAlbumInfo: newAlbum
      });
    },
    // 現在のアルバムを読み込む
    async readAlbumList(context, { isForceCacheOff, success, error }) {
      try {
        if (!isForceCacheOff) {
          isForceCacheOff = false;
        }
        const albumList = await api.readAlbumList(isForceCacheOff);
        context.commit("setAlbumList", {
          albumList: albumList
        });
        console.log(albumList);
        success();
      } catch (err) {
        console.error("read error", err);
        error(err);
      }
    },
    // 指定されたアルバムIDの情報を表示用として読み込む
    async readDisplayAlbumInfo(
      context,
      { albumId, isForceCacheOff, success, error }
    ) {
      // ステートにあるかを確認なければいったん読み込む
      const alb = Album.getAlbum(context, albumId);
      if (alb) {
        success();
      } else {
        await context.dispatch("readAlbumList", {
          isForceCacheOff: isForceCacheOff,
          success: () => {
            const alb2 = Album.getAlbum(context, albumId);
            if (alb2) {
              success();
            } else {
              error(new Error("no data"));
            }
          },
          error: err => {
            console.log("readdsipaly error", err);
            error(err);
          }
        });
      }
    },
    // アルバムを削除
    async deleteAlbum(context, { albumId, success, error }) {
      const alb = Album.getAlbum(context, albumId);
      if (alb) {
        try {
          await api.deleteAlbum(albumId);
          await context.dispatch("readAlbumList", { success, error });
          return;
        } catch (err) {
          error(err);
          return;
        }
      } else {
        error("指定されたアルバムIDが見つかりません。");
        return;
      }
    },
    // 表示コミットする
    async commitDisplayAlbumInfo(context, { success, error }) {
      const disp = context.state.displayAlbumInfo;
      // 全てのファイルが空ならばエラー
      const availableDataList = disp.imageList.filter(
        elm => elm.fileName !== ""
      );
      if (!availableDataList || availableDataList.length === 0) {
        error("アルバム画像が一枚も選択されていません。");
        return;
      }
      if (!disp.thumbnail.fileUrl || disp.thumbnail.fileUrl === "") {
        error("サムネイル画像を選択してください。");
        return;
      }

      const form = new FormData();
      if (disp.albumId && disp.albumId !== "") {
        console.log("id", disp.albumId);
        form.append("albumId", disp.albumId);
      }
      form.append("albumTitle", disp.title);
      form.append("albumDescritpion", disp.description);
      form.append("eventDate", disp.eventDateStr);

      if (disp.thumbnail.fileUrl.startsWith("data")) {
        form.append(
          "thumbnail",
          base64ToBlob(disp.thumbnail.fileUrl.replace(/^.*,/, ""), "image/jpg")
        );
      }

      const existsList = [];
      const moveImages = [];
      let counter = 1;
      // 変更前データと突き合わせて新規、リネーム、削除に分ける
      for (const image of availableDataList) {
        // 新規アップロード jpgで統一
        const fileName = counter;
        if (image.fileUrl.startsWith("data")) {
          form.append(
            fileName,
            base64ToBlob(image.fileUrl.replace(/^.*,/, ""), "image/jpg")
          );
        } else if (image.fileUrl.startsWith("http")) {
          // 既存データの場合、ファイル名とカウンターの比較(削除時に連番が変わる)
          const fileWithExt = fileName + ".jpg";
          if (image.fileName !== fileWithExt) {
            // 置換リストに格納
            moveImages.push(image.fileName + ":" + fileWithExt);
          }
          existsList.push(image);
        }
        counter++;
      }

      if (moveImages.length > 0) {
        console.log("moveImages", moveImages.join(","));
        form.append("moveImages", moveImages.join(","));
      }
      // 変更後のリストに含まれていない画像は削除対象
      const removeImages = [];
      const before = context.state.beforeEditDisplayAlbumInfo.imageList.filter(
        elm => elm.fileName !== ""
      );

      for (const image of before) {
        if (!existsList.some(elm => elm.fileName === image.fileName)) {
          removeImages.push(image.fileName);
        }
      }
      if (removeImages.length > 0) {
        console.log("removeImages", removeImages.join(","));
        form.append("removeImages", removeImages.join(","));
      }
      try {
        await api.commitAlbumInfo(form);
        success();
      } catch (err) {
        error(err);
      }
    }
  }
};

Album.getAlbum = (context, albumId) => {
  // ステートにあるかを確認なければいったん読み込む
  const alb = context.state.albumList.find(elm => elm.albumId === albumId);
  console.log("get res", albumId);
  if (alb) {
    context.commit("setDisplayAlbumInfo", {
      displayAlbumInfo: alb
    });
  }
  return alb;
};

export class AlbumApi extends APIBase {
  constructor() {
    super(AppEnv.albumApiUrl, AppEnv.albumApiKey);
    this.maxImageCount = 15;
    this.database = firebase.firestore();
  }
  readNewAlbumInfo() {
    const alb = {
      eventDate: new Date(),
      eventDateStr: new Date().toISOString().substr(0, 10),
      thumbnail: { fileName: "", fileUrl: "" },
      imageList: [],
      title: "",
      description: ""
    };
    // 最大数まで空データを追加
    for (let i = 0; i < this.maxImageCount; i++) {
      alb.imageList.push({ fileName: "", fileUrl: "" });
    }
    return alb;
  }
  async readAlbumList(isForceCacheOff) {
    const snapShot = await this.database
      .collection("albumInfo")
      .orderBy("eventDate", "desc")
      .get();
    //console.log(snapShot.docs);
    // idはfirestore固有の処理なのでalbumIdに変換する
    return snapShot.docs.map(m => {
      let temp = m.data();
      temp.albumId = m.id;
      // timestamp形式から文字列の日付形式に変更
      temp.eventDateStr = temp.eventDate
        .toDate()
        .toISOString()
        .substr(0, 10);

      temp.thumbnail = {
        fileName: "thumb.jpg",
        fileUrl: this.getUrl(isForceCacheOff, temp.thumbnail)
      };

      // ファイル名は自動付与
      const altImageList = [];
      let count = 1;
      for (const image of temp.imageList) {
        altImageList.push({
          fileName: count + ".jpg",
          fileUrl: this.getUrl(isForceCacheOff, image)
        });
        count++;
      }
      // 最大数まで空データを追加
      for (let i = temp.imageList.length; i < this.maxImageCount; i++) {
        altImageList.push({ fileName: "", fileUrl: "" });
      }
      temp.imageList = altImageList;
      return temp;
    });
  }
  async deleteAlbum(albumId) {
    try {
      const albumIdList = { albumIdList: [albumId] };
      console.log("api call", albumIdList);
      const res = await super.delete(albumIdList);
      console.log("api res", res);
      return res;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
  async commitAlbumInfo(form) {
    try {
      console.log("api call", form);
      const res = await super.postWithMultiPartData(form);
      console.log("api res", res);
      return res;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
  // キャッシュ無効化用にランダム値を付与したURLを取得
  getUrl(isForceCacheOff, url) {
    if (isForceCacheOff) {
      return url + "&rand=" + this.getRandomInt();
    }
    return url;
  }
  getRandomInt() {
    return Math.floor(Math.random() * Math.floor(9999));
  }
}

const api = new AlbumApi();

export default Album;
