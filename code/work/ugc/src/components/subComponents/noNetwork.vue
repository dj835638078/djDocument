<template>
    <div class="container-box">
        <div class='addr-icon'></div>
        <div class='not-find'>网络异常</div>
        <div class='explore-other-place'>请检查网络设置</div>
        <div class="add-poi" @click='networkReset'>重试</div>
    </div>   
</template>
<script>
export default {
    name: 'noSite',
    data () {
        return {}
    },
    mounted: function () {},
    methods: {
        networkReset(){
            if (navigator.onLine) {
                this.$parent.networkFlag = true
                this.$parent.getData()
            } else {
                this.$parent.networkFlag = false
                return
            }
        }
    }
}
</script>
<style scoped>
.container-box{
    position: fixed;
    left: 0;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
}
.addr-icon{
    width:1.4rem;
    height:1.4rem;
    background-size:100% 100%;
    background: url('../../commons/img/network.png');
    background-size: 100% 100%;
    background-repeat:no-repeat;
}
.not-find{
    font-size: 0.16rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.2rem;
}
.explore-other-place{
    font-size: 0.14rem;
    color: #999999;
    letter-spacing: 0;
    line-height: 0.16rem;
    margin-top: .1rem;
}
.add-poi{
    width:1rem;
    height:0.3rem;
    line-height:0.3rem;
    border: 1px solid #427CFF;
    border-radius: 0.3rem;
    color:#427CFF;
    margin-top:0.2rem;
}
</style>
