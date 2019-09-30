<template>
  <div class="abnormal-tab">
    <div v-if="infoDialogFlag">
      <infoDialog :infoDetail="infoDetail" />
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
            v-text="scope.row.videoTitle"
            style="color:#1890FF;cursor: pointer;"
            @click="openDetail(scope.row)"
          ></span>
        </template>
      </el-table-column>
      <el-table-column
        label="反馈状态"
        align="left"
        width="70"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setStatusB(scope.row.appealState)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="申诉结果"
        align="left"
        width="70"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setStatusA(scope.row.appealResult)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="申诉时间"
        align="left"
        width="160"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.appealDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="评审意见"
        align="left"
        min-width="160"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.expertReason"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="评审时间"
        align="left"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.expertDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务专家"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setRole(scope.row.expertAccount)"></span>
        </template>
      </el-table-column>

      <el-table-column label="视频时长">
        <template slot-scope="scope">
          <div v-text="tools.setTimeFormat(scope.row.contentDuration)"></div>
        </template>
      </el-table-column>
      <el-table-column
        label="rowkey"
        align="left"
        width="130"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.rowkey"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="账号ID"
        align="left"
        width="90"
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
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setSource(scope.row.dataSource)"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import infoDialog from "../../quality/VideoQuality/infoDialog";
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
      val.showPage = "videoSavantCheck";
      this.infoDetail = val;
    }
  }
};
</script>

<style scoped lang="less">
</style>
