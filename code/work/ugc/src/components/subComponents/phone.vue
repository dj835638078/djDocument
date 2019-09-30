<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">地点电话</div>
            <input type="tel" class="tel-num" v-model='phone' placeholder="输入该地点的电话" maxlength="20">
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
export default {
    name: 'phone',
    props: ['pho'],
    data () {
        return {
            phone: ''
        }
    },
    created: function () {
        this.phone = this.pho
    },
    mounted: function () {},
    watch: {
        phone: function (val) {
            this.$emit('phoneChange', val)
        },
        pho: function () {
            this.phone = this.pho
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
