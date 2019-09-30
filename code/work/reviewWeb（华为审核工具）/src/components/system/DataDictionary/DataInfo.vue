<template>
  <div class="dataInfo">
    <div class="infoHeadText">数据字典详细信息</div>
    <div class="infoContent">
      <el-form
        ref="form"
        :model="listContent"
        label-width="80px"
      >
        <el-form-item
          label="字典名称"
          :required="true"
        >
          <el-input
            v-model="listContent.name"
            :disabled="nameFlag"
          ></el-input>
        </el-form-item>
        <el-form-item label="字典数据">
          <el-input v-model="listContent.value"></el-input>
        </el-form-item>
        <el-form-item
          label="字典说明"
          class="inputUnique"
        >
          <el-input
            type="textarea"
            v-model="listContent.description"
            class="textAreaStyle"
          ></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="listContent.orderId"></el-input>
        </el-form-item>
        <el-form-item label="父路径">
          <el-input
            v-model="listContent.parentPath"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-dialog
        title="权限选择"
        :visible.sync="dialogVisible"
        :modal-append-to-body='false'
        :append-to-body='true'
        width="30%"
        :before-close="handleClose"
      >
        <dialogue-tree></dialogue-tree>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataInfo",
  props: ["listContent", "nameFlag"],
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        value: "",
        description: "",
        orderId: "",
        parentPath: ""
      }
    };
  },
  methods: {
    //点击input框弹框
    inputDialogue() {
      this.dialogVisible = true;
    },
    //弹出框确定按钮
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.textAreaStyle /deep/ textarea {
  min-height: 70px !important;
}
.dataInfo {
  width: 49%;
  height: calc(100%-38px);
  box-sizing: border-box;
  border: 1px solid rgba(232, 232, 232, 1);
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  .infoHeadText {
    text-align: left;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    font-weight: 900;
    color: #096dd9;
    padding-left: 24px;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
  }
  .infoContent {
    .inputUnique {
      margin-bottom: 48px !important;
    }
    .el-input {
      width: 100%;
      margin-right: 40px;
    }
    .el-form-item {
      margin-bottom: 14px;
      height: 28px;
    }
    .textAreaStyle {
      textarea {
        height: 100px !important;
      }
    }
    padding: 10px;
    .el-select {
      width: 100%;
    }
  }
}
</style>
