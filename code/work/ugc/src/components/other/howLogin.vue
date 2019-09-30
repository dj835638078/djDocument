<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">腾讯地图如何登陆账号？</div>
            <div class="content">
              打开腾讯地图,点击发现-设置-帐号登录,您可以通过微
      信或者QQ号来登录。登录后,您在收藏夹中所收藏的地点
      和街景会同步至云端,当您重新安装手机系统或在其他手机
      上使用腾讯地图时,收藏夹中的信息可以同步到您的新手机
      中
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
    name: 'howLogin',
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