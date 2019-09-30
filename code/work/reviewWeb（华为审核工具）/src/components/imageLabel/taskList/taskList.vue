<template>
  <div class="task">
    <el-dialog title="提示" :visible.sync="derail" width="430px" top="10vh">
      <div class="task-title">
        <div class="el-icon-warning title-img"></div>
        <div class="title-name">{{ titleName }}</div>
      </div>
      <div class="task-point" v-if="testPoint == '1'">
        用于客户方需求变更、项目因其他因素暂停。
      </div>
      <div class="task-point" v-if="testPoint == '2'">
        用于项目暂定后，需要继续做项目，可执行此操作。
      </div>
      <div class="task-point" v-if="testPoint == '9'">
        发起验收后不支持驳回
      </div>
      <div class="task-point" v-if="testPoint == '10'">
        验收后不支持驳回
      </div>
      <div class="task-point" style="text-align:left;" v-if="testPoint == '3'">
        <div>
          用于客户方在未发布、已发布、处理中、
        </div>
        <div>
          已完成阶段时终止项目，终止后项目不可恢复。
        </div>
      </div>
      <div class="task-point" style="text-align:left;" v-if="testPoint == '4'">
        <div>
          用于需求变更时复制订单、或其他因素复制订单
        </div>
        <div>
          同一客户订单名称不能重复~
        </div>
      </div>
      <div class="input-box">
        <el-input
          v-if="testPoint == 1 || testPoint == 3"
          maxlength="50"
          v-model="logRemark"
          placeholder="请填写原因"
        ></el-input>
        <div
          v-if="judgeText"
          style="position:absolute;width:100%;height:20px;color:red;font-size:12px;top:35px;"
        >
          请填写终止原因
        </div>
      </div>
      <div class="task-btn">
        <div class="task-btn-N" @click="taskBtnN">
          取消
        </div>
        <div class="task-btn-Y" @click="taskBtnY">
          确定
        </div>
      </div>
    </el-dialog>
    <div class="task-search">
      <div class="task-search-box">
        <div class="task-search-top">
          <div class="task-search-top-box">
            <div class="task-search-top-box-name">客户名称：</div>
            <div class="task-search-top-box-text">
              <human
                val="clientAccount"
                :roleDiff="roleDiff"
                :showYN="clientAccount"
                :disabledFlag="disabledFlag"
                :result="resultNum"
              />
            </div>
          </div>
          <div class="space"></div>
          <div class="task-search-top-box">
            <div class="task-search-top-box-name">订单名称：</div>
            <div class="task-search-top-box-text">
              <el-input
                clearable
                maxlength="12"
                v-model="orderName"
                placeholder="请填写订单名称"
              ></el-input>
            </div>
          </div>
          <div class="space"></div>
          <div class="task-search-top-box">
            <div class="task-search-top-box-name">订单状态：</div>
            <div
              class="task-search-top-box-text"
              v-if="$route.name == 'taskList'"
            >
              <el-select
                v-model="orderStatus"
                placeholder="请选择订单状态"
                clearable
              >
                <el-option
                  v-for="(item, index) in lookUpStateb"
                  :label="item.itemName"
                  :value="item.itemCode"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
            <div
              class="task-search-top-box-text"
              v-if="$route.name == 'taskLista'"
            >
              <el-select
                v-model="orderStatus"
                placeholder="请选择订单状态"
                clearable
              >
                <el-option
                  v-for="(item, index) in lookUpStatea"
                  :label="item.itemName"
                  :value="item.itemCode"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="space"></div>
          <div class="task-search-top-box">
            <div class="task-search-top-box-name">订单编号：</div>
            <div class="task-search-top-box-text">
              <el-input
                clearable
                v-model="orderCode"
                placeholder="请填写订单编号"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="task-search-top" style="margin-top:20px;">
          <div class="task-search-top-box">
            <div class="task-search-top-box-name">项目经理：</div>
            <div class="task-search-top-box-text">
              <human
                val="manageAccount"
                :roleDiff="roleDiff"
                :showYN="manageAccount"
                :disabledFlag="!disabledFlag"
                :result="resultNum"
              />
            </div>
          </div>
          <div class="space"></div>
          <div class="task-search-top-box-name">创建时间：</div>
          <div class="task-search-top-box-time">
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </div>
          <div class="space">-</div>
          <div class="task-search-top-box-time">
            <el-date-picker
              v-model="endDate"
              type="date"
              placeholder="请选择时间"
            >
            </el-date-picker>
          </div>
          <div
            class="query"
            @click="resetForm"
            style="float:right;margin-bottom:0px"
          >
            <i class="fa fa-refresh"></i>重置
          </div>
          <div
            class="query"
            @click="researchForm"
            style="float:right;margin-bottom:0px"
          >
            <i class="fa fa-search"></i>查询
          </div>
        </div>
      </div>
    </div>
    <div style="overflow:hidden;padding: 20px 20px 0px 20px;">
      <div
        style="border-top:1px solid #f0f2f5;"
        v-if="$route.name != 'taskLista'"
      >
        <div class="query" @click="addTask" style="margin:14px 0px 14px 0px;">
          新增任务
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :height="
          $route.name == 'taskList' ? tableHeightThreeN : tableHeightThreeY
        "
        tooltip-effect="light"
        ref="table"
      >
        <el-table-column
          type="index"
          width="50"
          label="NO."
          align="center"
          fixed="left"
        >
        </el-table-column>
        <el-table-column
          fixed="left"
          label="操作"
          align="left"
          :width="$route.name == 'taskList' ? 150 : 70"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              type="text"
              size="small"
              title="查看详情"
              @click="goDetail(scope.row)"
              class="unifyBox"
            >
              <i class="fa fa-list-ul unify" style="color:#F5A623"></i>
            </span>
            <span v-if="$route.name != 'taskLista'">
              <span
                v-if="scope.row.orderStatus == 98"
                type="text"
                size="small"
                title="启动"
                @click="pulseOn(scope.row)"
                class="unifyBox"
              >
                <i class="fa fa-play-circle-o unify" style="color:#67C23A"></i>
              </span>
              <span
                v-else
                type="text"
                size="small"
                title="暂停"
                @click="suspend(scope.row)"
                class="unifyBox"
              >
                <i class="fa fa-pause-circle-o unify" style="color:#8A8A8A"></i>
              </span>

              <span
                type="text"
                size="small"
                title="复制"
                @click="copyData(scope.row)"
                class="unifyBox"
              >
                <i class="fa fa-files-o unify" style="color:#1890FF"></i>
              </span>
              <span
                type="text"
                size="small"
                title="终止"
                @click="ceaseData(scope.row)"
                class="unifyBox"
              >
                <i class="fa fa-ban unify" style="color:#F56C6C"></i>
              </span>
            </span>
            <!--&& tools.setRoles('clientA')-->
            <span
              type="text"
              size="small"
              title="编辑"
              @click="edit(scope.row)"
              class="unifyBox"
              v-if="scope.row.orderStatus == 1 && $route.name == 'taskList'"
            >
              <i class="fa fa-pencil-square-o unify" style="color:#1890FF"></i>
            </span>
            <span
              v-if="
                tools.setRoles('projectManagerA') && $route.name == 'taskLista'
              "
              type="text"
              size="small"
              title="分配"
              @click="distribution(scope.row)"
              class="unifyBox"
            >
              <i class="fa fa-users unify" style="color:#1890FF"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="验收" width="100">
          <template slot-scope="scope">
            <div
              class="query"
              style="margin:0;height:23px;line-height:23px"
              v-if="scope.row.orderStatus == 5 && $route.name == 'taskList'"
              @click="checkOperate(scope.row, '验收')"
            >
              验收
            </div>
            <div
              class="query"
              style="margin:0;height:23px;line-height:23px"
              v-else-if="
                $route.name == 'taskLista' && scope.row.orderStatus == 4
              "
              @click="checkOperate(scope.row, '发起验收')"
            >
              发起验收
            </div>
            <div
              class="query"
              style="background:rgba(0,0,0,0.25);margin:0;height:23px;line-height:23px"
              v-else-if="scope.row.orderStatus == 5"
            >
              等待验收
            </div>
            <div
              class="query"
              style="background: #67C23A;margin:0;height:23px;line-height:23px"
              v-else-if="scope.row.orderStatus == 6"
            >
              已验收
            </div>

            <div
              v-else
              class="query"
              style="background: rgba(0,0,0,0.25);margin:0;height:23px;line-height:23px"
            >
              验收
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          prop="orderCode"
          label="订单编号"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <!--区分1-->

        <el-table-column label="客户名称" align="left" width="120">
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.clientAccount)"></span>
          </template>
        </el-table-column>
        <!--区分2-->

        <el-table-column label="项目经理" align="left" width="120">
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.manageAccount)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderName"
          label="订单名称"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column label="订单状态" align="left">
          <template slot-scope="scope">
            <span v-text="tools.setLabelStatus(scope.row.orderStatus)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderQuantity"
          label="交付数量"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column label="创建人" align="left" width="120">
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.createBy)"></span>
          </template>
        </el-table-column>

        <el-table-column label="订单创建时间" align="left" width="150">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
          </template>
        </el-table-column>
        <el-table-column label="订单发布时间" align="left" width="150">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.startDate, 1)"></span>
          </template>
        </el-table-column>
        <el-table-column label="订单截止时间" align="left" width="150">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.endDate, 1)"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
