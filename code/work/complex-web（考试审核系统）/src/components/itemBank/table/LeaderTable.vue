<template>
  <div class="normalTable">
    <div class="normalTable-tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我已考试" name="我已考试"> </el-tab-pane>
        <el-tab-pane label="试卷列表" name="试卷列表"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="normalTable-search">
      <div v-if="activeName == '我已考试'">
        <div class="search-one-box">
          <div class="search-one-box-name">试卷名称：</div>
          <div class="search-one-box-input">
            <el-input
              v-model="testName"
              placeholder="请输入试卷名称进行查询"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="search-one-box">
          <div class="search-one-box-name" style="width:76px;">交卷时间：</div>
          <div class="search-one-box-time">
            <el-date-picker
              v-model="startDate"
              type="datetime"
              placeholder="选择交卷时间"
            >
            </el-date-picker>
          </div>
          <div class="separate">-</div>
          <div class="search-one-box-time">
            <el-date-picker
              v-model="endDate"
              type="datetime"
              placeholder="选择交卷时间"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div v-if="activeName == '试卷列表'">
        <div class="taffTable-paper-serch">
          <div class="taffTable-paper-serch-box">
            <div class="taffTable-paper-serch-box-left">
              <el-input
                v-model="testName"
                placeholder="请输入试卷名称进行查询"
                :clearable="true"
              ></el-input>
            </div>
            <div class="taffTable-paper-serch-box-right" @click="query(1)">
              <i class="el-icon-search" style="margin-right: 10px;"></i>查询
            </div>
          </div>
        </div>
      </div>
      <div style="float:right" v-if="activeName == '我已考试'">
        <div class="query interval" @click="query">
          查询
        </div>
        <div class="release" v-if="!testName && !startDate && !endDate">
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
      </div>
    </div>
    <div class="normalTable-box">
      <Examine :tableData="list" v-if="activeName == '我已考试'" />
      <PaperTable :tableData="list" v-if="activeName == '试卷列表'" />
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
import Examine from "./leader/Examine";
import PaperTable from "./leader/PaperTable";
export default {
  data() {
    return {
      activeName: "我已考试",
      startDate: "",
      endDate: "",
      testName: "",
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      tabIndex: 0,
      list: []
    };
  },
  components: { Examine, PaperTable },
  computed: {},
  watch: {
    // fromPaper(newVal, oldVal) {
    //   if (newVal == "staff") {
    //     this.activeName = "试卷列表";
    //     this.getPaperList(1);
    //   }
    // },
    startDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    }
  },
  mounted() {
    if (this.$route.params.type == "1") {
      this.activeName = "试卷列表";
      this.tabIndex = 1;
      this.getPaperList(1);
    } else {
      this.getPaperList();
    }
  },
  methods: {
    //判断时间
    judgeTime() {
      if (this.startDate && this.endDate) {
        if (this.endDate < this.startDate) {
          this.endDate = "";
          this.$message({
            message: "结束时间不能早于开始时间",
            type: "error"
          });
        }
      }
    },
    // tab栏切换
    handleClick(tab, event) {
      this.tabIndex = tab.index;
      this.currentPage = 1;
      this.pageSize = 10;
      this.testName = "";
      this.startDate = "";
      this.endDate = "";
      if (tab.index == 1) {
      } else {
        this.$router.push({
          name: "paperResult"
        });
      }
      this.getPaperList(tab.index);
    },
    // 获取试卷列表
    getPaperList(index = 0) {
      let data = {
        testName: this.testName,
        startDate: this.startDate,
        endDate: this.endDate
      };
      let url = "./complex/service/test/findPageOfTested";
      if (index == 1) {
        url = "complex/service/test/findPageOfAllTested";
        data = { testName: this.testName };
      }
      this.api
        .post(
          `${url}?currentPage=${this.currentPage}&pageSize=${this.pageSize}`,
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
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPaperList(this.tabIndex);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPaperList(this.tabIndex);
    },
    query(index) {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getPaperList(index);
    },
    release() {
      this.testName = "";
      this.startDate = "";
      this.endDate = "";
      // this.currentPage = 1;
      // this.pageSize = 10;
      // this.totals = 0;
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
.normalTable-search /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
  height: 32px;
}
.taffTable-paper-serch /deep/.el-input__clear {
  margin-right: 80px;
}
.taffTable-paper-serch /deep/.el-input__inner {
  border-radius: 4px;
  // border: 1px solid #dcdfe6;
  height: 40px;
}
.normalTable-search {
  height: 32px;
  width: 100%;
  padding-bottom: 10px;
  margin-bottom: 10px;
  .taffTable-paper-serch {
    height: 40px;
    // padding: 20px 0;
    .taffTable-paper-serch-box {
      width: 500px;
      position: relative;
      height: 40px;
      .taffTable-paper-serch-box-left {
        width: 100%;
        height: 40px;
      }
      .taffTable-paper-serch-box-right {
        width: 78px;
        height: 38px;
        border-left: none;
        border-top-right-radius: 4px 4px;
        border-bottom-right-radius: 4px 4px;
        background: #f0f2f5;
        position: absolute;
        right: 1px;
        top: 1px;
        color: #2a2a2a;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
      }
    }
  }
  .search-one-box {
    height: 32px;
    float: left;
    margin-right: 20px;
    .search-one-box-name,
    .search-one-box-input {
      float: left;
    }
    .search-one-box-name {
      width: 76px;
      height: 32px;
      line-height: 32px;
      text-align: left;
    }
    .search-one-box-input {
      width: 190px;
      height: 32px;
    }
    .search-one-box-time {
      width: 190px;
      float: left;
    }
  }
}
</style>