<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">零流量地图跟离线地图有什么不同？</div>
            <div class="content">
            即使下载了“离线地图”，大多数地图APP在正常使用过程中依然会消耗流量，许多操作是需要在联网条件下才能进行的。而腾讯地图零流量版，是真正的不需要任何流量的手机地图，不仅是驾车导航零流量，包括公交路线规划和步行路线规划也无需任何流量。如果您有兴趣，可以尝试拔下手机卡，来体会腾讯地图零流量版与其他“离线地图”的差异。
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
    name: 'zeroFlow',
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
.title{
    font-size: 0.2rem;
    color: #333333;
    letter-spacing: 0;
    margin-bottom:0.22rem;
}
</style>
