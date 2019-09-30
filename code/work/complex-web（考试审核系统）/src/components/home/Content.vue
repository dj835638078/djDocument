<template>
  <div class="home-content">
    <div class="home-content-nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          style="margin-right:40px;"
          :index="navObj.orderId + ''"
          v-for="(navObj, index) in bulletinList"
          :key="index"
          >{{ navObj.itemName }}</el-menu-item
        >
      </el-menu>
    </div>
    <BulletinList :list="list" :textName="textName" />
    <div class="loadMore" v-if="loadMoreShow">
      <div class="loadMore-text" @click="loadMoreBtn">
        <span>加载更多</span><img src="/static/loadMore.svg" />
      </div>
    </div>
  </div>
</template>

<script>
import BulletinList from "./BulletinList";
import { mapState } from "vuex";
export default {
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 3,
      totals: 0,
      activeIndex: "",
      list: [],
      bulletinType: "",
      loadMoreShow: false,
      textName: "最新公告"
    };
  },
  components: { BulletinList },
  computed: { ...mapState(["bulletinList"]) },
  mounted() {
    this.getList();
  },
  methods: {
    handleSelect(key) {
      this.bulletinType = key;
      this.currentPage = 1;
      this.pageSize = 3;
      this.getList();
    },
    //加载更多
    loadMoreBtn() {
      if (this.textName == "最新公告") {
        this.pageSize = this.pageSize + 10;
        this.getList();
      } else {
        this.$router.push({
          name: "noticeType",
          params: { type: this.bulletinType }
        });
      }
    },
    //获取数据
    getList() {
      let data = {
        homePage: "1",
        bulletinType: this.bulletinType
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
            if (this.bulletinType) {
              this.textName = this.bulletinList[this.bulletinType].itemName;
            } else {
              this.textName = "最新公告";
            }
            //判断是否为最新公告,总数量是否大于数组的长处
            if (this.list.length < this.totals) {
              this.loadMoreShow = true;
            } else {
              this.loadMoreShow = false;
            }
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.home-content /deep/ .el-menu-item:hover {
  color: #00cdca !important; //鼠标hover颜色
}
.home-content {
  width: 100%;
  margin-bottom: 100px;
  .home-content-nav {
    height: 48px;
    width: 100%;
  }
  .el-menu-item {
    color: rgba(42, 42, 42, 0.85);
    font-size: 16px;
    padding: 0px;
    font-weight: 600;
    font-family: PingFangSC-Semibold;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    line-height: 50px;
    border-color: #00cdca;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #00cdca;
  }
  .loadMore {
    width: 100%;
    height: 30px;
    margin-top: 33px;
    .loadMore-text {
      width: 100px;
      height: 30px;
      background: rgba(241, 241, 241, 1);
      border-radius: 2px;
      margin: auto;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      img {
        margin-top: -3px;
        margin-left: 5px;
      }
    }
  }
}
</style>