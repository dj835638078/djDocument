<template>
  <div class="condition">
    <!--one-->
    <div style="overflow:hidden;">
      <div class="search-box-one">
        <div class="search-box-top">
          <div class="search-box-top-name" style="margin-left:20px">
            <span>*</span>内容选择：
          </div>
          <div class="search-box-top-right">
            <div class="one-box">
              <div class="one-box-child">
                <el-select v-model="dataTypeTop1" placeholder="请选择审核类型">
                  <el-option
                    v-for="item in optionsTop1"
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
                  v-model="dataTypeTop2"
                  placeholder="请选择审核通道"
                  :disabled="judgetypeTop2"
                >
                  <el-option
                    v-for="item in optionsTop2"
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
                  v-model="dataTypeTop3"
                  placeholder="请选择审核来源"
                  :disabled="judgetypeTop3"
                >
                  <el-option
                    v-for="item in optionsTop3"
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
      </div>
      <div class="search-box-two">
        <div class="search-box-top-name" style="margin-left:20px">
          <span>*</span>领单时间：
        </div>
        <div class="box-two">
          <div class="two-one-box">
            <div class="box-two-child">
              <el-date-picker
                v-model="createDateTop"
                type="datetime"
                placeholder="选择领单时间"
              >
              </el-date-picker>
            </div>
            <div class="Pul">-</div>
          </div>
          <div class="two-one-box">
            <div class="box-two-child">
              <el-date-picker
                v-model="endDateTop"
                type="datetime"
                placeholder="选择领单时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="search-box-right">
        <div
          v-if="dataTypeTop3 && createDateTop && endDateTop"
          class="new"
          style="margin-right:20px;"
          @click="census"
        >
          <i class="fa fa-pie-chart"></i>统计
        </div>
        <div v-else class="release" style="margin-right:20px;">
          <i class="fa fa-pie-chart"></i>统计
        </div>
      </div>
      <div class="clear"></div>
      <div class="condition-situation">
        <div class="condition-situation-box">
          <div class="condition-situation-box-one">
            <div class="unified" style="border-left:3px solid #F5222D;">
              <div class="unified-top">
                <div class="unified-top-left" style="background:#F5222D"></div>
                <div class="unified-top-right">已领单未审核</div>
              </div>
              <div class="unified-bottom">
                <div class="unified-num" style="color:#F5222D">
                  {{ pendingCount }}
                </div>
              </div>
            </div>
          </div>
          <div class="condition-situation-box-one">
            <div class="unified" style="border-left:3px solid #4CA9FF;">
              <div class="unified-top">
                <div class="unified-top-left" style="background:#4CA9FF"></div>
                <div class="unified-top-right">已审核</div>
              </div>
              <div class="unified-bottom">
                <div class="unified-num" style="color:#4CA9FF">
                  {{ resultCount }}
                </div>
              </div>
            </div>
          </div>
          <div class="condition-situation-box-one">
            <div class="unified" style="border-left:3px solid #52C41A;">
              <div class="unified-top">
                <div class="unified-top-left" style="background:#52C41A"></div>
                <div class="unified-top-right">已通过</div>
              </div>
              <div class="unified-bottom">
                <div class="unified-num" style="color:#52C41A">
                  {{ passCount }}
                </div>
              </div>
            </div>
          </div>
          <div class="condition-situation-box-one">
            <div class="unified" style="border-left:3px solid #C8C8C8;">
              <div class="unified-top">
                <div class="unified-top-left" style="background:#C8C8C8"></div>
                <div class="unified-top-right">不通过</div>
              </div>
              <div class="unified-bottom">
                <div class="unified-num">{{ failCount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "condition",
  data() {
    return {
      //当前页
      optionsTop1: [],
      optionsTop2: [],
      optionsTop3: [],
      tableData: [],
      dataTypeTop1: "",
      dataTypeTop2: "",
      dataTypeTop3: "",
      judgetypeTop2: true,
      judgetypeTop3: true,
      createDateTop: "",
      endDateTop: "",
      rowkey: "",
      status: "",
      //审核情况的数量
      pendingCount: "-",
      resultCount: "-",
      passCount: "-",
      failCount: "-"
    };
  },
  mounted() {
    this.createDateTop = new Date(new Date().setHours(0, 0, 0, 0));
    this.endDateTop = new Date();
    this.getoptions();
  },
  computed: {
    ...mapState(["lookUp"])
  },

  watch: {
    dataTypeTop1() {
      this.dataTypeTop2 = "";
      this.empty();
      this.decideTop();
    },
    dataTypeTop2() {
      this.dataTypeTop3 = "";
      this.empty();
      this.decideTop();
    },
    createDateTop() {
      this.empty();
      this.judgeTime();
    },
    endDateTop() {
      this.empty();
      this.judgeTime();
    },
    status() {
      this.tableData = [];
    }
  },
  methods: {
    //清空
    empty() {
      this.pendingCount = "-";
      this.resultCount = "-";
      this.passCount = "-";
      this.failCount = "-";
    },
    //判断时间
    judgeTime() {
      if (this.createDateTop && this.endDateTop) {
        if (this.endDateTop < this.createDateTop) {
          this.endDateTop = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    },

    //统计
    census() {
      this.getSituation();
    },
    //审核情况
    getSituation() {
      let data = {
        dataSource: this.dataTypeTop3,
        createDate: this.createDateTop,
        endDate: this.endDateTop
      };
      let vm = this;
      api
        .post(`./manage/service/graphicsResult/queryCount`, data)
        .then(function(response) {
          vm.pendingCount = response.data.pendingCount;
          vm.resultCount = response.data.resultCount;
          vm.passCount = response.data.passCount;
          vm.failCount = response.data.failCount;
        })
        .catch(function(error) {});
    },

    //校验
    decideTop() {
      if (this.dataTypeTop1) {
        this.judgetypeTop2 = false;
      } else {
        this.judgetypeTop2 = true;
      }
      if (this.dataTypeTop2) {
        this.judgetypeTop3 = false;
      } else {
        this.judgetypeTop3 = true;
      }
    },
    //获取内容下拉数据
    getoptions() {
      let vm = this;
      api
        .get(
          `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=1`
        )
        .then(function(response) {
          vm.optionsTop1 = response.data;
        })
        .catch(function(error) {});
    },
    //校验
    decideTop() {
      if (this.dataTypeTop1) {
        this.judgetypeTop2 = false;
        let vm = this;
        api
          .get(
            `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=2&code=${
              this.dataTypeTop1
            }`
          )
          .then(function(response) {
            vm.optionsTop2 = response.data;
          })
          .catch(function(error) {});
      } else {
        this.judgetypeTop2 = true;
      }
      if (this.dataTypeTop2) {
        let vm = this;
        api
          .get(
            `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=3&code=${
              this.dataTypeTop2
            }`
          )
          .then(function(response) {
            vm.optionsTop3 = response.data;
          })
          .catch(function(error) {});
        this.judgetypeTop3 = false;
      } else {
        this.judgetypeTop3 = true;
      }
    }
  }
};
</script>

<style scoped lang="less">
.condition {
  overflow: hidden;
  .search-box-one {
    margin-top: 20px;
  }
  .condition-situation {
    padding: 20px 20px 20px 0px;
    overflow: hidden;
    .condition-situation-box {
      width: 100%;
      .condition-situation-box-one {
        width: 25%;
        float: left;
        .unified {
          border: 1px solid #d9d9d9;
          width: calc(100% - 24px);
          height: 74px;
          margin-left: 20px;
          .unified-top {
            height: 37px;
            .unified-top-left {
              float: left;
              width: 10px;
              height: 10px;
              border-radius: 50%;

              margin-top: 13.5px;
              margin-left: 20px;
              margin-right: 5px;
            }
            .unified-top-right {
              color: #000000;
              float: left;
              line-height: 37px;
            }
          }
          .unified-bottom {
            height: 37px;
            .unified-num {
              margin-left: 35px;
              line-height: 30px;
              font-size: 24px;
            }
          }
        }
      }
    }
  }
}
</style>
