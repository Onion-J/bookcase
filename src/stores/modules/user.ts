import { defineStore } from 'pinia'
import { login } from '@/api/index'
import { getUserInfo, getUserInfoList } from '@/api/user'
import { ref } from 'vue'

const useUserStore = defineStore(
  'userState',
  () => {
    // 登录用户信息
    const userInfo = ref({
      teacherId: '',
      name: '',
      phone: '',
      isAdmin: ''
    })
    // 登录凭证
    const token = ref<string>('')
    // 用户信息
    const userInfoList = ref([])

    // 登录
    const Login = (userData: object) => {
      return new Promise<void>((resolve, reject) => {
        login(userData)
          .then((res) => {
            if (res.data.code == 200) {
              userInfo.value = res.data.data.user
              token.value = res.data.data.token
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
    // 获取登录用户信息
    const GetUserInfo = () => {
      return new Promise<void>((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            if (res.data.code == 200) {
              userInfo.value = res.data.data.user
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
    // 获取用户信息
    const GetUserInfoList = () => {
      return new Promise<void>((resolve, reject) => {
        getUserInfoList()
          .then((res) => {
            if (res.data.code == 200) {
              userInfoList.value = res.data.data.userInfoList
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

    // 登出
    const Logout = () => {
      userInfo.value = {
        teacherId: '',
        name: '',
        phone: '',
        isAdmin: ''
      }
      token.value = ''
    }
    return { userInfo, token, userInfoList, Login, Logout, GetUserInfo, GetUserInfoList }
  },
  {
    // 数据持久化
    persist: {
      key: 'token',
      storage: sessionStorage,
      paths: ['token']
    }
  }
)

export default useUserStore
