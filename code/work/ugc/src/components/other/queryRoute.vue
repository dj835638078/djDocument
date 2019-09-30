<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">腾讯地图如何查询路线？</div>
            <div class="content">
              打开腾讯地图,点击主界面底部“导航”按钮,进入路线规划
      界面;您可以在页面最上端选择公交、驾车、步行或骑行4
      种方式来规划路线。输入您的起点位置和终点位置(默认起
      点为您的当前位置),搜索您需要的路线。您可以在众多路
      线选项中选择您最喜欢的路线,也可以点击“路线选项”选择
      路线规划的要求,例如,时间短、少步行、不走高速等;所
      有路线默认开启“躲避拥堵”。
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
    name: 'queryRoute',
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