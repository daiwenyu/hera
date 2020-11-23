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
          // {
          //   name: 'system-management',
          //   icon: 'setting',
          //   path: '/system',
          //   routes: [
          //     {
          //       name: 'menu',
          //       icon: 'safety',
          //       path: '/system/menu',
          //       component: './system/menu',
          //     },
          //     {
          //       name: 'role',
          //       icon: 'safety',
          //       path: '/system/role',
          //       component: './system/role',
          //     },
          //     {
          //       name: 'authority',
          //       icon: 'safety',
          //       path: '/system/authority',
          //       component: './system/authority',
          //     }
          //   ]
          // },
          {
            name: 'tags',
            path: '/tags',
            icon: 'tags',
            routes: [
              {
                path: '/tags',
                redirect: '/tags/list'
              },
              {
                name: 'list',
                path: '/tags/list',
                hideChildrenInMenu: true,
                routes: [
                  {
                    path: '/tags/list',
                    component: './tags/list',
                  },
                  {
                    name: 'create',
                    path: '/tags/list/create',
                    component: './tags/create',
                  },
                  {
                    name: 'configuration',
                    path: '/tags/list/configuration',
                    component: './tags/configuration',
                  },
                ]
              },
              {
                name: 'category',
                path: '/tags/category',
                component: './tags/category',
              },
              {
                name: 'marking',
                path: '/tags/marking',
                component: './tags/marking',
              }
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
