export default [
  { path: '/exception/401', component: './exception/401', title: '401 Error' },
  { path: '/exception/403', component: './exception/403', title: '403 Error' },
  { path: '/exception/404', component: './exception/404', title: '404 Error' },
  { path: '/exception/500', component: './exception/500', title: '500 Error' },
  {
    path: '/',
    component: '../layouts/index',
    title: '首页',
    routes: [
      { path: '/', component: '../pages/index', title: '首页' },
      { path: '/second', component: '../pages/second', title: '页面2' },
      { path: '/three', component: '../pages/three', title: '页面3' },
    ],
  },
];
