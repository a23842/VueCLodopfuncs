import Main from '@/components/main'

export default [
  {
    path: '/',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    component: () => import('@/view/login')
  },
  {
    path: '/buy',
    name: 'buy',
    component: Main,
    children: [
      {
        path: 'list',
        name: 'buyList',
        meta: {
          title: '购买记录',
          breadcrumb: ['首页', '购买记录'],
          keepAlive: true
        },
        component: () => import('@/view/buy')
      }
    ]
  }
]
