<template>
  <div class="task">
    <div class="task-search">
      <div class="task-search-box">
        <div class="task-search-top">
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
            <div class="task-search-top-box-name">项目经理：</div>
            <div class="task-search-top-box-text">
              <human
                val="manageAccount"
                :showYN="manageAccount"
                :result="resultNum"
              />
            </div>
          </div>
          <div class="space"></div>
          <div class="task-search-top-box" v-if="$route.name == 'labelList'">
            <div class="task-search-top-box-name">标注状态：</div>
            <div class="task-search-top-box-text">
              <el-select
                v-model="nodeState"
                placeholder="请选择标注状态"
                clearable
              >
                <el-option
                  v-for="(item, index) in lookUpStated"
                  :label="item.itemName"
                  :value="item.itemCode"
                  :key="index"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div
            class="task-search-top-box"
            v-if="$route.name == 'checkLabelList'"
          >
            <div class="task-search-top-box-name">质检状态：</div>
            <div class="task-search-top-box-text">
              <el-select
                v-model="nodeState"
                placeholder="请选择质检状态"
                clearable
              >
                <el-option
                  v-for="(item, index) in lookUpStatee"
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
          <div class="task-search-top-box-name">开始时间：</div>
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
            style="float:right;margin-bottom:0px;margin-right:0px;"
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

    <div style="margin-top:20px;">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :height="tableHeightThreeY"
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
          :width="$route.name == 'labelList' ? '100' : '75'"
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

            <!--&& tools.setRoles('clientA')-->
            <span
              type="text"
              size="small"
              :title="$route.name == 'labelList' ? '标注' : '标注质检'"
              @click="setBtn(scope.row)"
              class="unifyBox"
            >
              <i class="fa fa-hand-o-up unify" style="color:#67C23A"></i>
            </span>
            <span
              v-if="$route.name == 'labelList'"
              type="text"
              size="small"
              title="查询"
              @click="inquiry(scope.row)"
              class="unifyBox"
            >
              <i class="fa fa-search unify" style="color:#1890FF"></i>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderCode"
          label="订单编号"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          label="项目经理"
          align="left"
          :show-overflow-tooltip="true"
        >
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
        <el-table-column
          label="订单状态"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setLabelStatus(scope.row.orderStatus)"></span>
          </template>
        </el-table-column>

        <el-table-column
          v-if="$route.name == 'labelList'"
          label="标注状态"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setLabelStatusA(scope.row.nodeState)"></span>
          </template>
        </el-table-column>
        <el-table-column
          v-if="$route.name == 'checkLabelList'"
          label="质检状态"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setLabelStatusB(scope.row.nodeState)"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="orderQuantity"
          label="交付数量"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column label="开始时间" align="left" width="150">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.startDate, 1)"></span>
          </template>
        </el-table-column>

        <el-table-column label="截止时间" align="left" width="150">
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
import { mapState } from "vuex";
import human from "../../../common/Human";
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
      //入参
      tableData: [],
      nodeState: "",
      orderName: "",
      orderCode: "",
      startDate: "",
      endDate: "",
      manageAccount: ""
    };
  },

  mounted() {
    this.getTaskList();
  },
  watch: {
    "$route.name"() {
      this.resetForm();
    },
    startDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    }
  },
  components: { human },
  computed: {
    ...mapState(["lookUp", "tableHeightThreeY", "lookUpStated", "lookUpStatee"])
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
    //*****************列表操作组 */
    //查看详情
    goDetail(val) {
      let roleName = "operateLabel";
      if (this.$route.name == "checkLabelList") {
        roleName = "checkLabelDetail";
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
    //操作
    setBtn(val) {
      let nameFlag = "labelImage";
      if (this.$route.name == "checkLabelList") {
        nameFlag = "labelCheck";
      }
      this.$router.push({
        name: nameFlag,
        params: {
          id: val.orderId,
          nodeState: val.nodeState,
          orderStatus: val.orderStatus
        }
      });
    },
    //查询
    inquiry(val) {
      this.$router.push({
        name: "labelDetail",
        params: { id: val.orderId }
      });
    },

    //获取数据
    getTaskList() {
      let vm = this;
      let url = "";
      let data = {
        nodeCode: "label",
        nodeState: this.nodeState,
        orderName: this.orderName,
        orderCode: this.orderCode,
        startDate: this.startDate,
        endDate: this.endDate,
        manageAccount: this.manageAccount
      };
      if (this.$route.name == "checkLabelList") {
        data.isCheck = "1";
        url = `./manage/service/imglabel/pageCheck?currentPage=${
          this.currentPage
        }&pageSize=${this.pageSize}`;
      } else {
        url = `./manage/service/imglabel/page?currentPage=${
          this.currentPage
        }&pageSize=${this.pageSize}`;
      }

      this.api
        .post(url, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.totalPage = response.data.page.totalPage;
          }
        })
        .catch(function(error) {});
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
      this.nodeState = "";
      this.orderName = "";
      this.orderCode = "";
      this.startDate = "";
      this.endDate = "";
      this.manageAccount = "";
      this.getTaskList();
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
