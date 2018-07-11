import Main from '@/views/main.vue'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['@/views/login.vue'], resolve) }
}
export const logintempRouter = {
  path: '/templogin',
  name: 'templogin',
  meta: {
    title: 'Login - 登录'
  },
  component: resolve => { require(['@/views/templogin.vue'], resolve) }
}
export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => { require(['@/views/error-page/404.vue'], resolve) }
}

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: resolve => { require(['@//views/error-page/403.vue'], resolve) }
}

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: resolve => { require(['@/views/error-page/500.vue'], resolve) }
}
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const home = {
  path: '/',
  meta: {
    title: '首页'
  },
  name: 'home',
  component: resolve => { require(['@/views/index.vue'], resolve) }
}
export const pcRouter = {
  path: '/',
  name: 'pcRouter',
  component: Main,
  children: [
    { path: '/home', title: { i18n: 'index' }, name: 'home_index', component: resolve => { require(['@/views/index.vue'], resolve) } },
    { path: '/about', title: { i18n: 'about' }, name: 'about', component: resolve => { require(['@/views/About/Index.vue'], resolve) } },
    { path: '/account', title: { i18n: 'account' }, name: 'account', component: resolve => { require(['@/views/Account/Index.vue'], resolve) } },
    { path: '/cart', title: { i18n: 'cart' }, name: 'cart', component: resolve => { require(['@/views/Cart/index.vue'], resolve) } },
    { path: '/collectionproduct', title: { i18n: 'collectionproduct' }, name: 'collectionproduct', component: resolve => { require(['@/views/CollectionProduct/index.vue'], resolve) } },
    { path: '/classify', title: { i18n: 'classify' }, name: 'classify_index', component: resolve => { require(['@/views/Classify/Index.vue'], resolve) } },
    { path: '/classifylist', title: { i18n: 'classifylist' }, name: 'classify_list', component: resolve => { require(['@/views/Classify/List.vue'], resolve) } },
    { path: '/threelist', title: { i18n: 'threelist' }, name: 'classify_threelist', component: resolve => { require(['@/views/Classify/Threelist.vue'], resolve) } },
    { path: '/integral', title: { i18n: 'integral' }, name: 'integral', component: resolve => { require(['@/views/Integral/Index.vue'], resolve) } },
    { path: '/integralmall', title: { i18n: 'integralmall' }, name: 'integralmall', component: resolve => { require(['@/views/IntegralMall/Index.vue'], resolve) } },
    { path: '/integraldetail/:id', title: { i18n: 'integraldetail' }, name: 'integraldetail', component: resolve => { require(['@/views/IntegralMall/Detail.vue'], resolve) } },
    { path: '/limit', title: { i18n: 'limit' }, name: 'limit', component: resolve => { require(['@/views/Limit/Index.vue'], resolve) } },
    { path: '/news', title: { i18n: 'news' }, name: 'news', component: resolve => { require(['@/views/News/Index.vue'], resolve) } },
    { path: '/newsdetail/:id', title: { i18n: 'newsdetail' }, name: 'newsdetail', component: resolve => { require(['@/views/News/Detail.vue'], resolve) } },
    { path: '/pdetail/:id', title: { i18n: 'pdetail' }, name: 'pdetail', component: resolve => { require(['@/views/products/detail.vue'], resolve) } },
    { path: '/search', title: { i18n: 'search' }, name: 'search', component: resolve => { require(['@/views/Search/Index.vue'], resolve) } },
    { path: '/service', title: { i18n: 'service' }, name: 'service', component: resolve => { require(['@/views/Service/Index.vue'], resolve) } },
    { path: '/userorders', title: { i18n: 'userorders' }, name: 'userorders', component: resolve => { require(['@/views/User/Orders.vue'], resolve) } },
    { path: '/userreckoning', title: { i18n: 'userreckoning' }, name: 'userreckoning', component: resolve => { require(['@/views/User/Reckoning.vue'], resolve) } }
  ]
}

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  logintempRouter,
  home,
  pcRouter,
  page500,
  page403,
  page404
]
