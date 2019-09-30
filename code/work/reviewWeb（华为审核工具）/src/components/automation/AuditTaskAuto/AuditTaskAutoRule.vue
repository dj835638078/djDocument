<template>
  <div class="AuditTaskAutoRule">
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
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>规则名称：</span>
          <span
            v-text="list.autoName"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-input
            v-model="list.autoName"
            placeholder="最多输入20字"
            maxlength=20
            :disabled="$route.params.name == 'edit'"
            v-else
          ></el-input>
          <div
            class="error-info"
            v-if="autoNameFlag"
          >请填写规则名称</div>
        </el-form-item>
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
            :disabled="dataSourceFlag"
            clearable
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
        <span
          style="margin:0 0 15px 15px;"
          v-if="$route.params.name != 'look'"
        ><span style="opacity:0">*</span>规则定义</span>
        <span
          style="margin:0 0 15px 15px;"
          v-else
        >规则定义</span>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName lableNameSpecial"><span v-if="$route.params.name != 'look'">*</span>key：</span>
          <span
            v-text="tools.setAutoKey(list.processType)"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-select
            v-model="list.processType"
            placeholder="请选择key"
            clearable
            v-else
          >
            <el-option
              v-for="(item,index) in lookUp.TASK_PROCESS_TYPE"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            ></el-option>
          </el-select>
          <div
            class="error-info"
            v-if="processTypeFlag"
          >请选择key</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName lableNameSpecial"><span v-if="$route.params.name != 'look'">*</span>条件：</span>
          <span
            v-text="tools.setAutoRule(list.processRule)"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-select
            v-model="list.processRule"
            placeholder="请选择条件"
            clearable
            v-else
          >
            <el-option
              v-for="(item,index) in lookUp.TASK_PROCESS_RULE"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            ></el-option>
          </el-select>
          <div
            class="error-info"
            v-if="processRuleFlag"
          >请选择条件</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName lableNameSpecial"><span v-if="$route.params.name != 'look'">*</span>Value：</span>
          <span
            v-text="list.processValue"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-input
            v-model="list.processValue"
            v-else
            style="margin-right:10px"
            placeholder="最多输入15字"
            maxlength=15
          ></el-input>{{valueFlag?"秒":""}}
          <div
            class="error-info"
            v-if="processValueFlag"
            style="width: 80px"
          >请填写Value</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>审核状态：</span>
          <span
            v-text="list.processResult == 1 ? '通过':'不通过'"
            v-if="$route.params.name == 'look'"
            class="lookRule"
            :class="[list.processResult == 1?'activeColorY':'activeColorN']"
          ></span>
          <el-radio-group
            v-model="list.processResult"
            v-else
          >
            <el-radio
              v-for="(item,index) in lookUp.TASK_PROCESS_RESULT"
              :label="item.itemCode"
              :key="index"
            >{{item.itemName}}</el-radio>
          </el-radio-group>
          <div
            class="error-info"
            v-if="processResultFlag"
          >请选择审核状态</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>规则状态：</span>
          <span
            v-text="list.autoState == 1?'启用':'禁用'"
            v-if="$route.params.name == 'look'"
            class="lookRule"
            :class="[list.autoState == 1?'activeColorY':'activeColorN']"
          ></span>
          <el-radio-group
            v-model="list.autoState"
            v-else
          >
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
          <div
            class="error-info"
            v-if="autoStateFlag"
          >请选择规则状态</div>
        </el-form-item>
        <el-form-item :class="[$route.params.name == 'look'?'specialClass':'']">
          <span class="lableName"><span v-if="$route.params.name != 'look'">*</span>审核意见：</span>
          <span
            v-text="list.processConclusion"
            v-if="$route.params.name == 'look'"
            class="lookRule"
          ></span>
          <el-input
            type="textarea"
            v-model="list.processConclusion"
            v-else
            placeholder="请输入审核意见，100字内"
            maxlength=100
          ></el-input>
          <div
            class="error-info"
            v-if="processConclusionFlag"
            style="top:95px"
          >请填写审核意见</div>
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
  name: "AuditTaskAutoRule",
  data() {
    return {
      list: {
        autoName: "",
        channelType: "",
        dataSource: "",
        processType: "",
        processRule: "",
        processValue: "",
        processResult: "",
        autoState: "",
        processConclusion: ""
      },
      listDefault: {
        autoName: "",
        channelType: "",
        dataSource: "",
        processType: "",
        processRule: "",
        processValue: "",
        processResult: "",
        autoState: "",
        processConclusion: ""
      },
      channelTypeFlag: false,
      dataSourceFlagCheck: false,
      autoNameFlag: false,
      processTypeFlag: false,
      processRuleFlag: false,
      processValueFlag: false,
      processResultFlag: false,
      autoStateFlag: false,
      processConclusionFlag: false,
      saveMes: "新增成功",
      saveUrl: "./manage/service/automation/add",
      dataSourceArr: [],
      userArr: [],
      dataSourceFlag: true,
      valueFlag: false
    };
  },
  computed: {
    ...mapState(["lookUp"]),
    channelType() {
      return this.list.channelType;
    },
    processType() {
      return this.list.processType;
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
      this.saveUrl = "./manage/service/taskAuto/update";
      this.qeuryList(this.$route.params.id);
    } else {
      this.list = Object.assign({}, this.listDefault);
      this.$route.meta.title = "新建规则";
      this.saveMes = "新增成功";
      this.saveUrl = "./manage/service/taskAuto/insert";
    }
  },
  watch: {
    channelType(newVal, oldVal) {
      if (newVal) {
        let vm = this;
        vm.dataSourceFlag = false;
        if (newVal && oldVal) {
          vm.list.dataSource = "";
        }
        if (vm.$route.params.name != "look") {
          vm.api
            .get("./manage/service/channelSource/querySource/" + newVal)
            .then(function(response) {
              if (response.status == 200) {
                vm.dataSourceArr = response.data;
              }
            })
            .catch(function(error) {});
        }
      }
    },
    processType(newVal, oldVal) {
      if (newVal == 3) {
        this.valueFlag = true;
      } else {
        this.valueFlag = false;
      }
    }
  },
  components: {},
  methods: {
    backCli() {
      this.$router.push({ name: "AuditTaskAuto" });
    },
    saveCli() {
      let vm = this;
      let data = vm.list;
      vm.channelTypeFlag = false;
      vm.dataSourceFlagCheck = false;
      vm.autoNameFlag = false;
      vm.processTypeFlag = false;
      vm.processRuleFlag = false;
      vm.processValueFlag = false;
      vm.processResultFlag = false;
      vm.autoStateFlag = false;
      vm.processConclusionFlag = false;
      if (!data.channelType) {
        vm.channelTypeFlag = true;
      }
      if (!data.dataSource) {
        vm.dataSourceFlagCheck = true;
      }
      if (!data.autoName) {
        vm.autoNameFlag = true;
      }
      if (!data.processType) {
        vm.processTypeFlag = true;
      }
      if (!data.processRule) {
        vm.processRuleFlag = true;
      }
      if (!data.processValue) {
        vm.processValueFlag = true;
      }
      if (!data.processResult) {
        vm.processResultFlag = true;
      }
      if (data.autoState.toString() != "0" && data.autoState.toString() != 1) {
        vm.autoStateFlag = true;
      }
      if (!data.processConclusion) {
        vm.processConclusionFlag = true;
      }
      if (
        vm.channelTypeFlag ||
        vm.dataSourceFlagCheck ||
        vm.autoNameFlag ||
        vm.processTypeFlag ||
        vm.processRuleFlag ||
        vm.processValueFlag ||
        vm.processResultFlag ||
        vm.autoStateFlag ||
        vm.processConclusionFlag
      ) {
        return;
      }
      vm.api
        .post(vm.saveUrl, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              message: vm.saveMes,
              type: "success"
            });
            vm.$router.push({ name: "AuditTaskAuto" });
          }
        })
        .catch(function(error) {});
    },
    getUserArr() {
      let vm = this;
      vm.api
        .get(`./manage/service/usermanage/blur`)
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
        .get("./manage/service/taskAuto/queryById?autoId=" + id)
        .then(function(response) {
          if (response.status == 200) {
            vm.list = response.data;
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style scoped lang="less">
.AuditTaskAutoRule/deep/.el-textarea__inner {
  height: 100px;
}
.AuditTaskAutoRule {
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
      .lableNameSpecial {
        text-align: right;
        box-sizing: border-box;
        padding-right: 15px;
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
