import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    collectionObj: null,
    databaseArr: null,
    tabs: [undefined],
    selectedTab: 0,
  },
  getters: {
    collectionObj(store) {
      return store.collectionObj
    },
    databaseArr(store) {
      return store.databaseArr
    },
    tabs(store) {
      return store.tabs
    },
    selectedTab(store) {
      return store.selectedTab
    }
  },
  actions: {
    setCollectionObj({ commit }, obj) {
      commit("SET_COLLECTION_OBJ", obj)
    },
    setDatabaseArr({ commit }, arr) {
      commit("SET_DATABASE_ARR", arr)
    },
    addTab({ commit }, namespace) {
      commit("ADD_TAB", namespace)
    },
    removeTab({ commit }, index) {
      commit("REMOVE_TAB", index)
    },
    setSelectedTab({ commit }, index) {
      commit("SET_SELECTED_TAB", index)
    },
  },
  mutations: {
    SET_COLLECTION_OBJ(state, obj) {
      state.collectionObj = obj;
    },
    SET_DATABASE_ARR(state, arr) {
      state.databaseArr = arr;
    },
    ADD_TAB(state, namespace) {
      if (!namespace || (state.tabs[state.selectedTab] && state.tabs[state.selectedTab] !== namespace)) {
        state.tabs.push(namespace)
        state.selectedTab = state.tabs.length - 1;
        return;
      }
      Vue.set(state.tabs, state.selectedTab, namespace)
    },
    REMOVE_TAB(state, index) {
      state.tabs = state.tabs.filter((_, i) => i !== index)
    },
    SET_SELECTED_TAB(state, index) {
      state.selectedTab = index
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')