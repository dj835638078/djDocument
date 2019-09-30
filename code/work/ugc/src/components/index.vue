<template>
    <div class="container-wrap">
        <div class='add-router container' @click='addPoiShow = true'>
            <div class="title">新增</div>
            <div class="title-desc">附近新开了商铺，道路，公交站？</div>
            <div class="arrow" style="top:0.25rem;">></div>
        </div>
        <div class="border"></div>
        <div class="error-router container" @click='errorPoiShow = true'>
            <div class="title">纠错</div>
            <div class="title-desc">地点、道路、公交信息与实际不符？</div>
            <div class="arrow" style="top:0.25rem;">></div>
        </div>
        <router-link to='Inaccurate-positioning'>
            <div class="position-router container" >
                <div class="title">定位不准</div>
                <div class="arrow">></div>
            </div>
        </router-link>
        <div class="border"></div>
        <router-link to='drive-record'>
            <div class="driving-router container">
                <div class="title">驾车导航</div>
                <div class="arrow">></div>
            </div>
        </router-link>   
        <div class="border"></div>
        <router-link to='bus-function'>
            <div class="bus-router container">
                <div class="title">公交功能</div>
                <div class="arrow">></div> 
            </div>
        </router-link>       
        <div class="border"></div>
        <router-link to='walk-record'>
            <div class="walking-router container">  
                <div class="title">步行导航</div>
                <div class="arrow">></div>
            </div>
        </router-link> 
        <div class="border"></div>
        <router-link to='ride-record'> 
            <div class="cycling-router container">
                <div class="title">骑行导航</div>
                <div class="arrow">></div>
            </div>
        </router-link>   
        <div class="border"></div>
        <router-link to='other-usage-issue'>
            <div class="other-router container">
                <div class="title">其他使用问题</div>
                <div class="arrow">></div>
            </div>
        </router-link>    
        <div class="border"></div>
        <router-link to='map-usage-help'>
            <div class="usageHelp-router container">
                <div class="title">查看地图使用帮助</div>
                <div class="arrow">></div>
            </div>
        </router-link>    
        <div class="border"></div>
        <router-link to='my-feedback'>
            <div class="container">
                <div class="title">反馈</div>
                <div class="arrow">></div>
        </div>
        </router-link>    

        <modal v-show="addPoiShow" @modalHidden='addPoiShow = false'>
            <router-link to='/add-poi'>
                <div class='modal-line'>新增地点</div>
            </router-link>
            <router-link to='/add-road'>
                <div class='modal-line'>新增道路</div>
            </router-link>
            <router-link to='/add-station'>
                <div class='modal-line'>新增公交站</div>
            </router-link>
            <router-link to='/add-line'>
            <div class='modal-line-border'>新增公交线路</div>
            </router-link>
            <div @click='addPoiShow = false' class='modal-line' style="border: 0">取消</div>
        </modal>
        <modal v-show="errorPoiShow" @modalHidden='errorPoiShow = false'>
            <router-link to='/error-poi'>
                <div class='modal-line'>地点报错</div>
            </router-link>
            <router-link to='/error-road'>
                <div class='modal-line'>道路报错</div>
            </router-link>
             <router-link to='/error-bus-near-route'>
                <div class='modal-line'>公交站报错</div>
            </router-link>
            <!-- <router-link to='/error-bus-near-line'> --><!--目前取消不做了-->
            <router-link to='/error-bus-near-line'>
                <div class='modal-line-border'>公交线路报错</div>
            </router-link>
            <div @click='errorPoiShow = false' class='modal-line' style="border: 0">取消</div>
        </modal>
    </div>
</template>
<script>
import modal from './subComponents/modal'
export default {
    name: 'index',
    data () {
        return {
            addPoiShow: false,
            errorPoiShow: false
        }
    },
    created: function () {
        console.log('created')
        document.title = '意见反馈'
        window.mqq.invoke('ugc', 'setNavBarVisible', {visible: true}, function (result) {})
    },
    mounted: function () {
        let self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '意见反馈'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: '我的反馈'}, function (result) { 
            self.$router.push({name: 'myFeedback'})
        })

        nativeGetNavBarBackClick(function(data){
            nativePerformNavBarBackClick(function(data){})
        })        
    },
    components: {
        modal
    },
    methods: {
    }
}
</script>
<style scoped>
.add-router {
    /* border-top: 0.06rem solid #DDDDDD; */
    /* margin-top: 0.06rem; */
}
.error-router {
    /* border-bottom: 0.06rem solid #DDDDDD; */
}
.arrow {
    position: absolute;
    right: 0.2rem;
    top: 0.18rem;
    color: #888888;
}
.position-router,.usageHelp-router{
    border-top: 0.06rem solid #f6f6f6;
}
</style>
