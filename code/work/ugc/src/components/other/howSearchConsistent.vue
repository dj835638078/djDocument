<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">零流量模式下的搜索地点或公交路线的结果和在线的是一样的吗？</div>
            <div class="content">
            由于离线条件下对输入搜索内容的技术分析环境没有在线条件的好，因此零流量模式下的搜素结果会比在线搜索的少一些。
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
    name: 'howSearchConsistent',
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
    margin-bottom: 0.2rem;
}
</style>
