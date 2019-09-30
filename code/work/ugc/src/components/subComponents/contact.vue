<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">联系方式</div><div v-show='required' class="xing">*</div>
            <input type="tel" class="tel-num" v-model='mobilePhone' placeholder="请输入你的手机号" maxlength="11">
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
/* 电话 */
export default {
    name: 'contact',
    props: {
        mobile: {
            default: ''
        },
        required: {
            default: true
        }
    },
    data () {
        return {
            mobilePhone: ''
        }
    },
    mounted: function () {
        if (localStorage.getItem('mobilePhone')) {
            this.mobilePhone = localStorage.getItem('mobilePhone')
        }
    },
    watch: {
        mobilePhone: function (val) {
            this.$emit('mobileChange', val)
        },
        mobile: function () {
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
