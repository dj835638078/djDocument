<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column label="时间" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.approveDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="处理人"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setMulName(scope.row.fwmAccount)"></span>
        </template>
      </el-table-column>

      <el-table-column label="岗位" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.employeeJob ? scope.row.employeeJob : "-" }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="operation"
        label="操作"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="suggestion"
        label="处理结果"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.information-table/deep/.cell {
  color: #2a2a2a;
}
</style>