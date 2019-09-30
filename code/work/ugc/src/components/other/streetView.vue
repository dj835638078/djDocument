<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">什么是街景？如何使用街景？</div>
            <div class="content">
            街景地图是一种实景地图服务。为用户提供城市、街道或其他环境的360°全景图像，用户可以通过该服务获得如临其境的地图浏览体验。腾讯是国内第一家提供街景服务的企业，目前全国已有137个城市开通了街景服务。在手机端，您可以通过以下操作查看某地的街景：打开腾讯地图，点击顶部搜索框下方的按钮，选中街景，此时地图上会出现一系列蓝色的线条和一个活动的摄像头标记，挪动地图，直到摄像头移动到您希望查看的位置，点击摄像头上方出现的标签“某某附近”，即可查看该处的街景。除此之外，您也可以通过地点详情页查看街景。
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
    name: 'streetView',
    mounted:function(){
        nativeSetNavBarTitle('腾讯地图')
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
    },
    methods: {
        resolve(){
            //document.getElementById("resolve").style.borderColor="#427CFF";
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
    margin-bottom:0.22rem;
}
</style>