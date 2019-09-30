<template>
  <div class="ImgQuery">
    <div class="ImgQuery-box">
      <div style="width:100%">
        <div style="width:75%;float:left;">
          <div class="average-one-name"><span>*</span>入库时间：</div>
          <div class="average-two-box">
            <div class="average-two-content">
              <el-date-picker
                v-model="createDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
            <div class="space">-</div>
            <div class="average-two-content">
              <el-date-picker
                v-model="endDate"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
            <div class="space"></div>
            <div class="fastener">
              <div class="btnShow" @click="showY" v-if="!show">
                显示筛选<i class="fa fa-angle-down"></i>
              </div>
              <div v-else class="btnShow" @click="showN">
                收起筛选<i class="fa fa-angle-up"></i>
              </div>
            </div>
          </div>
        </div>
        <div style="float:right;">
          <div style="margin-bottom: 0px;" class="query" @click="researchForm">
            <i class="fa fa-search"></i>查询
          </div>
          <div
            style="margin-bottom: 0px;margin-right:0px;"
            class="query resetBtn"
            @click="resetForm"
          >
            <i class="fa fa-refresh"></i>重置
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="topBOX" v-if="show">
        <div style="width:75%;float:left;">
          <div class="average-one-name"><span>&nbsp;</span>内容选择：</div>
          <div class="average-two-box">
            <div class="average-two-content">
              <el-select v-model="dataType1" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options1"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </div>
            <div class="space"></div>
            <div class="average-two-content">
              <el-select
                v-model="dataType2"
                placeholder="请选择"
                :disabled="judgetype2"
                clearable
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
            <div class="space"></div>
            <div class="average-two-content">
              <el-select
                v-model="dataType3"
                placeholder="请选择"
                :disabled="judgetype3"
                clearable
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
        <div class="video-box">
          <div class="video-box-name" style="padding-left:0px;">审核人：</div>
          <div class="video-box-select">
            <human
              val="ownerAccount"
              :showYN="ownerAccount"
              :result="resultNum"
            />
          </div>
        </div>
      </div>
      <div class="topBOX" v-if="show">
        <div style="width:75%;float:left;">
          <div class="average-one-name"><span>&nbsp;</span>账号UIN：</div>
          <div class="average-two-box">
            <div class="average-two-content">
              <el-input
                v-model="accountId"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div class="space"></div>
            <div class="average-two-content">
              <div class="averageName">rowkey：</div>
              <div style="width:calc(100% - 75px);float:left;">
                <el-input
                  v-model="rowKey"
                  placeholder="请输入内容"
                  clearable
                ></el-input>
              </div>
            </div>
            <div class="space"></div>
            <div class="average-two-content">
              <div class="averageName">订单状态：</div>
              <div style="width:calc(100% - 75px);float:left;">
                <el-select v-model="dataState" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in lookUp.TASK_DATA_STATUS_G"
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
        <div class="video-box">
          <div class="video-box-name" style="padding-left:0px;">质检人：</div>
          <div class="video-box-select">
            <human
              val="checkAccount"
              :showYN="checkAccount"
              :result="resultNum"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <el-table
        :data="tableData"
        highlight-current-row
        border
        tooltip-effect="light"
        :height="show ? tableHeightThreeV : tableHeightOneV"
        ref="table"
        style="width: 100%"
      >
        <el-table-column
          label="标题"
          min-width="200"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color:#1890FF;cursor:pointer;height:23px;"
              @click="openDetail(scope.row)"
              >{{ scope.row.atricleTitle }}</span
            >
          </template>
        </el-table-column>
        <el-table-column label="订单状态" align="left">
          <template slot-scope="scope">
            <div v-text="tools.setDataName(scope.row.dataState)"></div>
          </template>
        </el-table-column>
        <el-table-column label="审核人" align="left" width="120">
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.ownerAccount)"></span>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="left">
          <template slot-scope="scope">
            <div
              :class="[
                tools.setStatus(scope.row.lastProcessResult) == '通过'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              v-text="tools.setStatus(scope.row.lastProcessResult)"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="质检状态"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              :class="[
                tools.setStatus(scope.row.checkResult) == '通过'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              v-text="tools.setStatus(scope.row.checkResult)"
            >
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="rowkey"
          min-width="100"
          prop="rowKey"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="账号名称"
          min-width="100"
          prop="accountName"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="账号UIN"
          min-width="100"
          prop="accountId"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column label="入库时间" width="160">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
          </template>
        </el-table-column>
        <el-table-column label="领单时间" width="160">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.lockDate, 1)"></span>
          </template>
        </el-table-column>

        <el-table-column label="审核时间" width="160">
          <template slot-scope="scope">
            <span
              v-text="tools.setFormTime(scope.row.lastProcessDate, 1)"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          label="质检人"
          align="left"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.checkAccount)"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="质检时间"
          width="160"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.checkDate, 1)"></span>
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
      <div v-if="infoImgFlag">
        <infoImg :formList="infoImgList" />
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import human from "../../common/Human";
import { mapState, mapMutations } from "vuex";
import infoImg from "./infoImg";
export default {
  name: "ImgQuery",
  data() {
    return {
      //人员控件重置控制
      resultNum: "1",
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      show: false,
      tableData: [],
      judgetype1: false,
      judgetype2: true,
      judgetype3: true,
      createDate: "",
      endDate: "",
      dataType1: "",
      options1: [],
      dataType2: "",
      options2: [],
      dataType3: "",
      options3: [],
      ownerAccount: "",
      accountId: "",
      rowKey: "",
      dataState: "",
      checkAccount: "",
      infoImgFlag: false,
      infoImgList: {},
      pickerOptions: {
        disabledDate: time => {
          let curDate = new Date().getTime();
          let three = 7 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        }
      }
    };
  },
  mounted() {
    this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.createDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.getoptions();
    this.getImgData();
  },
  computed: {
    ...mapState(["tableHeightOneV", "tableHeightThreeV", "lookUpAdd", "lookUp"])
  },
  watch: {
    dataType1() {
      this.dataType2 = "";
      this.decideOne();
    },
    dataType2() {
      this.dataType3 = "";
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
    createDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    }
  },
  components: { infoImg, human },
  methods: {
    //进入详情
    openDetail(val) {
      this.infoImgFlag = true;
      this.infoImgList = val;
    },
    researchForm() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getImgData();
    },
    resetForm() {
      this.resultNum++;
      this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.createDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.dataType1 = "";
      this.dataType2 = "";
      this.dataType3 = "";
      this.options1 = [];
      this.options2 = [];
      this.options3 = [];
      this.ownerAccount = "";
      this.accountId = "";
      this.rowKey = "";
      this.dataState = "";
      this.checkAccount = "";
      this.getImgData();
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
      if (this.createDate && this.endDate) {
        if (this.endDate < this.createDate) {
          this.endDate = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    },
    showY() {
      this.show = true;
    },
    showN() {
      this.show = false;
    },
    getImgData() {
      let vm = this;
      let data = {
        createDate: this.createDate,
        endDate: this.endDate,
        dataSource: this.dataType3,
        ownerAccount: this.ownerAccount,
        accountId: this.accountId,
        rowKey: this.rowKey,
        dataState: this.dataState,
        checkAccount: this.checkAccount
      };
      api
        .post(
          `./manage/service/graphicsResult/queryGraphicsResultAll?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.totals = response.data.page.totalRows;
            vm.tableData = response.data.result;
          }
        })
        .catch(function(error) {});
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getImgData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getImgData();
    }
  }
};
</script>

<style scoped lang="less">
.ImgQuery {
  .averageName {
    padding-left: 0px;
    height: 32px;
    line-height: 32px;
    float: left;
    width: 75px;
  }
  .ImgQuery-box {
    padding: 20px 20px;
    .average-one-name {
      width: 80px;
      float: left;
      line-height: 32px;
      span {
        color: red;
      }
    }
    .fastener {
      width: calc((100% - 40px) / 3);
      float: left;
      height: 32px;
      line-height: 32px;
    }
    .average-two-box {
      width: calc(100% - 80px);
      float: left;
      .average-two-content {
        width: calc((100% - 40px) / 3);
        float: left;
        .el-date-editor,
        .el-select {
          width: 100%;
        }
      }
    }
  }
  .topBOX {
    width: 100%;
    height: 32px;
    margin-top: 20px;
    .video-box {
      width: 25%;
      float: left;
      .video-box-name {
        width: 75px;
        float: left;
        height: 32px;
        line-height: 32px;
        text-align: right;
        padding-left: 16px;
        padding-right: 5px;
      }
      .video-box-select {
        width: calc(100% - 80px);
        float: left;
        .el-select {
          width: 100%;
        }
      }
    }
  }
}
</style>
