
<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">我的定位信息会被泄露出去吗？</div>
            <div class="content">
              腾讯地图不会收集您的个人信息，比如用户名或手机号码。所有的手机对腾讯地图都是匿名的。该信息只有您自己知道，腾讯公司及其他人均无法获知，请放心使用。
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
    name: 'leakInformation',
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