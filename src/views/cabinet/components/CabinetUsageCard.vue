<script setup lang="ts">
import { reactive, ref } from 'vue'
import { getNotExpiredApplication } from '@/api/application'
import { Refresh } from '@element-plus/icons-vue'
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

const usedRecord: Application[] = reactive([])
// 筛选区域信息列表
const areaList: string[] = reactive([])
const areaValue = ref()

getNotExpiredApplication()
  .then((res) => {
    if (res.data.code == 200) {
      usedRecord.push(...res.data.data.applyList)
      areaList.push(
        ...usedRecord
          .map((item) => item.area)
          .filter((item, index, arr) => {
            return arr.indexOf(item, 0) === index
          })
      )
    } else {
      ElMessage.error(res.data.message)
    }
  })
  .catch((err) => {
    ElMessage.error(err)
  })

const refershLoading = ref(false)
const disabled = ref(false)
const refresh = async () => {
  refershLoading.value = true
  disabled.value = true
  await getNotExpiredApplication()
    .then((res) => {
      if (res.data.code == 200) {
        usedRecord.length = 0
        usedRecord.push(...res.data.data.applyList)
        areaList.length = 0
        areaList.push(
          ...usedRecord
            .map((item) => item.area)
            .filter((item, index, arr) => {
              return arr.indexOf(item, 0) === index
            })
        )
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
          <h6 class="title">储物柜当前使用详情</h6>
        </div>
        <div class="flex-grow" />
        <el-select
          v-model="areaValue"
          placeholder="选择储物柜区域"
          :disabled="disabled"
          @change="changeSelect"
          style="margin-right: 20px"
        >
          <template #prefix>
            <el-icon style="color: var(--el-color-primary); font-size: 16px"><Filter /></el-icon>
          </template>
          <el-option v-for="item in areaList" :key="item" :label="item" :value="item" />
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
