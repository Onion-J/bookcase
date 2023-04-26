<script setup lang="ts">
import { Refresh, Plus, Minus, Edit } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance } from 'element-plus'
import bookcaseStore from '@/stores/modules/bookcase'
import {
  addBookcase,
  createBookcase,
  deleteBookcase,
  reduceBookcase,
  renameBookcase
} from '@/api/bookcase'

// 单个储物柜信息
interface Bookcase {
  area: string
  sequenceNumber: number
  occupied: boolean
}
// 储物柜信息总览
interface BookcaseInfo {
  area: string
  used: number
  unused: number
  cabinetNumber: number
}
// 筛选区域信息
interface FilterArea {
  text: string
  value: string
}

// 表格数据
const tableData: BookcaseInfo[] = reactive([])
// 筛选区域信息列表
const areaList: FilterArea[] = reactive([])

// 对后端数据进行处理
const getBookcaseAreaList = (bookcase: Bookcase[]) => {
  const result: Record<string, any> = {}
  bookcase.forEach(({ area, sequenceNumber, occupied }) => {
    if (result[area]) {
      const { used, unused, cabinetNumber } = result[area]
      result[area] = {
        ...(occupied ? { used: used + 1, unused } : { used, unused: unused + 1 }),
        cabinetNumber: Math.max(sequenceNumber, cabinetNumber)
      }
    } else {
      result[area] = {
        ...(occupied ? { used: 1, unused: 0 } : { used: 0, unused: 1 }),
        cabinetNumber: sequenceNumber
      }
    }
  })

  return Object.entries(result).map(([key, value]) => ({ area: key, ...value }))
}
// 获取后端储物柜数据
const store = bookcaseStore()
store
  .GetBookcaseInfo()
  .then(() => {
    const bookcaseList = store.bookcaseList
    // 表格数据
    tableData.push(...getBookcaseAreaList(bookcaseList))
    areaList.push(...tableData.map((item) => ({ text: item.area, value: item.area })))
  })
  .catch((err) => {
    ElMessage.error(err)
  })

// 筛选区域
const filterArea = (value: string, row: BookcaseInfo) => {
  return row.area === value
}

// click 刷新
const refershLoading = ref(false)
const disabled = ref(false)
const refresh = async () => {
  refershLoading.value = true
  disabled.value = true
  await store
    .GetBookcaseInfo()
    .then(() => {
      const bookcaseList = store.bookcaseList
      // 表格数据
      tableData.length = 0
      tableData.push(...getBookcaseAreaList(bookcaseList))
      areaList.length = 0
      areaList.push(...tableData.map((item) => ({ text: item.area, value: item.area })))
      ElMessage.success('数据刷新成功！')
    })
    .catch((err) => {
      ElMessage.error(err)
    })
  refershLoading.value = false
  disabled.value = false
}

// click 打开编辑弹框 重置数据和表单验证
const openPop = (formEl: FormInstance | undefined) => {
  changeNumber.value = 1
  formEl?.resetFields()
}

// 编辑的数量
const changeNumber = ref(1)
// click 增加储物柜数量 弹出框
const addCabinet = (index: number, row: BookcaseInfo) => {
  ElMessageBox.confirm('此编辑将会添加该区域储物柜，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const bookcases = { AreaName: row.area, BookcaseNumber: changeNumber.value }
      await addBookcase(bookcases)
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
      changeNumber.value = 1
    })
}
// click 删减储物柜数量 弹出框
const reduceCabinet = (index: number, row: BookcaseInfo) => {
  ElMessageBox.confirm('此编辑将会删减该区域储物柜，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const bookcases = { AreaName: row.area, BookcaseNumber: changeNumber.value }
      await reduceBookcase(bookcases)
        .then((res) => {
          if (res.data.code == 200) {
            ElMessage.success('删减成功！')
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
        message: '取消删减！'
      })
      changeNumber.value = 1
    })
}

// 区域新名称表单
const areaNameFormRef = ref<FormInstance>()
const areaNameForm = reactive({
  areaName: ''
})
// click 修改区域名称 弹出框
const modifyAreaName = (formEl: FormInstance | undefined, index: number, row: BookcaseInfo) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('修改储物柜区域名称，是否继续?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          console.log(areaNameForm)
          console.log(index, row)
          const bookcases = { area: row.area, areaName: areaNameForm.areaName }
          await renameBookcase(bookcases)
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
          formEl.resetFields()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消修改！'
          })
          formEl.resetFields()
        })
    } else {
      return
    }
  })
}

// 新增区域表单
const cabinetAreaFormRef = ref<FormInstance>()
const cabinetAreaForm = reactive({
  area: '',
  totalNumber: 1
})
// click 打开 增加区域 对话框重置数据和表单验证
const addCabinetAreaFormVisible = ref(false)
const openAddDialog = (formEl: FormInstance | undefined) => {
  formEl?.resetFields()
  addCabinetAreaFormVisible.value = true
}

// click 取消 增加区域 对话框
const cancelAddArea = (formEl: FormInstance | undefined) => {
  addCabinetAreaFormVisible.value = false
  cabinetAreaForm.totalNumber = 1
  formEl?.resetFields()
}

// click 确认 增加区域 对话框
const addArea = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm('添加储物柜区域，是否继续?', 'Warning', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const bookcases = {
            areaName: cabinetAreaForm.area,
            bookcaseNumber: cabinetAreaForm.totalNumber
          }
          await createBookcase(bookcases)
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
          cancelAddArea(formEl)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消添加！'
          })
          cancelAddArea(formEl)
        })
    } else {
      return
    }
  })
}

