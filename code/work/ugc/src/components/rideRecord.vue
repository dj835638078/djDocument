<template>
    <div>
        <bikeR  @driveChange='onDriveChange' :drive='drive'></bikeR>   
        <div class="otherNavigationBtn" style="padding-left:20px;">
            <router-link to='/other-ride-navigation'>
                <button>其他导航问题</button>
            </router-link>
        </div> 
    </div>
</template>
<script>
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
        var self = this
        nativeGetBikeRouteInfoList(function(data){
            if(data.length == 0){
                self.$router.push({path:'/other-ride-navigation',query:{lineLength:data.length}}); 
            }
        })
    },
    components: {
       bikeR,
    },
    methods: {
        onDriveChange(){
            console.log('驾车轨迹')
        }
    }
}    
</script>
<style scoped>
.contentPlaceError {
    width: 0.6rem;
    height: 0.3rem;
    border: 1px solid #427CFF;
    border-radius: 30px;
}
</style>
