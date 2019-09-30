<template>
  <div class="checkData">
    <div class="checkData-search">
      <div class="search-one-box">
        <div class="search-one-box-name">来源：</div>
        <div class="search-one-box-input">
          <el-select
            v-model="dataSource"
            placeholder="请选择来源"
            :clearable="true"
          >
            <el-option
              v-for="item in lookUp.DATASOURCE_CD_TW"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name">审核人：</div>
        <div class="search-one-box-input">
          <Human
            val="processAccount"
            :showYN="processAccount"
            :result="resultNum"
            style="width: 175px;"
          />
        </div>
      </div>
      <div class="search-one-box">
        <div
          class="search-one-box-name"
          style="width:70px;margin-left:5px;text-align:center;"
        >
          日期：
        </div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </div>
        <div class="separate">-</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="选择日期"
            value-format="timestamp"
          >
          </el-date-picker>
        </div>
      </div>
      <div style="float:right">
        <div class="query interval" @click="query">查询</div>
        <div
          class="release"
          v-if="!dataSource && !startDate && !endDate && !processAccount"
        >
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
        <div
          class="query interval"
          @click="exportBtn"
          style="margin-left:12px;margin-right:0;"
        >
          导出
        </div>
      </div>
    </div>
    <!--审核员进来进行角色判断  v-if="
        tools.setRoles('graphic_auditor') || tools.setRoles('video_auditor')
      "-->

    <div class="checkData-tab">
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
import Human from "../../public/Human";
import { mapState } from "vuex";
import Table from "./Table";
// import Human from "../public/Human";
export default {
  data() {
    return {
      checkAccount: "",
      //人员控件重置控制
      resultNum: "1",
      processAccount: "",
      dataSource: "",
      startDate: "",
      endDate: "",
      AprocessAccount: "",
      AdataSource: "",
      AstartDate: "",
      AendDate: "",
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      list: [],
      options: []
    };
  },
  components: { Table, Human },
  computed: {
    ...mapState(["homeContentHeight", "userInfo", "lookUp"])
  },
  mounted() {
    this.getInformation();
  },
  methods: {
    exportBtn() {
      location.href =
        location.origin +
        `/complex/publicservice/gReporter/checkDataExport?start=${
          this.AstartDate
        }&end=${this.AendDate}&dataSource=${this.AdataSource}&processAccount=${
          this.AprocessAccount
        }`;
    },
    query() {
      //赋值给导出文件
      this.AprocessAccount = this.processAccount;
      this.AdataSource = this.dataSource;
      this.AstartDate = this.startDate;
      this.AendDate = this.endDate;
      this.currentPage = 1;
      this.pageSize = 10;
      this.getInformation();
    },
    release() {
      this.resultNum++;
      this.processAccount = "";
      this.dataSource = "";
      this.startDate = "";
      this.endDate = "";
      this.AprocessAccount = "";
      this.AdataSource = "";
      this.AstartDate = "";
      this.AendDate = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getInformation();
    },
    add() {
      this.$router.push({
        name: "imageTextAdd"
      });
    },
    //设置来源名称
    setDataName(data) {
      if (data) {
        for (var key in this.lookUp.DATASOURCE_CD_TW) {
          if (data == this.lookUp.DATASOURCE_CD_TW[key].itemCode) {
            return this.lookUp.DATASOURCE_CD_TW[key].itemName;
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
        dataSource: this.dataSource,
        startDate: this.startDate,
        endDate: this.endDate,
        processAccount: this.processAccount
      };
      this.api
        .post(
          `./complex/service/gReporter/checkData?currentPage=${
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
    }
  }
};
</script>

<style scoped lang="less">
.checkData-search /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
  height: 32px;
}
.checkData {
  width: 100%;
  margin-bottom: 100px;
  .checkData-search {
    height: 32px;
    width: 100%;
    margin-top: 18px;
    padding-bottom: 16px;
    margin-bottom: 2px;
    .search-one-box {
      height: 32px;
      float: left;
      margin-right: 15px;
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
        width: 170px;
        height: 32px;
      }
      .search-one-box-time {
        width: 170px;
        float: left;
        .el-date-editor {
          width: 170px;
        }
      }
    }
  }
}
</style>