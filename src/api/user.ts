import { request } from '@/utils/request'

const url = '/user'

export function getUserInfo() {
  return request({
    url: url + '/getUserInfo',
    method: 'get'
  })
}

export function changePassword(data: object) {
  return request({
    url: url + '/changePassword',
    method: 'post',
    data: data
  })
}
