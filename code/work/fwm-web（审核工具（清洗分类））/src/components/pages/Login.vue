<template>
  <div id="login">
    <div class="login-img"></div>
    <div class="login-box">
      <div class="login-box-logo">
        <img src="../../assets/img/logo-login.svg" />
      </div>
      <div class="login-box-nav" style="height:25px;">
        <!--<el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item
            index="1"
            style="margin-left:80px;margin-right:50px;height: 47px;"
          >密码登录</el-menu-item>
          <el-menu-item
            index="2"
            style="height: 47px;"
          >手机号登录</el-menu-item>
        </el-menu>-->
      </div>
      <div class="login-box-content">
        <div class="login-box-content-userName">
          <el-input
            v-model="userName"
            placeholder="请输入账号或手机号"
          ></el-input>
          <div class="point-userName" v-if="judgeUserName">请输入账号</div>
        </div>
        <div class="login-box-content-password">
          <el-input
            v-model="password"
            placeholder="请输入密码"
            type="password"
          ></el-input>
          <div class="point-password" v-if="judgePassword">请输入密码</div>
        </div>

        <div class="login-box-content-yzm">
          <el-input
            @keyup.enter.native="loginBtn"
            v-model="picLyanzhengma"
            placeholder="请输入验证码"
          ></el-input>
          <div v-if="judgeYzm" class="point-userName">{{ judgeText }}</div>
          <div class="yzm-box" @click="createCode">{{ checkCode }}</div>
        </div>
        <!--<div class="login-box-content-title">
          <div>忘记密码</div>
        </div>-->
        <div class="login-box-content-btn">
          <div @click="loginBtn" class="contact">登录</div>
        </div>
      </div>
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
      judgeYzm: false,
      judgeText: "请输入验证码",
      picLyanzhengma: "",
      checkCode: ""
    };
  },
  created() {
    this.createCode();
  },
  methods: {
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
      if (this.picLyanzhengma == "") {
        this.judgeYzm = true;
        this.judgeText = "请输入验证码";
      }
      if (this.picLyanzhengma.length < 4) {
        this.judgeYzm = true;
        this.judgeText = "验证码错误";
      }
    },
    loginBtn() {
      //判断账号密码是否填写
      this.judge();
      //有账号密码时触发登录
      if (!this.judgeYzm && !this.judgeUserName && !this.judgePassword) {
        let vm = this;
        let data = {
          fwmAccount: this.userName,
          passWords: this.password,
          //验证码
          sessioncode: ""
        };
        api
          .post(`./manage/publicservice/account/login`, data)
          .then(function(response) {
            if (response.data.code == 1) {
              //设置过期时间30分钟1800000
              let timestamp = new Date().getTime() + 1800000000;
              //设置Storage时间
              // vm.setToken(response.data.data);
              vm.$store.commit("setToken", response.data.data);
              vm.$store.commit("setStorage", timestamp);
              vm.$store.commit(
                "validatePassWord",
                response.data.defaultPassWord
              );
              //成功之后跳转不同页面
              if (response.data.message) {
                vm.$store.commit("setPath", response.data.message);
                location.href = location.origin + "/#" + response.data.message;
              } else {
                location.href = location.origin + "/#/common";
              }
              //window.location.reload();
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
  mounted() {},
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
    },
    picLyanzhengma() {
      if (this.picLyanzhengma.length > 3) {
        if (this.picLyanzhengma == this.checkCode) {
          this.judgeYzm = false;
        } else {
          this.judgeYzm = true;
          this.judgeText = "验证码错误";
        }
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
  background: rgba(39, 63, 177, 1);
  .login-img {
    width: 742px;
    height: 517px;
    background: url("../../assets/img/timg.jpg") no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  .login-box {
    width: 400px;
    //height: 390px;
    height: 370px;
    background: #ffffff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    margin-left: 55%;
    .login-box-logo {
      height: 70px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        // margin: 24px 124px 0px 124px;
        margin-top: 24px;
        width: 200px;
      }
    }
    .login-box-nav {
      width: 100%;
      height: 61px;
      .is-active {
        color: #597ef7;
      }
      .el-menu.el-menu--horizontal {
        border-bottom: none;
      }
    }
    .login-box-content {
      .login-box-content-userName,
      .login-box-content-password,
      .login-box-content-yzm {
        padding: 0px 50px;
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
        left: 50px;
        color: red;
      }
      .login-box-content-password,
      .login-box-content-yzm {
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
        padding-left: 295px;
        color: #1890ff;
        font-size: 14px;
        margin-top: 10px;
        div {
          cursor: pointer;
        }
      }
      .login-box-content-btn {
        padding: 0px 50px;
        .contact {
          width: 300px;
          height: 40px;
          background: #597ef7;
          color: #ffffff;
          border-radius: 5px;
          line-height: 40px;
          text-align: center;
          margin-top: 24px;
          cursor: pointer;
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
