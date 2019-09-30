<template>
  <div class="leaveDetail">
    <div class="leaveDetailTitle">
      <div class="line"></div>
      <div class="title">请假申请</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="leaveDetail-content">
      <leavePeople :dataList="dataList" :applyImgFileId="applyImgFileId" />
      <leaveDate :dataList="dataList" />
      <leaveProcess :dataList="dataList" />
      <leaveApproval :dataList="dataList" v-if="$route.name == 'leaveDetail'" />
    </div>
  </div>
</template>

<script>
import leaveApproval from "./leaveFile/leaveApproval";
import leavePeople from "./leaveFile/leavePeople";
import leaveDate from "./leaveFile/leaveDate";
import leaveProcess from "./leaveFile/leaveProcess";
import { mapState } from "vuex";
export default {
  data() {
    return {
      applyImgFileId: [],
      dataList: {}
    };
  },
  props: [],
  components: { leavePeople, leaveDate, leaveProcess, leaveApproval },
  computed: {},
  mounted() {
    this.getDetail();
  },
  watch: {},
  methods: {
    //返回上一层
    goBack() {
      if (this.$route.name == "doneDetailImg") {
        this.$router.push({
          name: "todoList",
          params: {
            type: 1
          }
        });
      } else if (this.$route.name == "leaveRelevant") {
        this.$router.push({
          name: "shifta",
          params: {
            type: 1
          }
        });
      } else {
        this.$router.go(-1);
      }
    },
    getDetail() {
      let vm = this;
      let url;
      if (this.$route.name == "leaveRelevant") {
        url = `./complex/service/leave/findItem?shiftReviseId=${
          vm.$route.params.shiftReviseId
        }`;
      } else {
        url = `./complex/service/task/taskinfo?taskId=${
          vm.$route.params.taskId
        }`;
      }
      vm.api
        .get(url)
        .then(response => {
          if (response.status == 200) {
            //console.log(response.data);
            if (this.$route.name == "leaveRelevant") {
              this.dataList = response.data;
              if (response.data.applyImgFileId) {
                this.applyImgFileId = response.data.applyImgFileId.split(",");
              }
            } else {
              this.dataList = response.data.applyData;
              if (response.data.applyData.applyImgFileId) {
                this.applyImgFileId = response.data.applyData.applyImgFileId.split(
                  ","
                );
              }
            }
          }
        })
        .catch(error => {});
    }
    //申诉确认
    // goNewList() {
    //   let vm = this;
    //   if (!vm.conclusion || !vm.suggestion) {
    //     vm.$message({
    //       message: "请填写结论和原因",
    //       type: "warning"
    //     });
    //     return;
    //   }
    //   let data = {
    //     taskId: vm.$route.params.taskId,
    //     conclusion: vm.conclusion,
    //     suggestion: vm.suggestion
    //   };
    //   vm.api
    //     .post(`./complex/service/task/approve`, data)
    //     .then(response => {
    //       if (response.status == 200) {
    //         vm.$router.go(-1);
    //       }
    //     })
    //     .catch(error => {});
    // }
  }
};
</script>

<style scoped lang="less">
.leaveDetail {
  margin-bottom: 83px;
  .leaveDetailTitle {
    overflow: hidden;
    margin-top: 18px;
    .line {
      width: 2px;
      height: 22px;
      background: rgba(0, 205, 202, 1);
      float: left;
      //margin-top: 5px;
      margin-right: 5px;
    }
    .title {
      width: 145px;
      //height: 29px;
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      //line-height: 30px;
      float: left;
    }
  }
  .leaveDetail-content {
    overflow: hidden;
    margin-top: 15px;
  }
}
</style>