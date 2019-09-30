<template>
  <div class="imageText">
    <div class="imageText-top">
      <div class="imageText-top-name">
        报备功能
      </div>
    </div>
    <div class="imageText-search">
      <div class="search-one-box">
        <div class="search-one-box-name">审核来源：</div>
        <div class="search-one-box-input">
          <el-select
            v-model="dataSource"
            placeholder="请选择审核来源"
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
        <div class="search-one-box-name">处理状态：</div>
        <div class="search-one-box-input">
          <el-select
            v-model="filingStatus"
            placeholder="请选择处理状态"
            :clearable="true"
          >
            <el-option label="待处理" value="0"></el-option>
            <el-option label="已处理" value="1"></el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name">报备时间：</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="选择报备时间"
          >
          </el-date-picker>
        </div>
        <div class="separate" style="margin-left: 10px;">-</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="选择报备时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div style="float:right">
        <div class="query interval" @click="query">查询</div>
        <div
          class="release"
          v-if="!dataSource && !filingStatus && !startDate && !endDate"
        >
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
      </div>
    </div>
    <!--   v-if="tools.setRight('checkDetail')"-->
    <div
      class="query imageText-add"
      @click="add"
      v-if="tools.setRight('reportAdd')"
    >
      新增
    </div>
    <div class="imageText-tab">
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
export default {
  data() {
    return {
      //人员控件重置控制
      resultNum: "1",
      fwmAccount: "",
      dataSource: "",
      filingStatus: "",
      startDate: "",
      endDate: "",
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      list: [],
      options: []
    };
  },
  components: { Table },
  computed: {
    ...mapState(["homeContentHeight", "userInfo", "lookUp", "datasourceStore"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  mounted() {
    this.getInformation();
  },
  methods: {
    query() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getInformation();
    },
    release() {
      this.resultNum++;
      this.fwmAccount = "";
      this.dataSource = "";
      this.filingStatus = "";
      this.startDate = "";
      this.endDate = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getInformation();
    },
    add() {
      this.$router.push({
        name: "reportAdd"
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
        filingStatus: this.filingStatus,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.api
        .post(
          `./complex/service/filing/findPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}`,
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
.upload-demo/deep/ .el-upload-list {
  display: none !important;
}
.upload-demo/deep/ .el-button {
  width: 72px;
  height: 28px;
  line-height: 8px;
  background: #00cdca;
  padding: 6px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: none;
  margin-top: 2px;
}
.imageText-search /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
  height: 32px;
}
.imageText {
  width: 100%;
  margin-bottom: 100px;

  .imageText-search {
    height: 32px;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .search-one-box {
      height: 32px;
      float: left;
      margin-right: 20px;
      .search-one-box-name,
      .search-one-box-input {
        float: left;
      }
      .search-one-box-name {
        width: 76px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .search-one-box-input {
        width: 180px;
        height: 32px;
      }
      .search-one-box-time {
        width: 180px;
        float: left;
      }
    }
  }
  .imageText-add {
    margin: 0px 0px 16px 12px;
  }
}
</style>