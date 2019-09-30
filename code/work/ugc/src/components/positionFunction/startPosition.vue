<template>
    <div class="container-wrap">
        <div class="container start-position">
        <div class="title">如何开启定位？</div>
        <div class="content">
            1 如何打开位置服务和GPS?</br>设置->安全和隐私->位置信息->打开位置信息开关,定位模式选择“高精确度”或“仅限设备”，最好为“高精确度”模式</br>2 如何打开WI-FI?</br>在无GPS信号时，开启Wi-Fi(无需连接到Wi-Fi)可以提高定位精度，开启步骤：设置->无线和网络->WLAN，打开WLAN开关</br>3 如何打开移动网络？（数据流量）</br>在无GPS信号，无Wi-Fi网络时，通过网络定位需要开启移动网络开关，开启步骤：设置->无线和网络->移动网络，打开移动网络开关</br>以上开启定位步骤不同设备可能有些不同，根据设备实际情况确定。
        </div>    
        </div>    
    </div>
</template>
<script>
    /*if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            console.log('isIOS');
            document.querySelector('.content').innerHTML="我是ios"
            //document.querySelector('.content').innerHTML='1 如何打开位置服务和GPS?</br>设置->隐私->定位服务，打开定位服务开关</br>2 如何打开WI-FI?在无GPS信号时，开启Wi-Fi(无需连接到Wi-Fi)可以提高定位精度，开启步骤：设置->无线局域网，打开无线局域网开关</br>3 如何打开移动网络？（数据流量）在无GPS信号，无Wi-Fi网络时，通过网络定位需要开启移动网络开关，开启步骤：设置->蜂窝移动网络，打开蜂窝移动数据开关</br>以上开启定位步骤不同设备可能有些不同，根据设备实际情况确定。'
            //document.write("1 如何打开位置服务和GPS?</br>设置->隐私->定位服务，打开定位服务开关</br>2 如何打开WI-FI?在无GPS信号时，开启Wi-Fi(无需连接到Wi-Fi)可以提高定位精度，开启步骤：设置->无线局域网，打开无线局域网开关</br>3 如何打开移动网络？（数据流量）在无GPS信号，无Wi-Fi网络时，通过网络定位需要开启移动网络开关，开启步骤：设置->蜂窝移动网络，打开蜂窝移动数据开关</br>以上开启定位步骤不同设备可能有些不同，根据设备实际情况确定。")
        } else if (/(Android)/i.test(navigator.userAgent)) {
            console.log('isAndroid');
            document.querySelector('.content').innerHTML="我是android"
            //document.querySelector('.content').innerHTML='1 如何打开位置服务和GPS?</br>设置->安全和隐私->位置信息->打开位置信息开关,定位模式选择“高精确度”或“仅限设备”，最好为“高精确度”模式</br>2 如何打开WI-FI?</br>在无GPS信号时，开启Wi-Fi(无需连接到Wi-Fi)可以提高定位精度，开启步骤：设置->无线和网络->WLAN，打开WLAN开关</br>3 如何打开移动网络？（数据流量）</br>在无GPS信号，无Wi-Fi网络时，通过网络定位需要开启移动网络开关，开启步骤：设置->无线和网络->移动网络，打开移动网络开关</br>以上开启定位步骤不同设备可能有些不同，根据设备实际情况确定。'
            //document.write("1 如何打开位置服务和GPS?</br>设置->安全和隐私->位置信息->打开位置信息开关,定位模式选择“高精确度”或“仅限设备”，最好为“高精确度”模式</br>2 如何打开WI-FI?</br>在无GPS信号时，开启Wi-Fi(无需连接到Wi-Fi)可以提高定位精度，开启步骤：设置->无线和网络->WLAN，打开WLAN开关</br>3 如何打开移动网络？（数据流量）</br>在无GPS信号，无Wi-Fi网络时，通过网络定位需要开启移动网络开关，开启步骤：设置->无线和网络->移动网络，打开移动网络开关</br>以上开启定位步骤不同设备可能有些不同，根据设备实际情况确定。")
        } else {
            console.log('isPC');
            document.querySelector('.content').innerHTML="我是pcpcpc"
            document.write("pcpcpcpcpccpcpcpcpc")
        }*/
export default {
    name:'startPosition',
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