<script setup lang="ts"></script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Tickets /></el-icon>
          <h6 class="title">超级管理员详情</h6>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.table-container {
  padding: 0 20px;
  margin-bottom: 50px;
}
.card-header {
  display: flex;
  align-items: center;
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
</style>
