<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'
import bookcaseStore from '@/stores/modules/bookcase'
import { ElMessage } from 'element-plus'

// 单个储物柜信息
interface Bookcase {
  area: string
  sequenceNumber: number
  occupied: boolean
}

// 数据
const data: { name: string; value: number }[] = reactive([])

// 获取后端储物柜数据
const store = bookcaseStore()
store
  .GetBookcaseInfo()
  .then(() => {
    const bookcaseList = store.bookcaseList
    // 表格数据
    data.push(...getBookcaseAreaList(bookcaseList))
  })
  .catch((err) => {
    ElMessage.error(err)
  })

// 对后端数据进行处理
const getBookcaseAreaList = (bookcase: Bookcase[]) => {
  const result: Record<string, any> = {}
  bookcase.forEach((item) => {
    if (result[item.area]) {
      result[item.area] = item.occupied
        ? { value: result[item.area].value + 1 }
        : { value: result[item.area].value }
    } else {
      result[item.area] = item.occupied ? { value: 1 } : { value: 0 }
    }
  })

  return Object.entries(result).map(([key, value]) => ({ name: key, ...value }))
}

let chart: ECharts
const chartRef: Ref<HTMLElement | null> = ref(null)
// 初始化图表
const initChart = () => {
  const option: EChartsOption = {
    series: [
      {
        type: 'pie',
        roseType: 'area'
      }
    ]
  }
  chart.setOption(option)
}
// 更新图表
const updateChart = () => {
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: [25, 125],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: data.length
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        data: data.sort((a, b) => {
          return a.value - b.value
        })
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
  width: 600px;
  height: 300px;
}
</style>
