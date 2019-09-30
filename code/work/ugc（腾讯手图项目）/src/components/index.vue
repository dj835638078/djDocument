<template>
    <div :style="{ height: boxHeight + 'px' }">
        <div class="container-wrap" v-if="networkFlag" ref="containerWrap">
            <div class='add-router container' @click='addPoiShow = true'>
                <div class="title">新增</div>
                <div class="title-desc">附近新开了商铺、道路、公交站？</div>
                <div class="arrow" style="top:0.25rem;">></div>
            </div>
            <div class="border"></div>
            <div class="error-router container" @click='errorPoiShow = true'>
                <div class="title">纠错</div>
                <div class="title-desc">地点、道路、公交信息与实际不符？</div>
                <div class="arrow" style="top:0.25rem;">></div>
            </div>
                <div class="position-router container" @click='inaccuratePosition'>
                    <div class="title">定位不准</div>
                    <div class="arrow">></div>
                </div>
            <div class="border"></div>
                <div class="driving-router container" @click='driveNavigation'>
                    <div class="title">驾车导航问题</div>
                    <div class="arrow">></div>
                </div>
            <div class="border"></div>
                <div class="bus-router container" @click='busFunction'>
                    <div class="title">公交功能问题</div>
                    <div class="arrow">></div> 
                </div>
            <div class="border"></div>
                <div class="walking-router container" @click='walkNavigation'>  
                    <div class="title">步行导航问题</div>
                    <div class="arrow">></div>
                </div>
            <div class="border"></div>
                <div class="cycling-router container" @click='rideNavigation'>
                    <div class="title">骑行导航问题</div>
                    <div class="arrow">></div>
                </div>
            <div class="border"></div>
                <div class="other-router container" @click='otherUseIssue'>
                    <div class="title">其他使用问题</div>
                    <div class="arrow">></div>
                </div>
            <div class="border"></div>
                <div class="usageHelp-router container" @click='mapUsageHelp'>
                    <div class="title">查看地图使用帮助</div>
                    <div class="arrow">></div>
                </div>
            <!-- <div class="border"></div>
            <router-link to='my-feedback'>
                <div class="container">
                    <div class="title">反馈</div>
                    <div class="arrow">></div>
            </div>
            </router-link>     -->
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
                <router-link to='/error-bus-near-line'>
                    <div class='modal-line-border'>公交线路报错</div>
                </router-link>
                <div @click='errorPoiShow = false' class='modal-line' style="border: 0">取消</div>
            </modal>
        </div>
        <noNetwork v-else/> 
    </div>
</template>
<script>
/* 首页 */
import modal from './subComponents/modal'
import mixin from '@/config/mixin'
import noNetwork from './subComponents/noNetwork'
export default {
    name: 'index',
    mixins: [mixin],
    data () {
        return {
            addPoiShow: false,
            errorPoiShow: false,
            networkFlag:true,
            boxHeight: 700
        }
    },
    created: function () {
        nativeSetNavBarVisible()
    },
    mounted: function () {
        let self = this
        nativeSetNavBarTitle('意见反馈')
        nativeSetNavBarRightButton('我的反馈',function (result) {
            self.$router.push({name: 'myFeedback'})
        })
        nativeGetNavBarBackClick(function(data){
            nativePerformNavBarBackClick(function(data){})
        })
        setTimeout(() => {
            self.$nextTick(()=>{
                self.boxHeight = self.$refs.containerWrap.offsetHeight
                window.scrollTo(0,0)
            })
        }, 0);        
    },
    components: {
        modal,
        noNetwork
    },
    beforeRouteLeave(to, from ,next) {
        if(!navigator.onLine){
            // window.nativeShowToast('网络异常')
            this.networkFlag = false
        }else{
            next()
        }
    },
    methods: {
        getData(){
            this.addPoiShow = false
            this.errorPoiShow = false
        },
        driveNavigation(){
            mapDataReport("ugcreport_car")
            var self = this
            nativeGetRouteInfoList(function(data){
                if(data.length == 0){
                    self.$router.push({path:'/other-drive-navigation'}); 
                }else{
                    localStorage.setItem("driveRouteInfoListStorage", JSON.stringify(data))
                    self.$router.push({path:'/drive-record'}); 
                }
            })
        },
        walkNavigation(){
            mapDataReport("ugcreport_walk")
            var self = this
            nativeGetWalkRouteInfoList(function(data){
                if(data.length == 0){
                    self.$router.push({path:'/other-walk-navigation'}); 
                }else{
                    localStorage.setItem("WalkRouteInfoListStorage", JSON.stringify(data))
                    self.$router.push({path:'/walk-record'}); 
                }
            })
        },
        rideNavigation(){
            mapDataReport("ugcreport_bike")
            var self = this
            nativeGetBikeRouteInfoList(function(data){
                if(data.length == 0){
                    self.$router.push({path:'/other-ride-navigation'}); 
                }else{
                    localStorage.setItem("rideRouteInfoListStorage", JSON.stringify(data))
                    self.$router.push({path:'/ride-record'}); 
                }
            })
        },
        inaccuratePosition(){
            var self = this
            self.$router.push({path:'/Inaccurate-positioning'}); 
        },
        busFunction(){
            var self = this
            self.$router.push({path:'/bus-function'}); 
        },
        otherUseIssue(){
            var self = this
            self.$router.push({path:'/other-usage-issue'}); 
        },
        mapUsageHelp(){
            var self = this
            self.$router.push({path:'/map-usage-help'});
        }
    }
}
</script>
<style scoped>
.container{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
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
.modal-line{
    -webkit-tap-highlight-color:rgba(0,0,0,0);
}
</style>
