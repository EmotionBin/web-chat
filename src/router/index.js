import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/index.vue')
  },
  {
    path: '/redirect/:route',
    name: 'redirect',
    redirect: to => { return { name: to.params.route } }
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import('../views/404/index.vue')
  }
]

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
  // 不需要身份校验 直接通过
  next()
})

router.afterEach(to => {
  // 进度条 结束
  NProgress.done()
})

export default router
