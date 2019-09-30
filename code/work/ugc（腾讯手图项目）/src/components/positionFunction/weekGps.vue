<template>
    <div class="container-wrap">
        <div class="container start-position">
            <div class="title">为什么有时候出现GPS信号弱？</div>
            <div class="content">
                    手机GPS信号可能受手机周边楼宇，树木等遮挡影响，手机系统无GPS数据上报时，可能出现GPS信号弱。建议您在开阔地带再看GPS信号弱是否还出现。如果还是GPS信号弱，建议您关闭GPS开关再重新打开，或重启手机再导航。如果重启手机后，在开阔地带开启GPS还是GPS信号弱，此场景大部分与手机GPS模块有关，建议您升级系统或联系手机售后。
            </div>
        </div>
    </div>
</template>
<script>
/* 定位不准 gps信号弱 */
import mixin from '@/config/mixin'
export default {
    name:'weekGps',
    mixins: [mixin],
    data(){
        return{

        }
    },
    mounted:function(){
        nativeSetNavBarTitle('腾讯地图')
        nativeGetNavBarBackClick(function(data){
            // this.$router.go(-1)
           history.go(-2)
        })
    },
}

</script>


<style scope>
.start-position .title{
    font-size: 0.2rem;
    color: #333333;
    margin-bottom:0.15rem;
}
.start-position .content{
    font-size: 0.14rem;
    color: #444444;
    line-height: 0.22rem;
}
</style>