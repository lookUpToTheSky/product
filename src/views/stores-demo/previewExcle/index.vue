<template>
    <div>
      <div style="display: flex; padding:10px">
        <el-page-header @back="$router.go(-1)" content="">
        </el-page-header>
        <input type="file" @change="getFile" />
      </div>
      <div id="container"></div>
    </div>
</template>

<script>
import Xlsx from './xlsxTohtml.js'
export default {
    name: 'previewExcle',
    data() {
      return {
        fileUrl: './test.xlsx'
      }
    },
    methods: {
        init() {
          const element = document.querySelector('#container')
          const xlsx = new Xlsx(element)
          xlsx.readFile(this.fileUrl)
        },
        getFile() {
          const files = event.target.files[0]
          files.arrayBuffer()
          files.arrayBuffer().then(res => {
            const element = document.querySelector('#container')
            element.innerHTML = ''
            const xlsx = new Xlsx(element)
            xlsx.readFile(res)
          })
        }
    },
    mounted() {
     this.init()
    }
}
</script>

<style>
 #container {
   width: 100%;
   height: calc(100vh - 65px);
 }   
</style>