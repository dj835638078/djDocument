<template>
  <div class="ImgQuality">
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="质检内容" name="1" style="color:red;">
        </el-tab-pane>
        <el-tab-pane label="质检记录" name="2"></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <!-- one -->
    <div class="search-box-one">
      <div class="search-box-top">
        <div class="search-box-top-name"><span>*</span>内容选择：</div>
        <div class="search-box-top-right">
          <div class="one-box">
            <div class="one-box-child">
              <el-select v-model="dataType1" placeholder="请选择质检类型">
                <el-option
                  v-for="item in options1"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="one-box">
            <div class="one-box-child">
              <el-select
                v-model="dataType2"
                placeholder="请选择质检通道"
                :disabled="judgetype2"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="one-box">
            <div class="one-box-child" style="width:100%;margin-right:0px;">
              <el-select
                v-model="dataType3"
                placeholder="请选择质检来源"
                :disabled="judgetype3"
              >
                <el-option
                  v-for="item in options3"
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
      <div style="width:30%;float:left;" v-if="tag == 1">
        <div
          class="search-box-two-right-name"
          style="width:90px;text-align:right;padding-right:5px;"
        >
          审核状态：
        </div>
        <div style="width:calc(100% - 115px);float:left;padding-right:20px">
          <el-select
            v-model="processResult"
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in lookUp.TASK_APPROVAL_RESULT"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div style="width:30%;float:left;" v-if="tag == 2">
        <div
          class="search-box-two-right-name"
          style="width:90px;text-align:right;padding-right:5px;"
        >
          质检状态：
        </div>
        <div style="width:calc(100% - 115px);float:left;padding-right:20px">
          <el-select
            v-model="checkResult"
            placeholder="请选择"
            style="width:100%"
          >
            <el-option
              v-for="item in lookUp.TASK_APPROVAL_RESULT"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div>
      <div style="width:70%;float:left;">
        <div class="search-box-two" style="width:65%">
          <div class="search-box-top-name"><span>*</span>时间范围：</div>
          <div class="box-two">
            <div class="two-one-box" style="width:50%;">
              <div class="box-two-child">
                <el-date-picker
                  v-model="processDate"
                  clear-icon=""
                  type="datetime"
                  placeholder="选择时间范围："
                >
                </el-date-picker>
              </div>
              <div class="Pul">-</div>
            </div>
            <div class="two-one-box" style="width:50%;">
              <div class="box-two-child">
                <el-date-picker
                  v-model="endProcessDate"
                  clear-icon=""
                  type="datetime"
                  placeholder="选择时间范围："
                >
                </el-date-picker>
              </div>
            </div>
          </div>
        </div>
        <div style="width:35%;float:left;">
          <div style="width:100%;float:left;">
            <div class="search-box-two-right-name">账号UIN：</div>
            <div
              style="width:calc(100% - 80px - 2.3%);float:right;padding-right:2.3%"
            >
              <el-input
                v-model="accountId"
                placeholder="请输入内容"
                style="width:100%;"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <div style="width:30%;float:left;margin-top:20px;" v-if="tag == 1">
        <div
          class="search-box-two-right-name"
          style="width:90px;text-align:right;padding-right:5px;"
        >
          审核员：
        </div>
        <div style="width:calc(100% - 115px);float:left;padding-right:20px">
          <el-input
            v-model="processAccount"
            placeholder="请输入内容"
            style="width:100%;"
          ></el-input>
        </div>
      </div>
      <div style="width:30%;float:left;margin-top:20px;" v-if="tag == 2">
        <div
          class="search-box-two-right-name"
          style="width:90px;text-align:right;padding-right:5px;"
        >
          rowkey：
        </div>
        <div style="width:calc(100% - 115px);float:left;padding-right:20px">
          <el-input
            v-model="rowkey"
            placeholder="请输入内容"
            style="width:100%;"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <!--one-->
    <div class="box-btn" v-if="tag == 1">
      <div
        v-if="dataType3 && processDate && endProcessDate && tableData.length"
        class="new"
        style="margin-bottom:0px;margin-right:20px;float:right"
        @click="nextBatch"
      >
        下一批
      </div>
      <div
        v-else
        class="release"
        style="margin-bottom:0px;margin-right:20px;float:right"
      >
        下一批
      </div>
      <div
        v-if="dataType3 && processDate && endProcessDate && !tableData.length"
        class="new"
        style="margin-bottom:0px;float:right"
        @click="casual"
      >
        <i class="fa fa-recycle"></i>抽检
      </div>
      <div v-else class="release" style="margin-bottom:0px;float:right">
        <i class="fa fa-recycle"></i>抽检
      </div>
    </div>
    <!--two-->
    <div class="box-btn" v-if="tag == 2">
      <div
        v-if="dataType3 && processDate && endProcessDate"
        class="query"
        style="margin-bottom:0px;margin-right:20px;float:right"
        @click="query"
      >
        <i class="fa fa-search"></i>查询
      </div>
      <div
        v-else
        class="release"
        style="margin-bottom:0px;margin-right:20px;float:right"
      >
        <i class="fa fa-search"></i>查询
      </div>
    </div>

    <div style="width:100%;margin-top:20px;" v-if="tableData.length">
      <el-table
        :data="tableData"
        border
        :height="tableHeightThree"
        tooltip-effect="light"
        style="width: 100%"
      >
        <el-table-column label="NO." type="index" width="50" align="center">
        </el-table-column>
        <el-table-column
          label="标题"
          min-width="200"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color:#1890FF;cursor:pointer;"
              @click="openDetail(scope.row)"
            >
              <el-tooltip
                content="高转发量"
                placement="bottom"
                effect="light"
                v-if="scope.row.forwardingVolume > 300"
              >
                <span class="fa fa-star" style="color:#F5A623;"
                  >&nbsp;</span
                > </el-tooltip
              ><span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span
              >{{ scope.row.atricleTitle }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-if="tag == 1" label="审核结果" align="left">
          <template slot-scope="scope">
            <div
              :class="[
                tools.setStatus(scope.row.processResult) == '通过'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              v-text="tools.setStatus(scope.row.processResult)"
            ></div>
          </template>
        </el-table-column>
        <el-table-column v-if="tag == 2" label="质检结果" align="left">
          <template slot-scope="scope">
            <div
              :class="[
                tools.setStatus(scope.row.checkResult) == '通过'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              v-text="tools.setStatus(scope.row.checkResult)"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="tag == 1"
          prop="processReason"
          min-width="150"
          label="不合格原因"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          v-if="tag == 2"
          prop="checkReson"
          min-width="150"
          label="不合格原因"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="rowkey"
          label="rowkey"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="accountId"
          label="账号UIN"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="accountName"
          label="账号名称"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column label="入库时间" align="left" width="160">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
          </template>
        </el-table-column>

        <el-table-column
          v-if="tag == 1"
          label="审核人"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.ownerAccount)"></span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="tag == 2"
          label="质检人"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.checkAccount)"></span>
          </template>
        </el-table-column>

        <el-table-column
          v-if="tag == 2"
          label="质检时间"
          align="left"
          width="160"
        >
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.checkDate, 1)"></span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="tag == 1"
          label="审核时间"
          align="left"
          width="160"
        >
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.processDate, 1)"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging-box" v-if="tableData.length">
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
    <div v-if="infoDialogFlag">
      <infoDialog :dataInfo="detailListVal" :title="title" />
    </div>
  </div>
