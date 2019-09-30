<template>
  <div class="noticeNew">
    <div class="noticeNew-box">
      <div class="noticeNew-box-top">
        <div class="noticeNew-box-top-name">
          最新公告
        </div>
      </div>
      <BulletinList :list="list" :noticeNew="noticeNew" />
    </div>
    <div style="margin-top:20px;height:32px;"></div>
  </div>
</template>
<script>
import BulletinList from "../BulletinList";
export default {
  data() {
    return {
      list: [],
      noticeNew: "noticeNew"
    };
  },
  components: {
    BulletinList
  },
  computed: {},
  mounted() {
    this.getNoticeType();
  },
  methods: {
    //获取数据
    getNoticeType() {
      this.api
        .post(`./complex/service/complexBulletin/findLatest`)
        .then(response => {
          if (response.status == 200) {
            this.list = response.data;
            window.scrollTo(0, 0);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.noticeNew {
  width: 100%;
  margin-bottom: 100px;
  .noticeNew-box {
    width: 900px;
    margin: auto;
    .noticeNew-box-top {
      border-bottom: 1px solid #f1f1f1;
      width: 100%;
      .noticeNew-box-top-name {
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
  }
}
</style>