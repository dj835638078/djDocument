<template>
    <div class="container-wrap">
        <div class="bus-line" v-show="!emptyVisible"><!--  -->
                <!-- <div class="title">选择线路</div><div class="xing">*</div> -->
                <div  v-for="item in list" @click='busLineClick(item.line1.name)' class="busLine">
                    <div v-if="item.line1 && item.line1.name && item.line1.from &&  item.line1.to">
                        {{item.line1.name}}({{item.line1.from}}-{{item.line1.to}})
                        <div class="border" style="left: 0"></div>
                    </div>    
                    <div v-if="item.line2 && item.line2.name && item.line2.from && item.line2.to">
                        {{item.line2.name}}({{item.line2.from}}-{{item.line2.to}})
                        <div class="border" style="left: 0"></div> 
                    </div>    
                </div>
        </div>
        <div v-if="emptyVisible">
            <div class="container-empty-wrap">
                <div class="container-empty">
                    <div class='addr-icon'></div>
                    <div class='not-find'>没有查询到该地点</div>
                    <div class='explore-other-place'>试试探索其他地方</div>
                    <div class="add-poi" @click='addLineBtn'>新增公交站</div>
                </div>    
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
    name: 'busLine',
    mixins: [mixin],
    props: {
        titleName: {
            default: '选择路线'
        },
        placeholder: {
            default: '请选择路线'
        }
    },
    data: function () {
        return {
            busLine: '',
            id:'',
            list: [],
            deviceInfo: {},
            deviceInfoAll:{},
            emptyVisible:false
        }
    },
    mounted:function(){
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '站点报错'}, function (result) { 
        })
        var  self = this
        nativeDeviceInfo(function(data){
            var appVersion = ''
            var imei = ''
            var platform = ''
            self.appVersion = data.appVersion
            self.imei = data.imei
            self.platform = data.platform
            console.log(self.$route.query.id,'看下能否取到id拼接')
            let url = stopidUrl+'/rtbus?qt=bus_stop_line_tag&stopUid='+self.$route.query.id+'&isOnlyRealtimeLine=0&isNeedLineGroup=1&imei='+self.imei+'&osVersion='+self.platform+'&softVersion=8.7.8&strNettp=61.135.172.68&strSessionId=&strPf=&strMobver=&strUserNetType=WiFi&uAccIp='
            
            jsonp(url, {param:'cb', timeout: 1000}, function(err, data) {
                if (data && data.stopTag && data.stopTag.linePairs) {
                    console.log(data, '选择线路')
                    self.list = data.stopTag.linePairs || []
                    if(self.list.length == 0){
                        self.emptyVisible = true
                    } else {
                        self.emptyVisible = false
                    }
                } else {
                    self.emptyVisible = true
                }
            });
        })
    },
    methods: {
        busLineClick: function (lineNames) {
            // lineNames = this.busLine
            console.log('hello world',lineNames)
            this.$emit('lineSelect',lineNames)

            //this.$router.push({path:'/error-bus-station',query:{names:names,id:this.$route.query.id}});
        },
        addLineBtn(){
            this.$router.push({path:'/add-station'})
        }
    }
}
</script>
<style scoped>
.bus-line {
    font-size: 0.13rem;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.busLine{
    /* height:0.4rem; */
    line-height: 0.4rem;
    font-size: 0.16rem;
    color: #333;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    width:3.1rem;
    border-bottom:1px solid #f6f6f6;
}
.bus-line{
    padding-left:0.1rem;
}

/* 公共的部分 */
.container-empty-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    top:2.35rem;
    /* top:5rem; */
}
.container-empty {
    position: absolute;
    left: calc(50% - 0.2rem);
    /* top: 300%; */
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
}
.addr-icon{
    display: inline-block;
    width:0.85rem;
    height:0.85rem;
    background-size:100% 100%;
    background: url('../../commons/img/tent.png');
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
