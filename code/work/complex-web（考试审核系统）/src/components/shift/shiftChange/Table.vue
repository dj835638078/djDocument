<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <!-- <el-table-column
        prop="applyUserName"
        label="申请人"
        :show-overflow-tooltip="true"
      >
      </el-table-column> -->

      <el-table-column
        label="申请人"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            @click="goDetail(scope.row)"
            style="color:rgb(0, 205, 202);cursor:pointer;"
            >{{ scope.row.applyUserName }}</span
          >
        </template>
      </el-table-column>

      <el-table-column
        prop="applyAccount"
        label="工号"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="regionName"
        label="部门"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="类别" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-text="tools.setApplyType(scope.row.applyType)"></span>
        </template>
      </el-table-column>

      <el-table-column label="类型" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-text="tools.setApplyClass(scope.row.applyClass)"></span>
        </template>
      </el-table-column>

      <el-table-column
        label="申请日期"
        align="left"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.applyDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="applyHour"
        label="申请小时"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="applyStatus"
        label="审批状态"
        :show-overflow-tooltip="true"
      >
      </el-table-column> -->
      <el-table-column
        label="审批状态"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setApplyStatus(scope.row.applyStatus)"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="approveUserName"
        label="当前处理人"
        :show-overflow-tooltip="true"
      >
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
  props: ["tableData", "dateTextType"],
  components: {},
  mounted() {},
  methods: {
    goDetail(item) {
      if (item.applyClass == "exchange_1") {
        this.$router.push({
          name: "shiftRelevant",
          params: {
            shiftReviseId: item.shiftReviseId
          }
        });
      } else {
        this.$router.push({
          name: "leaveRelevant",
          params: {
            shiftReviseId: item.shiftReviseId
          }
        });
      }
    },
    setDataSourceName(data) {
      if (data) {
        for (var key in this.lookUp.DATASOURCE_WX_SP) {
          if (data == this.lookUp.DATASOURCE_WX_SP[key].itemCode) {
            return this.lookUp.DATASOURCE_WX_SP[key].itemName;
          }
        }
      }
    },
    //设置质检来源名称
    setDataCheckChannel(data) {
      if (data) {
        for (var key in this.lookUp.COMPLEX_CHECK_CHANNEL_VIDEO) {
          if (data == this.lookUp.COMPLEX_CHECK_CHANNEL_VIDEO[key].itemCode) {
            return this.lookUp.COMPLEX_CHECK_CHANNEL_VIDEO[key].itemName;
          }
        }
      }
    },
    //设置质检来源名称
    setGroupName(data) {
      if (data) {
        for (var key in this.lookUp.VERIFY_GROUP) {
          if (data == this.lookUp.VERIFY_GROUP[key].itemCode) {
            return this.lookUp.VERIFY_GROUP[key].itemName;
          }
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>