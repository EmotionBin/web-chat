// 左侧菜单路由

export default [
  {
    path: 'chat/index',
    name: 'chat-index',
    component: () => import('@/views/menu/chat/index.vue')
  },
  {
    path: 'chat/view/:roomId',
    name: 'chat-view',
    component: () => import('@/components/chat/view/index.vue')
  },
  {
    path: 'book',
    name: 'book',
    component: () => import('@/views/menu/book/index.vue')
  },
  {
    path: 'user/:id',
    name: 'book',
    component: () => import('@/views/menu/user/index.vue')
  },
  {
    path: 'help',
    name: 'help',
    component: () => import('@/views/menu/help/index.vue')
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('@/views/menu/about/index.vue')
  }
]
