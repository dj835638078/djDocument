<template>
    <div class="container-wrap">
        <div class="container map-usage-help">
            <div class="titles">常见问题分类</div>
            <div style="margin-top:0.16rem;">
                <router-link to='/other-function'>
                    <button class="btn">功能问题</button>
                </router-link>    
                <router-link to='/zero-flow-mode'>
                    <button class="btn">零流量模式</button>
                </router-link>      
                 <router-link to='/abnormal-function'>
                    <button class="btn">功能异常</button>
                </router-link> 
                 <router-link to='/location-problem'>
                    <button class="btn">地点问题</button>
                </router-link> 
            </div>
        </div>
        <div class="container map-usage-help container-wrap position-router">
            <div class="titles">热点问题</div>
            <router-link to='/is-free'>
                <div class="container">
                    <div class="title-con">使用手机腾讯地图是否会收费？</div>
                </div>
            </router-link>
            <div class="border" style="width:3rem;"></div>
            <router-link to='/leak-information'>
                <div class="container">
                    <div class="title-con">我的定位信息会被泄露出去吗？</div>
                </div>
            </router-link>
            <div class="border" style="width:3rem;"></div>
            <router-link to='/how-contact'>
                <div class="container">
                    <div class="title-con">我有问题想反馈，怎么联系你们？</div>
                </div>
            </router-link>
            <div class="border" style="width:3rem;"></div>
            <router-link to='/label-merchant'>
                <div class="container">
                    <div class="title-con">请问怎么样才能在腾讯地图上标注商户？</div>
                </div>
            </router-link>
        </div>
    </div>    
</template>
<script>
export default {
    name: 'mapUsageHelp',
    data: function () {
        return {
            
        }
    },
    created: function () {
        //console.log('created')
    },
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '帮助中心'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
        })
    },
}

</script>
<style scoped>
.map-usage-help .titles{
    font-size: 0.2rem;
    color: #333333;
}
.map-usage-help .btn{
    width:1.6rem;
    height:0.35rem;
    line-height:0.35rem;
    text-align:center;
    border: 0.01rem solid #cccccc;
    border-radius: 0.2rem;
    background:#ffffff;
    font-size:0.14rem;
    color: #333333;
}
.map-usage-help .btn:nth-child(1),
.map-usage-help .btn:nth-child(3){
    /*margin-right:0.1rem;*/
}
.map-usage-help .btn:nth-child(1),
.map-usage-help .btn:nth-child(2){
    margin-bottom:0.12rem;
}
.position-router{
    border-top: 0.06rem solid #f6f6f6;
}
.title-con{
    font-size:0.16rem;
    color:#333333;
}
</style>