<template>
     <div class="container-wrap"><!--@click='positionClick()' -->
        <div class="container">
            <div>
                <div class="title">{{titleName}}</div><div v-show='required'  class="xing">*</div><div class="select-location" @click='positionClick()'>{{positionDes}}</div>
            </div>    
            <!--<img class="place-reselect" src="../../commons/img/ic_map.png">-->
            <div style="width:100%;" :style='{display: display}'>
                <input v-if="enableFlag" type="text" class="place-content" v-model='positionName' style="font-size:0.14rem;display:inline-block;">
                <div class="place-content" style="font-size:0.14rem;display:inline-block;" v-else>{{positionName}}</div>
            </div>
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
/* 位置 选点 */
import mixin from '@/config/mixin'
export default {
    name: 'position',
    mixins: [mixin],
    props: {
        posi: {
            default: ''
        },
        titleName: {
            default: '道路名称'
        },
        required: {
            default: true
        },
        posTextVisible:{
            default: false
        },
        posiAddrInfo:{
            default: ''
        }
    },
    data () {
        return {
            positionName: '',
            position: {},
            display: 'none',
            positionDes: "点此选择位置",
            timer: null,
            enableFlag: true
        }
    },
    mounted(){ 
        if (localStorage.getItem('positionName')) {
            this.positionName = localStorage.getItem('positionName')
            this.display = 'inline-block'
            this.positionDes = '重新选择位置'
        }
        // if (this.posTextVisible) {
        //     this.display = 'inline-block'
        //     this.positionDes = '重新选择位置'
        //     this.positionName = 1111
        // }
    },
    methods: {
        positionClick(v){
            var self = this
            if (self.timer) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            self.timer = setTimeout(function () {
                window.mqq.invoke('ugc', 'getPlace', {}, function (result) {
                    self.position = JSON.parse(result.poi)
                    if (result && result.placeName) {
                        self.positionName = result.placeName
                        self.display = 'inline-block'
                        //console.log(self.positionName , "self.positionName")
                        if(self.positionName !== ''){
                            // console.log('位置为空')
                            self.positionDes = '重新选择位置'
                        }else{
                            self.positionDes = '点此选择位置'
                        }
                    }
                    self.$emit('positionChange', self.position)
                })
            }, 300)
        }
    },
    watch: {
        posi: function () {
            this.position = this.posi
            if (this.position !== '') {
                this.display = 'inline-block'
            }
        },
        posTextVisible(newVal, oldVal){
            if (newVal) {
                this.display = 'inline-block'
                this.positionDes = '重新选择位置'
                this.positionName = this.posiAddrInfo
            }
        },
        positionName:function(newVal, oldVal) {
            if (newVal.indexOf("正在获取数据") == -1) {
                this.enableFlag = true
            } else {
                this.enableFlag = false
            }
            this.$emit('positionNameChange', newVal)
        },
        
    }
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
    line-height:0.2rem;
}
.select-location{
    font-size: 0.14rem;
    color: #427CFF;
    margin-left:0.1rem;
    display:inline-block;
    margin-bottom:0.05rem;
    padding:0.1rem 0.25rem 0.1rem 0.05rem;
    /* border:1px solid red;   */
}
#mapWrap {
    margin: 10px 0;
    width: 100%;
    height: 30px;
}
</style>
