<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">地图上某地点的位置、信息有错误怎么通知你们？</div>
            <div class="content">
            当您发现地图上某点的位置或者信息有错误，如搬走、改名、撤销或经营范围更改时，您可以点击这个地点，通过弹出页面上的“+纠错”告诉我们问题是什么。我们的审核时间一般为一周，如信息无误，一周后您所纠错的地点便会生效。感谢您对我们的帮助！
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
    name: 'errorNotification',
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
