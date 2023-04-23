<script setup lang="ts">
import { Refresh, Plus, Minus, Edit } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reactive, ref } from 'vue'
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
const openCreateFormVisible = () => {
  createFormVisible.value = true
}

// click 打开修改
const renameFormVisible = ref(false)
const openRenameFormVisible = () => {
  renameFormVisible.value = true
}

// click 打开添加
const addFormVisible = ref(false)
const openAddFormVisible = () => {
  addFormVisible.value = true
}

// click 删除专业
const deleteMajor = (instituteId: string, id: string) => {
  ElMessageBox.confirm('删除该专业，是否继续?', 'Warning', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      console.log(instituteId, id)
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
const refresh = () => {
  refershLoading.value = true
  disabled.value = true
  store
    .GetInstituteInfo()
    .then(() => {
      data.length = 0
      data.push(...store.instituteInfo)
      ElMessage.success('数据刷新成功！')
      refershLoading.value = false
      disabled.value = false
    })
    .catch((err) => {
      ElMessage.error(err)
      refershLoading.value = false
      disabled.value = false
    })
}
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
        <el-button type="primary" style="margin-right: 20px" @click="openCreateFormVisible">
          创建学院及专业
        </el-button>
        <el-dialog v-model="createFormVisible" title="创建学院及专业">
          <template #footer>
            <span>
              <el-button @click="createFormVisible = false">取消</el-button>
              <el-button type="primary" @click="createFormVisible = false">确认</el-button>
            </span>
          </template>
        </el-dialog>

        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-collapse v-loading="refershLoading" element-loading-text="Loading..." accordion>
        <el-collapse-item
          v-for="(items, index) in data"
          :key="items.id"
          :name="index"
          class="col-header"
        >
          <template #title> {{ items.name }} #{{ items.id }} </template>
          <div class="button-bar">
            <el-button :icon="Edit" style="margin-right: 20px" @click="openRenameFormVisible" />
            <el-dialog v-model="renameFormVisible" title="修改学院名称">
              <template #footer>
                <span>
                  <el-button @click="renameFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="renameFormVisible = false">确认</el-button>
                </span>
              </template>
            </el-dialog>

            <el-button :icon="Plus" type="primary" @click="openAddFormVisible" />
            <el-dialog v-model="addFormVisible" title="添加专业">
              <template #footer>
                <span>
                  <el-button @click="addFormVisible = false">取消</el-button>
                  <el-button type="primary" @click="addFormVisible = false">确认</el-button>
                </span>
              </template>
            </el-dialog>
          </div>

          <div v-for="item in items.major" :key="item.id" class="major">
            {{ item.name }} #{{ item.id }}
            <div class="flex-grow" />
            <el-button :icon="Minus" type="danger" @click="deleteMajor(items.id, item.id)" />
          </div>
        </el-collapse-item>
      </el-collapse>
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
