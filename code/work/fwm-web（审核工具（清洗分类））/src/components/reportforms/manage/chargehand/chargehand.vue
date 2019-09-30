<template>
  <div class="director">
    <div class="top-box">
      <div class="infoHeadSearch" style="margin-bottom:0px;">
        <el-form>
          <el-form-item label="内容选择" required class="content">
            <el-select v-model="channelType" placeholder="请选择">
              <el-option
                v-for="(item, index) in lookUp.CHANNEL_TASK_TYPE"
                :label="item.itemName"
                :value="item.itemCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核时间" required class="timeCheck">
            <el-date-picker
              v-model="startDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <div class="line">-</div>
            <el-date-picker
              v-model="endDate"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item label="审核人" required class="content">
            <el-select v-model="fwmAccount" placeholder="请选择">
              <el-option
                v-for="(item, index) in findUser"
                :label="item.userName"
                :value="item.fwmAccount"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item required class="btnBox">
            <div class="line" style="opacity:0">-</div>
            <div class="btnlist flexlayout">
              <div
                v-if="channelType && fwmAccount && startDate && endDate"
                class="query"
                @click="researchForm"
              >
                <i class="fa fa-search"></i>查询
              </div>
              <div v-else class="release"><i class="fa fa-search"></i>查询</div>
              <div
                v-if="channelType && fwmAccount && startDate && endDate"
                class="query"
                @click="deriveForm"
              >
                <i class="fa fa-file-excel-o"></i>导出
              </div>
              <div v-else class="release">
                <i class="fa fa-file-excel-o"></i>导出
              </div>
              <div class="query resetBtn" @click="resetForm">
                <i class="fa fa-refresh"></i>重置
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="divide"></div>
    <div class="content-box">
      <div class="content-box-left">
        <chart
          :chartList="chartList"
          :numList="numList"
          :chartTitle="chartTitle"
          :titleName="titleName"
        />
      </div>
      <div class="content-box-divide"></div>
      <div class="content-box-btoom">
        <directorTable
          v-if="chartTitle == '个人'"
          :chartList="chartList"
          :chartTitle="chartTitle"
          :sum="sum"
        />
        <personalTable
          v-if="chartTitle == '全部'"
          :chartList="chartList"
          :sum="sum"
          :titleName="titleName"
        />
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import chart from "./chart";
import directorTable from "./table";
import personalTable from "./personalTable";
import { mapState } from "vuex";
export default {
  data() {
    return {
      findUser: [],
      channelType: "",
      fwmAccount: "",
      startDate: "",
      endDate: "",
      //详情使用传输字段
      type: "",
      sDate: "",
      eDate: "",
      //获取小框高度
      heightN: "",
      //图表树形线的宽度
      monitorW: "",
      //图表名称
      titleName: "个人产出统计",
      chartTitle: "全部",
      //数量
      numList: [],
      //总数
      sum: "0",
      chartList: [],
      pickerOptions: {
        disabledDate: time => {
          let curDate = new Date().getTime();
          let three = 7 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return time.getTime() > Date.now() || time.getTime() < threeMonths;
        }
      }
    };
  },
  components: {
    chart,
    directorTable,
    personalTable
  },
  watch: {
    startDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    }
  },
  computed: {
    ...mapState(["lookUp"])
  },
  mounted() {
    this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
    this.getFindUser();
    //监听窗口大小变化;
    this.heightN = window.innerHeight - 380;
    let vm = this;
    window.onresize = function() {
      vm.heightN = window.innerHeight - 380;
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
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    },
    reset() {
      this.chartTitle = "全部";
      this.titleName = "个人产出统计";
      this.sum = "0";
      this.chartList = [];
      this.channelType = "";
      this.fwmAccount = "all";
      this.endDate = new Date(new Date().setHours(0, 0, 0, 0));
      this.startDate = new Date(new Date().setHours(0, 0, 0, 0));
    },
    //查询数据
    getData() {
      let vm = this;
      let data = {
        channelType: this.channelType,
        fwmAccount: this.fwmAccount,
        startDate: this.startDate,
        endDate: this.endDate
      };
      api
        .post(
          `./manage/service/personalStatistics/findPersonalDataReport`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            //记录当前查询的字段
            vm.type = vm.channelType;
            vm.sDate = vm.startDate.getTime();
            vm.eDate = vm.endDate.getTime();
            //判断是否全部/个人
            if (vm.fwmAccount == "all") {
              vm.chartTitle = "全部";
              vm.titleName = "个人产出统计";
            } else {
              vm.chartTitle = "个人";
              vm.titleName = "个人产出情况";
            }
            vm.chartList = response.data.person;
            vm.sum = response.data.personSumCount;
            //将总数放入数组中，拿最大数做数据
            let arr = [];
            for (var i = 0; i < vm.chartList.length; i++) {
              arr.push(vm.chartList[i].processCount);
            }
            //数组去重排序，拿最大数
            arr.sort(function(a, b) {
              return a - b;
            });
            var max = Math.ceil(arr[arr.length - 1] / 100) * 100;
            if (max == 0) {
              max = 100;
            }
            var mean = max / 5;
            var strNum =
              mean +
              "," +
              mean * 2 +
              "," +
              mean * 3 +
              "," +
              mean * 4 +
              "," +
              max;
            vm.numList = strNum.split(",");
            vm.monitor();
          }
        })
        .catch(function(error) {});
    },
    //获取组别
    getFindUser() {
      let vm = this;
      api
        .get(`./manage/service/personalStatistics/findUser`)
        .then(function(response) {
          if (response.status == 200) {
            vm.fwmAccount = "all";
            vm.findUser = response.data;
          }
        })
        .catch(function(error) {});
    },
    monitor() {
      let _this = this;
      setTimeout(function() {
        if (document.getElementsByClassName("chart-box-list-box-one")[0]) {
          _this.monitorW = document.getElementsByClassName(
            "chart-box-list-box-one"
          )[0].offsetWidth;
        }
      }, 100);
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
    researchForm() {
      this.getData();
    },
    deriveForm() {
      let vm = this;
      if (this.fwmAccount == "all") {
        let data = {
          channelType: this.channelType,
          fwmAccount: this.fwmAccount,
          startDate: this.startDate,
          endDate: this.endDate
        };
        api
          .post(`./manage/service/personalStatistics/exportPersonal`, data)
          .then(function(response) {
            if (response.status == 200) {
              vm.goExport();
            }
          })
          .catch(function(error) {});
      } else {
        let data = {
          fwmAccount: this.fwmAccount,
          channelType: this.channelType,
          dataSource: "",
          startDate: this.startDate,
          endDate: this.endDate
        };
        api
          .post(`./manage/service/personalStatistics/exportPerson`, data)
          .then(function(response) {
            if (response.status == 200) {
              vm.goExport();
            }
          })
          .catch(function(error) {});
      }
    },

    resetForm() {
      this.reset();
    }
  }
};
</script>

<style scoped lang="less">
.director {
  width: 100%;
  height: 100%;

  .top-box {
    padding: 24px 24px 0px 24px;
  }
  .content-box {
    width: 100%;
    overflow: hidden;
    position: relative;

    padding-bottom: 15px;
    .content-box-left {
      width: calc(50% - 8px);
      float: left;
      height: 100%;
      // overflow-y: auto;
    }
    .content-box-divide {
      width: 16px;
      float: left;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      margin-left: calc(50% - 8px);
      background: #f0f2f5;
    }
    .content-box-btoom {
      width: calc(50% - 8px);
      float: left;
      margin-left: 16px;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
