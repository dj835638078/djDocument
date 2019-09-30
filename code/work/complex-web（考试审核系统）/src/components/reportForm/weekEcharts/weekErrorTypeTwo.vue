<template>
  <div class="weekErrorTypeBox">
    <div class="content">
      <div class="txErrorType" ref="txErrorReject"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["errorTypeData"],
  components: {},
  computed: {},
  mounted() {
    this.txErrorReject();
  },
  watch: {
    errorTypeData: {
      handler() {
        this.txErrorReject();
      },
      deep: true
    }
  },
  methods: {
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
          vm.tools.setErrorRefuseType(errorRefuseDataFlag[i].errorType)
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
          top: "8%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: errorRefuseXAxisData,
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
            name: "误拒量",
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
    }
  }
};
</script>

<style scoped lang="less">
@import "./errorTypeCss.less";
</style>