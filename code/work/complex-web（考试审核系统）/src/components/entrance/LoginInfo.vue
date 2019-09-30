<template>
  <div class="LoginInfo">
    <form class="infoContent">
      <div class="infoTitle">注册</div>
      <div class="infoExplain">请正确填写相关信息，方便管理员审核。</div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span>*</span><span class="iconTitle">员工工号</span></span
        >
        <el-input
          v-model="list.fwmAccount"
          placeholder="员工工号"
          maxlength="7"
          @keyup.native="inputEnterFwmAccount"
          @change="inputEnterFwmAccount"
        ></el-input>
        <div class="infoError" v-if="jobNumberFlag">请输入员工工号</div>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span>*</span
          ><span class="iconTitle"
            >姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 名</span
          ></span
        >
        <el-input
          v-model="list.userName"
          placeholder="姓名"
          maxlength="20"
        ></el-input>
        <div class="infoError" v-if="nameFlag">请输入姓名</div>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle"
            >性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 别</span
          ></span
        >
        <el-select v-model="list.sex" placeholder="请选择性别" clearable>
          <el-option label="男" value="M"></el-option>
          <el-option label="女" value="F"></el-option>
        </el-select>
      </div>
      <div class="inputGroup emailGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle">公司邮箱</span></span
        >
        <el-input
          v-model="list.email"
          placeholder="公司邮箱"
          class="email"
          maxlength="30"
        ></el-input
        ><span class="emailName">@isoftstone.com</span>
        <div class="infoExplain" style="margin-bottom:0">
          邮箱用于接收账号审批通知邮件。
        </div>
        <!-- <el-input
          v-model="list.emailCode"
          placeholder="验证码"
          class="emailNumber"
        ></el-input> -->
        <!-- <div
          :class="[btnDisabled ? 'main' : 'release', 'sendNumber']"
          @click="sendNumber"
        >
          发送验证码
        </div> -->
        <div class="infoErrorEmai" v-if="emailFlag">
          {{ infoErrorEmai }}
        </div>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle">入职日期</span></span
        >
        <el-date-picker
          v-model="list.entryDate"
          type="date"
          :picker-options="pickerOptions"
          placeholder="请选择入职日期"
        >
        </el-date-picker>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span>*</span><span class="iconTitle">手机号码</span></span
        >
        <el-input
          v-model="list.mobileCode"
          placeholder="手机号码"
          maxlength="11"
          @keyup.native="inputEnterMobileCode"
          @change="inputEnterMobileCode"
        ></el-input>
        <div class="infoError" v-if="phoneNumberFlag">请输入正确的手机号码</div>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle">QQ号码</span></span
        >
        <el-input
          v-model="list.qqAccount"
          placeholder="QQ号码"
          maxlength="12"
          @keyup.native="inputEnterqqAccount"
          @change="inputEnterqqAccount"
        ></el-input>
        <!-- <div class="infoError">aaa</div> -->
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle">身份证号</span></span
        >
        <el-input
          v-model="list.identityId"
          placeholder="身份证号"
          maxlength="18"
        ></el-input>
        <div class="infoError" v-if="identityIdFlag">
          请输入正确的身份证号码
        </div>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span>*</span><span class="iconTitle">所在区域</span></span
        >
        <el-select
          v-model="list.regionCode"
          placeholder="请选择所在区域"
          clearable
        >
          <el-option
            v-for="(item, index) in lookUp.REIGSTER_REGION_CODE"
            :label="item.itemName"
            :value="item.itemCode"
            :key="index"
          ></el-option>
        </el-select>
        <div class="infoError" v-if="areaFlag">请选择所在区域</div>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle">员工岗位</span></span
        >
        <el-input v-model="list.employeeJob" placeholder="员工岗位"></el-input>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle">员工性质</span></span
        >
        <el-select
          v-model="list.employeeNature"
          placeholder="请选择员工性质"
          clearable
        >
          <el-option
            v-for="(item, index) in lookUp.EMPLOYEE_NATURE_CODE"
            :label="item.itemName"
            :value="item.itemCode"
            :key="index"
          ></el-option>
        </el-select>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle">参培时间</span></span
        >
        <el-date-picker
          v-model="list.trainingDate"
          type="date"
          placeholder="请选择参培时间"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <div class="inputGroup">
        <span class="iconSymbol"
          ><span class="noNeed">*</span
          ><span class="iconTitle">培训班主任</span></span
        >
        <el-input
          v-model="list.trainingTeacher"
          maxlength="20"
          placeholder="入职培训班主任"
        ></el-input>
      </div>
      <div class="main submitBtn" @click="submitBtn">提交</div>
      <div class="loginBtn" @click="loginBtn">
        <div>已有账号？<span class="specialCol">去登录</span></div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginInfo",
  data() {
    return {
      list: {
        fwmAccount: "",
        userName: "",
        sex: "",
        email: "",
        emailCode: "",
        entryDate: "",
        mobileCode: "",
        qqAccount: "",
        identityId: "",
        regionCode: "",
        employeeJob: "",
        employeeNature: "",
        trainingDate: "",
        trainingTeacher: ""
      },
      btnDisabled: true,
      infoErrorEmai: "",
      jobNumberFlag: false,
      nameFlag: false,
      emailFlag: false,
      phoneNumberFlag: false,
      areaFlag: false,
      identityIdFlag: false,
      lookUp: [],
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() >= Date.now();
        }
      }
    };
  },
  mounted() {
    this.getLookUp();
  },
  methods: {
    inputEnterFwmAccount() {
      this.list.fwmAccount = this.list.fwmAccount.replace(/[^\d]+/g, "");
    },
    inputEnterMobileCode() {
      this.list.mobileCode = this.list.mobileCode.replace(/[^\d]+/g, "");
    },
    inputEnterqqAccount() {
      this.list.qqAccount = this.list.qqAccount.replace(/[^\d]+/g, "");
    },
    // 发送验证码
    sendNumber() {
      let vm = this;
      // if (this.list.email) {
      //   if (
      //     this.list.email.trim().substr(this.list.email.length - 15) !=
      //     "@isoftstone.com"
      //   ) {
      //     this.infoErrorEmai = "邮箱格式不正确";
      //     this.emailFlag = true;
      //     return;
      //   } else {
      //     this.emailFlag = false;
      //   }
      // }
      if (!this.list.email) {
        this.infoErrorEmai = "请输入邮箱";
        this.emailFlag = true;
        return;
      }
      if (vm.btnDisabled) {
        let data = {
          email: vm.list.email + "@isoftstone.com",
          fwmAccount: this.list.fwmAccount,
          userName: this.list.userName
        };
        vm.api
          .post("./complex/publicservice/fuser/emailCodeUserRegister", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                message: "请前往邮箱中查看验证码",
                type: "success"
              });
            }
          })
          .catch(function(error) {});
      }
      this.btnDisabled = false;
    },
    // 提交时的校验
    checkout() {
      if (!this.list.fwmAccount) {
        this.jobNumberFlag = true;
      } else {
        this.jobNumberFlag = false;
      }
      if (!this.list.userName) {
        this.nameFlag = true;
      } else {
        this.nameFlag = false;
      }
      if (!this.list.mobileCode) {
        this.phoneNumberFlag = true;
      } else if (this.list.mobileCode) {
        var myreg = /^[1][3,4,5,7,8,6,9][0-9]{9}$/;
        if (!myreg.test(this.list.mobileCode)) {
          this.phoneNumberFlag = true;
        } else {
          this.phoneNumberFlag = false;
        }
      }
      if (!this.list.regionCode) {
        this.areaFlag = true;
      } else {
        this.areaFlag = false;
      }
      if (this.list.identityId) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!reg.test(this.list.identityId)) {
          this.identityIdFlag = true;
        } else {
          this.identityIdFlag = false;
        }
      } else {
        this.identityIdFlag = false;
      }
      // if (!this.list.email) {
      //   this.infoErrorEmai = "请填写公司邮箱";
      //   this.emailFlag = true;
      // }
      // if (this.list.email) {
      // if ( //不要
      //   this.list.email.trim().substr(this.list.email.length - 15) !=
      //   "@isoftstone.com"
      // ) {
      //   this.infoErrorEmai = "邮箱格式不正确";
      //   this.emailFlag = true;
      // }
      // if (!this.list.emailCode) {
      //   this.infoErrorEmai = "请输入验证码";
      //   this.emailFlag = true;
      // } else {
      //   this.emailFlag = false;
      // }
      // }
    },
    // 注册提交按钮
    submitBtn() {
      let vm = this;
      vm.checkout();
      if (
        vm.jobNumberFlag ||
        vm.nameFlag ||
        vm.emailFlag ||
        vm.phoneNumberFlag ||
        vm.areaFlag ||
        vm.identityIdFlag
      ) {
        return;
      }
      let dataFlag = {};
      dataFlag = Object.assign({}, vm.list);
      //校验验证码正确与否
      if (vm.list.email) {
        dataFlag.email = vm.list.email + "@isoftstone.com";
      }

      vm.api
        .post("./complex/publicservice/fuser/insertUserRegister", dataFlag)
        .then(function(response) {
          if (response.status == 200) {
            vm.$router.push({
              name: "pageMessage",
              params: { name: "messageLogin" }
            });
          }
        })
        .catch(function(error) {});
    },
    // 跳转登录页面
    loginBtn() {
      this.$router.push({
        name: "login"
      });
    },
    // 获取lookUp值
    getLookUp() {
      let vm = this;
      vm.api
        .get(`./complex/publicservice/publicLookUp/allmap`)
        .then(response => {
          if (response.status == 200) {
            vm.lookUp = response.data;
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="less">
.LoginInfo {
  width: 1200px;
  //   height: 100%;
  .infoContent {
    width: 620px;
    // height: 100%;
    padding-bottom: 15px;
    margin: auto;
    .infoTitle {
      font-size: 28px;
      font-weight: 600;
      line-height: 40px;
      margin-top: 30px;
    }
    .infoExplain {
      line-height: 17px;
      margin-bottom: 15px;
      margin-top: 10px;
      color: rgba(0, 0, 0, 0.5);
    }
    .inputGroup {
      width: 620px;
      position: relative;
      margin-bottom: 15px;
      // .iconSymbol {
      //   color: red;
      //   margin-left: -14px;
      //   margin-right: 5px;
      //   margin-top: 10px;
      // }
      .iconSymbol {
        color: red;
        display: inline-block;
        width: 90px;
        margin: 10px 5px 0 0;
      }
      .iconTitle {
        margin-left: 5px;
        color: rgba(0, 0, 0, 0.65);
      }
      .noNeed {
        opacity: 0;
      }
    }
    .emailGroup {
      display: flex;
      .email {
        width: 300px;
        margin-left: 4px;
        margin-right: 5px;
        input {
          width: 300px;
          padding-right: 115px;
        }
      }
      .emailName {
        display: inline-block;
        margin-top: 8px;
        width: 105px;
        position: absolute;
        left: 285px;
        color: #c0c4cc;
      }
      .emailNumber {
        width: 90px;
        margin-right: 10px;
        margin-left: 10px;
      }
      .sendNumber {
        width: 84px !important;
        border-radius: 16px !important;
      }
    }
    .submitBtn {
      width: 400px !important;
      border-radius: 20px !important;
    }
    .el-input {
      width: 300px;
    }
    .infoError,
    .infoErrorEmai {
      color: red;
      position: absolute;
      left: 414px;
      top: 8px;
    }
    .infoErrorEmai {
      top: 36px;
    }
    .loginBtn {
      width: 120px;
      height: 24px;
      line-height: 24px;
      margin-top: 60px;
      margin-bottom: 100px;
      margin-left: 140px;
      cursor: pointer;
      .specialCol {
        color: #00cdca;
      }
    }
  }
}
</style>