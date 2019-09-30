<template>
  <div class="dayUnitDetailBoxInfo">
    <div class="dayUnitDetail" ref="dayUnitDetail"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["genreThan"],
  components: {},
  computed: {},
  mounted() {
    this.dayUnitDetail();
  },
  watch: {
    genreThan: {
      handler() {
        this.dayUnitDetail();
      },
      deep: true
    }
  },
  methods: {
    //腾讯错误类型与分类对比
    dayUnitDetail() {
      let vm = this;
      let arrFlag = this.genreThan;
      let arrAemporary = [];
      let userNameArr = [];
      let ColorArr = [];
      let weekData = [];
      let txData = [];
      for (var i = 0; i < arrFlag.length; i++) {
        arrAemporary.push(vm.tools.setGroup(arrFlag[i].gGenre));
        weekData.push(arrFlag[i].count);
        txData.push(arrFlag[i].customerCount);
      }
      if (arrFlag && arrFlag[0]) {
        ColorArr[0] = arrFlag[0].color;
        ColorArr[1] = arrFlag[0].customercolor;
      }
      userNameArr = arrAemporary;
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.dayUnitDetail);
      let option = {
        color: ColorArr,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["周质检错误量", "腾讯质检错误量"],
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
        series: [
          {
            name: "周质检错误量",
            type: "bar",
            // stack: "总量",
            barMaxWidth: 30,
            // label: {
            //   normal: {
            //     show: true,
            //     position: "inside"
            //   }
            // },
            data: weekData
          },
          {
            name: "腾讯质检错误量",
            type: "bar",
            // stack: "总量",
            barMaxWidth: 30,
            // label: {
            //   normal: {
            //     show: true,
            //     position: "inside"
            //   }
            // },
            data: txData
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
.dayUnitDetailBoxInfo {
  width: 100%;
  height: 300px;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  .dayUnitDetail {
    // width: 100%;
    height: 300px;
    flex: 1;
  }
  .dayUnitDetailList {
    position: relative;
    flex: 0 0 210px;
    height: 130px;
    // width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(235, 238, 245, 1);
    text-align: center;
    .typeTitleBig {
      position: absolute;
      top: -40px;
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 22px;
    }
    .listTitle {
      display: flex;
      height: 46px;
      line-height: 48px;
      background: rgba(240, 242, 245, 1);
      .typeTitle {
        flex: 1;
      }
      .proportionTitle {
        border-left: 1px solid #fff;
        flex: 0 0 60px;
      }
    }
    .fontStyle {
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
    }
    .borderTop {
      border-top: 1px solid #ebeef5;
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
      .proportionContent {
        flex: 0 0 60px;
      }
    }
  }
}
</style>