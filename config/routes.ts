export default [
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'dashboard',
            component: './Welcome',
          },
          {
            name: 'list.table-list',
            icon: 'dashboard',
            path: '/list',
            component: './ListTableList',
          },
          {
            name: 'system.admin',
            icon: 'tool',
            path: '/systemAdmin',
            component: './SystemAdmin',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]
