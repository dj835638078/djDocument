<template>
  <div class="noticeType">
    <div class="noticeType-box">
      <div class="noticeType-box-top">
        <div class="noticeType-box-top-name">
          {{ tools.setNoticeName(this.$route.params.type) }}&nbsp;
        </div>
        <div class="public-search" style="margin-top:15px;height:35px;">
          <div class="public-search-left">
            <el-input
              v-model="bulletinTitle"
              placeholder="请输入公告名称"
              maxlength="50"
              :clearable="true"
            ></el-input>
          </div>
          <div
            class="public-search-right"
            @click="searchList"
            style="height:32px;line-height:32px;width:75px;"
          >
            <span class="el-icon-search"></span>搜索
          </div>
        </div>
      </div>
      <BulletinList :list="list" v-if="list.length > 0" />
      <Remind v-else />
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="list.length > 0"
        style="text-align:right;"
        background
        layout="prev, pager, next"
        :total="totals"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import BulletinList from "../BulletinList";
import Remind from "../../public/Remind";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totals: 0,
      list: [],
      bulletinTitle: ""
    };
  },
  components: {
    BulletinList,
    Remind
  },
  computed: {},
  mounted() {
    this.getNoticeType();
  },
  methods: {
    searchList() {
      this.currentPage = 1;
      this.pageSize = 5;
      this.totals = 0;
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
        homePage: "1",
        bulletinTitle: this.bulletinTitle,
        bulletinType: this.$route.params.type
      };
      this.api
        .post(
          `./complex/service/complexBulletin/page?currentPage=${
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
.noticeType/deep/.el-input__inner {
  border-radius: 100px !important;
  border: 1px solid #00cdca !important;
  height: 32px !important;
}
.noticeType/deep/.el-input__suffix {
  margin-right: -35px !important;
}
.noticeType {
  width: 100%;
  margin-bottom: 100px;
  // min-height: 799px;
  .noticeType-box {
    width: 900px;
    margin: auto;
    .noticeType-box-top {
      overflow: hidden;
      width: 100%;
      .noticeType-box-top-name {
        float: left;
        margin-top: 18px;
        border-left: 2px solid #00cdca;
        padding-left: 10px;
        font-size: 18px;
        font-weight: 600;
        font-family: PingFangSC-Semibold;
        color: #2a2a2a;
        margin-bottom: 14px;
      }
    }
  }
}
</style>