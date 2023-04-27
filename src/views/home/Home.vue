<script setup lang="ts">
import Navbar from '@/components/header/Navbar.vue'
import Menubar from '@/components/aside/Menubar.vue'
import ApplicationCard from './components/ApplicationCard.vue'
import ApplicationQueryCard from './components/ApplicationQueryCard.vue'
import ApplicationEcharts from './components/ApplicationEcharts.vue'
import UsageEcharts from './components/UsageEcharts.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-container class="context">
        <el-aside>
          <Menubar />
        </el-aside>

        <el-main style="background-color: #f2f3f5; padding-bottom: 30px">
          <el-scrollbar>
            <div>
              <h1 class="title">丨管理概览</h1>
            </div>
            <ApplicationEcharts />
            <UsageEcharts />
            <div>
              <h1 class="title">丨最新动态</h1>
            </div>
            <ApplicationCard />
            <div>
              <h1 class="title">丨申请情况检索</h1>
            </div>
            <ApplicationQueryCard />
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  min-height: 100vh;
  margin: 0 auto;
}
.context {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.title {
  width: 500px;
  user-select: none;
  cursor: default;
}
</style>
