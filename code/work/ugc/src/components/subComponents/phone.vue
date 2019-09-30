<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title">地点电话</div>
            <input type="tel" class="tel-num" v-model='phone' placeholder="输入该地点的电话" maxlength="50">
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
        console.log('phone created')
        this.phone = this.pho
    },
    mounted: function () {
        console.log('phone mounted')
    },
    watch: {
        phone: function (val) {
            this.$emit('phoneChange', val)
        },
        pho: function () {
            console.log('pho change', this.pho)
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
