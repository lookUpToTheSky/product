<template>
  <div class="home">
    <ul>
      <li class="inner-wrap" v-for="(item, i) in list" :key="i">
        <h5 class="animate__animated animate__bounce title">{{item.year}}</h5>
        <div class="box">
          <el-skeleton @click.native="intoRoute(val)" v-for="(val, index) in item.product" :key="index" class="skeleton" :loading="loading" animated>
            <template slot="template">
              <el-skeleton-item variant="image" class="item" style="width: 200px; height: 200px;" />
              <div style="padding: 14px 0;">
                  <el-skeleton-item variant="text"/>
              </div>
            </template>
            <template>
              <el-card class="item animate__animated animate__backInLeft animate__faster" :body-style="{ padding: '0px', marginBottom: '1px' }">
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
      list: [{
          year: 2023, 
          product:[
            {productName: '中国地图', url: 'https://lookuptothesky.github.io/three_map_pages/#/map',isIframe: true, img: require('@/assets/img/china_map.jpg')}
          ]
        },
        {
          year: 2022, 
          product:[
            {productName: '水厂-总览', url: '/map-preview', img: require('@/assets/img/map-nav.jpg')},
            {productName: '地球', url: '/earth', img: require('@/assets/img/earth.png')},
            {productName: '城市', url: '/city', img: require('@/assets/img/cs_city.png')},
            {productName: '地图-长沙', url: '/city-changSha', img: require('@/assets/img/city_map.jpg')},
            {productName: '地图-上海', url: '/city-shangHai', img: require('@/assets/img/sh_city.jpg')},
          ]
        },
        {
          year: 2021, 
          product:[
            {productName: '初音', url: '/mmd', img: require('@/assets/img/mmd.png')},
            {productName: '人物模型', url: '/girl', img: require('@/assets/img/girl.png')},
            {productName: '文本', url: '/css3', img: require('@/assets/img/ring.png')},
            {productName: '酷炫特效', url: '/three', img: require('@/assets/img/特效.png')},
            {productName: '倒计时', url: '/text', img: require('@/assets/img/number.png')},
            {productName: '扫光特效', url: '/shaderPass', img: require('@/assets/img/shaderPass.png')},
          ]
        },
        {
          year: "其他", 
          product:[
            {productName: '组态', url:'https://lookuptothesky.github.io/canvasView/#/workspace', isIframe: true, img: require('@/assets/img/zutai.jpg')},
            {productName: '在线预览excle', url: '/previewExcle', img: require('@/assets/img/excle.png')}
          ]
        }
      ],
      loading: true,
      activeIndex: 1
    }
  },
  methods: {
    intoRoute(item) {
      if(item.isIframe) {
        this.$router.push({name: 'iframe', params: {url: item.url}})
      }else{
        this.$router.push(item.url)
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 300)
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
      box-shadow: 0 0 20px 5px #ccc;
    }
  }
}
</style>
