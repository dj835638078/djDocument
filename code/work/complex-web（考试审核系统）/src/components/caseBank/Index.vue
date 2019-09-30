<template>
  <div class="train">
    <div class="train-box">
      <div class="train-box-top">
        <div class="train-box-top-name">
          案例库
        </div>
        <!-- <div style="float:left;margin-left:100px;margin-top:15px;">
          <el-select
            clearable
            v-model="ruleClassify"
            placeholder="请选择来源"
            class="smallWidth"
          >
            <el-option
              v-for="(item, index) in ruleList"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            >
            </el-option>
          </el-select>
        </div> -->
        <div class="public-search" style="margin-top:15px;height:35px;">
          <div class="public-search-left">
            <el-input
              v-model="ruleTitle"
              placeholder="请输入案例名称"
              maxlength="50"
              :clearable="true"
            ></el-input>
          </div>
          <div
            class="public-search-right"
            style="height:32px;line-height:32px;width:75px;"
            @click="searchList"
          >
            <span class="el-icon-search"></span>搜索
          </div>
        </div>
      </div>
      <CaseBankList :list="list" />
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="totals"
        style="text-align:right;"
        background
        layout="total,sizes, prev, pager, next, jumper"
        :total="totals"
        :page-sizes="[12, 24, 36, 48, 60]"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import CaseBankList from "./CaseBankList";
export default {
  data() {
    return {
      list: [],
      ruleTitle: "",
      currentPage: 1,
      pageSize: 12,
      totals: 0,
      ruleClassify: ""
    };
  },
  components: { CaseBankList },
  computed: { ...mapState(["ruleList"]) },
  mounted() {
    this.getCaseBankList();
  },
  watch: {
    ruleClassify() {
      this.currentPage = 1;
      this.pageSize = 12;
      this.totals = 0;
      this.getCaseBankList();
    }
  },
  methods: {
    searchList() {
      this.currentPage = 1;
      this.pageSize = 12;
      this.totals = 0;
      this.getCaseBankList();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCaseBankList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCaseBankList();
    },
    //获取数据
    getCaseBankList() {
      let data = {
        caseTitile: this.ruleTitle
        //ruleClassify: this.ruleClassify,
      };
      this.api
        .post(
          `./complex/service/webCases/page?currentPage=${
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
.public-search/deep/.el-input__inner {
  border-radius: 100px !important;
  border: 1px solid #00cdca !important;
  height: 32px !important;
}
.public-search/deep/.el-input__suffix {
  margin-right: -30px !important;
}
.train {
  width: 100%;
  margin-bottom: 100px;
  .train-box {
    width: 100%;
    .train-box-top {
      width: 100%;
      overflow: hidden;
      .train-box-top-name {
        float: left;
        margin-top: 18px;
        border-left: 2px solid #00cdca;
        padding-left: 10px;
        font-size: 18px;
        font-weight: 600;
        font-family: PingFangSC-Semibold;
        color: #2a2a2a;
        margin-bottom: 15px;
      }
    }
  }
}
</style>