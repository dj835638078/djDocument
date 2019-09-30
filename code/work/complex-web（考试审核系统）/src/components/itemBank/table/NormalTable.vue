<template>
  <div class="normalTable">
    <div class="normalTable-tab">
      <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="试卷列表" name="试卷列表"> </el-tab-pane>
        <el-tab-pane label="我的试卷" name="我的试卷"> </el-tab-pane>
      </el-tabs> -->
    </div>
    <div class="normalTable-box">
      <!-- <PaperTable :tableData="list" v-if="activeName == '试卷列表'" />
      <MyPaper :tableData="list" v-if="activeName == '我的试卷'" /> -->
      <PaperTable :tableData="list" />
    </div>
    <div style="margin-top:20px;height:32px;">
      <!-- v-if="totals > pageSize"-->
      <el-pagination
        style="text-align:right;"
        background
        :total="totals"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import PaperTable from "./PaperTable";
import MyPaper from "./MyPaper";
export default {
  data() {
    return {
      // activeName: "试卷列表",
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      list: []
    };
  },
  components: { PaperTable, MyPaper },
  computed: {},
  mounted() {
    this.getPaperList();
  },
  watch: {},
  methods: {
    getPaperList() {
      let data = {};
      this.api
        .post(
          `./complex/service/test/findPage?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(response => {
          if (response.status == 200) {
            this.list = response.data.result;
            this.totals = response.data.page.totalRows;
          }
        })
        .catch(error => {});
    },
    // tab栏切换
    // handleClick(tab, event) {
    //   this.currentPage = 1;
    //   this.pageSize = 10;
    //   this.getPaperList();
    // },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPaperList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPaperList();
    }
  }
};
</script>

<style scoped lang="less">
.normalTable-tab /deep/ .el-tabs__item.is-active {
  color: #00cdca;
}
.normalTable-tab /deep/ .el-tabs__active-bar {
  background-color: #00cdca;
}
.normalTable-tab /deep/ .el-tabs__item:hover {
  color: #00cdca;
}
</style>