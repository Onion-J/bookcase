<script setup lang="ts">
import { CloseBold } from '@element-plus/icons-vue'
import { ElMessage, valueEquals } from 'element-plus'
import { reactive, ref } from 'vue'
import { getUsageRecords } from '@/api/application'
import bookcaseStore from '@/stores/modules/bookcase'

interface Application {
  studentId: string
  name: string
  area: string
  sequenceNumber: number
  startDate: string
  endDate: string
  createdAt: string
}

// 单个储物柜信息
interface Bookcase {
  area: string
  sequenceNumber: number
  occupied: boolean
}

const tableData: Application[] = reactive([])

const bookcaseInfoList: { [key: string]: number[] } = reactive({})

// 获取后端储物柜数据
const store = bookcaseStore()
store
  .GetBookcaseInfo()
  .then(() => {
    const bookcaseList = store.bookcaseList

    areaOptions.push(
      ...bookcaseList
        .map((item: Application) => item.area)
        .filter((item, index, arr) => {
          return arr.indexOf(item, 0) === index
        })
    )
    bookcaseList.forEach((item: Bookcase) => {
      if (bookcaseInfoList[item.area]) {
        bookcaseInfoList[item.area].push(item.sequenceNumber)
      } else {
        bookcaseInfoList[item.area] = [item.sequenceNumber]
      }
    })
  })
  .catch((err) => {
    ElMessage.error(err)
  })

const areaValue = ref('')
const areaOptions: string[] = reactive([])

const sequenceNumberValue = ref('')
const sequenceNumberOptions: number[] = reactive([])

const areaChanged = () => {
  if (areaValue.value == '') {
    return
  } else {
    sequenceNumberOptions.length = 0
    sequenceNumberOptions.push(...bookcaseInfoList[areaValue.value])
  }
}

const queryByAreaAndSequenceNumber = async () => {
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
      loading.value = true
      disabled.value = true
      const cabinet = {
        area: areaValue.value,
        sequenceNumber: sequenceNumberValue.value
      }
      await getUsageRecords(cabinet)
        .then((res) => {
          if (res.data.code == 200) {
            tableData.length = 0
            tableData.push(...res.data.data.applyList)
            ElMessage.success('检索成功！')
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
  }
}

const loading = ref(false)
const disabled = ref(false)
const reset = () => {
  if (tableData.length == 0) {
    return
  } else {
    loading.value = true
    disabled.value = true
    setTimeout(() => {
      areaValue.value = ''
      sequenceNumberValue.value = ''
      tableData.length = 0
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
