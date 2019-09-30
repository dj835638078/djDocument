<template>
  <div
    class="detail"
    v-if="detailInfo.bulletinId"
    :style="{ minHeight: detailHeight + 'px' }"
  >
    <div class="detailContent">
      <div class="detailTitle">
        <div class="title">
          {{ detailInfo.bulletinTitle }}
        </div>
        <div class="hasCollect" @click="collection(detailInfo)">
          <img src="/static/star1.svg" v-if="detailInfo.isCollect == 'N'" />
          <img src="/static/star2.svg" v-if="detailInfo.isCollect == 'Y'" />
          <span>收藏</span>
        </div>
      </div>
      <div class="detailDes">
        <img src="../../../static/user.svg" />
        <span class="author">{{ detailInfo.bulletinAuthor }}</span>
        <div class="line"></div>
        <span class="date">{{
          tools.setFormTime(detailInfo.releaseDate, 0)
        }}</span>
        <div v-text="detailInfo.bulletinDesc" class="bulletinDesc"></div>
      </div>
      <div class="detailInfo" v-html="detailInfo.bulletinContent"></div>
      <div
        class="main hasRead"
        @click="hasRead(detailInfo)"
        v-if="detailInfo.isRead == 'N'"
      >
        已读
      </div>
      <div class="release hasRead" v-else>已读</div>
    </div>
    <div class="hotNotice">
      <div class="title">
        <img src="../../../static/hot.svg" />
        <span>热门公告</span>
      </div>
      <div
        class="noticeItem"
        v-for="(item, index) in hotDetail"
        :key="item.bulletinId"
        :class="index != hotDetail.length - 1 ? 'specialClass' : ''"
      >
        <div
          class="listLeftTag"
          :style="{ background: item.color }"
          v-text="tools.setNoticeName(item.bulletinType)"
        ></div>
        <img
          :src="tools.downImg(item.fId)"
          @click="toDetail(item.bulletinId)"
        />
        <div class="noticeTitle" @click="toDetail(item.bulletinId)">
          {{ item.bulletinTitle }}
        </div>
        <div class="noticeContent">
          {{ item.bulletinDesc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      detailInfo: {},
      hotDetail: []
    };
  },
  components: {},
  computed: { ...mapState(["detailHeight"]) },
  mounted() {
    this.getDetail();
    this.getHotNotice();
  },
  watch: {
    $route(to, from) {
      //监听路由是否变化
      if (this.$route.params.bulletinIdIsNew || this.$route.params.bulletinId) {
        this.getDetail();
        this.getHotNotice();
      }
    }
  },
  methods: {
    //获取详情
    getDetail() {
      let vm = this;
      let bulletinId =
        vm.$route.params.bulletinId || vm.$route.params.bulletinIdIsNew;
      vm.api
        .get(
          "./complex/service/complexBulletin/findDetails?bulletinId=" +
            bulletinId
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.detailInfo = response.data;
            window.scrollTo(0, 0);
          }
        })
        .catch(function(error) {});
    },
    //获取热门公告
    getHotNotice() {
      let vm = this;
      vm.api
        .post("./complex/service/complexBulletin/findHot", {})
        .then(function(response) {
          if (response.status == 200) {
            vm.hotDetail = response.data;
          }
        })
        .catch(function(error) {});
    },
    // 已读按钮
    hasRead(item) {
      let vm = this;
      let data = {
        bulletinId: item.bulletinId
      };
      if (vm.$route.name == "detailIsNew") {
        data = {
          bulletinId: item.bulletinId,
          isNew: "Y"
        };
      }
      vm.api
        .post(`./complex/service/complexBulletin/read`, data)
        .then(response => {
          if (response.status == 200) {
            if (vm.$route.name == "detailIsNew") {
              if (response.data.data && response.data.data.bulletinId) {
                // let data = { bulletinIdIsNew: response.data.data.bulletinId };
                // vm.$router.push({
                //   name: "detailIsNew",
                //   params: data
                // });
                vm.$router.push({
                  name: "noticeNew"
                });
              } else {
                vm.$router.push({
                  name: "home"
                });
              }
            } else {
              item.isRead = item.isRead == "N" ? "Y" : "N";
            }
          }
        })
        .catch(error => {});
    },
    //收藏
    collection(item) {
      let type = item.isCollect == "N" ? "Y" : "N";
      let data = {
        bulletinId: item.bulletinId,
        isCollect: type
      };
      this.api
        .post(`./complex/service/complexBulletin/collect`, data)
        .then(response => {
          if (response.status == 200) {
            item.isCollect = item.isCollect == "N" ? "Y" : "N";
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
.detailContent /deep/ img {
  max-width: 866px;
}
.detail {
  box-sizing: border-box;
  padding: 10px 0 100px 20px;
  overflow: hidden;
  & > div {
    display: inline-block;
  }
  .detailContent {
    width: 866px;
    display: inline-block;
    float: left;
    padding-top: 10px;

    .detailTitle {
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(42, 42, 42, 1);
      line-height: 33px;
      margin-bottom: 20px;
      position: relative;
      .title {
        padding-right: 70px;
      }
      .hasCollect {
        width: 62px;
        height: 24px;
        position: absolute;
        background: rgba(245, 247, 250, 1);
        border-radius: 2px;
        line-height: 24px;
        font-size: 14px;
        right: 12px;
        top: 8px;
        cursor: pointer;
        &:hover {
          background: #00cdca;
          span {
            color: #fff;
          }
        }
        img {
          width: 16px;
          height: 16px;
          margin-top: -3px;
          margin-left: 5px;
        }
        span {
          color: #2a2a2a;
        }
      }
    }
    .detailDes {
      img {
        margin-bottom: 2px;
      }
      .author {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(42, 42, 42, 1);
        line-height: 20px;
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 12px;
        background: rgba(155, 155, 155, 1);
        margin: 0 20px;
      }
      .date {
        color: rgba(155, 155, 155, 1);
      }
      .bulletinDesc {
        color: #9b9b9b;
        margin: 15px 0;
        line-height: 28px;
      }
    }
    .detailInfo {
      margin-top: 15px;
      margin-bottom: 30px;
      line-height: 28px;
    }
    .hasRead {
      margin-left: calc(50% - 36px);
    }
    .hasCollect {
      position: absolute;
    }
  }
  .hotNotice {
    width: 256px;
    display: inline-block;
    margin-left: 58px;
    // margin-left: 920px;
    box-sizing: border-box;
    .title {
      border-bottom: 2px solid #f1f1f1;
      padding-bottom: 10px;
      margin-top: 10px;
      margin-bottom: 30px;
      img {
        margin-bottom: 5px;
      }
      span {
        height: 24px;
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
        line-height: 22px;
      }
    }
    .specialClass {
      border-bottom: 2px solid #f1f1f1;
      padding-bottom: 20px;
    }
    .noticeItem {
      width: 100%;
      position: relative;
      margin-bottom: 20px;
      .listLeftTag {
        position: absolute;
        left: 5px;
        top: 5px;
        padding: 0px 5px;
        height: 20px;
        color: #fff;
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 1);
        line-height: 20px;
        text-align: center;
      }
      img {
        width: 100%;
        height: 180px;
        cursor: pointer;
      }
      .noticeTitle {
        height: 22px;
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(42, 42, 42, 1);
        line-height: 22px;
        font-weight: 600;
        margin-top: 15px;
        margin-bottom: 10px;
        padding-right: 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .noticeContent {
        height: 39px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 21px;
        padding-right: 10px;

        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>