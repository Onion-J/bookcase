const studentRouter = [
  {
    path: '/student',
    name: 'student',
    component: () => import('@/views/student-account/Student.vue')
  }
]

export default studentRouter
