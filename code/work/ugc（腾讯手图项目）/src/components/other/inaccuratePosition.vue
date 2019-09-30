<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">为什么有时候地图定位不准？</div>
            <div class="content">
            手机地图的定位与您手机的配置以及您所处的环境都有关系，包括基站密度，附近干扰因素，网络信号，使用地点等。为了保证定位更加准确，建议您按照地图客户端的提示，开启WIFI和GPS的开关。开启GPS后，系统需要一个与卫星通信和计算的时间，通常由于手机配置不同需要1-8分钟左右的时间。
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
    name: 'inaccuratePosition',
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
