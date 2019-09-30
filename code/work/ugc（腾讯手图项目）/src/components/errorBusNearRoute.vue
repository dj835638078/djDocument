<template>
    <div class="container">
        
        <div class="search">
            <div class="arrow" @click="back"></div>
            <input type='text' placeholder='请输入要纠错的公交站名称' ref="searchIcon" class="searchIcon" id="searchIcon" v-model="selectedText" @input="onInput">
            <span class='del' id='del' ref="del" @click='del' style="display:none;"></span>
            <span class='searchText' @click='searchBtn'>搜索</span>
        </div>
        <div v-show="!visible && !emptyVisible">
            <div v-for="(item, index) in searchStationLists" :key="index" :class="[item.poitype == 1 ? 'addrBusImg' : 'addrSubwayImg', 'addr']" @click="errorBusNearRoute(item.id,item.name,item.poitype)">
                {{item.name}}
                <div class="border" style="width:3.3rem;left:-0.3rem;"></div>
            </div>
        </div>    

        <div v-show="visible && !emptyVisible">
            <div class="near">附近的站点</div>
            <div v-for="(item, index) in stationList" :key="index" :class="[item.tPOI.co_type == 100 ? 'addrBusImg' : 'addrSubwayImg', 'addr']" @click="errorNearRoute(item.tPOI.sUid,item.tPOI.sName,item.tPOI.tPoint.latitude,item.tPOI.tPoint.longitude,item.tPOI.co_type)">
                {{item.tPOI.sName}}
                <div class="border" style="width:3.3rem;left:-0.3rem;"></div>
            </div>   
        </div>   
        <div class="container-box" v-show="emptyVisible">
            <div class='addr-icon'></div>
            <div class='not-find'>没有查询到该地点</div>
            <div class='explore-other-place'>试试探索其他地方</div>
            <div class="add-poi" @click='addStationBtn'>新增公交站</div>
        </div>
    </div>
