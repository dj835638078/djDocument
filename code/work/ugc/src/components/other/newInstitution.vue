<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">如果某个位置新增了一个机构、店面或者建筑，而腾讯地图上没有显示，怎么通知你们？</div>
            <div class="content">
            您可以通过“发现-设置-意见反馈”将新增的内容通知我们，并留下您的联系方式，非常感谢你那对我们的帮助！
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
    name: 'newInstitution',
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
