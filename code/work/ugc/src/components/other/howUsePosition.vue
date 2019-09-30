<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">如何使用腾讯地图的定位功能？</div>
            <div class="content">
            打开腾讯地图，点击屏幕左下角的箭头标志，即可完成定位；为了在腾讯地图中使用定位功能，请您在系统中开启定位服务；开启方法：Android——设置->安全和隐私->位置信息->打开位置信息开关,定位模式选择“高精确度”或“仅限设备”，最好为“高精确度”模式。iPhone——设置-隐私-定位服务-滑动打开定位服务开关，同时开启下方的腾讯地图定位开关。
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
    name: 'howUsePosition',
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
    margin-bottom:0.2rem;
}
</style>