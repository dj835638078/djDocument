<template>
  <div class="leaveDetail-relevant">
    <div class="relevant-title">
      <div class="relevant-title-sign"></div>
      <div class="relevant-title-name">
        请假明细
      </div>
    </div>
    <div class="leaveDate-table">
      <el-table :data="dataList.shiftReviseItemVOS" style="width: 100%">
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column label="类别" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setApplyType(scope.row.applyType) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setApplyClass(scope.row.applyClass) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日期" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setFormTime(scope.row.shiftDate, 0) }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="shiftType" label="班次"> </el-table-column> -->

        <el-table-column label="班次" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setShiftType(scope.row.shiftType) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="开始时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setFormTimeSF(scope.row.beginTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结束时间" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span>{{ tools.setFormTimeSF(scope.row.endTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shiftHour" label="小时"> </el-table-column>
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