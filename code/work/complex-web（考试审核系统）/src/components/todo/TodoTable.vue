<template>
  <div class="normalTable">
    <div class="normalTable-tab">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="待办列表" name="待办列表"> </el-tab-pane>
        <el-tab-pane label="已办列表" name="已办列表"> </el-tab-pane>
      </el-tabs>
    </div>
    <div class="normalTable-search">
      <div>
        <div class="search-one-box">
          <div class="search-one-box-name">类型：</div>
          <div class="search-one-box-input">
            <el-select v-model="flowType" placeholder="请选择" clearable>
              <el-option
                v-for="(item, index) in lookUp.FWM_FLOW_TYPE"
                :label="item.itemName"
                :value="item.itemCode"
                :key="index"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="search-one-box">
          <div class="search-one-box-name" style="width:76px;">
            {{ searchTime }}：
          </div>
          <div class="search-one-box-time">
            <el-date-picker
              v-model="beginTime"
              type="date"
              :placeholder="searchTimeTip"
            >
            </el-date-picker>
          </div>
          <div class="separate">-</div>
          <div class="search-one-box-time">
            <el-date-picker
              v-model="endTime"
              type="date"
              :placeholder="searchTimeTip"
            >
            </el-date-picker>
          </div>
        </div>
      </div>
      <div style="float:right">
        <div class="query interval" @click="query">
          查询
        </div>
        <div class="release" v-if="!flowType && !beginTime && !endTime">
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
      </div>
    </div>
    <div class="normalTable-box">
      <todoList :tableData="list" v-if="activeName == '待办列表'" />
      <doneList :tableData="list" v-if="activeName == '已办列表'" />
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
import todoList from "./todoList";
import doneList from "./doneList";
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeName: "待办列表",
      searchTime: "发起时间",
      searchTimeTip: "请选择发起时间",
      beginTime: "",
      endTime: "",
      flowType: "",
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      list: [],
      tabIndex: 0
    };
  },
  components: { todoList, doneList },
  computed: { ...mapState(["lookUp"]) },
  watch: {
    beginTime() {
      this.judgeTime();
    },
    endTime() {
      this.judgeTime();
    }
  },
  mounted() {
    if (this.$route.params.type == "1") {
      this.activeName = "已办列表";
      this.searchTime = "评审时间";
      this.searchTimeTip = "请选择评审时间";
      this.tabIndex = 1;
      this.getPaperList(1);
    } else {
      this.getPaperList();
    }
  },
  methods: {
    // tab栏切换
    handleClick(tab, event) {
      this.currentPage = 1;
      this.pageSize = 10;
      this.flowType = "";
      this.beginTime = "";
      this.endTime = "";
      this.tabIndex = tab.index;
      if (tab.index == 1) {
        this.searchTime = "评审时间";
        this.searchTimeTip = "请选择评审时间";
      } else {
        this.searchTime = "发起时间";
        this.searchTimeTip = "请选择发起时间";
        this.$router.push({
          name: "todoList"
        });
      }
      this.getPaperList(tab.index);
    },
    // 获取已办列表
    getPaperList(index = 0) {
      let data = {
        flowType: this.flowType,
        beginTime: this.beginTime,
        endTime: this.endTime
      };
      let url = "./complex/service/task/page";
      if (index == 1) {
        url = "complex/service/task/done/page";
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
    //判断时间
    judgeTime() {
      if (this.beginTime && this.endTime) {
        if (this.endTime < this.beginTime) {
          this.endTime = "";
          this.$message({
            message: "结束时间不能早于开始时间",
            type: "error"
          });
        }
      }
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
    query() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getPaperList(this.tabIndex);
    },
    release() {
      this.flowType = "";
      this.beginTime = "";
      this.endTime = "";
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