<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="试卷名称"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            style="color:#00cdca;cursor:pointer;"
            @click="goPaper(scope.row)"
            >{{ scope.row.testName }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="试卷类型"
        align="left"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ tools.setPaperType(scope.row.testType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="testScore"
        label="总分数"
        width="120"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="timeLimit"
        label="考试时长（分）"
        width="160"
      ></el-table-column>
      <el-table-column
        label="发布时间"
        align="left"
        width="230"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.releaseDate, 0)"></span>
        </template>
      </el-table-column>
    </el-table>
    <CarefulTip :tipShow="tipShow" :testId="testId" />
  </div>
</template>

<script>
import CarefulTip from "./CarefulTip";
export default {
  data() {
    return {
      tipShow: false,
      testId: ""
    };
  },
  props: ["tableData"],
  components: { CarefulTip },
  mounted() {},
  methods: {
    goPaper(val) {
      this.testId = val.testId;
      this.tipShow = true;
    }
  }
};
</script>

<style scoped lang="less">
</style>