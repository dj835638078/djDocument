<template>
    <div class="cartControl">
        <transition name="move">
            <div class="decrease" v-show="food.count > 0" @click = "decreaseCart">
                <span class="inner fa fa-minus-circle"></span>
            </div>
        </transition>      
        <div class="count" v-show="food.count > 0">{{food.count}}</div>
        <div class="add fa fa-plus-circle" @click = "addCart"></div>
    </div>
</template>
<script>
import Vue from "vue"
export default {
    props :{
        food :{
            type: Object
        }
    },
    methods: {
        addCart(event) {
            if (!event._constructed) {
                return; //8、better-scroll插件所具有的事件，防止在pc端点击事件触发两次
            }
            if (!this.food.count) {
                Vue.set(this.food, "count", 1)
            } else {
                this.food.count++;
            }
        },
        decreaseCart(event) {
            if (!event._constructed) {
                return; //8、better-scroll插件所具有的事件，防止在pc端点击事件触发两次
            }
            this.food.count--;
        }
    }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .cartControl
        .add
            display inline-block
            padding 6px
            font-size 24px
            line-height 24px
            color rgb(0, 160, 220)
        .decrease
            display inline-block
            padding 6px
            &.move-enter-active, .move-leave-active 
                transition: all .5s ease;
                opacity 1;
                transform translate3D(0, 0 , 0)     
            .inner
                font-size 24px
                line-height 24px
                color rgb(0, 160, 220)   
            &.move-enter, .move-leave-to /* .fade-leave-active below version 2.1.8 */ 
                transition: all .5s ease;            
                opacity: 0;
                transform translate3D(24px, 0 , 0)
        .count
            display inline-block
            vertical-align top
            width 12px
            padding-top 6px
            line-height 24px
            text-align center
            font-size 10px
            color rgb(147,153,159)
</style>
