<template>
  <div class="ForgetPassword">
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false"
      :center="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="dialogContent">
        <div class="contentBox">
          <img src="../../assets/img/reset-email.png" />
          <div class="dialogText">
            请访问邮件中给出的网页链接地址，<br />根据页面提示完成密码重置。
          </div>
        </div>
        <div class="main dialogConfirm" @click="dialogConfirm">确定</div>
      </div>
    </el-dialog>
    <div class="stepsBox">
      <el-steps :active="active" align-center v-if="$parent.stepFlag">
        <el-step title="填写公司邮箱"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <div class="contentDetailBox">
      <!-- 填写公司邮箱 -->
      <form class="fillInfo" v-if="active == 0.5">
        <div class="infoGroup">
          <div>员工工号：</div>
          <el-input
            v-model="jobNumber"
            placeholder="请输入员工工号"
            :disabled="showFlag"
            @keyup.native="inputEnterjobNumber"
            @change="inputEnterjobNumber"
            @blur="findTel"
            maxlength="7"
          ></el-input>
          <div class="textError" v-if="jobNumberFlag">请输入员工工号</div>
        </div>
        <div class="infoGroup">
          <div>手机号码：</div>
          <el-input v-model="tel" class="mail" disabled></el-input>
          <el-input
            v-model="email"
            placeholder="请输入手机验证码"
            class="yzmCode"
          ></el-input>
          <!-- 发送验证码 -->
          <div
            @click="sendYzm"
            :class="[btnDisabled ? 'main' : 'release', 'sendYzm']"
          >
            发送验证码
          </div>
          <!-- <span class="emailName">@isoftstone.com</span> -->
          <div class="textError" v-if="emailFlag">{{ errorEmailText }}</div>
        </div>
        <!-- 重置按钮 -->
        <div class="main resetBtn" @click="reset">下一步</div>
      </form>
      <!-- 设置新密码 -->
      <form class="setPassWord" v-if="active == 1.5">
        <div class="passwordTitlt">现在你可以重新设定BPO业务平台密码：</div>
        <div class="passwordGroup">
          <div class="inputTitle">新密码：</div>
          <el-input v-model="newPassword" type="password"></el-input>
          <div class="textInfo" v-if="judgeNewOne">
            {{ newPasswordOneText }}
          </div>
        </div>
        <div class="passwordGroup">
          <div class="inputTitle">确认密码：</div>
          <el-input v-model="confirmPassword" type="password"></el-input>
          <div class="textInfo" v-if="judgeNewTwo">
            {{ newPasswordTwoText }}
          </div>
        </div>

        <div class="passwordGroup yzmTotal">
          <div class="inputTitle">验证码：</div>
          <el-input
            v-model="picLyanzhengma"
            placeholder="请输入验证码"
            class="inputYzm"
            maxlength="4"
          ></el-input>
          <div v-if="judgeYzm" class="yzmErrorText">{{ judgeText }}</div>
          <div class="yzmBox" @click="createCode">{{ checkCode }}</div>
        </div>
        <div class="main submitBtn" @click="submitBtn">提交</div>
      </form>
      <!-- 完成 -->
      <div class="finish" v-if="active == 2.5">
        <img src="../../assets/img/reset-success.png" />
        <div class="resetText">重置密码成功</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgetPassword",
  data() {
    return {
      active: 0,
      jobNumber: "",
      email: "",
      newPassword: "",
      confirmPassword: "",
      jobNumberFlag: false,
      emailFlag: false,
      judgeYzm: false,
      judgeText: "请输入验证码",
      picLyanzhengma: "",
      checkCode: "",
      dialogVisible: false,
      errorEmailText: "请输入手机验证码",
      newPasswordOneText: "密码必须包是数字、字母、特殊字符8-16位长度",
      newPasswordTwoText: "新密码必须相同",
      judgeNewOne: false,
      judgeNewTwo: false,
      btnDisabled: true,
      tel: "",
      telFlag: "",
      showFlag: false
    };
  },
  methods: {
    inputEnterjobNumber(e) {
      this.jobNumber = this.jobNumber.replace(/[^\d]+/g, "");
      if (e.keyCode == 13) {
        this.findTel();
      }
    },
    findTel() {
      let vm = this;
      if (vm.jobNumber) {
        vm.tel = "";
        vm.api
          .get(
            "./complex/publicservice/fuser/find/mobile?fwmAccount=" +
              vm.jobNumber
          )
          .then(function(response) {
            if (response.status == 200) {
              let str = response.data.data;
              vm.telFlag = response.data.data;
              vm.tel =
                str.substring(0, 4) +
                "****" +
                str.substring(str.length - 4, str.length);
            } else {
            }
          })
          .catch(function(error) {});
      }
    },
    sendYzm() {
      let vm = this;
      vm.emailFlag = false;
      if (!vm.btnDisabled) {
        return;
      }
      if (!vm.jobNumber) {
        vm.jobNumberFlag = true;
        return;
      } else {
        vm.jobNumberFlag = false;
      }
      let data = {
        mobileCode: vm.telFlag,
        fwmAccount: vm.jobNumber
      };
      if (vm.telFlag) {
        vm.api
          .post("./complex/publicservice/fuser/replacePwd", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.btnDisabled = false;
              vm.showFlag = true;
              vm.$message({
                message: "验证码已发送，请查看手机【该验证码30分钟内有效】。",
                type: "success"
              });
            }
          })
          .catch(function(error) {});
      }
    },
    // 下一步
    reset() {
      let vm = this;
      //   校验必填
      if (!vm.jobNumber) {
        vm.jobNumberFlag = true;
      } else {
        vm.jobNumberFlag = false;
      }
      if (!vm.email) {
        vm.emailFlag = true;
      }
      // else if (
      //   vm.email &&
      //   vm.email.trim().substr(vm.email.length - 15) != "@isoftstone.com"
      // ) {
      //   vm.emailFlag = true;
      //   vm.errorEmailText = "请输入以@isoftstone.com结尾的公司邮箱";
      // }
      else {
        vm.emailFlag = false;
      }
      if (vm.jobNumberFlag || vm.emailFlag) {
        return;
      }
      // let url = location.href.split("#")[0] + "#/pageMessage/forgetPassword";
      let data = {
        fwmAccount: vm.jobNumber,
        randCode: vm.email
        // linkUrl: url,
        // fwmAccount: vm.jobNumber,
        // fwmMail: vm.email + "@isoftstone.com"
      };
      vm.api
        .post("./complex/publicservice/fuser/checkEmail", data)
        .then(function(response) {
          if (response.status == 200) {
            // vm.dialogVisible = true;
            vm.active = 1.5;
            vm.newPassword = "";
            vm.confirmPassword = "";
            vm.picLyanzhengma = "";
          }
        })
        .catch(function(error) {});
    },
    submitBtn() {
      let vm = this;
      vm.testnewPasswordOne();
      vm.testnewPasswordTwo();
      vm.testYzm(true);
      if (vm.judgeNewTwo || vm.judgeNewOne || vm.judgeYzm) {
        return;
      }
      let data = {
        fwmAccount: vm.jobNumber,
        passWordsNew: this.newPassword,
        sessioncode: vm.email
      };
      vm.api
        .post("./complex/publicservice/fuser/updateUserPWd", data)
        .then(function(response) {
          if (response.status == 200) {
            vm.active = 2.5;
          }
        })
        .catch(function(error) {});
    },
    //验证码
    createCode() {
      //先清空验证码的输入
      this.code = "";
      this.checkCode = "";
      this.picLyanzhengma = "";
      //验证码的长度
      var codeLength = 4;
      //随机数
      var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
      //
      for (var i = 0; i < codeLength; i++) {
        //取得随机数的索引（0~35）
        var index = Math.floor(Math.random() * 10);
        //根据索引取得随机数加到code上
        this.code += random[index];
      }
      //把code值赋给验证码
      this.checkCode = this.code;
    },
    // 弹框确认按钮
    dialogConfirm() {
      this.dialogVisible = false;
      this.$router.push({
        name: "login"
      });
    },
    //判断新密码
    testnewPasswordOne() {
      let patrn = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/i;
      if (!this.newPassword) {
        this.judgeNewOne = true;
        this.newPasswordOneText = "请输入密码";
      } else if (this.newPassword && !patrn.exec(this.newPassword)) {
        this.judgeNewOne = true;
        this.newPasswordOneText = "密码必须包是数字、字母、特殊字符8-16位长度";
      } else {
        this.judgeNewOne = false;
      }
    },
    //判断新密码
    testnewPasswordTwo() {
      let patrn = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/i;
      if (!this.confirmPassword) {
        this.judgeNewTwo = true;
        this.newPasswordTwoText = "请输入密码";
      } else if (this.confirmPassword) {
        if (this.newPassword === this.confirmPassword) {
          this.judgeNewTwo = false;
        } else {
          this.judgeNewTwo = true;
          this.newPasswordTwoText = "新密码输入不一致";
        }
      }
    },
    testYzm(flag) {
      if (!this.picLyanzhengma) {
        this.judgeYzm = true;
        this.judgeText = "请输入验证码";
      }
      if (this.picLyanzhengma && this.picLyanzhengma.length <= 3) {
        this.judgeYzm = true;
        this.judgeText = "";
      }
      if (this.picLyanzhengma && this.picLyanzhengma.length <= 3 && flag) {
        this.judgeYzm = true;
        this.judgeText = "请输入正确的验证码";
      }
      if (this.picLyanzhengma.length > 3) {
        if (this.picLyanzhengma == this.checkCode) {
          this.judgeYzm = false;
        } else {
          this.judgeYzm = true;
          this.judgeText = "验证码错误";
        }
      }
    }
  },
  mounted() {
    let vm = this;
    // if (
    //   vm.$route.query.uuid
    //   // vm.$route.query.email &&
    //   // vm.$route.query.fwm_account &&
    //   // vm.$route.query.uuid
    // ) {
    //   vm.$parent.stepFlag = false;
    //   let url = location.href.split("#")[0] + "#/pageMessage/forgetPassword";
    //   let data = {
    //     linkUrl: url,
    //     fwmAccount: vm.$route.query.fwm_account,
    //     fwmMail: vm.$route.query.email,
    //     linkUuid: vm.$route.query.uuid
    //   };
    //   vm.api
    //     .post("./complex/publicservice/fuser/checkEmail", data)
    //     .then(function(response) {
    //       if (response.status == 200) {
    //         vm.$parent.stepFlag = true;
    //         vm.active = 1.5;
    //       }
    //     })
    //     .catch(function(error) {
    //       vm.$router.push({
    //         name: "pageMessage",
    //         params: { name: "messagePassword" }
    //       });
    //     });
    // } else {
    //   vm.$parent.stepFlag = true;
    vm.active = 0.5;
    // }
  },
  created() {
    this.createCode();
  },
  watch: {
    picLyanzhengma() {
      this.testYzm();
    },
    newPassword() {
      this.testnewPasswordOne();
    },
    confirmPassword() {
      this.testnewPasswordTwo();
    }
  }
};
</script>
<style lang="less">
.ForgetPassword {
  height: 100%;
  .el-dialog {
    height: 200px;
    .el-dialog__body {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .dialogContent {
        display: flex;
        flex-direction: column;
        align-items: center;
        .contentBox {
          display: flex;
          min-height: 50px !important;
          margin-bottom: 40px;
          img {
            width: 50px;
            height: 50px;
          }
          .dialogText {
            margin-left: 20px;
            margin-top: 10px;
            height: 50px;
            line-height: 18px;
          }
        }
      }
    }
  }
  .stepsBox {
    height: 80px;
    width: 1200px;
    position: absolute;
    .el-steps {
      width: 900px;
      margin: auto;
      margin-top: 15px;
      .el-step__main {
        width: 280px;
      }
      .el-step__icon.is-text {
        width: 28px;
        height: 28px;
        background: #dadada;
        border: none;
        .el-step__icon-inner {
          color: white;
        }
      }
      .is-finish {
        .el-step__icon.is-text {
          background: #00cdca;
        }
      }
      .el-step__head.is-finish {
        color: #00cdca;
        border-color: #00cdca;
      }
      .el-step__title {
        color: rgba(0, 0, 0, 0.65);
      }
      .el-step__head {
        width: 94%;
      }
      .el-step.is-center .el-step__line {
        left: 56%;
        top: 13px;
      }
    }
  }
  .contentDetailBox {
    width: 1200px;
    height: 100%;
    .fillInfo {
      width: 300px;
      height: 250px;
      position: absolute;
      left: 50%;
      margin-left: -150px;
      top: 220px;
      .infoGroup {
        margin: 10px 0 25px 0;
        position: relative;
        .el-input {
          margin: 10px 0;
        }
        .textError {
          color: red;
          position: absolute;
        }
        .sendYzm {
          position: absolute;
          width: 90px !important;
          right: -100px;
          top: 24px;
        }
        .yzmCode {
          position: absolute;
          right: 0;
          top: 14px;
          width: 140px;
        }
        .mail {
          input {
            width: 140px;
          }
        }
        .emailName {
          display: inline-block;
          margin-top: -33px;
          width: 105px;
          position: absolute;
          left: 185px;
          top: 66px;
          color: #c0c4cc;
        }
      }
      .resetBtn {
        margin-left: 114px;
      }
    }
    .setPassWord {
      width: 460px;
      height: 270px;
      position: absolute;
      left: 50%;
      margin-left: -230px;
      top: 220px;
      .passwordTitlt {
        height: 24px;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
      }
      .passwordGroup {
        margin: 10px 0 35px 0;
        height: 32px;
        position: relative;
        display: flex;
        .inputTitle {
          width: 110px;
          height: 32px;
          line-height: 32px;
        }
        .el-input {
          //   margin: 10px 0;
        }
        .textError {
          color: red;
          position: absolute;
        }
        .textInfo {
          position: absolute;
          margin-left: 86px;
          left: 0px;
          top: 40px;
          color: red;
        }
      }
      .yzmTotal {
        .yzmBox {
          font-size: 25px;
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          position: absolute;
          top: 1px;
          right: 1px;
          cursor: pointer;
          background: #f1f1f1;
        }
        .yzmErrorText {
          position: absolute;
          top: 42px;
          left: 86px;
          color: red;
        }
      }
      .submitBtn {
        margin-left: 216px;
      }
    }
    .finish {
      width: 460px;
      height: 200px;
      position: absolute;
      left: 50%;
      margin-left: -230px;
      top: 250px;
      display: flex;
      align-items: center;
      flex-direction: column;
      .resetText {
        text-align: center;
        font-size: 18px;
        font-weight: 500;
        margin-top: 25px;
      }
    }
  }
}
</style>