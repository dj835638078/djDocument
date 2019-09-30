<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">联系方式</div><div class="xing">*</div>
            <input type="tel" class="tel-num" v-model='mobilePhone' placeholder="请输入你的手机号" maxlength="11">
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
export default {
    name: 'contact',
    props: ['mobile'],
    data () {
        return {
            mobilePhone: ''
        }
    },
    created: function () {
        console.log('mobile phone created')
    },
    mounted: function () {
        console.log('mobile phone mounted')
    },
    watch: {
        mobilePhone: function (val) {
            this.$emit('mobileChange', val)
        },
        mobile: function () {
            console.log('mobile change', this.mobile)
            this.mobilePhone = this.mobile
        }
    }
}
</script>
<style scoped>
.tel-num {
    font-size: 0.13rem;
    margin-left: 0.1rem;
    vertical-align: middle;
}
</style>
