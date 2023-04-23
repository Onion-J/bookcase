<script setup lang="ts">
import { computed, ref } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

interface User {
  teacherId: string
  name: string
  isDisabled: boolean
}

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) => !search.value || data.teacherId.toLowerCase().includes(search.value.toLowerCase())
  )
)

const tableData: User[] = [
  {
    teacherId: '123',
    name: '22',
    isDisabled: true
  },
  {
    teacherId: '123',
    name: '22',
    isDisabled: false
  }
]

// 筛选 是否禁用
const filterIsDisabled = (value: boolean, row: User) => {
  return row.isDisabled === value
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

const changePassword = (index: number, row: User) => {
  console.log(index, row)
}

const banedUse = (index: number, row: User) => {
  console.log(index, row)
}

const cancelBanedUse = (index: number, row: User) => {
  console.log(index, row)
}
const deleteAccount = (index: number, row: User) => {
  console.log(index, row)
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Collection /></el-icon>
          <h6 class="title">管理员账户</h6>
        </div>
        <div class="flex-grow" />
        <el-button type="primary" style="margin-right: 20px">添加管理员账户</el-button>
        <el-button type="primary" style="margin-right: 20px">设置超级管理员</el-button>
        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-table
        v-loading="refershLoading"
        element-loading-text="Loading..."
        :data="filterTableData"
        :default-sort="{ prop: 'teacherId', order: 'ascending' }"
        max-height="570"
        style="width: 100%"
      >
        <el-table-column label="教师编号" prop="teacherId" sortable />
        <el-table-column label="姓名" prop="name" />
        <el-table-column
          label="禁用状态"
          prop="isDisabled"
          :filters="[
            { text: '是', value: true },
            { text: '否', value: false }
          ]"
          :filter-method="filterIsDisabled"
        />
        <el-table-column>
          <template #header>
            <el-input
              v-model="search"
              placeholder="按教师编号检索"
              :prefix-icon="Search"
              style="width: 290px"
            />
          </template>
          <template #default="scope">
            <el-button
              type="primary"
              style="margin-right: 13px"
              @click="changePassword(scope.$index, scope.row)"
            >
              修改密码
            </el-button>
            <el-button
              type="danger"
              style="margin-right: 13px"
              v-show="!scope.row.isDisabled"
              @click="banedUse(scope.$index, scope.row)"
            >
              禁止使用
            </el-button>
            <el-button
              type="success"
              style="margin-right: 13px"
              v-show="scope.row.isDisabled"
              @click="cancelBanedUse(scope.$index, scope.row)"
            >
              取消禁用
            </el-button>
            <el-button type="danger" @click="deleteAccount(scope.$index, scope.row)">
              删除账户
            </el-button>
          </template>
        </el-table-column>
        <template #empty>
          <img src="@/assets/placeholder_images/nodata.png" alt="暂无数据" style="width: inherit" />
        </template>
      </el-table>
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
.el-button + .el-button {
  margin-left: 0;
}
.placeholder_images {
  width: inherit;
}
</style>
