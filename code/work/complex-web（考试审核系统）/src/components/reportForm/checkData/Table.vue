<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="标题"
        align="left"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contentTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="processQq"
        label="审核人QQ号"
        width="100"
        :show-overflow-tooltip="true"
      >
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
        prop="rowkey"
        label="rowkey"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="accountId"
        label="账号UIN"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        label="发布时间"
        align="left"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.publishDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检日期"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.checkDate)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核日期"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.processDate, 0)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核时间"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTimeSF(scope.row.processDate)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核结果"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.processResult"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="错误类型"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.errorType"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="程度"
        align="left"
        width="80"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.errorLevel"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="来源"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.dataSource"></span>
        </template>
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
        label="入职时间"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.entryDate, 0)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="入职天数"
        align="left"
        width="70"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.entryDays > 0"
            >{{ scope.row.entryDays }}天</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="审核时间段"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.timePeriod"></span>
        </template>
      </el-table-column>

      <el-table-column
        label="质检渠道"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.checkChannel"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检人员"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.checkAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章类别"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.graGenre"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否正确"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.spotCheckResult"></span>
        </template>
      </el-table-column>
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
      this.$router.push({
        name: "imageTextAdd",
        params: { type: id }
      });
    }
  }
};
</script>

<style scoped lang="less">
</style>