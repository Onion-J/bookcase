import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBookcaseInfo } from '@/api/bookcase'

const useBookcaseStore = defineStore('bookcaseState', () => {
  // 图书柜信息
  const bookcaseList = ref([])

  // 获取图书柜信息
  const GetBookcaseInfo = () => {
    return new Promise<void>((resolve, reject) => {
      getBookcaseInfo()
        .then((res) => {
          if (res.data.code == 200) {
            bookcaseList.value = res.data.data.bookcaseList
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

  return { bookcaseList, GetBookcaseInfo }
})

export default useBookcaseStore
