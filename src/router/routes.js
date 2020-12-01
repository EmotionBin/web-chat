import menuRouter from './modules/menu'

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
      ...menuRouter,
      {
        path: 'user/:userId',
        name: 'user',
        meta,
        component: () => import('@/components/user/index.vue')
      }
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

export default routes
