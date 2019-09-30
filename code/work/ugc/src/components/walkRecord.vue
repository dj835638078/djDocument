<template>
    <div class='wrap'>
        <walkR  @driveChange='onDriveChange' :drive='drive'></walkR>   
        <div class="otherNavigationBtn" style="padding-left:20px;">
            <router-link to='/other-walk-navigation'>
                <button>其他导航问题</button>
            </router-link>
        </div> 
    </div>
</template>
<script>
/* 步行导航 */
import walkR from '@/components/drive/walkR'
import mixin from '@/config/mixin'
export default {
    name: 'walkRecord',
    mixins: [mixin],
    data: function () {
        return {
            drive: '',
        }
    },
    mounted:function(){
        nativeSetNavBarTitle('步行导航问题')
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
        })
        var self = this
        // nativeGetWalkRouteInfoList(function(data){
        //     if(data.length == 0){
        //         self.$router.push({path:'/other-walk-navigation',query:{lineLength:data.length}}); 
        //     }
        // })
    },
    components: {
       walkR,
    },
    methods: {
        onDriveChange(){
            // console.log('驾车轨迹')
        }
    }
}    
</script>
<style scoped>
.wrap{
    position: relative;
    padding-bottom:0.6rem
}
.contentPlaceError {
    width: 0.6rem;
    height: 0.3rem;
    border: 1px solid #427CFF;
    border-radius: 30px;
}
.otherNavigationBtn{
    box-sizing: border-box;
    background-color:#ffffff;
}
</style>
