<script setup lang="ts">
import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { Search, CloseBold } from '@element-plus/icons-vue'

interface Student {
  studentId: string
  name: string
  phone: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Student[]>([])

const handleSelectionChange = (val: Student[]) => {
  multipleSelection.value = val
}

const enrollmentYear = ref('')
const enrollmentYearOptions = [
  {
    value: '19',
    label: '2019'
  },
  {
    value: '20',
    label: '2020'
  },
  {
    value: '21',
    label: '2021'
  },
  {
    value: '22',
    label: '2022'
  },
  {
    value: '23',
    label: '2023'
  }
]

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

const tableData = ref<Student[]>([
  {
    studentId: '119060300216',
    name: '揭洋',
    phone: '13407075265'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    phone: '13407075265'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    phone: '13407075265'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    phone: '13407075265'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    phone: '13407075265'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    phone: '13407075265'
  },
  {
    studentId: '119060300216',
    name: '揭洋',
    phone: '13407075265'
  }
])

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

const queryByOptions = () => {}

const deleteAccount = () => {}

const loading = ref(false)
const disabled = ref(false)
const refresh = () => {
  loading.value = true
  disabled.value = true
  setTimeout(() => {
    loading.value = false
    disabled.value = false
  }, 3000)
}
const reset = () => {
  if (tableData.value.length == 0) {
    return
  } else {
    loading.value = true
    disabled.value = true
    setTimeout(() => {
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

        <div style="margin-right: 20px">
          <el-select
            v-model="enrollmentYear"
            placeholder="按入学年份检索"
            style="width: 150px; margin-right: 10px"
          >
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
        element-loading-text="Loading..."
        height="600"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="学号">
          <template #default="scope">{{ scope.row.studentId }}</template>
        </el-table-column>
        <el-table-column property="name" label="姓名" />
        <el-table-column property="phone" label="手机" show-overflow-tooltip />
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
