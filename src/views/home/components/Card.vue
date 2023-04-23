<script setup lang="ts">
import bookcaseStore from '@/stores/modules/bookcase'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

// 单个图书柜信息
interface Bookcase {
  area: string
  sequenceNumber: number
  occupied: boolean
}
const usage = ref(0)
const totalNumber = ref(0)
const bstore = bookcaseStore()
bstore
  .GetBookcaseInfo()
  .then(() => {
    const bookcaseList: Bookcase[] = bstore.bookcaseList
    totalNumber.value = bookcaseList.length

    bookcaseList.forEach((item) => {
      item.occupied ? (usage.value = usage.value + 1) : ''
    })
  })
  .catch((err) => {
    ElMessage.error(err)
  })
</script>

<template>
  <div class="card-container">
    <div class="top">
      <el-card>
        <div class="card">
          <div class="icon">
            <el-icon><PieChart /></el-icon>
          </div>
          <div class="statistic">
            <el-statistic title="图书柜使用情况" :value="usage">
              <template #suffix>{{ ' / ' + totalNumber }}</template>
            </el-statistic>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="card">
          <div class="icon">
            <el-icon><Document /></el-icon>
          </div>
          <div class="statistic">
            <el-statistic title="昨日图书柜申请情况" :value="98500"> </el-statistic>
          </div>
        </div>
      </el-card>
    </div>
    <div class="down">
      <el-card>
        <div class="card">
          <div class="icon">
            <el-icon><DocumentAdd /></el-icon>
          </div>
          <div class="statistic">
            <el-statistic title="昨日图书柜续期情况" :value="98500"> </el-statistic>
          </div>
        </div>
      </el-card>
      <el-card>
        <div class="card">
          <div class="icon">
            <el-icon><Unlock /></el-icon>
          </div>
          <div class="statistic">
            <el-statistic title="今日图书柜到期情况" :value="98500"> </el-statistic>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.top,
.down {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.el-card {
  margin: 20px;
  cursor: default;
}
.card {
  width: 300px;
  min-width: 60px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.icon {
  width: 60px;
  font-size: 60px;
  color: #337ecc;
}
.statistic {
  width: 180px;
}
</style>
