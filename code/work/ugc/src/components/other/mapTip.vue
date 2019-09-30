<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">使用手机腾讯地图时，提示“网络连接失败请稍候再试”，怎么办？</div>
            <div class="content">
               您可以先检查您的手机，是否连接了WIFI或打开了移动数据(如GPRS、4G等)。如果已经确认连接WIFI或开启了移动数据，再请您检查下其他软件是否能够上网，如其他软件也不能上网，说明这一问题是由于您当时的网络环境不佳导致的。如只有腾讯地图无法使用，您可以通过“个人中心-意见反馈”将这一问题反馈给我们。
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
    name: 'streetViewError',
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
