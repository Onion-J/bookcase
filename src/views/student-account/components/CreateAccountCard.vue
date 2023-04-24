<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import instituteStore from '@/stores/modules/institute'

interface Institute {
  id: string
  name: string
  major: Major[]
}

interface Major {
  instituteId: string
  id: string
  name: string
}

// 生成年份
const date = new Date()
const year = date.getFullYear()
const enrollmentYear = ref('')
const enrollmentYearOptions = [
  { value: year - 2004, label: year - 4 },
  { value: year - 2003, label: year - 3 },
  { value: year - 2002, label: year - 2 },
  { value: year - 2001, label: year - 1 },
  { value: year - 2000, label: year }
]

// 数据处理
// const getInfo = (instituteInfo: Institute[]) => {
//   instituteInfo.forEach()
// }

const store = instituteStore()
// 获取数据
store
  .GetInstituteInfo()
  .then(() => {
    // data.push(...store.instituteInfo)
  })
  .catch((err) => {
    ElMessage.error(err)
  })

const collegeAndMajor = ref([])
const collegeAndMajorOptions = [
  {
    value: '01',
    label: '材料科学与工程学院',
    children: [
      {
        value: '06',
        label: '粉体材料科学与工程专业'
      }
    ]
  },
  {
    value: '06',
    label: '信息工程学院',
    children: [
      {
        value: '01',
        label: '计算机科学与技术专业'
      },
      {
        value: '03',
        label: '信息管理与信息系统专业'
      }
    ]
  }
]

const classNumber = ref(1)
const num = ref(1)

const initialStudentId = ref('')
const generate = () => {
  if (enrollmentYear.value == '') {
    ElMessage({
      message: '请选择入学年份！',
      type: 'warning'
    })
    return
  }
  if (collegeAndMajor.value.length == 0) {
    ElMessage({
      message: '请选择学院级专业！',
      type: 'warning'
    })
    return
  }
  initialStudentId.value =
    '1' +
    enrollmentYear.value +
    collegeAndMajor.value[0] +
    collegeAndMajor.value[1] +
    '00' +
    classNumber.value
}

const getAccountList = (initialStudentId: string, num: number) => {
  const accountList = []

  for (let i = 1; i <= num; i++) {
    const studentId = Number(initialStudentId + '00') + i
    accountList.push(String(studentId))
  }
  return accountList
}

const createAccount = () => {
  if (initialStudentId.value == '') {
    ElMessage({
      message: '请先生成学号初始编号！',
      type: 'warning'
    })
  } else {
    ElMessageBox.confirm('批量创建学生账户，是否继续?', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        const accountList = getAccountList(initialStudentId.value, num.value)

        console.log(accountList)

        ElMessage({
          type: 'success',
          message: '创建成功！'
        })
        reset()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消创建！'
        })
        reset()
      })
  }
}
const reset = () => {
  enrollmentYear.value = ''
  collegeAndMajor.value = []
  classNumber.value = 1
  num.value = 1
  initialStudentId.value = ''
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><DocumentAdd /></el-icon>
          <h6 class="title">创建学生账户</h6>
        </div>
      </div>

      <div class="panel-bar">
        <el-card class="panel">
          <h5>生成学号初始编号</h5>
          <div style="height: 60px">
            <el-select v-model="enrollmentYear" placeholder="选择入学年份" style="width: 130px">
              <el-option
                v-for="item in enrollmentYearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <el-cascader
              v-model="collegeAndMajor"
              :options="collegeAndMajorOptions"
              :props="{ expandTrigger: 'hover' }"
              clearable
              filterable
              placeholder="选择学院及专业"
              style="width: 360px; margin-left: 10px"
            >
              <template #default="{ node, data }">
                <span>{{ data.label }}</span>
                <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
              </template>
            </el-cascader>
          </div>

          <div class="text">
            选择班级:
            <el-input-number v-model="classNumber" :min="1" :max="9" />
          </div>

          <div class="button-bar">
            <el-button type="primary" @click="generate">生成</el-button>
          </div>
        </el-card>

        <el-card class="panel">
          <h5>创建学生账户</h5>
          <div class="text">
            学号初始编号：
            <el-input
              v-model="initialStudentId"
              disabled
              placeholder="学号初始编号"
              style="width: 200px"
            />
          </div>

          <div class="text">
            创建数量：
            <el-input-number v-model="num" :min="1" :max="99" controls-position="right" />
          </div>

          <div class="button-bar">
            <el-button type="primary" @click="createAccount">创建</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.table-container {
  padding: 0 20px;
  margin-bottom: 50px;
}
.card-header {
  display: flex;
  align-items: center;
  border-bottom: 2px solid #b1b3b8;
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
.panel-bar {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.panel {
  margin: 10px;
  padding: 0 30px 20px 30px;
  display: flex;
  width: 540px;
  height: 280px;
  flex-direction: column;
  justify-content: center;
}
.text {
  font-size: 16px;
  margin-bottom: 30px;
}
.button-bar {
  display: flex;
  justify-content: end;
}
</style>
