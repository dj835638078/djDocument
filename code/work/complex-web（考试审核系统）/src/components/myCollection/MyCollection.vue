<template>
  <div class="myCollection">
    <div class="myCollection-box">
      <div class="myCollection-box-top">
        <div class="myCollection-box-top-name">
          我的收藏(<span style="color:#00CDCA">{{ totals }}</span
          >)
        </div>
      </div>
      <ul
        class="myCollectionList"
        :style="{ minHeight: homeContentHeight + 'px' }"
      >
        <li
          class="myCollectionList-li"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="myCollectionList-box">
            <div
              class="myCollectionList-box-left ellipsis"
              @click="toDetail(item.bulletinId)"
            >
              {{ item.bulletinTitle }}
            </div>
            <div class="myCollectionList-box-right" @click="collection(item)">
              取消收藏
            </div>
          </div>
          <div
            class="myCollectionList-time"
            v-text="tools.setFormTime(item.collectDate, 0)"
          ></div>
        </li>
      </ul>
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="totals > pageSize"
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      list: []
    };
  },
  components: {},
  computed: { ...mapState(["homeContentHeight"]) },
  mounted() {
    this.getMyCollection();
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getMyCollection();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getMyCollection();
    },
    //获取数据
    getMyCollection() {
      this.api
        .post(
          `./complex/service/complexBulletin/collectPage?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          {}
        )
        .then(response => {
          if (response.status == 200) {
            this.list = response.data.result;
            this.totals = response.data.page.totalRows;
            window.scrollTo(0, 0);
          }
        })
        .catch(error => {});
    },
    //收藏
    collection(item) {
      if (this.totals > 10 && this.currentPage > 1) {
        if (this.list.length == 1) {
        }
      }
      let data = {
        bulletinId: item.bulletinId,
        isCollect: "N"
      };
      this.api
        .post(`./complex/service/complexBulletin/collect`, data)
        .then(response => {
          if (response.status == 200) {
            if (this.totals > 10 && this.currentPage > 1) {
              if (this.list.length == 1) {
                this.currentPage = this.currentPage - 1;
              }
            }
            this.getMyCollection();
          }
        })
        .catch(error => {});
    },
    // 跳转详情
    toDetail(bulletinIdFlag) {
      let data = { bulletinId: bulletinIdFlag };
      this.$router.push({
        name: "detail",
        params: data
      });
    }
  }
};
</script>

<style scoped lang="less">
.myCollection {
  width: 100%;
  margin-bottom: 100px;
  .myCollection-box {
    width: 100%;
    margin: auto;
    .myCollection-box-top {
      border-bottom: 1px solid #f1f1f1;
      width: 100%;
      .myCollection-box-top-name {
        margin-top: 18px;
        border-left: 2px solid #00cdca;
        padding-left: 10px;
        font-size: 18px;
        font-weight: 600;
        font-family: PingFangSC-Semibold;
        color: #2a2a2a;
        margin-bottom: 18px;
      }
    }
    .myCollectionList {
      width: 100%;
      .myCollectionList-li {
        height: 40px;
        width: 100%;
        font-size: 14px;
        border-bottom: 1px solid #f1f1f1;
        padding: 15px 0;
        .myCollectionList-box {
          width: 100%;
          height: 25px;
          .myCollectionList-box-left {
            float: left;
            max-width: 1100px;
            cursor: pointer;
            &:hover {
              color: #00cdca;
            }
          }
          .myCollectionList-box-right {
            width: 73px;
            float: right;
            background: rgba(255, 85, 79, 0.1);
            text-align: center;
            color: #ff554f;
            padding: 8px 0;
            cursor: pointer;
          }
        }
        .myCollectionList-time {
          width: 100%;
          height: 25px;

          color: #9b9b9b;
        }
      }
    }
  }
}
</style>