<template>
  <div class="ApprovalList" v-if="showDetail">
    <div class="imageText-top">
      <div class="imageText-top-name" style="margin-bottom: 1px;">
        注册审批
      </div>
    </div>
    <div class="ApprovalList-top">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item style="margin-right:40px;" index="1">待审批</el-menu-item>
        <el-menu-item style="margin-right:40px;" index="2">已审批</el-menu-item>
      </el-menu>
    </div>
    <div :style="{ minHeight: homeContentHeight + 'px' }">
      <div class="ApprovalList-search">
        <el-input
          v-model="fwmAccount"
          placeholder="请输入员工工号或手机号码进行查询"
          maxlength="20"
          :clearable="true"
        ></el-input>
        <div class="ApprovalList-search-btn" @click="query">
          <span class="el-icon-search"></span>查询
        </div>
      </div>
      <div class="ApprovalList-table">
        <Padding :tableData="tableData" v-if="activeIndex == '1'" />
        <Already :tableData="tableData" v-if="activeIndex == '2'" />
      </div>
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="totals > pageSize"
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
  <div v-else>
    <approvalDetail :manInfoList="manInfoList" :isChecked="isChecked" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Padding from "./Pending";
import Already from "./Already";
import approvalDetail from "./approvalDetail";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      activeIndex: "1",
      fwmAccount: "",
      tableData: [],
      showDetail: true,
      manInfoList: {},
      isChecked: false
    };
  },
  components: { Padding, Already, approvalDetail },
  computed: { ...mapState(["homeContentHeight"]) },
  mounted() {
    this.getApprovalListOne();
  },
  methods: {
    query() {
      this.currentPage = 1;
      this.getApprovalListOne();
    },
    handleSelect(key) {
      this.activeIndex = key;
      this.tableData = [];
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.fwmAccount = "";
      this.getApprovalListOne();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getApprovalListOne();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getApprovalListOne();
    },
    //获取数据
    getApprovalListOne(goFirst) {
      let data = {
        fwmAccount: this.fwmAccount
      };
      if (goFirst == "goFirst") {
        this.currentPage = 1;
      }
      let url = "";
      if (this.activeIndex == "1") {
        this.isChecked = false;
        url = `./complex/service/fuser/findPendingApprovalPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
      } else {
        this.isChecked = true;
        url = `./complex/service/fuser/findApprovedPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}`;
      }
      this.api
        .post(url, data)
        .then(response => {
          if (response.status == 200) {
            this.tableData = response.data.result;
            this.totals = response.data.page.totalRows;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.ApprovalList-search /deep/.el-input__suffix {
  right: 80px !important;
}
.ApprovalList-table /depp/ .cell {
  height: 33px !important;
}
.ApprovalList-search /deep/ .el-input__inner {
  height: 40px;
  line-height: 40px;
  border-color: #00cdca;
}
.ApprovalList /deep/ .el-menu-item:hover {
  color: #00cdca !important; //鼠标hover颜色
}
.ApprovalList {
  margin-bottom: 81px;
  .el-menu-item {
    color: rgba(42, 42, 42, 0.85);
    font-size: 16px;
    padding: 0px;
    font-weight: 600;
    font-family: PingFangSC-Semibold;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    border-color: #00cdca;
    line-height: 50px;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #00cdca;
  }
  .ApprovalList-top {
    height: 50px;
  }
  .ApprovalList-search {
    height: 40px;
    position: relative;
    width: 500px;
    margin: 18px 0;
    .ApprovalList-search-btn {
      position: absolute;
      right: 0px;
      top: 0px;
      width: 78px;
      height: 100%;
      background: #00cdca;
      border-radius: 0px 4px 4px 0px;
      font-size: 14px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      cursor: pointer;
      span {
        margin-right: 5px;
      }
    }
  }
  .ApprovalList-table {
    width: 100%;
  }
}
</style>