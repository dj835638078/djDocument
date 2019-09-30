<template>
  <div class="dayQualityTopBox">
    <div class="content">
      <div class="dayQualityTop" ref="dayQualityTop"></div>
    </div>
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
  props: ["dayQualityTopData"],
  components: {},
  computed: {},
  mounted() {
    this.dayQualityTop();
  },
  watch: {
    dayQualityTopData: {
      handler() {
        this.dayQualityTop();
      },
      deep: true
    }
  },
  methods: {
    //质量排行TOP10
    dayQualityTop() {
      let vm = this;
      let arrFlag = this.dayQualityTopData;
      let xAxisDataArr = [];
      let seriesDataArr = [];
      for (var i = 0; i < arrFlag.length; i++) {
        xAxisDataArr.push(arrFlag[i].processAccount);
        seriesDataArr.push(arrFlag[i].errorNum);
      }
      this.xAxisData = xAxisDataArr;
      this.seriesData = seriesDataArr;
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.dayQualityTop);
      let option = {
        color: ["#00CDCA"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          top: "8%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxisData,
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: "0"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#F0F2F5"
              }
            },
            minInterval: 1
          }
        ],
        series: [
          {
            name: "质检出错量",
            type: "bar",
            // barWidth: "60%",
            data: this.seriesData,
            barMaxWidth: 30,
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "rgba(0,0,0,0.65)",
                    fontSize: 12
                  }
                }
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option, true);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
.dayQualityTopBox {
  .content {
    height: 300px;
    .dayQualityTop {
      height: 100%;
    }
  }
}
</style>