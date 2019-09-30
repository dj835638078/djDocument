<template>
  <div class="leaveDetail-relevant">
    <div class="relevant-title">
      <div class="relevant-title-sign"></div>
      <div class="relevant-title-name">
        流程信息
      </div>
    </div>
    <div class="leaveDate-table">
      <el-table
        :data="dataList.shiftApproveLogVOS"
        style="width: 100%"
        tooltip-effect="light"
      >
        <el-table-column label="时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setFormTime(scope.row.createDate, 1) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="处理人" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setName(scope.row.fwmAccount) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="roleNames" label="岗位"> </el-table-column>
        <el-table-column label="操作" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setOperation(scope.row.conclusion) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="suggestion"
          label="说明"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["dataList"],
  components: {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="less">
.leaveDate-table /deep/ .el-table__header th {
  background: #fff !important;
  color: #2a2a2a;
  font-weight: 600;
}
.leaveDetail-relevant {
  margin-top: 16px;
}
</style>