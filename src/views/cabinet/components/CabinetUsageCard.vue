<script setup lang="ts">
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

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

const areaOptions = ['崇德区', '季红区', '湘湖区']
const areaValue = ref(areaOptions[0])

const usedRecord = [
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '翠湖区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '崇德区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:00'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    area: '季红区',
    sequenceNumber: 1,
    startDate: '2023/4/15',
    endDate: '2023/5/15',
    createdAt: '2023/4/14 23:00:44'
  }
]

const getTableData = usedRecord.filter((item) => {
  return item.area == areaValue.value
})

const tableData = ref(getTableData)

const changeSelect = () => {
  refresh()
  tableData.value = usedRecord.filter((item) => {
    return item.area == areaValue.value
  })
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Memo /></el-icon>
          <h6 class="title">图书柜当前使用详情</h6>
        </div>
        <div class="flex-grow" />
        <el-select
          v-model="areaValue"
          placeholder="选择图书柜区域"
          :disabled="disabled"
          @change="changeSelect"
          style="margin-right: 20px"
        >
          <template #prefix>
            <el-icon style="color: var(--el-color-primary); font-size: 16px"><Filter /></el-icon>
          </template>
          <el-option v-for="item in areaOptions" :key="item" :label="item" :value="item" />
        </el-select>
        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-table
        v-loading="refershLoading"
        element-loading-text="Loading..."
        :data="tableData"
        :default-sort="{ prop: 'sequenceNumber', order: 'ascending' }"
        height="500"
        style="width: 100%"
      >
        <el-table-column prop="sequenceNumber" label="书柜号" sortable />
        <el-table-column prop="studentId" label="学号" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="startDate" label="开始日期" />
        <el-table-column prop="endDate" label="结束日期" />
      </el-table>
      <template #empty>
        <img src="@/assets/placeholder_images/nodata.png" alt="暂无数据" style="width: inherit" />
      </template>
    </el-card>
  </div>
</template>

<style scoped>
.table-container {
  margin-bottom: 50px;
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
</style>
