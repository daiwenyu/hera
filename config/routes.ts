export default [
  {
    path: '/login',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/login',
        component: './login',
      },
    ],
  },
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
            redirect: '/dashbord',
          },
          {
            name: 'dashbord',
            icon: 'fund',
            path: '/dashbord',
            component: './index/dashbord',
          },
          {
            name: 'user-management',
            icon: 'user',
            path: '/user',
            component: './user',
          },
          {
            name: 'project-management',
            icon: 'table',
            path: '/project',
            component: './project',
          },
          {
            name: 'customer-management',
            icon: 'team',
            path: '/customer',
            routes: [{
              hideInMenu: true,
              path: '/customer',
              component: './customer',
            }, {
              hideInMenu: true,
              name: 'detail',
              path: '/customer/detail',
              component: './customer/detail',
            }]
          },
          {
            name: 'quality-management',
            icon: 'safety',
            path: '/quality',
            component: './quality',
          },
          {
            name: 'region-management',
            icon: 'comment',
            path: '/region',
            component: './region',
          },
          // {
          //   name: 'system-management',
          //   icon: 'setting',
          //   path: '/system',
          //   //component: './system',
          //   routes: [{
          //     name: 'menu',
          //     icon: 'safety',
          //     path: '/system/menu',
          //     component: './system/menu',
          //   }, {
          //     name: 'role',
          //     icon: 'safety',
          //     path: '/system/role',
          //     component: './system/role',
          //   }, {
          //     name: 'authority',
          //     icon: 'safety',
          //     path: '/system/authority',
          //     component: './system/authority',
          //   },]
          // },
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
