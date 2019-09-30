<template>
  <div class="expert-tab">
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
        label="评审结果"
        align="left"
        min-width="70"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setStatus(scope.row.processResult)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="评审时间"
        align="left"
        min-width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.expertDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核员"
        align="left"
        min-width="120"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setRole(scope.row.processAccount)"></span>
        </template>
      </el-table-column>

      <el-table-column
        prop="accountName"
        label="账号名称"
        min-width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="accountId"
        label="账号ID"
        min-width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="视频时长"
        min-width="70"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <div v-text="tools.setTimeFormat(scope.row.contentDuration)"></div>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        :show-overflow-tooltip="true"
        min-width="70"
      >
        <template slot-scope="scope">
          <span v-text="tools.setType(scope.row.videoType)"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rowkey"
        label="rowkey"
        min-width="130"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="入库时间"
        align="left"
        min-width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="来源"
        min-width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <div v-text="tools.setSource(scope.row.dataSource)"></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import infoDialog from "../../quality/VideoQuality/infoDialog";
export default {
  name: "expert-tab",
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
      val.showPage = "videoFruit";
      this.infoDetail = val;
    }
  }
};
</script>

<style scoped lang="less">
</style>
