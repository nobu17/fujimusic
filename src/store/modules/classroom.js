/* eslint-disable no-console */
import { APIBase, ApiError } from "./common/apibase";
import { AppEnv } from "./common/appenv";
import firebase from "../../firebase/index";
import base64ToBlob from "b64-to-blob";
import StringUtil from "../../util/stringUtil";

// 教室情報
export const ClassRoom = {
  namespaced: true,
  state: {
    classInfoList: [],
    currentClassInfo: {}
  },
  getters: {
    classInfoList: state => state.classInfoList,
    currentClassInfo: state => state.currentClassInfo,
    getClassInfoById: state => classId => {
      return state.classInfoList[classId];
    }
  },
  mutations: {
    addClassInfo(state, { classId, classInfo }) {
      state.classInfoList[classId] = classInfo;
      //現在のクラスを設定
      state.currentClassInfo = classInfo;
    },
    clearCurrentClassInfo(state) {
      state.currentClassInfo = {};
    },
    changeClassInfoList(state, { classInfoList }) {
      state.classInfoList = classInfoList;
    }
  },
  actions: {
    async readMultileClass(context, { classIdList, success, error }) {
      try {
        const result = await api.readClassInfoList(classIdList);
        console.log("result", result);
        if (result) {
          for (const classroom of result) {
            //画像は3個まで指定
            if (classroom.imageList.length > 3) {
              classroom.imageList = result.imageList.slice(0, 2);
            } else {
              //ない場合は空のデータを補充
              const ren = classroom.imageList.length;
              for (let i = ren; i < 3; i++) {
                classroom.imageList.push({ fileName: "", fileUrl: "" });
              }
            }
            //データを更新
            context.commit("addClassInfo", {
              classId: classroom.classId,
              classInfo: classroom
            });
          }
          success();
          return;
        }
        error(new Error("un expected error"));
      } catch (err) {
        console.log("api err", err);
        error(err);
        return;
      }
    },
    async readClass(context, { classId, success, error }) {
      try {
        const result = await api.readClassInfo(classId);
        //console.log("result", result);
        if (result) {
          //画像は3個まで指定
          if (result.imageList.length > 3) {
            result.imageList = result.imageList.slice(0, 2);
          } else {
            //ない場合は空のデータを補充
            const ren = result.imageList.length;
            for (let i = ren; i < 3; i++) {
              result.imageList.push({ fileName: "", fileUrl: "" });
            }
          }
          //データを更新
          context.commit("addClassInfo", {
            classId: classId,
            classInfo: result
          });
          success();
          return;
        }
        error(new Error("un expected error"));
      } catch (err) {
        console.log("api err", err);
        error(err);
        return;
      }
    },
    async postClass(context, { classInfo, success, error }) {
      try {
        const result = await api.postClassInfo(classInfo);
        if (result) {
          success();
          return;
        }
        error(new Error("un expected error"));
      } catch (err) {
        console.log("api err", err);
        error(err);
        return;
      }
    },
    async postImages(context, { classId, imagesFiles, success, error }) {
      const form = new FormData();
      let counter = 0;
      let addCount = 0;
      // フィールド名はクラスIDから付与
      for (const imageFile of imagesFiles) {
        //既にアップロード済みのものは除外
        if (imageFile.fileUrl && imageFile.fileUrl.startsWith("data")) {
          const fName = classId + "_" + (counter + 1);
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
        const result = await api.postClassImages(form);
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
    }
  }
};

class ClassRoomApi extends APIBase {
  constructor() {
    super(AppEnv.classroomApiUrl, AppEnv.classroomApiKey);
    this.database = firebase.firestore();
  }
  async readClassInfoList(classIdList) {
    const classInfoList = [];
    try {
      for (const claId of classIdList) {
        const info = await this.readClassInfoFromStore(claId);
        if (info) {
          classInfoList.push(info);
        } else {
          console.error("error there is no class:" + claId);
        }
      }
      return classInfoList;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
  async readClassInfo(classId) {
    try {
      const info = await this.readClassInfoFromStore(classId);
      console.log("api res", info);
      return info;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
  async readClassInfoFromStore(classId) {
    const ref = await this.database
      .collection("classRoomInfo")
      .doc(classId)
      .get();
    if (ref.exists) {
      let temp = ref.data();
      temp.classId = ref.id;

      // change the url to obj
      for (let i = 0; i < temp.imageList.length; i++) {
        temp.imageList[i] = {
          fileName: (i + 1).toString() + ".jpg",
          fileUrl: temp.imageList[i]
        };
      }
      // replace new line for filestore
      temp.description = StringUtil.decodeStringForFileStore(temp.description);
      temp.lessonTimes = StringUtil.decodeStringForFileStore(temp.lessonTimes);
      temp.lessonPlace = StringUtil.decodeStringForFileStore(temp.lessonPlace);
      return temp;
    }
    return null;
  }
  async postClassInfo(classInfo) {
    // replace new line for store filestore
    classInfo.description = StringUtil.decodeStringForFileStore(
      classInfo.description
    );
    classInfo.lessonTimes = StringUtil.decodeStringForFileStore(
      classInfo.lessonTimes
    );
    classInfo.lessonPlace = StringUtil.decodeStringForFileStore(
      classInfo.lessonPlace
    );
    const classList = { classList: [classInfo] };
    try {
      console.log("api call", classList);
      const info = await api.post(classList);
      console.log("api res", info);
      if (info.data && info.data.successClassIdList.length >= 1) {
        return info.data.successClassIdList;
      } else if (info.data.failClassIdList.length >= 1) {
        throw new Error("post classinfo is error");
      }
      return null;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
  async postClassImages(formData) {
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
}

const api = new ClassRoomApi();

export default ClassRoom;
