export default {
  dev: {
    '/api': {
      target: '',
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
