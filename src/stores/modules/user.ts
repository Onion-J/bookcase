import { defineStore } from 'pinia'
import { login } from '@/api/index'
import { getUserInfo } from '@/api/user'
import { ref } from 'vue'

const useUserStore = defineStore(
  'userState',
  () => {
    // 用户信息
    const userInfo = ref({
      teacherId: '',
      name: '',
      isAdmin: ''
    })
    // 登录凭证
    const token = ref<string>('')
    // 登录
    const Login = (userData: object) => {
      return new Promise<void>((resolve, reject) => {
        login(userData)
          .then((res) => {
            if (res.data.code == 200) {
              userInfo.value = res.data.data.user
              token.value = res.data.data.token
              resolve()
            }
            reject(res.data.message)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
    // 获取用户信息
    const GetUserInfo = () => {
      return new Promise<void>((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            if (res.data.code == 200) {
              userInfo.value = res.data.data.user
              resolve()
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
        isAdmin: ''
      }
      token.value = ''
    }
    return { userInfo, token, Login, Logout, GetUserInfo }
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
