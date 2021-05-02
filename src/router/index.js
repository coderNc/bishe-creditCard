import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Login = () => import('@/views/Login/Login.vue')

const Index = () => import("@/views/Index/Index.vue")
const test = () => import("@/views/Index/test.vue")
const User = () => import('@/views/User/User.vue')
const UserInfo = () => import('@/views/User/UserInfo.vue')
const BankInfo = () => import('@/views/User/BankInfo.vue')
const BindCard = () => import('@/views/User/BindCard.vue')
const MoneyInfo = () => import('@/views/User/MoneyInfo.vue')
const UserOperate = () => import('@/views/User/UserOperate.vue')



const Admin = () => import('@/views/Admin/Admin.vue')
const AdminIndex = () => import('@/views/Admin/AdminIndex.vue')
const AdminUser = () => import('@/views/Admin/AdminUser.vue')
const AdminBank = () => import('@/views/Admin/AdminBank.vue')
const AdminCard = () => import('@/views/Admin/AdminCard.vue')



export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/user',
      name: 'user',
      redirect:'/user/userInfo',
      component: User,
      children:[
        {
          path:'userInfo',
          component:UserInfo
        },
        {
          path:'bankInfo',
          component:BankInfo
        },
        {
          path:'bindCard',
          component:BindCard
        },
        {
          path:'moneyInfo',
          component:MoneyInfo
        },
        {
          path:'userOperate',
          component:UserOperate
        },
      ]
    },
    {
      path:'/admin',
      name:'admin',
      redirect:'/admin/index',
      component:Admin,
      children:[
        {
          path:'index',
          component:AdminIndex
        },
        {
          path:'user',
          component:AdminUser
        },
        {
          path:'bank',
          component:AdminBank
        },
        {
          path:'card',
          component:AdminCard
        },
        {
          path:'userOperate',
          component:UserOperate
        },
      ]
    },

  ]
})
