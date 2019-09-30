<template>
  <div class="Situation-two">
    <h3 class="reportFormTitle" style="margin-top:20px;">二、人力情况</h3>
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column
        prop="earlyPeopleNum"
        label="月初人数"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="endPeopleNum"
        label="月末人数"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="leavePeopleNum"
        label="离职人数"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="dismissPeopleNum"
        label="辞退人数"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column label="流失率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.lossRate }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="淘汰率" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.outRate }}%</span>
        </template>
      </el-table-column>
    </el-table>
    <h3
      class="reportFormTitle"
      v-if="tableData[0].workSummary"
      style="margin-top:20px;"
    >
      三、月工作总结
    </h3>
    <div
      v-if="tableData[0].workSummary"
      v-html="tableData[0].workSummary"
      style="padding:0px 0 20px 0;"
    ></div>
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
      if (data) {
        for (var i = 0; i < this.datasourceStore.length; i++) {
          if (data == this.datasourceStore[i].itemCode) {
            return this.datasourceStore[i].itemName;
          }
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.Situation-two /deep/ strong {
  font-weight: 600;
}
.Situation-two /deep/ em {
  font-style: oblique;
}
.Situation-two /deep/ i {
  font-style: italic;
}
.Situation-two /deep/ b {
  font-weight: bold;
}
.Situation-two /deep/ u {
  text-decoration: underline;
}
.Situation-two /deep/ s {
  text-decoration: line-through;
}
.Situation-two /deep/ ol {
  padding-left: 40px;
  list-style-type: decimal;
}
.Situation-two /deep/ ul {
  padding-left: 40px;
  list-style: initial;
}
.Situation-two /deep/ menu {
  padding-left: 40px;
  list-style: initial;
}
.Situation-two /deep/ h1 {
  font-weight: normal;
  font-size: 2em;
}
.Situation-two /deep/ h2 {
  font-weight: normal;
  font-size: 1.5em;
}
.Situation-two /deep/ h3 {
  font-weight: normal;
  font-size: 1.17em;
}
.Situation-two /deep/ h4 {
  font-weight: normal;
  font-size: 1em;
}
.Situation-two /deep/ h5 {
  font-weight: normal;
  font-size: 0.83em;
}
.Situation-two /deep/ h6 {
  font-weight: normal;
  font-size: 0.67em;
}
.Situation-two /deep/ pre.ql-syntax {
  background-color: #23241f;
  color: #f8f8f2;
  overflow: visible;
}
.Situation-two /deep/ blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}
.Situation-two /deep/ .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 3em;
}
.Situation-two /deep/ .ql-indent-2:not(.ql-direction-rtl) {
  padding-left: 6em;
}
.Situation-two /deep/ .ql-indent-3:not(.ql-direction-rtl) {
  padding-left: 9em;
}
.Situation-two /deep/ .ql-indent-4:not(.ql-direction-rtl) {
  padding-left: 12em;
}
.Situation-two /deep/ .ql-indent-5:not(.ql-direction-rtl) {
  padding-left: 15em;
}
.Situation-two /deep/ .ql-indent-6:not(.ql-direction-rtl) {
  padding-left: 18em;
}
.Situation-two /deep/ .ql-indent-7:not(.ql-direction-rtl) {
  padding-left: 21em;
}
.Situation-two /deep/ .ql-indent-8:not(.ql-direction-rtl) {
  padding-left: 24em;
}
.Situation-two /deep/ .ql-align-right {
  text-align: right;
}
.Situation-two /deep/ .ql-direction-rtl {
  direction: rtl;
  text-align: inherit;
}
.Situation-two /deep/ .ql-size-large {
  font-size: 1.5em;
}
.Situation-two /deep/ .ql-size-small {
  font-size: 0.75em;
}
.Situation-two /deep/ .ql-size-huge {
  font-size: 2.5em;
}
.Situation-two /deep/ .ql-font-serif {
  font-family: Georgia, Times New Roman, serif;
}
.Situation-two /deep/ .ql-font-monospace {
  font-family: Monaco, Courier New, monospace;
}
.Situation-two /deep/ .ql-align-center {
  text-align: center;
}
.Situation-two /deep/ .ql-align-right {
  text-align: right;
}
.Situation-two /deep/ .ql-align-justify {
  text-align: justify;
}
.Situation-two /deep/.el-table .cell {
  height: 27px;
  line-height: 27px;
}
</style>