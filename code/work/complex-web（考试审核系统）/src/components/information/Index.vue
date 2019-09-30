<template>
  <div class="information">
    <div class="information-top">
      <div class="information-top-name">
        审核录入
      </div>
    </div>
    <div
      class="information-search manage-find"
      style="height: 84px;"
      v-if="tools.setRight('verifyStatistics')"
    >
      <div class="search-one-box">
        <div class="search-one-box-name" style="width: 76px;">审核员：</div>
        <div class="search-one-box-input">
          <Human val="fwmAccount" :showYN="fwmAccount" :result="resultNum" />
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:70px;">业务来源：</div>
        <div class="search-one-box-input">
          <el-select
            v-model="dataSource"
            placeholder="请选择"
            :clearable="true"
          >
            <el-option
              v-for="item in datasourceStore"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:76px;">组别：</div>
        <div class="search-one-box-input">
          <el-select
            v-model="verifyGroup"
            placeholder="请选择"
            :clearable="true"
          >
            <el-option
              v-for="item in lookUp.CD_GRAPHIC_GROUP"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box" style="margin-top: 20px;">
        <div class="search-one-box-name" style="width:76px;">审核时间：</div>
        <div class="search-one-box-time" style="width: 360px;">
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="选择审核时间"
          >
          </el-date-picker>
        </div>
        <div class="separate">-</div>
        <div class="search-one-box-time" style="width: 360px;">
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="选择审核时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div style="float:right;margin-top: 20px;">
        <div class="query interval" @click="query">查询</div>
        <div
          class="release"
          v-if="
            !fwmAccount && !dataSource && !startDate && !endDate && !verifyGroup
          "
        >
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
        <div
          class="query interval"
          @click="exportList"
          style="margin-left:12px;"
          v-if="totals > 0"
        >
          导出
        </div>
        <div class="release" style="margin-left:12px;" v-else>
          导出
        </div>
      </div>
    </div>
    <div class="information-search" v-else>
      <div
        class="search-one-box"
        v-if="
          tools.setRoles('g_projectManager') ||
            tools.setRoles('v_projectManager') ||
            tools.setRoles('g_teamLeader') ||
            tools.setRoles('fwmAdmin') ||
            tools.setRoles('v_teamLeader')
        "
      >
        <div class="search-one-box-name">审核员：</div>
        <div class="search-one-box-input">
          <Human val="fwmAccount" :showYN="fwmAccount" :result="resultNum" />
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:70px;">业务来源：</div>
        <div class="search-one-box-input">
          <el-select
            v-model="dataSource"
            placeholder="请选择"
            :clearable="true"
          >
            <el-option
              v-for="item in datasourceStore"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:76px;">审核时间：</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="选择审核时间"
          >
          </el-date-picker>
        </div>
        <div class="separate">-</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="选择审核时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div style="float:right">
        <div class="query interval" @click="query">查询</div>
        <div
          class="release"
          v-if="!fwmAccount && !dataSource && !startDate && !endDate"
        >
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
        <div
          class="query interval"
          @click="exportList"
          style="margin-left:12px;"
          v-if="tools.setRight('审核录入')"
        >
          导出
        </div>
        <!-- <div class="release" style="margin-left:12px;" v-else>
          导出
        </div> -->
      </div>
    </div>
    <!--审核员进来进行角色判断-->
    <div
      class="query information-add"
      @click="add"
      v-if="tools.setRight('information')"
    >
      新增
    </div>
    <div class="count-list" v-if="tools.setRight('verifyStatistics')">
      <ul class="count-list-ul">
        <li class="count-list-li">
          <div class="count-value" style="margin-right: 0px;">
            <span
              style="width: 10px;float: left;height: 34px;margin-left: 20px;"
            >
              <div
                style="width: 6px;height: 6px;background: #00CDCA;border-radius: 50%;margin-top: 14px;"
              ></div>
            </span>
            <span style="font-weight: 700;">总量：{{ verifyCountNum }}</span>
          </div>
        </li>
        <li class="count-list-li">
          <div class="count-value">
            <span
              style="width: 10px;float: left;height: 34px;margin-left: 20px;"
            >
              <div
                style="width: 6px;height: 6px;background: #00CDCA;border-radius: 50%;margin-top: 14px;"
              ></div>
            </span>
            <span style="font-weight: 700;">通过率：{{ passRate }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="information-tab">
      <Table :tableData="list" />
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="totals > 0"
        style="text-align:right;"
        background
        :total="totals"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from "./Table";
import Human from "../public/Human";
export default {
  data() {
    return {
      //人员控件重置控制
      resultNum: "1",
      fwmAccount: "",
      dataSource: "",
      startDate: "",
      endDate: "",
      verifyGroup: "",
      verifyCountNum: 0,
      passCountNum: 0,
      passRate: "0%",
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      list: [],
      options: [],
      isInit: false,
      fwmAccountS: "",
      dataSourceS: "",
      startDateS: "",
      endDateS: "",
      verifyGroupS: ""
    };
  },
  components: { Human, Table },
  computed: {
    ...mapState(["homeContentHeight", "userInfo", "lookUp", "datasourceStore"])
  },
  mounted() {
    this.getInformation();
    this.getCountNum();
  },
  methods: {
    exportList() {
      let vm = this;
      if (this.totals > 0) {
        let data = {
          fwmAccount: this.fwmAccountS,
          dataSource: this.dataSourceS,
          startDate: this.startDateS,
          endDate: this.endDateS,
          verifyGroup: this.verifyGroupS
        };
        this.api
          .post(`./complex/service/verifyEntry/export`, data)
          .then(response => {
            if (response.status == 200) {
              vm.$confirm(
                "导入成功，前往【<a style='color: rgb(0, 205, 202);' href=" +
                  location.origin +
                  "/#/importExport/1" +
                  ">导入导出</a>】页面查看详情",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "success",
                  dangerouslyUseHTMLString: true
                }
              )
                .then(() => {
                  // vm.$router.push({
                  //   name: "importExport",
                  //   params: { type: "1" }
                  // });
                  location.href = location.origin + "/#/importExport/1";
                })
                .catch(() => {});
            }
          })
          .catch(error => {});
      }
    },
    query() {
      this.fwmAccountS = this.fwmAccount;
      this.dataSourceS = this.dataSource;
      this.startDateS = this.startDate;
      this.endDateS = this.endDate;
      this.verifyGroupS = this.verifyGroup;
      this.currentPage = 1;
      this.pageSize = 10;
      this.getInformation();
      this.getCountNum();
    },
    release() {
      this.resultNum++;
      this.fwmAccountS = "";
      this.dataSourceS = "";
      this.startDateS = "";
      this.endDateS = "";
      this.verifyGroupS = "";
      this.fwmAccount = "";
      this.dataSource = "";
      this.startDate = "";
      this.endDate = "";
      this.verifyGroup = "";
      this.verifyCountNum = 0;
      this.passCountNum = 0;
      this.passRate = "0%";
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getInformation();
    },
    add() {
      this.$router.push({
        name: "informationAdd"
      });
      //跳全屏
      // window.open(
      //   "http://localhost:8080/#/myCollection",
      //   "newwindow",
      //   "height=500,   width=800,   toolbar=no,   menubar=no,   scrollbars=no,   resizable=no,   location=no,   status=yes,left=250,top=250"
      // );
    },
    //设置来源名称
    setDataName(data) {
      if (data) {
        for (var key in this.datasourceStore) {
          if (data == this.datasourceStore[key].itemCode) {
            return this.datasourceStore[key].itemName;
          }
        }
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInformation();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInformation();
    },
    //获取数据
    getInformation() {
      let data = {
        fwmAccount: this.fwmAccount,
        dataSource: this.dataSource,
        startDate: this.startDate,
        endDate: this.endDate,
        verifyGroup: this.verifyGroup
      };
      this.api
        .post(
          `./complex/service/verifyEntry/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(response => {
          if (response.status == 200) {
            this.list = response.data.result;
            this.totals = response.data.page.totalRows;
            window.scrollTo(0, 0);
          }
        })
        .catch(error => {});
    },
    //获取统计数据
    getCountNum() {
      let vm = this;
      if (!vm.tools.setRight("verifyStatistics")) {
        if (!vm.isInit) {
          setTimeout(function() {
            vm.getCountNum();
          }, 1000);
        }
        return;
      }
      vm.isInit = true;
      let data = {
        fwmAccount: vm.fwmAccount,
        dataSource: vm.dataSource,
        startDate: vm.startDate,
        endDate: vm.endDate,
        verifyGroup: vm.verifyGroup
      };
      vm.api
        .post(`./complex/service/verifyEntry/verifyCount?currentPage`, data)
        .then(response => {
          if (response.status == 200) {
            if (response.data) {
              vm.verifyCountNum = response.data.verifyCountNum;
              vm.passCountNum = response.data.passCountNum;
              vm.passRate = response.data.passRate;
            }
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.manage-find {
  .el-date-editor--datetime {
    width: 360px !important;
  }
}
.information-search /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
  height: 32px;
}
.information {
  width: 100%;
  margin-bottom: 100px;
  .information-top {
    width: 100%;
    .information-top-name {
      margin-top: 18px;
      border-left: 2px solid #00cdca;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      font-family: PingFangSC-Semibold;
      color: #2a2a2a;
      margin-bottom: 18px;
    }
  }
  .information-search {
    height: 32px;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 8px;
    .search-one-box {
      height: 32px;
      float: left;
      margin-right: 20px;
      .search-one-box-name,
      .search-one-box-input {
        float: left;
      }
      .search-one-box-name {
        width: 64px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .search-one-box-input {
        width: 185px;
        height: 32px;
      }
      .search-one-box-time {
        width: 185px;
        float: left;
      }
    }
  }
  .information-add {
    margin: 0px 0px 16px 12px;
  }
}
.count-list {
  .count-list-ul {
    width: 100%;
    overflow: hidden;
    height: 50px;
    background-color: #f5f7fa;
    margin-bottom: 10px;
    .count-list-li {
      float: left;
      width: 50%;
      line-height: 34px;
      .count-value {
        margin: 0 auto;
        background-color: white;
        height: 34px;
        margin-top: 8px;
        margin-left: 8px;
        margin-right: 8px;
      }
    }
  }
}
</style>