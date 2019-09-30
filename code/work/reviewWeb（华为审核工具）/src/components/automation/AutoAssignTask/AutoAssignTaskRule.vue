<template>
  <div class="AutoAssignTaskRule">
    <!--操作组-->
    <div
      class="btnList"
      v-if="$route.params.name == 'look'"
    >
      <div
        class="new"
        @click="backCli"
      ><i class="fa fa-reply"></i>返回</div>
    </div>
    <!--表单-->
    <div class="formBox">
      <el-form
        :inline="true"
        :model="list"
        class="demo-form-inline"
      >
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>适用范围：</span>
          <span
            v-text="list.channelTypeName"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-select
            v-model="list.channelType"
            placeholder="请选择适用范围"
            clearable
            v-else
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
            v-if="channelTypeFlag"
          >请选择适用范围</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>规则类型：</span>
          <span
            v-text="list.dataSourceName"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-select
            v-model="list.dataSource"
            placeholder="请选择规则类型"
            multiple
            clearable
            :disabled="dataSourceFlag"
            v-else
          >
            <el-option
              v-for="(item,index) in dataSourceArr"
              :label="item.sourceName"
              :value="item.dataSource"
              :key="index"
            ></el-option>
          </el-select>
          <div
            class="error-info"
            v-if="dataSourceFlagCheck"
          >请选择规则类型</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>规则名称：</span>
          <span
            v-text="list.assignName"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-input
            v-model="list.assignName"
            placeholder="最多输入20字"
            maxlength=20
            :disabled="$route.params.name == 'edit'"
            v-else
          ></el-input>
          <div
            class="error-info"
            v-if="assignNameFlag"
          >请填写规则名称</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>账号名称：</span>
          <span
            v-text="tools.setRole(list.fwmAccount)"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-select
            v-model="list.fwmAccount"
            placeholder="请选择账号名称"
            filterable
            clearable
            v-else
          >
            <el-option
              v-for="(item,index) in userArr"
              :label="item.userName"
              :value="item.fwmAccount"
              :key="index"
            ></el-option>
          </el-select>
          <div
            class="error-info"
            v-if="fwmAccountFlag"
          >请选择账号名称</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>规则状态：</span>
          <span
            v-text="list.assignState == 1 ? '启用':'禁用'"
            v-if="$route.params.name == 'look'"
            class="lookRule"
            :class="[list.assignState == 1?'activeColorY':'activeColorN']"
          ></span>
          <el-radio-group
            v-model="list.assignState"
            v-else
          >
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
          <div
            class="error-info"
            v-if="assignStateFlag"
          >请选择规则状态</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName">规则描述：</span>
          <span
            v-text="list.assignRemark"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-input
            type="textarea"
            v-model="list.assignRemark"
            maxlength=100
            placeholder="请输入详细的规则描述，100字内"
            v-else
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div
      slot="footer"
      class="btn-footer"
      v-if="$route.params.name != 'look'"
    >
      <div
        class="blank"
        @click="backCli"
      >取消</div>
      <div
        class="new"
        @click="saveCli"
      >保存</div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "AutoAssignTaskRule",
  data() {
    return {
      list: {
        assignName: "",
        channelType: "",
        channelTypeName: "",
        fwmAccount: "",
        dataSource: [],
        dataSourceMiddle: [],
        dataSourceName: [],
        assignState: "",
        assignRemark: ""
      },
      listDefault: {
        assignName: "",
        channelType: "",
        channelTypeName: "",
        fwmAccount: "",
        dataSource: [],
        dataSourceMiddle: [],
        dataSourceName: [],
        assignState: "",
        assignRemark: ""
      },
      dataSourceFlagCheck: false,
      channelTypeFlag: false,
      assignNameFlag: false,
      fwmAccountFlag: false,
      assignStateFlag: false,
      saveMes: "新增成功",
      saveUrl: "./manage/service/automation/add",
      dataSourceArr: [],
      userArr: [],
      dataSourceFlag: true,
      dataSourceMiddleFlag: false
    };
  },
  computed: {
    ...mapState(["lookUp"]),
    channelType() {
      return this.list.channelType;
    }
  },
  mounted() {
    this.getUserArr();
    if (this.$route.params.name == "look") {
      this.$route.meta.title = "查看规则";
      this.qeuryList(this.$route.params.id);
    } else if (this.$route.params.name == "edit") {
      this.$route.meta.title = "编辑规则";
      // this.list = this.automationInfo.list;
      this.saveMes = "编辑成功";
      this.saveUrl = "./manage/service/automation/update";
      this.qeuryList(this.$route.params.id);
    } else {
      this.list = Object.assign({}, this.listDefault);
      this.$route.meta.title = "新建规则";
      this.saveMes = "新增成功";
      this.saveUrl = "./manage/service/automation/add";
    }
  },
  watch: {
    channelType(newVal, oldVal) {
      if (newVal) {
        let vm = this;
        vm.dataSourceFlag = false;
        vm.list.dataSource = [];
        if (vm.$route.params.name != "look") {
          vm.api
            .get("./manage/service/channelSource/querySource/" + newVal)
            .then(function(response) {
              if (response.status == 200) {
                vm.dataSourceArr = response.data;
              }
            })
            .then(function() {
              if (newVal && !oldVal) {
                vm.list.dataSource = vm.list.dataSourceMiddle;
              }
            })
            .catch(function(error) {});
        }
      }
    }
  },
  components: {},
  methods: {
    backCli() {
      this.$router.push({ name: "AutoAssignTask" });
    },
    saveCli() {
      let vm = this;
      let data = JSON.parse(JSON.stringify(vm.list));
      vm.channelTypeFlag = false;
      vm.dataSourceFlagCheck = false;
      vm.assignNameFlag = false;
      vm.fwmAccountFlag = false;
      vm.assignStateFlag = false;
      if (!data.channelType) {
        vm.channelTypeFlag = true;
      }
      if (!data.dataSource.length) {
        vm.dataSourceFlagCheck = true;
      }
      if (!data.assignName) {
        vm.assignNameFlag = true;
      }
      if (!data.fwmAccount) {
        vm.fwmAccountFlag = true;
      }
      if (
        data.assignState.toString() != "0" &&
        data.assignState.toString() != 1
      ) {
        vm.assignStateFlag = true;
      }
      if (
        vm.channelTypeFlag ||
        vm.dataSourceFlagCheck ||
        vm.assignNameFlag ||
        vm.fwmAccountFlag ||
        vm.assignStateFlag
      ) {
        return;
      }
      data.dataSource = data.dataSource.join(",");
      vm.api
        .post(vm.saveUrl, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              message: vm.saveMes,
              type: "success"
            });
            vm.$router.push({ name: "AutoAssignTask" });
          }
        })
        .catch(function(error) {});
    },
    getUserArr() {
      let vm = this;
      vm.api
        .get(`./manage/service/usermanage/queryRegion`)
        .then(function(response) {
          if (response.status == 200) {
            vm.userArr = response.data;
          }
        })
        .catch(function(error) {});
    },
    qeuryList(id) {
      let vm = this;
      vm.api
        .get("./manage/service/automation/queryById/" + id)
        .then(function(response) {
          if (response.status == 200) {
            vm.list = response.data;
            if (vm.$route.params.name == "edit") {
              vm.list.dataSource = vm.list.dataSource.split(",");
              vm.list.dataSourceName = vm.list.dataSourceName.split(",");
              vm.list.dataSourceMiddle = vm.list.dataSource;
            }
            vm.list.dataSource = [];
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style scoped lang="less">
.AutoAssignTaskRule /deep/ .el-textarea__inner {
  height: 100px;
}
.AutoAssignTaskRule {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  .btnList {
    padding: 12px 25px 0 25px;
    border-bottom: 1px solid #e9e9e9;
    // height: 90px;
  }
  .formBox {
    .el-form {
      display: flex;
      flex-direction: column;
      padding: 0 10px;
      margin-top: 20px;
      .specialClass {
        border-bottom: 1px solid #e9e9e9;
        padding-bottom: 6px;
        span:first-child {
          // color: rgba(0, 0, 0, 0.35);
        }
      }
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
        width: 420px;
      }
      .el-select {
        width: 420px;
      }
      .el-textarea {
        width: 420px;
        height: 100px;
      }
    }
  }
  .btn-footer {
    // display: flex;
    // justify-content: center;
    margin-left: 366px;
    .new {
      margin-left: 20px;
    }
  }
}
</style>
