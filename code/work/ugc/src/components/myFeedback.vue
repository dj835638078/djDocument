<template>
    <div class="container-wrap">
        <div class="container position-router" v-for="(item, index) in list" @click='feedbackDetail(item.id)'>
            <div class="bg" :class="item.status !== 300 ? 'active': ''">
                <div class="map-usage"><span :style="{background:(item.unread?'red':'none')}" v-if="item.unread == 'red'"></span>{{item.title}}</div>
                <div class="desc" id='de'>描述：{{item.desc}}</div>
                <div class="time" style="margin-bottom:0.2rem;">时间: {{ item.time }}</div>
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
        <div v-show='show' style="background:grey;height:100%;width:100%;">
            <div class="mask"></div>
            <div class="container-loading">
                <div class="loadIcon"></div>
                <div class="loadTxt">正在加载</div>
            </div>
        </div>
    </div>
</template>
<script>
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
export default {
    name: 'myFeedback',
    mixins: [mixin],
    data () {
        return {
            tid:'',
            reqId: '',
            list:'',
            //content:'',
            time:'',
            show:true,
            user_id:'',
            nick_name:'',
        }
    },
    created:function(){
    },
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '我的反馈'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) {
        })
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        var  self = this
        
        mapGetUserInfo(function(data){
            var user_id,nick_name,reqid
            var param = {}
            user_id = data.userId
            nick_name = data.nick
            var url = baseUrls+'/list'
            //获取reqid
            getReqId.getReqId(function(reqid){
                if(reqid){
                    function sendReq (url, param) {
                        param = {
                            user_id,
                            reqid
                        }
                        var s=''  //拼接所有字段的和
                        for(var key in objKeySort.objKeySort(param)){
                            s += objKeySort.objKeySort(param)[key];
                        }
                        param.sign = ''
                        param.sign = md5(s+'sosomap')
                        var url = baseUrls+'/list&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
                        self.$http.get(url).then(function (res) {
                            self.show =  false
                            self.list = res.data.data.list
                            self.reqId = reqid;

                            function getMyDate(str) {
                                var oDate = new Date(str),
                                oYear = oDate.getFullYear(),
                                oMonth = oDate.getMonth()+1,
                                oDay = oDate.getDate(),
                                oHour = oDate.getHours(),
                                oMin = oDate.getMinutes(),
                                oSen = oDate.getSeconds(),
                                oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay) +' '+ addZero(oHour) +':'+
                                addZero(oMin) +':'+addZero(oSen);
                                return oTime;
                            }
                            //补零操作
                            function addZero(num){
                                if(parseInt(num) < 10){
                                    num = '0'+num;
                                }
                                return num;
                            }
                            for (let i = 0; i < self.list.length; i++) {
                                self.list[i].time = getMyDate(parseInt(self.list[i].time*1000))
                            }
                        }).catch(function (error) {
                        })
                    }
                    sendReq (url, param)    
                }else{
                }
            })
        })
    },
    computed:{
    },
    methods:{
        feedbackDetail(id){
            this.$router.push({path:'/my-feedback-detail',query:{id:id}});
        },
    },
}
</script>
<style scoped>
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
    /* margin-right:0.02rem; */
}
.desc,.time{
    font-size: 0.13rem;
    color: #333333;
    letter-spacing: 0;
}
.desc{
    margin-bottom:0.046rem;
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
    /*margin-left: 0.01rem;  */
    /* border-bottom:0.01rem dotted #cccccc; */
}
/* 进度条的样式 */
.line0{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
    /*margin-left: 0.01rem;  */
    /* border-bottom:0.01rem dotted red; */
    background-size:100% 100%;
    background-image: url('../commons/img/line_gray.png');  
}
.line0.active{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
    /*margin-left: 0.01rem;  */
    /* border-bottom:0.01rem dotted red; */
    background-size:100% 100%;
    background-image: url('../commons/img/line_blue.png');  
}
.line1{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
    /*margin-left: 0.01rem;  */
    /* border-bottom:0.01rem dotted red; */
    background-size:100% 100%;
    background-image: url('../commons/img/line_gray.png');  
}
.line1.active{
    height: 0.01rem;
    position: relative;
    width: 95%;
    margin-left:0.12rem;
    /*margin-left: 0.01rem;  */
    /* border-bottom:0.01rem dotted red; */
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
    height: 0.164rem;
    background-size:100% 100%;
    /* background-image: url('../commons/img/report_ic_processing_disable.png'); */
    /*left: 0.12rem;*/
    top: 50%;
    margin-top: -8px;
}
/* 进度条的icon */
/* .processBar .bar .c-process{
    background-size:100% 100%;
    background-image: url('../commons/img/report_ic_processing_normal.png');
} */

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
/* .processBar .bar .c-finish{
    background-size:100% 100%;
    background-image: url('../commons/img/report_ic_solved_disable.png');
} */
.processBar .bar .c-select{
    width: 0.16rem;
    height: 0.164rem;
    background-size:100% 100%;
    background-image: url('../commons/img/report_ic_pending_normal.png');

}
//字体的样式
.text span.p{
    font-size: 0.13rem;
    color: #888888;
    letter-spacing: 0;
}
.poetry{
    font-size: 0.13rem;
    /* color: #333333; */
    letter-spacing: 0;
}
.position-router{
    border-top: 0.06rem solid #f6f6f6;
}
.text{
    margin-top:0.065rem;
}

/* load的样式 */
.container-loading {
    z-index: 999;
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* background: #fff; */
}
.loadIcon {
    width: 0.84rem;
    height: 0.84rem;
    text-align: center;
    background: url('../commons/img/loading_gray.png') no-repeat center center;
    background-size: 0.28rem 0.28rem;
    vertical-align: middle;
    position: absolute;
    top: 0.32rem;
    left: 0.1rem;
    animation: mymove 0.5s infinite linear;
    -webkit-animation: mymove 0.5s infinite linear;
    -moz-animation: mymove 0.5s infinite linear;
    -o-animation: mymove 0.5s infinite linear;
}
@-webkit-keyframes mymove {
    from {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
    }
}
.loadTxt {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #999999;
    letter-spacing: 0;
    position: absolute;
    left: 0.67rem;
    top: 0.67rem;
}
.mask {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #999999;
    opacity: 0.4;
}
</style>
