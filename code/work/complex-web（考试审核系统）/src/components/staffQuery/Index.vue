<template>
  <div class="staffQuery">
    <div class="trainDetailTitle">
      <div class="line"></div>
      <div class="title">员工查询</div>
    </div>
    <div class="staffQuery-box">
      <div class="staffQuery-box-top">
        <div class="staffQuery-input">
          <div class="staffQuery-input-left">
            <el-input
              v-model="queryStr"
              placeholder="请输入员工手机号、工号、姓名、QQ号码进行查询"
              maxlength="50"
              :clearable="true"
            ></el-input>
          </div>
          <div class="staffQuery-input-right" @click="searchList">
            <span class="el-icon-search"></span>搜索
          </div>
        </div>
      </div>
    </div>
    <div class="staffQuery-tab">
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
import Table from "./Table";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      queryStr: "",
      list: []
    };
  },
  components: { Table },
  computed: {},
  mounted() {
    //this.getNoticeType();
  },
  methods: {
    //搜索
    searchList() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getNoticeType();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getNoticeType();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getNoticeType();
    },
    //获取数据
    getNoticeType() {
      let data = {
        queryStr: this.queryStr
      };
      this.api
        .post(
          `./complex/service/fuserWeb/queryPersonnel?currentPage=${
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
.staffQuery-box-top /deep/.el-input__suffix {
  right: 110px !important;
}
.staffQuery-box-top /deep/.el-input__inner {
  border-radius: 100px;
  border: 1px solid #00cdca;
  height: 40px;
}
.staffQuery {
  width: 100%;
  margin-bottom: 100px;
  .staffQuery-box {
    width: 900px;
    margin: auto;
    .staffQuery-box-top {
      width: 100%;
      margin-top: -30px;
      .staffQuery-input {
        height: 40px;
        width: 100%;
        position: relative;
        .staffQuery-input-left {
          width: 100%;
        }
        .staffQuery-input-right {
          width: 107px;
          height: 40px;
          position: absolute;
          top: 0;
          right: 0;
          border-bottom-right-radius: 100px;
          border-top-right-radius: 100px;
          background: #00cdca;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          span {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .staffQuery-tab {
    margin-top: 15px;
  }
}
.trainDetailTitle {
  margin-top: 14px;
  .line {
    width: 2px;
    height: 22px;
    background: rgba(0, 205, 202, 1);
    float: left;
    margin-top: 5px;
    margin-right: 5px;
  }
  .title {
    width: 145px;
    height: 29px;
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 30px;
  }
}
</style>