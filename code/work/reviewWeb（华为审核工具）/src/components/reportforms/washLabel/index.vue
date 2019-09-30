<template>
  <div class="washLabel">
    <div class="washLabel-top">
      <!-- <div class="washLabel-top-nameBox">
        <div class="nameBox-left"></div>
        <div class="nameBox-right">{{ title }}</div>
      </div> -->
      <div class="washLabel-top-query">
        <div class="query-left">
          <div class="query-left-name">
            <span style="color:red;">*</span>{{ timeName }}：
          </div>
          <div class="query-left-form">
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="选择日期"
              :clearable="false"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
          <div
            style="width:22px;height:32px;line-height:32px;text-align:center;float:left;color:rgba(0, 0, 0, 0.85)"
          >
            -
          </div>
          <div class="query-left-form">
            <el-date-picker
              v-model="endDate"
              type="date"
              placeholder="选择日期"
              :clearable="false"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="query-right">
          <div
            v-if="startDate && endDate"
            class="query"
            style="float:right;margin-bottom:0px;margin-right:0px;"
            @click="deriveForm"
          >
            <i class="fa fa-file-excel-o"></i>导出
          </div>
          <div
            v-else
            class="release"
            style="float:right;margin-bottom:0px;margin-right:0px;"
          >
            <i class="fa fa-file-excel-o"></i>导出
          </div>
          <div
            class="query"
            @click="resetForm"
            style="float:right;margin-bottom:0px;"
          >
            <i class="fa fa-refresh"></i>重置
          </div>
          <div
            v-if="startDate && endDate"
            class="query"
            @click="researchForm"
            style="float:right;margin-bottom:0px"
          >
            <i class="fa fa-search"></i>查询
          </div>
          <div v-else class="release" style="float:right;margin-bottom:0px">
            <i class="fa fa-search"></i>查询
          </div>
        </div>
      </div>
    </div>
    <div class="divide"></div>
    <div class="washLabel-bottom" v-if="title == '团队产出'">
      <div class="washLabel-bottom-left">
        <chart
          :chartList="chartList"
          :numList="numList"
          washLabel="yes"
          :labelName="labelName"
        />
      </div>
      <div class="washLabel-bottom-divide"></div>
      <div class="washLabel-bottom-btoom">
        <directorTable
          :chartList="chartList"
          :sum="sum"
          washLabel="yes"
          :labelName="labelName"
        />
      </div>
    </div>
    <div v-if="title == '个人产出'">
      <oneChart :chartList="chartList" :sum="sum" :dataType="dataType" />
    </div>
  </div>
</template>

