<template>
  <div class="Record">
    <!-- 一层条件begin -->
    <div class="search-box-one" style="width:80%;overflow:visible;height:52px;">
      <div style="float:left;width:66%">
        <div style="margin-top:20px;">
          <div class="search-box-top-name" style="width: 47px;">时间：</div>
          <div class="box-two" style="width: calc(100% - 72px);float: left;">
            <div
              class="two-one-box"
              style="width: calc(50% - 6.5px); float: left;"
            >
              <div class="box-two-child">
                <el-date-picker
                  v-model="list.beginTime"
                  clear-icon=""
                  class="input-class"
                  type="date"
                  placeholder="请选择开始时间"
                >
                </el-date-picker>
              </div>
            </div>
            <div
              class="Pul"
              style="float: left;margin-left: 4px;margin-right: 4px;margin-top: 9px;"
            >
              -
            </div>
            <div
              class="two-one-box"
              style="width: calc(50% - 6.5px - 1.3%);float: left;"
            >
              <div class="box-two-child">
                <el-date-picker
                  v-model="list.endTime"
                  clear-icon=""
                  class="input-class"
                  type="date"
                  placeholder="请选择结束时间"
                >
                </el-date-picker>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="width:33%;float:left;margin-top:20px;">
        <div style="width:100%;float:left;">
          <div class="search-box-top-name" style="width: 60px;">操作员：</div>
          <div
            style="width:calc(100% - 85px - 2.3%);float:right;padding-right:2.3%"
          >
            <human val="fwmAccount" :showYN="fwmAccount" />
          </div>
        </div>
      </div>
    </div>

    <!-- 一层条件end -->
    <!-- 二层条件begin -->
    <div
      class="search-box-two"
      style="width:80%;height:32px;float:left;margin-top:10px;"
    >
      <div style="float:left;width:66%;">
        <div style="width:50%;float:left;">
          <div style="width:100%;float:left;">
            <div class="search-box-top-name" style="width: 47px;">模块：</div>
            <div
              style="width:calc(100% - 72px - 2.3%);float:right;padding-right:2.3%"
            >
              <el-input
                v-model="list.moduleType"
                placeholder="请输入模块"
                style="width:100%;"
              ></el-input>
            </div>
          </div>
        </div>
        <div style="width:50%;float:left;">
          <div style="width:100%;float:left;">
            <div class="search-box-top-name" style="width: 47px;">类型：</div>
            <div
              style="width:calc(100% - 72px - 2.3%);float:right;padding-right:2.3%"
            >
              <el-input
                v-model="list.operateType"
                placeholder="请输入类型"
                style="width:100%;"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <div style="width:33%;float:left;">
        <div style="width:100%;float:left;">
          <div class="search-box-top-name" style="width: 60px;">结果：</div>
          <div
            style="width:calc(100% - 85px - 2.3%);float:right;padding-right:2.3%"
          >
            <el-select
              v-model="list.status"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in lookUp.OPERATE_LOG_STATUS"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
    <!-- 二层条件end -->
    <div class="search-box-right" style="overflow:visible;">
      <div
        class="query"
        v-if="journalList.length"
        @click="exportList"
        style="margin-right:20px;margin-top:20px;"
      >
        <i class="fa fa-file-excel-o"></i>导出
      </div>
      <div v-else class="release" style="margin-right:20px;margin-top:20px;">
        <i class="fa fa-file-excel-o"></i>导出
      </div>
      <div
        class="query"
        @click="confirm"
        style="margin-right:20px;margin-top:20px;"
      >
        <i class="fa fa-search"></i>查询
      </div>
    </div>
    <div class="clear"></div>
    <div style="margin-top:20px;">
      <el-table
        :data="journalList"
        border
        style="width: 100%"
        tooltip-effect="light"
        :height="tableHeight - 30"
      >
        <el-table-column
          type="index"
          width="50"
          label="NO."
          align="center"
          fixed="left"
        >
        </el-table-column>
        <el-table-column label="时间" align="left" width="140">
          <template slot-scope="scope">
            <div v-text="tools.setFormTime(scope.row.timeStamp, 1)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作员"
          align="left"
          width="100"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div v-text="tools.setRole(scope.row.fwmAccount)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="moduleType" label="模块" width="100">
        </el-table-column>
        <el-table-column prop="operateType" label="类型" width="150">
        </el-table-column>
        <el-table-column
          prop="operateContent"
          label="内容"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="结果" align="center" width="60">
          <template slot-scope="scope">
            <div
              :class="[
                setStatus(scope.row.status) == '成功'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              v-text="setStatus(scope.row.status)"
            ></div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging-box">
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totals"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import human from "../../common/Human";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Journal",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "first",
      //判断哪个标签
      judgeLabel: false,
      judgeQuery: false,
      classPath: "",
      reqMsg: "",
      respMsg: "",
      fwmAccount: "",
      journalList: [],
      list: {
        beginTime: "",
        endTime: "",
        moduleType: "",
        operateType: "",
        classPath: "",
        beginTimeE: "",
        endTimeE: "",
        moduleTypeE: "",
        operateTypeE: "",
        classPathE: ""
      }
    };
  },
  mounted() {
    this.list.beginTime = new Date();
    this.list.endTime = new Date();
    this.queryJournal();
  },
  computed: {
    ...mapState(["tableHeight", "lookUp"])
  },
  watch: {
    judgeQuery() {
      this.list.beginTime = "";
      this.list.endTime = "";
      this.list.moduleType = "";
      this.list.operateType = "";
      this.list.status = "";
      this.fwmAccount = "";
    }
  },
  components: { human },
  methods: {
    confirm() {
      this.list.beginTimeE = this.list.beginTime;
      this.list.endTimeE = this.list.endTime;
      this.list.moduleTypeE = this.list.moduleType;
      this.list.operateTypeE = this.list.operateType;
      this.list.statusE = this.list.status;
      this.fwmAccountE = this.fwmAccount;
      this.queryJournal();
    },
    //设置状态
    setStatus(val) {
      if (val == 0) {
        return "失败";
      }
      if (val == 1) {
        return "成功";
      }
    },
    goExport() {
      this.$confirm("导出成功，是否前往【我的导出】页面查看详情?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "success"
      })
        .then(() => {
          this.$router.push({
            name: "ExportList"
          });
        })
        .catch(() => {});
    },
    exportList() {
      let vm = this;
      let data = {
        beginTime: vm.list.beginTimeE,
        endTime: vm.list.endTimeE,
        moduleType: vm.list.moduleTypeE,
        operateType: vm.list.operateTypeE,
        status: vm.list.statusE,
        fwmAccount: vm.fwmAccountE
      };
      api
        .post(`./manage/service/servicelog/operate/export`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.goExport();
          }
        })
        .catch(function(error) {});
    },
    //查询日志接口
    queryJournal() {
      let vm = this;
      let data = {
        beginTime: vm.list.beginTime,
        endTime: vm.list.endTime,
        moduleType: vm.list.moduleType,
        operateType: vm.list.operateType,
        status: vm.list.status,
        fwmAccount: vm.fwmAccount
      };
      api
        .post(
          `./manage/service/servicelog/operate/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.journalList = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    //标签操作
    handleClick(row) {
      if (row.label == "操作记录") {
        //this.activeName = "first";
        this.judgeLabel = false;
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryJournal();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryJournal();
    }
  }
};
</script>

<style scoped lang="less">
.Record {
  .input-class {
    width: 100%;
  }
  .journal-info {
    margin: 20px;
    border: 1px solid #f0f2f5;
    overflow: hidden;
    .journal-info-one-left {
      width: 120px;
      float: left;
      text-align: center;
      line-height: 53px;
      height: 53px;
      background: #fafafa;
      color: #1890ff;
    }
    .journal-info-one-right {
      float: left;
      width: calc(100% - 160px);
      line-height: 53px;
      padding: 0 20px;
    }
    .journal-info-two {
      overflow: hidden;
      border-top: 1px solid #f0f2f5;
      width: 100%;
      .journal-info-two-left {
        width: 120px;
        float: left;
        text-align: center;
        line-height: 110px;
        min-height: 110px;
        background: #fafafa;
        color: #1890ff;
        height: 100%;
        margin-bottom: -10000px;
        padding-bottom: 10000px;
      }
      .journal-info-two-right {
        float: left;
        width: calc(100% - 160px);
        line-height: 53px;
        padding: 0 20px;
        margin-bottom: -10000px;
        padding-bottom: 10000px;
      }
    }
  }
  .el-textarea {
    margin: 15px 0;
  }
  .el-textarea /deep/ .el-textarea__inner {
    min-height: 120px !important;
  }
}
</style>
