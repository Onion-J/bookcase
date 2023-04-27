<script setup lang="ts">
import { Refresh, Plus, Minus, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import instituteStore from '@/stores/modules/institute'
import { addMajor, createInstituteAndMajor, deleteMajor, renameInstitute } from '@/api/institute'

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

const store = instituteStore()
const data: Institute[] = reactive([])
// 获取数据
store
  .GetInstituteInfo()
  .then(() => {
    data.push(...store.instituteInfo)
  })
  .catch((err) => {
    ElMessage.error(err)
  })

// click 打开创建
const createFormVisible = ref(false)
const openCreateFormVisible = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
  createForm.id = ''
  createForm.name = ''
  createForm.major.length = 0
  createFormVisible.value = true
}

// click 创建
const majorCreate = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('创建学院及专业信息，是否继续?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await createInstituteAndMajor(createForm)
            .then((res) => {
              if (res.data.code == 200) {
                ElMessage.success('创建成功！')
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
            message: '取消创建！'
          })
        })
      createFormVisible.value = false
    } else {
      return
    }
  })
}

const createFormRef = ref<FormInstance>()
const createForm = reactive<Institute>({
  id: '',
  name: '',
  major: [
    {
      instituteId: '',
      id: '',
      name: ''
    }
  ]
})
// 删除行
const removeLine = (item: Major) => {
  const index = createForm.major.indexOf(item)
  if (index !== -1) {
    createForm.major.splice(index, 1)
  }
}
// 添加行
const addLine = () => {
  createForm.major.push({
    instituteId: '',
    id: '',
    name: ''
  })
}

const i = ref()
// click 打开修改
const renameFormVisible = ref(false)
const openRenameFormVisible = (index: number) => {
  i.value = index
  renameForm.name = ''
  renameFormVisible.value = true
}

// click 改名
const rename = (formEl: FormInstance | undefined, id: string) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('修改学院名称，是否继续?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          renameForm.id = id
          await renameInstitute(renameForm)
            .then((res) => {
              if (res.data.code == 200) {
                ElMessage.success('修改成功！')
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
            message: '取消修改！'
          })
        })
      renameFormVisible.value = false
    } else {
      return
    }
  })
}

const renameFormRef = ref<FormInstance>()
let renameForm = reactive({
  id: '',
  name: ''
})

// click 打开添加
const addFormVisible = ref(false)
const openAddFormVisible = (index: number) => {
  i.value = index
  createForm.major = [{ instituteId: '', id: '', name: '' }]
  addFormVisible.value = true
}

// click 添加
const majorAdd = (formEl: FormInstance | undefined, instituteId: string) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('添加专业，是否继续?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          createForm.major = createForm.major.map((item) => ({ ...item, instituteId: instituteId }))
          const addList = { addList: createForm.major }
          console.log(instituteId)
          console.log(addList)
          await addMajor(addList)
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
        .finally(() => {
          addFormVisible.value = false
        })
    } else {
      return
    }
  })
}

