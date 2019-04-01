/* eslint-disable no-console */
import { APIBase } from "./common/apibase";
import { AppEnv } from "./common/appenv";

const tokenKey = "userToken";
// 認証ストア
export const Auth = {
  namespaced: true,
  state: {
    isLoggedIn: false,
    user: null,
    token: ""
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user,
    token: state => {
      if (state.token) {
        return state.token;
      }
      // ストレージにトークンがあれば
      if (localStorage[tokenKey]) {
        return localStorage[tokenKey];
      }
      return null;
    },
    isAdmin: state => {
      if (state.user && state.user.role && state.user.role === "admin") {
        return true;
      }
      return false;
    }
  },
  mutations: {
    changeLoginState(state, { isLoggedIn, token, user }) {
      state.isLoggedIn = isLoggedIn;
      state.token = token;
      state.user = user;
    }
  },
  actions: {
    async loginWithToken(context, { success, error }) {
      const token = localStorage[tokenKey];
      const authInfo = { token: token, method: "authByToken" };
      try {
        const authResult = await api.post(authInfo);
        if (authResult.data) {
          context.commit("changeLoginState", {
            isLoggedIn: true,
            token: authResult.data.token,
            user: { userId: authResult.data.userId, role: authResult.data.role }
          });
          success();
        }
      } catch (err) {
        console.log("api error", err);
        let authErrorResult = {
          isAuthError: false,
          isServerError: false,
          isExpired: false
        };
        // HTTPの結果コードに応じて値をセット
        if (err.response) {
          const status = err.response.status;
          if (status === 401) {
            //期限切れ
            authErrorResult.isExpired = true;
          } else if (status >= 400 && status < 500) {
            authErrorResult.isAuthError = true;
          } else if (status >= 500 && status < 600) {
            authErrorResult.isServerError = true;
          }
        }
        error(authErrorResult);
      }
    },
    // ログイン処理(authInfo:{ userId, password })
    async login(context, { authInfo, success, error }) {
      try {
        authInfo.method = "auth";
        const authResult = await api.post(authInfo);
        if (authResult.data) {
          context.commit("changeLoginState", {
            isLoggedIn: true,
            token: authResult.data.token,
            user: { userId: authResult.data.userId, role: authResult.data.role }
          });
          // トークンを保存
          localStorage[tokenKey] = authResult.data.token;
          success();
        } else {
          error("exceptional error");
        }
      } catch (err) {
        console.log("api error", err);
        let authErrorResult = { isAuthError: false, isServerError: false };
        // HTTPの結果コードに応じて値をセット
        if (err.response) {
          const status = err.response.status;
          if (status >= 400 && status < 500) {
            authErrorResult.isAuthError = true;
          } else if (status >= 500 && status < 600) {
            authErrorResult.isServerError = true;
          }
        }
        error(authErrorResult);
      }
    },
    logout(context) {
      context.commit("changeLoginState", {
        isLoggedIn: false,
        token: "",
        user: null
      });
      // トークン削除
      if (localStorage[tokenKey]) {
        localStorage.removeItem(tokenKey);
      }
    }
  }
};

class AuthApi extends APIBase {
  constructor() {
    super(AppEnv.authApiUrl, AppEnv.authApiKey);
  }
}

const api = new AuthApi();

export default Auth;
