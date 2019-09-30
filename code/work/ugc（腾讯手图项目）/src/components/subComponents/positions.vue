<template>
     <div class="container-wrap"><!--@click='positionClick()' -->
        <div class="container">
            <div>
                <div class="title">{{titleName}}</div><div class="xing">*</div><div class="select-location" @click='positionClick()'>{{positionDes}}</div>
            </div>    
            <!--<img class="place-reselect" src="../../commons/img/ic_map.png">-->
            <div style="width:100%;" :style='{display: display}'>
                <input type="text" class="place-content" v-model='addRoadPosi' style="font-size:0.14rem;display:inline-block;">
            </div>
        </div>
        <div class="border"></div>
        
    </div>
</template>
<script>
/* 位置 */
export default {
    name: 'position',
    props: {
        posi: {
            default: ''
        },
        titleName: {
            default: '道路名称'
        }
    },
    data () {
        return {
            position: {},
            display: 'none',
            addRoadPosi:"",
            addRoadObj:{},
            newPosi:'',
            newName:'',
            positionDes: "点此选择位置",
            timer: null,
            times:1
        }
    },
    methods: {
        positionClick(v){
            var self = this
            if (self.timer) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            self.timer = setTimeout(function () {
                window.mqq.invoke('ugc', 'getPlace', {
                    routeMode : true
                }, function (result) {
                    // console.log('positionClick这块是起点终点的标识', result)
                    // console.log(JSON.parse(result.startPoi).addr,'起点')
                    //self.addRoadPosi = JSON.parse(result.startPoi).addr
                    self.addRoadObj.startPoi = JSON.parse(result.startPoi)
                    self.addRoadObj.endPoi = JSON.parse(result.endPoi)
                    self.addRoadPosi = JSON.parse(result.startPoi).addr || JSON.parse(result.startPoi).name
                    self.newName = self.addRoadPosi
                    self.display = 'inline-block'
                    //新添加的 07-31
                    self.addRoadObj.newPosi = self.addRoadPosi
                    self.positionDes = '重新选择位置'
                    if(self.addRoadPosi !== ''){
                        //self.addRoadPosi = '地图上的点'
                    }else{
                        //if(self.addRoadPosi == ''){
                            self.addRoadPosi = '地图上的点'
                            self.addRoadObj.newPosi = self.addRoadPosi
                        //}
                    }
                    self.$emit('positionChange', v)
                    self.times++
                })
            }, 300)
        }
    },
    watch: {
        addRoadPosi: function () {
            this.newName = this.addRoadPosi
            this.$emit('positionChange', this.addRoadObj)
        },
        posi: function () {
            this.addRoadPosi = this.posi
            this.display = 'inline-block'
        },
        newName:function(val) {
            this.$emit('newNameChange', val)
        },
        times(){
            this.$emit('positionChange', this.addRoadObj)
        }
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
    padding:0.1rem 0.25rem 0.1rem 0.05rem;
}
#mapWrap {
    margin: 10px 0;
    width: 100%;
    height: 30px;
}
</style>
