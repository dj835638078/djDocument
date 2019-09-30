<template>
  <div class="information-table">
    <dialogTip
      :tipShow="tipShow"
      :tipMessage="tipMessage"
      :hideCancel="hideCancel"
    />
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="试卷名称"
        align="left"
        width="250"
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
      ></el-table-column>
      <el-table-column label="得分数" align="left">
        <template slot-scope="scope">
          {{ tools.setPaperNum(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="timeLimit"
        label="考试时长（分）"
        width="160"
      ></el-table-column>
      <el-table-column
        label="交卷时间"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.testEndDate, 1)"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dialogTip from "../../../public/DialogTip";
export default {
  data() {
    return {
      tipShow: false,
      tipMessage: "",
      hideCancel: "hideCancel"
    };
  },
  props: ["tableData"],
  components: { dialogTip },
  mounted() {},
  methods: {
    goPaper(val) {
      if (val.markDate) {
        this.$router.push({
          name: "examinationResults",
          params: {
            testId: val.testId,
            paperCode: val.paperCode,
            fwmAccount: "my"
          }
        });
      } else {
        this.tipShow = true;
        this.tipMessage = "该试卷正在审阅~请稍后查看~";
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>