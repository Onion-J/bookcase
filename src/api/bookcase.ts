import { request } from '@/utils/request'

const url = '/bookcase'

// 获取储物柜情况
export function getBookcaseInfo() {
  return request({
    url: url + '/getBookcaseInfo',
    method: 'get'
  })
}

// 创建储物柜
export function createBookcase(data: object) {
  return request({
    url: url + '/createBookcase',
    method: 'post',
    data: data
  })
}

// 删除储物柜
export function deleteBookcase(data: object) {
  return request({
    url: url + '/deleteBookcase',
    method: 'post',
    data: data
  })
}

// 添加储物柜
export function addBookcase(data: object) {
  return request({
    url: url + '/addBookcase',
    method: 'post',
    data: data
  })
}

// 删减储物柜
export function reduceBookcase(data: object) {
  return request({
    url: url + '/reduceBookcase',
    method: 'post',
    data: data
  })
}

// 修改储物柜区域名称
export function renameBookcase(data: object) {
  return request({
    url: url + '/renameBookcase',
    method: 'post',
    data: data
  })
}
