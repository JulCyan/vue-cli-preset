import Vue from 'vue'
import { router, store, axios, utils, directive } from './plugins'
import App from './App.vue'
import './assets/less/normalize.less'


Vue.use(axios)
Vue.use(utils)
Vue.use(directive)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
