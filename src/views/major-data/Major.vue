<script setup lang="ts">
import Navbar from '@/components/header/Navbar.vue'
import Menubar from '@/components/aside/Menubar.vue'
import InformationCard from './components/InformationCard.vue'
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

        <el-main style="background-color: #f2f3f5">
          <el-scrollbar>
            <div>
              <h1 class="title">丨学院及专业信息管理</h1>
            </div>
            <InformationCard />
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
}
</style>
