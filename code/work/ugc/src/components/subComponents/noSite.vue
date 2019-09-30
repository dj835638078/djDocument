<template>
    <div class="container-wrap container-submit-success-wrap">
        <div class="container-submit-success">
            <div class='addr-icon'></div>
            <div class='not-find'>没有查询到改地点</div>
            <div class='explore-other-place'>试试探索其他地方</div>
            <div class="add-poi" @click='btn'>新增地点</div>
        </div>    
    </div>
</template>
<script>
export default {
    name: 'noSite',
    data () {
        return {
        }
    },
    created: function () {
        document.title = '没有查询到该地点'
    },
    mounted: function () {
        console.log('submitSuccess mouned')
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
    },
    methods: {
        btn(){
            this.$router.push({path:'/add-line'});  
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
    left: 57%;
    top: 47%;
    transform: translate(-50%, -50%);
    width: 3rem;
    text-align: center;
}
.addr-icon{
    width:2.4rem;
    height:2.4rem;
    background-size:100% 100%;
    background: url('../../commons/img/tent.png');
    background-size: 100% 100%;
    background-repeat:no-repeat;
}
.not-find{
    font-size: 0.16rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.2rem;
    margin-left:-58px;
}
.explore-other-place{
    font-size: 0.14rem;
    color: #999999;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.16rem;
    margin-left:-58px;
}
.add-poi{
    width:1rem;
    height:0.3rem;
    line-height:0.3rem;
    border: 1px solid #427CFF;
    border-radius: 0.3rem;
    color:#427CFF;
    margin-top:0.4rem;
    margin-left:0.65rem;
}
</style>
