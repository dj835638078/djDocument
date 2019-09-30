<template>
  <div class="totalBox">
    <div class="totalTitle">
      3、审核时段分析
    </div>
    <ul class="detailBox" v-if="contentArr && contentArr.length">
      <li class="titleBox">
        <div class="titleItem">审核时段</div>
        <div class="titleItem" v-for="(item, index) in timeArr" :key="index">
          {{ item }}
        </div>
      </li>
      <li class="contentBox" v-for="(item, index) in contentArr" :key="index">
        <div class="contentItem">{{ item.name }}</div>
        <div
          class="contentItem"
          v-for="(itemIn, indexIn) in item.data"
          :key="indexIn"
        >
          {{ itemIn }}
        </div>
      </li>
    </ul>
    <div class="noDataTitle" v-else>暂无数据</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeArr: [
        "08:00-10:00",
        "10:00-12:00",
        "12:00-14:00",
        "14:00-16:00",
        "16:00-18:00",
        "18:00-20:00",
        "20:00-22:00",
        "22:00-00:00",
        "00:00-04:00",
        "04:00-08:00"
      ],
      contentArr: []
    };
  },
  computed: {},
  props: ["tableData"],
  components: {},
  mounted() {
    this.updateTable();
  },
  watch: {
    tableData: {
      handler() {
        this.updateTable();
      },
      deep: true
    }
  },
  methods: {
    updateTable() {
      let dataFlag = this.tableData;
      if (dataFlag && dataFlag.length) {
        let timeArrFlag = [];
        let contentArrFlag = [
          { name: "本月错误量", data: [] },
          { name: "环比上月", data: [] }
        ];
        for (var i = 0; i < dataFlag.length; i++) {
          timeArrFlag.push(dataFlag[i].reviewTimeSlot);
          contentArrFlag[0].data.push(dataFlag[i].errorNum);
          contentArrFlag[1].data.push(dataFlag[i].ringRatioRate + "%");
        }
        this.contentArr = contentArrFlag;
        this.timeArr = timeArrFlag;
      }
    }
  }
};
</script>

<style scoped lang="less">
.totalBox {
  overflow: hidden;
  .totalTitle {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 20px;
    margin: 26px 0;
  }
  .detailBox {
    overflow: hidden;
    .titleBox {
      width: 100%;
      height: 44px;
      line-height: 44px;
      background: #f0f2f5;
      display: flex;
      .titleItem {
        flex: 1;
        padding-left: 20px;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
        font-family: PingFangSC-Semibold;
        height: calc(100% - 1px);
        border-bottom: 1px solid #ebeef5;
      }
    }
    .contentBox {
      width: 100%;
      height: 44px;
      line-height: 44px;
      display: flex;
      .contentItem {
        flex: 1;
        padding-left: 20px;
        font-size: 12px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(96, 98, 102, 1);
        width: calc(16.5% - 20px);
        height: calc(100% - 1px);
        border-bottom: 1px solid #ebeef5;
      }
    }
  }
}
</style>