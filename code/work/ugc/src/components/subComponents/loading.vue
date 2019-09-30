<template>
    <div class="container-wrap" v-show='show'>
        <div class="mask"></div>
        <div class="container-loading">
            <div class="loadIcon"></div>
            <div class="loadTxt">正在加载</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['loadingShow'],
    name: 'loading',
    data () {
        return {
            show: false
        }
    },
    created: function () {
        console.log('created')
    },
    mounted: function () {
        console.log('loading mounted')
    },
    methods: {
    },
    watch: {
        loadingShow: function () {
            console.log('show loading change')
            this.show = this.loadingShow
        }
    }
}
</script>
<style scoped>
.container-loading {
    z-index: 999;
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
}
.loadIcon {
    width: 0.28rem;
    height: 0.28rem;
    text-align: center;
    background: url('../../commons/img/loading_gray.png') no-repeat center center;
    background-size: 0.28rem 0.28rem;
    vertical-align: middle;
    position: absolute;
    top: 0.62rem;
    left: 0.3rem;
    animation: mymove 0.5s infinite linear;
    -webkit-animation: mymove 0.5s infinite linear;
    -moz-animation: mymove 0.5s infinite linear;
    -o-animation: mymove 0.5s infinite linear;
}
@-webkit-keyframes mymove {
    from {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
    }
}
.loadTxt {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #999999;
    letter-spacing: 0;
    position: absolute;
    left: 0.67rem;
    top: 0.67rem;
}
.mask {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #999999;
    opacity: 0.4;
}
</style>