</template>
<script>
/* 车站错误 搜索 */
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
            timer: null
        }
    },
    mounted: function () {
        var self = this;
        if (query.isiOS) {
            self.$refs.searchIcon.style.top = "-0.02rem"
        }
        // window.mqq.invoke('ugc', 'setNavBarTitle', {title: '公交站报错'}, function (result) { 
        // })
        // window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        // })
        // nativeGetNavBarBackClick(function(data){
        //     history.go(-1)
        //     window.mqq.invoke('ugc', 'setNavBarVisible', {visible: true}, function (result) {})
        // })
        nativeGetNavBarBackClick(function(data){
            self.$router.push({path:'/'});
            //history.go(-1)
        })
        nativeSetNavBarVisible(false)
        nativeGetPosition(function(lat,lon){
            if (!lat && !lon) {
                nativeShowToast('定位失败，请确认定位功能是否开启')
                return
            }
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
                    } else {
                        if(!navigator.onLine){
                            nativeShowToast('网络异常')
                        }else{
                            nativeShowToast('加载错误')
                        }
                        
                    }
                });
            })
        })
        if (self.$route.name == "errorBusNearRouteFeedback") {
            mapDataReport("ugcreport_busstoperror")
        } else {
            mapDataReport("homepage_report_busstoperror")
        }
    },
    methods: {
        errorNearRoute(v,name,lat,lon,type){
            this.$router.push({path:'/error-bus-index',query:{id:v,name:name,lat:lat,lon:lon,type}});
            nativeSetNavBarVisible()
        },
        back(){
            //history.go(-1)
            this.$router.push({path:'/'});
            nativeSetNavBarVisible()
        },
        searchText(){
            var a = document.getElementById("searchIcon").value;
        },
        errorBusNearRoute(v,name,type){
            nativeSetNavBarVisible()
            this.selectedText = name
            this.$router.push({path:'/error-bus-index',query:{id:v,name:name,type}});
        },
        onInput() {
            if(!navigator.onLine){
                nativeShowToast('网络异常')
                //return
            }
            var self = this
            if (self.timer) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            self.timer = setTimeout(function () {
                if(self.selectedText == ''){
                    self.$refs.del.style.display = "none"
                    // self.visible = true
                    // self.emptyVisible = false
                }else{
                    self.$refs.del.style.display = "block"
                    // self.visible = false
                    // self.emptyVisible = false
                }
                let wd = self.selectedText
                let px = self.lon
                let py = self.lat
                let imei = self.deviceInfoAll.imei
                let device = self.deviceInfoAll.platform
                let app_ver = self.deviceInfoAll.appVersion
                var url = searchUrl+'/mobilemap?mmtype=busquery&wd=' + wd +'&py=' + py + '&px=' + px + '&rn=10&rp=0&imei=' + imei + '&device=' + device + '&app_ver=' + app_ver + '&type=2'
                jsonp(url, {param:'cb', timeout: 1000}, function(err, data) {
                    if (data) {
                        self.searchStationLists = data.list || []
                        if(self.searchStationLists.length == 0){
                            // self.emptyVisible = true
                            if (self.selectedText == '') {
                                self.visible = true
                                self.emptyVisible = false
                            } else {
                                self.visible = false
                                self.emptyVisible = true
                            }
                        } else {
                            if (self.selectedText == '') {
                                self.visible = true
                                self.emptyVisible = false
                            } else {
                                self.visible = false
                                self.emptyVisible = false
                            }
                        }
                    }else{
                        if (self.selectedText == '') {
                            self.visible = true
                            self.emptyVisible = false
                        } else {
                            self.visible = false
                            self.emptyVisible = true
                        }
                    }
                });
            }, 300)
        },
        addStationBtn(){
            this.$router.push({path:'/add-station'})
        },
        searchBtn(){
            if(!navigator.onLine){
                nativeShowToast('网络异常')
                return
            }
            if(this.selectedText == ''){
                nativeShowToast('请输入搜索内容')
            }
        },
        del(){
            this.selectedText = ''
            this.$refs.del.style.display = "none"
            this.visible = true
            this.emptyVisible = false
        }
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
    background-repeat: no-repeat;
    background-position:0 0.14rem;
    padding-left:0.3rem;
    padding-top:4px;
    background-size:0.26rem 0.26rem;
}
.addrBusImg{
    background-image: url('../commons/img/ic_bus.png');
}
.addrSubwayImg{
    background-image: url('../commons/img/ic_subway.png');
}
.arrow {
    position: absolute;
    left: 0;
    top: 0.06rem;
    width: 0.3rem;
    height: 0.3rem;
    background-size: 100% 100%;
    display:inline-block;
    background-image: url('../commons/img/search_back.png');
    background-repeat: no-repeat;
}
.search{
    height:0.42rem;
    line-height:0.42rem;
    background: #EFEFEF; 
    border-radius: 0.07rem;
    padding-left:0.3rem;
    padding-right: 0.7rem;
    margin-bottom:0.1rem;
    position:relative;
    vertical-align:middle;
}
.searchIcon{
    position: relative;
    background:none;
    font-size: 0.16rem;
    color: #000;
    width:96%;
    padding-top: 0.1rem;
    -webkit-appearance: none;
    -webkit-tap-highlight-color:rgba(0,0,0,0);
    /* height: 0.42rem;
    line-height: 0.42rem;
    vertical-align: middle; */
}
.searchText{
    position: absolute;
    right: 0.14rem;
    top: 0;
    font-size: 0.16rem;
    color: #427CFF;
}
.del{
    position:absolute;
    right: 0.5rem;
    top: 0.05rem;
    margin:0.1rem;
    font-size: 0.16rem;
    color: #333;
    display:none; 
    width: 0.16rem;
    height: 0.16rem;
    background-size: 100% 100%;
    display:inline-block;
    background-image: url('../commons/img/ic_title_close.png');
    background-repeat: no-repeat;
}
/* 公共的部分 */
.container-box {
    position: fixed;
    left: 0;
    top: .8rem;
    left: 0;
    right: 0;
    width: 100%;
    height: calc(100% - .8rem);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    border: 1px solid #427CFF;
    border-radius: 0.3rem;
    color:#427CFF;
    margin-top:0.4rem;
}
</style>
