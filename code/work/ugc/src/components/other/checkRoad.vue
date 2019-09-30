<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">腾讯地图如何查看实时路况？</div>
            <div class="content">
              打开腾讯地图,点击首页“路况”按钮,地图上即可显示当前
      路况。绿色代表道路通畅,黄色代表行驶缓慢,红色代表道
      路拥堵。
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
    name: 'checkRoad',
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