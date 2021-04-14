import { defineConfig } from 'umi';
import pageRoutes from './router.config';

export default defineConfig({
  outputPath: '../tourismPlatform-web/src/main/resources/static',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: pageRoutes,
  esbuild: {},
  dva: {},
  antd: {},
  treeShaking: false,
  hash: true,
  fastRefresh: {},
  dynamicImport: {},
  chunks: ['umi'],
  chainWebpack(config) {
    config.merge({
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
            },
          },
        },
      },
    });
  },
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 9,
    ios: 7,
    safari: 10,
  },
});
