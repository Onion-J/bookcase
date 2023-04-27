<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import { Search, CloseBold } from '@element-plus/icons-vue'
import instituteStore from '@/stores/modules/institute'
import { getEnrollmentYear, selectStudentAccount, deleteStudentAccount } from '@/api/student'

interface Student {
  studentId: string
  name: string
  phone: string
}

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

interface InfoOptions {
  value: string
  label: string
  children: InfoOptions[]
}

// 获取可选择的入学年份
getEnrollmentYear()
  .then((res) => {
    if (res.data.code == 200) {
      if (res.data.data.enrollmentYearList !== null) {
        res.data.data.enrollmentYearList.forEach((item: string) => {
          enrollmentYearOptions.push({ value: item, label: '20' + item, children: [] })
        })
      } else {
        enrollmentYearOptions.length = 0
      }
    } else {
      ElMessage.error(res.data.message)
    }
  })
  .catch((err) => {
    ElMessage.error(err)
  })

const store = instituteStore()
// 获取可选择的学院及专业
store
  .GetInstituteInfo()
  .then(() => {
    const instituteInfo = store.instituteInfo
    collegeAndMajorOptions.push(...getInfo(instituteInfo))
  })
  .catch((err) => {
    ElMessage.error(err)
  })

// 数据处理
const getInfo = (instituteInfo: Institute[]) => {
  const result: InfoOptions[] = []
  instituteInfo.forEach(({ id, name, major }, index) => {
    result.push({ value: id, label: name, children: [] })
    major.forEach((item) => {
      result[index].children.push({
        value: item.id,
        label: item.name,
        children: []
      })
    })
  })
  return result
}

const enrollmentYear = ref('')
let enrollmentYearOptions: InfoOptions[] = reactive([])

const collegeAndMajor = ref([''])
const collegeAndMajorOptions: InfoOptions[] = reactive([])

const tableData: Student[] = reactive([])

const loading = ref(false)
const disabled = ref(false)
const reset = () => {
  if (
    tableData.length == 0 &&
    studentId.value == '' &&
    enrollmentYear.value == '' &&
    collegeAndMajor.value[0] == '' &&
    collegeAndMajor.value[1] == undefined
  ) {
    return
  } else {
    loading.value = true
    disabled.value = true
    studentId.value = ''
    enrollmentYear.value = ''
    collegeAndMajor.value = ['']
    tableData.length = 0
    setTimeout(() => {
      loading.value = false
      disabled.value = false
    }, 1000)
  }
}

const studentId = ref('')
const queryByStudentId = async () => {
  if (studentId.value.length != 12) {
    ElMessage({
      type: 'warning',
      message: '请输入完整的学号！'
    })
    return
  } else {
    loading.value = true
    disabled.value = true
    const studentData = {
      studentId: studentId.value
    }
    await selectStudentAccount(studentData)
      .then((res) => {
        if (res.data.code == 200) {
          enrollmentYear.value = ''
          collegeAndMajor.value = ['']
          tableData.length = 0
          tableData.push(...res.data.data.students)
          ElMessage.success('查询成功！')
          if (res.data.data.students.length == 0) {
            ElMessage.success('查询数据为空！')
          }
        } else {
          ElMessage.error(res.data.message)
        }
      })
      .catch((err) => {
        ElMessage.error(err)
      })
      .finally(() => {
        loading.value = false
        disabled.value = false
      })
  }
}

const queryByOptions = async () => {
  if (
    enrollmentYear.value == '' &&
    collegeAndMajor.value[0] == '' &&
    collegeAndMajor.value[1] == undefined
  ) {
    ElMessage({
      type: 'warning',
      message: '请先选择检索条件！'
    })
    return
  } else {
    loading.value = true
    disabled.value = true
    const studentData = {
      studentId: collegeAndMajor.value[1]
        ? (enrollmentYear.value ? '1' + enrollmentYear.value : '') +
          collegeAndMajor.value[0] +
          collegeAndMajor.value[1]
        : (enrollmentYear.value ? '1' + enrollmentYear.value : '') + collegeAndMajor.value[0]
    }
    await selectStudentAccount(studentData)
      .then((res) => {
        if (res.data.code == 200) {
          studentId.value = ''
          tableData.length = 0
          tableData.push(...res.data.data.students)
          ElMessage.success('查询成功！')
          if (res.data.data.students.length == 0) {
            ElMessage.success('查询数据为空！')
          }
        } else {
          ElMessage.error(res.data.message)
        }
      })
      .catch((err) => {
        ElMessage.error(err)
      })
      .finally(() => {
        loading.value = false
        disabled.value = false
      })
  }
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Student[]>([])

const handleSelectionChange = (val: Student[]) => {
  multipleSelection.value = val
}

const deleteAccount = async () => {
  if (multipleSelection.value.length == 0) {
    ElMessage({
      type: 'warning',
      message: '请先选择需要删除的账户！'
    })
  } else {
    loading.value = true
    disabled.value = true
    const studentData = {
      accountList: multipleSelection.value
    }
    await deleteStudentAccount(studentData)
      .then((res) => {
        if (res.data.code == 200) {
          tableData.length = 0
          ElMessage.success('删除成功！')
        } else {
          ElMessage.error(res.data.message)
        }
      })
      .catch((err) => {
        ElMessage.error(err)
      })
      .finally(() => {
        loading.value = false
        disabled.value = false
      })
  }
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><CollectionTag /></el-icon>
          <h6 class="title">管理学生账户</h6>
        </div>
        <div class="flex-grow" />

        <el-input
          v-model="studentId"
          placeholder="按学号检索"
          :prefix-icon="Search"
          :disabled="disabled"
          maxlength="12"
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

        <div style="display: flex; align-items: center; margin-right: 20px">
          <el-select v-model="enrollmentYear" placeholder="按入学年份检索" style="width: 150px">
            <el-option
              v-for="item in enrollmentYearOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div style="margin: 0 3px">-</div>
          <el-cascader
            v-model="collegeAndMajor"
            :options="collegeAndMajorOptions"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            clearable
            filterable
            placeholder="按学院或专业检索"
            style="width: 360px; margin-right: 10px"
          >
            <template #default="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
          <el-button type="primary" @click="queryByOptions">检索</el-button>
        </div>

        <el-button :disabled="disabled" type="danger" @click="deleteAccount"> 删除 </el-button>
        <el-button :disabled="disabled" :icon="CloseBold" @click="reset" />
      </div>

      <el-table
        ref="multipleTableRef"
        :data="tableData"
        v-loading="loading"
        :default-sort="{ prop: 'studentId', order: 'ascending' }"
        element-loading-text="Loading..."
        height="600"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="studentId" label="学号" sortable>
          <template #default="scope">{{ scope.row.studentId }}</template>
        </el-table-column>
        <el-table-column property="name" label="姓名" />
        <el-table-column property="phone" label="手机" show-overflow-tooltip />
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
