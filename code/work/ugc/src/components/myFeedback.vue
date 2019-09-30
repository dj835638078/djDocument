<template>
    <div class="containerBox" ref="containerBox" :style="{ height: boxHeight + 'px' }">
        <div v-if="networkFlag" class="scrollBox" ref="scrollBoxBig">
            <div v-if="!show && !showEmpty" class="scrollBox">
                <div class="container myfeedback-border bg"  :class="item.status !== 300 ? 'active': ''" v-for="(item, index) in list" :key="index" @click='feedbackDetail(item.id)'>
                <div>
                    <div class="map-usage"><span :style="{background:(item.unread?'red':'none')}" v-if="item.unread == true"></span>{{item.title}}</div><!--  v-if="item.unread == 'red'" -->
                    <div class="desc" id='de'><span class="desc-title">描述:</span><span class="desc-content">{{changeDes(item.type,item.title,item.desc,item.name)}}</span></div>
                    <div class="time" style="margin-bottom:0.2rem;"><span  class="desc-title">时间:</span>{{ item.time }}</div>
                    <div>
                        <div class="processBar">
                            <div id='line0'  class="bar bar-process line0" :class="item.status == 100 || item.status == 101 || item.status == 200|| item.status == 201|| item.status == 202|| item.status == 203|| item.status == 300 ? 'active': ''">
                                <div  class="c-step c-select point0"></div><!-- id="point0" -->
                            </div> 
                            <div class="text"><span class='poetryed be-process' :style="{color:(item.status == 0 || item.status == 100 || item.status == 101 || item.status == 200|| item.status == 201|| item.status == 202|| item.status == 203|| item.status == 300 ? '#333333':'#888888')}">待处理</span></div>
                        </div>
                        <div class="processBar">
                            <div id="line1" class="bar line1" :class="item.status == 200|| item.status == 201|| item.status == 202|| item.status == 203|| item.status == 300  ? 'active': ''">
                                <div class="c-step c-process point1" :class="item.status == 100 || item.status == 101 || item.status == 200|| item.status == 201|| item.status == 202|| item.status == 203|| item.status == 300 ? 'active': ''"></div><!-- id="point1" -->
                            </div>
                            <div class="text"><span class='poetryed processing' :style="{color:(item.status == 100 || item.status == 101 || item.status == 200|| item.status == 201|| item.status == 202|| item.status == 203|| item.status == 300 ?'#333333':'#888888')}">处理中</span></div>
                        </div>
                        <div class="processBar" style="width:15%;">
                            <div id="line2" class="bar" style="width: 0;">
                                <div id="point2" class="c-step c-finish ponit2" :class="item.status == 200|| item.status == 201|| item.status == 202|| item.status == 203|| item.status == 300 ? 'active': ''"></div>
                            </div>
                            <div class="text"><span class='poetry processed' :style="{color:(item.status == 200|| item.status == 201|| item.status == 202|| item.status == 203|| item.status == 300 ?'#333333':'#888888')}">已处理</span></div>
                        </div>
                    </div>   
                        <div style="clear: both;"></div>
                    </div>
                </div>
                <div v-if="list && list.length > 5" style="text-align:center;color:#888;font-size:0.13rem;line-height:0.5rem;">没有更多结果了</div>
            </div>
            <div class="container-empty-wrap" v-if="showEmpty">
                <div class='addr-icon'></div>
                <div class='not-find'>您还没有反馈过问题</div>
                <div class='explore-other-place'>您的反馈也许会帮助到他人哦</div> 
            </div>
            <loading :loadingShow="show"/>
        </div>
        <noNetwork v-else/> 
    </div>
