<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">零流量功能如何开启</div>
            <div class="content">
            下载腾讯地图零流量版本后,点击“发现-离线地图”,开启
      零流量模式开关,软件会提示您需要下载当前城市离线地图
      和离线导航数据包。点击“下载”,可下载您需要城市的离线
      地图。
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
    name: 'startZeroFlow',
    mounted:function(){
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '腾讯地图'}, function (result) { 
        })
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
