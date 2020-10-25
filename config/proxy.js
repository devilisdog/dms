/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/v1/': {
      target: 'http://106.52.154.94',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  test: {
    '/v1/': {
      target: 'http://106.52.154.94',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
  pre: {
    '/v1/': {
      target: 'http://106.52.154.94',
      changeOrigin: true,
      pathRewrite: {
        '^': '',
      },
    },
  },
};
