<template>
  <div class="dialogTip">
    <el-dialog
      title="提示"
      :visible.sync="tipShow"
      width="450px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <div v-html="tipMessage" class="tipMessage"></div>
      <span slot="footer" class="dialog-footer">
        <div
          class="dialogTipFooter footerLeft"
          @click="goNewListCancel"
          v-if="hideCancel == 'showCancel'"
        >
          取消
        </div>
        <div class="dialogTipFooter" @click="goNewList">
          确定
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    tipShow: {
      required: true,
      default: false
    },
    tipMessage: {
      required: true
    },
    hideCancel: {
      default: "showCancel"
    }
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    goNewList() {
      this.$parent.tipShow = false;
      this.$emit("dialogConfirm");
    },
    goNewListCancel() {
      this.$parent.tipShow = false;
    }
  }
};
</script>

<style scoped lang="less">
.dialogTip /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
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
</style>