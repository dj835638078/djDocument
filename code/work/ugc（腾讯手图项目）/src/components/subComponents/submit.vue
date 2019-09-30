<template>
    <div class="container">
        <!-- <button class="submit-btn" id="submitId" :style='{opacity: opacity}' :disabled='disabled' @click="submitClick()">提交</button> -->
        <div class="submit-btn" id="submitId" :style='{opacity: opacity}' :disabled='disabled' @click="submitClick()">提交</div>
        <loading :loadingShow="loadShow"/>
    </div>
</template>
<script>
/* 提交按钮 */
import loading from './loading'
import api from '@/config/api'
import md5 from '@/config/md5'  //新增的加密方式
export default {
    name: 'submit',
    props: ['disable', 'loadShow'],
    data () {
        return {
            disabled: true,
            opacity: 0.4
        }
    },
    mounted: function () {},
    components: {
        loading
    },
    methods: {
        submitClick (v) {
            if (this.disabled) {
                return;
            }
            if (navigator.onLine) {
                this.$emit('clickBtn',v)
            } else {
                nativeShowToast('网络异常')
                return;
            }
        }
    },
    watch: {
        disable: function () {
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
</style>
