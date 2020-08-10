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
            redirect: '/dashbord',
          },
          {
            name: 'dashbord',
            icon: 'tool',
            path: '/dashbord',
            component: './index/dashbord',
          },
          {
            name: 'project-management',
            icon: 'tool',
            path: '/projectManagement',
            component: './projectManagement',
          },
          {
            name: 'customer-management',
            icon: 'tool',
            path: '/customerManagement',
            component: './customerManagement',
          },
          {
            name: 'quality-management',
            icon: 'tool',
            path: '/qualityManagement',
            component: './qualityManagement',
          },
          {
            name: 'system-management',
            icon: 'tool',
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
