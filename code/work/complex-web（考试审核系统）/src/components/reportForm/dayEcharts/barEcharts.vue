<template>
  <div class="dayUnitDetailBoxInfo">
    <div class="dayUnitDetailList">
      <div class="typeTitleBig">{{ dataEcharts.gGroupName }}：</div>
      <div class="listTitle">
        <div class="typeTitle fontStyle">类型</div>
        <div class="proportionTitle fontStyle">合计</div>
      </div>
      <div class="listContent">
        <div class="typeContent">内部质检</div>
        <div class="proportionContent fontColor">
          {{ dataEcharts.checkNum }}
        </div>
      </div>
      <div class="listContent borderTop">
        <div class="typeContent">"腾讯质检&投诉"</div>
        <div class="proportionContent">/</div>
      </div>
    </div>
    <!-- <div class="dayUnitDetail" ref="dayUnitDetail"></div> -->
    <div
      class="dayUnitDetail"
      v-if="dataEcharts.userDataDayVo && dataEcharts.userDataDayVo.length"
    >
      <dayUnitDetailEchart :dataEcharts="dataEcharts" />
    </div>
    <div class="noDataTitle noDataTitleAdd" v-else>
      暂无数据
    </div>
  </div>
</template>

<script>
import dayUnitDetailEchart from "./barEchartsAdd";
export default {
  data() {
    return {};
  },
  props: ["dataEcharts"],
  watch: {},
  components: { dayUnitDetailEchart },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.noDataTitleAdd {
  width: 100%;
  height: 50px;
  padding-bottom: 86px;
  line-height: 125px !important;
}
.dayUnitDetailBoxInfo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  .dayUnitDetail {
    // height: 400px;
    flex: 1;
  }
  .dayUnitDetailList {
    position: relative;
    flex: 0 0 210px;
    height: 130px;
    // width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(235, 238, 245, 1);
    text-align: center;
    .typeTitleBig {
      position: absolute;
      top: -40px;
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 22px;
    }
    .listTitle {
      display: flex;
      height: 46px;
      line-height: 48px;
      background: rgba(240, 242, 245, 1);
      .typeTitle {
        flex: 1;
      }
      .proportionTitle {
        border-left: 1px solid #fff;
        flex: 0 0 60px;
      }
    }
    .fontStyle {
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
    }
    .borderTop {
      border-top: 1px solid #ebeef5;
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
      .proportionContent {
        flex: 0 0 60px;
      }
    }
  }
}
</style>