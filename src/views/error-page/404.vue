<script setup lang="ts"></script>

<template>
  <div class="http404-container">
    <div class="http404">
      <div class="pic-404">
        <img class="pic-404-parent" src="@/assets/404_images/404.png" alt="404" />
      </div>
      <div class="bullshit">
        <div class="bullshit-item">
          <div class="bullshit-oops">糟糕!</div>
          <div class="bullshit-info">似乎到达了错误的地方......</div>
          <div class="bullshit-headline">'找不到对应的URL页面，请返回上一页面'</div>
          <div class="bullshit-info">Error: 404 NOT FOUND</div>
          <router-link :to="{ path: '/' }" class="bullshit-return-home">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.http404-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.http404 {
  margin: 0 auto;
  width: 800px;
  overflow: hidden;
}
.pic-404 {
  position: relative;
  float: left;
  width: 500px;
  overflow: hidden;
}
.pic-404-parent {
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
.bullshit-return-home {
  display: block;
  float: left;
  width: 110px;
  height: 36px;
  background: #1482f0;
  border-radius: 100px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  opacity: 0;
  font-size: 14px;
  line-height: 36px;
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
