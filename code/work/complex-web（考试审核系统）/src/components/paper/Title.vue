<template>
  <div class="title">
    <div class="name">{{ titleName }}</div>
    <div class="des">
      （总分{{ titleDes.totalScore }}分，
      <span v-if="shortAnswerFlag != 'shortAnswerFlag'">
        <span v-if="paperType == 1">每题{{ titleDes.everyScore }}分，</span>
      </span>
      共{{ titleDes.totalTitle }}题
      <span v-if="multipleTitle">
        ，答错没分，少答得{{ lessAnswerScore }}分
      </span>
      ）
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: [
    "titleName",
    "titleDes",
    "multipleTitle",
    "lessAnswerScore",
    "shortAnswerFlag",
    "paperType"
  ],
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.title {
  height: 46px;
  line-height: 46px;
  background: rgba(241, 241, 241, 1);
  display: flex;
  margin-bottom: 30px;
  margin-top: 30px;
  .name {
    color: #2a2a2a;
    font-size: 20px;
    font-weight: 600;
    margin-left: 15px;
    margin-right: 10px;
  }
}
</style>