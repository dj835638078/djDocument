<template>
  <div class="record">
    <!--two-->
    <div>
      <div>
        <div class="search-box-one">
          <div class="search-box-top">
            <div class="search-box-top-name"><span>*</span>内容选择：</div>
            <div class="search-box-top-right">
              <div class="one-box">
                <div class="one-box-child">
                  <el-select
                    v-model="dataTypeBottom1"
                    placeholder="请选择审核类型"
                  >
                    <el-option
                      v-for="item in optionsBottom1"
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
                    v-model="dataTypeBottom2"
                    placeholder="请选择审核通道"
                    :disabled="judgetypeBottom2"
                  >
                    <el-option
                      v-for="item in optionsBottom2"
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
                    v-model="dataTypeBottom3"
                    placeholder="请选择审核来源"
                    :disabled="judgetypeBottom3"
                  >
                    <el-option
                      v-for="item in optionsBottom3"
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
          <div style="width:30%;float:left;">
            <div class="search-box-two-right-name">rowkey:</div>
            <div style="width:calc(100% - 100px);float:left;padding-right:20px">
              <el-input v-model="rowkey" placeholder="请输入rowkey"></el-input>
            </div>
          </div>
        </div>
        <div class="search-box-two">
          <div class="search-box-top-name"><span>*</span>送审时间：</div>
          <div class="box-two">
            <div class="two-one-box">
              <div class="box-two-child">
                <el-date-picker
                  v-model="createDateBottom"
                  type="datetime"
                  placeholder="请选择时间"
                >
                </el-date-picker>
              </div>
              <div class="Pul">-</div>
            </div>
            <div class="two-one-box">
              <div class="box-two-child">
                <el-date-picker
                  v-model="endDateBottom"
                  type="datetime"
                  placeholder="请选择时间"
                >
                </el-date-picker>
              </div>
            </div>
            <div style="width:50%;float:left;position:absolute;left:66%">
              <div
                class="search-box-two-right-name"
                style="text-align:left;width:70px;"
              >
                审核状态:
              </div>
              <div
                style="width:calc(100% - 100px);float:left;padding-right:20px"
              >
                <el-select v-model="status" placeholder="请选择审核状态">
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
        </div>
        <div class="search-box-right">
          <div
            v-if="
              dataTypeBottom1 ||
                dataTypeBottom2 ||
                dataTypeBottom3 ||
                createDateBottom ||
                endDateBottom ||
                rowkey ||
                status
            "
            class="new"
            style="margin-right:20px;"
            @click="reset"
          >
            <i class="fa fa-refresh"></i>重置
          </div>
          <div v-else class="release" style="margin-right:20px;" @click="reset">
            <i class="fa fa-refresh"></i>重置
          </div>
          <div
            v-if="dataTypeBottom3 && createDateBottom && endDateBottom"
            class="query"
            @click="query"
          >
            <i class="fa fa-search"></i>查询
          </div>
          <div v-else class="release"><i class="fa fa-search"></i>查询</div>
        </div>
        <div class="clear"></div>
      </div>
      <div style="width:100%;margin-top:20px;" v-if="tableData.length">
        <el-table
          :data="tableData"
          border
          tooltip-effect="light"
          style="width: 100%"
        >
          <el-table-column label="NO." type="index" width="50" align="center">
          </el-table-column>

          <el-table-column label="标题" :show-overflow-tooltip="true">
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
          <el-table-column label="审核结果" align="left">
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
            prop="rowKey"
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

          <el-table-column label="入库时间" align="left" width="160">
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.createDate, 1)"></div>
            </template>
          </el-table-column>
          <el-table-column label="审核时间" align="left" width="160">
            <template slot-scope="scope">
              <div
                v-text="tools.setFormTime(scope.row.lastProcessDate, 1)"
              ></div>
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
      <!-- <div
        v-if="!tableData.length"
        style="text-align:center;margin-bottom:50px;"
      >
        <img
          src="../../../assets/img/print-1.jpg"
          style="width:280px;height:208px;margin-top:50px;margin-bottom:10px;"
        />
        <p>暂无数据</p>
      </div>-->
      <div v-if="infoDialogFlag">
        <infoDialog :dataInfo="detailListVal" :title="title" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import infoDialog from "common/taskImgDetail";
