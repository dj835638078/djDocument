<template>
  <div class="AddUser">
    <!--$parent.judgeAdd-->
    <el-dialog
      :title="titleName"
      :visible.sync="$parent.judgeAddUser"
      :modal-append-to-body='false'
      :append-to-body='true'
      width="684px"
      top="10vh"
    >
      <el-form
        :inline="true"
        :model="list"
        class="demo-form-inline"
      >
        <div class="AddUserOne">
          <div
            class="abox"
            style="margin-top:5px;"
          >
            <span class="abox-lableName"><span v-if="titleName !='查询'">*</span>用户账号：</span>
            <div class="input-box">
              <el-input
                :disabled="titleName =='编辑'"
                maxlength="20"
                v-model="list.fwmAccount"
                placeholder="请填写用户账号"
              ></el-input>
            </div>
            <div
              class="error-point"
              v-if="$parent.judgeAccount"
            >请填写用户账号</div>
          </div>
          <div
            class="abox"
            style="margin-top:5px;"
          >
            <span class="abox-lableName"><span v-if="titleName !='查询'">*</span>用户姓名：</span>
            <div class="input-box">
              <el-input
                maxlength="20"
                v-model="list.userName"
                placeholder="请填写用户姓名"
              ></el-input>
            </div>
            <div
              class="error-point"
              v-if="$parent.judgeUserName"
            >请填写用户姓名</div>
          </div>
          <div class="abox">
            <span class="abox-lableName"><span v-if="titleName !='查询'">*</span>部门：</span>
            <div
              v-if="!list.regionCode"
              class="input-box"
              style="width: calc(100% - 123px);height:32px;line-height:32px;border: 1px solid #dcdfe6;border-radius:5px;padding-left:16px;font-size:14px;color: #d2c9cc;"
              v-text="'请选择部门'"
              @click="personBtn"
            >
            </div>
            <div
              v-else
              class="input-box"
              style="width: calc(100% - 123px);height:32px;line-height:32px;border: 1px solid #dcdfe6;border-radius:5px;padding-left:16px;font-size:14px;color: #606266;"
              v-text="tools.setRegionName(list.regionCode)"
              @click="personBtn"
            >
            </div>
            <div
              class="error-point"
              v-if="$parent.judgePerson"
            >请选择部门</div>
          </div>
          <div class="abox">
            <span class="abox-lableName"><span v-if="titleName !='查询'">*</span>性别：</span>
            <div class="input-box">
              <el-select
                v-model="list.sex"
                placeholder="请选择性别"
              >
                <el-option
                  label="男"
                  value="M"
                ></el-option>
                <el-option
                  label="女"
                  value="F"
                ></el-option>
              </el-select>
            </div>
            <div
              class="error-point"
              v-if="$parent.judgeSex"
            >请选择性别</div>
          </div>
          <div class="abox">
            <span class="abox-lableName"><span v-if="titleName !='查询'">*</span>电子邮箱：</span>
            <div class="input-box">
              <el-input
                v-model="list.email"
                placeholder="请填写电子邮箱"
              ></el-input>
            </div>
            <div
              class="error-point"
              v-if="$parent.judgeEmail"
            >请填写正确的电子邮箱</div>
          </div>
          <div class="abox">
            <span class="abox-lableName"><span v-if="titleName !='查询'">*</span>手机号码：</span>
            <div class="input-box">
              <el-input
                v-model="list.mobileCode"
                placeholder="请填写手机号码"
              ></el-input>
            </div>
            <div
              class="error-point"
              v-if="$parent.judgeMobileCode"
            >请填写正确的手机号码</div>
          </div>
          <!--<div class="abox">
            <span class="abox-lableName"><span style="color:white">*</span>证件类型：</span>
            <div class="input-box">
              <el-select
                v-model="list.identityType"
                placeholder="请选择证件类型"
              >
            
                <el-option
                  label="身份证"
                  value="1"
                ></el-option>
                <el-option
                  label="护照"
                  value="2"
                ></el-option>
                <el-option
                  label="港澳通行证"
                  value="3"
                ></el-option>
                <el-option
                  label="其他"
                  value="4"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="abox">
            <span class="abox-lableName"><span style="color:white">*</span>证件号码：</span>
            <div class="input-box">
              <el-input
                v-model="list.identityId"
                placeholder="请填写证件号码"
              ></el-input>
            </div>
          </div>
          -->
          <div class="abox">
            <span class="abox-lableName"><span style="color:white">*</span>出生日期：</span>
            <div class="input-box">
              <el-date-picker
                v-model="list.birthDate"
                type="date"
                placeholder="请选择出生日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="abox">
            <span class="abox-lableName"><span style="color:white">*</span>通讯地址：</span>
            <div class="input-box">
              <el-input
                maxlength="50"
                v-model="list.daddress"
                placeholder="请填写通讯地址"
              ></el-input>
            </div>
          </div>
        </div>
      </el-form>
      <div style="clear:both"></div>
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
  name: "AddUser",
  data() {
    return {
      formLabelWidth: "120px"
    };
  },
  props: ["list", "titleName"],
  components: {},
  computed: {},
  mounted() {},
  methods: {
    personBtn() {
      this.$parent.dialogShow = true;
      this.$parent.dialogFlag = true;
    },
    //取消
    cancel() {
      this.$parent.judgeAddUser = false;
    },
    //确定
    confirm() {
      if (this.titleName == "新建") {
        this.$parent.setNewUser();
      }
      if (this.titleName == "查询") {
        this.$parent.getUserList();
      }
      if (this.titleName == "编辑") {
        this.$parent.reviseUser();
      }
    }
  }
};
</script>

<style  lang="less">
</style>
