import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Roles from '../components/role/Role.vue'
import Phonelogin from '../components/Phonelogin.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/phonelogin',
      component: Phonelogin,
    },
    {
      path: '/home',
      component: Home,
      redirect: "/welcome",
      children: [{
          path: '/welcome',
          component: Welcome,
        },
        {
          path: '/users',
          component: Users,
        },
        {
          path: '/rights',
          component: Roles,
        }
      ]
    }
  ]
})

//挂载路由导航守卫（每次访问url前调用）(控制路由访问权限 没登陆的不能访问别的url)
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 放行
  if (to.path === "/login") {
    //放行
    return next()
  }
  const token = window.sessionStorage.getItem('token')
  if (!token) {
    return next("/login")
  }
  next()

})
export default router
