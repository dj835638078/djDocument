<template>
  <div class="Six-content">
    <div class="Six-content-box">
      <div class="Six-content-box-top" :style="{ background: color }">
        {{ regionNameStore[titleName] }}
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          tooltip-effect="light"
          border
        >
          <el-table-column
            label="时间"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ tools.setWeekTime(scope.row.weekTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="averageErrorNum"
            label="人均错误量"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="averageNum"
            label="人均效率"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="质检量最高人员"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{ tools.setName(scope.row.maxCheckAccount) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最高错误类型"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span>{{
                tools.setErrorType(scope.row.maxErrorType) ||
                  tools.setErrorRefuseType(scope.row.maxErrorType)
              }}</span>
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
  computed: { ...mapState(["regionNameStore"]) },
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.Six-content /deep/.el-table .cell {
  height: 27px;
  line-height: 27px;
}
.Six-content {
  width: 100%;
  overflow: hidden;
  margin-bottom: 35px;
  .Six-content-box-top {
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