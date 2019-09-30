<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        v-if="dateTextType == '1'"
        label="日期"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dateText }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-else
        label="日期"
        align="left"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.dateText }}</span>
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
        label="审核人"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.processAccountName"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="QQ号码"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.qqAccount"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务来源"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="setDataSourceName(scope.row.dataSource)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="启用量"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.startNum" v-if="scope.row.startNum"></span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="禁用量"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.stopNum" v-if="scope.row.stopNum"></span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="启用率"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ tools.setZero(scope.row.startRate) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="抽检量"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.checkNum" v-text="scope.row.checkNum"></span>
          <span v-else>0</span>
        </template>
      </el-table-column>
      <el-table-column
        label="错误量"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.errorNum"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="正确率"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ tools.setZero(scope.row.passRate) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="一级错误量"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.oneErrorNum"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="二级错误量"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.twoErrorNum"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="三级错误量"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.threeErrorNum"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检来源"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="setDataCheckChannel(scope.row.checkChannel)"></span>
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
  props: ["tableData", "dateTextType"],
  components: {},
  mounted() {},
  methods: {
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