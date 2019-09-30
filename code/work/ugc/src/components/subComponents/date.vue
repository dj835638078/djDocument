<template>
    <div class="container-wrap" style="height:0.52rem;vertical-align:middle;">
        <div class="container"  @click='dateClick()'>
            <!--<div class="title">{{titleName}}</div>
            <div style="width:100%;">
                <input type="text" class="place-content" v-model='datePicker' :style='{display: display}'>
            </div>-->
            <div class="title" style="display:inline-block;">{{titleName}}</div><input type="text" placeholder="请选择时间" class="time-content" v-model='date' @focus='blockKeyboard()'>
            <div class="arrow">></div>

           <!--  <div style="width:100%;">
                <input type="text" class="place-content" v-model='date' :style='{display: display}'>
            </div>
            <input type="text" class="place-content" v-if="!simple" v-model='date' :placeholder="plaholder" maxlength="200" @click='dateClick'> -->
            <!--<input type="text" class="place-content" v-else v-model='place2' :placeholder="plaholder" maxlength="200">-->
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
import mixin from '@/config/mixin'
/* 日历 */
export default {
    name: 'date',
    props: {
        pla: {
            default: ''
        },
        plaRequire: {
            default: true
        },
        titleName: {
            default: '请选择问题发生时间'
        },
        plaholder: {
            default: ''
        },
        simple: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            place: '',
            place2: '',
            date:'',
            display: 'block',
            timer: null
        }
    },
    mounted: function () {},
    methods: {
        dateClick () {
            var self = this
            if (self.timer) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            self.timer = setTimeout(function () {
                window.mqq.invoke('ugc', 'showDatePickDialog', {
                }, function (result) {
                    // console.log(result,'此处是日历的内容 获取毫秒,日历公共的组件')
                    if(result.onSure){
                        //self.date = result.onSure
                        self.date = getMyDate(parseInt(result.onSure))
                        self.display = 'inline-block'
                        //新增
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
                    }
                    // if (result && result.poiName) {
                    //     self.date = result.poiName
                    // }
                })
            }, 300)
        },
        blockKeyboard(){
            document.activeElement.blur();
        },
    },
    watch: {
        //看下此处得是否正确
        date: function () {
            this.$emit('dateChange', this.date)
        },
    }
}
</script>
<style scoped>
.place-content {
    font-size: 0.13rem;
    display: inline-block;
    vertical-align: middle;
    margin-left: 0.1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
.arrow {
    position: absolute;
    right: 0.2rem;
    top: 0.16rem;
    color: #888888;
}
.container{
    display: flex;
}
.title{
    flex: 0 0 1.5rem
}
.time-content{
    flex:1;
    display:inline-block;
    padding-left:0.12rem;
    padding-right: 0.15rem;
    /* position:absolute;
    top:0.19rem; */
    font-size:0.13rem;
    /* background:#fff; */
    outline:none;
   -webkit-tap-highlight-color:rgba(0,0,0,0);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
