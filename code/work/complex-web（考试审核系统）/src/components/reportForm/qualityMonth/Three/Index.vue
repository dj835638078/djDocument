<template>
  <div class="One-table">
    <Table :tableData="threeData" />
    <div :style="{ minHeight: blockEchartsFlag ? '400px' : '100px' }">
      <div class="contentTitle contentTitleSingle">
        各时段错误量
      </div>
      <typeErrorEcharts :typeErrorEcharts="threeData" v-if="blockEchartsFlag" />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from "./Table";
import typeErrorEcharts from "../../monthEcharts/typeErrorEcharts";
export default {
  data() {
    return {
      blockEchartsFlag: false
    };
  },
  computed: { ...mapState([]) },
  props: ["threeData"],
  components: { Table, typeErrorEcharts },
  mounted() {
    this.blockEcharts();
  },
  watch: {
    threeData: {
      handler() {
        this.blockEcharts();
      },
      deep: true
    }
  },
  methods: {
    blockEcharts() {
      let arrFlag = this.threeData;
      let currentData = [];
      let preData = [];
      for (var i = 0; i < arrFlag.length; i++) {
        arrFlag[i].errorNum && currentData.push(arrFlag[i].errorNum);
        arrFlag[i].beforeErrorNum && preData.push(arrFlag[i].beforeErrorNum);
      }
      if (currentData.length || preData.length) {
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