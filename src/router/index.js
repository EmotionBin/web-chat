import Vue from 'vue'
import VueRouter from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import menuRouter from './modules/menu'

Vue.use(VueRouter)

const meta = {
  auth: true
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    props: true
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/index.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta,
    redirect: { name: 'chat-index' },
    component: () => import('../views/home/index.vue'),
    children: [
      ...menuRouter
    ]
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
