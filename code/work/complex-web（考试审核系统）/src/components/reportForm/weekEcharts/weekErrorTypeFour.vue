<template>
  <div class="weekErrorTypeBox">
    <div class="content">
      <div class="txErrorType" ref="txErrorType"></div>
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
    this.txErrorType();
  },
  watch: {
    errorTypeData: {
      handler() {
        this.txErrorType();
      },
      deep: true
    }
  },
  methods: {
    //腾讯错误类型与分类对比
    txErrorType() {
      let vm = this;
      let customerErrorDataFlag = vm.errorTypeData.customerError;
      let customerErrorData = [];
      let customerErrorXAxisData = [];
      let colorFlag = [];
      for (var i = 0; i < customerErrorDataFlag.length; i++) {
        customerErrorData.push(customerErrorDataFlag[i].customerCount);
        colorFlag.push(customerErrorDataFlag[i].customercolor);
        customerErrorXAxisData.push(
          vm.tools.setErrorType(customerErrorDataFlag[i].errorType) ||
            vm.tools.setErrorRefuseType(customerErrorDataFlag[i].errorType)
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
          {
            name: "错误量",
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
@import "./errorTypeCss.less";
</style>