<template>
  <!--题目序号和名称-->
  <div class="apfill-list-box-top">
    <div class="apfill-list-box-top-index">
      <div class="order">{{ tools.PrefixZero(index) }}</div>
    </div>
    <div class="apfill-list-box-top-titleDes">
      <div class="titleDes">
        {{ textName
        }}<span v-if="questionScore"> ({{ questionScore }}分) </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {},
  props: ["index", "textName", "questionScore"]
};
</script>

<style scoped lang="less">
.apfill-list-box-top {
  width: 100%;
  overflow: hidden;
  .apfill-list-box-top-index {
    float: left;
    width: 50px;
    .order {
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: rgba(241, 241, 241, 1);
      border-radius: 2px;
      font-weight: 600;
      margin-right: 15px;
    }
  }
  .apfill-list-box-top-titleDes {
    float: left;
    width: 928px;
    .titleDes {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 32px;
    }
  }
}
</style>