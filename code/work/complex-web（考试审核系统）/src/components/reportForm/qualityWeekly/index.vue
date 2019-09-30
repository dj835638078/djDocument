<template>
  <div class="qualityDailyBox" id="checkDataBoxId">
    <div class="search-top">
      <div class="search-top-name">质检周报-({{ titletime }})</div>
      <!-- v-if="tools.setRight('leader')"-->
      <div class="search-top-time">
        <div
          class="query"
          style="float:left;margin-right: 25px;"
          @click="downLoadPage"
        >
          下载
        </div>
        <div class="search-top-time-name">
          时间：
        </div>
        <div class="search-top-time-box">
          <!-- <el-date-picker
            v-model="time"
            type="week"
            format="yyyy 第 WW 周"
            placeholder="选择周"
          >
          </el-date-picker> -->
          <el-date-picker v-model="time" type="date" placeholder="选择时间">
          </el-date-picker>
        </div>
      </div>
    </div>
    <One :tableData="oneData" />
    <h3 class="reportFormTitle">
      二、错误类型与分类
    </h3>
    <div>
      <div class="contentTitle alignCenter">本周各版块误过错误类型</div>
      <weekErrorTypeOne
        :errorTypeData="errorTypeData"
        v-if="errorTypeData.errorPass && errorTypeData.errorPass.length"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
    <div>
      <div class="contentTitle alignCenter">本周各版块误拒错误类型</div>
      <weekErrorTypeTwo
        :errorTypeData="errorTypeData"
        v-if="errorTypeData.errorRefuse && errorTypeData.errorRefuse.length"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
    <weekErrorTypeThree
      :errorTypeData="errorTypeData"
      v-if="
        errorTypeData.errorSt && JSON.stringify(errorTypeData.errorSt) != '{}'
      "
    />
    <div>
      <div class="contentTitle">腾讯错误类型与分类对比</div>
      <weekErrorTypeFour
        :errorTypeData="errorTypeData"
        v-if="errorTypeData.customerError && errorTypeData.customerError.length"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
    <div>
      <weekErrorFive
        :genreThan="errorTypeData.genreThan"
        v-if="errorTypeData.genreThan && errorTypeData.genreThan.length"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
    <div>
      <h3 class="reportFormTitle">三、时段错误</h3>
      <div class="titleTimeClass"><span></span>{{ titletime }}</div>
      <weekTimeError
        :tableData="timeErrorData"
        v-if="JSON.stringify(timeErrorData) != '{}'"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>

    <Four :fourData="fourData" :fourDataNew="fourDataNew" />
    <Five :tableData="fiveData" />
    <Six :tableData="sixData" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import One from "./One/Table";
