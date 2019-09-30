<template>
  <div class="weekErrorTypeTable">
    <div class="listTitle">
      <div class="typeTitle fontStyle borderRight">本周重点错误</div>
      <div class="typeTitle fontStyle borderRight">
        "{{ tools.setErrorType(errorTypeData.errorSt.errorType) }}"主要成员分布
      </div>
      <div class="typeTitle fontStyle">
        误拒总量（<span class="fontColor">{{
          errorTypeData.errorSt.count
        }}</span
        >）
      </div>
    </div>
    <div class="listContent">
      <div
        class="typeContent ellipsis"
        :title="tools.setErrorType(errorTypeData.errorSt.errorType)"
      >
        {{ tools.setErrorType(errorTypeData.errorSt.errorType) }}
      </div>
      <div
        class="typeContent ellipsis"
        :title="tools.setMainArr(errorTypeData.errorSt.groupDistr)"
      >
        <span v-for="(item, key, index) in errorTypeData.errorSt.groupDistr">
          {{ regionNameStore[key] }}（<span class="fontColor">{{ item }}</span
          >）
        </span>
      </div>
      <div
        class="typeContent ellipsis"
        :title="
          tools.setErrorRefuseTypeArr(errorTypeData.errorSt.errorReasonDistr)
        "
      >
        {{
          tools.setErrorRefuseTypeArr(errorTypeData.errorSt.errorReasonDistr)
        }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["errorTypeData"],
  components: {},
  computed: {
    ...mapState(["regionNameStore"])
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="less">
.weekErrorTypeTable {
  position: relative;
  width: 1200px;
  height: 90px;
  // width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(235, 238, 245, 1);
  text-align: center;
  margin: 20px 0;
  .listTitle {
    display: flex;
    height: 46px;
    line-height: 48px;
    background: rgba(240, 242, 245, 1);
    .typeTitle {
      flex: 1;
    }
  }
  .fontStyle {
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
  }
  .borderRight {
    border-right: 1px solid #fff;
  }
  .fontColor {
    color: #00cdca;
    font-weight: 400;
  }
  .listContent {
    display: flex;
    height: 42px;
    line-height: 42px;
    .typeContent {
      flex: 1;
    }
  }
}
</style>