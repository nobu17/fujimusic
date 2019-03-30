import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/auth";
import Info from "./modules/info";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: Auth,
    info: Info
  }
});

export default store;
