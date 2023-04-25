import { request } from '@/utils/request'

const url = '/student'

// 获取入学年份数据
export function getEnrollmentYear() {
  return request({
    url: url + '/getEnrollmentYear',
    method: 'get'
  })
}

// 创建学生账户
export function createStudentAccount(data: object) {
  return request({
    url: url + '/createStudentAccount',
    method: 'post',
    data: data
  })
}

// 查询学生账户
export function selectStudentAccount(data: object) {
  return request({
    url: url + '/selectStudentAccount',
    method: 'post',
    data: data
  })
}

// 删除学生账户
export function deleteStudentAccount(data: object) {
  return request({
    url: url + '/deleteStudentAccount',
    method: 'post',
    data: data
  })
}
