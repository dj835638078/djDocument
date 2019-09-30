<template>
  <div class="dayUnitDetail" ref="dayUnitDetail"></div>
</template>

<script>
export default {
  data() {
    return {
      userNameArr: [],
      legendArr: ["月出错总量", "今日出错量"],
      seriesObjTotal: {
        name: "月出错总量",
        type: "bar",
        // stack: "总量",
        barMaxWidth: 30,
        // label: {
        //   normal: {
        //     show: true,
        //     position: "inside"
        //   }
        // },
        data: []
      },
      seriesObjToday: {
        name: "今日出错量",
        type: "bar",
        // stack: "总量",
        barGap: "-100%",
        barMaxWidth: 30,
        data: []
      },
      seriesDataArr: []
    };
  },
  props: ["dataEcharts"],
  watch: {
    dataEcharts: {
      handler() {
        this.dayUnitDetail();
      },
      deep: true
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.dayUnitDetail();
  },
  methods: {
    //质量排行TOP10
    dayUnitDetail() {
      let vm = this;
      let arrFlag = this.dataEcharts.userDataDayVo;
      let arrAemporary = [];
      this.seriesObjTotal.data = [];
      this.seriesObjToday.data = [];
      for (var i = 0; i < arrFlag.length; i++) {
        arrAemporary.push(arrFlag[i].userName);
        this.seriesObjTotal.data.push(arrFlag[i].errorCountNum);
        this.seriesObjToday.data.push(arrFlag[i].errorNum);
      }
      this.userNameArr = arrAemporary;
      this.seriesDataArr = [];
      this.seriesDataArr.push(this.seriesObjTotal);
      this.seriesDataArr.push(this.seriesObjToday);
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.dayUnitDetail);
      let option = {
        color: ["#00CDCA", "#569CF5"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: this.legendArr,
          padding: 0
        },
        grid: {
          left: "3%",
          right: "2%",
          bottom: "5%",
          top: "8%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.userNameArr,
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: "0",
              rotate: 45
              // formatter: function(value) {
              //   //x轴的文字改为竖版显示
              //   var str = value.split("");
              //   return str.join("\n");
              // }
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
        series: this.seriesDataArr
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
.dayUnitDetail {
  width: 100%;
  height: 400px;
}
</style>