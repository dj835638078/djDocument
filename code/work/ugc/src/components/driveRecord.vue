<template>
    <div>
        <driveR  @driveChange='onDriveChange' :drive='drive'></driveR>   
        <div class="otherNavigationBtn" style="padding-left:20px;">
            <router-link to='/other-drive-navigation'>
                <button>其他导航问题</button>
            </router-link>
        </div> 
    </div>
</template>
<script>
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
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '驾车导航问题'}, function (result) { 
        })
        var self = this
        nativeGetRouteInfoList(function(data){
            console.log(data,'驾车导航记录111')
            if(data.length == 0){
                self.$router.push({path:'/other-drive-navigation',query:{lineLength:data.length}}); 
            }
        })
    },
    components: {
       driveR,
    },
    methods: {
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
