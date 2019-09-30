<template>
  <div class="homePage">
    <div class="totalNumList">
      <div class="itemDetail">
        <span>今日订单总数</span>
        <span>{{ todayTotal }}</span>
        <img src="../../../assets/img/index1.png" />
      </div>
      <div class="itemDetail">
        <span>今日机器人处理数据</span>
        <span>{{ robotTotal }}</span>
        <img src="../../../assets/img/index2.png" />
      </div>
      <div class="itemDetail">
        <span>今日完成订单量</span>
        <span>{{ todayFinish }}</span>
        <img src="../../../assets/img/index3.png" />
      </div>
      <div class="itemDetail">
        <span>今日总人力投入</span>
        <span>{{ humanTotal }}</span>
        <img src="../../../assets/img/index4.png" />
      </div>
    </div>
    <div class="orderCompletionBox">
      <div class="orderCompletion" ref="orderCompletion"></div>
      <div class="btnList">
        <div
          v-for="(item, index) in btnList"
          :key="index"
          @click="orderCompletionClick(index)"
          :class="orderCompletionIndex == index ? 'newBlank' : 'blank'"
        >
          {{ item }}
        </div>
      </div>
    </div>
    <div class="chartGrounp">
      <div class="businessTypeBox">
        <div
          class="fadeBox"
          v-if="businessTypeArr && businessTypeArr.length == 0"
        >
          暂无数据
        </div>
        <div class="businessTypeFlag">
          <div class="businessType" ref="businessType"></div>
        </div>
        <div class="btnList">
          <div
            v-for="(item, index) in btnList"
            :key="index"
            @click="businessTypeClick(index)"
            :class="businessTypeIndex == index ? 'newBlank' : 'blank'"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="manpowerAnalysisBox">
        <Manpower />
      </div>
    </div>
    <div class="totalOrderBox">
      <div class="totalOrder" ref="totalOrder"></div>
      <div class="btnList">
        <div
          v-for="(item, index) in btnList"
          :key="index"
          @click="totalOrderClick(index)"
          :class="totalOrderIndex == index ? 'newBlank' : 'blank'"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Manpower from "./homeChild/manpower";