</template>
<script>
import api from "@/api";
import infoDialog from "./infoDialog";
import { mapState, mapMutations } from "vuex";
export default {
  name: "ImgQuality",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "1",
      infoDialogFlag: false,
      detailListVal: "",
      title: "领单",
      tag: "1",
      options1: [],
      options2: [],
      options3: [],
      tableData: [],
      dataType1: "",
      judgetype1: false,
      dataType2: "",
      judgetype2: true,
      dataType3: "",
      judgetype3: true,
      checkResult: "",
      processResult: "",
      processDate: "",
      endProcessDate: "",
      accountId: "",
      rowkey: "",
      processAccount: ""
    };
  },
  mounted() {
    this.processDate = new Date().setMinutes(new Date().getMinutes() - 120);
    this.endProcessDate = new Date();
    this.getoptions();
  },
  computed: {
    ...mapState(["tableHeightThree", "lookUp"])
  },
  watch: {
    tag() {
      this.reset();
    },
    dataType1() {
      this.dataType2 = "";
      this.tableData = [];
      this.decideOne();
    },
    dataType2() {
      this.dataType3 = "";
      this.tableData = [];
      this.decideTwo();
    },
    //监听类型3
    dataType3() {
      if (this.dataType3) {
        if (this.tag == 1) {
          this.currentPage = 1;
          this.pageSize = 10;
          this.inquiry();
        }
      }
    },
    processDate() {
      this.judgeTime();
    },
    endProcessDate() {
      this.judgeTime();
    }
  },
  components: { infoDialog },
  methods: {
    reset() {
      this.dataType1 = "";
      this.dataType2 = "";
      this.dataType3 = "";
      this.processDate = new Date().setMinutes(new Date().getMinutes() - 120);
      this.endProcessDate = new Date();
      this.processResult = "";
      this.checkResult = "";
      this.accountId = "";
      this.rowkey = "";
      this.processAccount = "";
      this.options2 = [];
      this.options3 = [];
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.tableData = [];
    },
    query() {
      let data = {
        //dataType: this.dataType3
        dataSource: this.dataType3,
        checkDate: this.processDate,
        endCheckDate: this.endProcessDate,
        checkResult: this.checkResult,
        rowKey: this.rowkey,
        accountId: this.accountId
      };
      let vm = this;
      api
        .post(
          `./manage/service/graphicsCheck/queryByVgc?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    casual() {
      let data = {
        //dataType: this.dataType3
        dataSource: this.dataType3,
        processDate: this.processDate,
        endProcessDate: this.endProcessDate,
        processResult: this.processResult,
        accountId: this.accountId,
        ownerAccount: this.processAccount
      };
      let vm = this;
      api
        .post(`./manage/service/graphicsCheck/add`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.currentPage = 1;
            vm.pageSize = 10;
            vm.inquiry();
          }
        })
        .catch(function(error) {});
    },
    //下一批
    nextBatch() {
      this.$confirm(
        "当前数据未质检完成，如果更换下一批数据将进入质检数据库被随机抽查！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          let data = {
            //dataType: this.dataType3
            dataSource: this.dataType3,
            processDate: this.processDate,
            endProcessDate: this.endProcessDate,
            processResult: this.processResult,
            accountId: this.accountId,
            ownerAccount: this.processAccount
          };
          let vm = this;
          api
            .post(`./manage/service/graphicsCheck/release`, data)
            .then(function(response) {
              if (response.status == 200) {
                vm.currentPage = 1;
                vm.pageSize = 10;
                vm.inquiry();
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {});
    },

    //查询单
    inquiry() {
      let data = {
        //dataType: this.dataType3
        dataSource: this.dataType3
      };
      let vm = this;
      api
        .post(
          `./manage/service/graphicsCheck/query?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    //获取内容下拉数据
    getoptions() {
      let vm = this;
      api
        .get(`./manage/service/channelLookUp/findLookUps?type=1_1&level=1`)
        .then(function(response) {
          vm.options1 = response.data;
        })
        .catch(function(error) {});
    },
    //校验
    decideOne() {
      if (this.dataType1) {
        this.judgetype2 = false;
        let vm = this;
        api
          .get(
            `./manage/service/channelLookUp/findLookUps?type=1_1&level=2&code=${
              this.dataType1
            }`
          )
          .then(function(response) {
            vm.options2 = response.data;
          })
          .catch(function(error) {});
      } else {
        this.judgetype2 = true;
      }
    },
    //校验
    decideTwo() {
      if (this.dataType2) {
        let vm = this;
        api
          .get(
            `./manage/service/channelLookUp/findLookUps?type=1_1&level=3&code=${
              this.dataType2
            }`
          )
          .then(function(response) {
            vm.options3 = response.data;
          })
          .catch(function(error) {});
        this.judgetype3 = false;
      } else {
        this.judgetype3 = true;
      }
    },
    //判断时间
    judgeTime() {
      if (this.processDate && this.endProcessDate) {
        if (this.endProcessDate < this.processDate) {
          this.endProcessDate = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    },

    //标签操作
    handleClick(row) {
      this.activeName = row.name;
      this.tag = row.name;
    },
    openDetail(val) {
      if (this.tag == 1) {
        this.title = "领单";
      }
      if (this.tag == 2) {
        this.title = "记录";
      }
      this.detailListVal = val.graphicId;
      this.infoDialogFlag = true;
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.tag == 1) {
        this.inquiry();
      } else {
        this.query();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.tag == 1) {
        this.inquiry();
      } else {
        this.query();
      }
    }
  }
};
</script>

<style scoped lang="less">
.ImgQuality {
  overflow: hidden;
  .box-two-child/deep/ .el-input__inner {
    padding-left: 25px;
    padding-right: 0px;
    line-height: 30px;
  }
}
</style>
