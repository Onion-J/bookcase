import { request } from '@/utils/request'

const url = '/institute'

// 获取学院及专业情况
export function getInstituteInfo() {
  return request({
    url: url + '/getInstituteInfo',
    method: 'get'
  })
}
// 创建学院及专业
export function createInstituteAndMajor(data: object) {
  return request({
    url: url + '/createInstituteAndMajor',
    method: 'post',
    data: data
  })
}
// 添加专业
export function addMajor(data: object) {
  return request({
    url: url + '/addMajor',
    method: 'post',
    data: data
  })
}
// 删除专业
export function deleteMajor(data: object) {
  return request({
    url: url + '/deleteMajor',
    method: 'post',
    data: data
  })
}
// 修改学院名称
export function renameInstitute(data: object) {
  return request({
    url: url + '/renameInstitute',
    method: 'post',
    data: data
  })
}