export default {
  data() {
    return {
      btnList: ["今日", "七天内"],
      //按钮index
      orderCompletionIndex: 0,
      businessTypeIndex: 0,
      totalOrderIndex: 0,
      //统计数据
      todayTotal: 0,
      robotTotal: 0,
      todayFinish: 0,
      humanTotal: 0,
      businessTypeArr: []
    };
  },
  components: {
    Manpower
  },
  watch: {
    menuLinkFlag(newVal, oldVal) {
      //切换导航栏自适应
      this.$echarts.init(this.$refs.orderCompletion).resize();
      this.$echarts.init(this.$refs.businessType).resize();
      this.$echarts.init(this.$refs.totalOrder).resize();
    }
  },
  computed: {
    ...mapState(["menuLinkFlag"])
  },
  mounted() {
    //数据统计查询
    this.dataCountQuery();
    //进入页面加载
    this.orderCompletion();
    this.businessType();
    this.totalOrder();
  },
  methods: {
    //订单完成情况分析按钮点击事件
    orderCompletionClick(index) {
      this.orderCompletionIndex = index;
      this.orderCompletion(index);
    },
    //业务类型占比按钮点击事件
    businessTypeClick(index) {
      this.businessTypeIndex = index;
      this.businessType(index);
    },

    //总订单及完成订单分析按钮点击事件
    totalOrderClick(index) {
      this.totalOrderIndex = index;
      this.totalOrder(index);
    },
    //数据统计查询
    dataCountQuery() {
      let vm = this;
      vm.api
        .get(`./manage/service/home/dataCount?day=1`)
        .then(function(response) {
          if (response.status == 200) {
            vm.todayTotal = response.data.orderSum;
            vm.robotTotal = response.data.systemProcessSum;
            vm.todayFinish = response.data.processSum;
            vm.humanTotal = response.data.humanSum;
          }
        })
        .catch(function(error) {});
    },
    //订单完成情况分析
    orderCompletion(index) {
      let vm = this;
      let dayVal;
      let scaleVal;
      if (index == 1) {
        dayVal = 7;
        scaleVal = "D";
      } else {
        dayVal = 1;
        scaleVal = "H";
      }
      vm.api
        .get(
          `./manage/service/home/orderTypeProcess?day=${dayVal}&scale=${scaleVal}`
        )
        .then(function(response) {
          if (response.status == 200) {
            let dataLegend = [];
            let dataxAxis = [];
            let dataxAxisShow = [];
            let dataSeries = [];
            let dataColor = [];
            let dataFlag = [];
            if (response.data && response.data.length) {
              let data = response.data;
              for (var i = 0; i < data.length; i++) {
                dataColor.push(data[i].color);
                dataLegend.push(data[i].typeName);
                dataFlag = data[0].orderList;
                let objSeries = {};
                objSeries.name = data[i].typeName;
                objSeries.type = "line";
                // objSeries.stack = "总量";
                objSeries.data = [];
                objSeries.smooth = true;
                objSeries.dj = "123";
                objSeries.areaStyle = { opacity: 0.2 };
                for (var j = 0; j < data[i].orderList.length; j++) {
                  let obj = {};
                  obj.value = data[i].orderList[j].dataSum;
                  obj.showValue = data[i].orderList[j].dateShowName;
                  objSeries.data.push(obj);
                }
                dataSeries.push(objSeries);
              }
              for (var i = 0; i < dataFlag.length; i++) {
                dataxAxis.push(dataFlag[i].dateName);
                dataxAxisShow.push(dataFlag[i].dateShowName);
              }
            }
            // 基于准备好的dom，初始化echarts实例
            let myChart = vm.$echarts.init(vm.$refs.orderCompletion);
            let option = {
              title: {
                text: "订单完成情况分析：",
                top: "4%",
                left: "1.5%"
              },
              tooltip: {
                trigger: "axis",
                formatter: function(data) {
                  let str = "";
                  let showVal = "";
                  let showList = "";
                  for (var i = 0; i < data.length; i++) {
                    showVal = data[0].data.showValue;
                    showList += `<div><div style="width:11px;height:11px;border-radius:50%;background:${
                      data[i].color
                    };display:inline-block;margin-right:5px"></div><span style="color:#fff">${
                      data[i].seriesName
                    }：${data[i].value}</span></div>`;
                  }
                  return showVal + showList;
                },
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
                data: dataLegend
              },
              grid: {
                left: "2%",
                right: "3%",
                bottom: "8%",
                top: "18%",
                containLabel: true
              },
              color: dataColor,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: dataxAxis,
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
              series: dataSeries
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", () => {
              myChart.resize();
            });
          }
        })
        .catch(function(error) {});
    },
    //业务类型占比
    businessType(index) {
      let vm = this;
      let dayVal;
      let scaleVal;
      if (index == 1) {
        dayVal = 7;
        scaleVal = "D";
      } else {
        dayVal = 1;
        scaleVal = "H";
      }
      vm.api
        .get(
          `./manage/service/home/sourceScale?day=${dayVal}&scale=${scaleVal}`
        )
        .then(function(response) {
          if (response.status == 200) {
            let dataLegend = [];
            let bigColor = [];
            let smallColor = [];
            let bigData = [];
            let smallData = [];
            if (response.data) {
              vm.businessTypeArr = response.data;
              let data = response.data;
              for (var i = 0; i < data.length; i++) {
                bigColor.push(data[i].color);
                let bigObj = {};
                bigObj.value = data[i].dataSum;
                bigObj.name = data[i].typeName;
                bigObj.label = data[i].typeName;
                bigObj.nameFlag = data[i].typeName;
                bigData.push(bigObj);
                for (var j = 0; j < data[i].infoList.length; j++) {
                  smallColor.push(data[i].infoList[j].color);
                  let smallObj = {};
                  smallObj.value = data[i].infoList[j].dataSum;
                  smallObj.name = data[i].infoList[j].sourceName;
                  smallObj.label = data[i].infoList[j].sourceName;
                  smallObj.nameFlag = data[i].infoList[j].typeName;
                  smallObj.colorFlag = data[i].color;
                  smallData.push(smallObj);
                  dataLegend.push(data[i].infoList[j].sourceName);
                }
              }
            }
            // 基于准备好的dom，初始化echarts实例
            let myChart = vm.$echarts.init(vm.$refs.businessType);
            let option = {
              title: {
                text: "业务类型占比：",
                x: "left",
                top: "4%",
                left: "3%"
              },
              tooltip: {
                trigger: "item",
                // formatter: "{a} : {d}%<br/>{b} : {c} "
                formatter: function(name) {
                  let showName = name.data.name;
                  let nameLength = showName.length;
                  let typeName = name.data.nameFlag + "占比";
                  let colorFlag = name.data.colorFlag;
                  let value = name.data.value;
                  let percent = name.percent + "%";
                  // return "<div>1234</div>";
                  return `${typeName}：${percent}<br/>${showName}：${value}`;
                }
              },
              // legend: {
              //   type: "scroll",
              //   top: "18%",
              //   left: "3%",
              //   bottom: "7%",
              //   orient: "vertical",
              //   x: "left",
              //   data: dataLegend
              // },
              series: [
                {
                  name: "业务类型占比",
                  type: "pie",
                  selectedMode: "single",
                  radius: [0, "25%"],
                  center: ["50%", "50%"],
                  label: {
                    normal: {
                      position: "inner"
                    }
                  },
                  labelLine: {
                    normal: {
                      show: false
                    }
                  },
                  data: bigData,
                  color: bigColor
                },
                {
                  name: "业务类型占比",
                  type: "pie",
                  radius: ["40%", "55%"],
                  center: ["50%", "50%"],
                  label: {
                    normal: {
                      formatter: function(name) {
                        let showName = name.data.name;
                        let nameLength = showName.length;
                        if (showName.length > 5) {
                          showName = showName.slice(0, 5) + "...";
                        }
                        let typeName = name.data.nameFlag;
                        let colorFlag = name.data.colorFlag;
                        let value = name.data.value;
                        let percent = name.percent + "%";
                        // return "<div>1234</div>";
                        return `{col|${showName}}{col|(${percent})}`;
                      },

                      // formatter: "{b}{per|{d}%}  ",
                      // formatter:
                      //   "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                      // backgroundColor: "#eee",
                      // borderColor: "#aaa",
                      // borderWidth: 1,
                      // borderRadius: 4,
                      // shadowBlur:3,
                      // shadowOffsetX: 2,
                      // shadowOffsetY: 2,
                      // shadowColor: '#999',
                      // padding: [0, 7],
                      rich: {
                        // a: {
                        //   color: "#999",
                        //   lineHeight: 22,
                        //   align: "center"
                        // },
                        // abg: {
                        //     backgroundColor: '#333',
                        //     width: '100%',
                        //     align: 'right',
                        //     height: 22,
                        //     borderRadius: [4, 4, 0, 0]
                        // },
                        // hr: {
                        //   borderColor: "#aaa",
                        //   width: "100%",
                        //   borderWidth: 0.5,
                        //   height: 0
                        // },
                        b: {
                          fontSize: 16,
                          lineHeight: 33,
                          color: "red",
                          text: "left"
                        },
                        cola: {
                          color: "rgba(0,0,0,0.65)",
                          align: "left"
                        },
                        col: {
                          color: "rgba(0,0,0,0.65)"
                        },
                        per: {
                          color: "rgba(0,0,0,0.65)",
                          padding: [2, 4],
                          borderRadius: 2
                        }
                      }
                    }
                  },
                  data: smallData,
                  color: smallColor
                }
              ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", () => {
              myChart.resize();
            });
          }
        })
        .catch(function(error) {});
    },
    //总订单及完成订单分析
    totalOrder(index) {
      let vm = this;
      let dayVal;
      let scaleVal;
      if (index == 1) {
        dayVal = 7;
        scaleVal = "D";
      } else {
        dayVal = 1;
        scaleVal = "H";
      }
      vm.api
        .get(
          `./manage/service/home/orderStatusProcess?day=${dayVal}&scale=${scaleVal}`
        )
        .then(function(response) {
          if (response.status == 200) {
            let dataLegend = [];
            let dataxAxis = [];
            let dataxAxisShow = [];
            let dataSeries = [];
            let dataColor = [];
            let dataFlag = [];
            if (response.data && response.data.length) {
              let data = response.data;
              for (var i = 0; i < data.length; i++) {
                dataColor.push(data[i].color);
                dataLegend.push(data[i].typeName);
                dataFlag = data[0].orderList;
                let objSeries = {};
                objSeries.name = data[i].typeName;
                objSeries.type = "line";
                // objSeries.stack = "总量";
                objSeries.smooth = true;
                objSeries.data = [];
                objSeries.areaStyle = { opacity: 0.2 };
                for (var j = 0; j < data[i].orderList.length; j++) {
                  let obj = {};
                  obj.value = data[i].orderList[j].dataSum;
                  obj.showValue = data[i].orderList[j].dateShowName;
                  objSeries.data.push(obj);
                }
                dataSeries.push(objSeries);
              }
              for (var i = 0; i < dataFlag.length; i++) {
                dataxAxis.push(dataFlag[i].dateName);
                dataxAxisShow.push(dataFlag[i].dateShowName);
              }
            }
            // 基于准备好的dom，初始化echarts实例
            let myChart = vm.$echarts.init(vm.$refs.totalOrder);
            let option = {
              title: {
                text: "总订单及完成订单分析：",
                top: "4%",
                left: "1.5%"
              },
              tooltip: {
                trigger: "axis",
                formatter: function(data) {
                  let str = "";
                  let showVal = "";
                  let showList = "";
                  for (var i = 0; i < data.length; i++) {
                    showVal = data[0].data.showValue;
                    showList += `<div><div style="width:11px;height:11px;border-radius:50%;background:${
                      data[i].color
                    };display:inline-block;margin-right:5px"></div><span style="color:#fff">${
                      data[i].seriesName
                    }：${data[i].value}</span></div>`;
                  }
                  return showVal + showList;
                },
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
                data: dataLegend
              },
              grid: {
                left: "2%",
                right: "3%",
                bottom: "8%",
                top: "18%",
                containLabel: true
              },
              color: dataColor,
              xAxis: [
                {
                  type: "category",
                  boundaryGap: false,
                  data: dataxAxis,
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: "#F0F2F5"
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
                  splitArea: {
                    show: true,
                    areaStyle: {
                      color: ["#ffffff", "#F3F3F3"]
                    }
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      color: "#F0F2F5"
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
              series: dataSeries
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            window.addEventListener("resize", () => {
              myChart.resize();
            });
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>
<style scoped lang="less">
.homePage /deep/ .newBlank {
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  border: none !important;
  // border-radius: 0 !important;
}
.homePage /deep/ .blank {
  margin-right: 0 !important;
  margin-bottom: 0 !important;
  border: none !important;
  background: rgba(240, 242, 245, 1) !important;
  color: rgba(0, 0, 0, 0.65) !important;
  // border-radius: 0 !important;
}
.homePage {
  width: 100%;
  // height: 100%;
  overflow: hidden;
  background: #f0f2f5;
  .totalNumList {
    height: 130px;
    width: 100%;
    display: flex;
    margin-top: 24px;
    .itemDetail {
      flex: 1;
      width: 100%;
      height: 100%;
      padding: 24px;
      padding-left: 26px;
      box-sizing: border-box;
      margin-right: 24px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      border-radius: 2px;
      img {
        position: absolute;
        right: 0;
        bottom: 0;
      }
      span {
        color: #fff;
        &:first-child {
          font-size: 16px;
          margin-bottom: 10px;
          margin-top: 12px;
        }
        &:nth-child(2) {
          font-size: 38px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      &:nth-child(1) {
        // background: url(../../../assets/img/home-blue.png) no-repeat;
        // background: linear-gradient(left, #5676f5, #56acff);
        background: -webkit-linear-gradient(right, #5676f5, #56acff);
        background: -o-linear-gradient(right, #5676f5, #56acff);
        background: -moz-linear-gradient(right, #5676f5, #56acff);
        background: linear-gradient(to right, #5676f5, #56acff);
      }
      &:nth-child(2) {
        // background: url(../../../assets/img/home-green.png) no-repeat;
        // background: linear-gradient(left, #00d4de, #00ebf0);
        background: -webkit-linear-gradient(right, #00d4de, #00ebf0);
        background: -o-linear-gradient(right, #00d4de, #00ebf0);
        background: -moz-linear-gradient(right, #00d4de, #00ebf0);
        background: linear-gradient(to right, #00d4de, #00ebf0);
      }
      &:nth-child(3) {
        // background: url(../../../assets/img/home-purple.png) no-repeat;
        // background: linear-gradient(left, #9f6ffb, #d797fd);
        background: -webkit-linear-gradient(right, #9f6ffb, #d797fd);
        background: -o-linear-gradient(right, #9f6ffb, #d797fd);
        background: -moz-linear-gradient(right, #9f6ffb, #d797fd);
        background: linear-gradient(to right, #9f6ffb, #d797fd);
      }
      &:nth-child(4) {
        margin: 0;
        // background: url(../../../assets/img/home-yellow.png) no-repeat;
        // background: linear-gradient(left, #ffcb00, #ffda00);
        background: -webkit-linear-gradient(right, #ffcb00, #ffda00);
        background: -o-linear-gradient(right, #ffcb00, #ffda00);
        background: -moz-linear-gradient(right, #ffcb00, #ffda00);
        background: linear-gradient(to right, #ffcb00, #ffda00);
      }
    }
  }
  .btnList {
    position: absolute;
    top: 20px;
    right: 3%;
  }
  .orderCompletionBox {
    height: 358px;
    width: 100%;
    background: #fff;
    margin: 24px 0;
    position: relative;
    .orderCompletion {
      width: 100%;
      height: 100%;
    }
  }
  .chartGrounp {
    height: 426px;
    width: 100%;
    display: flex;
    .businessTypeBox {
      height: 426px;
      flex: 1;
      margin-right: 20px;
      background: #fff;
      position: relative;
      .businessTypeFlag {
        width: 100%;
        height: 100%;
      }
      .businessType {
        width: 100%;
        height: 100%;
      }
    }
    .manpowerAnalysisBox {
      height: 426px;
      flex: 1;
      background: #fff;
      position: relative;
      .manpowerAnalysis {
        width: 100%;
        height: 100%;
      }
    }
  }
  .totalOrderBox {
    height: 358px;
    width: 100%;
    margin-top: 24px;
    background: #fff;
    position: relative;
    .totalOrder {
      width: 100%;
      height: 100%;
    }
  }
}
</style>