<script>
import api from "@/api";
import chart from "../manage/director/chart";
import oneChart from "./chart";
import directorTable from "../manage/director/table";
export default {
  data() {
    return {
      sDate: "",
      eDate: "",
      dataType: "",
      labelName: "",
      timeName: "",
      heightN: "",
      title: "",
      startDate: "",
      endDate: "",
      url: "",
      //数量
      numList: [],
      //总数
      sum: "0",
      chartList: [],
      chartTitle: "质检团队",
      //图表名称
      titleName: "团队产出统计",
      pickerOptions: {
        disabledDate: time => {
          let curDate = new Date().getTime();
          let three = 30 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        }
      }
    };
  },
  components: { chart, directorTable, oneChart },
  watch: {
    "$route.name"() {
      if (this.$route.params.s) {
        this.startDate = new Date(+this.$route.params.s);
        this.endDate = new Date(+this.$route.params.e);
      } else {
        this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
        this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
      }
      this.setName();
    },
    startDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    }
  },
  computed: {},
  mounted() {
    if (this.$route.params.s) {
      this.startDate = new Date(+this.$route.params.s);
      this.endDate = new Date(+this.$route.params.e);
    } else {
      this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
    }
    this.setName();
    //监听窗口大小变化;
    this.heightN = window.innerHeight - 380 + 49.5;
    let vm = this;
    window.onresize = function() {
      vm.heightN = window.innerHeight - 380 + 49.5;
      vm.monitor();
    };
  },
  methods: {
    //判断时间
    judgeTime() {
      if (this.startDate && this.endDate) {
        if (this.endDate < this.startDate) {
          this.endDate = "";
          this.$message({
            message: "结束时间不能早于开始时间",
            type: "error"
          });
        }
      }
    },
    getList() {
      let vm = this;
      let data;
      if (this.dataType == 2) {
        data = {
          startDate: this.startDate,
          endDate: this.endDate
        };
      }
      if (this.dataType == 1) {
        data = {
          lastUpdateDate: this.startDate,
          endDate: this.endDate
        };
      }
      api
        .post(this.url, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.sDate = vm.startDate.getTime();
            vm.eDate = vm.endDate.getTime();
            if (vm.title == "团队产出") {
              // if (vm.labelName == "清洗分类数量") {
              //   vm.chartList = response.data.persons;
              // } else {
              //   vm.chartList = response.data.regions;
              // }
              vm.chartList = response.data.regions;
            } else {
              vm.chartList = response.data.persons;
            }
            vm.sum = response.data.totalProcessCount;
          }
        })
        .catch(function(error) {});
    },
    setName() {
      //this.chartList = [];
      if (this.$route.name == "personWash") {
        this.url = `./manage/service/classifyStatistics/personalStatistics`;
        //组长查看清洗
        this.dataType = "1";
        this.titleName = "清洗个人产出统计";
        this.title = "个人产出";
        this.timeName = "清洗分类时间";
      }
      if (this.$route.name == "personLabel") {
        this.url = `./manage/service/labelStatistics/personalStatistics`;
        //组长查看标注
        this.dataType = "2";
        this.titleName = "标注个人产出统计";
        this.title = "个人产出";
        this.timeName = "标注时间";
      }
      if (this.$route.name == "reportWash") {
        this.url = `./manage/service/classifyStatistics/teamStatistics`;
        //主管查看清洗
        this.dataType = "1";
        this.labelName = "清洗分类数量";
        this.timeName = "清洗分类时间";
        this.titleName = "清洗团队产出统计";
        this.title = "团队产出";
      }
      if (this.$route.name == "reportLabel") {
        //主管查看标注
        this.dataType = "2";
        this.url = `./manage/service/labelStatistics/teamStatistics`;
        this.labelName = "标注数量";
        this.timeName = "标注时间";
        this.titleName = "标注团队产出统计";
        this.title = "团队产出";
      }
      this.getList();
    },
    goExport() {
      this.$confirm("导出成功，是否前往【我的导出】页面查看详情?", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "success"
      })
        .then(() => {
          this.$router.push({
            name: "ExportList"
          });
        })
        .catch(() => {});
    },
    //导出
    deriveForm() {
      let vm = this;
      let data;
      let urlExport;
      if (this.title == "团队产出") {
        if (this.timeName == "清洗分类时间") {
          urlExport = `./manage/service/classifyStatistics/exportTeam`;
          data = {
            lastUpdateDate: this.startDate,
            endDate: this.endDate
          };
        }
        if (this.timeName == "标注时间") {
          urlExport = `./manage/service/labelStatistics/exportTeam`;
          data = {
            startDate: this.startDate,
            endDate: this.endDate
          };
        }
      }
      if (this.title == "个人产出") {
        if (this.timeName == "清洗分类时间") {
          urlExport = `./manage/service/classifyStatistics/exportPersonal`;
          data = {
            lastUpdateDate: this.startDate,
            endDate: this.endDate
          };
        }
        if (this.timeName == "标注时间") {
          urlExport = `./manage/service/labelStatistics/exportPersonal`;
          data = {
            startDate: this.startDate,
            endDate: this.endDate
          };
        }
      }
      api
        .post(urlExport, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.goExport();
          }
        })
        .catch(function(error) {});
    },
    //重置
    resetForm() {
      this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.getList();
    },
    //查询
    researchForm() {
      this.getList();
    }
  }
};
</script>

<style scoped lang="less">
.washLabel {
  width: 100%;
  height: 100%;
  .washLabel-top {
    padding: 20px;
    .washLabel-top-nameBox {
      width: 100%;
      height: 30px;
      margin-bottom: 19.5px;
      .nameBox-left {
        width: 2px;
        height: 16px;
        background: #597ef7;
        float: left;
      }
      .nameBox-right {
        float: left;
        height: 22px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .washLabel-top-query {
      width: 100%;
      height: 32px;
      .query-left {
        float: left;
        width: 70%;
        height: 100%;
        line-height: 100%;
        .query-left-name {
          height: 100%;
          line-height: 32px;
          float: left;
        }
        .query-left-form {
          float: left;
        }
      }
      .query-right {
        float: right;
        width: 30%;
        height: 30px;
        margin-top: 2px;
      }
    }
  }
  .washLabel-bottom {
    width: 100%;
    overflow: hidden;
    position: relative;

    padding-bottom: 15px;
    .washLabel-bottom-left {
      width: calc(50% - 8px);
      float: left;
      height: 100%;
      // overflow-y: auto;
    }
    .washLabel-bottom-divide {
      width: 16px;
      float: left;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      margin-left: calc(50% - 8px);
      background: #f0f2f5;
    }
    .washLabel-bottom-btoom {
      width: calc(50% - 8px);
      float: left;
      margin-left: 16px;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
