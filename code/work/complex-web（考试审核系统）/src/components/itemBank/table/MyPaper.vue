<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="标题"
        align="left"
        width="250"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span style="color:#00cdca;cursor:pointer;" @click="goPaper"
            >11111111111</span
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
          <span>图文</span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="stopNum"
        label="总分数"
        width="120"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="stopNum"
        label="得分数"
        width="120"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="stopNum"
        label="考试时长（分）"
        width="160"
      ></el-table-column>
      <el-table-column
        label="录入时间"
        align="left"
        width="230"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.createDate, 0)"></span>
        </template>
      </el-table-column>

      <el-table-column
        :show-overflow-tooltip="true"
        prop="remark"
        label="出题人"
        width="120"
      ></el-table-column>
    </el-table>
    <PaperTip :tipShow="tipShow" />
  </div>
</template>

<script>
import PaperTip from "./PaperTip";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tipShow: false
    };
  },
  props: ["tableData"],
  mounted() {},
  components: { PaperTip },
  methods: {
    goPaper() {
      this.tipShow = true;
    }
  }
};
</script>

<style scoped lang="less">
</style>