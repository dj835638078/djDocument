<template>
    <div class="container-wrap">
        <div class="container start-position">
        <div class="title">为什么有时候地图定位不准？</div>
        <div class="content">
            手机地图的定位与您手机的配置和您所处的环境都有关系，如Wi-Fi疏密，基站密度，附近干扰因素（如GPS信号受楼宇遮挡），网络信号，使用地点等。为了保证定位更加准确，建议您开启GPS和Wi-Fi开关。导航等需要GPS定位时，在开阔地带GPS定位更准。
        </div>    
        </div>    
    </div>
</template>
<script>
export default {
    name:'noPosition',
    data(){
        return{

        }
    },
    mounted:function(){
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '腾讯地图'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
            // this.$router.go(-1)
           history.go(-2)
        })
    },
}
</script>
<style scope>
.start-position .title{
    font-size: 0.2rem;
    color: #333333;
    margin-bottom:0.15rem;
}
.start-position .content{
    font-size: 0.14rem;
    color: #444444;
    line-height: 0.22rem;
}
</style>