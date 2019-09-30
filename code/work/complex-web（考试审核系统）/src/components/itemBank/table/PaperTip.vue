<template>
  <div class="paperTip">
    <el-dialog
      title="提示"
      :visible.sync="tipShow"
      width="450px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <span>该试卷正在审阅~请稍后查看~</span>
      <span slot="footer" class="dialog-footer">
        <div class="paperTip-footer" @click="goNewList">
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
  props: ["tipShow"],
  components: {},
  computed: {},
  mounted() {},
  methods: {
    goNewList() {
      this.$parent.tipShow = false;
    }
  }
};
</script>

<style scoped lang="less">
.paperTip /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
}
.paperTip /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.paperTip-footer {
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
</style>