<template>
  <div class="dialogShow">
    <el-dialog
      title="选择部门"
      :visible.sync="dialogShow"
      width="400px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
    >
      <el-tree
        :data="departmentList"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :render-content="renderContent"
        highlight-current
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <div class="dialogShow-footer footerAdd" @click="confirm">
          确定
        </div>
        <div class="dialogShow-footer" @click="cancel">
          取消
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      ckeckedData: ""
    };
  },
  props: ["dialogShow", "departmentList"],
  components: {},
  computed: {},
  mounted() {},
  methods: {
    confirm() {
      if (
        !this.ckeckedData
        // (+this.ckeckedData.regionLevel <= 3)
      ) {
        this.$message({
          message: "请选择部门",
          type: "warning"
        });
        return;
      } else {
        this.$emit("dialogConfirm", this.ckeckedData);
      }
    },
    cancel() {
      this.$emit("dialogCancel");
    },
    handleNodeClick(data) {
      this.ckeckedData = data;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <i class={data.className} />
          <span>{node.label}</span>
        </span>
      );
    }
  }
};
</script>

<style scoped lang="less">
.el-tree {
  background: #f5f7fa;
}
.el-tree /deep/.is-current > .el-tree-node__content {
  background-color: #c9efef !important;
}
.dialogShow /deep/ .tree-icon-yellow {
  margin-right: 6px;
  color: #f5a623;
}
.dialogShow /deep/ .tree-icon-blue {
  margin-right: 6px;
  color: #93c6ff;
}
.dialogShow /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
}
.dialogShow /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.dialogShow-footer {
  width: 65px;
  height: 30px;
  background: #d9d9d9;
  border-radius: 2px;
  color: #fff;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}
.footerAdd {
  margin-right: 10px;
  background: rgba(0, 205, 202, 1);
}
</style>