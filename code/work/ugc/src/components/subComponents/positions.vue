<template>
     <div class="container-wrap"><!--@click='positionClick()' -->
        <div class="container">
            <div @click='positionClick()'>
                <div class="title">{{titleName}}</div><div class="xing">*</div><div class="select-location">点此选择位置</div>
            </div>    
            <!--<img class="place-reselect" src="../../commons/img/ic_map.png">-->
            <div style="width:100%;margin-top:0.1rem;">
                <input type="text" class="place-content" v-model='addRoadPosi' :style='{display: display}' style="font-size:0.14rem;">
            </div>
        </div>
        <div class="border"></div>
        
    </div>
</template>
<script>
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
            display: 'block',
            addRoadPosi:"",
            addRoadObj:{},
            newPosi:'',
            newName:'',
        }
    },
    methods: {
        positionClick(v){
            var self = this
            window.mqq.invoke('ugc', 'getPlace', {
                routeMode : true
            }, function (result) {
                console.log('positionClick这块是起点终点的标识', result)  //这块值已经打印出来了
                console.log('positionClick1', JSON.parse(result.startPoi).addr)
                //self.addRoadPosi = JSON.parse(result.startPoi).addr
                self.addRoadObj.startPoi = JSON.parse(result.startPoi)
                self.addRoadObj.endPoi = JSON.parse(result.endPoi)
                self.addRoadPosi = JSON.parse(result.startPoi).addr
                self.newName = self.addRoadPosi

                //新添加的 07-31
                self.addRoadObj.newPosi = self.addRoadPosi
                //console.log(self.addRoadObj,'9-addRoadPosi')

                if(self.addRoadPosi !== ''){
                    console.log('位置为空')
                    document.querySelector('.select-location').innerHTML = '重新选择位置'
                }else{
                    document.querySelector('.select-location').innerHTML = '点此选择位置'
                    if(self.addRoadPosi == ''){
                        self.addRoadPosi = '地图上的点'
                    }
                }
            })
            this.$emit('positionChange', v)
        }
    },
    watch: {
        addRoadPosi: function () {
            this.$emit('positionChange', this.addRoadObj)
        },
        posi: function () {
            console.log('posi change-0', this.addRoadObj)
            this.addRoadPosi = this.posi
        },
        newName:function(val) {
            console.log(val)
            this.$emit('newNameChange', val)
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
</style>
