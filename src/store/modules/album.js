/* eslint-disable no-console */
import { APIBase } from "./common/apibase";
//import { AppEnv } from "./common/appenv";
import firebase from "../../firebase/index";

// アルバムストア
export const Album = {
  namespaced: true,
  state: {
    //アルバム一覧
    albumList: [],
    //現在表示のアルバム
    displayAlbumInfo: null
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
    }
  },
  actions: {
    // 現在のアルバムを読み込む
    async readAlbumList(context, { success, error }) {
      try {
        const albumList = await api.readAlbumList();
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
    async readDisplayAlbumInfo(context, { albumId, success, error }) {
      // ステートにあるかを確認なければいったん読み込む
      const alb = Album.getAlbum(context, albumId);
      if (alb) {
        success();
      } else {
        console.log("dispach st");
        await context.dispatch("readAlbumList", {
          success: () => {
            console.log("dispach ed");
            const alb2 = Album.getAlbum(context, albumId);
            if (alb2) {
              success();
            } else {
              console.log("readdsipaly no data");
              error(new Error("no data"));
            }
          },
          error: err => {
            console.log("readdsipaly error", err);
            error(err);
          }
        });
      }
    }
  }
};

Album.getAlbum = (context, albumId) => {
  // ステートにあるかを確認なければいったん読み込む
  const alb = context.state.albumList.find(elm => elm.albumId === albumId);
  console.log("get res", albumId)
  if (alb) {
    context.commit("setDisplayAlbumInfo", {
      displayAlbumInfo: alb
    });
  }
  return alb;
};

export class AlbumApi extends APIBase {
  constructor() {
    super();
    this.database = firebase.firestore();
  }
  async readAlbumList() {
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
      temp.eventDateStr = temp.eventDate.toDate().toLocaleDateString();
      return temp;
    });
  }
}

const api = new AlbumApi();

export default Album;
