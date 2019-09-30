<template>
  <div id="login">
    <div class="login-box">
      <div class="login-img"></div>
      <form class="login-content">
        <div class="login-box-logo">
          <img src="../../assets/img/logo.svg" />
        </div>
        <div class="login-title">欢迎进入培训系统</div>
        <!-- <div class="login-sub">请用已有账号登录：）</div> -->
        <div class="login-sub"></div>
        <div class="login-box-content">
          <div class="login-box-content-userName">
            <el-input v-model="userName" placeholder="员工工号"></el-input>
            <div class="point-userName" v-if="judgeUserName">
              请输入员工工号
            </div>
          </div>
          <div class="login-box-content-password">
            <el-input
              v-model="password"
              placeholder="请输入密码"
              type="password"
              @keyup.enter.native="loginBtn"
            ></el-input>
            <div class="point-password" v-if="judgePassword">请输入密码</div>
          </div>
          <div class="login-box-content-title">
            <div class="remember-password">
              <el-checkbox
                v-model="rememberPassword"
                label="记住账号"
              ></el-checkbox>
              <!-- <span class="password-title">记住账号</span> -->
            </div>
            <div class="forget-password" @click="forgetPassword">
              忘记密码？
            </div>
          </div>
          <div class="login-box-content-btn">
            <div @click="loginBtn" class="contact">登录</div>
            <div class="login-skip" @click="registration">注册通道</div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      activeIndex: "1",
      userName: "",
      password: "",
      judgeUserName: false,
      judgePassword: false,
      checkCode: "",
      rememberPassword: false
    };
  },

  methods: {
    // 忘记密码
    forgetPassword() {
      this.$router.push({
        name: "pageMessage",
        params: { name: "forgetPassword" }
      });
    },
    //跳转页面
    registration() {
      this.$router.push({
        name: "loginPage",
        params: { name: "registration" }
      });
    },

    handleSelect(key, keyPath) {
      this.activeIndex = "1";
      if (key == 2) {
        this.$message({
          showClose: true,
          message: "功能正在开发中 ，敬请期待~",
          type: "warning"
        });
      }
    },
    judge() {
      if (this.userName == "") {
        this.judgeUserName = true;
      }
      if (this.password == "") {
        this.judgePassword = true;
      }
    },
    loginBtn() {
      //判断账号密码是否填写
      this.judge();
      //有账号密码时触发登录
      if (!this.judgeUserName && !this.judgePassword) {
        let vm = this;
        let userObj = {};
        let data = {
          fwmAccount: this.userName,
          passWords: this.password
        };
        api
          .post(`./complex/publicservice/account/login`, data)
          .then(function(response) {
            if (response.data.code == 1) {
              //设置过期时间30分钟1800000
              let timestamp = new Date().getTime() + 1800000000000;
              //设置Storage时间
              // vm.setToken(response.data.data);
              vm.$store.commit("setToken", response.data.data);
              vm.$store.commit("setStorage", timestamp);
              //缓存账号
              if (vm.rememberPassword) {
                localStorage.setItem("userName", vm.userName);
              } else {
                if (localStorage.getItem("userName")) {
                  localStorage.removeItem("userName");
                }
              }
              //成功之后跳转不同页面
              if (response.data.message) {
                vm.$store.commit("getUser", response.data.message);
                location.href = location.origin + "/#/index";
              }
            } else {
              vm.$message({
                showClose: true,
                message: response.data.message,
                type: "error"
              });
            }
          })
          .catch(function(error) {
            if (error.code == 0) {
              vm.$message({
                showClose: true,
                message: error.message,
                type: "error"
              });
            }
          });
      }
    }
  },
  mounted() {
    this.userName = "";
    this.password = "";
    let userFlag = localStorage.getItem("userName");
    if (userFlag) {
      this.userName = userFlag;
    }
  },
  watch: {
    userName() {
      if (this.userName == "") {
        this.judgeUserName = true;
      } else {
        this.judgeUserName = false;
      }
    },
    password() {
      if (this.password == "") {
        this.judgePassword = true;
      } else {
        this.judgePassword = false;
      }
    }
  }
};
</script>

<style  lang="less">
#login {
  width: 100%;
  height: 100%;
  position: relative;
  background: rgba(234, 250, 250, 1);
  color: rgba(0, 0, 0, 0.65);
  .login-box {
    width: 1010px;
    height: 650px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .login-img {
      width: 100%;
      height: 100%;
      background: url("../../assets/img/logo-index.png") no-repeat;
    }
    .login-content {
      width: 300px;
      height: 470px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin-top: 46px;
      margin-left: 75px;
      .login-title {
        font-size: 28px;
        font-weight: 900;
        margin-top: 50px;
      }
      .login-sub {
        font-size: 12px;
        margin-top: 10px;
        margin-bottom: 20px;
      }
      .login-box-content {
        .login-box-content-userName,
        .login-box-content-password {
          position: relative;
          input {
            width: 300px;
            height: 40px;
          }
        }
        .point-password,
        .point-userName {
          position: absolute;
          top: 45px;
          left: 15px;
          color: red;
        }
        .login-box-content-password {
          margin-top: 24px;
          .yzm-box {
            font-size: 25px;
            width: 80px;
            height: 38px;
            line-height: 38px;
            text-align: center;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            position: absolute;
            top: 1px;
            left: 269px;
            cursor: pointer;
            background: #f1f1f1;
          }
        }
        .login-box-content-title {
          margin-top: 24px;
          height: 20px;
          .remember-password {
            float: left;
            .password-title {
              position: relative;
              left: -20px;
            }
          }
          .forget-password {
            float: right;
            cursor: pointer;
          }
        }
        .login-box-content-btn {
          // padding: 0px 50px;
          position: relative;
          .contact {
            width: 210px;
            height: 40px;
            background: #00cdca;
            color: #ffffff;
            border-radius: 20px;
            line-height: 40px;
            text-align: center;
            margin-top: 24px;
            cursor: pointer;
          }
          .login-skip {
            cursor: pointer;
            position: absolute;
            font-size: 14px;
            font-weight: 600;
            right: 0;
            top: 12px;
          }
        }
      }
    }
  }

  .yanzhengma_input {
    font-family: "Exo 2", sans-serif;
    border: 1px solid #fff;
    color: #fff;
    outline: none;
    border-radius: 12px;
    letter-spacing: 1px;
    font-size: 17px;
    font-weight: normal;
    background-color: rgba(82, 56, 76, 0.15);
    padding: 5px 0 5px 10px;
    margin-left: 30px;
    height: 30px;
    margin-top: 25px;
    border: 1px solid #e6e6e6;
  }
  .verification {
    border-radius: 12px;
    width: 100px;
    letter-spacing: 5px;
    margin-left: 50px;
    height: 40px;
    transform: translate(-15px, 0);
  }
  .captcha {
    height: 50px;
    text-align: justify;
  }
}
</style>
