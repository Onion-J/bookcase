<script setup lang="ts">
import userStore from '@/stores/modules/user'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { changePassword } from '@/api/user'
import router from '@/router'
import { updatePhone } from '@/api/user'

const store = userStore()

const teacherId = ref(store.userInfo.teacherId)

const name = ref(store.userInfo.name)

const phone = ref(store.userInfo.phone)

const hasPhone = ref(phone.value != '' ? true : false)

// 防止浏览器自动填充密码框
const readonlyFlag = ref(true)
const handlerIpClick = () => {
  readonlyFlag.value = false
}

// click 打开 修改密码 对话框
const dialogVisible = ref(false)
const openDialog = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
  dialogVisible.value = true
}
const cancel = () => {
  dialogVisible.value = false
}

const changePasswordRef = ref<FormInstance>()
// 表单验证规则
const checkOldPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入旧密码！'))
  } else if (value.length < 6) {
    return callback(new Error('密码需大于6位！'))
  }
  callback()
}
// 表单验证规则
const validateNewPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请输入新密码！'))
  } else if (value.length < 6) {
    return callback(new Error('密码需大于6位！'))
  } else if (value == changePasswordForm.oldPassword) {
    return callback(new Error('新密码与旧密码一致！'))
  } else {
    callback()
  }
}
// 表单验证规则
const validateCheckPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    return callback(new Error('请再次输入新密码！'))
  } else if (value.length < 6) {
    return callback(new Error('密码需大于6位！'))
  } else if (value !== changePasswordForm.newPassword) {
    return callback(new Error('两次输入的新密码不一致！'))
  } else {
    callback()
  }
}

// 修改密码表单
const changePasswordForm = reactive({
  teacherId: teacherId,
  oldPassword: '',
  newPassword: '',
  checkPassword: '',
  newPhone: ''
})

// 表单验证规则
const rules = reactive<FormRules>({
  oldPassword: [{ validator: checkOldPassword, trigger: 'blur' }],
  newPassword: [{ validator: validateNewPassword, trigger: 'blur' }],
  checkPassword: [{ validator: validateCheckPassword, trigger: 'blur' }],
  newPhone: [
    { required: true, message: '请输入手机号！', trigger: 'blur' },
    {
      pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
      message: '手机号格式不正确',
      trigger: ['blur', 'change']
    }
  ]
})

const change = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('修改密码，是否继续?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await changePassword(changePasswordForm)
            .then(async (res) => {
              if (res.data.code == 200) {
                ElMessage.success('修改成功！')
                store.Logout()
                router.replace({ path: '/login' })
              } else {
                ElMessage.error(res.data.message)
              }
            })
            .catch((err) => {
              ElMessage.error(err)
            })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消修改！'
          })
          cancel()
        })
    } else {
      return
    }
  })
}

const bindPhone = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      const label = hasPhone.value ? '更换绑定手机，是否继续?' : '绑定手机，是否继续?'
      ElMessageBox.confirm(label, 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const changePhone = {
            teacherId: teacherId.value,
            phone: changePasswordForm.newPhone
          }
          await updatePhone(changePhone)
            .then(async (res) => {
              if (res.data.code == 200) {
                ElMessage.success('绑定成功！')
                router.go(0)
              } else {
                ElMessage.error(res.data.message)
              }
            })
            .catch((err) => {
              ElMessage.error(err)
            })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消绑定！'
          })
          cancel()
        })
    } else {
      return
    }
  })
}

const cancelButton = ref(false)
const update = () => {
  hasPhone.value = false
  cancelButton.value = true
}

const close = () => {
  hasPhone.value = true
  cancelButton.value = false
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Postcard /></el-icon>
          <h6 class="title">个人信息</h6>
        </div>
      </div>

      <div class="info-bar">
        <el-card class="info">
          <img src="@/assets/images/welcome.png" class="welcome" />
          <img src="@/assets/images/send.png" class="fly" />
          <span class="hi">Hi,{{ name }}!</span>

          <el-form
            class="info-form"
            label-width="80px"
            ref="changePasswordRef"
            :model="changePasswordForm"
          >
            <el-form-item label="教师编号">
              <el-input v-model="teacherId" readonly />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="name" readonly />
            </el-form-item>
            <el-form-item label="手机" prop="newPhone" :rules="rules.newPhone" v-show="!hasPhone">
              <el-input v-model="changePasswordForm.newPhone" maxlength="11" />
            </el-form-item>
            <el-form-item label="手机" v-show="hasPhone">
              <el-input v-model="phone" readonly />
            </el-form-item>
            <div>
              <el-button type="primary" v-show="!hasPhone" @click="bindPhone(changePasswordRef)"
                >绑定手机</el-button
              >
              <el-button type="primary" v-show="hasPhone" @click="update">更改绑定手机</el-button>
              <el-button type="danger" plain v-show="cancelButton" @click="close">取消</el-button>
              <el-button type="primary" @click="openDialog(changePasswordRef)">修改密码</el-button>
            </div>
            <el-dialog v-model="dialogVisible" title="修改密码">
              <el-form
                class="password-form"
                ref="changePasswordRef"
                :model="changePasswordForm"
                status-icon
                :rules="rules"
                label-width="120px"
              >
                <el-form-item label="旧密码" required prop="oldPassword">
                  <el-input
                    v-model="changePasswordForm.oldPassword"
                    autocomplete="off"
                    :readonly="readonlyFlag"
                    @focus="handlerIpClick"
                  />
                </el-form-item>
                <el-form-item label="新密码" required prop="newPassword">
                  <el-input
                    v-model="changePasswordForm.newPassword"
                    type="password"
                    show-password
                    autocomplete="off"
                    :readonly="readonlyFlag"
                    @focus="handlerIpClick"
                  />
                </el-form-item>
                <el-form-item label="确认新密码" required prop="checkPassword">
                  <el-input
                    v-model="changePasswordForm.checkPassword"
                    type="password"
                    show-password
                    autocomplete="off"
                    :readonly="readonlyFlag"
                    @focus="handlerIpClick"
                  />
                </el-form-item>
              </el-form>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="cancel">取消</el-button>
                  <el-button type="primary" @click="change(changePasswordRef)"> 修改 </el-button>
                </span>
              </template>
            </el-dialog>
          </el-form>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.table-container {
  padding: 0 20px;
}
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 2px solid #b1b3b8;
}
.card-title {
  height: 60px;
  font-size: 24px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;
}
.title {
  margin-left: 10px;
}
.info-bar {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: space-evenly;
}
.info {
  width: 600px;
  padding: 50px;
  position: relative;
}
.info-form {
  padding-top: 80px;
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}
.el-input {
  width: 240px;
}

.password-form {
  height: 300px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
}

.welcome {
  width: 200px;
  height: 200px;
  position: absolute;
  top: 10px;
  left: 10px;
}
.fly {
  width: 200px;
  height: 200px;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.hi {
  position: absolute;
  top: 30px;
  left: 220px;
  font-size: 40px;
}
</style>
