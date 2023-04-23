const userRouter = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/Profile.vue')
  }
]

export default userRouter
