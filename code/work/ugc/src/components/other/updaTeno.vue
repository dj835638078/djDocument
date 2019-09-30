<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">如提示离线地图需要更新时，是否可以选择不更新？</div>
            <div class="content">
            用户可以根据自己的需要选择更新或是不更新。但为了您在零流量模式下有更好的使用体验，我们建议您在收到更新提醒时及时更新离线地图。
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
    name: 'updateno',
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
