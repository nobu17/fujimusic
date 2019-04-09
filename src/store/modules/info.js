/* eslint-disable no-console */
import { APIBase, ApiError } from "./common/apibase";
import { AppEnv } from "./common/appenv";

// お知らせストア
export const Info = {
  namespaced: true,
  state: {
    perMonthItemList: {}, // key:yyyy-mm value:infolist
    currentMonthInfoList: [],
    dateList: []
  },
  getters: {
    currentMonthInfoList: state => state.currentMonthInfoList,   
    dateList: state => state.dateList
  },
  mutations: {
    changeDateList(state, { dateList }) {
      state.dateList = dateList;
    },
    // 現在日時の投稿一覧へ変更
    changeCurrentMonthInfoList(state, { currentMonthInfoList }) {
      state.currentMonthInfoList = currentMonthInfoList;
    },
    // 1か月分のデータを格納
    addPerMonthItemList(state, { dateKey, oneMonthPerMonthItemList }) {
      state.perMonthItemList[dateKey] = oneMonthPerMonthItemList;
    },
    // 投稿の削除
    deleteInfo(state, { id, dateKey }) {
      if (state.perMonthItemList[dateKey]) {
        // 同一IDのデータを削除
        for (let i = 0; i < state.perMonthItemList[dateKey].length; i++) {
          if (state.perMonthItemList[dateKey][i].id === id) {
            state.perMonthItemList[dateKey].splice(i, 1);
            break;
          }
        }
        //レコードがなくなったら一覧から消す
        console.log("dellength", state.perMonthItemList[dateKey].length);
        if (state.perMonthItemList[dateKey].length === 0) {
          delete state.perMonthItemList[dateKey];
          for (let i = 0; i < state.dateList.length; i++) {
            if (state.dateList[i].date === dateKey) {
              state.dateList.splice(i, 1);
              break;
            }
          }
        }
      }
    },
    // 記事を追加
    addInfo(state, { info }) {
      const dKey = info.postDate.substr(0, 7);
      if (state.perMonthItemList[dKey]) {
        state.perMonthItemList[dKey].push(info);
        //記事の日付順に並び替え
        state.perMonthItemList[dKey] = util.sortInfoList(
          state.perMonthItemList[dKey]
        );
      } else {
        state.perMonthItemList[dKey] = [info];
        //キー一覧に追加
        state.dateList.push({ date: dKey });
        //一覧を日付順に並び替え
        state.dateList = util.sortDateList(state.dateList);
      }
    }
  },
  actions: {
    // 日付一覧を読み込む
    async readDateList(context, { success, error }) {
      try {
        const dateList = await api.readDateList();
        context.commit("changeDateList", { dateList });
        success();
        return;
      } catch (err) {
        error(err);
        return;
      }
    },
    // 指定された年月のデータを現在の一覧に格納する
    async readTargetMonthInfo(context, { selectDate, success, error }) {
      // 現在のリスト内に保存されていないデータの場合
      const list = context.state.perMonthItemList;
      const dateList = context.state.dateList;
      //console.log("dateList", dateList);
      // 一覧にあれば
      if (!dateList.some(d => d.date === selectDate)) {
        error(new Error("no list in selectedDate"));
        return;
      }
      //キャッシュ内にあればそのまま格納なければAPIで取得
      if (list[selectDate]) {
        const itm = list[selectDate];
        context.commit("changeCurrentMonthInfoList", {
          currentMonthInfoList: itm
        });
        success();
        return;
      }
      try {
        const infoList = await api.readTargetMonthInfo(selectDate);
        // キャッシュ追加
        context.commit("addPerMonthItemList", {
          dateKey: selectDate,
          oneMonthPerMonthItemList: infoList
        });
        // 一覧を表示
        context.commit("changeCurrentMonthInfoList", {
          currentMonthInfoList: infoList
        });
        success();
      } catch (err) {
        error(err);
        return;
      }
    },
    // 新規投稿
    async postNewInfo(context, { info, success, error }) {
      try {
        const result = await api.postNewInfo(info);
        if (result) {
          //結果を格納
          context.commit("addInfo", {
            info: result
          });
          success();
          return;
        }
        error(new Error("unexpected error"));
      } catch (err) {
        error(err);
        return;
      }
    },
    // 編集
    async editInfo(context, { info, success, error }) {
      try {
        // 変更前のID保持
        const beforeId = info.id;
        // 日付をIDから取得
        const beforeDate = beforeId.substr(0, 7);
        const result = await api.editInfo(info);
        if (result) {
          //結果を格納
          context.commit("addInfo", {
            info: result
          });
          //変更前のデータを削除
          context.commit("deleteInfo", {
            id: beforeId,
            dateKey: beforeDate
          });
          success();
          return;
        }
        error(new Error("unexpected error"));
      } catch (err) {
        console.log("api err", err);
        error(err);
        return;
      }
    },
    // 削除
    async deleteInfo(context, { info, success, error }) {
      try {
        // 変更前のID保持
        const beforeId = info.id;
        // 日付をIDから取得
        const beforeDate = beforeId.substr(0, 7);
        // ID以外は不要なのでカット
        await api.deleteInfo({ id: info.id });
        //変更前のデータを削除
        context.commit("deleteInfo", {
          id: beforeId,
          dateKey: beforeDate
        });
        success();
        return;
      } catch (err) {
        error(err);
        return;
      }
    }
  }
};

