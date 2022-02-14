<template>
    <div class="app-main">
        <div class="app-nav">
          <div class="left">LOGO</div>
          <ul class="right">
            <li class="active">首页</li>
            <li>示例</li>
            <li>博客</li>
          </ul>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    
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
  .right, .left {
    display: flex;
    line-height: 50px;
    li {
      padding: 0 10px;
      font-size: 15px;
      &.active {
        color: #0ee945;
      }
    }
  }
}
</style>