<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">软件版本升级后，以前安装的离线地图还能用吗？</div>
            <div class="content">
            离线地图的数据是独立的，当您升级软件后，以前安装的离线地图仍可以继续使用。
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
        nativeSetNavBarTitle('腾讯地图')
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