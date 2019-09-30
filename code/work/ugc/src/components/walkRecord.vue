<template>
    <div>
        <walkR  @driveChange='onDriveChange' :drive='drive'></walkR>   
        <div class="otherNavigationBtn" style="padding-left:20px;">
            <router-link to='/other-drive-navigation'>
                <button>其他导航问题</button>
            </router-link>
        </div> 
    </div>
</template>
<script>
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
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '步行导航问题'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
        })
        var self = this
        nativeGetWalkRouteInfoList(function(data){
            if(data.length == 0){
                self.$router.push({path:'/other-walk-navigation',query:{lineLength:data.length}}); 
            }
        })
    },
    components: {
       walkR,
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
