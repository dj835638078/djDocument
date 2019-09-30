<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">问题描述</div><div v-show='required' class="xing">*</div>
            <textarea @input="valChange" type="text" ref="description" :class="[heightFlag ? 'descHeight' : '','question-desc']" v-model='description' :placeholder="placeholderFlag" maxlength="300" cols="0" contenteditable="true"></textarea>
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
/* 描述 */
export default {
    name: 'description',
    props: {
        desc: {
            default: ''
        },
        plaholder: {
            default: ''
        },
        required: {
            default: false
        },
        heightFlag: {
            default: false
        }
    },
    data () {
        return {
            description: '',
            placeholderFlag: '',
        }
    },
    mounted: function () {
        this.placeholderFlag = this.required ? this.plaholder + '(5-300字)' : this.plaholder
    },
    methods: {
        valChange(){
            if (!this.description && this.heightFlag) {
                this.$refs.description.style.height = '0.3rem'
                this.$refs.description.style.lineHeight = '0.21rem'
            }   
        }
    },
    watch: {
        description: function (val,old) {
            this.$emit('descriptionChange', val)
        },
        desc: function () {
            this.description = this.desc
        }
    }
}
</script>
<style scoped>
.question-desc {
    margin-top: 0.1rem;
    background: #F9F9F9;
    border-radius: 0.02rem;
    width: 93%;
    height: 0.15rem;
    border:1px solid #e5e5e5;
    resize:none; 
    padding:0.1rem;
    margin-right:0.2rem;
    line-height:0.15rem;
    -webkit-user-select:auto;  /*解决ios不能输入的问题 */
    -webkit-appearance: none; /*解决ios输入框阴影的问题 */
    outline:none;
    font-size:0.13rem;
    /* color:#888888; */
}
.descHeight{
    height: 0.3rem;
    padding-top: 0.05rem;
    line-height:0.2rem;
}
::-webkit-scrollbar{
	/* width: 0.02rem;
	height: 0.02rem; */
    width: 0rem;
	height: 0rem;
	background-color: #F9F9F9;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track{
	box-shadow: inset 0 0 6px #F9F9F9;
	-webkit-box-shadow: inset 0 0 6px #F9F9F9;
	border-radius: 10px;
	background-color: #F5F5F5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb{
	border-radius: 10px;
	box-shadow: inset 0 0 6px #F9F9F9;
	-webkit-box-shadow: inset 0 0 6px #F9F9F9;
	background-color: #555;
}
</style>
