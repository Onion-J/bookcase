import { request } from '@/utils/request'

const url = '/student'

// 创建学生账户
export function createStudentAccount(data: object) {
  return request({
    url: url + '/createStudentAccount',
    method: 'post',
    data: data
  })
}