class InfoApi extends APIBase {
  constructor() {
    super(AppEnv.infoApiUrl, AppEnv.infoApiKey);
  }
  // 日付一覧を読み込む
  async readDateList() {
    const apiQuery = "?mode=dateList&listType=yearAndMonthList";
    try {
      //console.log("api call");
      const rawList = await api.get(apiQuery);
      //console.log("api res", rawList);
      let dateList = [];
      if (rawList.data.dateList) {
        // apiは文字列のArrayなのでオブジェクトに変換
        for (const d of rawList.data.dateList) {
          dateList.push({ date: d });
        }
        //ソート
        dateList = util.sortDateList(dateList);
      }
      return dateList;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
  // 指定年月の記事を読み込む
  async readTargetMonthInfo(selectDate) {
    // yyyy-mmからyyyymmにして送信
    const apiQuery =
      "?mode=date&start=" + selectDate.replace("-", "") + "&monthCount=1";
    try {
      //console.log("api call");
      const rawList = await api.get(apiQuery);
      //console.log("api res", rawList);
      let infoList = rawList.data.infoList;
      infoList = infoList.map(x => util.getDecodedInfo(x));
      //console.log("infoList", infoList);
      return infoList;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
  // 新規投稿
  async postNewInfo(info) {
    return await this.postInfo({
      postType: "make",
      postInfo: util.getEscapedInfo(info)
    });
  }
  // 編集
  async editInfo(info) {
    return await this.postInfo({
      postType: "edit",
      postInfo: util.getEscapedInfo(info)
    });
  }
  // 削除
  async deleteInfo(info) {
    return await this.postInfo({
      postType: "delete",
      postInfo: info
    });
  }
  async postInfo(req) {
    try {
      const result = await api.post(req);
      if(result.data.storedInfo){
          return util.getDecodedInfo(result.data.storedInfo);
      }
      return result.data.storedInfo;
    } catch (err) {
      console.log("api error", err);
      throw new ApiError("api call error", err.response.status);
    }
  }
}

const api = new InfoApi();

class Util {
  sortInfoList(infoList) {
    //並び替え
    return infoList.sort((n1, n2) => {
      if (n1.postDate > n2.postDate) {
        return -1;
      }
      if (n1.postDate < n2.postDate) {
        return 1;
      }
      return 0;
    });
  }
  sortDateList(dateList) {
    //並び替え
    return dateList.sort((n1, n2) => {
      if (n1.date > n2.date) {
        return -1;
      }
      if (n1.date < n2.date) {
        return 1;
      }
      return 0;
    });
  }
  getEscapedInfo(info) {
    info.title = this.escapeHtml(info.title);
    info.content = this.escapeHtml(info.content);
    return info;
  }
  getDecodedInfo(info) {
    info.title = this.decodeHtml(info.title);
    info.content = this.decodeHtml(info.content);
    return info;      
  }
  escapeHtml(string) {
    if (typeof string !== "string") {
      return string;
    }
    return string.replace(/[&'`"<>]/g, function(match) {
      return {
        "&": "&amp;",
        "'": "&#x27;",
        "`": "&#x60;",
        '"': "&quot;",
        "<": "&lt;",
        ">": "&gt;"
      }[match];
    });
  }
  decodeHtml(string) {
    return string
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&#044;/g, ",")
      .replace(/&amp;/g, "&");
  }
}
const util = new Util();

export default Info;
