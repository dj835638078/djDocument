<template>
  <div class="trainDetail" :style="{ height: pageHeight + 'px' }">
    <div class="trainDetailTitle">
      <div class="line"></div>
      <div class="title">培训课件</div>
    </div>
    <div class="trainDetailBox">
      <iframe
        :src="iframeUrl"
        frameborder="0"
        class="iframeBox"
        :style="{ height: pageHeight - 60 + 'px' }"
      ></iframe>
      <div class="trainDetailInfo">
        <div class="head">{{ infoList.trainName }}</div>
        <div class="content">
          {{ infoList.trainContent }}
        </div>
        <div class="foot">
          <div class="person">
            <img src="../../../static/user.svg" />
            <p class="personDes" :title="infoList.trainingTeacher">
              {{ infoList.trainingTeacher }}
            </p>
          </div>
          <div class="data">
            {{ tools.setFormTime(infoList.releaseDate, 0) }}
          </div>
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
      iframeUrl: "",
      infoList: {}
    };
  },
  computed: { ...mapState(["pageHeight", "pageHeight"]) },
  mounted() {
    this.getInfo(this.$route.params.trainId);
    this.iframeUrl =
      "/static/pdf/web/viewer.html?file=" +
      encodeURIComponent(
        location.origin +
          "/complex/publicservice/fileCommon/pdfFile/download?trainFileId=" +
          this.$route.params.trainFileId +
          "&trainId=" +
          this.$route.params.trainId +
          "&" +
          new Date().getTime()
      );
  },
  methods: {
    getInfo(trainId) {
      let vm = this;
      vm.api
        .get(`./complex/service/train/findByTrainId?trainId=${trainId}`)
        .then(response => {
          if (response.status == 200) {
            vm.infoList = response.data;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.trainDetail {
  .trainDetailTitle {
    margin-top: 18px;
    margin-bottom: 18px;
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
      font-size: 22px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 30px;
    }
  }
  .iframeBox {
    width: 880px;
  }
  .trainDetailInfo {
    width: 280px;
    min-height: 216px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.08);
    border-radius: 2px;
    float: right;
    padding: 15px;
    box-sizing: border-box;
    .head {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 900;
      color: rgba(42, 42, 42, 1);
      line-height: 22px;
      margin-bottom: 15px;
      margin-top: 5px;
    }
    .content {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(155, 155, 155, 1);
      line-height: 21px;
      min-height: 110px;
      max-height: 250px;
      overflow: hidden;
    }
    .foot {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      .person {
        color: rgba(42, 42, 42, 1);
        font-weight: 900;
        width: 160px;
        img {
          position: relative;
          top: -3px;
        }
        .personDes {
          width: 135px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .data {
        color: rgba(155, 155, 155, 1);
      }
    }
  }
}
</style>