<template>
  <div class="setRole">
    <el-dialog
      :title="title"
      :visible.sync="$parent.addRole"
      :modal-append-to-body='false'
      :append-to-body='true'
      width="720px"
      top="10vh"
      class="headTitle"
    >
      <el-form
        :inline="true"
        :model="list"
        class="demo-form-inline items"
      >
        <div class="itemGroup">
          <el-form-item class="item1">
            <span class="lableName"><span v-if="title!='查询角色'">*</span>角色名称：</span>
            <el-input
              :disabled="dealRoleName"
              v-model="list.roleName"
              placeholder="请填写角色名称"
            ></el-input>
            <div
              class="error-info"
              v-if="$parent.judgeRoleName"
            >请填写角色名称</div>
          </el-form-item>
          <el-form-item class="item2">
            <span class="lableName">优先级：</span>
            <el-input
              v-model="list.orderId"
              placeholder="请填写优先级"
            ></el-input>
          </el-form-item>
        </div>
        <el-form-item class="item3 itemGroup">
          <span class="lableName"><span
              style="color:red"
              v-if="title!='查询角色'"
            >*</span>角色说明：</span>
          <el-input
            style="width:560px"
            v-model="list.areaCode"
            placeholder="请填写角色说明"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeRoleInfo"
          >请填写角色说明</div>
        </el-form-item>
        <el-form-item class="item3">
          <span class="lableName"><span
              style="color:white"
              v-if="title!='查询角色'"
            >*</span>角色描述：</span>
          <el-input
            style="width:560px"
            v-model="list.roleDesc"
            placeholder="角色描述"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item class="item3">
          <span class="lableName"><span
              style="color:white"
              v-if="title!='查询角色'"
            >*</span>跳转URL：</span>
          <el-input
            style="width:560px"
            v-model="list.defaultUrl"
            placeholder="请填写跳转URL"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          @click="confirm"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "setRole",
  data() {
    return {
      //新建的开关
      // addRole: true
      dealRoleName: false
    };
  },
  props: ["list", "title"],
  methods: {
    cancel() {
      this.$parent.addRole = false;
    },
    confirm() {
      if (this.title == "新建角色") {
        this.$parent.setNewUser();
      }
      if (this.title == "查询角色") {
        this.$parent.getRoleList();
        this.$parent.addRole = false;
        this.dealRoleName = false;
      }
      if (this.title == "编辑角色") {
        this.$parent.reviseRole();
        this.dealRoleName = true;
      }
    }
  },
  watch: {
    title(newVal, oldVal) {
      if (newVal == "编辑角色") {
        this.dealRoleName = true;
      }
      if (newVal == "查询角色") {
        this.dealRoleName = false;
      }
      if (newVal == "新建角色") {
        this.dealRoleName = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.setRole /deep/ .el-dialog__header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  span {
    font-size: 16px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.85);
    line-height: 24px;
  }
}
</style>
