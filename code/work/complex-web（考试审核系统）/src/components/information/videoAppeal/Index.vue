<template>
  <div class="imageText">
    <div class="imageText-top">
      <div class="imageText-top-name">
        审核申诉
      </div>
    </div>
    <div class="imageText-search">
      <div class="search-one-box">
        <div class="search-one-box-name">申诉状态：</div>
        <div class="search-one-box-input">
          <el-select
            v-model="appealStatus"
            placeholder="请选择"
            :clearable="true"
          >
            <el-option
              v-for="item in lookUp.ENTRY_APPEAL_STATUS"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:76px;">质检时间：</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="选择质检时间"
          >
          </el-date-picker>
        </div>
        <div class="separate">-</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="选择质检时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div style="float:right">
        <div class="query interval" @click="query">查询</div>
        <div class="release" v-if="!appealStatus && !startDate && !endDate">
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
      </div>
    </div>
    <!--审核员进来进行角色判断  v-if="
        tools.setRoles('graphic_auditor') || tools.setRoles('video_auditor')
      "-->
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
// import Human from "../public/Human";
export default {
  data() {
    return {
      fwmAccount: "",
      appealStatus: "",
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
    ...mapState(["homeContentHeight", "userInfo", "lookUp", "datasourceStore"])
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
      this.fwmAccount = "";
      this.appealStatus = "";
      this.startDate = "";
      this.endDate = "";
      // this.currentPage = 1;
      // this.pageSize = 10;
      // this.totals = 0;
      this.getInformation();
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
        appealStatus: this.appealStatus,
        startDate: this.startDate,
        endDate: this.endDate
      };
      this.api
        .post(
          `./complex/service/appealEntry/video/page?currentPage=${
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
    // border-bottom: 4px solid #00cdca;
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
        width: 72px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .search-one-box-input {
        width: 190px;
        height: 32px;
      }
      .search-one-box-time {
        width: 190px;
        float: left;
      }
    }
  }
}
</style>