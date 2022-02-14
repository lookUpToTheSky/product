<template>
  <div class="home">
    <!-- <button @click="$router.push('/three')">查看</button> -->
    <div class="border-box">你撒大大啊飒飒的</div>
    <ul>
      <li class="inner-wrap" v-for="(item, i) in list" :key="i">
        <h5 class="title">{{item.year}}</h5>
        <div class="box">
          <el-skeleton @click.native="$router.push(val.url)" v-for="(val, index) in item.product" :key="index" class="skeleton" :loading="loading" animated>
            <template slot="template">
              <el-skeleton-item variant="image" class="item" style="width: 200px; height: 200px;" />
              <div style="padding: 14px 0;">
                  <el-skeleton-item variant="text"/>
              </div>
            </template>
            <template>
              <el-card class="item" :body-style="{ padding: '0px', marginBottom: '1px' }">
                  <el-image
                    class="image"
                    style="width: 200px; height: 200px"
                    :src="val.img"
                    fit="cover"></el-image>
                  <div style="padding: 14px;">
                    <span>{{val.productName}}</span>
                  </div>
              </el-card>
            </template>
          </el-skeleton>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      list: [
        {
          year: 2022, 
          product:[
            {productName: '酷炫特效', url: '/three', img: require('@/assets/img/特效.png')},
            {productName: '城市风景2', url: '', img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'},
            {productName: '城市风景2', url: '', img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'},
            {productName: '城市风景2', url: '', img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'},
            {productName: '城市风景2', url: '', img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'},
            {productName: '城市风景2', url: '', img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'}
          ]
        },
        {
          year: 2021, 
          product:[
            {productName: '城市风景3', url: '', img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'}
          ]
        },
        {
          year: 2020, 
          product:[
            {productName: '城市风景3', url: '', img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'}
          ]
        },
        {
          year: 2019, 
          product:[
            {productName: '城市风景3', url: '', img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'}
          ]
        }
      ],
      loading: true,
      activeIndex: 1
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 1200px;
  min-height: calc(100vh - 50px);
  overflow: auto;
  background: #fff;
  margin: 0 auto ;
}
.inner-wrap {
  width: 100%;
  padding: 20px 45px;
  box-sizing: border-box;
  .title {
    font-size: 28px;
    font-weight: 550;
    text-decoration: underline;
    text-align: start;
    margin-bottom: 10px;
  }
  .box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
  .item {
    transition: all 0.3s;
    margin: 10px;
    &:hover {
      box-shadow: 0 5px 12px 5px #eee;
    }
  }
  
}

  .border-box {
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border-top: 10px solid  rgb(24, 219, 230);
    border-left: 10px  solid  rgb(240, 8, 8);
    border-bottom: 10px solid  rgb(7, 243, 26);
    border-right: 10px solid  rgb(11, 94, 247);
    border-radius: 50%;
    animation: run 2s ease-out infinite;
    // writing-mode: vertical-lr;
    // box-shadow: 0 0 50px 2px rgb(4, 245, 213);
  }
  @keyframes run {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(720deg);
    }
  }
</style>
