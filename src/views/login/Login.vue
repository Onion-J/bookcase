<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import userStore from '@/stores/modules/user'
import router from '@/router'

const userLoginFormRef = ref<FormInstance>()

const checkTeacherId = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名！'))
  } else {
    if (value.length < 6) {
      callback(new Error('用户名大于6位！'))
    }
    callback()
  }
}

const checkPassword = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码！'))
  } else {
    if (value.length < 6) {
      callback(new Error('密码大于6位！'))
    }
    callback()
  }
}

const userLoginForm = reactive({
  teacherId: '',
  password: ''
})

const rules = reactive<FormRules>({
  password: [{ validator: checkPassword, trigger: 'blur' }],
  teacherId: [{ validator: checkTeacherId, trigger: 'blur' }]
})

const store = userStore()
const loading = ref(false)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      // 登录
      await store
        .Login(userLoginForm)
        .then(() => {
          router.replace({
            path: '/'
          })
          ElNotification({
            message: '欢迎登录!',
            type: 'success',
            duration: 2000,
            offset: 50
          })
        })
        .catch((err) => {
          ElMessage.error(err)
        })
      loading.value = false
    }
  })
}

// 检查键盘大写锁定键
let capsTooltip = ref(false)
const checkCapslock = (event: KeyboardEvent) => {
  const { key } = event
  capsTooltip.value = Boolean(key && key.length === 1 && key >= 'A' && key <= 'Z')
}
</script>

<template>
  <div class="login-container">
    <!-- 登录表单 -->
    <el-form
      ref="userLoginFormRef"
      :model="userLoginForm"
      :rules="rules"
      class="login-form"
      autocomplete="on"
      style="max-width: 600px"
    >
      <!-- 标题 -->
      <div class="title-container">
        <h3 class="title">高校图书馆图书柜管理系统</h3>
      </div>
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input
          v-model="userLoginForm.teacherId"
          placeholder="教师编号"
          type="text"
          tabindex="1"
          autocomplete="on"
          size="large"
        >
          <template #prefix>
            <el-icon><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-tooltip :visible="capsTooltip" content="大写锁定键已开启" placement="right">
        <el-form-item prop="password">
          <el-input
            v-model="userLoginForm.password"
            placeholder="密码"
            type="password"
            show-password
            tabindex="2"
            autocomplete="on"
            size="large"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="submitForm(userLoginFormRef)"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-tooltip>

      <!-- 登录按钮 -->
      <el-form-item>
        <el-button :loading="loading" type="primary" @click="submitForm(userLoginFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login-container {
  height: 100%;
  width: 100%;
  background-color: #337ecc;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.login-form {
  position: relative;
  width: 500px;
  max-width: 100%;
  height: 360px;
  padding: 10% 5% 0;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}

.title-container {
  position: relative;
}
.title {
  font-size: 26px;
  color: #fff;
  margin: 0px auto 12% auto;
  text-align: center;
  font-weight: bold;
  user-select: none;
  cursor: default;
}
.el-form-item {
  width: 85%;
}
.el-input__wrapper {
  border-radius: 5px;
}
.el-button {
  width: 500px;
  height: 35px;
}
</style>
