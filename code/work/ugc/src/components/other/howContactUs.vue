<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">我有问题想反馈、怎么联系你们？</div>
            <div class="content">
              您可以通过腾讯地图上的“发现-设置-意见反馈“将您的意
      见反馈给我们,方便的话请您留下您的联系方式,便于我们
      与您沟通确认问题的细节。您也可以登录我们的论坛
      http://bbs.map.qq.com在“问腾讯人”版块与我们沟
      通
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
    name: 'howContactUs',
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