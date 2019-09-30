<template>
  <div class="informationAdd">
    <div class="informationAddTitle">
      <div class="line"></div>
      <div class="title">报备功能</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <reportDetail :detailObj="detailObj" />
    <div class="groupTitle">审批信息</div>
    <reportTable :tableData="detailObj.approveInfos" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import reportDetail from "../common/reportDetail";
import reportTable from "./reportTable";
export default {
  data() {
    return {
      detailObj: {}
    };
  },
  components: { reportDetail, reportTable },
  computed: {
    ...mapState([])
  },
  mounted() {
    this.getDetail();
  },
  watch: {},
  methods: {
    //返回上一层
    goBack() {
      this.$router.go(-1);
    },
    // 获取详情
    getDetail() {
      let vm = this;
      vm.api
        .get(
          `./complex/service/filing/findItem?filingId=${vm.$route.params.filingId}`
        )
        .then(response => {
          if (response.status == 200) {
            vm.detailObj = response.data;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.informationAdd {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 0 120px 0px;
  .informationAddTitle {
    overflow: hidden;
    margin-top: 18px;
    .line {
      width: 2px;
      height: 18px;
      background: rgba(0, 205, 202, 1);
      float: left;
      margin-right: 5px;
    }
    .title {
      width: 145px;
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      float: left;
    }
  }
  .groupTitle {
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(42, 42, 42, 1);
    line-height: 22px;
    margin: 30px 0;
  }
}
</style>