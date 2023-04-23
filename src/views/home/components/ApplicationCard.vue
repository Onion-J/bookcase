<script setup lang="ts">
import { ref } from 'vue'
import { Refresh } from '@element-plus/icons-vue'

interface Application {
  studentId: string
  name: string
  area: string
  sequenceNumber: number
  startDate: string
  endDate: string
  createdAt: string
}

interface FilterArea {
  text: string
  value: string
}

const tableData: Application[] = [
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

const filterArea = (value: string, row: Application) => {
  return row.area === value
}

// 获取区域，返回区域数组
let getArealist = tableData.map((item) => {
  return item.area
})
// 将区域数组去重
let simplifyAreaList = getArealist.reduce((prev: string[], next: string) => {
  if (!prev.includes(next)) {
    prev.push(next)
  }
  return prev
}, [])
// 生成区域筛选对象数组
let areaListObject = simplifyAreaList.reduce((prev: FilterArea[], next: string) => {
  prev.push({
    text: next,
    value: next
  })
  return prev
}, [])

const areaList: FilterArea[] = areaListObject

// const search = ref('')
// const filterTableData = computed(() =>
//   tableData.filter(
//     (data) => !search.value || data.studentId.toLowerCase().includes(search.value.toLowerCase())
//   )
// )

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
        <el-table-column prop="createdAt" label="申请时间" sortable />
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
