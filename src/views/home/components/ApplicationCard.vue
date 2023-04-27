<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'
import { getTodayApplication } from '@/api/application'
import { ElMessage } from 'element-plus'

interface Application {
  studentId: string
  name: string
  area: string
  sequenceNumber: number
  startDate: string
  endDate: string
  createAt: string
}

interface FilterArea {
  text: string
  value: string
}

const tableData: Application[] = reactive([])
// 筛选区域信息列表
const areaList: FilterArea[] = reactive([])

getTodayApplication()
  .then((res) => {
    if (res.data.code == 200) {
      tableData.push(...res.data.data.applyList)
      areaList.push(...tableData.map((item) => ({ text: item.area, value: item.area })))
    } else {
      ElMessage.error(res.data.message)
    }
  })
  .catch((err) => {
    ElMessage.error(err)
  })

const filterArea = (value: string, row: Application) => {
  return row.area === value
}

const refershLoading = ref(false)
const disabled = ref(false)
const refresh = async () => {
  refershLoading.value = true
  disabled.value = true
  await getTodayApplication()
    .then((res) => {
      if (res.data.code == 200) {
        tableData.length = 0
        areaList.length = 0
        tableData.push(...res.data.data.applyList)
        areaList.push(...tableData.map((item) => ({ text: item.area, value: item.area })))
        ElMessage.success('数据刷新成功！')
      } else {
        ElMessage.error(res.data.message)
      }
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
          <el-icon><Bell /></el-icon>
          <h6 class="title">申请动态</h6>
        </div>
        <div class="flex-grow" />
        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-table
        v-loading="refershLoading"
        element-loading-text="Loading..."
        :data="tableData"
        :default-sort="{ prop: 'createdAt', order: 'descending' }"
        height="500"
        style="width: 100%"
      >
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="area" label="区域" :filters="areaList" :filter-method="filterArea" />
        <el-table-column prop="sequenceNumber" label="柜号" />
        <el-table-column prop="startDate" label="开始日期" />
        <el-table-column prop="endDate" label="结束日期" />
        <el-table-column prop="createAt" label="申请时间" sortable />
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
.el-card {
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
</style>
