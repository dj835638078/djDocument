<template>
    <div>
        <div v-if="networkFlag">
            <div v-show="!show">
                <div class="container">
                    <div >
                        <div class='feedback-title'>{{detailList.title}}</div>
                        <div class="desc"><span class="desc-title">描述</span><span  class="desc-content">{{changeDes(detailList.type,detailList.title,detailList.desc,detailList.name)}}</span></div>
                        <div class="time"><span>时间</span>{{detailList.time}}</div>
                        <div class="phone"><span>电话</span>{{detailList.phone}}</div> 
                    </div>
                </div>
                <div class="container position-router" v-show="!show">
                    <div class="content">
                        <ul>
                            <li style="" class="finish">
                                <div class="line specialLine"></div>
                                <div id="finished"></div>
                                <div class="detail"> 
                                    <div class="finished">处理完成</div>
                                    <!-- <span class="finish-con">感谢亲的反馈，通过您提供的内容，我们无法核实到相关内容。请补充截图或详细信息</span> -->
                                    
                                    <!-- <span>2019年1月14日 10：38</span> -->
                                </div>    
                            </li>
                            <li v-for='(item, index) in history' :key="index">
                                <div class="line"></div>
                                <a class="point" :class="{pointNone: index == 0}"></a>
                                <div class="wait">
                                    {{item.msg}}</br><span>{{item.time}}</span>
                                    <!-- <div class="btn" :style="{display:(item.status == 203 ?'block':'none')}" >
                                        <button @click='addFeebackBtn' class="disable-btn">补充描述，图片信息</button>
                                    </div>  -->
                                </div>    
                                <div class="btn" v-if="index == 0 && item.status == 203">
                                    <button @click='addFeebackBtn' class="disable-btn">补充描述、图片信息</button>
                                </div> 
                            </li> 
                            <li>
                                <!-- <div class="line"></div> -->
                                <a class="point"></a>
                                <div class="receive">
                                    已接收到您的反馈，将尽快处理</br><span>{{ detailList.time }}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <loading :loadingShow="show"/>
        </div>
        <noNetwork v-else/>
    </div>
