<template>
  <div class="staffTable">
    <div class="taffTable-paper-title">
      <div class="taffTable-paper-name ellipsis" :title="$route.params.name">
        试卷名称：{{ $route.params.name }}
      </div>
      <div class="returnBtn" @click="returnTab">返回试卷列表</div>
    </div>
    <div class="taffTable-paper-tip">
      <div class="taffTable-paper-tip-box">
        <span>公开范围:</span>
        <span>{{ $route.params.range }}</span>
      </div>
      <div class="taffTable-paper-tip-box">
        <span>试卷类型:</span>
        <span>{{ tools.setPaperType($route.params.type) }}</span>
      </div>
      <div class="taffTable-paper-tip-box">
        <span>总分数:</span>
        <span>{{ $route.params.num }}</span>
      </div>
      <div class="taffTable-paper-tip-box">
        <span>考试时长:</span>
        <span>{{ $route.params.time }}分钟</span>
      </div>
    </div>
    <div class="taffTable-paper-serch">
      <div class="taffTable-paper-serch-box">
        <div class="taffTable-paper-serch-box-left">
          <el-input
            v-model="fwmAccount"
            placeholder="请输入工号或阅卷人进行查询"
            :clearable="true"
          ></el-input>
        </div>
        <div class="taffTable-paper-serch-box-right" @click="query">
          <i class="el-icon-search" style="margin-right: 10px;"></i>查询
        </div>
      </div>
    </div>
    <div>
      <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
        <el-table-column type="index" label="NO." width="50"> </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="fwmAccount"
          label="工号"
        ></el-table-column>
        <el-table-column
          label="姓名"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setName(scope.row.fwmAccount)"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="交卷时间"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.testEndDate, 1)"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="阅卷人"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setName(scope.row.markFwmAccount)"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="得分数"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              v-text="scope.row.testScore"
              v-if="+scope.row.testScore > $route.params.num * (6 / 10)"
            ></span>
            <span v-text="scope.row.testScore" v-else style="color:red"></span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color:#00cdca;cursor:pointer;"
              @click="goDetail(scope.row)"
              >查看详情</span
            >
          </template>
        </el-table-column>
      </el-table>
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
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      tableData: [],
      fwmAccount: ""
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.getPaperHuman();
  },
  methods: {
    returnTab() {
      this.$router.push({
        name: "paperResult",
        params: {
          type: 1
        }
      });
    },
    getPaperHuman() {
      let data = {
        testId: this.$route.params.testId,
        fwmAccount: this.fwmAccount
      };
      let url = "./complex/service/test/findPageItemOfAllTested";
      this.api
        .post(
          `${url}?currentPage=${this.currentPage}&pageSize=${this.pageSize}`,
          data
        )
        .then(response => {
          if (response.status == 200) {
            this.tableData = response.data.result;
            this.totals = response.data.page.totalRows;
          }
        })
        .catch(error => {});
    },
    goDetail(val) {
      this.$router.push({
        name: "examinationResults",
        params: {
          testId: val.testId,
          paperCode: val.paperCode,
          fwmAccount: val.fwmAccount
        }
      });
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getPaperHuman();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPaperHuman();
    },
    query() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getPaperHuman();
    }
  }
};
</script>

<style scoped lang="less">
.taffTable-paper-serch /deep/.el-input__suffix {
  right: 80px !important;
}
.taffTable-paper-serch /deep/.el-input__inner {
  border-radius: 4px;
  // border: 1px solid #dcdfe6;
  height: 40px;
}
.staffTable {
  width: 100%;
  margin-bottom: 100px;
  .staffTable-top {
    width: 100%;
    .staffTable-top-name {
      margin-top: 40px;
      border-left: 2px solid #00cdca;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      font-family: PingFangSC-Semibold;
      color: #2a2a2a;
      margin-bottom: 20px;
    }
  }
  .taffTable-paper-title {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    .taffTable-paper-name {
      float: left;
      color: #00cdca;
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      max-width: 1000px;
    }
    .returnBtn {
      float: right;
      width: 100px;
      height: 28px;
      background: #00cdca;
      border-radius: 2px;
      text-align: center;
      line-height: 28px;
      cursor: pointer;
      color: #fff;
      font-size: 14px;
      margin-top: 10px;
    }
  }
  .taffTable-paper-tip {
    width: 100%;
    height: 59px;
    border-bottom: 1px solid #ebeef5;
    .taffTable-paper-tip-box {
      float: left;
      width: 22%;
      line-height: 59px;
      text-align: left;
    }
  }
  .taffTable-paper-serch {
    height: 40px;
    padding: 20px 0;
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
        background: #f0f2f5;
        position: absolute;
        border-top-right-radius: 4px 4px;
        border-bottom-right-radius: 4px 4px;
        right: 1px;
        top: 1px;
        color: #2a2a2a;
        text-align: center;
        line-height: 38px;
        cursor: pointer;
      }
    }
  }
}
</style>