<template>
      <div class="container-wrap">
          <div class="container">
              <div class="title">请问怎么样才能在腾讯地图上标注商户呢？</div>
              <div class="content">
              您可以通过电脑登录网页http://map.qq.com/，点击右上角的：“商户标注”指引进行商户标注操作；或关注“腾讯位置服务”微信公众号添加商户标注，工作人员会尽快处理。
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
    name: 'labelMerchant',
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