<template>
    <div class="container-wrap" v-show='loadingShow'>
        <div class="loadIcon"></div>
        <div class="loadTxt">正在加载...</div>
    </div>
</template>
<script>
export default {
    name: 'loading',
    props: ['loadingShow'],
    data () {
        return {}
    },
    mounted: function () {},
    methods: {}
}
</script>
<style scoped>
.container-wrap{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    /* background: rgba(153,153,153,0.4); */
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center; 
    z-index:999;
}
.loadTxt {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #999999;
    margin-left: 0.1rem;
}
.loadIcon {
    width: 0.38rem;
    height: 0.38rem;
    text-align: center;
    background: url('../../commons/img/loading_gray.png') no-repeat center center;
    background-size: 0.38rem 0.38rem;
    vertical-align: middle;
    animation: mymove 0.5s infinite linear;
    -webkit-animation: mymove 0.5s infinite linear;
    -moz-animation: mymove 0.5s infinite linear;
    -o-animation: mymove 0.5s infinite linear;
}
@keyframes mymove {
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
</style>
