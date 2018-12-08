<template>
    <div class="tab">
        <router-link :to="{name:'goods'}" class="tab-item">商品</router-link>
        <router-link :to="{name:'comment'}" class="tab-item">评价</router-link>
        <router-link :to="{name:'sell'}" class="tab-item">商家</router-link>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
.tab
    .tab-item
        font-size 20px
        color rgb(77, 85, 93)
        display block
        height 40px
        line-height 40px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        &.active
            color rgb(240, 20, 20)
</style>
