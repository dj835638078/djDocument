<template>
  <div class="dialogConfirm">
    <el-dialog
      title="不通过原因"
      :visible.sync="$parent.ConfirmFlag"
      :modal-append-to-body="false"
      width="450px"
      top="20vh"
      class="headTitle"
      :before-close="handleClose"
    >
      <el-form
        :inline="true"
        :model="$parent.formReason"
        class="demo-form-inline"
      >
        <el-form-item>
          <span class="lableName">图片不通过原因：</span>
          <el-select
            v-model="$parent.formReason.图片不通过原因"
            placeholder="请选择图片不通过原因"
          >
            <el-option
              v-for="(item, index) in lookUpAdd.IMG_FAILED_REASON"
              :label="item.itemName"
              :value="item.itemName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="lableName">文字不通过原因：</span>
          <el-select
            v-model="$parent.formReason.文字不通过原因"
            placeholder="请选择文字不通过原因"
          >
            <el-option
              v-for="(item, index) in lookUpAdd.TEXT_FAILED_REASON"
              :label="item.itemName"
              :value="item.itemName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="lableName">视频不通过原因：</span>
          <el-select
            v-model="$parent.formReason.视频不通过原因"
            placeholder="请选择视频不通过原因"
          >
            <el-option
              v-for="(item, index) in lookUpAdd.VIDEO_FAILED_REASON"
              :label="item.itemName"
              :value="item.itemName"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <span class="lableName">备注：</span>
          <el-input
            type="textarea"
            v-model="$parent.formReason.备注"
            maxlength="200"
            placeholder="请填写备注，最多支持输入200字。"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="cancel">取 消</el-button> -->
        <!-- <el-button
          type="primary"
          @click="confirm"
        >提 交</el-button> -->
        <div
          :class="[
            $parent.formReason.图片不通过原因 ||
            $parent.formReason.文字不通过原因 ||
            $parent.formReason.视频不通过原因
              ? 'new'
              : 'release'
          ]"
          @click="confirm"
        >
          提 交
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "dialogConfirm",
  data() {
    return {
      //新建的开关
      // addChannelSet: true
      codeFlag: false,
      nameFlag: false,
      stateFlag: false
    };
  },
  mounted() {},
  computed: {
    ...mapState(["lookUpAdd"])
  },
  methods: {
    // cancel() {
    //   this.$parent.ConfirmFlag = false;
    // },
    confirm() {
      this.$parent.noPassReason = this.$parent.formReason;
      this.$parent.noPassEvent();
    },
    handleClose() {
      this.$parent.ConfirmFlag = false;
      this.$parent.formReason.图片不通过原因 = "";
      this.$parent.formReason.文字不通过原因 = "";
      this.$parent.formReason.视频不通过原因 = "";
      this.$parent.formReason.备注 = "";
    }
  }
};
</script>

<style scoped lang="less">
.dialogConfirm /deep/ .el-dialog__footer {
  height: 60px;
  position: relative;
}
.dialogConfirm {
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
    width: 120px;
    display: inline-block;
    span {
      color: red;
      font-size: 14px;
    }
  }
  .el-textarea {
    width: 250px;
  }
  .el-select {
    width: 250px;
  }
  .el-dialog__footer {
    height: 60px;
    position: relative;
    .new {
      position: absolute;
      right: 30px;
    }
    .release {
      position: absolute;
      right: 30px;
    }
  }
}
</style>
