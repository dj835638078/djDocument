<template>
    <div class="container">
        <div class="search">
            <div class="arrow" @click="back"></div>
            <input type='text' ref="searchIcon" placeholder='请输入要纠错的公交线路名称' class="searchIcon" id="searchIcon" v-model="selectedText" @input="onInput">
            <span class='del' id='del' ref="del" @click='del' style="display:none;"></span>
            <span class='searchText' @click='searchBtn'>搜索</span>
        </div>
        <div style="style:background:#ffffff;" v-show="!emptyVisible">
            <div class="addr" v-for="(item, index) in stationList" :key="index" @click="errorNearRoute(item.name)">
                {{item.name}}
                <div class="border" style="width:3.3rem;left:-0.3rem;"></div>
            </div> 
        </div>
        <div class="container-empty-wrap" v-show="emptyVisible">
            <div class='addr-icon'></div>
            <div class='not-find'>没有查询到该路线</div>
            <div class='explore-other-place'>试试探索其他地方</div>
            <div class="add-poi" @click='addLineBtn'>新增公交线</div>
        </div>
    </div>
</template>
<script>
/* 附近公交线报错 搜索 */
import mixin from '@/config/mixin'
import md5 from '@/config/md5'
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
import jsonp from 'jsonp'
export default {
    name: 'errorBusNearLine',
    mixins: [mixin],
    data: function () {
        return {
            selectedText: '',
            stationList:[],
            list:'',
            lat: '',
            lon: '',
            deviceInfoAll: {},
            deviceInfo: {},
            emptyVisible:false,
            timer: null
        }
    },
    mounted: function () {
        var self = this;
        if (query.isiOS) {
            self.$refs.searchIcon.style.top = "-0.02rem"
        }
        if (self.$route.name == "errorBusNearLineFeedback") {
            mapDataReport("ugcreport_buserror")
        } else {
            mapDataReport("homepage_report_buserror")
        }
        nativeSetNavBarTitle('公交线路报错')
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
            nativeSetNavBarVisible()
        })
        nativeSetNavBarVisible(false)
        //无网情况下 有提示
        if (!navigator.onLine) {
            nativeShowToast('网络异常')
        }
    },
    methods: {
        errorNearRoute(name){
            nativeSetNavBarVisible()
            this.selectedText = name
            this.$router.push({path:'/error-bus-line',query:{name:name}});
        },
        back(){
            history.go(-1)
            nativeSetNavBarVisible()
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
                if (!self.selectedText) {
                    self.$refs.del.style.display = "none"
                    // self.emptyVisible = false
                }else{
                    self.$refs.del.style.display = "block"
                    // self.emptyVisible = true
                }
                let wd = self.selectedText
                let px = self.lon
                let py = self.lat
                let imei = self.deviceInfoAll.imei
                let device = self.deviceInfoAll.platform
                let app_ver = self.deviceInfoAll.appVersion
                var url = searchUrl+'/mobilemap?mmtype=busquery&wd=' + wd +'&py=' + py + '&px=' + px + '&rn=10&rp=0&imei=' + imei + '&device=' + device + '&app_ver=' + app_ver + '&type=1'
                jsonp(url, {param:'cb', timeout: 1000}, function(err, data) {
                    if (data) {
                        self.stationList = data.list || []
                        if(self.stationList.length == 0){
                            
                            if (!self.selectedText) {
                                self.emptyVisible = false
                            } else {
                                self.emptyVisible = true
                            }
                        } else {
                            self.emptyVisible = false
                        }
                    }else{
                        if (!self.selectedText) {
                            self.emptyVisible = false
                        }else{
                            self.emptyVisible = true
                        }
                    }
                });
            }, 300)
        },
        addLineBtn(){
            this.$router.push({path:'/add-line'})
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
            this.emptyVisible = false
            this.stationList = []
        }
    }
}
</script>
<style scoped>
body{
    background:#ffffff;
}
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
    width:2.85rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.arrow {
    position: absolute;
    left: 0;
    top: 0.062rem;
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
    position:relative;
    vertical-align:middle;
}
.searchIcon{
    position: relative;
    background: none; 
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
.searchText{
    position: absolute;
    right: 0.14rem;
    top: 0;
    font-size: 0.16rem;
    color: #427CFF;
}
/* 公共的部分 */
.container-empty-wrap {
    position: fixed;
    top: .8rem;
    bottom: 0;
    right: 0;
    left: 0;
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
