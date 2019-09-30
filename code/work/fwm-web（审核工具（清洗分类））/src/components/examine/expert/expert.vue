<template>
  <div class="expert">
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="评审内容" name="check"> </el-tab-pane>
        <el-tab-pane label="评审记录" name="savant"></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div class="expert-top">
      <div class="expert-top-box" style="width:calc(25% + 30px);">
        <div class="expert-top-box-name">{{ inputName }}：</div>
        <div class="expert-top-box-input">
          <human
            val="processAccount"
            :showYN="processAccount"
            :result="resultNum"
          />
        </div>
      </div>
      <div class="expert-top-box" style="margin-left:20px;">
        <div class="expert-top-box-name">
          rowkey：
        </div>
        <div class="expert-top-box-input">
          <el-input
            v-model="rowkey"
            placeholder="请输入rowkey"
            :clearable="true"
          ></el-input>
        </div>
      </div>
      <!-- <div
        class="expert-top-box"
        style="margin-left:20px;"
        v-if="activeName == 'savant'"
      >
        <div class="expert-top-box-name">
          反馈状态：
        </div>
        <div class="expert-top-box-input">
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
      </div> -->
      <div
        class="query"
        @click="query"
        style="float:right;margin-top:2px;margin-right:0;"
      >
        <i class="fa fa-search"></i>查询
      </div>
    </div>
    <div class="expert-tab">
      <videoExpert
        :tableData="tableData"
        :height="tableHeightTwoS"
        v-if="activeName == 'check' && $route.name == 'VideoExpert'"
      />
      <videoFruit
        :tableData="tableData"
        :height="tableHeightTwoS"
        v-if="activeName == 'savant' && $route.name == 'VideoExpert'"
      />
      <imageExpert
        :tableData="tableData"
        :height="tableHeightTwoS"
        v-if="activeName == 'check' && $route.name == 'ImgExpert'"
      />
      <imageFruit
        :tableData="tableData"
        :height="tableHeightTwoS"
        v-if="activeName == 'savant' && $route.name == 'ImgExpert'"
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
import videoExpert from "./videoExpert";
import imageExpert from "./imageExpert";
import videoFruit from "./videoFruit";
import imageFruit from "./imageFruit";
export default {
  name: "expert",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "check",
      inputName: "审核员",
      processAccount: "",
      resultNum: "1",
      rowkey: "",
      appealState: "",
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
      this.processAccount = "";
      this.rowkey = "";
      this.appealState = "";
      this.getImgexpertList();
    }
  },
  mounted() {
    this.getImgexpertList();
  },
  computed: {
    ...mapState(["tableHeightTwoS", "lookUp"])
  },
  components: {
    human,
    videoExpert,
    imageExpert,
    videoFruit,
    imageFruit
  },
  methods: {
    getImgexpertList() {
      let vm = this;
      let url;
      let data;
      //质检员
      if (this.activeName == "check") {
        data = {
          processAccount: this.processAccount,
          rowkey: this.rowkey
        };
        if (this.$route.name == "VideoExpert") {
          url = `./manage/service/videoEexpert/findList?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`;
        } else {
          url = `./manage/service/gexpert/waitlist?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`;
        }
      } else {
        //业务专家
        data = {
          processAccount: this.processAccount,
          rowkey: this.rowkey
          // appealState: this.appealState
        };
        if (this.$route.name == "VideoExpert") {
          url = `./manage/service/videoEexpert/findApprovalList?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`;
        } else {
          url = `./manage/service/gexpert/completelist?currentPage=${
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
      this.processAccount = "";
      this.rowkey = "";
      this.appealState = "";
      // if (row.label == "评审内容") {
      //   this.inputName = "质检员账号";
      // } else {
      //   this.inputName = "业务专家账号";
      // }
      this.getImgexpertList();
    },
    query() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getImgexpertList();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getImgexpertList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getImgexpertList();
    }
  }
};
</script>

<style scoped lang="less">
.expert {
  width: 100%;
  .expert-top {
    //width: 100%;
    padding: 5px 20px 0px 20px;
    height: 50px;
    .expert-top-box {
      width: 25%;
      height: 32px;
      float: left;
      .expert-top-box-name {
        float: left;
        width: 70px;
        height: 32px;
        line-height: 32px;
        text-align: center;
      }
      .expert-top-box-input {
        float: left;
        width: calc(100% - 70px);
        height: 32px;
      }
    }
  }
}
</style>
