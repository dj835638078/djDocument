<template>
    <div>
        <div class="">
            <div  v-for="(item, index) in list" :key="index" style="background:#fff;">
                <div class='navigation-border'>
                    <div  class="navigation-title"><p style="font-size:0.13rem;color:#888888">{{item.endTime}}</p></div>
                    <div class="contentPlace">
                        <div class="contentPlaceC">
                            <div class="contentPlaceC1">{{item.startName}}</div>
                            <div class="contentPlaceC2">{{item.endName}}</div>
                        </div>
                        <div class="contentPlaceError" @click="errorBtn(item.raw.mFileName)">报错</div>
                    </div> 
                </div>
                <div style="border-bottom: 0.06rem solid #DDDDDD;"></div>
            </div>    
        </div>    
    </div>
</template>
<script>
/* 骑行导航 渲染轨迹 */
import mixin from '@/config/mixin'
export default {
    name: 'bikeR',
    mixins: [mixin],
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
    beforeRouteLeave(to, from ,next) {
        localStorage.removeItem("rideRouteInfoListStorage")
        next()
    },
    mounted: function () {
        this.getData()
    },
    methods: {
        getData(){
            var self = this
            self.list = JSON.parse(localStorage.getItem("rideRouteInfoListStorage"))
            //self.fileurl = data[0].raw.mFileName
            for (let i = 0; i < self.list.length; i++) {
                self.list[i].raw.mFileName = self.list[i].raw.mFileName
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
            for (let i = 0; i < self.list.length; i++) {
                self.list[i].endTime = getMyDate(parseInt(self.list[i].endTime*1000))
            }
        },
        errorBtn(fileurl){ 
            mapDataReport("ugcreport_bike_trace")
            this.fileurl = fileurl
            this.$router.push({path:'/ride-navigation',query:{fileurl:this.fileurl}});  
        },
    },

}
</script>
<style scoped>
body{
    background:#ffffff!important;
}
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
    border-bottom:1px solid #e5e5e5;
    padding-left:0.2rem;
}
.navigation-title{
    height:0.4rem;
    line-height:0.4rem;
    border-bottom:1px solid #e5e5e5;
    margin-right:0.2rem;
}
.contentPlaceC1{
    width:2rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
.contentPlaceC2{
    width:2rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
</style>
