<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">腾讯地图搜索功能如何使用？</div>
            <div class="content">
              1、打开腾讯地图，点击搜索框，输入搜索关键词、进行搜索即可；</br>
              2、搜索结果会以地图和列表两种方式展示。点击“列表”图标，切换到列表方式查看详情；</br>
              3、您也可以直接在主界面点击右上角语音搜索按钮，用普通话说出要去的地点，软件就能自动搜索出结果。
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
    name: 'howSearch',
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
.title-con {
  font-size: 0.16rem;
  color: #333333;
  margin-bottom: 0.2rem;
  letter-spacing: 1.5px;
  line-height: 0.22rem;
}
.title{
    font-size: 0.2rem;
    color: #333333;
    letter-spacing: 0;
    margin-bottom:0.2rem;
}
</style>