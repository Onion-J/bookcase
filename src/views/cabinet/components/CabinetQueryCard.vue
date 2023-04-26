<script setup lang="ts">
import { CloseBold } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
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

// 生成选择区域数组
let areaListObject = getArealist.reduce((prev: any, next: string) => {
  // prev.push({})
  prev[next] = prev[next] + 1 || 1
  return prev
}, [])

const areaValue = ref('')
const areaOptions = Object.keys(areaListObject)

let getSequenceNumberList = (selectArea: string) => {
  const sequenceNumberList: number[] = []
  let length = areaListObject[selectArea]
  for (let i = 1; i <= length; i++) {
    sequenceNumberList.push(i)
  }
  return sequenceNumberList
}

const sequenceNumberValue = ref('')
const sequenceNumberOptions = ref<number[]>([])

const areaChanged = () => {
  if (areaValue.value == '') {
    return
  } else {
    sequenceNumberOptions.value = getSequenceNumberList(areaValue.value)
  }
}

const queryByAreaAndSequenceNumber = () => {
  if (areaValue.value == '') {
    ElMessage({
      message: '请选择储物柜区域！',
      type: 'warning'
    })
  } else {
    if (sequenceNumberValue.value == '') {
      ElMessage({
        message: '请选择储物柜号码！',
        type: 'warning'
      })
    } else {
      console.log(areaValue.value, sequenceNumberValue.value)
      refresh()
    }
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
      areaValue.value = ''
      sequenceNumberValue.value = ''
      tableData.value = []
      loading.value = false
      disabled.value = false
    }, 1000)
  }
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Tickets /></el-icon>
          <h6 class="title">储物柜使用记录</h6>
        </div>
        <div class="flex-grow" />

        <div class="query-contaniner">
          <el-select
            v-model="areaValue"
            placeholder="选择储物柜区域"
            :disabled="disabled"
            @change="areaChanged"
          >
            <el-option v-for="item in areaOptions" :key="item" :label="item" :value="item" />
          </el-select>

          <el-select
            v-model="sequenceNumberValue"
            placeholder="选择储物柜号码"
            no-data-text="请先选择储物柜区域！"
            :disabled="disabled"
          >
            <el-option
              v-for="item in sequenceNumberOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>

          <el-button type="primary" @click="queryByAreaAndSequenceNumber">检索</el-button>
        </div>

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
.query-contaniner {
  width: 480px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
}
</style>
