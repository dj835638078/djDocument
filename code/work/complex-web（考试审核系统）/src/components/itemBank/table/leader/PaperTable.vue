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
        label="公开范围"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            v-text="
              tools.getRegionName(scope.row.regions) ||
                tools.setPaperType(scope.row.testType)
            "
          ></span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="left">
        <template slot-scope="scope">
          <!--<span v-if="scope.row.paperType=='1'" 
            style="color: rgb(0, 205, 202); cursor: pointer;"
           @click="download(scope.row)">导出</span>-->
          <div v-if="scope.row.paperType=='1'"
            style="color:#f56c6c;cursor: pointer;"
            class="downloadIcon fa fa-download"
            @click="download(scope.row)"
            title="导出考试成绩"
          ></div>
        </template>
      </el-table-column>
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
  methods: {
    download(val) {
      location.href =
        location.origin + "/complex/publicservice/test/exportTestedInfo?testId=" + val.testId;
    },
    goPaper(val) {
      this.$router.push({
        name: "staff",
        params: {
          testId: val.testId,
          name: val.testName,
          // range: val.regions.join("/"),
          range:
            this.tools.getRegionName(val.regions) ||
            this.tools.setPaperType(val.testType),
          type: val.testType,
          num: val.testScore,
          time: val.timeLimit
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.downloadIcon {
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    height: 100%;
    width: 20px;
}
</style>