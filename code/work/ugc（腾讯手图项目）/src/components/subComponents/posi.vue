<template>
     <div class="container-wrap" >
        <div class="container">
            <div>
                <div class="title">{{titleName}}</div><div class="xing">*</div><div class="select-location" @click='positionClick()'>{{positionDes}}</div>
            </div>    
            <div style="width:100%;">
                <input type="text" class="place-content" v-model='pos' style="font-size:0.14rem;" :style='{display: display}'>
            </div>
        </div>
        <div class="border"></div>
        
    </div>
</template>
<script>
/* 位置 驾车，步行，骑行 */
export default {
    name: 'position',
    props: {
        titleName: {
            default: '道路名称'
        }
    },
    data () {
        return {
            display: 'none',
            pos:'',
            positionDes: "点此选择位置",
            timer: null
        }
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
        positionClick(v){
            var self = this
            if (self.timer) {
                clearTimeout(self.timer);
                self.timer = null;
            }
            self.timer = setTimeout(function () {
                window.mqq.invoke('ugc', 'getPlace', {fileurl:self.$route.query.fileurl}, function (result) {
                    self.$emit('posiChange', result)
                    if (result && result.placeName) {
                        self.pos = result.placeName
                        self.display = 'inline-block'
                        if(self.pos !== ''){
                            self.positionDes = '重新选择位置'
                        }else{
                            self.positionDes = '点此选择位置'
                        }
                    }
                })
            }, 300)
        }
    },
    watch: {
        pos:function(val) {
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
