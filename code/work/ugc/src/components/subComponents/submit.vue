<template>
    <div class="container">
        <button class="submit-btn" id="submitId" :style='{opacity: opacity}' :disabled='disabled' @click="submitClick()">提交</button>
        <div v-show="loadShow">
            <div class="mask"></div>
            <div class="container-loading">
                <div class="loadIcon"></div>
                <div class="loadTxt">正在加载</div>
            </div>
        </div>
    </div>
</template>
<script>
import loading from './loading'
import api from '@/config/api'
import md5 from '@/config/md5'  //新增的加密方式
import objKeySort from '@/config/sort'  //key值排序
export default {
    name: 'submit',
    props: ['disable', 'loadShow'],
    data () {
        return {
            disabled: true,
            opacity: 0.4,
            loadingShow: false
        }
    },
    created: function () {
        console.log('submit created')
    },
    mounted: function () {
    },
    components: {
        loading
    },
    methods: {
        submitClick (v) {
            this.$emit('clickBtn',v)
        }
    },
    watch: {
        disabled: function () {
            console.log('disabled emit')
        },
        disable: function () {
            console.log('disable change')
            this.disabled = this.disable
            this.disabled ? this.opacity = 0.4 : this.opacity = 1
        }
    }
}
</script>
<style scoped>
.submit-btn {
    width: 3.35rem;
    height: 0.34rem;
    line-height: 0.34rem;
    text-align: center;
    opacity: 0.4;
    font-size: 0.16rem;
    color: #fff;
    letter-spacing: 0px;
    background: #427CFF;
    border-radius: 1rem;
}
.container-loading {
    z-index: 999;
    width: 1.5rem;
    height: 1.5rem;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* background: #fff; */
}
.loadIcon {
    width: 0.84rem;
    height: 0.84rem;
    text-align: center;
    background: url('../../commons/img/loading_gray.png') no-repeat center center;
    background-size: 0.28rem 0.28rem;
    vertical-align: middle;
    position: absolute;
    top: 0.32rem;
    left: 0.1rem;
    animation: mymove 0.5s infinite linear;
    -webkit-animation: mymove 0.5s infinite linear;
    -moz-animation: mymove 0.5s infinite linear;
    -o-animation: mymove 0.5s infinite linear;
}
@-webkit-keyframes mymove {
    from {
        transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -o-transform: rotate(360deg);
    }
}
.loadTxt {
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #999999;
    letter-spacing: 0;
    position: absolute;
    left: 0.67rem;
    top: 0.67rem;
}
.mask {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background: #999999;
    opacity: 0.4;
}
</style>