</template>
<script>
import api from "@/api";
import human from "../../common/Human";
import { mapState } from "vuex";
export default {
  name: "task",
  data() {
    return {
      //人员控件重置控制
      resultNum: "1",
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      totalPage: 1,
      name: "",
      derail: false,
      //验证提示信息
      testPoint: "2",
      //入参
      orderId: "",
      status: "",
      logRemark: "",
      titleName: "",
      tableData: [],
      orderStatus: "",
      disabledFlag: false,
      roleDiff: true,
      orderName: "",
      orderCode: "",
      manageAccount: "",
      clientAccount: "",
      startDate: "",
      endDate: "",
      orderIdFlag: "",
      judgeText: false
    };
  },

  mounted() {
    this.getTaskList();
  },
  watch: {
    startDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    },
    "$route.name"() {
      this.resetForm();
    },
    userInfo(newVal, oldVal) {
      let vm = this;
      vm.listenRole();
    },
    derail() {
      if (!this.derail) {
        this.testPoint = 1;
        this.titleName = "";
        this.orderId = "";
        this.status = "";
        this.logRemark = "";
        this.judgeText = false;
      }
    }
  },
  components: { human },
  computed: {
    ...mapState([
      "lookUp",
      "lookUpStatea",
      "lookUpStateb",
      "tableHeightThreeN",
      "tableHeightThreeY",
      "userInfo"
    ])
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
    listenRole() {
      let vm = this;
      if (vm.tools.setRoles("projectManagerA")) {
        vm.disabledFlag = false;
        vm.manageAccount = vm.userInfo.fwmAccount;
        vm.$children[5]._data.humanAccount = vm.userInfo.fwmAccount;
        vm.$children[5]._data.humanAccountName = vm.userInfo.userName;
      }
      if (vm.tools.setRoles("clientA")) {
        vm.disabledFlag = true;
        vm.clientAccount = vm.userInfo.fwmAccount;
        vm.$children[1]._data.humanAccount = vm.userInfo.fwmAccount;
        vm.$children[1]._data.humanAccountName = vm.userInfo.userName;
      }
    },
    //*****************列表操作组 */
    //查看详情
    goDetail(val) {
      let roleName = "";
      if (this.$route.name == "taskLista") {
        roleName = "receive";
      } else {
        roleName = "publish";
      }
      this.$router.push({
        name: "orderDetail",
        params: {
          role: roleName,
          name: "look",
          id: val.orderId
        }
      });
    },
    //启用
    pulseOn(val) {
      //状态不是已验收已终止下可以启用
      if (val.orderStatus != "6" && val.orderStatus != "99") {
        //可以启用
        this.derail = true;
        this.testPoint = 2;
        this.titleName = "您确定要启用" + val.orderName + "吗？";
        this.orderId = val.orderId;
        this.status = val.orderStatus;
      } else {
        this.$confirm("订单在该状态下不可以启用。", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          showCancelButton: false
        });
      }
    },
    //暂停
    suspend(val) {
      //状态不是已验收已终止下可以暂停
      if (
        val.orderStatus != "6" &&
        val.orderStatus != "5" &&
        val.orderStatus != "99"
      ) {
        //可以暂停
        this.derail = true;
        this.testPoint = 1;
        this.orderId = val.orderId;
        this.status = val.orderStatus;
        this.titleName = "您确定要暂停" + val.orderName + "吗？";
      } else {
        this.$confirm("订单在该状态下不可以暂停。", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          showCancelButton: false
        });
      }
    },
    //复制
    copyData(val) {
      this.derail = true;
      this.testPoint = 4;
      this.titleName = "您确定要复制" + val.orderName + "吗？";
      this.orderIdFlag = val.orderId;
    },
    //终止
    ceaseData(val) {
      if (
        val.orderStatus != "5" &&
        val.orderStatus != "4" &&
        val.orderStatus != "6" &&
        val.orderStatus != "98" &&
        val.orderStatus != "99"
      ) {
        //可以终止
        this.derail = true;
        this.testPoint = 3;
        this.orderId = val.orderId;
        this.status = val.orderStatus;
        this.titleName = "您确定要终止" + val.orderName + "吗？";
      } else {
        this.$confirm("订单在该状态下不可以终止。", "提示", {
          confirmButtonText: "确定",
          type: "warning",
          showCancelButton: false
        });
      }
    },
    //编辑
    edit(val) {
      let roleName = "";
      if (this.$route.name == "taskLista") {
        roleName = "receive";
      } else {
        roleName = "publish";
      }
      this.$router.push({
        name: "tastDetail",
        params: { role: roleName, name: "edit", id: val.orderId }
      });
    },
    //分配
    distribution(val) {
      this.$router.push({
        name: "distribute",
        params: {
          type: val.orderStatus,
          id: val.orderId,
          clientAccount: val.clientAccount,
          orderName: val.orderName,
          orderCode: val.orderCode,
          endDate: val.endDate
        }
      });
    },
    //启动，暂停，终止
    handle() {
      let vm = this;
      let url;
      let data = {
        orderId: this.orderId,
        orderStatus: this.status,
        logRemark: this.logRemark
      };
      //暂停
      if (this.testPoint == 1) {
        url = "./manage/service/imglabelOrder/pause";
      }
      //启动
      if (this.testPoint == 2) {
        url = "./manage/service/imglabelOrder/startup";
      }
      //终止
      if (this.testPoint == 3) {
        url = "./manage/service/imglabelOrder/stop";
      }
      //发起验收
      if (this.testPoint == 9) {
        url = "./manage/service/imglabelOrder/startAccept";
      }
      //验收
      if (this.testPoint == 10) {
        url = "./manage/service/imglabelOrder/accept";
      }
      this.api
        .post(url, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.getTaskList();
          }
        })
        .catch(function(error) {});
    },
    //发起验收
    checkOperate(val, flag) {
      this.orderId = val.orderId;
      if (flag == "验收") {
        if (!this.disabledFlag) {
          this.$message.error("您暂无该操作权限。");
        } else {
          this.derail = true;
          this.titleName = "您确定要验收该订单" + val.orderName + "吗？";
          this.testPoint = 10;
          this.status = 6;
        }
      } else {
        this.derail = true;
        this.titleName = "您确定要对该订单" + val.orderName + "发起验收吗？";
        this.testPoint = 9;
        this.status = 5;
      }
    },
    //获取数据
    getTaskList() {
      let vm = this;
      let url = "";
      let data = {
        orderStatus: this.orderStatus,
        orderName: this.orderName,
        orderCode: this.orderCode,
        clientAccount: this.clientAccount,
        startDate: this.startDate,
        endDate: this.endDate,
        manageAccount: this.manageAccount
      };
      if (this.$route.name == "taskLista") {
        data.isPublish = "1";
      }
      this.api
        .post(
          `./manage/service/imglabelOrder/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.derail = false;
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.totalPage = response.data.page.totalPage;
          }
        })
        .catch(function(error) {});
    },
    addTask() {
      let roleName = "";
      if (this.$route.name == "taskLista") {
        roleName = "receive";
      } else {
        roleName = "publish";
      }
      this.$router.push({
        name: "tastDetail",
        params: { role: roleName, name: "new", id: "new" }
      });
    },
    researchForm() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.totalPage = 1;
      this.getTaskList();
    },
    resetForm() {
      this.resultNum++;
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.totalPage = 1;
      this.orderStatus = "";
      this.orderName = "";
      this.orderCode = "";
      this.manageAccount = "";
      this.clientAccount = "";
      this.startDate = "";
      this.endDate = "";
      this.listenRole();
      this.getTaskList();
    },

    queryDaily(val) {},
    //弹框事件
    taskBtnN() {
      this.derail = false;
    },
    taskBtnY() {
      if (this.testPoint == 4) {
        let roleName = "";
        if (this.$route.name == "taskLista") {
          roleName = "receive";
        } else {
          roleName = "publish";
        }
        this.$router.push({
          name: "tastDetail",
          params: { role: roleName, name: "copy", id: this.orderIdFlag }
        });
      } else {
        if (this.testPoint == 3) {
          if (this.logRemark) {
            this.handle();
          } else {
            this.judgeText = true;
          }
        } else {
          this.handle();
        }
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTaskList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTaskList();
    }
  }
};
</script>

<style scoped lang="less">
.task /deep/.el-dialog__header {
  padding: 10px 20px !important;

  .el-dialog__title {
    font-size: 16px !important;
  }
  .el-dialog__headerbtn {
    top: 12px;
  }
}
.task-title {
  width: 100%;
  height: 22px;
  text-align: left;
  line-height: 22px;
  font-size: 14px;
  margin-top: 7px;
  margin-bottom: 22px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  div {
    float: left;
  }
  .title-img {
    color: #e6a23c;
    display: inline-block;
    margin-right: 10px;
    font-size: 21px;
  }
}
.task-point {
  height: 30px;
  padding-left: 30px;
  text-align: left;
  color: rgba(0, 0, 0, 0.55);
  font-size: 12px;
  div {
    height: 15px;
  }
}
.input-box {
  margin-top: 5px;
  min-height: 28px;
  position: relative;
  .el-input--small {
    font-size: 12px;
  }
}
.task-btn {
  margin: 20px 0 5px 0;
  overflow: hidden;
  .task-btn-N,
  .task-btn-Y {
    float: right;
    width: 65px;
    height: 28px;
    cursor: pointer;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    border-radius: 2px;
  }
  .task-btn-N {
    color: rgba(0, 0, 0, 0.65);
    border: 1px solid rgba(217, 217, 217, 1);
    margin-left: 8px;
  }
  .task-btn-Y {
    background: #597ef7;
    color: #fff;
  }
}
.task {
  .unifyBox {
    width: 22px;
    display: inline-block;
    .unify {
      font-size: 14px;
      cursor: pointer;
      &:hover {
        font-size: 16px;
      }
    }
  }

  .tabBox {
    height: 40px;
    overflow: hidden;
  }

  .task-search {
    .space {
      width: 22.5px;
      float: left;
      height: 32px;
    }
    .task-search-box {
      padding: 24px 24px 0px 24px;
      .task-search-top {
        height: 32px;
        width: 100%;

        .task-search-top-box {
          width: calc(25% - 15px);
          height: 100%;
          float: left;
          .task-search-top-box-text {
            float: left;
            width: calc(100% - 80px);
            height: 32px;
            .el-select {
              width: 100%;
            }
          }
        }
        .task-search-top-box-name {
          float: left;
          width: 80px;
          height: 32px;
          line-height: 32px;
          text-align: left;
        }
        .task-search-top-box-time {
          width: calc(25% - 95px);
          height: 32px;
          float: left;
          .el-date-editor {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
