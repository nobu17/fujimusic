import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/index";
import Top from "./pages/root";
import Infomation from "./pages/info";
import Price from "./pages/price";
import ClassRoom from "./pages/classroom";
import EventPic from "./pages/event";
import Students from "./pages/students";
import AlbumTop from "./pages/member/albumtop";
import AlbumPage from "./pages/member/albumpage";
import AdminIndex from "./pages/admin/index";
import InfoEdit from "./pages/admin/infoedit";
import Classedit from "./pages/admin/classedit";
import TopImageEdit from "./pages/admin/topimageedit";
import Login from "./pages/login";

Vue.use(VueRouter);
// VueRouterインスタンスを生成する
const router = new VueRouter({
  mode: "history", // SEO対策でURLから#を外す
  // ページ移動時にトップスクロール
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
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
      path: "/member/albumtop",
      component: AlbumTop,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/member/albumpage/:albumId",
      component: AlbumPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/admin",
      component: AdminIndex,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: "/admin/infoedit",
      component: InfoEdit,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: "/admin/topimageedit",
      component: TopImageEdit,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: "/admin/classedit/:classId",
      component: Classedit,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 認証状態を取得
  const isLoggedIn = store.state.auth.isLoggedIn;
  const isAdmin = store.getters["auth/isAdmin"];
  // ログイン状態でログアウト
  if (isLoggedIn && to.path === "/logout") {
    store.dispatch("auth/logout");
    // トップページへ
    next({
      path: "/"
    });
    return;
  }

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
  } // 管理権限ページ
  else if (
    to.matched.some(record => record.meta.requiresAdmin) &&
    (!isAdmin || !isLoggedIn)
  ) {
    next({
      path: "/"
    });
  } else {
    next();
  }
});

export default router;
