<script setup lang="ts">
import { Search, CloseBold } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { getNotExpiredApplication } from '@/api/application'
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

const disabledDate = (time: Date) => {
  return time.getTime() > Date.now()
}

const tableData: Application[] = reactive([])
// 筛选区域信息列表
const areaList: FilterArea[] = reactive([])

getNotExpiredApplication()
  .then((res) => {
    if (res.data.code == 200) {
      tableData.push(...res.data.data.applyList)
      areaList.push(
        ...tableData
          .map((item) => item.area)
          .filter((item, index, arr) => {
            return arr.indexOf(item, 0) === index
          })
          .map((item) => ({ text: item, value: item }))
      )
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
const refresh = async () => {
  loading.value = true
  disabled.value = true
  await getNotExpiredApplication()
    .then((res) => {
      if (res.data.code == 200) {
        tableData.length = 0
        areaList.length = 0
        tableData.push(...res.data.data.applyList)
        areaList.push(
          ...tableData
            .map((item) => item.area)
            .filter((item, index, arr) => {
              return arr.indexOf(item, 0) === index
            })
            .map((item) => ({ text: item, value: item }))
        )
        ElMessage.success('数据刷新成功！')
      } else {
        ElMessage.error(res.data.message)
      }
    })
    .catch((err) => {
      ElMessage.error(err)
    })
  loading.value = false
  disabled.value = false
}
const reset = () => {
  if (tableData.length == 0) {
    return
  } else {
    loading.value = true
    disabled.value = true
    setTimeout(() => {
      studentId.value = ''
      createdDate.value = ''
      tableData.length == 0
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
