export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
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
            path: '/userManagement',
            component: './userManagement',
          },
          {
            name: 'project-management',
            icon: 'table',
            path: '/projectManagement',
            component: './projectManagement',
          },
          {
            name: 'customer-management',
            icon: 'team',
            path: '/customerManagement',
            routes: [{
              hideInMenu: true,
              path: '/customerManagement',
              component: './customerManagement',
            }, {
              hideInMenu: true,
              name: 'detail',
              path: '/customerManagement/detail',
              component: './customerManagement/detail',
            }]
          },
          {
            name: 'quality-management',
            icon: 'safety',
            path: '/qualityManagement',
            component: './qualityManagement',
          },
          {
            name: 'district-management',
            icon: 'comment',
            path: '/districtManagement',
            component: './districtManagement',
          },
          {
            name: 'system-management',
            icon: 'setting',
            path: '/systemManagement',
            //component: './systemManagement',
            routes: [{
              name: 'menu',
              icon: 'safety',
              path: '/systemManagement/menu',
              component: './systemManagement/menu',
            }, {
              name: 'role',
              icon: 'safety',
              path: '/systemManagement/role',
              component: './systemManagement/role',
            }, {
              name: 'authority',
              icon: 'safety',
              path: '/systemManagement/authority',
              component: './systemManagement/authority',
            },]
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
