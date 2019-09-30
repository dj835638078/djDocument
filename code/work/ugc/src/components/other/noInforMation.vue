<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">为什么地图上有些信息不准确或者根本没有？</div>
            <div class="content">
            由于我们周边的环境在不断发生变化，因此有时候会出现地图信息未能及时更新的情况，导致信息不准确或缺失。同时，地图信息涉及到的相关审核流程时间耗费会比较长，也可能造成上述情况。如果您遇到信息错漏，欢迎及时通过“发现-设置-意见反馈”，将错漏信息反馈给我们
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
    name: 'noInformation',
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
