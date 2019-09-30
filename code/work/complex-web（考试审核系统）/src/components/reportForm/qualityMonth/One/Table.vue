<template>
  <div class="One-table">
    <h3 class="contentTitle" style="margin-top:20px;">1、抽检数据</h3>
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column
        prop="dataSource"
        label="来源"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="reviewNum"
        label="审核量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="qualityNum"
        label="质检量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column label="抽检率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{ tools.setZero(scope.row.qualityRate) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="errorNum"
        label="错误量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column label="本月正确率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.correctRate >= 99" style="color:#00cdca">{{
            tools.setZero(scope.row.correctRate)
          }}</span>
          <span v-else style="color:red">{{
            tools.setZero(scope.row.correctRate)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否达标" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.fulfill == true" style="color:#00cdca">是</span>
          <span v-else-if="scope.row.fulfill == false" style="color:red"
            >否</span
          >
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column label="上月正确率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ tools.setZero(scope.row.beforeOneCorrectRate) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="环比上月" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.ringRatioRate >= 0" style="color:#00cdca">{{
            tools.setZero(scope.row.ringRatioRate)
          }}</span>
          <span v-else style="color:red">{{
            tools.setZero(scope.row.ringRatioRate)
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: { ...mapState(["datasourceStore"]) },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {
    //设置来源名称
    setDataName(data) {
      if (data) {
        for (var key in this.datasourceStore) {
          if (data == this.datasourceStore[key].itemCode) {
            return this.datasourceStore[key].itemName;
          }
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.One-table /deep/.el-table .cell {
  height: 27px;
  line-height: 27px;
}
.contentTitle {
  font-size: 14px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(42, 42, 42, 1);
  line-height: 21px;
  margin: 20px 0;
}
</style>