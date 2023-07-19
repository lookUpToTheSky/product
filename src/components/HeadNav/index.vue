<template>
    <div class="app-main">
        <div class="app-nav">
          <div class="left">
            <img src="@/assets/1-2.png" alt="">
          </div>
          <a href="https://threejs.org/examples/#webgl_animation_keyframes" target="_blank" class="center">前往threejs</a>
          <ul class="right">
            <li class="active">3D案例</li>
            <!-- <li>示例</li>
            <li>博客</li> -->
          </ul>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    data() {
      return {
      }
    }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh);
  width: 100%;
  position: relative;
  overflow: auto;
  padding-top: 50px;
  background: #f2f5f0;
  &::-webkit-scrollbar {
    width: 5px;
    background: rgb(231, 225, 221);
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgb(77, 168, 168);
  }
  &::-webkit-scrollbar-track-piece {
    background-image: linear-gradient(to bottom, red, green);
  }
  // background-image: linear-gradient(to right, #1346af, #2c7caa, #326890, #2ac4ce);
}
.app-nav {
  height: 50px;
  width: 100%;
  color: #eee;
  background-image: linear-gradient(to right, #1346af, #2c7caa, #326890, #2ac4ce);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
  .right, .left, .center {
    display: flex;
    line-height: 50px;
    li {
      padding: 0 10px;
      font-size: 15px;
      &.active {
        color: #eee;
      }
    }
  }
  .left {
    img {
      margin-top: 6px;
      width: 35px;
      height: 35px;
    }
  }
  .center {
    font-size: 18px;
    color: #eee;
    font-weight: 600;
    &:hover {
      color: #7da1eb;
    }
  }
}
</style>