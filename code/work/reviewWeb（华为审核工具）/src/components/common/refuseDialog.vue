<template>
  <div class="dialogConfirm">
    <el-dialog
      title="不通过原因"
      :visible.sync="isShowDialog"
      :modal-append-to-body="false"
      width="450px"
      top="20vh"
      class="headTitle"
      :before-close="handleClose"
    >
      <el-form :inline="true">
        <el-form-item>
          <span class="lableName">视频不通过原因：</span>
          <el-select v-model="videoReason" placeholder="请选择视频不通过原因">
            <el-option
              v-for="(item, index) in lookUpAdd.VIDEO_FAILED_REASON2"
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
            v-model="reason"
            maxlength="200"
            placeholder="请填写不通过原因，最多支持输入200字。"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <div
          :class="[reason || videoReason ? 'new' : 'release']"
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
      reason: "",
      videoReason: ""
    };
  },
  computed: {
    ...mapState(["lookUpAdd"])
  },
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShowDialog(newVal, oldVal) {
      if (newVal) {
        this.reason = "";
        this.videoReason = "";
      }
    }
  },
  methods: {
    confirm() {
      let reasonTotal = "";
      this.videoReason
        ? (reasonTotal = reasonTotal =
            "视频不通过原因:" +
            this.videoReason +
            ";" +
            (this.reason ? "备注:" + this.reason : ""))
        : (reasonTotal = "备注:" + this.reason);
      this.$emit("noPassEvent", reasonTotal);
    },
    handleClose() {
      this.reason = "";
      this.videoReason = "";
      this.$parent.isShowDialog = false;
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
