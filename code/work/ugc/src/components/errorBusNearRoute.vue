<template>
    <div class="container">
        
        <div class="search">
            <div class="arrow" @click="back"><</div>
            <input type='text' placeholder='你要纠错的是不是' class="searchIcon" id="searchIcon" v-model="selectedText" @input="onInput">
            <span class='searchText'>搜索</span>
        </div>
        <div v-show="!visible && !emptyVisible">
            <div class="addr" v-for="item in searchStationLists" @click="errorBusNearRoute(item.id,item.name)">
                {{item.name}}
                <div class="border" style="width:3.3rem;left:-0.3rem;"></div>
            </div>
        </div>    

        <div v-show="visible && !emptyVisible">
            <div class="near">附近的站点</div>
            <div class="addr" v-for="item in stationList" @click="errorNearRoute(item.tPOI.sUid,item.tPOI.sName,item.tPOI.tPoint.latitude,item.tPOI.tPoint.longitude)">
                {{item.tPOI.sName}}
                <div class="border" style="width:3.3rem;left:-0.3rem;"></div>
            </div>   
        </div>   
        <div class="container-empty-wrap" v-show="emptyVisible">
            <div class="container-empty">
                <div class='addr-icon'></div>
                <div class='not-find'>没有查询到该地点</div>
                <div class='explore-other-place'>试试探索其他地方</div>
                <div class="add-poi" @click='addStationBtn'>新增公交站</div>
            </div>    
        </div>
    </div>
</template>
<script>
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
import jsonp from 'jsonp'
export default {
    name: 'errorBusNearRoute',
    mixins: [mixin],
    data: function () {
        return {
            stationList:'',
            searchStationLists:[],
            selectedText:'',
            deviceInfo: {},
            deviceInfoAll: {},
            visible:true,
            emptyVisible:false,
        }
    },
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '公交站报错'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
            window.mqq.invoke('ugc', 'setNavBarVisible', {visible: true}, function (result) {})
        })
        window.mqq.invoke('ugc', 'setNavBarVisible', {visible: false}, function (result) {})

        var self = this;
        nativeGetPosition(function(lat,lon){
            nativeDeviceInfo(function(data){
                var appVersion = ''
                var imei = ''
                var platform = ''
                self.appVersion = data.appVersion
                self.imei = data.imei
                self.platform = data.platform
                var url = nearUrl + '/nearby?qt=get_roundDetail&wd=%E5%85%AC%E4%BA%A4%E5%9C%B0%E9%93%81&px='+lon+'&py='+lat+'&rn=10&pn=0&app_ver='+self.appVersion+'&imei='+self.imei+'&device='+self.platform+'&uip=61.135.172.70'//&cb=__jp8' 
                jsonp(url, {param:'cb', timeout: 1000}, function(err, data) {
                    if (data) {
                        self.stationList = data.poi
                    }
                });

            })
        })
    },
    methods: {
        errorNearRoute(v,name,lat,lon){
            this.$router.push({path:'/error-bus-index',query:{id:v,name:name,lat:lat,lon:lon}});
            window.mqq.invoke('ugc', 'setNavBarVisible', {visible: true}, function (result) { 
           })
        },
        back(){
            history.go(-1)
            window.mqq.invoke('ugc', 'setNavBarVisible', {visible: true}, function (result) { 
           })
        },
        searchText(){
            var a = document.getElementById("searchIcon").value;
            //console.log(a,'我是搜索 需要把搜索的值传入到车站的页面')
        },
        errorBusNearRoute(v,name){
            window.mqq.invoke('ugc', 'setNavBarVisible', {visible: true}, function (result) { 
            })
            this.selectedText = name
            console.log('跳转到index')
            this.$router.push({path:'/error-bus-index',query:{id:v,name:name}});
        },
        onInput() {
            var self = this
            if (!self.selectedText) {
                self.visible = true
                self.emptyVisible = false
                return
            }
            this.debounce(function() {
                let wd = self.selectedText
                let px = self.lon
                let py = self.lat
                let imei = self.deviceInfoAll.imei
                let device = self.deviceInfoAll.platform
                let app_ver = self.deviceInfoAll.appVersion
                console.log(self.deviceInfoAll, 'deviceInfoAll')
                var url = searchUrl+'/mobilemap?mmtype=busquery&wd=' + wd +'&py=' + py + '&px=' + px + '&rn=10&rp=0&imei=' + imei + '&device=' + device + '&app_ver=' + app_ver + '&type=2'
                jsonp(url, {param:'cb', timeout: 1000}, function(err, data) {
                    if (data) {
                        console.log(data.list, '纠错 车站纠错')
                        self.searchStationLists = data.list || []
                        if(self.searchStationLists.length == 0){
                            self.emptyVisible = true
                        } else {
                            self.emptyVisible = false
                            self.visible = false
                        }
                    }else{
                        self.emptyVisible = true
                    }
                });
            })()
        },
        addStationBtn(){
            this.$router.push({path:'/add-station'})
        },
    }
}
</script>
<style scoped>
.container {
    margin-top: -0.06rem;
}
.near{
    font-size: 0.13rem;
    color: #999999;
    letter-spacing: 0;
    margin-bottom:0.04rem;
}
.addr{
    height:0.51rem;
    line-height:0.51rem;
    font-size:0.16rem;
    background-image: url('../commons/img/ic_bus.png');
    background-repeat: no-repeat;
    background-position:0 0.14rem;
    padding-left:0.3rem;
    padding-top:4px;
    background-size:0.26rem 0.26rem;
}
.arrow {
    position: absolute;
    left: 0.3rem;
    top: 0.16rem;
    color: #888888;
}
.search{
    height:0.42rem;
    line-height:0.42rem;
    background: #EFEFEF; 
    border-radius: 0.07rem;
    padding-left:0.38rem;
    margin-bottom:0.1rem;
}
.searchIcon{
    background: #EFEFEF;
    opacity: 0.6;
    font-size: 0.16;
    color: #888888;
}
.searchText{
    position: absolute;
    right: 0.34rem;
    top: 0.16rem;
    font-size: 0.16rem;
    color: #427CFF;
}
/* 公共的部分 */
.container-empty-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
}
.container-empty {
    position: absolute;
    left: calc(50% - 0.2rem);
    top: 300%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}
.addr-icon{
    display: inline-block;
    width:0.85rem;
    height:0.85rem;
    background-size:100% 100%;
    background: url('../commons/img/tent.png');
    background-size: 100% 100%;
    background-repeat:no-repeat;
}
.not-find{
    font-size: 0.16rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.2rem;
}
.explore-other-place{
    font-size: 0.14rem;
    color: #999999;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.16rem;
    margin-top: 0.08rem;
}
.add-poi{
    display: inline-block;
    width:1rem;
    height:0.3rem;
    line-height:0.3rem;
    border: 0.01rem solid #427CFF;
    border-radius: 0.3rem;
    color:#427CFF;
    margin-top:0.4rem;
}
</style>
