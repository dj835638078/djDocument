<template>
  <div class="Month-two">
    <div class="Month-two-title">
      2、各类型错误分析
    </div>
    <ul class="Month-two-box">
      <li class="Month-two-table">
        <div class="Month-two-table-type">错误类型</div>
        <div class="Month-two-table-routine">本月错误量</div>
        <div class="Month-two-table-routine">错误占比</div>
        <div class="Month-two-table-routine">上月错误量</div>
        <div class="Month-two-table-routine">上月占比</div>
        <div class="Month-two-table-routine">环比上月</div>
      </li>
      <li
        class="Month-two-content"
        v-for="(item, index) in tableData"
        :key="index"
      >
        <div class="Month-two-content-type ellipsis">{{ item.errorType }}</div>
        <div class="Month-two-content-routine">{{ item.errorNum }}</div>
        <div class="Month-two-content-routine">
          {{ tools.setZero(item.errorRate) }}
        </div>
        <div class="Month-two-content-routine">{{ item.beforeErrorNum }}</div>
        <div class="Month-two-content-routine">
          {{ tools.setZero(item.beforeRate) }}
        </div>
        <div
          class="Month-two-content-routine"
          :style="{ color: item.ringRatioRate > 0 ? 'red' : '#00CDCA' }"
        >
          {{ tools.setZero(item.ringRatioRate) }}
        </div>
      </li>
    </ul>
    <div :style="{ minHeight: blockEchartsFlag ? '400px' : '100px' }">
      <div class="contentTitle contentTitleSingle">
        各类型错误量
      </div>
      <errorAnalyseEcharts
        :errorAnalyseEcharts="tableData"
        v-if="blockEchartsFlag"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import errorAnalyseEcharts from "../../monthEcharts/errorAnalyseEcharts";
export default {
  data() {
    return {
      blockEchartsFlag: false
    };
  },
  computed: { ...mapState([]) },
  props: ["tableData"],
  components: { errorAnalyseEcharts },
  mounted() {
    this.blockEcharts();
  },
  watch: {
    tableData: {
      handler() {
        this.blockEcharts();
      },
      deep: true
    }
  },
  methods: {
    blockEcharts() {
      let arrFlag = this.tableData;
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
.Month-two {
  overflow: hidden;
  .Month-two-title {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 20px;
    margin: 26px 0;
  }
  .Month-two-box {
    overflow: hidden;
    .Month-two-table {
      width: 100%;
      height: 44px;
      line-height: 44px;
      background: #f0f2f5;
      .Month-two-table-type,
      .Month-two-table-routine {
        float: left;
        padding-left: 20px;
        font-family: PingFangSC-Semibold;
      }
      .Month-two-table-type {
        font-size: 14px;
        width: calc(17.5% - 20px);
        height: 100%;
        background: #e3e5e9;
      }
      .Month-two-table-routine {
        width: calc(16.5% - 20px);
        height: calc(100% - 1px);
        border-bottom: 1px solid #ebeef5;
      }
    }
    .Month-two-content {
      width: 100%;
      height: 44px;
      line-height: 44px;
      .Month-two-content-type,
      .Month-two-content-routine {
        float: left;
        padding-left: 20px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(96, 98, 102, 1);
      }
      .Month-two-content-type {
        width: calc(17.5% - 20px);
        height: 100%;
        background: #e3e5e9;
      }
      .Month-two-content-routine {
        width: calc(16.5% - 20px);
        height: calc(100% - 1px);
        border-bottom: 1px solid #ebeef5;
      }
    }
  }
}
</style>