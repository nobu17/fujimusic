import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/index";
import Top from "./pages/root";
import Infomation from "./pages/info";
import Price from "./pages/price";
import ClassRoom from "./pages/classroom";
import EventPic from "./pages/event";
import Students from "./pages/students";
import AdminIndex from "./pages/admin/index";
import InfoEdit from "./pages/admin/infoedit";
import Login from "./pages/login";

Vue.use(VueRouter);
// VueRouterインスタンスを生成する
const router = new VueRouter({
  mode: "history", // SEO対策でURLから#を外す
  // URLのパスと紐づくコンポーネントをマッピング
  routes: [
    {
      path: "/",
      redirect: "/root"
    },
    {
      path: "/root",
      component: Top
    },
    {
      path: "/info",
      component: Infomation
    },
    {
      path: "/price",
      component: Price
    },
    {
      path: "/classroom",
      component: ClassRoom
    },
    {
      path: "/event",
      component: EventPic
    },
    {
      path: "/students",
      component: Students
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/admin",
      component: AdminIndex,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin/infoedit",
      component: InfoEdit,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 認証状態を取得
  let isLoggedIn = store.state.auth.isLoggedIn;

  if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
    let path = to.fullPath;
    next({
      path: "/login",
      query: {
        redirect: path
      }
    });
  } else if (to.fullPath === "/login" && isLoggedIn) {
    //ログイン中でログイン先に来たら自動ログイン
    next({
      path: "/"
    });
  } else {
    next();
  }
});

export default router;
