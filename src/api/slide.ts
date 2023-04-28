import { request } from '@/utils/request'

// 获取轮播图
export function getSlide() {
  return request({
    url: '/getSlide',
    method: 'get'
  })
}

// 删除轮播图
export function deleteImg(data: object) {
  return request({
    url: '/deleteImg',
    method: 'post',
    data: data
  })
}
