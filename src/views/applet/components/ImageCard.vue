<script setup lang="ts">
import { Refresh } from '@element-plus/icons-vue'
import userStore from '@/stores/modules/user'
import { reactive, ref } from 'vue'
import { deleteImg, getSlide } from '@/api/slide'
import { ElMessage, ElMessageBox, type UploadInstance, type UploadProps } from 'element-plus'

const store = userStore()

const imgUrlList: string[] = reactive([])

getSlide()
  .then((res) => {
    if (res.data.code == 200) {
      imgUrlList.push(...res.data.data.imgURL)
    }
  })
  .catch((err) => {
    ElMessage.error(err)
  })

const refershLoading = ref(false)
const disabled = ref(false)
const refresh = async () => {
  refershLoading.value = true
  disabled.value = true
  await getSlide()
    .then((res) => {
      if (res.data.code == 200) {
        imgUrlList.length = 0
        imgUrlList.push(...res.data.data.imgURL)
        ElMessage.success('数据刷新成功！')
      }
    })
    .catch((err) => {
      ElMessage.error(err)
    })

  refershLoading.value = false
  disabled.value = false
}

const upload = ref<UploadInstance>()
const handleSuccess: UploadProps['onSuccess'] = () => {
  refresh()
}

const dialogVisible = ref(false)
const openDialog = () => {
  checkList.value = []
  dialogVisible.value = true
}

const checkList = ref([])

const imgDelete = () => {
  if (checkList.value.length == 0) {
    return
  } else {
    ElMessageBox.confirm('删除图片,是否继续?', 'Warning', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(async () => {
        const deleteList = checkList.value.map((item) => ({ name: item }))
        const files = { files: deleteList }
        await deleteImg(files)
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
        dialogVisible.value = false
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除！'
        })
      })
  }
}
</script>

<template>
  <div class="table-container">
    <el-card>
      <div class="card-header">
        <div class="card-title">
          <el-icon><Picture /></el-icon>
          <h6 class="title">小程序轮播图</h6>
        </div>
        <div class="flex-grow" />
        <el-upload
          ref="upload"
          action="http://127.0.0.1:1016/api/uploadImg"
          :headers="{ Authorization: `Bearer ${store.token}` }"
          :on-success="handleSuccess"
          style="width: 380px; height: 32px"
        >
          <el-button type="primary">
            上传图片<el-icon class="el-icon--right"><Upload /></el-icon>
          </el-button>
        </el-upload>

        <el-button type="danger" @click="openDialog">删除图片</el-button>
        <el-button :disabled="disabled" :icon="Refresh" @click="refresh" />
      </div>

      <el-carousel
        v-loading="refershLoading"
        element-loading-text="Loading..."
        height="32vw"
        type="card"
      >
        <el-carousel-item
          v-for="item in imgUrlList"
          :key="item"
          style="display: flex; justify-content: center; align-items: center"
        >
          <el-image style="width: 600px" :src="item" />
        </el-carousel-item>
      </el-carousel>
    </el-card>
    <el-dialog v-model="dialogVisible" title="删除图片">
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in imgUrlList" :key="item" :label="item.split('/').pop()" />
      </el-checkbox-group>
      <template #footer>
        <span>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="imgDelete">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.table-container {
  padding: 0 20px;
}
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 38px;
  border-bottom: 1px solid #b1b3b8;
  box-sizing: border-box;
}
.card-title {
  height: 50px;
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
  padding-top: 30px;
  height: 100px;
}
</style>
