import { createRouter, createWebHistory } from 'vue-router'
import userStore from '@/stores/modules/user'

import userRouter from './modules/user'
import studentRouter from './modules/student'
import cabinetRouter from './modules/cabinet'
import appletRouter from './modules/applet'
import adminRouter from './modules/admin'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/Home.vue')
    },
    {
      path: '/401',
      name: 'PermissionDenied',
      component: () => import('@/views/error-page/401.vue')
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('@/views/error-page/404.vue')
    },
    ...adminRouter,
    ...userRouter,
    ...studentRouter,
    ...cabinetRouter,
    ...appletRouter,
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
})

// 白名单
const whiteList = ['/login']
const superAdminList = ['/admin', '/major']

router.beforeEach((to, from, next) => {
  const store = userStore()
  const token = store.token
  if (token) {
    // token 存在
    if (to.path === '/login') {
      // 打开登录页面 跳转到主页
      next('/')
    } else {
      // 打开其他页面
      store
        .GetUserInfo()
        .then(() => {
          const isAdmin = store.userInfo.isAdmin
          if (!isAdmin) {
            // 非超级管理员
            if (superAdminList.includes(to.path)) {
              // 访问超级管理员模块
              next('/401')
            }
          }
          next()
        })
        .catch((err) => {
          ElMessage.error(err)
          store.Logout()
          router.replace({ path: '/login' })
        })
    }
  } else {
    // token 不存在
    if (whiteList.includes(to.path)) {
      // 打开白名单页面
      next()
    } else {
      // 打开非白名单页面 跳转到登录页
      next('/login')
    }
  }
})

export default router
