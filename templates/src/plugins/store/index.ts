import Vue from 'vue'
import Vuex from 'vuex'
import { IStore } from './interface'
Vue.use(Vuex)
const options: IStore = {
  state: {},
  mutations: {
    stateChange(state, { type, val }): void {
      state[type] = val
    }
  },
  actions: {},
  modules: {}
}
export default new Vuex.Store(options)
