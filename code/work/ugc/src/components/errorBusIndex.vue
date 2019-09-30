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
export default {
    name: 'errorBusIndex',
    data: function () {
        return {
            id:'',
            name:'',
            lat:'',
            lon:'',
        }
    },
    created: function () {
        console.log('created')
        document.title = '请选择问题类型'
    },
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '请选择问题类型'}, function (result) { 
           // console.log(result,'这块是地点报错的title')
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        console.log('errorPoi mounted');
        this.id = this.$route.query.id    //id已经取到了
        console.log(this.id,'看一下取出来了吗id index？')
    },
    methods: {
        errBusStation(id){
            console.log(this.$route.query.id,this.$route.query.name,this.$route.query.lat,this.$route.query.lon,'07-24')
            this.$router.push({path:'/error-bus-station',query:{id:this.id,name:this.$route.query.name,lat:this.$route.query.lat,lon:this.$route.query.lon}});  //
        },
        errBusRoute (id){
            this.$router.push({path:'/error-bus-route',query:{id:this.id,name:this.$route.query.name,lat:this.$route.query.lat,lon:this.$route.query.lon}});  //
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
