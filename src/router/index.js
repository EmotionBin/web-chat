import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * 路由拦截
 * 权限验证
 */
router.beforeEach(async (to, from, next) => {
  // 进度条 开始
  NProgress.start()
  // 进行身份校验
  if (to.matched.some(item => item.meta.auth)) {
    const uuid = localStorage.getItem('uuid')
    if (uuid) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    // 不需要校验权限 直接通过
    next()
  }
})

router.afterEach(to => {
  // 进度条 结束
  NProgress.done()
})

export default router
