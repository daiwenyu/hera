export default {
  dev: {
    '/api': {
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
  test: {
    '/api/': {
      target: '',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
  pre: {
    '/api/': {
      target: '',
      changeOrigin: true,
      pathRewrite: {'^': ''},
    },
  },
};
