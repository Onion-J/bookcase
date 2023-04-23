import { request } from '@/utils/request'

const url = '/bookcase'

// 获取图书柜情况
export function getBookcaseInfo() {
  return request({
    url: url + '/getBookcaseInfo',
    method: 'get'
  })
}

// 创建图书柜
export function createBookcase(data: object) {
  return request({
    url: url + '/createBookcase',
    method: 'post',
    data: data
  })
}

// 删除图书柜
export function deleteBookcase(data: object) {
  return request({
    url: url + '/deleteBookcase',
    method: 'post',
    data: data
  })
}

// 添加图书柜
export function addBookcase(data: object) {
  return request({
    url: url + '/addBookcase',
    method: 'post',
    data: data
  })
}

// 删减图书柜
export function reduceBookcase(data: object) {
  return request({
    url: url + '/reduceBookcase',
    method: 'post',
    data: data
  })
}

// 修改图书柜区域名称
export function renameBookcase(data: object) {
  return request({
    url: url + '/renameBookcase',
    method: 'post',
    data: data
  })
}
