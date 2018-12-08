<template>
    <div class="goods">
        <div class="leftMenu" ref="leftMenu">
          <ul>
            <li v-for="(item,index) in goods" class="itemLi" :class="{'current':currentIndex==index}" @click="selectMenu(index,$event)" :key="index">
              <span class="text"><span v-if="item.type>0" class="imgs" :class="classChoose[item.type]"></span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <div class="goodsTotal" ref="goodsTotal">
          <ul>
            <li v-for="(item,index) in goods" class="goodsLi" :key="index">
              <h2 class="goodsName">{{item.name}}</h2>
              <div v-for="(itemIn,indexIn) in item.foods" class="goodsDetail" :key="indexIn">
                <div class="img">
                  <img :src="itemIn.icon" width="57" height="57">
                </div>
                <div class="content">
                  <h2 class="detailName">{{itemIn.name}}</h2>
                  <p class="detailDes">{{itemIn.description }}</p>
                  <p class="num">
                    <span>月售{{itemIn.sellCount}}份</span>
                    <span>好评率{{itemIn.rating}}%</span>
                  </p>
                  <p class="price">
                    <span class="now"><span class="fa fa-rmb icon"></span>{{itemIn.price}}</span>
                    <span class="old" v-if="itemIn.oldPrice!=''"><span class="fa fa-rmb icon"></span>{{itemIn.oldPrice}}</span>
                  </p>
                  <div class="cartControl-wrapper">
                    <cartControl :food = "itemIn"/>
                  </div>
              </div>
              </div>
            </li>
          </ul>
        </div>
        <shopcart :select-foods = "selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"/>
    </div>
</template>
<script>
import BScroll from "better-scroll"; //1、引入better-scroll
import shopcart from "components/shopcart";
import cartControl from "components/cartControl";
export default {
  data() {
    return {
      goods: [],
      classChoose: ["decrease", "discount", "special", "invoice", "guarantee"],
      listHeight: [],
      scrollY: 0
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  // props: ["seller"],
  methods: {
    initScroll() { //2、获取滚动元素初始化
      this.menuScroll = new BScroll(this.$refs.leftMenu, {
        click: true //7、给左侧菜单栏添加点击事件属性
      });
      this.foodsScroll = new BScroll(this.$refs.goodsTotal, {
        click: true,
        probeType: 3 //5、scroll在滚动的时候时刻监听滚动的位置，相当于探针
      });
      this.foodsScroll.on("scroll", pos => {
        //5、scroll在滚动的时候时刻监听滚动的时间，并获取位置
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    calculateHeight() {
      let foodList = this.$refs.goodsTotal.getElementsByClassName("goodsLi");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return; //8、better-scroll插件所具有的事件，防止在pc端点击事件触发两次
      }
      let foodList = this.$refs.goodsTotal.getElementsByClassName("goodsLi");
      let el = foodList[index]; //9、获取当前索引所在的元素
      this.foodsScroll.scrollToElement(el, 300); //10、跳转到相应的区域
    }
  },
  components: {
    shopcart,
    cartControl
  },
  computed: {
    currentIndex() {
      //6、获取右侧区域中所对应的索引并与左侧索引联动
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          //排出最后一个
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created() {
    this.axios.get("api/goods").then(response => {
      this.goods = response.data.data;
      this.$nextTick(() => {
        this.initScroll(); //3、元素加载完后调用初始化后的滚动方法
        this.calculateHeight(); //4、获取右侧元素每个区域的高度（数组）
      });
    });
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.goods
  display flex
  position fixed
  top 178px
  bottom 46px
  width 100%
  overflow hidden
  .leftMenu
    flex 0 0 80px
    width 80px
    background #f3f5f7
    .itemLi
      padding 0 12px
      height 54px
      width 56px
      line-height 14px
      display table
      &.current
        background #fff
        position relative
        margin-top -1px
        font-weight 700
        z-index 10
        .text
          border-bottom none !important
      .text
        display table-cell
        width 56px
        vertical-align middle
        font-size 12px
        font-weight 200
        line-height 14px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .imgs
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          vertical-align top
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
  .goodsTotal
    flex 1
    .goodsLi
      .goodsName
        background #f3f5f7
        font-size 12px
        color rgb(147, 153, 159)
        line-height 26px
        border-left 2px solid #d9dde1
        padding 0 14px
      .goodsDetail
        padding 18px 0
        display flex
        margin 0 18px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        &:last-child
          border-bottom none
        .img
          width 57px
          height 57px
          flex 0 0 57px
          margin-right 10px
        .content
          position relative
          flex 1
          .detailName
            font-size 14px
            color rgb(7, 17, 27)
            line-height 14px
          .detailDes, .num
            font-size 10px
            color rgb(147, 153, 159)
            line-height 10px
            margin 8px 0
          .price
            .now, .old
              font-weight 700
              line-height 24px
              .icon
                font-size 10px
                font-weight normal
            .now
              font-size 14px
              color red
            .old
              font-size 10px
              color rgb(147, 153, 159)
              text-decoration line-through !important
          .cartControl-wrapper
            position  absolute
            right 0
            bottom 0
</style>
