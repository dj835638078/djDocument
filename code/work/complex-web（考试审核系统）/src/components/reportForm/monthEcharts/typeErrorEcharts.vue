<template>
  <div class="typeErrorNumBoxInfo">
    <div class="typeErrorNum" ref="typeErrorNum"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["typeErrorEcharts"],
  watch: {
    typeErrorEcharts: {
      handler() {
        this.typeErrorNum();
      },
      deep: true
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.typeErrorNum();
  },
  methods: {
    //质量排行TOP10
    typeErrorNum() {
      let vm = this;
      let arrFlag = this.typeErrorEcharts;
      let arrAemporary = [];
      let userNameArr = [];
      // let ColorArr = [];
      let preMonth = [];
      let currentMonth = [];
      for (var i = 0; i < arrFlag.length; i++) {
        arrAemporary.push(arrFlag[i].reviewTimeSlot);
        preMonth.push(arrFlag[i].beforeErrorNum);
        currentMonth.push(arrFlag[i].errorNum);
      }
      if (arrFlag && arrFlag[0]) {
        // ColorArr[0] = arrFlag[0].color;
        // ColorArr[1] = arrFlag[0].customercolor;
      }
      userNameArr = arrAemporary;
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.typeErrorNum);
      let option = {
        color: ["#00CDCA", "#F56D6D"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["本月出错量", "上月出错量"],
          padding: 0
        },
        grid: {
          left: "0%",
          right: "0%",
          bottom: "5%",
          top: "8%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: userNameArr,
            axisTick: {
              show: false
            }
            // axisLabel: {
            //   interval:  "0",
            //   formatter: function(value) {
            //     //x轴的文字改为竖版显示
            //     var str = value.split("");
            //     return str.join("\n");
            //   }
            // }
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
            name: "本月出错量",
            type: "bar",
            // stack: "总量",
            barMaxWidth: 30,
            // label: {
            //   normal: {
            //     show: true,
            //     position: "inside"
            //   }
            // },
            data: currentMonth
          },
          {
            name: "上月出错量",
            type: "bar",
            // stack: "总量",
            barMaxWidth: 30,
            // label: {
            //   normal: {
            //     show: true,
            //     position: "inside"
            //   }
            // },
            data: preMonth
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
.typeErrorNumBoxInfo {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  .typeErrorNum {
    // width: 100%;
    height: 400px;
    flex: 1;
  }
}
</style>