// 选定删除的区域
const checkedArea = ref([])
// click 打开 删除区域 对话框重置数据
const deleteCabinetAreaFormVisible = ref(false)
const openDeleteDialog = () => {
  checkedArea.value = []
  deleteCabinetAreaFormVisible.value = true
}

// click 取消 删除区域 对话框
const cancelDeleteArea = () => {
  checkedArea.value.length = 0
  deleteCabinetAreaFormVisible.value = false
}
// click 确认 删除区域 对话框
const deleteArea = () => {
  if (checkedArea.value.length !== 0) {
    ElMessageBox.confirm('删除储物柜区域，是否继续?', 'Warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const bookcases = {
          deleteList: Object.values(checkedArea.value).map((item) => ({ areaName: item }))
        }
        await deleteBookcase(bookcases)
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
        cancelDeleteArea()
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除！'
        })
        cancelDeleteArea()
      })
  } else {
    return
  }
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><DataAnalysis /></el-icon>
          <h6 class="title">储物柜使用情况</h6>
        </div>
        <div class="flex-grow" />
        <el-button
          type="primary"
          :disabled="disabled"
          :icon="Plus"
          style="margin-right: 20px"
          @click="openAddDialog(cabinetAreaFormRef)"
        />

        <!-- 添加储物柜区域对话框 -->
        <el-dialog v-model="addCabinetAreaFormVisible" title="添加储物柜区域">
          <el-form ref="cabinetAreaFormRef" :model="cabinetAreaForm">
            <el-form-item
              label="区域名称"
              prop="area"
              :label-width="120"
              :rules="[{ required: true, message: '请输入区域名称！', trigger: 'blur' }]"
            >
              <el-input v-model="cabinetAreaForm.area" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="储物柜总数" :label-width="120">
              <el-input-number
                v-model="cabinetAreaForm.totalNumber"
                :min="1"
                :max="2000"
                controls-position="right"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span>
              <el-button @click="cancelAddArea(cabinetAreaFormRef)">取消</el-button>
              <el-button type="primary" @click="addArea(cabinetAreaFormRef)"> 添加 </el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 添加储物柜区域对话框 -->

        <el-button
          type="danger"
          :disabled="disabled"
          :icon="Minus"
          style="margin-right: 20px"
          @click="openDeleteDialog"
        />

        <!-- 删除储物柜区域对话框 -->
        <el-dialog v-model="deleteCabinetAreaFormVisible" title="删除储物柜区域">
          <el-checkbox-group v-model="checkedArea">
            <el-checkbox v-for="area in areaList" :key="area.value" :label="area.text" />
          </el-checkbox-group>
          <template #footer>
            <span>
              <el-button @click="cancelDeleteArea">取消</el-button>
              <el-button type="danger" @click="deleteArea"> 删除 </el-button>
            </span>
          </template>
        </el-dialog>
        <!-- 删除储物柜区域对话框 -->

        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <!-- 储物柜情况表格 -->
      <el-table
        v-loading="refershLoading"
        element-loading-text="Loading..."
        :data="tableData"
        :default-sort="{ prop: 'cabinetNumber', order: 'ascending' }"
        max-height="285"
        style="width: 100%"
      >
        <el-table-column prop="area" label="区域" :filters="areaList" :filter-method="filterArea" />
        <el-table-column prop="used" label="使用数" />
        <el-table-column prop="unused" label="空闲数" />
        <el-table-column prop="cabinetNumber" label="储物柜总数" sortable />
        <el-table-column label="编辑储物柜">
          <template #default="scope">
            <el-popover :width="260" placement="right" trigger="click">
              <template #reference>
                <el-button
                  :icon="Edit"
                  style="margin-right: 16px"
                  @click="openPop(areaNameFormRef)"
                />
              </template>
              <el-form>
                <p>编辑该区域储物柜数量</p>
                <el-form-item label="数量">
                  <el-input-number
                    v-model="changeNumber"
                    :min="1"
                    :max="2000"
                    controls-position="right"
                  />
                </el-form-item>
                <el-form-item>
                  <div class="button-bar">
                    <el-button
                      size="small"
                      type="primary"
                      @click="addCabinet(scope.$index, scope.row)"
                    >
                      添加
                    </el-button>
                    <el-button
                      size="small"
                      type="danger"
                      @click="reduceCabinet(scope.$index, scope.row)"
                    >
                      删减
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>

              <el-form ref="areaNameFormRef" :model="areaNameForm">
                <p>修改该区域名称</p>
                <el-form-item
                  label="区域新名称"
                  prop="areaName"
                  :rules="[{ required: true, message: '请输入区域名称！', trigger: 'blur' }]"
                >
                  <el-input v-model="areaNameForm.areaName" type="text" autocomplete="off" />
                </el-form-item>
                <el-form-item>
                  <div class="button-bar">
                    <el-button
                      size="small"
                      type="primary"
                      @click="modifyAreaName(areaNameFormRef, scope.$index, scope.row)"
                    >
                      修改
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>
            </el-popover>
          </template>
        </el-table-column>
        <template #empty>
          <img src="@/assets/placeholder_images/nodata.png" alt="暂无数据" style="width: inherit" />
        </template>
      </el-table>
      <!-- 储物柜情况表格 -->
    </el-card>
  </div>
</template>

<style scoped>
.table-container {
  margin-bottom: 50px;
  padding: 0 20px;
}
.card-header {
  display: flex;
  align-items: center;
}

.card-title {
  width: 160px;
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
.button-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
