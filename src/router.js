import Vue from "vue";
import VueRouter from "vue-router";
import Top from "./pages/root";
import Infomation from "./pages/info";
import Price from "./pages/price";
import ClassRoom from "./pages/classroom";
import EventPic from "./pages/event";

Vue.use(VueRouter);
// VueRouterインスタンスを生成する
const router = new VueRouter({
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
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
