<template>
  <div class="director">
    <div class="top-box">
      <div
        class="infoHeadSearch"
        style="margin-bottom:0px;"
      >
        <el-form>
          <el-form-item
            label="内容选择"
            class="content"
          >
            <el-select
              v-model="channelType"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="(item,index) in lookUp.QUALITY_CHECKED"
                :label="item.itemName"
                :value="item.itemCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="质检时间"
            class="timeCheck"
          >
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <div class="line">-</div>
            <el-date-picker
              v-model="endDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item
            label="模块"
            class="content"
          >
            <el-select
              v-model="dataSource"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="(item,index) in moduleList"
                :label="item.moduleName"
                :value="item.dataSource"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="质检人"
            class="btnBox"
          >
            <el-select
              v-model="checkAccount"
              placeholder="请选择"
              filterable
              clearable
              class="flexlayout"
            >
              <el-option
                v-for="(item,index) in createUserArr"
                :label="item.userName"
                :value="item.fwmAccount"
                :key="index"
              ></el-option>
            </el-select>
            <div
              class="line"
              style="opacity:0"
            >-</div>
            <div class="btnlist flexlayout">
              <div
                class="query"
                @click="researchForm"
              ><i class="fa fa-search"></i>查询</div>
              <div
                v-if="channelType&&startDate&&endDate&&dataSource&&checkAccount"
                class="query"
                @click="deriveForm"
              ><i class="fa fa-file-excel-o"></i>导出</div>
              <div
                v-else
                class="release"
              ><i class="fa fa-file-excel-o"></i>导出</div>
              <div
                class="query resetBtn"
                @click="resetForm"
              ><i class="fa fa-refresh"></i>重置</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="divide"></div>
    <div
      class="content-box"
      v-bind:style="{height: tableHeightOne+'px'}"
    >
      <el-table
        :data="tableData"
        highlight-current-row
        border
        tooltip-effect="light"
        ref="table"
        style="width: 100%"
        :height="tableHeightTwo"
      >
        <el-table-column
          prop="attriTitle"
          label="标题"
          :show-overflow-tooltip="true"
          min-width="150"
        >
        </el-table-column>
        <el-table-column
          label="rowkey"
          prop="rowkey"
          :show-overflow-tooltip="true"
          min-width="140"
        >
        </el-table-column>
        <el-table-column
          prop="dataSource"
          label="来源"
          :show-overflow-tooltip="true"
          min-width="130"
        >
          <template slot-scope="scope">
            <div v-text="setModuleName(scope.row.dataSource)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="审核人"
          align="left"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div v-text="tools.setRole(scope.row.processAccount)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="审核时间"
          align="left"
          width="150"
        >
          <template slot-scope="scope">
            <div v-text="tools.setFormTime(scope.row.processData,1)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="审核状态"
          align="left"
        >
          <template slot-scope="scope">
            <div
              :class="[scope.row.processStatus=='pass'?'activeColorY':'activeColorN']"
              v-text="tools.setStatus(scope.row.processStatus,1)"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="质检人"
          align="left"
          width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div v-text="tools.setRole(scope.row.checkAccount)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="质检时间"
          align="left"
          width="150"
        >
          <template slot-scope="scope">
            <div v-text="tools.setFormTime(scope.row.checkDate,1)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="质检状态"
          align="left"
        >
          <template slot-scope="scope">
            <div
              :class="[scope.row.checkStatus=='pass'?'activeColorY':'activeColorN']"
              v-text="tools.setStatus(scope.row.checkStatus)"
            >
            </div>
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
import directorTable from "./table";
import { mapState } from "vuex";
export default {
  data() {
    return {
      tableData: [],
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      channelType: "",
      startDate: "",
      endDate: "",
      totalPage: 1,
      createUserArr: [],
      dataSource: "all",
      moduleList: [],
      checkAccount: "all",
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
  components: {
    directorTable
  },
  watch: {
    startDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    }
  },
  computed: {
    ...mapState(["lookUp", "tableHeightOne", "tableHeightTwo"])
  },
  mounted() {
    //获取当前时间零点
    this.getCreateUserArr();
    this.reset();
    this.getModule();
    this.getRuleList();
  },
  methods: {
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
    //重置
    reset() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.totalPage = 1;
      this.endDate = new Date(+this.$route.params.eDate);
      this.startDate = new Date(+this.$route.params.sDate);
      this.channelType = this.$route.params.type;
      this.dataSource = this.$route.params.dataSource;
      this.checkAccount = "all";
      this.getRuleList();
    },
    researchForm() {
      this.getRuleList();
    },
    deriveForm() {
      let vm = this;
      let data = {
        channelType: this.channelType,
        startDate: this.startDate,
        endDate: this.endDate,
        dataSource: this.dataSource,
        checkAccount: this.checkAccount
      };
      vm.api
        .post(`./manage/service/checkedStatistics/exportDetails`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.$confirm("导出成功，是否前往【我的导出】页面查看详情?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "success"
            })
              .then(() => {
                vm.$router.push({
                  name: "ExportList"
                });
              })
              .catch(() => {});
          }
        })
        .catch(function(error) {});
    },
    resetForm() {
      this.reset();
    },
    //查询信息
    getRuleList() {
      let vm = this;
      let data = {
        channelType: this.channelType,
        dataSource: this.dataSource,
        checkAccount: this.checkAccount,
        startDate: this.startDate,
        endDate: this.endDate
      };
      vm.api
        .post(
          `./manage/service/checkedStatistics/findPage?currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.totalPage = response.data.page.totalPage;
            // vm.channelList = Object.assign({}, vm.defaultChannelList);
          }
        })
        .catch(function(error) {});
    },
    //查询模块
    getModule() {
      let vm = this;
      let data = {
        channelType: this.$route.params.type,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.api
        .post(`./manage/service/checkedStatistics/findModules`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.moduleList = response.data;
          }
        })
        .catch(function(error) {});
    },
    //设置模块名称
    setModuleName(data) {
      if (data) {
        if (this.moduleList.length) {
          for (var i = 0; i < this.moduleList.length; i++) {
            if (data == this.moduleList[i].dataSource) {
              return this.moduleList[i].moduleName;
            }
          }
        }
      }
    },
    //质检人
    getCreateUserArr() {
      let vm = this;
      vm.api
        .get(`./manage/service/checkedStatistics/findChecker`)
        .then(function(response) {
          if (response.status == 200) {
            vm.createUserArr = response.data;
          }
        })
        .catch(function(error) {});
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRuleList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRuleList();
    }
  }
};
</script>

<style scoped lang="less">
.director {
  width: 100%;
  height: 100%;

  .top-box {
    padding: 24px 24px 0px 24px;
  }
  .content-box {
    width: 100%;
    overflow: hidden;
    position: relative;
    padding-bottom: 20px;
    .totalInfo {
      height: 60px;
      line-height: 60px;
      padding-left: 24px;
      span {
        color: #1890ff;
        font-size: 18px;
      }
    }
  }
}
</style>
