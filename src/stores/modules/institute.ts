import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getInstituteInfo } from '@/api/institute'

const useInstituteStore = defineStore('instituteStore', () => {
  // 学院及专业信息
  const instituteInfo = ref([])

  // 获取学院及专业信息
  const GetInstituteInfo = () => {
    return new Promise<void>((resolve, reject) => {
      getInstituteInfo()
        .then((res) => {
          if (res.data.code == 200) {
            instituteInfo.value = res.data.data.instituteInfo
            resolve()
            return
          }
          reject(res.data.message)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  return { instituteInfo, GetInstituteInfo }
})

export default useInstituteStore
