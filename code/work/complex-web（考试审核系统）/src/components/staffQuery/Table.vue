<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column
        :show-overflow-tooltip="true"
        type="index"
        label="NO."
        width="50"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="userName"
        label="姓名"
        width="80"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="fwmAccount"
        label="员工工号"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="mobileCode"
        label="手机号码"
        width="100"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="email"
        label="公司邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="qqAccount"
        label="QQ号码"
        width="100"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="levelTwoRegionName"
        label="所属区域"
        width="100"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="regionName"
        label="所属部门"
        width="100"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="employeeJob"
        label="员工岗位"
        width="80"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="roleNames"
        label="角色"
        width="100"
      >
      </el-table-column>

      <el-table-column
        label="员工性质"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setProperty(scope.row.employeeNature, 0)"></span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="superiorAccount"
        label="上级领导"
        width="80"
      >
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="trainingTeacher"
        label="培训班主任"
        width="80"
      >
      </el-table-column>

      <el-table-column
        label="参培时间"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.trainingDate, 0)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="入职时间"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.entryDate, 0)"></span>
        </template>
      </el-table-column>
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
  computed: {},
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
</style>