<template>
  <div class="homePage">
    <div class="boxShade"></div>
    <img src="../../../assets/img/common.png" alt="首页图片" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.homePage {
  width: 100%;
  height: 100%;
  position: relative;
  .boxShade {
    position: absolute;
    width: 100%;
    height: 30px;
    background: #f0f2f5;
  }
  img {
    width: 100%;
    height: 100%;
  }
}
</style>