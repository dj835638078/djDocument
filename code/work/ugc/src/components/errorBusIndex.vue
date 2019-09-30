<template>
    <div class="container-wrap">
        <!-- <router-link to='/error-bus-station'> -->
            <div class="container" @click='errBusStation'>
                <div class="title">车站错误</div>
                <div class="arrow">></div>
            </div>
        <!-- </router-link> -->
        <div class="border"></div>
        <!-- <router-link to='/error-bus-route'> -->
            <div class="container" @click='errBusRoute'>
                <div class="title">途经线路错误</div>
                <div class="arrow">></div>
            </div>
        <!-- </router-link> -->
        <div class="border"></div>
        <router-link to='/error-bus-other'>
            <div class="container">
                <div class="title">其他问题</div>
                <div class="arrow">></div>
            </div>
        </router-link>
        <div class="border"></div>
    </div>
</template>
<script>
/* 纠错 公交站报错 */
import mixin from '@/config/mixin'
export default {
    name: 'errorBusIndex',
    mixins: [mixin],
    data: function () {
        return {
            id:'',
            name:'',
            lat:'',
            lon:'',
        }
    },
    mounted: function () {
        nativeSetNavBarTitle('请选择问题类型')
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        this.id = this.$route.query.id    //id已经取到了
    },
    methods: {
        errBusStation(id){
            this.$router.push({path:'/error-bus-station',query:{id:this.id,name:this.$route.query.name,lat:this.$route.query.lat,lon:this.$route.query.lon,type:this.$route.query.type}});  //
        },
        errBusRoute (id){
            this.$router.push({path:'/error-bus-route',query:{id:this.id,name:this.$route.query.name,lat:this.$route.query.lat,lon:this.$route.query.lon,type:this.$route.query.type}});  //
        },

    }
}
</script>
<style scoped>
.arrow {
    position: absolute;
    right: 0.2rem;
    top: 0.14rem;
    color: #888888;
}
</style>
