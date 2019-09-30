<template>
  <div class="menuInfo">
    <div class="infoHeadText">菜单详细信息</div>
    <div class="infoContent">
      <el-form
        ref="form"
        :model="listContent"
        label-width="80px"
      >
        <el-form-item label="上级菜单">
          <el-input
            v-model="listContent.parentName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="菜单名称">
          <el-input v-model="listContent.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单链接">
          <el-input v-model="listContent.menuUrl"></el-input>
        </el-form-item>
        <el-form-item label="菜单排序">
          <el-input v-model="listContent.orderId"></el-input>
        </el-form-item>
        <el-form-item
          label="权限名"
          class="inputBtn"
        >
          <el-input
            v-model="listContent.accessName"
            :disabled="true"
          ></el-input>
          <el-button @click="inputDialogue"><i
              class="el-icon-circle-plus"
              style="color:#597ef7"
            ></i></el-button>
        </el-form-item>
        <el-form-item label="图标样式">
          <el-select
            v-model="listContent.menuIcon"
            placeholder="请选择图标样式"
          >
            <el-option
              v-for="(item,index) in lookUp.CATALOG_ICON"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="打开方式">
          <el-select
            v-model="listContent.friendlyUrl"
            placeholder="请选择打开方式"
          >
            <el-option
              v-for="(item,index) in lookUp.OPEN_URL_MODE"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="显示条件">
          <el-select
            v-model="listContent.showmenu"
            placeholder="请选择显示条件"
          >
            <el-option
              v-for="(item,index) in lookUp.SHOW_CATALOG_CONDITION"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <div style="overflow:hidden;width:100%;">
          <div class="foundBox">创建用户</div>
          <div
            class="foundCase"
            v-text="tools.setRole(listContent.createBy)"
          ></div>
        </div>
        <div style="margin-top:8px;overflow:hidden;width:100%;">
          <div class="foundBox">创建时间</div>
          <div
            class="foundCase"
            v-text="tools.setFormTime(listContent.createDate,1)"
          ></div>
        </div>

      </el-form>
      <el-dialog
        title="权限选择"
        :visible.sync="dialogVisible"
        width="30%"
        @close="closeDialog"
      >
        <dialogue-tree
          @listenListClick="permissionDataEvent"
          :dialogFlag="dialogFlag"
          type="1"
        ></dialogue-tree>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="permissionChoose"
          >确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import DialogueTree from "./DialogueTree";
import { mapState, mapMutations } from "vuex";
export default {
  name: "menuInfo",
  props: ["listContent"],
  data() {
    return {
      dialogVisible: false,
      permissionData: {},
      dialogFlag: false,
      form: {
        parentName: "",
        menuName: "",
        menuUrl: "",
        orderId: "",
        accessName: "",
        menuIcon: "",
        friendlyUrl: "",
        showmenu: "",
        createBy: "",
        createDate: ""
      }
    };
  },
  methods: {
    //点击input框弹框
    inputDialogue() {
      this.dialogVisible = true;
      this.dialogFlag = false;
    },
    permissionDataEvent(data) {
      this.permissionData = data;
    },
    //弹出框确定按钮
    permissionChoose() {
      if (
        this.permissionData.children &&
        this.permissionData.children.length > 0
      ) {
        this.$confirm("请选择具体的子项权限");
        return;
      }
      this.listContent.accessName = this.permissionData.id;
      this.dialogVisible = false;
    },
    closeDialog() {
      this.dialogFlag = true;
    }
  },
  components: { DialogueTree },
  computed: {
    ...mapState(["lookUp"])
  },
  watch: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.foundBox {
  float: left;
  width: 68px;
  height: 32px;
  margin-right: 12px;
  text-align: right;
  line-height: 32px;
  color: #606266;
}
.foundCase {
  cursor: not-allowed;
  float: left;
  width: calc(100% - 97px);
  height: 30px;
  border: 1px solid #dcdfe6;
  padding-left: 15px;
  line-height: 30px;
  font-size: 12px;
  border-radius: 4px;
  background: #f5f7fa;
  color: #c0c4cc;
}
.menuInfo /deep/ .el-dialog__title {
  font-weight: 900;
}
.menuInfo /deep/ .el-dialog__body {
  padding: 10px 20px;
}
.menuInfo {
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
    .inputBtn {
      position: relative;
      .el-button {
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 2px;
        width: 32px;
        height: 32px;
        color: #69aa46;
        font-size: 24px;
        padding: 3px 5px 5px 3px !important;
      }
      .el-input {
        width: 100%;
        margin-right: 40px;
      }
    }
    .el-form-item {
      margin-bottom: 14px;
      height: 28px;
    }
    padding: 10px;
    .el-select {
      width: 100%;
    }
  }
}
</style>
