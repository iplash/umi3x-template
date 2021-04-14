export default [
  { path: '/exception/401', component: './exception/401.js', title: '401 Error' },
  { path: '/exception/403', component: './exception/403.js', title: '403 Error' },
  { path: '/exception/404', component: './exception/404.js', title: '404 Error' },
  { path: '/exception/500', component: './exception/500.js', title: '500 Error' },
  {
    path: '/',
    component: '../layouts/index',
    title: '首页',
    routes: [{ path: '/', component: '../pages/index', title: '首页' }],
  },
];
