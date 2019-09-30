<template>
  <ul class="trainList" v-if="list && list.length > 0">
    <li
      class="trainList-box"
      v-for="(item, index) in list"
      :key="index"
      style="margin-left:1px;"
      :style="{
        marginRight: (index + 1) % 4 == 0 ? '0' : '57px',
        marginTop: index < 4 ? '8px' : '32px'
      }"
    >
      <div class="trainList-box-top" @click="imgClick(item)">
        <img :src="downImg(item.coverImgFid)" />
        <div
          class="list-left-tag"
          style="background:rgb(224, 98, 174)"
          v-text="tools.setErrorType(item.errorType)"
        ></div>
      </div>
      <div class="list-right-box-title-hot" v-if="item.isTop == '1'">
        顶
      </div>
      <div
        class="trainList-box-name ellipsis"
        :title="item.caseTitile"
        @click="imgClick(item)"
      >
        {{ item.caseTitile }}
      </div>
      <div class="trainList-box-content ellipsis">
        {{ item.caseDesc }}
        <!-- <div class="box-text-hidden" v-if="tools.intercept(item.ruleDesc, 256)">
          &nbsp;...
        </div> -->
      </div>
      <div class="trainList-box-detailed">
        <div class="trainList-tip-user">
          <div>
            <img src="/static/user.svg" />
          </div>
          <div class="ellipsis trainList-tip-user-name">
            {{ item.caseAuthor }}
          </div>
        </div>
        <div
          class="trainList-time"
          v-text="tools.setFormTime(item.releaseDate, 0)"
        ></div>
      </div>
    </li>
  </ul>
  <div v-else class="nodata">暂无数据</div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["list"],
  components: {},
  computed: {},
  mounted() {},
  methods: {
    // 下载图片
    downImg(fId) {
      if (fId) {
        return (
          location.origin + `/complex/publicservice/file/download?fId=${fId}`
        );
      }
    },
    imgClick(item) {
      this.$router.push({
        name: "caseBankDetail",
        params: { caseId: item.caseId }
      });
    }
  }
};
</script>

<style scoped lang="less">
.nodata {
  text-align: center;
  margin-top: 160px;
  font-size: 18px;
  color: #ccc;
}
.trainList {
  width: 100%;
  overflow: hidden;
  padding-bottom: 10px;
  // display: flex;
  // flex-flow: wrap;
  // justify-content: space-between;
  .trainList-box {
    float: left;
    margin-right: 20px;
    width: 254px;
    margin-top: 32px;
    border: 1px solid #e6e9ef;
    &:hover {
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.6);
    }
    .trainList-box-top {
      width: 254px;
      height: 140px;
      overflow: hidden;
      cursor: pointer;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        transition: all 0.6s;
        &:hover {
          transform: scale(1.2);
        }
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
    .list-right-box-title-hot {
      margin-left: 13px;
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
      position: relative;
      top: 13px;
    }
    .trainList-box-name {
      padding: 0 13px;
      margin-top: 13px;
      cursor: pointer;
      width: calc(100% -28px);
      height: 22px;
      color: #2a2a2a;
      font-size: 16px;
      line-height: 22px;
    }
    .trainList-box-content {
      padding: 0 13px;
      margin-top: 10px;
      height: 18px;
      font-size: 14px;
      color: #9b9b9b;
      overflow: hidden;
      line-height: 18px;
      position: relative;
      // word-break: break-all;
    }
    .trainList-box-detailed {
      height: 20px;
      line-height: 20px;
      margin-top: 10px;
      padding: 0 13px 10px 13px;
      .trainList-tip-user {
        min-width: 90px;
        float: left;
        img {
          margin-top: -3px;
          margin-right: 5px;
        }
        div {
          float: left;
        }
        .trainList-tip-user-name {
          margin-right: 5px;
          max-width: 130px;
          height: 20px;
          line-height: 20px;
        }
      }
      .trainList-time {
        float: right;
        color: #9b9b9b;
        font-size: 14px;
      }
    }
  }
}
</style>