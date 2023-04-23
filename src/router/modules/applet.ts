const appletRouter = [
  {
    path: '/applet',
    name: 'applet',
    component: () => import('@/views/applet/Applet.vue')
  }
]

export default appletRouter
