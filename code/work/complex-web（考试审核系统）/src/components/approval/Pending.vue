<template>
  <div class="pending">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column label="操作" align="left" width="100">
        <template slot-scope="scope">
          <span
            @click="goApprova(scope.row)"
            style="color:#00cdca;cursor:pointer;"
            ><span class="el-icon-edit-outline" style="margin-right:5px;"></span
            >审批</span
          >
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="userName"
        label="姓名"
        width="100"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="fwmAccount"
        label="员工工号"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="email"
        label="公司邮箱"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="regionName"
        label="所属区域"
        :show-overflow-tooltip="true"
      ></el-table-column>

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
        label="注册时间"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.createDate, 0)"></span>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="mobileCode"
        label="手机号码"
        width="130"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="qqAccount"
        label="QQ号码"
        width="100"
      ></el-table-column>
      <el-table-column
        label="性别"
        align="left"
        width="50"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="scope.row.sex == 'M' ? '男' : '女'"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {
    goApprova(item) {
      this.$parent.showDetail = false;
      this.$parent.manInfoList = item;
    }
  }
};
</script>

<style scoped lang="less">
</style>