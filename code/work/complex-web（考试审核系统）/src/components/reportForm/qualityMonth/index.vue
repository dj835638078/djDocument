<template>
  <div class="qualityDailyBox" id="reportFormId">
    <div class="search-top">
      <div class="search-top-name">质检月报-({{ titletime }})</div>
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
          <el-date-picker v-model="time" type="month" placeholder="选择月">
          </el-date-picker>
        </div>
      </div>
    </div>
    <div>
      <div class="contentTitleBig">一、质量情况</div>
      <div v-if="OneData && OneData.length">
        <One :qualityDetailData="OneData" />
      </div>
      <div class="noDataTitle" v-else>暂无数据</div>
      <div v-if="twoData && twoData.length">
        <Two :tableData="twoData" />
      </div>
      <div v-if="threeData && threeData.length">
        <Three :threeData="threeData" />
      </div>
      <Situation
        :tableData="SituationData"
        v-if="SituationData && SituationData.length"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import One from "./One/Index";
import Two from "./Two/Index";
import Three from "./Three/Index";
import Situation from "./Situation/Table";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  data() {
    return {
      titletime: "",
      time: "",
      startDate: "",
      OneData: [],
      twoData: [],
      threeData: [],
      SituationData: []
    };
  },
  components: { One, Two, Three, Situation },
  watch: {
    time() {
      if (!this.time) {
        this.getYearMonth(new Date(), "当前时间");
      } else {
        this.getYearMonth(this.time);
      }
    }
  },
  computed: { ...mapState([""]) },
  mounted() {
    this.getYearMonth(new Date(), "当前时间");
  },
  methods: {
    downLoadPage() {
      var that = this;
      var shareContent = document.querySelector("#reportFormId"); //需要截图的包裹的（原生的）DOM 对象
      var width = shareContent.offsetWidth; //获取dom 宽度
      var height = shareContent.offsetHeight; //获取dom 高度
      var canvas = document.createElement("canvas"); //创建一个canvas节点
      var scale = 2; //定义任意放大倍数 支持小数
      canvas.width = width * scale; //定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
      canvas.height = height * scale; //定义canvas高度 *缩放
      canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

      html2canvas(document.querySelector("#reportFormId"), {
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
            this.height * 0.16
          );
          doc.save("月报.pdf");
          that.dianpingShow = true;
        };
      });
    },
    //时间转换为月
    getYearMonth(date, type) {
      if (type == "当前时间") {
        var nowdays = date;
        var year = nowdays.getFullYear();
        var month = nowdays.getMonth();

        if (this.tools.setFormTime(date).substring(8, 10) >= 21) {
          month = month + 1;
        }
        if (month == 0) {
          month = 12;
          year = year - 1;
        }
        if (month < 10) {
          month = "0" + month;
        }
        this.titletime = year + "年" + month + "月"; //上个月的第一天
        date = "";
      } else {
        this.titletime =
          this.tools.setFormTime(date).substring(0, 4) +
          "年" +
          this.tools.setFormTime(date).substring(5, 7) +
          "月";
      }
      this.getOneData(date);
      this.getTwoData(date);
      this.getThreeData(date);
      this.getSituationData(date);
    },
    //获取数据
    getOneData(date) {
      let data = {
        beginTime: date
      };
      this.api
        .post(`./complex/service/gReporter/month/quality`, data)
        .then(response => {
          if (response.status == 200) {
            this.OneData = response.data;
          }
        })
        .catch(error => {});
    },
    //2、各类型错误分析
    getTwoData(date) {
      let data = {
        beginTime: date
      };
      this.api
        .post(`./complex/service/gReporter/month/error`, data)
        .then(response => {
          if (response.status == 200) {
            this.twoData = response.data;
          }
        })
        .catch(error => {});
    },
    getThreeData(date) {
      let data = {
        beginTime: date
      };
      this.api
        .post(`./complex/service/gReporter/month/review`, data)
        .then(response => {
          if (response.status == 200) {
            this.threeData = response.data;
          }
        })
        .catch(error => {});
    },
    //人力情况
    getSituationData(date) {
      let data = {
        beginTime: date
      };
      this.api
        .post(`./complex/service/gReporter/month/other`, data)
        .then(response => {
          if (response.status == 200) {
            this.SituationData = [];
            let obj = response.data;
            if (response.data) {
              this.SituationData.push({
                earlyPeopleNum: obj.earlyPeopleNum,
                endPeopleNum: obj.endPeopleNum,
                leavePeopleNum: obj.leavePeopleNum,
                dismissPeopleNum: obj.dismissPeopleNum,
                lossRate: obj.lossRate,
                outRate: obj.outRate,
                workSummary: obj.workSummary
              });
            }
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
#reportFormId {
  padding-right: 10px;
}
.alignCenter {
  text-align: center;
}
.contentTitleBig {
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(42, 42, 42, 1);
  line-height: 25px;
}
.contentTitle {
  font-size: 14px;
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