<template>
  <div id="app">
      <sellHearder :seller="seller"/>
      <tab/>
      <router-view :seller="seller"/>
  </div>
</template>

<script>
import sellHearder from "./components/header";
import tab from "./components/tab";
export default {
  data() {
    return {
      seller: {},
    }
  },
  components: {
    sellHearder,
    tab
  },
  mounted() {
    this.axios.get("api/seller").then(response => {
        this.seller = response.data.data;
      });
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    .tab-item
      flex 1
      cursor pointer
      text-align center
</style>
