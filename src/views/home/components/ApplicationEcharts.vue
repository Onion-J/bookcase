<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import type { ECharts, EChartsOption } from 'echarts'
import { init } from 'echarts'
import { getYesterdayNumber } from '@/api/application'
import { ElMessage } from 'element-plus'

function getLastSevenDays(): string[] {
    const today = new Date(); 
    // 生成最近7天的日期数组
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        return date;
    });
    // 格式化日期为YYYY-MM-DD
    return lastSevenDays.map(date => {
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${month}-${day}`;
    });
}

const dateList = getLastSevenDays();

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
