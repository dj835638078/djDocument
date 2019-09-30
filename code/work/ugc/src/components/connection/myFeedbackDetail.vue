<template>
    <div class="container-wrap">
        <div class="container">
            <div >
                <div class='feedback-title'>{{this.detailList.title}}</div>
                <div class="desc"><span>描述</span>{{this.detailList.desc}}</div>
                <div class="time"><span>时间</span>{{this.time}}</div>
                <div class="phone"><span>电话</span>{{this.detailList.phone}}</div> 
            </div>
        </div>
        <div class="container position-router">
            <div class="content">
                <ul>
                    <li style="" class="finish">
                        <div id="finished"></div>
                        <div class="detail"> 
                            <div class="finished">处理完成</div>
                            <span class="finish-con">感谢亲的反馈，通过您提供的内容，我们无法核实到相关内容。请补充截图或详细信息</span>
                            <div class="btn">
                                <button @click='addFeebackBtn' class="disable-btn">补充描述，图片信息</button>
                            </div> 
                            <!-- <span>2019年1月14日 10：38</span> -->
                        </div>    
                    </li>
                    <li v-for='item in history'>
                        <a class="point"></a>
                        <div class="wait">
                            {{item.msg}}</br><span>{{item.time}}</span>
                        </div>    
                    </li> 
                    <li>
                        <a class="point"></a>
                        <div class="receive">
                            已接收到您的反馈，将尽快处理</br><span>{{ this.time }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div> 
</template>
<script>
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
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
            disable:false
        }
    },
    mounted:function(){
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '反馈详情'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) {
        })
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        var  self = this
        mapGetUserInfo(function(data){
            console.log(self.$route.query.id,'这块取出来ticket_id')
            var user_id,nick_name,reqid,ticket_id
            var param = {}
            user_id = data.userId
            nick_name = data.nick
            ticket_id = self.$route.query.id
            var url = baseUrls+'/info'
            
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
                    for(var key in objKeySort.objKeySort(param)){
                        s += objKeySort.objKeySort(param)[key];
                    }
                    param.sign = ''
                    param.sign = md5(s+'sosomap')
                    var url = baseUrls+'/info&user_id='+user_id+'&ticket_id='+self.$route.query.id+'&seq_id='+ reqid +'&sign=' +param.sign;
                    self.$http.get(url).then(function (res) {
                        self.detailList = res.data.data
                        console.log(self.detailList,'title')
                        self.history = res.data.data.history

                        if (self.detailList.status == 0) {
                            document.querySelector('.finished').innerHTML = '等待处理'   
                        }

                        if (self.detailList.status == 100) {
                            document.querySelector('.finished').innerHTML = '处理中'   
                        }
                        if (self.detailList.status == 101) {
                            document.querySelector('.finished').innerHTML = '处理中'   
                        }
                        if (self.detailList.status == 200) {
                            document.querySelector('.finished').innerHTML = '已处理'
                        }
                        if (self.detailList.status == 201) {
                            document.querySelector('.finished').innerHTML = '已处理'
                        }
                        if (self.detailList.status == 202) {
                            document.querySelector('.finished').innerHTML = '已处理'
                        }
                        if (self.detailList.status == 300) {
                            document.querySelector('.finished').innerHTML = '已上线'
                        }

                        if(self.detailList.status == 203){
                            console.log('需要补充')
                            document.querySelector('.finished').innerHTML = '已处理'
                            document.querySelector('.disable-btn').style.display = 'block'
                            document.querySelector('.finish-con').innerHTML = '感谢亲的反馈，通过您提供的内容，我们无法核实到相关内容。请补充截图或详细信息 '
                            document.querySelector('.finished').background = 'none'
                            document.querySelector('.finish').style.height = '1.5rem'
                        }

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
                        self.time = getMyDate(parseInt(self.detailList.time*1000))
                        for (let i =0 ; i < self.history.length; i++) {
                            self.history[i].time = getMyDate(parseInt(self.history[i].time*1000))
                        }
                        self.id = self.detailList.id
                        self.reqId = reqid;
                    }).catch(function (error) {
                    })
                }
                sendReq (url, param)    
                }else{
                    // reqId = ""
                }
            })
        })
    },
    methods:{
        addFeebackBtn(){
            console.log(this.$route.query.id,'看下00')
            this.$router.push({path:'/add-feedback-detail',query:{id:this.$route.query.id}});
        }
    },
}
</script>

<style scoped>
.container-wrap{
    position: absolute;
    width: 100%;
    height: calc(100% - 0.06rem);
    background:#ffffff;
}
.feedback-title{
    font-size: 0.2rem;
    color: #333333;
}
.disable-btn {
    display: none;
}
.map-usage{
    font-size: 0.2rem;
    color: #333333;
    letter-spacing: -0.24px;
    margin-bottom:0.08rem;
}
.desc span,
.time span,
.phone span{
    width:0.303rem;
    display:inline-block;
    font-size: 0.13rem;
    color: #151515;
    letter-spacing: 0;
    line-height: 0.18rem;
}
.desc,.time,.phone{
    font-size: 0.13rem;
    color: #151515;
    letter-spacing: 0;
    line-height: 0.18rem;
    margin-bottom:0.08rem;
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
    margin:0.08rem 0;
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
.point{
    width:0.08rem;
    height:0.08rem;
    border-radius:0.08rem;
    /*background:red;*/
    background: #999999;
    display:inline-block;
    margin-left:-0.05rem;
    margin-right:0.12rem;
    margin-bottom:0.1rem;
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
    left:-0.08rem;
    right:0.12rem;
    bottom:0.04rem;

}
.finished{
    margin-bottom:0.08rem;
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
    
</style>