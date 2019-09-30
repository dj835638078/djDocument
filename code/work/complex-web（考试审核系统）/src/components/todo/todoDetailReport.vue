<template>
  <div class="informationAdd">
    <div class="informationAddTitle">
      <div class="line"></div>
      <div class="title">报备</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <reportDetail :detailObj="detailObj" />
    <div v-if="$route.name == 'todoDetailReport'" class="todoDetailReport">
      <div class="groupTitle groupTitleSingle">审批信息</div>
      <div class="itemGroup">
        <span class="title"><span style="color:red">*</span>指导意见：</span>
        <!-- <div class="content">{{ detailObj.contentTitle }}</div> -->
        <el-input
          type="textarea"
          placeholder="请输入指导意见，最多支持输入200字"
          v-model="suggestion"
          class="content"
          maxlength="200"
        >
        </el-input>
        <div class="errorInfo" v-if="suggestionFlag">请填写指导意见</div>
        <div class="btnList">
          <div class="blank" @click="goBack()">取消</div>
          <div class="submitBtn main" @click="submitBtn()">
            提交
          </div>
        </div>
      </div>
      <div class="footer" v-if="$route.name == 'todoDetailReport'">
        版权所有@软通动力信息技术(集团)有限公司
      </div>
    </div>
    <div v-if="$route.name == 'doneDetailReport'">
      <div class="groupTitle">审批信息</div>
      <div class="itemGroup">
        <span class="title">指导意见：</span>
        <div class="content">{{ detailObj.processProposal }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import reportDetail from "../common/reportDetail";
export default {
  data() {
    return {
      detailObj: {},
      suggestion: "",
      suggestionFlag: false
    };
  },
  components: { reportDetail },
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
      if (this.$route.name == "doneDetailReport") {
        this.$router.push({
          name: "todoList",
          params: {
            type: 1
          }
        });
      } else {
        this.$router.go(-1);
      }
    },
    // 获取详情
    getDetail() {
      let vm = this;
      vm.api
        .get(
          `./complex/service/task/taskinfo?taskId=${vm.$route.params.taskId}`
        )
        .then(response => {
          if (response.status == 200) {
            vm.detailObj = response.data.applyData;
          }
        })
        .catch(error => {});
    },
    // 提交审批信息
    submitBtn() {
      let vm = this;
      if (!vm.suggestion) {
        vm.suggestionFlag = true;
        return;
      } else {
        vm.suggestionFlag = false;
      }
      let data = {
        taskId: vm.$route.params.taskId,
        conclusion: "1",
        suggestion: vm.suggestion
      };
      vm.api
        .post(`./complex/service/task/approve`, data)
        .then(response => {
          if (response.status == 200) {
            vm.$router.go(-1);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.todoDetailReport /deep/ textarea {
  width: 920px !important;
  height: 68px !important;
}
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
  .itemGroup {
    position: relative;
    margin-bottom: 25px;
    display: flex;
    .errorInfo {
      color: red;
      position: absolute;
      left: 120px;
      top: 75px;
    }
    .title {
      flex: 0 0 120px;
    }
    .content {
      flex: 1;
      word-break: break-all;
      line-height: 20px;
    }
  }
  .todoDetailReport {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding-bottom: 63px;
    height: 126px;
    background: #f0f2f5;
    .groupTitleSingle {
      margin-left: calc((100% - 1200px) / 2);
    }
    .groupTitle {
      margin-top: 15px;
      margin-bottom: 0px;
    }
    .itemGroup {
      margin-left: calc((100% - 1200px) / 2);
      margin-right: calc((100% - 1200px) / 2);
      .title {
        margin-top: 25px;
        flex: 0 0 90px;
      }
    }
    .btnList {
      position: absolute;
      right: 0;
      top: 18px;
      .submitBtn {
        margin-left: 20px;
      }
    }
    .footer {
      background: #343434;
      height: 63px;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      line-height: 63px;
      text-align: center;
      color: #9b9b9b;
      font-size: 12px;
    }
  }
}
</style>