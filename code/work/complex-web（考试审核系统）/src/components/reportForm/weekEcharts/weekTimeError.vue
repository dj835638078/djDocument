<template>
  <div class="dayQualityTopBox">
    <!-- <h3 class="reportFormTitle">三、时段错误</h3> -->
    <h3 class="detailTitle">本周各时段错误量</h3>
    <div class="content">
      <div class="dayQualityTop" ref="dayQualityTop"></div>
    </div>
    <!-- <div class="noDataTitle" v-else>暂无数据</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      xAxisData: [],
      seriesData: []
    };
  },
  props: ["tableData"],
  components: {},
  computed: {},
  mounted() {
    this.dayQualityTop();
  },
  watch: {
    tableData: {
      handler() {
        this.dayQualityTop();
      },
      deep: true
    }
  },
  methods: {
    //三、时段错误
    dayQualityTop() {
      let vm = this;
      let dataFlag = this.tableData;
      let xAxisDataArr = [];
      let seriesDataArr = [];
      for (var key in dataFlag) {
        xAxisDataArr.push(key);
        seriesDataArr.push(dataFlag[key]);
      }
      this.xAxisData = xAxisDataArr;
      this.seriesData = seriesDataArr;
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.dayQualityTop);
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
        // legend: {
        //   top: "4%",
        //   // data: dataLegend
        //   data: ["邮件营销"]
        // },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "8%",
          top: "10%",
          containLabel: true
        },
        color: ["#40DCE4"],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: dataxAxis,
            data: this.xAxisData,
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
            minInterval: 1,
            scale: true,
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
        series: [
          {
            name: "错误量",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: this.seriesData,
            areaStyle: {
              opacity: 0.2
            },
            itemStyle: { normal: { label: { show: true } } }
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
.dayQualityTopBox {
  .detailTitle {
    text-align: center;
    font-size: 15px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 21px;
  }
  .content {
    height: 300px;
    .dayQualityTop {
      height: 100%;
    }
  }
}
</style>