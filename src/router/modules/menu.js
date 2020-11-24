// 左侧菜单路由

const meta = {
  auth: true
}

export default [
  {
    path: 'chat/index',
    name: 'chat-index',
    meta,
    component: () => import('@/views/menu/chat/index.vue')
  },
  {
    path: 'chat/view/:roomId',
    name: 'chat-view',
    meta,
    component: () => import('@/components/chat/view/index.vue')
  },
  {
    path: 'chat/detail/:roomId',
    name: 'chat-detail',
    meta,
    component: () => import('@/components/chat/detail/index.vue')
  },
  {
    path: 'book',
    name: 'book',
    meta,
    component: () => import('@/views/menu/book/index.vue')
  },
  {
    path: 'user/:id',
    name: 'book',
    meta,
    component: () => import('@/views/menu/user/index.vue')
  },
  {
    path: 'help',
    name: 'help',
    meta,
    component: () => import('@/views/menu/help/index.vue')
  },
  {
    path: 'about',
    name: 'about',
    meta,
    component: () => import('@/views/menu/about/index.vue')
  }
]
