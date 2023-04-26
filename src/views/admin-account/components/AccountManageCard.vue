<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { Search, Refresh, Plus, Minus } from '@element-plus/icons-vue'
import userStore from '@/stores/modules/user'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import {
  createUser,
  deleteAccount,
  lockedAccount,
  resetPassword,
  setAdmin,
  unlockedAccount
} from '@/api/user'
import router from '@/router'

interface User {
  teacherId: string
  name: string
  phone: string
  isAdmin: boolean
  isDisabled: boolean
}

// 搜索框筛选
const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) => !search.value || data.teacherId.toLowerCase().includes(search.value.toLowerCase())
  )
)

// 筛选 是否禁用
const filterIsDisabled = (value: boolean, row: User) => {
  return row.isDisabled === value
}

const tableData: User[] = reactive([])
const store = userStore()
// 获取数据
store
  .GetUserInfoList()
  .then(() => {
    store.userInfoList.forEach((item: User) => {
      if (!item.isAdmin) {
        tableData.push(item)
      }
    })
  })
  .catch((err) => {
    ElMessage.error(err)
  })

// 刷新
const refershLoading = ref(false)
const disabled = ref(false)
const refresh = async () => {
  refershLoading.value = true
  disabled.value = true
  await store
    .GetUserInfoList()
    .then(() => {
      tableData.length = 0
      store.userInfoList.forEach((item: User) => {
        if (!item.isAdmin) {
          tableData.push(item)
        }
      })
      ElMessage.success('数据刷新成功！')
    })
    .catch((err) => {
      ElMessage.error(err)
    })

  refershLoading.value = false
  disabled.value = false
}

const createVisible = ref(false)
const openCreate = () => {
  createForm.userList.length = 0
  createForm.userList.push({
    teacherId: '',
    name: '',
    phone: '',
    isAdmin: false,
    isDisabled: false
  })
  createVisible.value = true
}

const createFormRef = ref<FormInstance>()
const createForm = reactive({
  userList: [
    {
      teacherId: '',
      name: '',
      phone: '',
      isAdmin: false,
      isDisabled: false
    }
  ]
})

const accountCreate = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('添加管理员账户，是否继续?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const userData = { users: createForm.userList }
          await createUser(userData)
            .then((res) => {
              if (res.data.code == 200) {
                ElMessage.success('添加成功！')
                refresh()
              } else {
                ElMessage.error(res.data.message)
              }
            })
            .catch((err) => {
              ElMessage.error(err)
            })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消添加！'
          })
        })
      createVisible.value = false
    } else {
      return
    }
  })
}

// 删除行
const removeLine = (item: User) => {
  const index = createForm.userList.indexOf(item)
  if (index !== -1) {
    createForm.userList.splice(index, 1)
  }
}
// 添加行
const addLine = () => {
  createForm.userList.push({
    teacherId: '',
    name: '',
    phone: '',
    isAdmin: false,
    isDisabled: false
  })
}

// 重置密码
const resetPass = (row: User) => {
  ElMessageBox.confirm('重置密码，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await resetPassword(row)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('重置成功！')
            refresh()
          } else {
            ElMessage.error(res.data.message)
          }
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消重置！'
      })
    })
}
// 设置超级管理员
const setAdminRole = (row: User) => {
  ElMessageBox.confirm('设置为超级管理员，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await setAdmin(row)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('设置成功！')
            router.go(0)
          } else {
            ElMessage.error(res.data.message)
          }
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消设置！'
      })
    })
}
// 禁用
const banedUse = (row: User) => {
  ElMessageBox.confirm('禁用该账户，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await lockedAccount(row)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('禁用成功！')
            refresh()
          } else {
            ElMessage.error(res.data.message)
          }
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消禁用！'
      })
    })
}
// 解禁
const cancelBanedUse = (row: User) => {
  ElMessageBox.confirm('解禁该账户，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await unlockedAccount(row)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('解禁成功！')
            refresh()
          } else {
            ElMessage.error(res.data.message)
          }
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消解禁！'
      })
    })
}
// 删除
const deleteUser = (row: User) => {
  ElMessageBox.confirm('删除该账户，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await deleteAccount(row)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删除成功！')
            refresh()
          } else {
            ElMessage.error(res.data.message)
          }
        })
        .catch((err) => {
          ElMessage.error(err)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除！'
      })
    })
}

