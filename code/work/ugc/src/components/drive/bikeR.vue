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
    </div>
</template>
<script>
export default {
    name: 'bikeR',
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
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '骑行导航问题'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        var self = this
        nativeGetBikeRouteInfoList(function(data){
            self.list = data 
            self.fileurl = data[0].raw.mFileName
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
        errorBtn(fileurl){ 
            this.$router.push({path:'/ride-navigation',query:{fileurl:this.fileurl}});  
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
.contentPlaceError {
    width: 0.6rem;
    height: 0.3rem;
    border: 1px solid #427CFF;
    border-radius: 30px;
}
.navigation-border{
    border-bottom:1px solid #e5e5e5;;
}
</style>
