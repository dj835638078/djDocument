<template>
    <div class="container-wrap container-submit-success-wrap">
        <div class="container-submit-success">
            <div class="icon-success"></div>
            <div class="thanks">感谢您的反馈，我们会尽快处理</div>
            <div class="replay">您可在"意见反馈"中查看反馈进展</div>
            <div class="button-container">
                <div class="check" @click = 'checkfeedback'>查看反馈</div>
                <div class="continue" @click = 'continueFeedback'>继续反馈</div>
            </div>
        </div>
    </div>
</template>
<script>
/* 提交成功 */
import mixin from '@/config/mixin'
export default {
    name: 'submitSuccess',
    mixins: [mixin],
    data () {
        return {
        }
    },
    mounted: function () {
        var self = this
        nativeSetNavBarVisible()
        nativeSetNavBarTitle('提交成功')
        if (self.$route.query && self.$route.query.returnToNative) {
            nativeGetNavBarBackClick(function(data){
                nativePerformNavBarBackClick(function(data){})
            })
        } else {
            nativeGetNavBarBackClick(function(data){
                self.$router.push({path:'/'}); 
            })
        }
    },
    methods: {
        checkfeedback(){
            this.$router.push({path:'/my-feedback'});  
        },
        continueFeedback(){
            this.$router.push({path:'/'});    //这块跳转到上报页面
            //this.$router.go(-1)
        },

    }
}
</script>
<style scoped>
.container-submit-success-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
}
.container-submit-success {
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    width: 3rem;
    text-align: center;
}
.icon-success {
    width: 0.44rem;
    height: 0.44rem;
    background: url('../commons/img/ic_submit_succ.png');
    background-size: 100% 100%;
    background-repeat:no-repeat;
    margin: auto;
}
.thanks {
    margin-top: 0.14rem;
    font-size: 0.19rem;
    color: #333333;
    letter-spacing: 0;
}
.replay {
    margin-top: 0.08rem;
    font-size: 0.14rem;
    color: #999999;
}
.button-container {
    margin-top: 0.4rem;
    height: 0.32rem;
}
.check {
    float: left;
    width: 1.4rem;
    height: 0.32rem;
    line-height: 0.32rem;
    border: 1px solid #427CFF;
    border-radius: 0.3rem;
    color: #427CFF;
}
.continue {
    float: right;
    width: 1.4rem;
    height: 0.32rem;
    line-height: 0.32rem;
    border: 1px solid #427CFF;
    border-radius: 0.3rem;
    color: #427CFF;
}
</style>
