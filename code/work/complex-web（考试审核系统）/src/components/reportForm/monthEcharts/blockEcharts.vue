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
  props: ["blockEcharts"],
  components: {},
  computed: {},
  mounted() {
    this.dayUnitDetail();
  },
  watch: {
    blockEcharts: {
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
      let arrFlag = this.blockEcharts;
      let arrAemporary = [];
      let userNameArr = [];
      let currentData = [];
      let preData = [];
      let prePreData = [];
      for (var i = 0; i < arrFlag.length; i++) {
        arrAemporary.push(arrFlag[i].dataSource);
        currentData.push(arrFlag[i].correctRate || "");
        preData.push(arrFlag[i].beforeOneCorrectRate || "");
        prePreData.push(arrFlag[i].beforeTwoCorrectRate || "");
      }
      userNameArr = arrAemporary;
      // 基于准备好的dom，初始化echarts实例
      let myChart = vm.$echarts.init(vm.$refs.dayUnitDetail);
      let option = {
        color: ["#37A2DA", "#00CDCA", "#FFDB5C"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "none" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(data, ticket, callback) {
            // debugger;
            let str = "";
            let showVal = "";
            let showList = "";
            for (var i = 0; i < data.length; i++) {
              showVal = data[0].axisValue;
              showList += `<div><div style="width:11px;height:11px;border-radius:50%;background:${
                data[i].color
              };display:inline-block;margin-right:5px"></div><span style="color:#fff">${
                data[i].seriesName
              }：${
                data[i].value == undefined || data[i].value == ""
                  ? "0"
                  : data[i].value + "%"
              } </span></div>`;
            }
            return showVal + showList;
          }
        },
        legend: {
          data: ["本月正确率", "上月正确率", "上上月正确率"],
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
            axisLabel: {
              formatter: "{value} %"
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
            name: "本月正确率",
            type: "bar",
            // stack: "总量",
            barMaxWidth: 30,
            // label: {
            //   normal: {
            //     show: true,
            //     position: "inside"
            //   }
            // },
            data: currentData
          },
          {
            name: "上月正确率",
            type: "bar",
            // stack: "总量",
            barMaxWidth: 30,
            // label: {
            //   normal: {
            //     show: true,
            //     position: "inside"
            //   }
            // },
            data: preData
          },
          {
            name: "上上月正确率",
            type: "bar",
            // stack: "总量",
            barMaxWidth: 30,
            // label: {
            //   normal: {
            //     show: true,
            //     position: "inside"
            //   }
            // },
            data: prePreData
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
  height: 400px;
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  .dayUnitDetail {
    // width: 100%;
    height: 400px;
    flex: 1;
  }
}
</style>