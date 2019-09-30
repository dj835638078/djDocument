<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <span
            class="appealBtn"
            :class="[scope.row.appealStatus == 1 ? 'hasAppeal' : 'noAppeal']"
            @click="goAppeal(scope.row)"
            v-if="
              tools.setRight('videoAppeal') &&
                scope.row.processAccount == userInfo.fwmAccount
            "
            >{{ scope.row.appealStatus == 1 ? "已诉" : "申诉" }}</span
          >
          <span class="appealBtn forbidAppeal" v-else>{{
            scope.row.appealStatus == 1 ? "已诉" : "申诉"
          }}</span>
        </template>
      </el-table-column>
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
        label="业务来源"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <!-- <span v-text="tools.getType(scope.row.checkType)"></span> -->
          <span v-text="tools.getDataSource(scope.row.dataSource)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检来源"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            v-text="tools.setVideoCheckChannel(scope.row.checkChannel)"
          ></span>
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
        label="质检人员"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.checkAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否正确"
        align="left"
        width="70"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.checkResult == 'pass'">正确</span>
          <span v-else-if="scope.row.checkResult == 'fail'">错误</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        label="申诉状态"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setAppeal(scope.row.appealStatus)"></span>
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
      <el-table-column
        label="申诉时间"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.appealDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="申诉结论"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            v-text="tools.setExamineResultAdd(scope.row.appealResult)"
          ></span>
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
  computed: { ...mapState(["userList", "datasourceStore", "userInfo"]) },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {
    goDetail(id) {
      this.$router.push({
        name: "VideoAdd",
        params: { type: id }
      });
    },
    goAppeal(val) {
      let type;
      if (val.appealStatus == 1 && !val.appealResult) {
        type = "pass";
      } else if (val.appealStatus == 1 && val.appealResult) {
        type = "result";
      } else {
        type = "todo";
      }
      this.$router.push({
        name: "videoAppealAdd",
        params: { type: type, id: val.checkId }
      });
    }
  }
};
</script>

<style scoped lang="less">
.information-table {
  .hasAppeal {
    background: #00cdca;
  }
  .noAppeal {
    background: #f5a623;
  }
  .forbidAppeal {
    background: #ccc;
    cursor: not-allowed !important;
  }
  .appealBtn {
    color: white;
    cursor: pointer;
    display: inline-block;
    text-align: center;
    width: 30px;
    height: 32px;
    border-bottom-right-radius: 15px 15px;
    border-bottom-left-radius: 15px 15px;
    font-size: 12px;
  }
}
</style>