<template>
    <div class="container merchant-container">
        <div class="title">我是该地商户</div>
        <div :class="['merchant-button', isMerchant ? 'merchant-button-active': '']" id="headerBtn" @click='headerBtnClick'>
            <div :class="['merchant-circle', isMerchant ? 'merchant-circle-active': '']"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'merchant',
    props: ['isMerch'],
    data () {
        return {
            isMerchant: false
        }
    },
    created: function () {
        console.log('merchant created')
        this.isMerchant = this.isMerch
    },
    mounted: function () {
        console.log('merchant mounted')
    },
    methods: {
        headerBtnClick () {
            this.isMerchant = !this.isMerchant
        }
    },
    watch: {
        isMerchant: function () {
            this.$emit('isMerchantChange', this.isMerchant)
        },
        isMerch: function () {
            console.log('isMerch change', this.isMerch)
            this.isMerchant = this.isMerch
        }
    }
}
</script>
<style scoped>
.merchant-container {
    border-bottom: 0.06rem solid #DDDDDD;
}
.root-header-name {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.16rem;
    color: rgb(51, 51, 51);
    letter-spacing: -0.19px;
}
.merchant-button {
    display: inline-block;
    width: 0.39rem;
    height: 0.23rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: relative;
    border-width: 0.01rem;
    border-style: solid;
    border-color: rgb(229, 229, 234);
    border-radius: 1.2rem;
    float: right;
}
.merchant-button-active {
    background: #4875FD;
}
.merchant-circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.2rem;
    height: 0.2rem;
    box-shadow: rgba(0, 0, 0, 0.14902) 0px 0.03rem 0.08rem 0px, rgba(0, 0, 0, 0.156863) 0px 0.01rem 0.01rem 0px, rgba(0, 0, 0, 0.0980392) 0px 0.03rem 0.01rem 0px;
    border-radius: 50%;
    border-width: 0px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.0392157);
    border-image: initial;
}
.merchant-circle-active {
    left: 0.17rem;
    background: #fff;
}
</style>
