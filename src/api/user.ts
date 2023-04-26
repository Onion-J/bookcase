import { request } from '@/utils/request'

const url = '/user'

// 获取登录用户信息
export function getUserInfo() {
  return request({
    url: url + '/getUserInfo',
    method: 'get'
  })
}

// 获取用户信息
export function getUserInfoList() {
  return request({
    url: url + '/getUserInfoList',
    method: 'get'
  })
}

// 更新手机号
export function updatePhone(data: object) {
  return request({
    url: url + '/updatePhone',
    method: 'post',
    data: data
  })
}

// 更改密码
export function changePassword(data: object) {
  return request({
    url: url + '/changePassword',
    method: 'post',
    data: data
  })
}

// 创建用户
export function createUser(data: object) {
  return request({
    url: url + '/createUser',
    method: 'post',
    data: data
  })
}

// 设置管理员
export function setAdmin(data: object) {
  return request({
    url: url + '/setAdmin',
    method: 'post',
    data: data
  })
}

// 修改用户密码
export function resetPassword(data: object) {
  return request({
    url: url + '/resetPassword',
    method: 'post',
    data: data
  })
}

// 禁用账户
export function lockedAccount(data: object) {
  return request({
    url: url + '/lockedAccount',
    method: 'post',
    data: data
  })
}

// 解禁账户
export function unlockedAccount(data: object) {
  return request({
    url: url + '/unlockedAccount',
    method: 'post',
    data: data
  })
}

// 删除账户
export function deleteAccount(data: object) {
  return request({
    url: url + '/deleteAccount',
    method: 'post',
    data: data
  })
}