export default {
  name: "record",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,

      optionsBottom1: [],
      optionsBottom2: [],
      optionsBottom3: [],
      infoDialogFlag: false,
      title: "记录",
      detailListVal: "",
      tableData: [],

      dataTypeBottom1: "",
      dataTypeBottom2: "",
      dataTypeBottom3: "",
      judgetypeBottom2: true,
      judgetypeBottom3: true,

      createDateBottom: "",
      endDateBottom: "",
      rowkey: "",
      status: ""
    };
  },
  mounted() {
    this.createDateBottom = new Date(new Date().setHours(0, 0, 0, 0));
    this.endDateBottom = new Date();
    this.getoptions();
  },
  computed: {
    ...mapState(["lookUp"])
  },

  watch: {
    createDateBottom() {
      this.tableData = [];
      this.judgeTimeTwo();
    },
    endDateBottom() {
      this.tableData = [];
      this.judgeTimeTwo();
    },
    dataTypeBottom1() {
      this.dataTypeBottom2 = "";
      this.tableData = [];
      this.decideBottom();
    },
    dataTypeBottom2() {
      this.dataTypeBottom3 = "";
      this.tableData = [];
      this.decideBottom();
    },
    rowkey() {
      this.tableData = [];
    },
    status() {
      this.tableData = [];
    }
  },
  components: { infoDialog },
  methods: {
    //清空
    empty() {
      this.pendingCount = "-";
      this.resultCount = "-";
      this.passCount = "-";
      this.failCount = "-";
    },
    judgeTimeTwo() {
      if (this.createDateBottom && this.endDateBottom) {
        if (this.endDateBottom < this.createDateBottom) {
          this.endDateBottom = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    },
    openDetail(val) {
      this.detailListVal = val.graphicId;
      this.infoDialogFlag = true;
    },

    //审核详细查询
    getInfo() {
      let data = {
        dataSource: this.dataTypeBottom3,
        lastProcessDate: this.createDateBottom,
        lastEndProcessDate: this.endDateBottom,
        lastProcessResult: this.status,
        rowKey: this.rowkey
      };
      let vm = this;
      vm.api
        .post(
          `./manage/service/graphicsResult/query?currentPage=${
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
    //查询
    query() {
      this.getInfo();
    },
    //重置
    reset() {
      this.dataTypeBottom1 = "";
      this.dataTypeBottom2 = "";
      this.dataTypeBottom3 = "";
      this.createDateBottom = new Date(new Date().setHours(0, 0, 0, 0));
      this.endDateBottom = new Date();
      this.status = "";
      this.rowkey = "";
      this.getInfo();
    },

    //获取内容下拉数据
    getoptions() {
      let vm = this;
      vm.api
        .get(
          `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=1`
        )
        .then(function(response) {
          vm.optionsTop1 = response.data;
          vm.optionsBottom1 = response.data;
        })
        .catch(function(error) {});
    },

    //校验
    decideBottom() {
      if (this.dataTypeBottom1) {
        this.judgetypeBottom2 = false;
        let vm = this;
        vm.api
          .get(
            `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=2&code=${
              this.dataTypeBottom1
            }`
          )
          .then(function(response) {
            vm.optionsBottom2 = response.data;
          })
          .catch(function(error) {});
      } else {
        this.judgetypeTop2 = true;
      }
      if (this.dataTypeBottom2) {
        let vm = this;
        vm.api
          .get(
            `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=3&code=${
              this.dataTypeBottom2
            }`
          )
          .then(function(response) {
            vm.optionsBottom3 = response.data;
          })
          .catch(function(error) {});
        this.judgetypeBottom3 = false;
      } else {
        this.judgetypeBottom3 = true;
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInfo();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInfo();
    }
  }
};
</script>

<style scoped lang="less">
.record {
  overflow: hidden;
  .search-box-one {
    // margin-top: 20px;
  }
}
</style>
