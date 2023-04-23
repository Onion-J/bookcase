<script setup lang="ts">
import router from '@/router'
const back = () => {
  router.go(-1)
}
</script>

<template>
  <div class="http401-container">
    <div class="http401">
      <div class="pic-401">
        <img class="pic-401-parent" src="@/assets/401_images/401.png" alt="401" />
      </div>
      <div class="bullshit">
        <div class="bullshit-item">
          <div class="bullshit-oops">糟糕!</div>
          <div class="bullshit-info">你没有权限访问该页面！</div>
          <div class="bullshit-headline">'如有不满请联系超级管理员，或返回上一页面'</div>
          <div class="bullshit-info">Error: 401 Permission Denied</div>
          <el-button class="bullshit-back" type="primary" @click="back"> 返回上一页面 </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.http401-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.http401 {
  margin: 0 auto;
  width: 800px;
  overflow: hidden;
}
.pic-401 {
  position: relative;
  float: left;
  width: 500px;
  overflow: hidden;
}
.pic-401-parent {
  width: 100%;
}

.bullshit {
  position: relative;
  float: left;
  width: 300px;
  height: 500px;
  overflow: hidden;
  cursor: default;
}
.bullshit-item {
  position: absolute;
  bottom: 80px;
}
.bullshit-oops {
  font-size: 32px;
  font-weight: bold;
  line-height: 40px;
  color: #1482f0;
  opacity: 0;
  margin-bottom: 20px;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
}
.bullshit-info {
  font-size: 13px;
  line-height: 21px;
  color: grey;
  opacity: 0;
  margin-bottom: 30px;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;
}
.bullshit-headline {
  font-size: 20px;
  line-height: 24px;
  color: #222;
  font-weight: bold;
  opacity: 0;
  margin-bottom: 10px;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.1s;
  animation-fill-mode: forwards;
}
.bullshit-back {
  display: block;
  float: left;
  height: 36px;
  border-radius: 100px;
  color: #ffffff;
  opacity: 0;
  cursor: pointer;
  animation-name: slideUp;
  animation-duration: 0.5s;
  animation-delay: 0.3s;
  animation-fill-mode: forwards;
}
@keyframes slideUp {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
