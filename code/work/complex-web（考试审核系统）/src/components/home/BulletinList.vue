<template>
  <ul class="home-content-box" :style="{ minHeight: homeContentHeight + 'px' }">
    <div v-if="list.length > 0">
      <li class="home-content-list" v-for="(item, index) in list" :key="index">
        <div class="list-left-img" @click="toDetail(item.bulletinId)">
          <img :src="downImg(item.fId)" />
          <div
            class="list-left-tag"
            :style="{ background: item.color }"
            v-text="tools.setNoticeName(item.bulletinType)"
          ></div>
        </div>
        <div class="list-right-box">
          <div class="list-right-box-title">
            <div class="list-right-box-title-hot" v-if="item.isNew == 'Y'">
              新
            </div>
            <div
              class="list-right-box-title-name ellipsis"
              @click="toDetail(item.bulletinId)"
            >
              {{ item.bulletinTitle }}
            </div>
            <div class="list-right-box-title-star" @click="collection(item)">
              <img src="/static/star1.svg" v-if="item.isCollect == 'N'" />
              <img src="/static/star2.svg" v-if="item.isCollect == 'Y'" />
              <span>收藏</span>
            </div>
          </div>
          <div class="list-right-box-text ellipsis">
            {{ item.bulletinDesc }}
            <!-- <div
              class="box-text-hidden"
              v-if="tools.intercept(item.bulletinDesc, 678)"
            >
              &nbsp;...
            </div> -->
          </div>
          <div class="list-right-box-tip">
            <div class="tip-user">
              <div>
                <img src="/static/user.svg" />
              </div>
              <div class="ellipsis tip-user-name">
                {{ item.bulletinAuthor }}
              </div>
            </div>
            <div
              class="tip-time"
              v-text="tools.setFormTime(item.releaseDate, 0)"
            ></div>
            <div class="tip-look-ok" v-if="item.isRead == 'Y'">
              已读
            </div>
            <div class="tip-look-no" v-if="item.isRead == 'N'">
              未读
            </div>
          </div>
        </div>
      </li>
    </div>
    <div v-if="list.length < 1 && $route.name == 'home'">
      <div>
        <img
          src="/static/noData.svg"
          style="margin-top: 150px;margin-left: -123px;"
        />
        <div
          style="text-align:center;margin-top:20px;color:#9B9B9B;font-size:16px;"
        >
          暂无{{ textName }}
        </div>
      </div>
      <!-- <img
        src="/static/noData.svg"
        style="margin-top: 150px;margin-left: -100px;"
      /> -->
    </div>
  </ul>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["list", "textName", "noticeNew"],
  components: {},
  computed: { ...mapState(["homeContentHeight"]) },
  mounted() {},
  methods: {
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
    // 下载图片
    downImg(fId) {
      if (fId) {
        return (
          location.origin + `/complex/publicservice/file/download?fId=${fId}`
        );
      }
    },
    // 跳转详情
    toDetail(bulletinIdFlag) {
      if (this.noticeNew == "noticeNew") {
        let data = { bulletinIdIsNew: bulletinIdFlag };
        this.$router.push({
          name: "detailIsNew",
          params: data
        });
      } else {
        let data = { bulletinId: bulletinIdFlag };
        this.$router.push({
          name: "detail",
          params: data
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.home-content-box {
  width: 100%;

  // min-height: 450px;
  .home-content-list {
    height: 132px;
    width: 100%;
    padding: 24px 0;
    border-bottom: 1px solid #f1f1f1;
    //margin-bottom: -33px;
    .list-left-img {
      width: 192px;
      height: 132px;
      float: left;
      position: relative;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
      .list-left-tag {
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
    }
    .list-right-box {
      float: left;
      width: 678px;
      margin-left: 30px;
      .list-right-box-title {
        width: 100%;
        height: 45px;
        .list-right-box-title-hot {
          width: 18px;
          height: 18px;
          background: rgba(255, 85, 79, 1);
          color: #fff;
          text-align: center;

          line-height: 18px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 2px;
          float: left;
        }
        .list-right-box-title-name {
          width: 580px;
          color: #2a2a2a;
          float: left;
          font-size: 18px;
          font-family: PingFangSC-Medium;
          cursor: pointer;
          &:hover {
            color: #00cdca;
          }
        }
        .list-right-box-title-star {
          width: 62px;
          height: 24px;
          background: rgba(245, 247, 250, 1);
          border-radius: 2px;
          line-height: 24px;
          float: right;
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
      .list-right-box-text {
        position: relative;
        width: 100%;
        height: 43px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(155, 155, 155, 1);
        line-height: 21px;
        overflow: hidden;
        word-break: break-all;

        //overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // /* autoprefixer: off */
        // -webkit-box-orient: vertical;
        // /* autoprefixer: on */
        // -webkit-line-clamp: 2;
      }
      .list-right-box-tip {
        width: 100%;
        height: 20px;
        margin-top: 24px;
        background: #fff;
        line-height: 20px;
        .tip-user {
          min-width: 90px;
          border-right: 1px solid rgba(155, 155, 155, 1);
          margin-right: 20px;
          float: left;
          img {
            margin-top: -3px;
            margin-right: 5px;
          }
          div {
            float: left;
          }
          .tip-user-name {
            margin-right: 5px;
            max-width: 160px;
            height: 20px;
            line-height: 20px;
          }
        }
        .tip-time {
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(155, 155, 155, 1);
          float: left;
        }
        .tip-look-ok,
        .tip-look-no {
          width: 40px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          float: right;
        }
        .tip-look-ok {
          border: 1px solid #00cdca;
          color: #00cdca;
        }
        .tip-look-no {
          border: 1px solid #ff554f;
          color: #ff554f;
        }
      }
    }
  }
}
</style>