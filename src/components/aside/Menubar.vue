<script setup lang="ts">
import router from '@/router'
import useUserStore from '@/stores/modules/user'

const userStore = useUserStore()

const isAdmin = userStore.userInfo.isAdmin
</script>

<template>
  <el-menu
    active-text-color="#337ecc"
    background-color="#fff"
    style="height: 100%"
    :default-active="router.currentRoute.value.path"
    text-color="#000"
    router
  >
    <el-menu-item index="/">
      <el-icon><TrendCharts /></el-icon>
      <span>概览</span>
    </el-menu-item>
    <el-menu-item index="/cabinet">
      <el-icon><Menu /></el-icon>
      <span>图书柜管理</span>
    </el-menu-item>
    <el-menu-item index="/student">
      <el-icon><UserFilled /></el-icon>
      <span>学生账户管理</span>
    </el-menu-item>
    <el-menu-item index="/applet">
      <el-icon><PictureFilled /></el-icon>
      <span>小程序轮播图管理</span>
    </el-menu-item>

    <el-sub-menu index="/superAdmin" v-show="isAdmin">
      <template #title>
        <el-icon><Grid /></el-icon>
        <span>超级管理员管理模块</span>
      </template>
      <el-menu-item index="/admin">
        <el-icon><Avatar /></el-icon>
        <span>管理员账户管理</span>
      </el-menu-item>
      <el-menu-item index="/major">
        <el-icon><Opportunity /></el-icon>
        <span>学院及专业信息管理</span>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.el-aside {
  background-color: #fff;
  border-right: 2px solid #dcdfe6;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
</style>
