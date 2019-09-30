<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="视频rowkey"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            style="color:#00CDCA;cursor:pointer;"
            @click="goDetail(scope.row.checkId)"
            >{{ scope.row.rowkey }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="内容链接"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.contentTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核人员"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.processAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="组别"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="setGroupName(scope.row.verifyGroup)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否正确"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.checkResult == 'pass'">正确</span>
          <span v-else-if="scope.row.checkResult == 'fail'">错误</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检人员"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.checkAccount)"></span>
        </template>
      </el-table-column>

      <el-table-column
        label="质检来源"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.checkChannel == 1">自检</span>
          <span v-else>客检</span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务来源"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="$parent.setDataName(scope.row.dataSource)"></span>
        </template>
      </el-table-column>

      <el-table-column
        label="质检时间"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.checkDate, 1)"></span>
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
  computed: { ...mapState(["userList", "lookUp"]) },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {
    //设置质检来源名称
    setGroupName(data) {
      if (data) {
        for (var key in this.lookUp.VERIFY_GROUP) {
          if (data == this.lookUp.VERIFY_GROUP[key].itemCode) {
            return this.lookUp.VERIFY_GROUP[key].itemName;
          }
        }
      }
    },
    goDetail(id) {
      this.$router.push({
        name: "VideoAdd",
        params: { type: id }
      });
    }
  }
};
</script>

<style scoped lang="less">
</style>