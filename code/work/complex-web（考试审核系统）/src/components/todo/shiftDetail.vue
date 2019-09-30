<template>
  <div class="leaveDetail">
    <div class="leaveDetailTitle">
      <div class="line"></div>
      <div class="title">换班申请</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="leaveDetail-content">
      <shiftPeople
        :dataList="dataList"
        :applyImgFileIdStr="applyImgFileIdStr"
      />
      <receiver :dataList="dataList" v-if="dataList.receiveAccount" />
      <shiftProcess :dataList="dataList" />
      <shiftApproval :dataList="dataList" v-if="$route.name == 'shiftDetail'" />
    </div>
  </div>
</template>

<script>
import shiftApproval from "./shiftFile/shiftApproval";
import receiver from "./shiftFile/receiver";
import shiftPeople from "./shiftFile/shiftPeople";
import shiftProcess from "./shiftFile/shiftProcess";
import { mapState } from "vuex";
export default {
  data() {
    return {
      applyImgFileIdStr: [],
      dataList: {}
    };
  },
  props: [],
  components: { shiftApproval, shiftPeople, shiftProcess, receiver },
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
      } else if (this.$route.name == "shiftDetailInfo") {
        this.$router.push({
          name: "todoList",
          params: {
            type: 1
          }
        });
      } else if (this.$route.name == "shiftRelevant") {
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
      console.log(this.$route.name, "aaaaaaaaaaaaaaaaaa");
      let vm = this;
      let url;
      //无taskId时使用下面接口
      if (this.$route.name == "shiftRelevant") {
        url = `./complex/service/shiftex/applyinfo?shiftReviseId=${
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

            if (this.$route.name == "shiftRelevant") {
              this.dataList = response.data;
              if (response.data.applyImgFileIdStr) {
                this.applyImgFileIdStr = response.data.applyImgFileIdStr.split(
                  ","
                );
              }
            } else {
              this.dataList = response.data.applyData;
              if (response.data.applyData.applyImgFileIdStr) {
                this.applyImgFileIdStr = response.data.applyData.applyImgFileIdStr.split(
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