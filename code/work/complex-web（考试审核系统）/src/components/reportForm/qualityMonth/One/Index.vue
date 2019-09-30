<template>
  <div class="One-table">
    <Table :tableData="qualityDetailData" />
    <div :style="{ minHeight: blockEchartsFlag ? '400px' : '100px' }">
      <div class="contentTitle contentTitleSingle">
        各版块抽检正确率
      </div>
      <blockEcharts :blockEcharts="qualityDetailData" v-if="blockEchartsFlag" />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from "./Table";
import blockEcharts from "../../monthEcharts/blockEcharts";
export default {
  data() {
    return {
      blockEchartsFlag: false
    };
  },
  computed: { ...mapState([]) },
  props: ["qualityDetailData"],
  components: { Table, blockEcharts },
  watch: {
    qualityDetailData: {
      handler() {
        this.blockEcharts();
      },
      deep: true
    }
  },
  mounted() {
    this.blockEcharts();
  },
  methods: {
    blockEcharts() {
      let arrFlag = this.qualityDetailData;
      let currentData = [];
      let preData = [];
      let prePreData = [];
      for (var i = 0; i < arrFlag.length; i++) {
        arrFlag[i].correctRate && currentData.push(arrFlag[i].correctRate);
        arrFlag[i].beforeOneCorrectRate &&
          preData.push(arrFlag[i].beforeOneCorrectRate);
        arrFlag[i].beforeTwoCorrectRate &&
          prePreData.push(arrFlag[i].beforeTwoCorrectRate);
      }
      if (currentData.length || preData.length || prePreData.length) {
        this.blockEchartsFlag = true;
      } else {
        this.blockEchartsFlag = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.One-table {
  overflow: hidden;
  .contentTitle {
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 21px;
    margin: 20px 0;
  }
  .contentTitleSingle {
    text-align: center;
    font-size: 18px;
    margin-top: 30px;
  }
  .Four-box {
    width: 100%;
    .Four-box-li {
      width: 580px;
      float: left;
      margin-right: 40px;
    }
  }
}
</style>