import weekErrorTypeOne from "../weekEcharts/weekErrorTypeOne";
import weekErrorTypeTwo from "../weekEcharts/weekErrorTypeTwo";
import weekErrorTypeThree from "../weekEcharts/weekErrorTypeThree";
import weekErrorTypeFour from "../weekEcharts/weekErrorTypeFour";
import weekErrorFive from "../weekEcharts/barTwoEcharts";
import weekTimeError from "../weekEcharts/weekTimeError";
import Four from "./Four/Index";
import Five from "./Five/Table";
import Six from "./Six/Index";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  data() {
    return {
      titletime: "",
      time: "",
      startDate: "",
      oneData: [],
      errorTypeData: {},
      timeErrorData: {},
      fourData: [],
      fourDataNew: [],
      fiveData: [],
      sixData: {}
    };
  },
  components: {
    One,
    weekErrorTypeOne,
    weekErrorTypeTwo,
    weekErrorTypeThree,
    weekErrorTypeFour,
    weekErrorFive,
    weekTimeError,
    Four,
    Five,
    Six,
    JsPDF,
    html2canvas
  },
  watch: {
    time() {
      if (!this.time) {
        this.getYearWeek(new Date(), "当前时间");
      } else {
        this.getYearWeek(this.time);
      }
    }
  },
  computed: { ...mapState([""]) },
  mounted() {
    this.getYearWeek(new Date(), "当前时间");
  },
  methods: {
    downLoadPage() {
      var that = this;
      var shareContent = document.querySelector("#checkDataBoxId"); //需要截图的包裹的（原生的）DOM 对象
      var width = shareContent.offsetWidth; //获取dom 宽度
      var height = shareContent.offsetHeight; //获取dom 高度
      var canvas = document.createElement("canvas"); //创建一个canvas节点
      var scale = 2; //定义任意放大倍数 支持小数
      canvas.width = width * scale + 50; //定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
      canvas.height = height * scale; //定义canvas高度 *缩放
      canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

      html2canvas(document.querySelector("#checkDataBoxId"), {
        allowTaint: true
      }).then(function(canvas) {
        var context = canvas.getContext("2d");
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;
        var imgData = canvas.toDataURL("image/jpeg", 1.0); //转化成base64格式,可上网了解此格式
        var img = new Image();
        img.src = imgData;
        img.onload = function() {
          img.width = img.width / 2; //因为在上面放大了2倍，生成image之后要/2
          img.height = img.height / 2;
          img.style.transform = "scale(0.5)";
          if (this.width > this.height) {
            //此可以根据打印的大小进行自动调节
            var doc = new JsPDF("l", "mm", [
              this.width * 0.555,
              this.height * 0.555
            ]);
          } else {
            var doc = new JsPDF("p", "mm", [
              this.width * 0.555,
              this.height * 0.555
            ]);
          }
          doc.addImage(
            imgData,
            "jpeg",
            10,
            0,
            this.width * 0.16,
            this.height * 0.17
          );
          doc.save("周报.pdf");
          that.dianpingShow = true;
        };
      });
    },
    //获取数据
    getOneData(date) {
      let data = {
        startDate: date
      };
      this.api
        .post(`./complex/service/gReporter/findVerifyNumOfWeek`, data)
        .then(response => {
          if (response.status == 200) {
            //console.log(response.data, this.oneData, "aaa");
            this.oneData = response.data;
          }
        })
        .catch(error => {});
    },
    //二、获取时段错误信息信息
    getErrorType(date) {
      let vm = this;
      let data = {
        startDate: date
      };
      vm.api
        .post(`./complex/service/gReporter/errorTypeStatistics`, data)
        .then(response => {
          if (response.status == 200) {
            vm.errorTypeData = response.data;
            let arrAdd = [];
            let arrFlag = vm.errorTypeData.customerError;
            for (let i = 0; i < arrFlag.length; i++) {
              if (arrFlag[i].customerCount) {
                arrAdd.push(arrFlag[i]);
              }
            }
            vm.errorTypeData.customerError = arrAdd;
          }
        })
        .catch(error => {});
    },
    //三、获取时段错误信息信息
    getTimeError(date) {
      let vm = this;
      let data = {
        startDate: date
      };
      vm.api
        .post(`./complex/service/gReporter/timePeriodStatistics`, data)
        .then(response => {
          if (response.status == 200) {
            vm.timeErrorData = response.data;
          }
        })
        .catch(error => {});
    },
    //四、总质量排行TOP10
    getFourData(date) {
      let data = {
        startDate: date
      };
      this.api
        .post(`./complex/service/gReporter/checkWeekTop`, data)
        .then(response => {
          if (response.status == 200) {
            this.fourData = response.data.otherGroup;
            this.fourDataNew = response.data.newGroup;
          }
        })
        .catch(error => {});
    },
    //五、各组错误总览
    getFiveData(date) {
      let data = {
        startDate: date
      };
      this.api
        .post(`./complex/service/gReporter/gGroupStatistics`, data)
        .then(response => {
          if (response.status == 200) {
            this.fiveData = response.data;
          }
        })
        .catch(error => {});
    },
    //六、各组错误信息
    getSixData(date) {
      let data = {
        startDate: date
      };
      this.api
        .post(`./complex/service/gReporter/gGroupItem`, data)
        .then(response => {
          if (response.status == 200) {
            this.sixData = response.data;
          }
        })
        .catch(error => {});
    },

    //时间转换为周
    getYearWeek(date, type) {
      // if (!date) {
      //   date = new Date();
      // }
      // date = new Date(date);
      // var date2 = new Date(date.getFullYear(), 0, 1);
      // var day1 = date.getDay();
      // if (day1 == 0) day1 = 7;
      // var day2 = date2.getDay();
      // if (day2 == 0) day2 = 7;
      // var d = Math.round(
      //   (date.getTime() -
      //     date2.getTime() +
      //     (day2 - day1) * (24 * 60 * 60 * 1000)) /
      //     86400000
      // );
      // this.titletime =
      //   this.tools.setFormTime(date).substring(0, 4) +
      //   "第" +
      //   (Math.ceil(d / 7) + 1) +
      //   "周";
      // this.getOneData(date);
      // this.getErrorType(date);
      // this.getTimeError(date);
      // this.getFourData(date);
      // this.getFiveData(date);
      // this.getSixData(date);
      // debugger;
      let oneDay;
      if (type) {
        let aDay = date.getDay() || 7;
        oneDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() - 6 - aDay
        );
      } else {
        let day = date.getDay() || 7;
        oneDay = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 1 - day
        );
      }
      let sevenDay =
        new Date(this.tools.setFormTime(oneDay)).getTime() +
        24 * 60 * 60 * 1000 * 6;
      this.titletime =
        this.tools.setFormTime(oneDay).substring(5, 10) +
        "~" +
        this.tools.setFormTime(sevenDay).substring(5, 10);
      this.getOneData(oneDay);
      this.getErrorType(oneDay);
      this.getTimeError(oneDay);
      this.getFourData(oneDay);
      this.getFiveData(oneDay);
      this.getSixData(oneDay);
    }
  }
};
</script>

<style scoped lang="less">
#checkDataBoxId {
  padding-right: 10px;
}
.titleTimeClass {
  margin-left: 60px;
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    background: rgba(0, 224, 218, 1);
    border-radius: 50%;
    margin-right: 10px;
  }
}
.alignCenter {
  text-align: center;
}
.contentTitle {
  font-size: 15px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(42, 42, 42, 1);
  line-height: 21px;
  margin: 20px 0;
}
.qualityDailyBox {
  margin-bottom: 63px;

  .search-top {
    height: 60px;
    width: 100%;
  }
  .search-top-name {
    margin-left: 450px;
    text-align: center;
    line-height: 60px;
    height: 60px;
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(0, 205, 202, 1);
    float: left;
  }
  .search-top-time {
    float: right;
    margin-top: 14px;
    .search-top-time-name {
      float: left;
      width: 70px;
      text-align: center;
      line-height: 32px;
      height: 32px;
      font-size: 14px;
    }
    .search-top-time-box {
      float: left;
    }
  }
}
</style>