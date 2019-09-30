<template>
  <div class="ChannelAdd">
    <el-dialog
      :title="title"
      :visible.sync="$parent.addChannelSet"
      :modal-append-to-body='false'
      width="450px"
      top="20vh"
      class="headTitle"
    >
      <el-form
        :inline="true"
        :model="list"
        class="demo-form-inline"
      >
        <el-form-item>
          <span class="lableName"><span>*</span>渠道编号：</span>
          <el-input
            v-model="list.channelCode"
            placeholder="请填写渠道编号"
            :disabled="$parent.channelCodeFlag"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeChannelCode"
          >请填写渠道编号</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName"><span>*</span>渠道名称：</span>
          <el-input
            v-model="list.channelName"
            placeholder="请填写渠道名称"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeChannelName"
          >请填写渠道名称</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName"><span>*</span>联系人账号：</span>
          <el-input
            v-model="list.contactsAccount"
            placeholder="请填写联系人账号"
          ></el-input>
          <div
            class="error-info"
            v-if="$parent.judgeContactsAccount"
          >请填写联系人账号</div>
        </el-form-item>
        <el-form-item>
          <span class="lableName"><span>*</span>任务类型：</span>
          <el-select
            v-model="list.channelType"
            placeholder="请选择任务类型"
          >
            <el-option
              v-for="(item,index) in lookUp.CHANNEL_TASK_TYPE"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            ></el-option>
          </el-select>
          <div
            class="error-info"
            v-if="$parent.judgeChannelType"
          >请填写任务类型</div>
        </el-form-item>
      </el-form>
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
import { mapState } from "vuex";
export default {
  name: "ChannelAdd",
  data() {
    return {
      //新建的开关
      // addChannelSet: true
      codeFlag: false,
      nameFlag: false,
      stateFlag: false
    };
  },
  props: ["list", "title"],
  computed: {
    ...mapState(["lookUp"])
  },
  methods: {
    cancel() {
      this.$parent.addChannelSet = false;
    },
    confirm() {
      if (this.title == "新建渠道") {
        this.$parent.setNewChannel();
      }
      if (this.title == "编辑渠道") {
        this.$parent.reviseRole();
      }
    }
  }
};
</script>

<style scoped lang="less">
.ChannelAdd {
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
    width: 90px;
    display: inline-block;
    span {
      color: red;
      font-size: 14px;
    }
  }
  .el-input {
    width: 280px;
  }
  .el-select {
    width: 280px;
  }
}
</style>
