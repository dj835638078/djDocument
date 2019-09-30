<template>
  <div class="channelInfoAdd">
    <el-dialog
      :title="title"
      :visible.sync="$parent.addRoleDialog"
      :modal-append-to-body='false'
      width="450px"
      top="10vh"
      class="headTitle"
    >
      <el-form
        :inline="true"
        :model="list"
        class="demo-form-inline"
      >
        <el-form-item>
          <span class="lableName"><span>*</span>来源编号：</span>
          <el-input
            v-model="list.dataSource"
            placeholder="请填写来源编号"
            :disabled="$parent.dataSourceFlag"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeDataSource"
          >请填写来源编号</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName"><span>*</span>来源名称：</span>
          <el-input
            v-model="list.sourceName"
            placeholder="请填写来源名称"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeSourceName"
          >请填写来源名称</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName"><span>*</span>推送地址：</span>
          <el-input
            v-model="list.pushUrl"
            placeholder="请填写推送地址"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgePushUrl"
          >请填写推送地址</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName"><span>*</span>认证信息：</span>
          <el-input
            v-model="list.tokenInfo"
            placeholder="请填写认证信息"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeTokenInfo"
          >请填写认证信息</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName"><span>*</span>处理BeanId：</span>
          <el-input
            v-model="list.beanId"
            placeholder="请填写处理BeanId"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeBeanId"
          >请填写处理BeanId</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName"><span>*</span>处理时效：</span>
          <el-input
            v-model="list.minTime"
            placeholder="请填写处理时效（分钟）"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeMinTime"
          >请填写处理时效（分钟）</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName">备注：</span>
          <el-input
            v-model="list.sourceRemark"
            placeholder="请填写备注"
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
  name: "channelInfoAdd",
  data() {
    return {
      //新建的开关
      // addRole: true
    };
  },
  props: ["list", "title"],
  methods: {
    cancel() {
      this.$parent.addRoleDialog = false;
    },
    confirm() {
      if (this.title == "新建来源") {
        this.$parent.setNewChannel();
      }
      if (this.title == "编辑来源") {
        this.$parent.reviseRole();
      }
    }
  }
};
</script>

<style scoped lang="less">
.channelInfoAdd {
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
    width: 92px;
    display: inline-block;
    span {
      color: red;
      font-size: 14px;
    }
  }
  .el-input {
    width: 280px;
  }
}
</style>
