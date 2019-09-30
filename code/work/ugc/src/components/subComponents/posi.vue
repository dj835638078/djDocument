<template>
     <div class="container-wrap" >
        <div class="container">
            <div @click='positionClick()'>
                <div class="title">{{titleName}}</div><div class="xing">*</div><div class="select-location">点此选择位置</div>
            </div>    
            <div style="width:100%;">
                <input type="text" class="place-content" v-model='pos' :style='{display: display}'>
            </div>
        </div>
        <div class="border"></div>
        
    </div>
</template>
<script>
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
        }
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
        positionClick(v){
            var self = this
            window.mqq.invoke('ugc', 'getPlace', {fileurl:self.$route.query.fileurl}, function (result) {
                self.$emit('posiChange', result)
                if (result && result.placeName) {
                    self.pos = result.placeName
                    self.display = 'inline-block'
                    if(self.pos !== ''){
                        console.log('位置为空')
                        document.querySelector('.select-location').innerHTML = '重新选择位置'
                    }else{
                        document.querySelector('.select-location').innerHTML = '点此选择位置'
                    }
                }
            })
        }
    },
    watch: {
        pos:function(val) {
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
}
#mapWrap {
    margin: 10px 0;
    width: 100%;
    height: 30px;
}
</style>
