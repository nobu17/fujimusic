import Vue from "vue";
import Vuex from "vuex";
import Auth from "./modules/auth";
import Info from "./modules/info";
import Classroom from "./modules/classroom";
import TopPage from "./modules/toppage";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth: Auth,
    info: Info,
    classroom: Classroom,
    toppage: TopPage
  }
});

export default store;
