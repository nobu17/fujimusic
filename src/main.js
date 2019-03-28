import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import VueAnalytics from "vue-analytics";
import VueHead from "vue-head";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store
}).$mount("#app");

Vue.use(VueAnalytics, {
  id: "UA-136638079-1",
  router
});

Vue.use(VueHead, {
  separator: "-"
});
