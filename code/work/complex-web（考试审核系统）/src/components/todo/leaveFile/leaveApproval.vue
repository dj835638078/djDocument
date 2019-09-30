<template>
  <div class="leaveDetail-relevant">
    <div class="relevant-title">
      <div class="relevant-title-sign"></div>
      <div class="relevant-title-name">
        审批信息
      </div>
    </div>
    <div class="leaveApproval">
      <div class="leaveApproval-top">
        <div style="float:left;margin-left:40px;">
          <span style="color:red;">*</span>是否同意：
        </div>
        <div style="float:left;margin-left:40px;">
          <el-radio v-model="conclusion" label="1">同意</el-radio>
          <el-radio v-model="conclusion" label="2" v-if="!tools.setRight('HR')"
            >不同意</el-radio
          >
        </div>
      </div>
      <div class="leaveApproval-bottom">
        <div style="float:left;margin-left:40px;">
          <span style="color:#fff;">*</span>理由：
        </div>
        <div style="float:left;margin-left:68px;width: 800px;">
          <el-input
            type="textarea"
            placeholder="最多支持输入200字"
            v-model="suggestion"
            maxlength="200"
            :rows="3"
            show-word-limit
          >
          </el-input>
        </div>
        <!-- <div class="blank leaveBtnN">
          取消
        </div> -->
        <div
          class="query leaveBtnY"
          @click="approvalBtn"
          v-if="tools.setRight('HR')"
        >
          已知晓
        </div>
        <div class="query leaveBtnY" @click="approvalBtn" v-else>提交</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      conclusion: "",
      suggestion: ""
    };
  },
  props: ["dataList"],
  components: {},
  computed: {},
  mounted() {
    console.log(this.tools.setRight("HR"), "aasdasdasd");
  },
  watch: {},
  methods: {
    approvalBtn() {
      let vm = this;
      if (this.conclusion) {
        let data = {
          taskId: vm.$route.params.taskId,
          conclusion: vm.conclusion,
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
      } else {
        this.$message({
          message: "请选择是否同意",
          type: "error"
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.leaveDate-table /deep/ .el-table__header th {
  background: #fff !important;
  color: #2a2a2a;
  font-weight: 600;
}
.leaveDetail-relevant {
  margin-top: 16px;
  padding-bottom: 23px !important;
}
.leaveApproval {
  .leaveApproval-top {
    border-top: 1px solid #d9d9d9;
    overflow: hidden;
    height: 56px;
    line-height: 56px;
  }
}
.leaveApproval-bottom {
  overflow: hidden;
  position: relative;

  .leaveBtnY {
    position: absolute;
    bottom: 0px;
    right: 80px;
  }
}
</style>