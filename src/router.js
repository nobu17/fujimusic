import Vue from 'vue'
import VueRouter from 'vue-router'
import Top from './components/top/Top'


Vue.use(VueRouter)
// VueRouterインスタンスを生成する
const router = new VueRouter({
  // URLのパスと紐づくコンポーネントをマッピング
  routes: [
    {
      path: '/',
      redirect: '/root'
    },
    {
        path: '/root',
        component: Top
    }
  ]
})

router.beforeEach((to, from, next) => {
    next();
});


export default router