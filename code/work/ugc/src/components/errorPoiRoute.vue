<template>
    <div class="container-wrap">
        <div>纠错地点检索也</div>
        <button @click='btn'> 点击确定</button>
    </div>
</template>
<script>
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  //新增的加密方式
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'errorPoi',
    mixins: [mixin],
    data: function () {
        return {
        }
    },
    computed: {
      
    },
    created: function () {
        
    },
    mounted: function () {
        // window.mqq.invoke('ugc', 'searchPoi', {
        //         'type': 12  //纠错  新增
        //     }, function (result) {
        //         console.log(result,22222222222222)
        //         // if (result && result.poiName) {
        //         //     self.place = result.poiName
        //         // }
        // })


        // nativeGetLocationPlace(function(data){
        //     console.log('hello')
        //     console.log(data,'搜索错误类型')
        // })
        

        // nativeDeviceInfo(function(data){
        //     console.log(data,'设备的信息 errorpoiroute')
        // })

        //调用客户端的搜索 弹框
        // nativeReportPoiData(function(data){
        //     console.log(data,'这块是纠错 纠错地点的信息')
        // })
  


        
       
    },
    components: {
        
    },
    methods: {
        btn(){
            console.log('hii')
            nativeGetLocationPlace(function(data){
                console.log('hello')
                console.log(data,'搜索错误类型')
            })
        }
      
    },
    watch: {
        
    }
}
</script>
<style scoped>

</style>
