<template>
    <div class="container-wrap">
        <router-link to='/start-position'>
            <div class="container">
                <div class="title">开启定位</div>
                <div class="arrow">></div>
            </div>
        </router-link>
        <div class="border"></div>
        <router-link to='/no-position'>
            <div class="container">
                <div class="title">定位不准</div>
                <div class="arrow">></div>
            </div>
        </router-link>
        <div class="border"></div>
        <router-link to='/unable-locate'>
            <div class="container">
                <div class="title">无法定位</div>
                <div class="arrow">></div>
            </div>
        </router-link>
        <div class="border"></div>
        <router-link to='/week-gps'>
            <div class="container">
                <div class="title">GPS信号弱</div>
                <div class="arrow">></div>
            </div>
        </router-link>
        <div class="border"></div>
        
    </div>
</template>
<script>
export default {
    name: 'startPositionIndex',
    data: function () {
        return {
        }
    },
    created: function () {
        console.log('created')
        document.title = '请选择问题类型'
    },
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '如何更准确定位'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
            // this.$router.go(-1)
           history.go(-1)
        })
    },
    methods: {

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