const rules = reactive<FormRules>({
  teacherId: [{ required: true, message: '请输入教师编号！', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名！', trigger: 'blur' }]
})
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Collection /></el-icon>
          <h6 class="title">管理员账户</h6>
        </div>
        <div class="flex-grow" />
        <el-button type="primary" style="margin-right: 20px" @click="openCreate">
          添加管理员账户
        </el-button>
        <el-dialog v-model="createVisible" title="添加管理员账户">
          <el-form v-if="createVisible" ref="createFormRef" :model="createForm" label-width="120px">
            <el-form-item
              v-for="(user, index) in createForm.userList"
              :key="index"
              :label="'用户' + (index + 1)"
              label-width="80px"
              style="height: 100px"
            >
              <el-form-item
                label="教师编号 #"
                :prop="'userList.' + index + '.teacherId'"
                :rules="rules.teacherId"
              >
                <el-input v-model="user.teacherId" maxlength="12" style="width: 240px" />
              </el-form-item>
              <el-form-item
                label="姓名："
                :prop="'userList.' + index + '.name'"
                :rules="rules.name"
                style="margin-right: 20px"
              >
                <el-input v-model="user.name" style="width: 240px" />
              </el-form-item>

              <el-button
                v-show="index != 0"
                type="danger"
                :icon="Minus"
                size="small"
                circle
                @click.prevent="removeLine(user)"
              />
              <span />
              <el-button
                v-show="index == 0"
                type="primary"
                :icon="Plus"
                size="small"
                circle
                @click="addLine"
              />
            </el-form-item>
          </el-form>

          <template #footer>
            <span>
              <el-button @click="createVisible = false">取消</el-button>
              <el-button type="primary" @click="accountCreate(createFormRef)">确认</el-button>
            </span>
          </template>
        </el-dialog>

        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-table
        v-loading="refershLoading"
        element-loading-text="Loading..."
        :data="filterTableData"
        :default-sort="{ prop: 'teacherId', order: 'ascending' }"
        max-height="570"
        style="width: 100%"
      >
        <el-table-column label="教师编号" prop="teacherId" sortable />
        <el-table-column label="姓名" prop="name" />
        <el-table-column label="手机" prop="phone" />
        <el-table-column
          label="禁用状态"
          prop="isDisabled"
          :filters="[
            { text: '是', value: true },
            { text: '否', value: false }
          ]"
          :filter-method="filterIsDisabled"
        />
        <el-table-column width="460">
          <template #header>
            <el-input
              v-model="search"
              placeholder="按教师编号检索"
              maxlength="12"
              :prefix-icon="Search"
              style="width: 230px"
            />
          </template>
          <template #default="scope">
            <el-button type="primary" plain @click="resetPass(scope.row)"> 重置密码 </el-button>
            <el-button type="primary" plain @click="setAdminRole(scope.row)">
              设置超级管理员
            </el-button>
            <el-button
              type="danger"
              plain
              v-show="!scope.row.isDisabled"
              @click="banedUse(scope.row)"
            >
              禁止使用
            </el-button>
            <el-button
              type="success"
              plain
              v-show="scope.row.isDisabled"
              @click="cancelBanedUse(scope.row)"
            >
              取消禁用
            </el-button>
            <el-button type="danger" @click="deleteUser(scope.row)"> 删除账户 </el-button>
          </template>
        </el-table-column>
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
.placeholder_images {
  width: inherit;
}
</style>
