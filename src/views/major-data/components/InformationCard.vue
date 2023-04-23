<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'
import { ref } from 'vue'
interface Tree {
  label: string
  children?: Tree[]
}

const handleNodeClick = (data: Tree) => {
  console.log(data)
}

const data: Tree[] = [
  {
    label: '信息工程学院',
    children: [
      {
        label: '计算机科学与技术'
      },
      {
        label: '信息管理与信息系统'
      }
    ]
  },
  {
    label: '信息工程学院',
    children: [
      {
        label: '计算机科学与技术'
      },
      {
        label: '信息管理与信息系统'
      }
    ]
  }
]

const defaultProps = {
  children: 'children',
  label: 'label'
}

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
          <el-icon><Reading /></el-icon>
          <h6 class="title">学院及专业信息</h6>
        </div>
        <div class="flex-grow" />
        <el-button type="primary" style="margin-right: 20px">添加学院及专业</el-button>

        <el-button type="primary" style="margin-right: 20px">修改学院名称</el-button>

        <el-button type="danger" style="margin-right: 20px">删除学院或专业</el-button>

        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-tree :data="data" :props="defaultProps" default-expand-all @node-click="handleNodeClick">
      </el-tree>
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
.el-tree {
  min-height: 500px;
  font-size: 16px;
}
</style>

<style>
.el-tree-node__content {
  height: 46px;
}
</style>
