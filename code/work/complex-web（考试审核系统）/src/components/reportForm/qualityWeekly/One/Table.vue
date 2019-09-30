<template>
  <div class="One-table">
    <h3 class="reportFormTitle" style="margin-top:20px;">一、本周数据总览</h3>
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column label="来源" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span
            v-text="tools.getDataSourceImg(scope.row.dataSource)"
            v-if="scope.row.dataSource != '总量'"
          ></span>
          <span v-else>总量</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="verifyNum"
        label="审核量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="checkNum"
        label="质检量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column label="抽检率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ tools.setZero(scope.row.checkRate) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="errorNum"
        label="出错量"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column label="目标正确率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.targetCorrectRate }}%</span>
        </template>
      </el-table-column>

      <el-table-column label="质检正确率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.correctRate }}%</span> -->
          <span v-if="scope.row.correctRate >= 99" style="color:#00cdca">
            {{ tools.setZero(scope.row.correctRate) }}
          </span>
          <span v-else style="color:red">{{
            tools.setZero(scope.row.correctRate)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="是否达标" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.standard == true" style="color:#00cdca"
            >是</span
          >
          <span v-else-if="scope.row.standard == false" style="color:red"
            >否</span
          >
          <span v-else>-</span>
        </template>
      </el-table-column>

      <el-table-column label="上周正确率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.lastCorrectRate >= 99" style="color:#00cdca">
            {{ tools.setZero(scope.row.lastCorrectRate) }}
          </span>
          <span v-else style="color:red">{{
            tools.setZero(scope.row.lastCorrectRate)
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="较上周" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!-- <span>{{ scope.row.thanLast }}%</span> -->
          <span v-if="scope.row.thanLast >= 0" style="color:#00cdca">{{
            tools.setZero(scope.row.thanLast)
          }}</span>
          <span v-else style="color:red">{{
            tools.setZero(scope.row.thanLast)
          }}</span>
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
  computed: { ...mapState(["datasourceStore"]) },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {
    //设置来源名称
    setDataName(data) {
      // if (data) {
      //   for (var key in this.datasourceStore) {
      //     if (data == this.datasourceStore[key].itemCode) {
      //       return this.datasourceStore[key].itemName;
      //     }
      //   }
      // }
    }
  }
};
</script>
<style scoped lang="less">
.One-table /deep/.el-table .cell {
  height: 27px;
  line-height: 27px;
}
</style>