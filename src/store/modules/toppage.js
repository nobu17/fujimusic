/* eslint-disable no-console */
import base64ToBlob from "b64-to-blob";

import { APIBase, ApiError } from "./common/apibase";
import { AppEnv } from "./common/appenv";

// トップページ
export const TopPage = {
  namespaced: true,
  state: {
    imageList: []
  },
  getters: {
    imageList: state => state.imageList
  },
  mutations: {
    setImageList(state, { imageList }) {
      state.imageList = imageList;
    }
  },
  actions: {
    // トップ画像の投稿
    async postTopImageList(context, { imageList, success, error }) {
      const form = new FormData();
      let counter = 0;
      let addCount = 0;
      // フィールド名はクラスIDから付与
      for (const imageFile of imageList) {
        //既にアップロード済みのものは除外
        if (imageFile.fileUrl && imageFile.fileUrl.startsWith("data")) {
          const fName = counter + 1;
          let extension = imageFile.fileName
            .split(".")
            .pop()
            .toLowerCase();
          if (extension === "jpeg") {
            extension == "jpg";
          }
          form.append(
            fName,
            base64ToBlob(
              imageFile.fileUrl.replace(/^.*,/, ""),
              "image/" + extension
            )
          );
          addCount++;
        }
        counter++;
      }
      // 新規アップロードが無ければ除外
      if (addCount === 0) {
        console.log("there are no file to upload");
        success({ successFileList: [], failFileList: [] });
        return;
      }

      try {
        const result = await api.postTopImages(form);
        if (result) {
          success(result);
          return;
        }
        error(new Error("un expected error"));
      } catch (err) {
        console.log("api err", err);
        error(err);
        return;
      }
    },
    // トップページ画像のUrlをロード
    async loadTopImageList(context, { isPassCheckUrl, success, error }) {
      try {
        const imageList = await api.loadTopImages(isPassCheckUrl);
        //空のデータを補充
        const ren = imageList.length;
        for (let i = ren; i < 3; i++) {
          imageList.push({ fileName: "", fileUrl: "" });
        }
        context.commit("setImageList", { imageList });
        success();
        return;
      } catch (err) {
        error(err);
        return;
      }
    }
  }
};

class TopPageApi extends APIBase {
  constructor() {
    super(AppEnv.topPageApiUrl, AppEnv.topPageApiKey);
  }
  // トップ画像の投稿
  async postTopImages(formData) {
    try {
      console.log("api call", formData);
      const info = await api.postWithMultiPartData(formData);
      console.log("api res", info);
      if (info.data && info.data.successFileList.length >= 1) {
        return {
          successFileList: info.data.successFileList,
          failFileList: info.data.failFileList
        };
      } else if (info.data.failFileList.length >= 1) {
        throw new Error("post images is error");
      }
      return null;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
  // トップページ画像の読み込み
  async loadTopImages(isPassCheckUrl) {
    //トップ画像はAPI使わずに決め打ちで取得
    const availableImageList = [];
    const imageUrls = ["1.jpg", "2.jpg", "3.jpg"];
    for (const image of imageUrls) {
      try {
        const imageUrl = AppEnv.topPageImageBaseUrl + image + "?alt=media";
        console.log(imageUrl);
        // 高速化用にチェック有無を選択
        //チェック無しならば無条件格納
        if (!isPassCheckUrl) {
          // GETリクエストが通ったら格納
          await this.checkExistsImage(imageUrl);
        }

        availableImageList.push({ fileName: image, fileUrl: imageUrl });
      } catch (err) {
        console.log("not eixst");
      }
    }
    if (availableImageList.length === 0) {
      throw new ApiError("no available images", 404);
    }
    return availableImageList;
  }
  // イメージをロードさせて有効なリンクか判断する
  checkExistsImage(path) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = path;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  }
}
const api = new TopPageApi();

export default TopPage;
