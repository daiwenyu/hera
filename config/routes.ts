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
            component: './customerManagement',

          },
          {
            name: 'quality-management',
            icon: 'safety',
            path: '/qualityManagement',
            component: './qualityManagement',
          },
          {
            name: 'system-management',
            icon: 'setting',
            path: '/systemManagement',
            component: './systemManagement',
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
