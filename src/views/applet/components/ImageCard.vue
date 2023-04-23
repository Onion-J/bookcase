<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'

const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'

const refershLoading = ref(false)
const disabled = ref(false)
const refresh = () => {
  refershLoading.value = true
  disabled.value = true
  setTimeout(() => {
    refershLoading.value = false
    disabled.value = false
  }, 3000)
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Picture /></el-icon>
          <h6 class="title">当前轮播图</h6>
        </div>
        <div class="flex-grow" />
        <el-button type="primary">上传图片</el-button>
        <el-button type="danger">删除图片</el-button>
        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-carousel height="32vw">
        <el-carousel-item v-for="item in 6" :key="item">
          <el-image style="width: 100%; height: 100%" :src="url" fit="cover">
            <template #placeholder>
              <div class="image-slot">Loading<span class="dot">...</span></div>
            </template>
          </el-image>
        </el-carousel-item>
      </el-carousel>
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
.flex-grow {
  flex-grow: 1;
}
</style>
