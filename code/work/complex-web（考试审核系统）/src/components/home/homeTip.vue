<template>
  <div class="homeTip">
    <el-dialog
      title="提示"
      :visible.sync="tipShow"
      width="400px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <span>需要先阅读完【最新公告】才可以进行其他操作哦~</span>
      <span slot="footer" class="dialog-footer">
        <div class="homeTip-footer" @click="goNewList">
          确定
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tipShow: true
    };
  },
  props: ["tipShow"],
  components: {},
  computed: {},
  mounted() {},
  methods: {
    goNewList() {
      this.$router.push({
        name: "noticeNew"
      });
    }
  }
};
</script>

<style scoped lang="less">
.homeTip /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
}
.homeTip /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.homeTip-footer {
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