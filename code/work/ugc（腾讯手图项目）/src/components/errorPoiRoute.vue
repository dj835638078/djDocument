<template>
    <div class="container-wrap">
        <div>纠错地点检索也</div>
        <button @click='btn'> 点击确定</button>
    </div>
</template>
<script>
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  //新增的加密方式
import getReqId from '@/config/seqid'
export default {
    name: 'errorPoi',
    mixins: [mixin],
    data: function () {
        return {}
    },
    computed: {},
    created: function () {},
    mounted: function () {},
    components: {
        
    },
    methods: {
        btn(){
            nativeGetLocationPlace(function(data){})
        }
      
    },
    watch: {
        
    }
}
</script>
<style scoped>

</style>
