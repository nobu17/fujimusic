import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");

Vue.use(VueAnalytics, {
  id: "UA-135911364-1",
  router
});
