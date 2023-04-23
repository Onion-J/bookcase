<script setup lang="ts">
import router from '@/router'
import useStore from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
import screenfull from 'screenfull'
import { FullScreen } from '@element-plus/icons-vue'

const store = useStore()
const userName = store.userInfo.name

const toProfile = () => {
  router.push({
    path: '/profile'
  })
}

const logout = () => {
  store.Logout()
  router.replace({
    path: '/login'
  })
  ElMessage.success('退出登陆成功！')
}

const SetFullScreen = () => {
  //screenfull.isEnabled  此方法返回布尔值，判断当前能不能进入全屏

  if (!screenfull.isEnabled) {
    return false
  }

  //screenfull.toggle 此方法是执行全屏化操作。如果已是全屏状态，则退出全屏

  screenfull.toggle()
}
</script>

<template>
  <div class="header">
    <div class="title-container">
      <h5 class="title">高校图书馆图书柜管理系统</h5>
    </div>
    <div class="flex-grow" />
    <el-button @click="SetFullScreen" :icon="FullScreen" />
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-icon class="el-icon--user"><User /></el-icon>
        {{ userName }}
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toProfile">个人中心</el-dropdown-item>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
.header {
  padding: 0;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #dcdfe6;
}
.flex-grow {
  flex-grow: 1;
}
.title-container {
  width: 300px;
  height: 60px;
  cursor: default;
}
.title {
  text-align: center;
  line-height: 0;
  color: #337ecc;
  user-select: none;
}
.el-dropdown-link {
  width: 200px;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  cursor: default;
}
.el-dropdown-link:hover {
  color: var(--el-color-primary);
  background-color: #f9f9f9;
}
.el-dropdown-link:focus {
  outline: none;
}
.el-icon--user {
  font-size: 18px;
}
.el-icon--right {
  font-size: 12px;
}
</style>
