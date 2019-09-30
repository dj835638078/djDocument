<template>
  <div class="VideoQuality">
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="质检内容" name="1" style="color:red;">
        </el-tab-pane>
        <el-tab-pane label="质检记录" name="2"></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div style="overflow:hidden;">
      <div class="video-box">
        <div class="video-box-name">分类：</div>
        <div class="video-box-select">
          <el-select v-model="videoType" placeholder="请选择">
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
        <div class="video-box-two-name">
          <span style="color:#ffffff;">*</span>来源：
        </div>
        <div class="video-box-two-child">
          <div class="video-box-two-select">
            <el-select v-model="dataSource" placeholder="请选择">
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
        <div class="video-box-name" style="padding-left:0px;">优先：</div>
        <div class="video-box-select">
          <el-select v-model="videoPriority" placeholder="请选择">
            <el-option
              v-for="item in firstList"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div style="overflow:hidden;margin:20px 0;">
      <div class="video-box">
        <div class="video-box-name">
          <span style="color:red;">*</span>时间：
        </div>
        <div class="video-box-select">
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="请选择时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="space">-</div>
      <div class="video-box" style="width:20%;">
        <div class="video-box-select" style="width:calc(100% - 20px)">
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="请选择时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="video-box" style="width:calc(30% - 24px)" v-if="tag == 1">
        <div class="video-box-nameb" style="padding-left:0px;">审核状态：</div>
        <div class="video-box-selectb">
          <el-select v-model="processResult" placeholder="请选择">
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
      <div v-if="tag == 2" class="video-box" style="width:calc(30% - 24px)">
        <div class="video-box-nameb" style="padding-left:0px;">质检状态：</div>
        <div class="video-box-selectb">
          <el-select v-model="checkResult" placeholder="请选择">
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
      <div class="video-box" v-if="tag == 1">
        <div class="video-box-namea">审核员：</div>
        <div class="video-box-selecta" style="width:calc(100% - 115px);">
          <el-input v-model="accountId" placeholder="请输入内容"></el-input>
        </div>
      </div>

      <div class="video-box" style="float:right" v-if="tag == 2">
        <div class="video-box-name" style="padding-left:0px;">rowkey：</div>
        <div class="video-box-select">
          <el-input v-model="rowkey" placeholder="请输入内容"></el-input>
        </div>
      </div>
    </div>
    <div v-if="tag == 1" class="box-btn">
      <div
        v-if="startDate && endDate && tableData.length"
        class="new"
        style="margin-bottom:0px;margin-right:20px;float:right"
        @click="setReceive(2)"
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
        v-if="startDate && endDate && !tableData.length"
        class="new"
        style="margin-bottom:0px;float:right"
        @click="setReceive(1)"
      >
        <i class="fa fa-recycle"></i>抽检
      </div>
      <div v-else class="release" style="margin-bottom:0px;float:right">
        <i class="fa fa-recycle"></i>抽检
      </div>
    </div>
    <div class="box-btn" v-if="tag == 2">
      <div
        class="query"
        style="margin-bottom:0px;margin-right:20px;float:right"
        @click="resultBtn"
      >
        <i class="fa fa-refresh"></i>重置
      </div>
      <div
        v-if="startDate && endDate"
        class="query"
        @click="already"
        style="margin-bottom:0px;float:right"
      >
        <i class="fa fa-search"></i>查询
      </div>
      <div v-else class="release" style="margin-bottom:0px;float:right">
        <i class="fa fa-search"></i>查询
      </div>
    </div>
    <div v-if="tableData.length">
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
              style="color:#1890FF;cursor:pointer;height:23px;"
              @click="openDetail(scope.row)"
              >{{ scope.row.videoTitle }}</span
            >
          </template>
        </el-table-column>
        <el-table-column v-if="tag == 1" label="审核状态" align="left">
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
        <el-table-column v-if="tag == 2" label="质检状态" align="left">
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
          label="不合格原因"
          min-width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          v-if="tag == 2"
          prop="checkReason"
          label="不合格原因"
          min-width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="accountName"
          label="账号名称"
          min-width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column
          prop="accountId"
          label="账号ID"
          min-width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="视频时长">
          <template slot-scope="scope">
            <div v-text="tools.setTimeFormat(scope.row.contentDuration)"></div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="tag == 2"
          label="分类"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setType(scope.row.videoType)"></span>
          </template>
        </el-table-column>
        <el-table-column v-if="tag == 2" label="来源" min-width="150">
          <template slot-scope="scope">
            <div v-text="tools.setSource(scope.row.dataSource)"></div>
          </template>
        </el-table-column>

        <el-table-column
          prop="rowkey"
          label="rowkey"
          min-width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="审核人"
          v-if="tag == 1"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.processAccount)"></span>
          </template>
        </el-table-column>

        <el-table-column v-if="tag == 1" label="审核时间" width="160">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.processDate, 1)"></span>
          </template>
        </el-table-column>
        <el-table-column v-if="tag == 2" label="质检时间" width="160">
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
      <div v-if="infoDialogFlag">
        <infoDialog :infoDetail="infoDetail" />
      </div>
      <div v-if="infoDialogFlagPass">
        <infoDialogPass :infoDetail="infoDetailPass" />
      </div>
    </div>
    <!--<div
      v-else
      style="text-align:center;"
    >
      <img
        src="../../../assets/img/print-1.jpg"
        style="width:280px;height:208px;margin-top:50px;margin-bottom:10px;"
      />
      <p>暂无数据</p>
    </div>-->
  </div>
