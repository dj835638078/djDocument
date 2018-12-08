<template>
    <div class="sellHeader">
      <div class="content">
        <div class="img">
          <img :src="seller.avatar">
        </div>
        <div class="detail">
          <p>
            <span class="img"></span>
            <span class="name">{{seller.name}}</span>
          </p>
          <p class="arrive">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
          <p v-if="seller.supports" class="support">
            <span class="imgs" :class="classChoose[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </p>
          <div class="num"  v-if="seller.supports" @click="shadeShowClickOn()">
            <span class="numText">{{seller.supports.length}}个</span>
            <i class="numIcon fa fa-angle-right"></i>
        </div> 
      </div>    
        </div>    
      <div class="notice" @click="shadeShowClickOn()">
        <span class="img"></span>
        <span class="text">{{seller.bulletin}}</span>
        <i class="icon fa fa-angle-right"></i>
      </div>  
      <div class="bgImg">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <transition name="fade">
        <div class="shade" v-if="shadeShow">
        <div class="contentShade">
          <h1 class="title">{{seller.name}}</h1>
          <star :size="48" :score="seller.score"></star>
          <div class="summary">
             <div class="line"></div>
             <div class="summaryName">优惠信息</div>
             <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="support">
            <li v-for="(item,index) in seller.supports" class="itemLi" :key="index">
              <span class="imgs" :class="classChoose[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="summary">
             <div class="line"></div>
             <div class="summaryName">商家公告</div>
             <div class="line"></div>
          </div>
          <div class="bulletin">{{seller.bulletin}}</div>
        </div>
        <div class="footerShade" @click="shadeShowClickOff()"><i class="fa fa-close"></i></div>  
      </div>
      </transition>    
    </div>
</template>
<script>
import star from "components/star"
export default {
  data() {
    return {
      classChoose: ["decrease","discount","special","invoice","guarantee",],
      shadeShow: false
    };
  },
  methods: {
    shadeShowClickOn(){
      this.shadeShow=true;
    },
    shadeShowClickOff(){
      this.shadeShow=false;
    }
  },
  components:{
    star
  },
    // props: ["seller"],
  props: {
    seller: {
      type: Object
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import "../../common/stylus/mixin.styl"
.sellHeader
  width 100%
  color #fff 
  position relative
  background rgba(7,17,27,0.5)
  overflow hidden
  .content
    position relative
    padding 24px 0px 0px 24px
    .img
      display inline-block
      vertical-align top
      img
        height 64px
        width 64px
        border-radius 4px
        margin-right 12px
    .name
      font-size 16px 
      font-weight bold
      line-height 18px
    .detail
      display inline-block
      .num
        position absolute
        right 15px
        bottom 0
        background rgba(0,0,0,0.2)   
        padding 6px 9px
        border-radius 14px
        text-align center
        .numText,.numIcon
          font-size 10px
          line-height 12px
      p
        .img
          display inline-block
          width 30px
          height 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
      .arrive
        margin 8px 0 10px 0    
        font-size 12px 
        font-weight 200
        line-height 12px
      .support
        .imgs
          display inline-block
          width 12px 
          height 12px
          margin-right 4px
          background-size 12px 12px 
          background-repeat no-repeat
          margin-top 2px
          &.decrease
            bg-image("decrease_1") 
          &.discount
            bg-image("discount_1") 
          &.guarantee
            bg-image("guarantee_1") 
          &.invoice
            bg-image("invoice_1") 
          &.special
            bg-image("special_1") 
        .text
          font-size 10px 
          font-weight 200
          line-height 12px
  .notice   
    height 28px
    background-color rgba(7,17,27,0.2)
    margin-top 18px
    line-height 28px
    white-space nowrap
    overflow hidden 
    text-overflow ellipsis
    padding 0 22px 0 12px
    position relative
    .img
      bg-image("bulletin") 
      display inline-block 
      width 22px 
      height 12px
      background-size 22px 12px
      background-repeat no-repeat
      vertical-align top
      margin-top 8px
    .text
      font-size 10px
      line-height 28px
      margin 0 4px
    .icon
      font-size 10px
      position absolute
      right 18px
      line-height 28px
  .bgImg
    position absolute
    top 0 
    left 0 
    height 100%
    width 100%
    z-index -1
    filter blur(10px)
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
  .shade
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background rgba(7,17,27,0.8)
    display flex
    flex-flow column 
    min-height 100%
    padding 64px auto 32px auto
    overflow auto
    box-sizing border-box 
    z-index 100
    backdrop-filter blur(10px)
    .contentShade
      flex 1
      text-align left
      width 80%
      margin 0 auto
      .title
        font-size 16px
        font-weight 700
        line-height 16px
        margin-top 64px
        margin-bottom 16px
      .summary
        display flex
        margin-top 28px
        margin-bottom 24px
        .line
          flex 1
          border-bottom 1px solid rgba(255,255,255,0.3)
          position relative
          top -6px
        .summaryName
          font-size 14px
          font-weight 700
          line-height 14px
          margin 0 12px
      .support
        .itemLi
          padding-bottom 12px
          &:last-child 
            padding-bottom 0
          .imgs
            display inline-block
            width 16px 
            height 16px
            margin-right 4px
            background-size 16px 16px 
            background-repeat no-repeat
            margin-top 2px
            vertical-align top
            &.decrease
              bg-image("decrease_1") 
            &.discount
              bg-image("discount_1") 
            &.guarantee
              bg-image("guarantee_1") 
            &.invoice
              bg-image("invoice_1") 
            &.special
              bg-image("special_1") 
        .text
          font-size 12px 
          font-weight 200
          line-height 12px
      .bulletin
        text-align left
        font-size 12px
        font-weight 200
        line-height 24px
    .footerShade
      flex 0
      font-size 32px
      color rgba(255,255,255,0.5)
      margin-bottom 32px
      text-align center
</style>
