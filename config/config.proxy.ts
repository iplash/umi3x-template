export default {
  define: {
    'process.env.apiUrl': '//localhost:5000',
  },
  proxy: {
    '/pc/': {
      target: '//192.168.1.188:8080',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