</template>
<script>
/* 我的反馈 */
import line_blue from '../commons/img/line_blue.png'
import line_gray from '../commons/img/line_gray.png'
import report_ic_processing_disable from '../commons/img/report_ic_processing_disable.png'
import report_ic_pending_normal from '../commons/img/report_ic_pending_normal.png'
//import report_ic_processing_disable from '../commons/img/report_ic_processing_disable.png'
import report_ic_processing_normal from '../commons/img/report_ic_processing_normal.png'
import report_ic_solved_disable from '../commons/img/report_ic_solved_disable.png'
import report_ic_solved_normal from '../commons/img/report_ic_solved_normal.png'
import go_online from '../commons/img/go_online.png'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
import loading from '../components/subComponents/loading'
import noNetwork from '../components/subComponents/noNetwork'
export default {
    name: 'myFeedback',
    mixins: [mixin],
    data () {
        return {
            tid:'',
            reqId: '',
            list:[],
            //content:'',
            time:'',
            show:true,
            user_id:'',
            nick_name:'',
            showEmpty: false,
            networkFlag:true,
            boxHeight: 700
        }
    },
    components: {
        loading,
        noNetwork
    },
    mounted: function () {
        mapDataReport("ugcreport_record")
        var self = this
        if (self.$route && self.$route.name == 'myFeedback2') {
            nativeGetNavBarBackClick(function(data) {
                nativePerformNavBarBackClick(function(data) {});
            });
            nativeSetNavBarTitle('上报')
            // window.mqq.invoke('ugc', 'getTabChange', function (result) {
            //     if (result && result.item == '0') {
            //         nativeGetNavBarBackClick(function(data) {
            //             nativePerformNavBarBackClick(function(data) {});
            //         });
            //     }
            // })
        } else {
            nativeSetNavBarTitle('我的反馈')
            nativeGetNavBarBackClick(function(data){
                history.go(-1)
                // history.back(-1)
            })
        }
        if (navigator.onLine) {
            self.networkFlag = true
        } else {
            self.networkFlag = false
            return
        }
        self.getData()
    },
    computed:{
    },
    methods:{
        getData() {
            var self = this
            if(!navigator.onLine){
                self.networkFlag = false
                return
            }
            mapGetUserInfo(function(data){
            var user_id,nick_name,reqid
            var param = {}
            user_id = data.userId
            nick_name = data.nick
            var url = baseUrl+'?qt=/api/ticket/list'
            //获取reqid
            getReqId.getReqId(function(reqid){
                if(reqid){
                    function sendReq (url, param) {
                        param = {
                            user_id,
                            reqid
                        }
                        var s=''  //拼接所有字段的和
                        for(var key in objKeySort(param)){
                            s += objKeySort(param)[key];
                        }
                        param.sign = ''
                        param.sign = md5(s+'sosomap')
                        var url = baseUrl+'?qt=/api/ticket/list&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
                        self.$http.get(url).then(function (res) {
                            self.show =  false
                            self.list = res.data.data.list
                            if (self.list.length == 0) {
                                self.showEmpty = true
                                return
                            }
                            self.reqId = reqid;
                            for (let i = 0; i < self.list.length; i++) {
                                self.list[i].time = self.getMyDate(parseInt(self.list[i].time*1000))
                            }
                            setTimeout(() => {
                                self.$nextTick(()=>{
                                    self.boxHeight = self.$refs.scrollBoxBig.offsetHeight
                                    window.scrollTo(0,0)
                                })
                            }, 0);
                        }).catch(function (error) {
                            self.show = false
                            if (navigator.onLine) {
                                nativeShowToast('加载错误')
                            } else {
                                nativeShowToast('网络错误')
                            }
                        })
                    }
                    sendReq (url, param)    
                }else{
                    self.showEmpty = true
                }
            })
        })
        },
        feedbackDetail(id){
            this.$router.push({path:'/my-feedback-detail',query:{id:id}});
        },
        getMyDate(str) {
            var oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ this.addZero(oMonth) +'-'+ this.addZero(oDay) +' '+ this.addZero(oHour) +':'+
            this.addZero(oMin) +':'+ this.addZero(oSen);
            return oTime;
        },
        //补零操作
        addZero(num){
            if(parseInt(num) < 10){
                num = '0'+num;
            }
            return num;
        }
    },
}
</script>
<style scoped>
.containerBox {  
    width: 100%;  
    height: 100%;  
    background: #fff;
    border-top: .06rem solid #ddd;
    overflow-y: scroll;  
    -webkit-overflow-scrolling: touch;  
    position: absolute;  
    left:0;  
    top:0;  
} 
.scrollBox{
    height:auto;
}
.bg{
    background-size:0.62rem 0.62rem;
    background-image: url('../commons/img/go_online.png'); 
    background-repeat: no-repeat;
    background-position:right top;
}
.bg.active{
    background-size:0.62rem 0.62rem;
    background-image: none; 
    background-repeat: no-repeat;
    background-position:right top;
}
.map-usage{
    margin-bottom:0.046rem;
}
.map-usage span{
    width:0.06rem;
    height:0.06rem;
    border-radius:0.06rem;
    background:red;
    display:inline-block;
    position:relative;
    top:-0.01rem;
}
.desc,.time{
    font-size: 0.13rem;
    color: #333333;
    letter-spacing: 0;
}
.desc{
    margin-bottom:0.046rem;
    /* word-break:keep-all;   */
    /* word-wrap:break-word;  */
    /* line-break:normal;  */
    /* white-space:normal; */
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}
.desc-title{
    width:0.4rem;
    display:inline-block;
}
.desc-content{
    /*  word-break:break-all; */
   word-wrap:break-word;
    line-break:strict;  
} 
.processBar{
    float: left;
    width: 42%;
}
.processBar .bar{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
}
/* 进度条的样式 */
.line0{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
    background-size:100% 100%;
    background-image: url('../commons/img/line_gray.png');  
}
.line0.active{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
    background-size:100% 100%;
    background-image: url('../commons/img/line_blue.png');  
}
.line1{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
    background-size:100% 100%;
    background-image: url('../commons/img/line_gray.png');  
}
.line1.active{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
    background-size:100% 100%;
    background-image: url('../commons/img/line_blue.png');  
}

.processBar .b-select{
    background: rgb(96, 72, 124);
}
.processBar .bar .c-step{
    position: absolute;
    border-radius: 50%;
    width: 0.16rem;
    height: 0.16rem;
    background-size:100% 100%;
    top: 50%;
    margin-top: -8px;
}
.point1{
    background-size:100% 100%;
    background-image: url('../commons/img/report_ic_processing_disable.png');
}
.point1.active{
    background-size:100% 100%;
    background-image: url('../commons/img/report_ic_processing_normal.png');
}
.ponit2{
    background-size:100% 100%;
    background-image: url('../commons/img/report_ic_solved_disable.png');
}
.ponit2.active{
    background-size:100% 100%;
    background-image: url('../commons/img/report_ic_solved_normal.png');
}
.processBar .bar .c-select{
    width: 0.16rem;
    height: 0.16rem;
    background-size:100% 100%;
    background-image: url('../commons/img/report_ic_pending_normal.png');

}
/* 字体的样式 */
.text span.p{
    font-size: 0.13rem;
    color: #888888;
    letter-spacing: 0;
}
.poetry{
    font-size: 0.13rem;
    letter-spacing: 0;
}
.myfeedback-border{
    border-bottom: 0.06rem solid #f6f6f6;
}
.text{
    margin-top:0.065rem;
}
/* 反馈无内容 */
.container-empty-wrap {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
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
    background: url('../commons/img/group.png');
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
</style>
