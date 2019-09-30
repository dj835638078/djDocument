<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">为什么我通过“商户标注”标注了一个新地址之后，在地图上没有显示其名称？</div>
            <div class="content">
                  首先，商户标注需要3-7天的审核时间，在审核通过前，您所申请标注的地址不会显示在地图上，这段时间内请您耐心等待。审核通过后，请您在腾讯地图上搜索一下这个商户名称是否存在，如果存在，说明已经标注成功。商户名称是否在地图上显示取决于其地理位置、该商户被搜索的次数等外界因素，腾讯地图无法人工干预；如果无法搜索到，说明您的标注未成功，您可以通过“个人中心-意见反馈”说明您的问题，我们的工作人员会有针对性的来为您服务。
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
    name: 'nameNotshown',
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
    margin-bottom:0.2rem;
}
</style>
