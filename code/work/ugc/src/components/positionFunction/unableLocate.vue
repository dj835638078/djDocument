<template>
    <div class="container-wrap">
        <div class="container start-position">
            <div class="title">出现无法定位时，请您先按如下步骤检查手机各定位相关开关：</div>
            <div class="content">
                1 位置服务开关和GPS是否开启，打开方法：</br>设置->安全和隐私->位置信息->位置信息开关,请打开位置信息开关，定位模式选择“高精确度”或“仅限设备”，最好为“高精确度”模式</br>2 手机地图位置信息权限是否开启，打开方法：
    设置->应用->权限管理->腾讯地图->位置信息，打开位置信息权限开关
    </br>3 WI-FI是否开启，打开方法：</br>设置->无线和网络->WLAN，打开WLAN开关</br>4 移动网络开关是否开启，打开方法：</br>在无GPS信号，无Wi-Fi网络时，通过网络定位需要开启移动网络开关，开启步骤：
    设置->无线和网络->移动网络，打开移动网络开关</br>以上定位相关开关打开步骤不同设备可能有些不同，根据设备实际情况确定。</br>如果您按以上步骤检查并打开定位相关开关后仍然无法定位，请您在反馈页面反馈您的定位问题。

            </div>    
        </div>    
    </div>
</template>
<script>
export default {
    name:'unableLocate',
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