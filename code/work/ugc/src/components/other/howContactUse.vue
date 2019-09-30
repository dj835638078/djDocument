<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">安装腾讯地图后，是否一定需要下载离线地图才能使用？</div>
            <div class="content">
            腾讯地图不需要安装离线地图也能正常使用。腾讯地图支持在线地图下载，当浏览的手机上没有本地地图数据的区域时，软件会自动联网下载该区域的地图，保证您在未下载离线地图数据的情况下也能顺利使用，但为了节省您的手机流量，建议您下载对应城市的离线地图，以便在没有wifi的环境下可以使用零流量模式。
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
    name: 'howContactUse',
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
    margin-bottom:0.2rem;
}
</style>
