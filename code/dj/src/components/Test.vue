<template>
  <div class="Home" :title="'dj' | capitalize">
    {{'dj' | changeVal}}<br/> <!--过滤器的使用-->
    {{'dj' | partChange}}<br/>
    <input type="text" v-focus> <!--自定义指令-->
    <!-- 动态class的几种绑定方式 -->
    <!-- :class="{'className': true/false, 'sort': isSort}"
    :class=" true/false ? 'active': ''"
    :class="[ true/false ? 'blackBg' : '', 'CongestionShow']"
    :class="[{ 'className': true/false }, 'sort']" -->

  </div>
</template>

<script>
import mixin from "@common/mixins"//组件混入
export default {
  name: 'Home',
  mixins:[mixin],//组件混入
  data () {
    return {}
  },
  mounted(){
    this.dj()//组件混入方法使用
    window.toolsTwo()//调用的全局方法
    this.tools.toolsDj()
  },
  // 组件过滤器
  filters:{
    partChange(val){
      return val + "组件过滤器"
    }
  },
  // 组件自定义指令
  directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
}
</script>
<style scoped>

</style>
