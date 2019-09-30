<template>
     <div class="container-wrap"><!--@click='positionClick()' -->
        <div class="container">
            <div  @click='positionClick()'>
                <div class="title">{{titleName}}</div><div class="xing">*</div><div class="select-location">点此选择位置</div>
            </div>    
            <!--<img class="place-reselect" src="../../commons/img/ic_map.png">-->
            <div style="width:100%;margin-top:10px;">
                <input type="text" class="place-content" v-model='positionName' :style='{display: display}' style="font-size:0.14rem;">
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
            positionName: '',
            position: {},
            display: 'none',
        }
    },
    methods: {
        positionClick(v){
             //console.log('positionClick')
            var self = this
            window.mqq.invoke('ugc', 'getPlace', {}, function (result) {
                console.log(result, 'result')
                self.position = JSON.parse(result.poi)
                if (result && result.placeName) {
                    self.positionName = result.placeName
                    self.display = 'inline-block'
                    if(self.positionName !== ''){
                        console.log('位置为空')
                        document.querySelector('.select-location').innerHTML = '重新选择位置'
                    }else{
                        document.querySelector('.select-location').innerHTML = '点此选择位置'
                    }
                }
                self.$emit('positionChange', self.position)
            })
        }
    },
    watch: {
        posi: function () {
            this.position = this.posi
            if (this.position !== '') {
                this.display = 'inline-block'
            }
        },
        positionName:function(val) {
            console.log(val)
            this.$emit('positionNameChange', val)
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
    margin-bottom:0.05rem;
}
#mapWrap {
    margin: 10px 0;
    width: 100%;
    height: 30px;
}
</style>
