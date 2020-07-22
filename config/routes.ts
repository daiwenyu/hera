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
            redirect: '/systemAdmin',
          },
          {
            name: 'system',
            icon: 'tool',
            path: '/systemAdmin',
            routes: [
              {
                path: '/systemAdmin',
                redirect: '/SystemAdmin/menu',
              },
              {
                name: 'menu',
                path: '/systemAdmin/menu',
                component: './SystemAdmin/Menu',
              },
            ]
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
