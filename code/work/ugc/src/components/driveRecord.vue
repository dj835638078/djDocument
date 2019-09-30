<template>
    <div class='wrap'>
            <driveR  @driveChange='onDriveChange' :drive='drive'></driveR>   
            <div class="otherNavigationBtn" style="padding-left:20px;">
                <router-link to='/other-drive-navigation'>
                    <button>其他导航问题</button>
                </router-link>
            </div> 
    </div>
</template>
<script>
/* 驾车导航 */
import driveR from '@/components/drive/driveR'
import mixin from '@/config/mixin'
export default {
    name: 'driveRecord',
    mixins: [mixin],
    data: function () {
        return {
            drive: '',
        }
    },
    mounted:function(){
        nativeSetNavBarTitle('驾车导航问题')
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        var self = this
        // nativeGetRouteInfoList(function(data){
        //     if(data.length == 0){
        //         self.$router.push({path:'/other-drive-navigation',query:{lineLength:data.length}}); 
        //     }
        // })
    },
    components: {
       driveR,
    },
    methods: {
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
