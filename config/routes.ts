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
            name: 'system-management',
            icon: 'setting',
            path: '/system',
            routes: [
              {
                name: 'menu',
                icon: 'safety',
                path: '/system/menu',
                component: './system/menu',
              },
              {
                name: 'role',
                icon: 'safety',
                path: '/system/role',
                component: './system/role',
              },
              {
                name: 'authority',
                icon: 'safety',
                path: '/system/authority',
                component: './system/authority',
              }
            ]
          },
          {
            name: 'tag',
            path: '/tag',
            icon: 'tags',
            component: './tag'
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
