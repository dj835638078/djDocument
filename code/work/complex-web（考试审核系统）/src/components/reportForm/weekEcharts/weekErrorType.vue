<template>
  <div class="weekErrorTypeBox">
    <h3 class="reportFormTitle">
      二、错误类型与分类{{ errorTypeData.errorRefuse.length }}
    </h3>
    <div class="content" v-if="JSON.stringify(errorTypeData) != '{}'">
      <div class="contentTitle alignCenter">本周各版块误过错误类型</div>
      <div
        class="txErrorType"
        ref="txErrorPass"
        v-if="errorTypeData.errorPass && errorTypeData.errorPass.length"
      ></div>
      <div class="noDataTitle" v-else>暂无数据</div>
      <div class="contentTitle alignCenter">本周各版块误拒错误类型</div>
      <div v-if="errorTypeData.errorRefuse && errorTypeData.errorRefuse.length">
        <div class="txErrorType" ref="txErrorReject"></div>
      </div>
      <div class="noDataTitle" v-else>暂无数据</div>
      <div
        class="weekErrorTypeTable"
        v-if="
          errorTypeData.errorSt && JSON.stringify(errorTypeData.errorSt) != '{}'
        "
      >
        <div class="listTitle">
          <div class="typeTitle fontStyle borderRight">本周重点错误</div>
          <div class="typeTitle fontStyle borderRight">
            "{{
              tools.setErrorType(errorTypeData.errorSt.errorType)
            }}"主要成员分布
          </div>
          <div class="typeTitle fontStyle">
            误拒总量（<span class="fontColor">{{
              errorTypeData.errorSt.count
            }}</span
            >）
          </div>
        </div>
        <div class="listContent">
          <div class="typeContent">
            {{ tools.setErrorType(errorTypeData.errorSt.errorType) }}
          </div>
          <div class="typeContent">
            <span
              v-for="(item, key, index) in errorTypeData.errorSt.groupDistr"
            >
              {{ regionNameStore[key] }}（<span class="fontColor">{{
                item
              }}</span
              >）
            </span>
          </div>
          <div class="typeContent">
            {{ tools.setErrorTypeArr(errorTypeData.errorSt.errorReasonDistr) }}
          </div>
        </div>
      </div>
      <div class="contentTitle">腾讯错误类型与分类对比</div>
      <div class="txErrorType" ref="txErrorType"></div>
      <barTwoEcharts :genreThan="errorTypeData.genreThan" />
    </div>
    <div class="noDataTitle" v-else>暂无数据</div>
  </div>
</template>

