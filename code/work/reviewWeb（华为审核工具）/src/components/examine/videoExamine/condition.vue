<template>
  <div class="condition">
    <!--one-->
    <div style="overflow:hidden;">
      <div class="search-box">
        <div class="search-box-one">
          <div class="video-box-name">分类：</div>
          <div class="search-box-top">
            <div class="video-box">
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
              <div class="video-box-two-name">来源：</div>
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
          <div class="new" style="margin-right:20px;" @click="census">
            <i class="fa fa-pie-chart"></i>统计
          </div>
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
      failCount: "-",
      videoType: "",
      dataSource: "",
      secondDataSource: "",
      sourceList: []
    };
  },
  mounted() {
    this.createDateTop = new Date(new Date().setHours(0, 0, 0, 0));
    this.endDateTop = new Date();
    this.getoptions();
  },
  computed: {
    ...mapState(["lookUp", "lookUpAdd"])
  },

  watch: {
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
        videoType: this.videoType,
        dataSource: this.dataSource,
        secondDataSource: this.secondDataSource,
        startDate: this.createDateTop,
        endDate: this.endDateTop
      };
      let vm = this;
      api
        .post(`./manage/service/videoVerify/queryCount`, data)
        .then(function(response) {
          vm.pendingCount = response.data.pendingCount;
          vm.resultCount = response.data.resultCount;
          vm.passCount = response.data.passCount;
          vm.failCount = response.data.failCount;
        })
        .catch(function(error) {});
    },
    //获取内容下拉数据
    getoptions() {
      let vm = this;
      api
        .get(`./manage/service/channelLookUp/findLookUps?type=1_1&level=1`)
        .then(function(response) {
          vm.optionsTop1 = response.data;
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style scoped lang="less">
.condition {
  overflow: hidden;
  .video-box-name,
  .video-box-two-name {
    line-height: 32px;
    height: 32px;
    // width: 80px !important;
    margin-left: 20px;
    flex: 0 0 80px;
    // display: flex;
    // span {
    //   display: inline-block !important;
    //   width: 48px !important;
    // }
  }
  .video-box-two-name {
    flex: 0 0 50px;
  }
  .video-box-two-select {
    margin-right: 20px;
  }
  .search-box {
    width: 100%;
    position: relative;
    .search-box-one {
      margin-top: 20px;
      width: 100%;
      display: flex;
      .search-box-top {
        display: flex;
        width: 100% !important;
        flex: 1;
        .video-box {
          display: flex;
        }
        .video-box-two {
          display: flex;
          .video-box-two-child {
            display: flex;
          }
        }
      }
    }
    .search-box-two {
      width: 1236px !important;
      display: flex;
      .box-two {
        // width: 775px !important;
        flex: 1;
      }
    }
    .search-box-right {
      position: absolute;
      // left: 648px;
      right: 0;
      bottom: 0;
    }
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
