import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import { CLEAR_TIMER_OPERATOR } from '@/plugins/decorator'
import Index from '@/views/Index.vue'
Vue.use(Router)
let routes: Array<RouteConfig> = [
  {
    path: '/',
    component: Index
  }
]

// 初始化 Vue Router
const router = new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  // 清除 THROTTLES TIMER
  let { CURRENTMETHOD } = CLEAR_TIMER_OPERATOR
  CLEAR_TIMER_OPERATOR.THROTTLES[CURRENTMETHOD] && CLEAR_TIMER_OPERATOR.THROTTLES[CURRENTMETHOD]()

  // 登录拦截
})

router.afterEach((to, from) => {
})


export default router