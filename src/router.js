import Vue from "vue";
import VueRouter from "vue-router";
import Top from "./components/top/Top";
import Infomation from "./components/info/Infomation";
import Price from "./components/price/Price";
import ClassRoom from "./components/classroom/ClassRoom";
import EventPic from "./components/event/EventPic";

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
