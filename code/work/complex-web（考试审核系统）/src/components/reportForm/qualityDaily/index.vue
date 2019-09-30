<template>
  <div class="qualityDailyBox" id="qualityDailyBoxId">
    <div class="search-top">
      <div class="search-top-name">质检日报-({{ titletime }})</div>
      <!-- <button @click="downLoadPage">下载</button>  v-if="tools.setRight('leader')"-->
      <div class="search-top-time">
        <div
          @click="downLoadPage"
          class="query"
          style="float:left;margin-right: 25px;"
        >
          下载
        </div>
        <div class="search-top-time-name">
          时间：
        </div>
        <div class="search-top-time-box">
          <el-date-picker
            value-format="timestamp"
            v-model="time"
            type="date"
            placeholder="选择时间"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <One :tableData="oneDataList" />
    <Two :tableData="TwoDataList" />
    <div>
      <h3 class="reportFormTitle">三、质量排行TOP10</h3>
      <dayQualityTop
        :dayQualityTopData="dayQualityTopData"
        v-if="dayQualityTopData.length"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
    <div>
      <h3 class="reportFormTitle">四、出错类型</h3>
      <dayErrorType
        :dayErrorTypeData="dayErrorTypeData"
        v-if="dayErrorTypeData.length"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
    <div>
      <h3 class="reportFormTitle">五、个体详情</h3>
      <dayUnitDetail
        :dayUnitDetailData="dayUnitDetailData"
        v-if="dayUnitDetailData.length"
      />
      <div class="noDataTitle" v-else>暂无数据</div>
    </div>
  </div>
</template>



<script>
import dayQualityTop from "../dayEcharts/dayQualityTop";
import dayErrorType from "../dayEcharts/dayErrorType";
import dayUnitDetail from "../dayEcharts/dayUnitDetail";
import One from "./One/Table";
import Two from "./Two/Table";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  data() {
    return {
      titletime: "",
      time: "",
      oneDataList: [],
      TwoDataList: [],
      dayUnitDetailData: [],
      dayQualityTopData: [],
      dayErrorTypeData: []
    };
  },
  components: {
    dayQualityTop,
    dayErrorType,
    dayUnitDetail,
    One,
    Two
  },
  watch: {
    time() {
      this.setTitleTime();
      this.getOneData(this.time);
      this.getTwoData(this.time);
      this.getQualityTop(this.time);
      this.getErrorType(this.time);
      this.getUnitDetail(this.time);
    }
  },
  computed: {},
  mounted() {
    let dateTime = new Date(new Date() - 24 * 60 * 60 * 1000);
    this.titletime = this.tools.setFormTime(dateTime, 0);
    //一、数据总览
    this.getOneData(dateTime);
    //二、小组情况
    this.getTwoData(dateTime);
    //三、质量排行TOP10
    this.getQualityTop(dateTime);
    //四、出错类型
    this.getErrorType(dateTime);
    //五、获取个体详情信息
    this.getUnitDetail(dateTime);
  },
  methods: {
    downLoadPage() {
      var that = this;
      var shareContent = document.querySelector("#qualityDailyBoxId"); //需要截图的包裹的（原生的）DOM 对象
      var width = shareContent.offsetWidth; //获取dom 宽度
      var height = shareContent.offsetHeight; //获取dom 高度
      var canvas = document.createElement("canvas"); //创建一个canvas节点
      var scale = 2; //定义任意放大倍数 支持小数
      canvas.width = width * scale; //定义canvas 宽度 * 缩放，在此我是把canvas放大了2倍
      canvas.height = height * scale; //定义canvas高度 *缩放
      canvas.getContext("2d").scale(scale, scale); //获取context,设置scale

      html2canvas(document.querySelector("#qualityDailyBoxId"), {
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
          doc.save("日报.pdf");
          that.dianpingShow = true;
        };
      });
    },
    //时间戳转换
    setTitleTime() {
      this.titletime = this.titletime = this.tools.setFormTime(this.time, 0);
      if (this.titletime == "") {
        this.titletime = this.tools.setFormTime(
          new Date(new Date() - 24 * 60 * 60 * 1000),
          0
        );
      }
    },
    //一、小组情况
    getOneData(date) {
      if (!date) {
        date = new Date(new Date() - 24 * 60 * 60 * 1000);
      }

      let data = {
        startDate: date
      };
      this.api
        .post(`./complex/service/gReporter/checkDayData`, data)
        .then(response => {
          if (response.status == 200) {
            this.oneDataList = response.data;
          }
        })
        .catch(error => {});
    },
    //二、小组情况
    getTwoData(date) {
      if (!date) {
        date = new Date(new Date() - 24 * 60 * 60 * 1000);
      }
      let data = {
        checkDate: date
      };
      this.api
        .post(`./complex/service/gReporter/checkDayGroup`, data)
        .then(response => {
          if (response.status == 200) {
            this.TwoDataList = response.data;
          }
        })
        .catch(error => {});
    },
    //三、质量排行TOP10
    getQualityTop(date) {
      if (!date) {
        date = new Date(new Date() - 24 * 60 * 60 * 1000);
      }
      let vm = this;
      let data = {
        checkDate: date
      };
      vm.api
        .post(`./complex/service/gReporter/checkDayTop`, data)
        .then(response => {
          if (response.status == 200) {
            vm.dayQualityTopData = response.data;
          }
        })
        .catch(error => {});
    },
    //四、出错类型
    getErrorType(date) {
      if (!date) {
        date = new Date(new Date() - 24 * 60 * 60 * 1000);
      }
      let vm = this;
      let data = {
        checkDate: date
      };
      vm.api
        .post(`./complex/service/gReporter/checkDayType`, data)
        .then(response => {
          if (response.status == 200) {
            vm.dayErrorTypeData = response.data;
          }
        })
        .catch(error => {});
    },
    //五、获取个体详情信息
    getUnitDetail(date) {
      if (!date) {
        date = new Date(new Date() - 24 * 60 * 60 * 1000);
      }
      let vm = this;
      let data = {
        checkDate: date
      };
      vm.api
        .post(`./complex/service/gReporter/checkDayErrorTitle`, data)
        .then(response => {
          if (response.status == 200) {
            vm.dayUnitDetailData = response.data;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.qualityDailyBox {
  padding: 0 5px;
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
    margin-right: 5px;
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