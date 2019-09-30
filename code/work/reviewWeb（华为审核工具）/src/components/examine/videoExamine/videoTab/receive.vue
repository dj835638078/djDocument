<template>
  <div>
    <el-table
      :data="$parent.tableData"
      border
      :height="tableHeightTwo"
      tooltip-effect="light"
      style="width: 100%"
    >
      <el-table-column label="NO." type="index" width="50" align="center">
      </el-table-column>
      <el-table-column label="标题" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span
            style="color:#1890FF;cursor:pointer;"
            @click="openDetail(scope.row)"
          >
            <el-tooltip
              v-if="scope.row.reviewCount > 1"
              content="多审"
              placement="bottom"
              effect="light"
            >
              <img src="/static/ds.svg" style="margin-right:3px;" />
            </el-tooltip>
            <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span
            >{{ scope.row.videoTitle }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rowkey"
        label="rowkey"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="accountId"
        label="账号UIN"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        prop="accountName"
        label="账号名称"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column label="入库时间" align="left" width="160">
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="infoDialogFlag">
      <infoDialog :formList="detailList" :title="title" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import infoDialog from "common/taskVideoDetail";
export default {
  name: "ReceiveTab",
  data() {
    return {
      infoDialogFlag: false,
      title: "领单",
      detailList: {}
    };
  },
  mounted() {},
  computed: { ...mapState(["tableHeightTwo"]) },
  // props: ["tableData"],
  watch: {},
  components: { infoDialog },
  methods: {
    //进入详情
    openDetail(val) {
      this.detailList = val;
      this.infoDialogFlag = true;
    }
  }
};
</script>

<style scoped lang="less">
</style>
