<template>
  <div class="Four-content">
    <div class="Four-content-box">
      <div class="Four-content-box-top" :style="{ background: color }">
        {{ titleName }}
      </div>
      <div>
        <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
          <el-table-column
            type="index"
            label="排名"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            align="left"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span
                v-text="tools.setName(scope.row.processAccount)"
                :style="{ color: scope.row.red ? 'red' : '' }"
              ></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="errorNum"
            label="错误量"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="入职年限" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-text="tools.setEntryDate(scope.row.entryDate)"></span>
            </template>
          </el-table-column>
          <el-table-column label="组别" :show-overflow-tooltip="true">
            <template slot-scope="scope">
              <span v-text="tools.getRegionName(scope.row.verifyGroup)"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["color", "titleName", "tableData"],
  computed: { ...mapState([]) },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.Four-content /deep/.el-table__empty-block {
  min-height: 45px !important;
}
.Four-content /deep/.el-table__empty-text {
  line-height: 45px;
}
.Four-content /deep/.el-table .cell {
  height: 27px;
  line-height: 27px;
}
.Four-content {
  width: 100%;
  .Four-content-box-top {
    width: 100%;
    height: 41px;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
    line-height: 41px;
    text-align: center;
  }
}
</style>