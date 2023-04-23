const adminRouter = [
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/admin-account/Admin.vue')
  },
  {
    path: '/major',
    name: 'major',
    component: () => import('@/views/major-data/Major.vue')
  }
]

export default adminRouter
