<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import userStore from '@/stores/modules/user'
import { ElMessage } from 'element-plus'

interface User {
  teacherId: string
  name: string
  phone: string
  isAdmin: boolean
  isDisabled: boolean
}

// 搜索框筛选
const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) => !search.value || data.teacherId.toLowerCase().includes(search.value.toLowerCase())
  )
)

const tableData: User[] = reactive([])
const store = userStore()
// 获取数据
store
  .GetUserInfoList()
  .then(() => {
    store.userInfoList.forEach((item: User) => {
      if (item.isAdmin) {
        tableData.push(item)
      }
    })
  })
  .catch((err) => {
    ElMessage.error(err)
  })

// 刷新
const refershLoading = ref(false)
const disabled = ref(false)
const refresh = async () => {
  refershLoading.value = true
  disabled.value = true
  await store
    .GetUserInfoList()
    .then(() => {
      tableData.length = 0
      store.userInfoList.forEach((item: User) => {
        if (item.isAdmin) {
          tableData.push(item)
        }
      })
      ElMessage.success('数据刷新成功！')
    })
    .catch((err) => {
      ElMessage.error(err)
    })

  refershLoading.value = false
  disabled.value = false
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Tickets /></el-icon>
          <h6 class="title">超级管理员详情</h6>
        </div>
        <div class="flex-grow" />
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
        <el-table-column label="手机" prop="phone" />
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
.flex-grow {
  flex-grow: 1;
}
.placeholder_images {
  width: inherit;
}
</style>
