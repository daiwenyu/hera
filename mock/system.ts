export default {
  // 获取当前用户菜单
  'GET /api/system/getMenus': [
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
              redirect: '/SystemAdmin',
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
  ],
}
