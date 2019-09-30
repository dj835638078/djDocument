<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">使用手机腾讯地图是否会收费？</div>
            <div class="content">
            腾讯地图的下载、安裝和使用完全免费,腾讯公司不收取任何费用。下载和使用腾讯地图过程中所产生的流量使用费和短信发送费用由当地运营商收取,请您咨询当地运营商了解详情。
            </div>
        </div>
        <div class="container">
            <div>是否解决了你的问题：</div>
            <div style="display:inline-block;">
                <div class="resolve" @click="resolve">已解决</div>
                <router-link to='/add-feedback'> 
                    <button class="no">没有，我要反馈</button>
                </router-link>    
            </div>
        </div>    
    </div>
</template>
<script>
export default {
    name: 'isFree',
    mounted:function(){
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '腾讯地图'}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
    },
    methods: {
        resolve(){
            history.go(-1)
        }
    }
}  
</script>

<style scoped>
.title{
    font-size: 0.2rem;
    color: #333333;
    letter-spacing: 0;
    margin-bottom:0.2rem;
}

</style>