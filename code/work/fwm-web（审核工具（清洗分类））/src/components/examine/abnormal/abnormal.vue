<template>
  <div class="abnormal">
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="质检反馈数据" name="check"> </el-tab-pane>
        <el-tab-pane label="业务专家反馈数据" name="savant"></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div class="abnormal-top">
      <div class="abnormal-top-box" style="width:calc(25% + 30px);">
        <div class="abnormal-top-box-name">{{ inputName }}：</div>
        <div class="abnormal-top-box-input">
          <human
            val="checkAccount"
            :showYN="checkAccount"
            :result="resultNum"
          />
        </div>
      </div>
      <div class="abnormal-top-box" style="margin-left:20px;">
        <div class="abnormal-top-box-name">
          rowkey：
        </div>
        <div class="abnormal-top-box-input">
          <el-input
            v-model="rowkey"
            placeholder="请输入rowkey"
            :clearable="true"
          ></el-input>
        </div>
      </div>
      <div
        class="abnormal-top-box"
        style="margin-left:20px;"
        v-if="activeName == 'savant'"
      >
        <div class="abnormal-top-box-name">
          反馈状态：
        </div>
        <div class="abnormal-top-box-input">
          <el-select
            v-model="appealState"
            placeholder="请选择反馈状态"
            :clearable="true"
          >
            <el-option
              v-for="(item, index) in lookUp.TASK_APPEAL_RESULT"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div
        class="query"
        @click="query"
        style="float:right;margin-top:2px;margin-right:0;"
      >
        <i class="fa fa-search"></i>查询
      </div>
    </div>
    <div class="abnormal-tab">
      <videoCheck
        :tableData="tableData"
        :height="tableHeightTwoS"
        v-if="activeName == 'check' && $route.name == 'VideoAbnormal'"
      />
      <videoSavantCheck
        :tableData="tableData"
        :height="tableHeightTwoS"
        v-if="activeName == 'savant' && $route.name == 'VideoAbnormal'"
      />
      <imageCheck
        :tableData="tableData"
        :height="tableHeightTwoS"
        v-if="activeName == 'check' && $route.name == 'ImgAbnormal'"
      />
      <imageSavantCheck
        :tableData="tableData"
        :height="tableHeightTwoS"
        v-if="activeName == 'savant' && $route.name == 'ImgAbnormal'"
      />
    </div>
    <div class="paging-box">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import human from "../../common/Human";
import { mapState, mapMutations } from "vuex";
import videoCheck from "./videoCheck";
import imageCheck from "./imageCheck";
import videoSavantCheck from "./videoSavantCheck";
import imageSavantCheck from "./imageSavantCheck";
export default {
  name: "abnormal",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "check",
      inputName: "",
      checkAccount: "",
      rowkey: "",
      appealState: "",
      resultNum: "1",
      options: [],
      tableData: []
    };
  },
  watch: {
    "$route.name"() {
      this.resultNum++;
      this.tableData = [];
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.activeName = "check";
      this.checkAccount = "";
      this.rowkey = "";
      this.appealState = "";
      this.getImgAbnormalList();
    }
  },
  mounted() {
    this.inputName = "质检员";
    this.getImgAbnormalList();
  },
  computed: {
    ...mapState(["tableHeightTwoS", "lookUp"])
  },
  components: {
    human,
    videoCheck,
    videoSavantCheck,
    imageCheck,
    imageSavantCheck
  },
  methods: {
    getImgAbnormalList() {
      let vm = this;
      let url;
      let data;
      //质检员
      if (this.activeName == "check") {
        data = {
          checkAccount: this.checkAccount,
          rowkey: this.rowkey
        };
        if (this.$route.name == "VideoAbnormal") {
          url = `./manage/service/videoVerify/queryCheckErrorBack?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`;
        } else {
          url = `./manage/service/graphics/queryCheck?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`;
        }
      } else {
        //业务专家
        data = {
          expertAccount: this.checkAccount,
          rowkey: this.rowkey,
          appealState: this.appealState
        };
        if (this.$route.name == "VideoAbnormal") {
          url = `./manage/service/videoVerify/queryExpertBack?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`;
        } else {
          url = `./manage/service/graphics/queryExpert?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`;
        }
      }
      api
        .post(url, data)
        .then(function(response) {
          vm.tableData = response.data.result;
          vm.totals = response.data.page.totalRows;
        })
        .catch(function(error) {});
    },
    handleClick(row) {
      this.resultNum++;
      this.tableData = [];
      this.currentPage = 1;
      this.pageSize = 10;
      this.checkAccount = "";
      this.rowkey = "";
      this.appealState = "";
      if (row.label == "质检反馈数据") {
        this.inputName = "质检员";
      } else {
        this.inputName = "业务专家";
      }
      this.getImgAbnormalList();
    },
    query() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getImgAbnormalList();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getImgAbnormalList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getImgAbnormalList();
    }
  }
};
</script>

<style scoped lang="less">
.abnormal {
  width: 100%;
  .abnormal-top {
    //width: 100%;
    padding: 5px 20px 0px 20px;
    height: 50px;
    .abnormal-top-box {
      width: 25%;
      height: 32px;
      float: left;
      .abnormal-top-box-name {
        float: left;
        width: 70px;
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
      .abnormal-top-box-input {
        float: left;
        width: calc(100% - 70px);
        height: 32px;
      }
    }
  }
}
</style>
