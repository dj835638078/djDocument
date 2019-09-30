<template>
    <div class='wrap'>
        <bikeR  @driveChange='onDriveChange' :drive='drive'></bikeR>   
        <div class="otherNavigationBtn" style="padding-left:20px;">
            <router-link to='/other-ride-navigation'>
                <button>其他导航问题</button>
            </router-link>
        </div> 
    </div>
</template>
<script>
/* 骑行导航 */
import bikeR from '@/components/drive/bikeR'
import mixin from '@/config/mixin'
export default {
    name: 'rideRecord',
    mixins: [mixin],
    data: function () {
        return {
            drive: '',
        }
    },
    mounted:function(){
        nativeSetNavBarTitle('骑行导航问题')
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
    },
    components: {
       bikeR,
    },
    methods: {
        onDriveChange(){
            // console.log('驾车轨迹')
        }
    }
}    
</script>
<style scoped>
body{
    background:#ffffff!important;
}
.wrap{
    position: relative;
    padding-bottom:0.6rem;
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
