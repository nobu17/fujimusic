import Vue from "vue";
import VueRouter from "vue-router";
import Top from "./pages/root";
import Infomation from "./pages/info";
import Price from "./pages/price";
import ClassRoom from "./pages/classroom";
import EventPic from "./pages/event";
import Students from "./pages/students";


Vue.use(VueRouter);
// VueRouterインスタンスを生成する
const router = new VueRouter({
  mode: 'history', // SEO対策でURLから#を外す
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
    }
  ]
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
