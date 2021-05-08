import { defineConfig } from 'umi';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import pageRoutes from './router.config';

export default defineConfig({
  antd: {},
  chainWebpack(config, { env }) {
    config.plugin('case-sensitive-paths').use(CaseSensitivePathsPlugin);
    if (env === 'production') {
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
    }
  },
  define: {
    'process.env.apiUrl': '//localhost:5000',
  },
  devtool: 'source-map',
  dva: {},
  dynamicImport: {
    loading: '@/loading',
  },
  esbuild: {},
  fastRefresh: {},
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  outputPath: '/dist',
  routes: pageRoutes,
  targets: {
    android: 5,
    chrome: 58,
    edge: 13,
    firefox: 45,
    ie: 11,
    ios: 7,
    safari: 10,
  },
  title: 'XX 管理后台',
  treeShaking: false,
});
