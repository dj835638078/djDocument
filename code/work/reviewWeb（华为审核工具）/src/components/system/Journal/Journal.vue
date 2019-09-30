<template>
  <div class="Journal">
    <!--**********************-->
    <div class="popBox">
      <el-dialog
        title="查询"
        :visible.sync="judgeQuery"
        :modal-append-to-body="false"
        :append-to-body="true"
        width="730px"
        top="10vh"
      >
        <el-form :inline="true" :model="list" class="demo-form-inline">
          <div class="journalOne">
            <el-form-item>
              <span class="lableName">开始时间：</span>
              <el-date-picker
                v-model="list.beginTime"
                type="date"
                placeholder="请选择开始时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <span class="lableName">结束时间：</span>
              <el-date-picker
                v-model="list.endTime"
                type="date"
                placeholder="请选择结束时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <span class="lableName">所属模块：</span>
              <el-input
                v-model="list.moduleType"
                placeholder="请填写所属模块"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <span class="lableName">操作类型：</span>
              <el-input
                v-model="list.operateType"
                placeholder="请填写操作类型"
              ></el-input>
            </el-form-item>

            <el-form-item>
              <span class="lableName">服务地址：</span>
              <el-input
                v-model="list.classPath"
                placeholder="请填写服务地址"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <span class="lableName">结果：</span>
              <el-select v-model="list.status" placeholder="请选择">
                <el-option
                  v-for="item in lookUp.OPERATE_LOG_STATUS"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!--**********************-->
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="日志列表" name="first"> </el-tab-pane>
        <el-tab-pane
          v-if="judgeLabel"
          label="日志详情"
          name="second"
        ></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div v-if="activeName == 'first'">
      <!-- 一层条件begin -->
      <div
        class="search-box-one"
        style="width:80%;overflow:visible;margin-top: -14px;"
      >
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
        style="width:80%;height:52px;float:left;margin-top:10px;"
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
          @click="confirm"
          style="margin-right:20px;margin-top:20px;"
        >
          <i class="fa fa-search"></i>查询
        </div>
      </div>
      <div class="clear"></div>
      <div>
        <el-table
          :data="journalList"
          border
          style="width: 100%"
          tooltip-effect="light"
          :height="tableHeight"
        >
          <el-table-column
            type="index"
            width="50"
            label="NO."
            align="center"
            fixed="left"
          >
          </el-table-column>
          <el-table-column fixed="left" label="操作" align="left" width="50">
            <template slot-scope="scope">
              <div
                style="color:#337ab7;"
                class="downloadIcon fa fa-search"
                @click="look(scope.row)"
                title="查看日志"
              ></div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作员"
            align="left"
            width="120"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div v-text="tools.setRole(scope.row.fwmAccount)"></div>
            </template>
          </el-table-column>
          <el-table-column label="记录时间" align="left" width="150">
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.timeStamp, 1)"></div>
            </template>
          </el-table-column>

          <el-table-column prop="moduleType" label="所属模块" width="140">
          </el-table-column>
          <el-table-column prop="operateType" label="操作类型" width="240">
          </el-table-column>
          <!--<el-table-column
            prop="classPath"
            label="服务地址"
            :show-overflow-tooltip="true"
          >
          </el-table-column>-->
          <el-table-column prop="hostIp" label="用户IP" width="140">
          </el-table-column>
          <el-table-column prop="hostName" label="主机名称" width="200">
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
    <div v-if="activeName == 'second'">
      <div class="journal-info">
        <div>
          <div class="journal-info-one-left">服务地址</div>
          <div class="journal-info-one-right">
            <el-input v-model="classPath"></el-input>
          </div>
        </div>
        <div class="journal-info-two">
          <div class="journal-info-two-left">请求参数</div>
          <div class="journal-info-two-right">
            <el-input type="textarea" v-model="reqMsg"></el-input>
          </div>
        </div>
        <div class="journal-info-two">
          <div class="journal-info-two-left">返回参数</div>
          <div class="journal-info-two-right">
            <el-input type="textarea" v-model="respMsg"></el-input>
          </div>
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
        status: ""
      }
    };
  },
  mounted() {
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
      this.list.classPath = "";
      this.list.status = "";
      this.fwmAccount = "";
    }
  },
  components: { human },
  methods: {
    query() {
      this.judgeQuery = true;
    },
    cancel() {
      this.judgeQuery = false;
    },

    confirm() {
      this.judgeQuery = false;
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
    //查询日志接口
    queryJournal() {
      let vm = this;
      let data = {
        beginTime: vm.list.beginTime,
        endTime: vm.list.endTime,
        moduleType: vm.list.moduleType,
        operateType: vm.list.operateType,
        classPath: vm.list.classPath,
        status: vm.list.status,
        fwmAccount: vm.fwmAccount
      };
      api
        .post(
          `./manage/service/servicelog/page?currentPage=${
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
      if (row.label == "日志列表") {
        //this.activeName = "first";
        this.judgeLabel = false;
      }
    },
    //查看日志
    look(val) {
      //打开日志开关
      this.judgeLabel = true;
      //光标对位
      this.activeName = "second";
      let vm = this;
      api
        .get(`./manage/service/servicelog/find?logId=${val.logId}`)
        .then(function(response) {
          if (response.status == 200) {
            vm.classPath = response.data.classPath;
            try {
              vm.reqMsg = JSON.stringify(
                JSON.parse(response.data.reqMsg),
                null,
                4
              );
            } catch (error) {
              vm.reqMsg = response.data.reqMsg;
            }
            try {
              vm.respMsg = JSON.stringify(
                JSON.parse(response.data.respMsg),
                null,
                4
              );
            } catch (error) {
              vm.respMsg = response.data.respMsg;
            }
          }
        })
        .catch(function(error) {});
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
.Journal {
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
