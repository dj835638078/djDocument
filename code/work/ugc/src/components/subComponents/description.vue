<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">问题描述</div><div v-show='required' class="xing">*</div>
            <textarea  type="text" class='question-desc' v-model='description' :placeholder="plaholder" maxlength="300" cols="0"></textarea>
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
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
        }
    },
    data () {
        return {
            description: ''
        }
    },
    created: function () {
        console.log('description created')
    },
    mounted: function () {
        console.log('description mounted')
    },
    methods: {

    },
    watch: {
        description: function (val) {
            this.$emit('descriptionChange', val)
        },
        desc: function () {
            console.log('desc change', this.desc)
            this.description = this.desc
        }
    }
}
</script>
<style scoped>
.question-desc {
    margin-top: 0.1rem;
    background: #F9F9F9;
    border: 0 solid #CCCCCC;
    border-radius: 0.02rem;
    width: 93%;
    height: 0.15rem;
    /*font-size:0.13rem;*/
    border:1px solid #e5e5e5;
    resize:none; 
    padding:0.1rem;
    margin-right:0.2rem;
    line-height:0.16rem;
}
</style>
