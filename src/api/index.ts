import { request } from '@/utils/request'

// 登录
export function login(data: object) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}