</template>
<script>
import api from "@/api";
import { mapState, mapMutations } from "vuex";
import infoDialog from "./infoDialog";
import infoDialogPass from "./infoDialogPass";
export default {
  name: "VideoQuality",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "1",
      tag: "1",
      tableData: [],
      videoType: "",
      dataSource: "",
      secondDataSource: "",
      sourceList: [],
      videoPriority: "",
      startDate: "",
      endDate: "",
      accountId: "",
      firstList: [],
      processResult: "",
      checkResult: "",
      infoDialogFlag: false,
      infoDialogFlagPass: false,
      infoDetail: {},
      infoDetailPass: {}
    };
  },
  mounted() {
    this.getList();
    this.first();
    this.startDate = new Date().setMinutes(new Date().getMinutes() - 120);
    this.endDate = new Date();
  },
  computed: {
    ...mapState(["tableHeightThree", "lookUpAdd", "lookUp"])
  },
  watch: {
    tag() {
      this.resetData();
      if (this.tag == 1) {
        this.getList();
      } else {
        this.already();
      }
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
  components: { infoDialog, infoDialogPass },
  methods: {
    resultBtn() {
      this.resetData();
      this.already();
    },
    //重置数据
    resetData() {
      this.tableData = [];
      this.startDate = new Date().setMinutes(new Date().getMinutes() - 120);
      this.endDate = new Date();
      this.videoType = "";
      this.dataSource = "";
      this.secondDataSource = "";
      this.videoPriority = "";
      this.accountId = "";
      this.rowkey = "";
      this.checkResult = "";
      this.processResult = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
    },
    //我已审核
    already() {
      let data = {
        videoType: this.videoType,
        dataSource: this.dataSource,
        secondDataSource: this.secondDataSource,
        videoPriority: this.videoPriority,
        startDate: this.startDate,
        endDate: this.endDate,
        checkResult: this.checkResult,
        rowkey: this.rowkey
      };
      let vm = this;
      api
        .post(
          `./manage/service/videoCheck/checkItems?currentPage=${
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
    //视频优先级
    first() {
      let vm = this;
      api
        .get(`./manage/service//videoVerify/findVideoPriorities`)
        .then(function(response) {
          if (response.status == 200) {
            vm.firstList = response.data;
          }
        })
        .catch(function(error) {});
    },
    //进入详情
    openDetail(val) {
      if (this.tag == 1) {
        this.infoDialogFlag = true;
        this.infoDetail = val;
      } else {
        this.infoDialogFlagPass = true;
        this.infoDetailPass = val;
      }
    },
    //获取数据
    getList() {
      let data = {};
      let vm = this;
      api
        .get(
          `./manage/service/videoCheck/findPage?currentPage=${
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
    //领单/下一批
    record() {
      let data = {
        videoType: this.videoType,
        dataSource: this.dataSource,
        secondDataSource: this.secondDataSource,
        videoPriority: this.videoPriority,
        startDate: this.startDate,
        endDate: this.endDate,
        processAccount: this.accountId,
        processResult: this.processResult
      };
      let vm = this;
      api
        .post(`./manage/service/videoCheck/add`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.currentPage = 1;
            vm.pageSize = 10;
            vm.getList();
          }
        })
        .catch(function(error) {});
    },
    //领单/下一批
    setReceive(type) {
      if (type == 1) {
        this.record();
      } else {
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
            this.record();
          })
          .catch(() => {});
      }
    },
    //标签操作
    handleClick(row) {
      this.activeName = row.name;
      this.tag = row.name;
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      if (this.tag == 1) {
        this.getList();
      } else {
        this.already();
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.tag == 1) {
        this.getList();
      } else {
        this.already();
      }
    }
  }
};
</script>

<style scoped lang="less">
.VideoQuality {
  .video-box {
    width: 25%;
    float: left;
    .video-box-name {
      width: 55px;
      padding-left: 16px;
    }
    .video-box-namea {
      width: 95px;
    }
    .video-box-nameb {
      width: 70px;
      padding-left: 16px;
    }
    .video-box-select {
      width: calc(100% - 80px);
      .el-date-editor {
        width: 100%;
      }
    }
    .video-box-selecta {
      width: calc(100% - 120px);
    }
    .video-box-selectb {
      width: calc(100% - 95px);
    }
    .video-box-select,
    .video-box-selecta,
    .video-box-selectb {
      float: left;
      .el-select {
        width: 100%;
      }
    }
    .video-box-name,
    .video-box-namea,
    .video-box-nameb {
      padding-right: 5px;
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: center;
    }
  }
  .video-box-two {
    width: 50%;
    float: left;
    .video-box-two-name {
      width: 55px;
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: center;
      padding-left: 16px;
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
        .el-date-editor,
        .el-date-editor {
          width: 100%;
        }
      }
    }
  }
  .space {
    float: left;
    width: 20px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: gray;
  }
  .video-btn {
    width: 180px;
    float: right;
    margin-right: 20px;
  }
  .btn-style {
    float: left;
    width: 38px;
    height: 24px;
    border-radius: 4px;
    color: #ffffff;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
  }
}
</style>
