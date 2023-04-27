import { request } from '@/utils/request'

const url = '/application'

// 获取今天的申请记录
export function getTodayApplication() {
  return request({
    url: url + '/getTodayApplication',
    method: 'get'
  })
}

// 获取没过期的申请记录
export function getNotExpiredApplication() {
  return request({
    url: url + '/getNotExpiredApplication',
    method: 'get'
  })
}

// 获取储物柜的使用记录
export function getUsageRecords(data: object) {
  return request({
    url: url + '/getUsageRecords',
    method: 'post',
    data: data
  })
}
