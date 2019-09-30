<template>
  <div class="director">
    <div class="top-box">
      <div class="infoHeadSearch" style="margin-bottom:0px;">
        <el-form>
          <el-form-item label="内容选择" required class="content">
            <el-select v-model="channelType" placeholder="请选择" clearable>
              <el-option
                v-for="(item, index) in lookUp.QUALITY_CHECKED"
                :label="item.itemName"
                :value="item.itemCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="质检时间" required class="timeCheck">
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
            label="内容选择"
            required
            class="content"
            style="opacity:0"
          >
            <el-select v-model="channelType" placeholder="请选择">
              <el-option
                v-for="(item, index) in lookUp.QUALITY_CHECKED"
                :label="item.itemName"
                :value="item.itemCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item required class="btnBox">
            <div class="line" style="opacity:0">-</div>
            <div class="btnlist flexlayout">
              <div
                v-if="channelType && startDate && endDate"
                class="query"
                @click="researchForm"
              >
                <i class="fa fa-search"></i>查询
              </div>
              <div v-else class="release"><i class="fa fa-search"></i>查询</div>
              <div
                v-if="channelType && startDate && endDate"
                class="query"
                @click="deriveForm"
              >
                <i class="fa fa-file-excel-o"></i>导出
              </div>
              <div v-else class="release">
                <i class="fa fa-file-excel-o"></i>导出
              </div>
              <div class="query resetBtn" @click="resetForm">
                <i class="fa fa-refresh"></i>重置
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="divide"></div>
    <div class="content-box" v-bind:style="{ height: tableHeightOne + 'px' }">
      <div class="content-box-left">
        <div class="chart">
          <div class="chart-box" v-if="tableList && tableList.length">
            <div class="chart-box-title">各模块抽检占比：</div>
            <div class="chartBoxBox">
              <div class="chart-box-content" ref="myChart" id="myChart"></div>
            </div>
          </div>
          <div class="chart-box" v-else>
            <div class="chart-box-title noDataTitle">各模块抽检占比：</div>
            <div class="noData">暂无数据</div>
          </div>
        </div>
      </div>
      <div class="content-box-divide"></div>
      <div class="content-box-btoom">
        <Table
          :tableList="tableList"
          :totalCount="totalCount"
          :totalErrorRate="totalErrorRate"
          :dataSourceList="dataSourceList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Table from "./table";
import { mapState } from "vuex";
export default {
  data() {
    return {
      channelType: "",
      startDate: "",
      endDate: "",
      tableList: [],
      totalCount: "",
      totalErrorRate: "",
      dataSourceList: [],
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
    Table
  },
  watch: {
    startDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    },
    menuLinkFlag(newVal, oldVal) {
      this.$echarts.init(this.$refs.myChart).resize();
    }
  },
  computed: {
    ...mapState(["lookUp", "tableHeightOne", "menuLinkFlag"])
  },
  mounted() {
    //获取当前时间零点
    this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
  },
  methods: {
    researchForm() {
      this.getData();
    },
    deriveForm() {
      let vm = this;
      let data = {
        channelType: this.channelType,
        startDate: this.startDate,
        endDate: this.endDate
      };
      vm.api
        .post(`./manage/service/checkedStatistics/exportAll`, data)
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
      this.channelType = "";
      this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
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
    //查询数据
    getData() {
      let vm = this;
      let data = {
        channelType: this.channelType,
        startDate: this.startDate,
        endDate: this.endDate
      };
      vm.api
        .post(`./manage/service/checkedStatistics/findCount`, data)
        .then(function(response) {
          vm.type = vm.channelType;
          vm.sDate = vm.startDate.getTime();
          vm.eDate = vm.endDate.getTime();
          if (response.status == 200) {
            vm.tableList = response.data.data;
            vm.totalCount = response.data.totalCount;
            vm.totalErrorRate = response.data.totalErrorRate;
            vm.dataSourceList = response.data.dataSourceList;
            vm.$nextTick(() => {
              vm.initChart();
            });
          }
        })
        .catch(function(error) {});
    },
    initChart() {
      let vm = this;
      if (!vm.tableList.length) {
        return;
      }
      let legendData = [];
      let seriesData = [];
      let colorData = [];
      for (var i = 0; i < vm.tableList.length; i++) {
        legendData.push(vm.tableList[i].moduleName);
        let seriesObj = {};
        seriesObj.value = vm.tableList[i].checkedCount;
        seriesObj.name = vm.tableList[i].moduleName;
        seriesData.push(seriesObj);
        colorData.push(vm.tableList[i].color);
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.myChart);
      // 指定图表的配置项和数据
      let option = {
        // title: {
        //   text: "某站点用户访问来源",
        //   subtext: "纯属虚构",
        //   x: "center"
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} : {d}% <br/>{b} : {c} "
        },
        // legend: {
        //   type: "scroll",
        //   left: 10,
        //   top: 40,
        //   bottom: 68,
        //   orient: "vertical",
        //   x: "left",
        //   data: legendData
        // },
        series: [
          {
            name: "抽检占比",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "45%"],
            data: seriesData,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              },
              normal: {
                formatter: "{per|{b}}  ",
                rich: {
                  per: {
                    color: "rgba(0,0,0,0.65)"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              // emphasis: {
              //   shadowBlur: 10,
              //   shadowOffsetX: 0,
              //   shadowColor: "rgba(0, 0, 0, 0.5)"
              // }
            },
            color: colorData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
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
    .content-box-left {
      width: calc(50% - 8px);
      height: 100%;
      float: left;
      .chart {
        overflow: hidden;
        height: 100%;
        .chart-box {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          .noDataTitle {
            height: 79px !important;
          }
          .noData {
            width: 100%;
            height: 68%;
            font-size: 12px;
            color: #909399;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          //标题
          .chart-box-title {
            height: 54px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.85);
            line-height: 51px;
            margin-left: 20px;
          }
          .chartBoxBox {
            width: 100%;
            height: calc(100% - 54px);
            margin-top: 10px;
            .chart-box-content {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .content-box-divide {
      width: 16px;
      float: left;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      margin-left: calc(50% - 8px);
      background: #f0f2f5;
    }
    .content-box-btoom {
      width: calc(50% - 8px);
      float: left;
      margin-left: 16px;
    }
  }
}
</style>