<script>
import barTwoEcharts from "./barTwoEcharts";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["errorTypeData"],
  components: { barTwoEcharts },
  computed: {
    ...mapState(["regionNameStore"])
  },
  mounted() {
    this.txErrorType();
    this.txErrorPass();
    this.txErrorReject();
  },
  // watch: {
  //   errorTypeData: {
  //     handler() {
  //       this.txErrorType();
  //       this.txErrorPass();
  //       this.txErrorReject();
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    //本周各版块误过错误类型
    txErrorPass() {
      let vm = this;
      let errorPassDataFlag = vm.errorTypeData.errorPass;
      let errorPassData = [];
      let errorPassXAxisData = [];
      let colorFlag = [];
      for (var i = 0; i < errorPassDataFlag.length; i++) {
        errorPassData.push(errorPassDataFlag[i].count);
        colorFlag.push(errorPassDataFlag[i].color);
        errorPassXAxisData.push(
          vm.tools.setErrorType(errorPassDataFlag[i].errorType)
        );
      }
      // 基于准备好的dom，初始化echarts实例
      // let data = errorPassData;
      let yMax = 100;
      let dataShadow = [];
      for (var i = 0; i < errorPassData.length; i++) {
        dataShadow.push(yMax);
      }
      let myChart = vm.$echarts.init(vm.$refs.txErrorPass);
      let option = {
        color: colorFlag,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "5%",
          top: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: errorPassXAxisData,
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            minInterval: 1,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#F0F2F5"
              }
            }
          }
        ],
        series: [
          // {
          //   // For shadow
          //   type: "bar",
          //   itemStyle: {
          //     normal: { color: "rgba(0,0,0,0.05)" }
          //   },
          //   barGap: "-100%",
          //   barCategoryGap: "40%",
          //   data: dataShadow,
          //   barMaxWidth: 30,
          //   animation: false
          // },
          {
            type: "bar",
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                color: "#00CDCA"
              },
              emphasis: {
                color: "#00CDCA"
              }
            },
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "rgba(0,0,0,0.65)",
                fontSize: 12
              }
            },
            data: errorPassData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      //   }
      // })
      // .catch(function(error) {});
    },
    //本周各版块误拒错误类型
    txErrorReject() {
      let vm = this;
      let errorRefuseDataFlag = vm.errorTypeData.errorRefuse;
      if (!errorRefuseDataFlag.length) {
        return;
      }
      let errorRefuseData = [];
      let refuseData = [];
      let errorRefuseXAxisData = [];
      let colorFlag = [];
      for (var i = 0; i < errorRefuseDataFlag.length; i++) {
        errorRefuseData.push(errorRefuseDataFlag[i].count);
        colorFlag.push(errorRefuseDataFlag[i].color);
        errorRefuseXAxisData.push(
          vm.tools.setErrorType(errorRefuseDataFlag[i].errorType)
        );
      }
      // 基于准备好的dom，初始化echarts实例
      refuseData = errorRefuseData;
      let yMax = 500;
      let dataShadow = [];
      for (var i = 0; i < refuseData.length; i++) {
        dataShadow.push(yMax);
      }
      let myChart = vm.$echarts.init(vm.$refs.txErrorReject);
      let option = {
        // color: ["#00CDCA"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "5%",
          top: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: errorRefuseXAxisData,
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            minInterval: 1,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#F0F2F5"
              }
            }
          }
        ],
        series: [
          // {
          //   // For shadow
          //   type: "bar",
          //   itemStyle: {
          //     normal: { color: "rgba(0,0,0,0.05)" }
          //   },
          //   barGap: "-100%",
          //   barCategoryGap: "40%",
          //   data: dataShadow,
          //   barMaxWidth: 30,
          //   animation: false
          // },
          {
            type: "bar",
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                color: "#00CDCA"
              },
              emphasis: {
                color: "#00CDCA"
              }
            },
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                //数值样式
                color: "rgba(0,0,0,0.65)",
                fontSize: 12
              }
            },
            data: refuseData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    },
    //腾讯错误类型与分类对比
    txErrorType() {
      let vm = this;
      let customerErrorDataFlag = vm.errorTypeData.customerError;
      let customerErrorData = [];
      let customerErrorXAxisData = [];
      let colorFlag = [];
      for (var i = 0; i < customerErrorDataFlag.length; i++) {
        customerErrorData.push(customerErrorDataFlag[i].count);
        colorFlag.push(customerErrorDataFlag[i].color);
        customerErrorXAxisData.push(
          vm.tools.setErrorType(customerErrorDataFlag[i].errorType)
        );
      }
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.txErrorType);
      let option = {
        color: colorFlag,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "5%",
          top: "5%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: customerErrorXAxisData,
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            minInterval: 1,
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#F0F2F5"
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barMaxWidth: 30,
            data: customerErrorData
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: true, //开启显示
            //       position: "top", //在上方显示
            //       textStyle: {
            //         //数值样式
            //         color: "rgba(0,0,0,0.65)",
            //         fontSize: 12
            //       }
            //     }
            //   }
            // }
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
.weekErrorTypeBox {
  .content {
    // height: 300px;
    .alignCenter {
      text-align: center;
    }
    .contentTitle {
      font-size: 15px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 21px;
      margin: 20px 0;
    }
    .txErrorType {
      height: 300px;
    }
    .weekErrorTypeTable {
      position: relative;
      width: 1200px;
      height: 90px;
      // width: 100%;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(235, 238, 245, 1);
      text-align: center;
      margin: 20px 0;
      .listTitle {
        display: flex;
        height: 46px;
        line-height: 48px;
        background: rgba(240, 242, 245, 1);
        .typeTitle {
          flex: 1;
        }
      }
      .fontStyle {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
      }
      .borderRight {
        border-right: 1px solid #fff;
      }
      .fontColor {
        color: #00cdca;
        font-weight: 400;
      }
      .listContent {
        display: flex;
        height: 42px;
        line-height: 42px;
        .typeContent {
          flex: 1;
        }
      }
    }
  }
}
</style>