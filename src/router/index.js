import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/login'},
  {path: '/login', component: Login },
  {path:'/home',component:Home}
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫beforeEach()
router.beforeEach((to, from, next) => {
  // to:将要访问的网页
  // from:从哪个网页跳转而来
  // next:函数，next()表示“放行”，next('/login')表示强制跳转到登录界面

  // 如果直接访问'/login'，则放行
  if (to.path === '/login') return next();
  // 获取token值
  const tokenCheck = window.sessionStorage.getItem('token');
  // 如果token不存在则强制跳转到登录界面
  if (!tokenCheck) return next('/login');
  // token存在则放行
  next();

})

export default router
