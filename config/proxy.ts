export default {
  dev: {
    '/api': {
      target: 'http://47.96.139.121:8085/park-crm-admin',
      // changeOrigin: true,
      //pathRewrite: { '^': '' },
    },
  },
  test: {
    '/api/': {
      target: '',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: '',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
