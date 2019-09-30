<template>
  <div class="dialogTip">
    <el-dialog
      title="申诉"
      :visible.sync="$parent.tipShow"
      width="600px"
      center
      ref="dialogFlag"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
      @close="handleClose"
    >
      <div class="tipMessage">
        <div class="itemBox">
          <div class="itemTitle">
            <h3>基本信息</h3>
            <i
              class="el-icon-arrow-down"
              v-if="basicFlag"
              @click="basicArrowCli"
            ></i>
            <i class="el-icon-arrow-up" @click="basicArrowCli" v-else></i>
          </div>
          <div class="itemContent" v-if="basicFlag">
            <div class="itemSingle">
              <span>标题：</span>
              <el-input
                v-model="$parent.dealInfo.contentTitle"
                disabled
              ></el-input>
            </div>
            <div class="itemSingle">
              <span>审核结果：</span>
              <el-input v-model="$parent.processResult" disabled></el-input>
            </div>
            <div class="itemSingle">
              <span>rowkey：</span>
              <el-input v-model="$parent.dealInfo.rowkey" disabled></el-input>
            </div>

            <div class="itemSingle">
              <span>错误类型：</span>
              <el-input
                v-model="errorType"
                disabled
                :title="errorType"
                class="appealReason"
              ></el-input>
            </div>
          </div>
        </div>
        <div class="itemBox">
          <div class="itemTitle">
            <h3>申诉信息</h3>
            <i
              class="el-icon-arrow-down"
              v-if="detailFlag"
              @click="detailArrowCli"
            ></i>
            <i class="el-icon-arrow-up" @click="detailArrowCli" v-else></i>
          </div>
          <div class="itemContent" v-if="detailFlag">
            <div class="itemSingle">
              <span>申诉理由：</span>
              <el-input
                v-model="$parent.dealInfo.appealReason"
                disabled
                :title="$parent.dealInfo.appealReason"
                class="appealReason"
              ></el-input>
            </div>
            <div class="itemSingle">
              <span>截图：</span>
              <div class="imgBox">
                <img
                  v-if="$parent.dealInfo.fId"
                  :src="tools.downImg($parent.dealInfo.fId)"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="itemBox">
          <div class="itemTitle">
            <h3>审批信息</h3>
            <i
              class="el-icon-arrow-down"
              v-if="dealFlag"
              @click="dealArrowCli"
            ></i>
            <i class="el-icon-arrow-up" @click="dealArrowCli" v-else></i>
          </div>
          <div class="itemContent" v-if="dealFlag">
            <div class="itemSingle">
              <span><span class="redColor">*</span>结论：</span>
              <div class="imgBox">
                <el-radio-group
                  v-model="conclusion"
                  v-if="tipMessage == '申诉'"
                >
                  <el-radio :label="1">同意</el-radio>
                  <el-radio :label="2">不同意</el-radio>
                </el-radio-group>
                <el-radio-group
                  v-model="$parent.conclusion"
                  v-if="tipMessage == '详情'"
                  disabled
                >
                  <el-radio :label="1">同意</el-radio>
                  <el-radio :label="2">不同意</el-radio>
                </el-radio-group>
              </div>
            </div>
            <div class="itemSingle">
              <span><span class="redColor">*</span>原因：</span>
              <el-input
                v-model="suggestion"
                type="textarea"
                v-if="tipMessage == '申诉'"
                maxlength="200"
              ></el-input>
              <el-input
                v-model="$parent.suggestion"
                disabled
                type="textarea"
                v-if="tipMessage == '详情'"
              ></el-input>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" v-if="tipMessage == '申诉'">
        <div class="dialogTipFooter footerLeft" @click="handleClose">
          取消
        </div>
        <div class="dialogTipFooter" @click="goNewList">
          提交
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      basicFlag: true,
      detailFlag: false,
      dealFlag: true,
      conclusion: "",
      suggestion: "",
      errorType: ""
    };
  },
  props: {
    tipMessage: {
      default: "default"
    }
  },
  components: {},
  computed: {},
  watch: {
    "$parent.tipShow"() {
      this.basicFlag = true;
      this.detailFlag = false;
      this.dealFlag = true;
      this.errorType = this.tools.setErrorType(this.$parent.dealInfo.errorType);
    }
  },
  mounted() {
    this.basicFlag = true;
    this.detailFlag = false;
    this.dealFlag = true;
    this.errorType = this.tools.setErrorType(this.$parent.dealInfo.errorType);
  },
  methods: {
    handleClose() {
      this.conclusion = "";
      this.suggestion = "";
      this.$parent.tipShow = false;
    },
    goNewList() {
      let vm = this;
      if (!vm.conclusion || !vm.suggestion) {
        vm.$message({
          message: "请填写结论和原因",
          type: "warning"
        });
        return;
      }
      let data = {
        taskId: vm.$parent.taskId,
        conclusion: vm.conclusion,
        suggestion: vm.suggestion
      };
      vm.api
        .post(`./complex/service/task/approve`, data)
        .then(response => {
          if (response.status == 200) {
            vm.$parent.tipShow = false;
            vm.$parent.$parent.getPaperList();
          }
        })
        .catch(error => {});
    },
    basicArrowCli() {
      this.basicFlag = !this.basicFlag;
    },
    detailArrowCli() {
      this.detailFlag = !this.detailFlag;
    },
    dealArrowCli() {
      this.dealFlag = !this.dealFlag;
    }
  }
};
</script>

<style scoped lang="less">
.dialogTip /deep/ .el-input.is-disabled .el-input__inner {
  color: #606266;
}
.dialogTip /deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
  height: 205px;
}
.dialogTip /deep/ .el-radio__input.is-disabled + span.el-radio__label {
  color: #606266;
}
.dialogTip /deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
.dialogTip /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
  padding-bottom: 10px;
  max-height: 400px;
  overflow-y: auto;
}
.dialogTip /deep/ .el-dialog__title {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 600;
}
.dialogTip /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.dialogTipFooter {
  width: 80px;
  height: 30px;
  background: rgba(0, 205, 202, 1);
  border-radius: 2px;
  color: #fff;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}
.footerLeft {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(220, 223, 230, 1);
  color: rgba(74, 74, 74, 1);
  margin-right: 10px;
}
.tipMessage /deep/ p {
  margin-top: 10px;
}
.tipMessage /deep/ .numTotal {
  font-size: 18px;
  color: red;
}
.tipMessage /deep/ .numRest {
  font-size: 18px;
  color: yellow;
}
.tipMessage /deep/.el-textarea__inner {
  height: 100px;
}
.appealReason /deep/ input {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tipMessage {
  .itemBox {
    .itemTitle {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      h3 {
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
        line-height: 25px;
      }
      i {
        margin-top: 5px;
        cursor: pointer;
        color: rgb(0, 205, 202);
        font-weight: 600;
      }
    }
    .itemContent {
      border-top: 1px solid #e8e6e6;
      padding-top: 20px;
      .itemSingle {
        display: flex;
        text-align: left;
        margin-bottom: 8px;
        .redColor {
          color: red;
        }
        span {
          flex: 0 0 90px;
          line-height: 32px;
        }
        .el-input {
          flex: 1;
          margin-top: 0;
        }
        .imgBox {
          flex: 1;
          margin-top: 10px;
          img {
            display: inline-block;
            width: 100px;
            height: 100px;
          }
        }
      }
    }
  }
}
</style>