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
        show-checkbox
        ref="tree"
        node-key="id"
        :props="defaultProps"
        @check="handleCheckChange"
      >
      </el-tree>
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
        label: "label",
        ckeckedData: []
      }
    };
  },
  props: ["dialogShow", "departmentList"],
  components: {},
  computed: {},
  mounted() {},
  methods: {
    confirm() {
      this.$emit("dialogConfirm", this.ckeckedData);
    },
    cancel() {
      this.$emit("dialogCancel");
    },
    handleCheckChange(data, checked, indeterminate) {
      this.ckeckedData = this.$refs.tree.getCheckedNodes();

      //  let vm = this;s
      // if (!chckedData) {
      //   vm.dialogShow = false;
      //   return;
      // }
      // let arrFlag = [];
      // let departmentStr = "";
      // for (var i = 0; i < chckedData.length; i++) {
      //   if (!chckedData[i].children.length) {
      //     arrFlag.push(chckedData[i]);
      //     departmentStr += "/" + chckedData[i].label;
      //   }
      // }
      // vm.department = departmentStr.substr(1);
      // vm.dialogShow = false;
    }
  }
};
</script>

<style scoped lang="less">
.el-tree {
  background: #f5f7fa;
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