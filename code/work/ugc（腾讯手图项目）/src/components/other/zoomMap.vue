<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">如何在腾讯地图中缩小、放大所查看的地图？</div>
            <div class="content">
              与其他地图一样，您可以通过两个手指的向内、外滑动来缩小、放大腾讯地图的页面。除此之外，为了方便您单手操作地图，腾讯地图还在业內首创了单手缩放功能。具体操作如下：打开腾讯地图，页面的左边或右边有一个按钮(上下两个箭头)，向上拉动时放大，向下拉动时缩小。您可以根据自己使用手机的习惯把按钮设置在您方便操作的一边，设置方法为：“个人中心-设置-显示设置-左手操作”，打开该按钮时单手缩放键在左侧，关闭该按钮时单手缩放键在右侧。
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
    name: 'zoomMap',
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