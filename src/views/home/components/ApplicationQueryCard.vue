<script setup lang="ts">
import { Search, CloseBold } from '@element-plus/icons-vue'
import { ref } from 'vue'

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

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

const tableData = ref<Application[]>([
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
])

// 获取区域，返回区域数组
let getArealist = tableData.value.map((item) => {
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

const filterArea = (value: string, row: Application) => {
  return row.area === value
}

const createdDate = ref('')
const queryByCreateDate = () => {
  if (createdDate.value == null) {
    reset()
  } else {
    console.log(createdDate.value)
    refresh()
  }
}

const loading = ref(false)
const disabled = ref(false)
const refresh = () => {
  loading.value = true
  disabled.value = true
  setTimeout(() => {
    loading.value = false
    disabled.value = false
  }, 3000)
}
const reset = () => {
  if (tableData.value.length == 0) {
    return
  } else {
    loading.value = true
    disabled.value = true
    setTimeout(() => {
      studentId.value = ''
      createdDate.value = ''
      tableData.value = []
      loading.value = false
      disabled.value = false
    }, 1000)
  }
}

const studentId = ref('')
const queryByStudentId = () => {
  if (studentId.value == '') {
    return
  } else {
    console.log(studentId.value)
    refresh()
  }
}
const studentIdChanged = () => {
  if (studentId.value == '') {
    reset()
  }
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Tickets /></el-icon>
          <h6 class="title">申请情况</h6>
        </div>
        <div class="flex-grow" />

        <el-input
          v-model="studentId"
          placeholder="按学号检索"
          :prefix-icon="Search"
          :disabled="disabled"
          maxlength="12"
          @change="studentIdChanged"
          style="width: 240px; margin-right: 20px"
        >
          <template #append>
            <el-button
              style="color: #fff; background-color: var(--el-color-primary)"
              @click="queryByStudentId"
            >
              检索
            </el-button>
          </template>
        </el-input>
        <el-date-picker
          v-model="createdDate"
          type="date"
          placeholder="按申请日期检索"
          :disabled-date="disabledDate"
          :clearable="false"
          :disabled="disabled"
          value-format="YYYY-MM-DD"
          @change="queryByCreateDate"
          style="margin-right: 20px"
        />

        <el-button :disabled="disabled" :icon="CloseBold" @click="reset" />
      </div>

      <el-table
        v-loading="loading"
        element-loading-text="Loading..."
        :data="tableData"
        :default-sort="{ prop: 'createdAt', order: 'descending' }"
        height="600"
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
