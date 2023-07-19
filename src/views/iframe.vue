<template>
    <div class="iframe-view">
        <div class="back">
            <el-button @click="$router.go(-1)" type="primary" size="small">返 回</el-button>
        </div>
        <iframe id="m_iframe" :src="url" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    data() {
        return {
            url: ''
        }
    },
    created() {
        this.url = this.$route.params.url
    }
}
</script>

<style lang="scss" scoped>
    .iframe-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        position: relative;
    }
    #m_iframe {
        width: 100%;
        height: 100%;
        overflow: auto;
        background: radial-gradient(circle, rgb(27, 53, 106) 5%, #000 76%);
    }
    .back {
        position: absolute;
        bottom: 30px;
        right: 50%;
        z-index: 99;
        transform: translateX(50%);
        display: flex;
    }
</style>