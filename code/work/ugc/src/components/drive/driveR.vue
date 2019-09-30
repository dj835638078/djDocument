<template>
    <div>
        <div class="container" v-for="item in list">
            <div class='navigation-border'>
                <div  class="title"><p style="font-size:0.13rem;color:#888888">{{endTimes}}</p></div>
                <div class="contentPlace">
                    <div class="contentPlaceC">
                        <div class="contentPlaceC1">{{item.startName}}</div>
                        <div class="contentPlaceC2">{{item.endName}}</div>
                    </div>
                    
                    <div class="contentPlaceError" @click="errorBtn()">报错</div>
                </div> 
            </div>    
        </div>     
        <!-- <div class="container-navigation">
            <div  class="title"><p style="font-size:0.13rem;color:#888888">2019-089-0</p></div>
            <div class="contentPlace">
                <div class="contentPlaceC">
                    <div class="contentPlaceC1">腾讯总部</div>
                    <div class="contentPlaceC2">育新花园</div>
                </div>
                <div class="contentPlaceError" @click="errorBtn()">报错</div>
            </div> 
        </div>   
        <div style="border-bottom: 0.06rem solid #DDDDDD;"></div>    
        <div class="container-navigation">
            <div  class="title"><p style="font-size:0.13rem;color:#888888">2019-089-0</p></div>
            <div class="contentPlace">
                <div class="contentPlaceC">
                    <div class="contentPlaceC1">腾讯总部的十字路口</div>
                    <div class="contentPlaceC2">育新花园龙泽小区</div>
                </div>
                <div class="contentPlaceError" @click="errorBtn()">报错</div>
            </div> 
        </div>              -->
    </div>
    
</template>
<script>
// import ic_start_blue from '../commons/img/ic_start_blue.png'
// import ic_end_red from '../commons/img/ic_end_red.png'
export default {
    name: 'driveR',
    data () {
        return {
            driveR: {},
            display: 'block',
            endTimes:'',
            endName:'',
            startName:'',
            fileurl:'',
            list:'',
        }
    },
    created: function () {
    },
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '驾车导航问题'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        var self = this
        nativeGetRouteInfoList(function(data){
            console.log(data,'看下返回数据')
            self.list = data 
            self.fileurl = data[0].raw.fileurl
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
            self.endTimes = getMyDate(parseInt(data[0].endTime*1000));
            })
    },
    methods: {
        errorBtn(fileurl){ //此处的index为标识fileurl
        console.log('hello')
            this.$router.push({path:'/drive-navigation',query:{fileurl:this.fileurl}});  //已经取到了
        },
    },
}
</script>
<style scoped>
.place-reselect {
    position: absolute;
    width: 0.22rem;
    height: 0.22rem;
    right: 0.2rem;
}
.place-content {
    display: none;
    color: #333333;
    font-size: .16rem;
    width: 100%;
}
.select-location{
    font-size: 0.14rem;
    color: #427CFF;
    margin-left:0.1rem;
    display:inline-block;
}
#mapWrap {
    margin: 10px 0;
    width: 100%;
    height: 30px;
}
.contentPlaceError {
    width: 0.6rem;
    height: 0.3rem;
    border: 1px solid #427CFF;
    border-radius: 30px;
}
.container-navigation{
    position: relative;
    padding: 0.15rem 0.2rem 0;
    background: #fff;
}
.navigation-border{
    border-bottom:1px solid #e5e5e5;;
}
</style>
