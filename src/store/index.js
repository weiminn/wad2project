import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoggedIn: null,
    userInfo: null
  },
  mutations: {
    setLoggedInUser(state, payload){
      state.isLoggedIn = payload.loggedInStatus
      state.userInfo = payload.userInfo
    }
  },
  actions: {
    logInUser(context, payload){
      context.commit("setLoggedInUser", payload)
    },
    logOutUser(context, payload){
      context.commit("setLoggedInUser", payload)
    }
  },
  getters : {
    getIsLoggedIn(state){
      return state.isLoggedIn;
    },
    getUserInfo(state){
      return state.userInfo
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});
