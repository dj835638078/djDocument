<template>
  <div class="Four-table">
    <h3 class="reportFormTitle">
      六、各组错误详情
    </h3>
    <weekErrorDetail
      :weekErrorDetailData="tableData.gGroupAndErrorType"
      v-if="tableData.gGroupAndErrorType && tableData.gGroupAndErrorType.length"
    />
    <div class="noDataTitle" v-else>暂无数据</div>
    <div class="contentTitle">各组近三周数据</div>
    <ul
      class="Four-box"
      v-if="tableData.groupItem && JSON.stringify(tableData.groupItem) != '{}'"
    >
      <li
        class="Four-box-li"
        :style="{ marginRight: (index + 1) % 2 == 0 ? '0' : '40px' }"
        v-for="(item, key, index) in tableData.groupItem"
        :key="index"
      >
        <Table :titleName="key" color="#00CDCA" :tableData="item" />
      </li>
    </ul>
    <div class="noDataTitle" v-else>暂无数据</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from "./Table";
import weekErrorDetail from "../../weekEcharts/weekErrorDetail";
export default {
  data() {
    return {};
  },
  computed: { ...mapState([]) },
  props: ["tableData"],
  components: { Table, weekErrorDetail },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.Four-table {
  overflow: hidden;
  .contentTitle {
    text-align: center;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 21px;
    margin: 20px 0;
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