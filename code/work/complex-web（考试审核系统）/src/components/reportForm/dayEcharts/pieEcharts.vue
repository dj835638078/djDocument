<template>
  <div class="dayErrorTypeBox">
    <div class="dayErrorType" ref="dayErrorType"></div>
    <div class="errorList">
      <div class="listTitle">
        <div class="typeTitle fontStyle">{{ dataSource }}主要出错类型</div>
        <div class="proportionTitle fontStyle">占比</div>
      </div>
      <div class="listContent">
        <div class="typeContent">
          {{ dataEcharts.length ? dataEcharts[0].errorType : "无" }}
        </div>
        <div class="proportionContent fontColor">
          {{ dataEcharts.length ? dataEcharts[0].errorPercent : "" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      colorData: [],
      echartDataArr: []
    };
  },
  props: ["dataEcharts", "dataSource"],
  components: {},
  computed: {},
  mounted() {
    this.dayErrorType();
  },
  watch: {
    dataEcharts: {
      handler() {
        this.dayErrorType();
      },
      deep: true
    }
  },
  methods: {
    //质量排行TOP10
    dayErrorType() {
      let vm = this;
      let dataFlag = this.dataEcharts;
      if (dataFlag.length > 5) {
        dataFlag = dataFlag.slice(0, 5);
      }

      let colorArr = [];
      let echartArr = [];
      if (dataFlag.length) {
        for (var i = 0; i < dataFlag.length; i++) {
          let echartObj = {};
          colorArr.push(dataFlag[i].color);
          echartObj.value = +dataFlag[i].errorNum;
          echartObj.name = dataFlag[i].errorType;
          echartObj.color = dataFlag[i].color;
          echartObj.errorPercent = dataFlag[i].errorPercent;
          echartArr.push(echartObj);
        }
      } else {
        let echartObj = {};
        colorArr.push("#00CDCA");
        echartObj.value = 0;
        echartObj.name = "";
        echartObj.color = "#00CDCA";
        echartObj.errorPercent = 0;
        echartArr.push(echartObj);
      }
      this.colorData = colorArr;
      this.echartDataArr = echartArr;
      // 基于准备好的dom，初始化echarts实例
      let scale = 1;
      let echartData = this.echartDataArr;
      let rich = {
        yellow: {
          color: "#ccc",
          fontSize: 12 * scale,
          padding: [5, 0],
          align: "center"
        },
        total: {
          color: "#ffc72b",
          fontSize: 12 * scale,
          align: "center"
        },
        red: {
          color: "black",
          align: "center",
          fontSize: 12 * scale,
          padding: [5, 0]
        },
        common: {
          color: "rgba(0,0,0)",
          align: "center",
          fontSize: 12 * scale,
          padding: [5, 0]
        },
        blue: {
          color: "#49dff0",
          fontSize: 12 * scale,
          align: "center"
        },
        hr: {
          borderColor: "rgba(0,0,0)",
          width: "100%",
          borderWidth: 0.5,
          height: 0
        }
      };
      let myChart = vm.$echarts.init(vm.$refs.dayErrorType);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} : {d}% <br/>{b} : {c} "
        },
        title: {
          text: this.dataSource,
          left: "center",
          top: "40%",
          textStyle: {
            align: "center",
            fontSize: 14
          }
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
            name: "占比",
            type: "pie",
            radius: ["40%", "60%"],
            center: ["50%", "45%"],
            // data: seriesData,
            data: echartData,
            label: {
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              },
              normal: {
                formatter: function(params, ticket, callback) {
                  var total = 0; //考生总数量
                  var percent = 0; //考生占比
                  echartData.forEach(function(value, index, array) {
                    total += value.value;
                  });
                  percent = ((params.value / total) * 100).toFixed(1);
                  let text = params.name;
                  text =
                    text.length < 5
                      ? text
                      : `${text.slice(0, 5)}\n${text.slice(5)}`;
                  return (
                    "{common|" +
                    text +
                    "}\n{hr|}\n{common|" +
                    params.data.errorPercent +
                    "}"
                  );
                  // return (
                  //   "{red|" +
                  //   params.name +
                  //   "}\n{hr|}\n{yellow|" +
                  //   params.data.errorPercent +
                  //   "}"
                  // );
                  // return (
                  //   "{red|" +
                  //   params.name +
                  //   "}\n{hr|}\n{yellow|" +
                  //   params.value +
                  //   "}\n{blue|" +
                  //   percent +
                  //   "%}"
                  // );
                },
                rich: rich
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
            color: this.colorData
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      if (!dataFlag.length) {
        option.series[0].labelLine.normal.show = false;
        delete option.tooltip;
        delete option.series[0].label;
      }
      myChart.setOption(option);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>

<style scoped lang="less">
.dayErrorTypeBox {
  width: 100%;
  height: 100%;
  .dayErrorType {
    width: 100%;
    height: 300px;
    // height: calc(100% -100px);
  }
  .errorList {
    height: 90px;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(235, 238, 245, 1);
    position: relative;
    top: -25px;
    text-align: center;
    .listTitle {
      display: flex;
      height: 48px;
      line-height: 48px;
      background: rgba(240, 242, 245, 1);
      .typeTitle {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .proportionTitle {
        border-left: 1px solid #fff;
        flex: 0 0 120px;
      }
    }
    .fontStyle {
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
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
        flex: 0 0 120px;
      }
    }
  }
}
</style>