<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'

let chart: ECharts
const chartRef: Ref<HTMLElement | null> = ref(null)
// 初始化图表
const initChart = () => {
  const option: EChartsOption = {
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ]
      }
    ]
  }
  chart.setOption(option)
}
// 更新图表
const updateChart = () => {
  const option: EChartsOption = {
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ]
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
  interval = setInterval(() => {
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
        <h2 class="title">储物柜各区域使用情况</h2>
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
  width: 100%;
  height: 500px;
}
</style>
