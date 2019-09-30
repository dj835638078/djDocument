<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="内容链接"
        align="left"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <!--  style="color:#00CDCA;cursor:pointer;"
            @click="goDetail(scope.row.checkId)" -->
          <span>{{ scope.row.contentTitle }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="审核人"
        align="left"
        width="120"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.processAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检人"
        align="left"
        width="120"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.checkAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="来源"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.dataOrigin"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检来源"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.checkChannel"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务来源"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.dataSource"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="rowkey"
        label="视频rowkey"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="组别"
        width="100"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.verifyGroup"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否正确"
        width="100"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.checkResult"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="抽检是否正确"
        width="100"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.spotCheckResult"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        align="left"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.checkDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="分类"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.vClassify"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="启用状态"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.openStateStr"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="标注状态"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.labelStateStr"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="标签"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.vSign"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="视频质量"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.videoQuality"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="内容尺度"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.videoScale"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="广告"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.adAudit"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="账号名称"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.vAccount"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="错误分级"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.errorLevel"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="错误原因"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.errorReason"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="错误备注"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.errorRemark"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="是否正确"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.checkResult"></span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      imgShow: false,
      imgUrl: "",
      imgName: ""
    };
  },
  computed: { ...mapState(["userList"]) },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {
    goDetail(id) {
      // this.$router.push({
      //   name: "imageTextAdd",
      //   params: { type: id }
      // });
    }
  }
};
</script>

<style scoped lang="less">
</style>