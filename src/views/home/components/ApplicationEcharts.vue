<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'
import { getYesterdayNumber } from '@/api/application'
import { ElMessage } from 'element-plus'

const dateList = [
  ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (new Date().getDate() - 7),
  ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (new Date().getDate() - 6),
  ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (new Date().getDate() - 5),
  ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (new Date().getDate() - 4),
  ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (new Date().getDate() - 3),
  ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (new Date().getDate() - 2),
  ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + (new Date().getDate() - 1)
]

const recordsNumberList: number[] = reactive([])

getYesterdayNumber()
  .then((res) => {
    if (res.data.code == 200) {
      recordsNumberList.push(...res.data.data.numberList)
    }
  })
  .catch((err) => {
    ElMessage.error(err)
  })

let chart: ECharts
const chartRef: Ref<HTMLElement | null> = ref(null)
// 初始化图表
const initChart = () => {
  const option: EChartsOption = {
    xAxis: {
      type: 'category'
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        type: 'line'
      }
    ]
  }
  chart.setOption(option)
}
// 更新图表
const updateChart = () => {
  const option: EChartsOption = {
    xAxis: {
      data: dateList
    },
    series: [
      {
        data: recordsNumberList
      }
    ]
  }
  chart.setOption(option)
}
// 声明定时器
let interval: number | null = null
onMounted(() => {
  chart = init(chartRef.value as HTMLElement)
  initChart()
  // 延时2秒后执行增量更新
  setTimeout(() => {
    updateChart()
  }, 2000)
  // 添加定时器，每隔5秒重新渲染图表
  interval = window.setInterval(() => {
    chart.clear()
    initChart()
    updateChart()
  }, 5000)
})
// 卸载组件时清除定时器
onUnmounted(() => {
  interval && clearInterval(interval)
})
</script>

<template>
  <el-card>
    <div class="card-header">
      <div class="card-title">
        <h2 class="title">储物柜近一周申请情况</h2>
      </div>
    </div>
    <div class="chart" ref="chartRef"></div>
  </el-card>
</template>

<style scoped>
.el-card {
  margin: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}
.card-title {
  height: 60px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: default;
}

.chart {
  width: 600px;
  height: 300px;
}
</style>
