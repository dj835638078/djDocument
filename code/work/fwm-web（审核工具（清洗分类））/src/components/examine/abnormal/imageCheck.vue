<template>
  <div class="abnormal-tab">
    <div v-if="infoDialogFlag">
      <infoDialog :formList="infoDetail" />
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :height="height"
      tooltip-effect="light"
      ref="table"
    >
      <el-table-column label="NO." type="index" width="50" align="center">
      </el-table-column>
      <el-table-column
        label="标题"
        align="left"
        min-width="200"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            v-text="scope.row.atricleTitle"
            style="color:#1890FF;cursor: pointer;"
            @click="openDetail(scope.row)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核时间"
        align="left"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.processDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核结果"
        align="left"
        width="70"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setStatus(scope.row.processResult)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核不合格原因"
        align="left"
        min-width="160"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.processReason"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检员"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setRole(scope.row.checkAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检时间"
        align="left"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.checkDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检结果"
        align="left"
        width="70"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setStatus(scope.row.checkResult)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检不合格原因"
        align="left"
        min-width="160"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.checkReson"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="rowkey"
        align="left"
        width="130"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.rowKey"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="账号UIN"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.accountId"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="账号名称"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.accountName"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="入库时间"
        align="left"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="来源"
        align="left"
        :show-overflow-tooltip="true"
        width="100"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.dataSource"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import infoDialog from "../../quality/imgQuality/infoDialog";
export default {
  name: "abnormal-tab",
  data() {
    return {
      infoDialogFlag: false,
      infoDetail: {}
    };
  },
  components: { infoDialog },
  props: ["tableData", "height"],
  methods: {
    //进入详情
    openDetail(val) {
      this.infoDialogFlag = true;
      val.showPage = "imageCheck";
      this.infoDetail = val;
    }
  }
};
</script>

<style scoped lang="less">
</style>