</template>
<script>
/* 反馈详情 */
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
import loading from '../subComponents/loading'
import noNetwork from '../subComponents/noNetwork'
export default {
    name: 'myFeedbackDetail',
    mixins: [mixin],
    data (){
        return{
            id:'',
            detailList:{},
            history:[],
            time:'',
            id:'',
            disable:false,
            show:true,
            networkFlag:true,
            requireDesc:"",
            requirePhoto:"",
            requirePhone:""
        }
    },
    components: {
        loading,
        noNetwork
    },
    mounted:function(){
        var  self = this
        if (navigator.onLine) {
            self.networkFlag = true
            nativeSetNavBarTitle('反馈详情')
        } else {
            self.networkFlag = false
            return
        }
        this.pageChange()
        this.getData()
        
    },
    beforeRouteLeave(to, from, next) {
        if(!navigator.onLine){
            nativeSetNavBarTitle('我的反馈')
        }
        next()
    },
    methods:{
        pageChange(){
            let self = this
            nativeGetNavBarBackClick(function(data){
                if (!self.show) {
                    history.go(-1)
                    // history.back(-1)
                } else {
                    return
                }
            })
        },
        getData(){
            let self = this
            if(!navigator.onLine){
                self.networkFlag = false
                return
            }
            mapGetUserInfo(function(data){
            var user_id,nick_name,reqid,ticket_id
            var param = {}
            user_id = data.userId
            nick_name = data.nick
            ticket_id = self.$route.query.id
            var url = baseUrl+'?qt=/api/ticket/info'
            self.pageChange()
            //获取reqid
            getReqId.getReqId(function(reqid){
                if(reqid){
                    function sendReq (url, param) {
                    param = {
                        user_id,
                        reqid,
                        ticket_id,
                    }
                    var s=''  //拼接所有字段的和
                    for(var key in objKeySort(param)){
                        s += objKeySort(param)[key];
                    }
                    param.sign = ''
                    param.sign = md5(s+'sosomap')
                    var url = baseUrl+'?qt=/api/ticket/info&user_id='+user_id+'&ticket_id='+self.$route.query.id+'&seq_id='+ reqid +'&sign=' +param.sign;
                    self.$http.get(url).then(function (res) {
                        self.show =  false
                        // this.pageChange()
                        let historyData = []
                        self.detailList = res.data.data
                        if (res.data.data.history && res.data.data.history.length) {
                            historyData = res.data.data.history
                            self.history = res.data.data.history.reverse()
                        }
                        if (self.detailList.status == 0) {
                            document.querySelector('.finished').innerHTML = '等待处理'   
                        } else if (self.detailList.status == 100) {
                            document.querySelector('.finished').innerHTML = '处理中'   
                        } else if (self.detailList.status == 101) {
                            document.querySelector('.finished').innerHTML = '处理中'   
                        } else if (self.detailList.status == 200) {
                            document.querySelector('.finished').innerHTML = '已处理'
                        } else if (self.detailList.status == 201) {
                            document.querySelector('.finished').innerHTML = '已处理'
                        } else if (self.detailList.status == 202) {
                            document.querySelector('.finished').innerHTML = '已处理'
                        }else if (self.detailList.status == 300) {
                            document.querySelector('.finished').innerHTML = '已上线'
                        }else if(self.detailList.status == 203){
                            document.querySelector('.finished').innerHTML = '已处理'
                            // document.querySelector('.disable-btn').style.display = 'block'
                            // document.querySelector('.finish-con').innerHTML = '感谢亲的反馈，通过您提供的内容，我们无法核实到相关内容。请补充截图或详细信息 '
                            document.querySelector('.finished').background = 'none'
                            // document.querySelector('.finish').style.height = '1.5rem'
                            if (historyData && historyData.length) {
                                for (var i = 0; i < historyData.length; i++) {
                                    if (historyData[i].status == 203) {
                                        self.requireDesc = historyData[i].option.require_desc ? "1" : "0";
                                        self.requirePhoto = historyData[i].option.require_photo ? "1" : "0";
                                        self.requirePhone = historyData[i].option.require_phone ? "1" : "0";
                                    }
                                }
                            }
                        }
                        self.detailList.time = self.getMyDate(parseInt(self.detailList.time*1000))
                        for (let i =0 ; i < self.history.length; i++) {
                            self.history[i].time = self.getMyDate(parseInt(self.history[i].time*1000))
                        }
                        self.id = self.detailList.id
                        self.reqId = reqid;
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
                    // reqId = ""
                }
            })
        })
        },
        addFeebackBtn(){
            this.$router.push({
                path:'/add-feedback-detail',
                query: {
                    id: this.$route.query.id,
                    requireDesc: this.requireDesc,
                    requirePhoto: this.requirePhoto,
                    requirePhone: this.requirePhone
                }
            });
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
            this.addZero(oMin) +':'+this.addZero(oSen);
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
/* .container-wrap{
    position: absolute;
    width: 100%;
    height: calc(100% - 0.06rem);
    background:#ffffff;
} */
.feedback-title{
    font-size: 0.2rem;
    color: #333333;
    margin-bottom:0.08rem;
}
.btn{
    display: flex;
    position: relative;
    top: -.2rem;
    justify-content: center;
}
.disable-btn {
    /* display: none;
    margin-bottom: -0.1rem;
    margin-top: 0.2rem; */
}
.map-usage{
    font-size: 0.2rem;
    color: #333333;
    letter-spacing: -0.24px;
    margin-bottom:0.08rem;
}
.desc-title{
    width:0.4rem;
    display:inline-block;
    color:#999999;
}
.desc-content{
    /*  word-break:break-all; */
   word-wrap:break-word;
    line-break:strict;  
} 
.desc,.time,.phone{
    font-size: 0.13rem;
    color: #151515;
    letter-spacing: 0;
    line-height: 0.18rem;
    margin-bottom:0.08rem;
    /* word-break:break-all; */
    word-wrap:break-word; 
    white-space:normal;
}
.time span,
.phone span{
    width:0.4rem;
    color:#999999;
    display:inline-block;
}
.position-router{
    border-top: 0.06rem solid #f6f6f6;
}
.btn button{
    border: 1px solid #427CFF;
    border-radius: 0.3rem;
    background:#ffffff;
    width: 3.15rem;
    height: 0.32rem;
    line-height: 0.32rem;
    text-align: center;
    font-size: 0.14rem;
    color: #427CFF;
    letter-spacing: 0px;
    /* margin:0.08rem 0; */
}
ul li{
    list-style-type:none;
}
/* .content ul{
    border-left:0.01rem dotted #cccccc;
    height:1.55rem; 
} */
.content ul li{
    font-size: 0.16rem;
    color: #999999;
    position:relative;
}
.line{
    height: calc(100% - 0.08rem);
    border-left: 0.01rem dashed #ccc;
    position: absolute;
    left: -0.018rem;
    top: 0.08rem;
}
.specialLine{
    height: 100%;
    top: -0.02rem;
}
.point{
    width:0.08rem;
    height:0.08rem;
    border-radius:0.08rem;
    /*background:red;*/
    background: #999999;
    display:inline-block;
    margin-left:-0.055rem;
    margin-right:0.12rem;
    margin-bottom:0.1rem;
}
.pointNone{
    background:none;
}
.content ul li span{
    font-size: 0.13rem;
    color: #999999;
    letter-spacing: 0;
    /*margin-left:-23px;
    margin-top:8px;*/
}
.content ul li:nth-of-type(1){
    font-size: 0.16rem;
    color: #333333;
}
.finish span{
    font-size: 0.13rem;
    color: #333333;
    width:3.15rem;
    display:inline-block;
}
#finished{
    width:0.16rem;
    height:0.16rem;
    border-radius:0.16rem;
    background-size:100% 100%;
    background-image: url('../../commons/img/report_ic_solved_normal.png');
    display:inline-block;
    position:relative;
    left:-0.09rem;
    right:0.12rem;
    bottom:0.04rem;

}
.finished{
    margin-bottom:-0.1rem;
}
.detail{
    position:relative;
    top:-0.27rem;
    left:0.12rem;
}
.wait,
.receive{
    font-size: 0.16rem;
    color: #999999;
    position:relative;
    top:-0.3rem;
    left:0.12rem;
}
.detail .finish-con{
    font-size: 0.13rem;
    color: #333333;
}
</style>