// click 删除专业
const majorDelete = (instituteId: string, id: string) => {
  ElMessageBox.confirm('删除该专业，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const deleteMajorInfo: Major = {
        instituteId: instituteId,
        id: id,
        name: ''
      }
      await deleteMajor(deleteMajorInfo)
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

// 刷新
const refershLoading = ref(false)
const disabled = ref(false)
const refresh = async () => {
  refershLoading.value = true
  disabled.value = true
  await store
    .GetInstituteInfo()
    .then(() => {
      data.length = 0
      data.push(...store.instituteInfo)
      ElMessage.success('数据刷新成功！')
    })
    .catch((err) => {
      ElMessage.error(err)
    })
    .finally(() => {
      refershLoading.value = false
      disabled.value = false
    })
}

const rules = reactive<FormRules>({
  instituteId: [{ required: true, message: '请输入学院编号！', trigger: 'blur' }],
  instituteName: [{ required: true, message: '请输入学院名称！', trigger: 'blur' }],
  majorId: [{ required: true, message: '请输入专业编号！', trigger: 'blur' }],
  majorName: [{ required: true, message: '请输入专业名称！', trigger: 'blur' }],
  instituteNewName: [{ required: true, message: '请输入学院新名称！', trigger: 'blur' }]
})
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Reading /></el-icon>
          <h6 class="title">学院及专业信息</h6>
        </div>
        <div class="flex-grow" />
        <el-button
          type="primary"
          :disabled="disabled"
          style="margin-right: 20px"
          @click="openCreateFormVisible(createFormRef)"
        >
          创建学院及专业
        </el-button>
        <el-dialog v-model="createFormVisible" title="创建学院及专业">
          <el-form ref="createFormRef" :model="createForm" label-width="120px">
            <el-form-item label="学院" style="height: 100px">
              <el-form-item label="学院编号 #" prop="id" :rules="rules.instituteId">
                <el-input v-model="createForm.id" style="width: 120px" />
              </el-form-item>
              <el-form-item
                label="学院名称："
                prop="name"
                :rules="rules.instituteName"
                style="margin-right: 20px"
              >
                <el-input v-model="createForm.name" style="width: 360px" />
              </el-form-item>
              <el-button type="primary" :icon="Plus" size="small" circle @click="addLine" />
            </el-form-item>

            <el-form-item
              v-for="(major, index) in createForm.major"
              :key="index"
              :label="'专业：' + (index + 1)"
              style="height: 100px"
            >
              <el-form-item
                label="专业编号 #"
                :prop="'major.' + index + '.id'"
                :rules="rules.majorId"
              >
                <el-input v-model="major.id" style="width: 120px" />
              </el-form-item>
              <el-form-item
                label="专业名称："
                :prop="'major.' + index + '.name'"
                :rules="rules.majorName"
                style="margin-right: 20px"
              >
                <el-input v-model="major.name" style="width: 360px" />
              </el-form-item>

              <el-button
                type="danger"
                :icon="Minus"
                size="small"
                circle
                @click.prevent="removeLine(major)"
              />
            </el-form-item>
          </el-form>

          <template #footer>
            <span>
              <el-button @click="createFormVisible = false">取消</el-button>
              <el-button type="primary" @click="majorCreate(createFormRef)">确认</el-button>
            </span>
          </template>
        </el-dialog>

        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-scrollbar>
        <el-collapse
          v-loading="refershLoading"
          element-loading-text="Loading..."
          accordion
          style="height: 500px"
        >
          <el-collapse-item
            v-for="(items, index) in data"
            :key="index"
            :name="index"
            class="col-header"
          >
            <template #title> {{ items.name }} #{{ items.id }} </template>
            <div class="button-bar">
              <el-button
                :icon="Edit"
                style="margin-right: 20px"
                @click="openRenameFormVisible(index)"
              />

              <el-button :icon="Plus" type="primary" @click="openAddFormVisible(index)" />
            </div>

            <div v-for="(item, index) in items.major" :key="index" class="major">
              {{ item.name }} #{{ item.id }}
              <div class="flex-grow" />
              <el-button :icon="Minus" type="danger" @click="majorDelete(items.id, item.id)" />
            </div>
          </el-collapse-item>

          <el-dialog v-model="renameFormVisible" title="修改学院名称">
            <div style="margin: 20px; display: flex; justify-content: center">
              <el-form
                v-if="renameFormVisible"
                ref="renameFormRef"
                :model="renameForm"
                label-width="120px"
              >
                <el-form-item label="学院名称">
                  <el-input disabled v-model="data[i].name" style="width: 360px" />
                </el-form-item>
                <el-form-item label="学院新名称" prop="name" :rules="rules.instituteNewName">
                  <el-input v-model="renameForm.name" style="width: 360px" />
                </el-form-item>
              </el-form>
            </div>
            <template #footer>
              <span>
                <el-button @click="renameFormVisible = false">取消</el-button>
                <el-button type="primary" @click="rename(renameFormRef, data[i].id)">
                  确认
                </el-button>
              </span>
            </template>
          </el-dialog>

          <el-dialog v-model="addFormVisible" title="添加专业">
            <el-form
              v-if="addFormVisible"
              ref="createFormRef"
              :model="createForm"
              label-width="120px"
            >
              <el-form-item label="学院" style="height: 100px">
                <el-form-item label="学院编号 #">
                  <el-input v-model="data[i].id" disabled style="width: 120px" />
                </el-form-item>
                <el-form-item label="学院名称：" style="margin-right: 20px">
                  <el-input v-model="data[i].name" disabled style="width: 360px" />
                </el-form-item>
                <el-button type="primary" :icon="Plus" size="small" circle @click="addLine" />
              </el-form-item>

              <el-form-item
                v-for="(major, index) in createForm.major"
                :key="index"
                :label="'专业：' + (index + 1)"
                style="height: 100px"
              >
                <el-form-item
                  label="专业编号 #"
                  :prop="'major.' + index + '.id'"
                  :rules="rules.majorId"
                >
                  <el-input v-model="major.id" style="width: 120px" />
                </el-form-item>
                <el-form-item
                  label="专业名称："
                  :prop="'major.' + index + '.name'"
                  :rules="rules.majorName"
                  style="margin-right: 20px"
                >
                  <el-input v-model="major.name" style="width: 360px" />
                </el-form-item>

                <el-button
                  type="danger"
                  :icon="Minus"
                  size="small"
                  circle
                  @click.prevent="removeLine(major)"
                />
              </el-form-item>
            </el-form>
            <template #footer>
              <span>
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="majorAdd(createFormRef, data[i].id)"
                  >确认</el-button
                >
              </span>
            </template>
          </el-dialog>
        </el-collapse>
      </el-scrollbar>
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
.major {
  height: 50px;
  display: flex;
  border-top: 1px solid #f2f3f5;
  align-items: center;
}
.col-header {
  position: relative;
}
.button-bar {
  position: absolute;
  top: 15px;
  right: 60px;
  display: flex;
  align-items: center;
}
</style>

<style>
.el-collapse-item__header {
  font-size: 16px;
  height: 60px;
}
.el-collapse-item__content {
  padding-bottom: 0;
}
</style>
