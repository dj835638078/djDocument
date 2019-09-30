<template>
  <div class="VideoQuery">
    <div class="queryBox">
      <div style="width:100%">
        <div style="width:75%;float:left;">
          <div class="average-one-name"><span>*</span>入库时间：</div>
          <div class="average-two-box">
            <div class="average-two-content">
              <el-date-picker
                v-model="startDate"
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
          <div
            v-if="startDate && endDate"
            style="margin-bottom: 0px;"
            class="query"
            @click="researchForm"
          >
            <i class="fa fa-search"></i>查询
          </div>
          <div v-else style="margin-bottom: 0px;" class="release">
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
        <div class="video-box">
          <div class="video-box-name" style="text-align:right;width:59px;">
            分类：
          </div>
          <div class="video-box-select">
            <el-select v-model="videoType" placeholder="请选择" clearable>
              <el-option
                v-for="item in lookUpAdd.VIDEO_TYPE"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="video-box-two">
          <div class="video-box-two-name" style="width:55px;">来源：</div>
          <div class="video-box-two-child">
            <div class="video-box-two-select">
              <el-select v-model="dataSource" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lookUpAdd.VIDEO_SOURCE"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </div>
            <div class="space"></div>
            <div class="video-box-two-select">
              <el-select
                v-model="secondDataSource"
                placeholder="请选择"
                :disabled="!dataSource"
                clearable
              >
                <el-option
                  v-for="item in sourceList"
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
          <div class="video-box-select" style="width: calc(100% - 70px);">
            <!--<el-input
              v-model="processAccount"
              placeholder="请输入内容"
            ></el-input>-->
            <human
              val="processAccount"
              :showYN="processAccount"
              :result="resultNum"
            />
          </div>
        </div>
      </div>
      <div class="topBOX" v-if="show">
        <div class="video-box">
          <div class="video-box-name" style="text-align:right;width:59px;">
            账号ID：
          </div>
          <div class="video-box-select">
            <el-input
              v-model="accountId"
              placeholder="请输入内容"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="video-box-two">
          <div class="video-box-two-name" style="width:55px;">rowkey：</div>
          <div class="video-box-two-child">
            <div class="video-box-two-select">
              <el-input
                v-model="rowKey"
                placeholder="请输入内容"
                clearable
              ></el-input>
            </div>
            <div class="space"></div>
            <div class="video-box-two-name" style="width:70px;padding-left:0">
              订单状态：
            </div>
            <div class="video-box-two-select" style="width:calc(50% - 85px)">
              <el-select v-model="dataState" placeholder="请选择" clearable>
                <el-option
                  v-for="item in lookUp.TASK_DATA_STATUS_V"
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
          <div class="video-box-name" style="padding-left: 0">质检人：</div>
          <div class="video-box-select" style="width: calc(100% - 70px);">
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
              >{{ scope.row.videoTitle }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          label="订单状态"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setDataNameImg(scope.row.dataState)"> </span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核人"
          align="left"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.processAccount)"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              :class="[
                tools.setStatus(scope.row.processResult) == '通过'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              v-text="tools.setStatus(scope.row.processResult)"
            >
            </span>
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
          label="账号名称"
          min-width="100"
          prop="accountName"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="账号ID"
          min-width="100"
          prop="accountId"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          label="rowkey"
          min-width="100"
          prop="rowkey"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="分类"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setType(scope.row.videoType)"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="来源"
          min-width="100"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setSource(scope.row.dataSource)"></span>
          </template>
        </el-table-column>
        <el-table-column label="视频时长">
          <template slot-scope="scope">
            <span v-text="tools.setTimeFormat(scope.row.contentDuration)">
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="视频ID"
          min-width="100"
          prop="videoId"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="入库时间"
          width="160"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="领单时间"
          width="160"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.lockDate, 1)"></span>
          </template>
        </el-table-column>

        <el-table-column
          label="审核时间"
          width="160"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.processDate, 1)"></span>
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
        <el-table-column
          label="备注"
          min-width="100"
          prop="videoRemark"
          :show-overflow-tooltip="true"
        >
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
      <div v-if="infoVideoFlag">
        <infoVideo :infoDetail="infoVideoList" />
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import { mapState, mapMutations } from "vuex";
import infoVideo from "./infoVideo";
import human from "../../common/Human";
export default {
  name: "VideoQuery",
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
      originData: [],
      sourceList: [],
      startDate: "",
      endDate: "",
      videoType: "",
      dataSource: "",
      secondDataSource: "",
      accountId: "",
      rowKey: "",
      processAccount: "",
      checkAccount: "",
      dataState: "",
      infoVideoFlag: false,
      infoVideoList: {},
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
    this.getOrigin();
    this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.getVideoData();
  },
  computed: {
    ...mapState(["tableHeightOneV", "tableHeightThreeV", "lookUpAdd", "lookUp"])
  },
  watch: {
    startDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    },
    dataSource() {
      this.sourceList = [];
      this.secondDataSource = "";
      let roginName = "";
      for (var key in this.lookUpAdd.VIDEO_SOURCE) {
        if (this.dataSource == this.lookUpAdd.VIDEO_SOURCE[key].itemCode) {
          roginName = this.lookUpAdd.VIDEO_SOURCE[key].childrenAutoCode;
        }
      }
      for (var key in this.lookUpAdd) {
        if (roginName == key) {
          this.sourceList = this.lookUpAdd[key];
        }
      }
    }
  },
  components: { infoVideo, human },
  methods: {
    setHumanValue(val) {
      this.processAccount = val;
    },
    //进入详情
    openDetail(val) {
      this.infoVideoFlag = true;
      this.infoVideoList = val;
    },
    //判断时间
    judgeTime() {
      if (this.startDate && this.endDate) {
        if (this.endDate < this.startDate) {
          this.endDate = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    },
    //来源
    getOrigin() {
      let vm = this;
      api
        .get(`./manage/service/autoLookupItem/findByAassgin?type=1_2`)
        .then(function(response) {
          if (response.status == 200) {
            vm.originData = response.data;
          }
        })
        .catch(function(error) {});
    },
    researchForm() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getVideoData();
    },
    resetForm() {
      this.resultNum++;
      this.reset();
      this.getVideoData();
    },
    reset() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.videoType = "";
      this.dataSource = "";
      this.secondDataSource = "";
      this.accountId = "";
      this.rowKey = "";
      this.processAccount = "";
      this.checkAccount = "";
      this.dataState = "";
    },
    showY() {
      this.show = true;
    },
    showN() {
      this.show = false;
    },
    getVideoData() {
      let vm = this;
      let data = {
        startDate: this.startDate,
        endDate: this.endDate,
        videoType: this.videoType,
        dataSource: this.dataSource,
        secondDataSource: this.secondDataSource,
        accountId: this.accountId,
        rowKey: this.rowKey,
        processAccount: this.processAccount,
        checkAccount: this.checkAccount,
        dataState: this.dataState
      };
      api
        .post(
          `./manage/service/videoCommon/findPage?currentPage=${
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
      this.getVideoData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getVideoData();
    }
  }
};
</script>

<style scoped lang="less">
.VideoQuery {
  .queryBox {
    padding: 20px 20px;
    // overflow: hidden;
  }
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
  .topBOX {
    // overflow: hidden;
    height: 32px;
    padding-top: 20px;
  }
  .video-box {
    width: 25%;
    float: left;
    .video-box-name {
      width: 65px;
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: center;
      padding-left: 16px;
      padding-right: 5px;
    }
    .video-box-select {
      width: calc(100% - 90px);
      float: left;
      .el-select {
        width: 100%;
      }
    }
  }
  .video-box-two {
    width: 50%;
    float: left;
    .video-box-two-name {
      width: 60px;
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: left;
      padding-left: 20px;
      padding-right: 5px;
    }
    .video-box-two-child {
      width: calc(100% - 100px);
      float: left;
      .video-box-two-select {
        width: calc(50% - 10px);
        float: left;
        .el-select {
          width: 100%;
        }
        .el-date-editor {
          width: 100%;
        }
      }
    }
  }
}
</style>
