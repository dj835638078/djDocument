<template>
  <div class="weekErrorDetailBox">
    <div class="content">
      <div class="weekErrorDetail" ref="weekErrorDetail"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["weekErrorDetailData"],
  components: {},
  computed: {
    ...mapState(["regionNameStore"])
  },
  mounted() {
    this.weekErrorDetail();
  },
  watch: {
    weekErrorDetailData: {
      handler() {
        this.weekErrorDetail();
      },
      deep: true
    }
  },
  methods: {
    //质量排行TOP10
    weekErrorDetail() {
      let vm = this;
      let dataFlag = this.weekErrorDetailData;
      let xAxisDataArr = [];
      let legendDataArr = [];
      let seriesDataArr = [];
      let colorDataArr = [];
      for (var i = 0; i < dataFlag.length; i++) {
        legendDataArr.push(
          vm.tools.setErrorType(dataFlag[i].errorType) ||
            vm.tools.setErrorRefuseType(dataFlag[i].errorType)
        );
        let seriesDataObj = {
          name: "",
          type: "line",
          // stack: "总量",
          data: []
        };
        let seriesDataObjArr = [];
        seriesDataObj.name =
          vm.tools.setErrorType(dataFlag[i].errorType) ||
          vm.tools.setErrorRefuseType(dataFlag[i].errorType);
        colorDataArr.push(dataFlag[i].color);
        for (var key in dataFlag[i]) {
          if (this.regionNameStore[key]) {
            xAxisDataArr.push(this.regionNameStore[key]);
            seriesDataObjArr.push(dataFlag[i][key]);
          }
        }
        seriesDataObj.data = seriesDataObjArr;
        seriesDataArr.push(seriesDataObj);
      }
      let arrFlag = new Set(xAxisDataArr);
      xAxisDataArr = [...arrFlag];
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.weekErrorDetail);
      let option = {
        // title: {
        //   text: "订单完成情况分析：",
        //   top: "4%",
        //   left: "1.5%"
        // },
        tooltip: {
          trigger: "axis",
          // formatter: function(data) {
          //   let str = "";
          //   let showVal = "";
          //   let showList = "";
          //   for (var i = 0; i < data.length; i++) {
          //     showVal = data[0].data.showValue;
          //     showList += `<div><div style="width:11px;height:11px;border-radius:50%;background:${
          //       data[i].color
          //     };display:inline-block;margin-right:5px"></div><span style="color:#fff">${
          //       data[i].seriesName
          //     }：${data[i].value}</span></div>`;
          //   }
          //   return showVal + showList;
          // },
          axisPointer: {
            // type: "cross",
            // label: {
            //   backgroundColor: "#6a7985"
            // }
            lineStyle: {
              type: "dashed"
            }
          }
        },
        legend: {
          top: "4%",
          // data: dataLegend
          data: legendDataArr
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "2%",
          top: "15%",
          containLabel: true
        },
        color: colorDataArr,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: dataxAxis,
            data: xAxisDataArr,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(238,238,238)"
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            scale: true,
            minInterval: 1,
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgb(238,238,238)"
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["#ffffff", "rgb(243,243,243)"]
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        // series: dataSeries
        series: seriesDataArr
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      //   }
      // })
      // .catch(function(error) {});
    }
  }
};
</script>

<style scoped lang="less">
.weekErrorDetailBox {
  .detailTitle {
    text-align: center;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 21px;
  }
  .content {
    height: 400px;
    .weekErrorDetail {
      height: 400px;
    }
  }
}
</style>