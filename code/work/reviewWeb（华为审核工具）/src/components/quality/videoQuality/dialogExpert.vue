<template>
  <div class="dialogExpert">
    <el-dialog
      title="申诉"
      :visible.sync="$parent.ConfirmExpertFlag"
      :modal-append-to-body="false"
      width="450px"
      top="20vh"
      class="headTitle"
      :before-close="handleClose"
    >
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <span class="lableName">*</span>
          <el-select
            v-model="$parent.BusinessExpertName"
            placeholder="请选择业务专家姓名"
          >
            <el-option
              v-for="(item, index) in businessExpert"
              :label="item.userName"
              :value="item.fwmAccount"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="lableName" style="margin-bottom: 75px;">*</span>
          <el-input
            type="textarea"
            v-model="$parent.appealReason"
            placeholder="请填写申诉原因，最多200字。"
            maxlength="200"
            class="textareaInput"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div
          :class="[
            $parent.BusinessExpertName && $parent.appealReason
              ? 'new'
              : 'release'
          ]"
          @click="confirm"
        >
          提 交
        </div>
        <div class="blank " @click="cancel">
          取 消
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "dialogExpert",
  data() {
    return {
      businessExpert: []
    };
  },
  mounted() {
    let vm = this;
    vm.api
      .get(`./manage/service/pcommon/user/expert?rolename=businessExpert`)
      .then(function(response) {
        vm.businessExpert = response.data;
      })
      .catch(function(error) {});
  },
  computed: {
    ...mapState(["lookUpAdd"])
  },
  methods: {
    cancel() {
      this.$parent.ConfirmExpertFlag = false;
      this.$parent.BusinessExpertName = "";
      this.$parent.appealReason = "";
    },
    confirm() {
      // this.$parent.noPassReason = this.$parent.formReason;
      if (this.$parent.BusinessExpertName && this.$parent.appealReason) {
        this.$parent.appealSubmit();
      }
    },
    handleClose() {
      this.$parent.ConfirmExpertFlag = false;
      this.$parent.BusinessExpertName = "";
      this.$parent.appealReason = "";
    }
  }
};
</script>

<style scoped lang="less">
.dialogExpert /deep/ .el-dialog__footer {
  height: 60px;
  position: relative;
}
.textareaInput {
  height: 110px;
}
.textareaInput /deep/ textarea {
  height: 110px;
}
.dialogExpert {
  .el-form-item {
    margin-left: 15px;
    position: relative;
    .error-info {
      position: absolute;
      color: red;
      top: 27px;
      left: 95px;
    }
  }
  .lableName {
    width: 10px;
    display: inline-block;
    color: red;
  }
  .el-textarea {
    width: 360px;
  }
  .el-select {
    width: 360px;
  }
  .el-dialog__footer {
    height: 60px;
    width: 100%;
    position: relative;
    .dialog-footer {
      width: 100%;
      height: 60px;
    }
    .new {
      position: absolute;
      right: 120px;
    }
    .release {
      position: absolute;
      right: 120px;
    }
    .blank {
      position: absolute;
      right: 30px;
    }
  }
}
</style>
