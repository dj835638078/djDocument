<template>
  <div class="Five-table">
    <h3 class="reportFormTitle">
      五、各组错误总览<span class="smallText"
        >（下表数据包含本周有质检的已离职、将离职员工）</span
      >
    </h3>
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column label="组别" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-text="tools.getRegionName(scope.row.verifyGroup)"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="errorNum"
        label="错误量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="totalAccount"
        label="总人数"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="verifyNum"
        label="审核量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="averageErrorNum"
        label="人均错误量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="correctRate"
        label="本周正确率"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="lastCorrectRate"
        label="上周正确率"
        :show-overflow-tooltip="true"
      >
      </el-table-column> -->
      <el-table-column label="本周正确率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{ tools.setZero(scope.row.correctRate) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="上周正确率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>
            {{ tools.setZero(scope.row.lastCorrectRate) }}
          </span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        prop="thanLast"
        label="较上周"
        :show-overflow-tooltip="true"
      >
      </el-table-column> -->
      <el-table-column label="较上周" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span> {{ tools.setZero(scope.row.thanLast) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="weekAccount"
        label="周人力总数"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <!-- -->
      <el-table-column
        prop="averageNum"
        label="人均效率"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <!-- -->
      <el-table-column
        prop="lastAverageNum"
        label="上周人均效率"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column label="较上周" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ tools.setZero(scope.row.accountThanLast) }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
        prop="accountThanLast"
        label="较上周"
        :show-overflow-tooltip="true"
      >
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: { ...mapState([]) },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.Five-table /deep/.el-table .cell {
  height: 27px;
  line-height: 27px;
}
</style>