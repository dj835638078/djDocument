<template>
  <div class="operateIndex" :style='($route.params.name == "forgetPassword" || $route.params.name == "messageLogin" || $route.params.name == "messagePassword") ? {minHeight:screenHeight+"px"} : ""'>
    <shade />
    <div class="headBox">
      <div class="headInfo">
          <div class="infoLeft">
              <img class="infoLogo" src="../../assets/img/logo-white.svg"></img>
              <div class="infoLine"></div>
              <div class="infoTitle">{{$route.params.name == "forgetPassword"? "重置密码" : "注册通道"}}</div>
          </div>
          <div class="infoRight" @click="toLogin">登录</div>
      </div>
    </div>
    <div class="forgetPasswordHead" v-if="$route.params.name == 'forgetPassword' && stepFlag"></div>
    <div class="contentBox">
        <div class="contentInfo">
            <forgetPassword v-if="$route.params.name == 'forgetPassword'"/>
            <registration v-if="$route.params.name == 'registration'"/>
            <message v-if="$route.params.name == 'messageLogin' || $route.params.name == 'messagePassword' "/>
        </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import forgetPassword from "./ForgetPassword";
import registration from "./LoginInfo";
import message from "./Message";
import Footer from "../public/Footer";
import shade from "../common/Shade";
export default {
  name: "operateIndex",
  data() {
    return {
      screenHeight: "100%",
      stepFlag: true
    };
  },
  mounted() {
    this.screenHeight = window.innerHeight;
    let vm = this;
    window.onresize = function() {
      vm.$nextTick(() => {
        vm.screenHeight = window.innerHeight;
      });
    };
  },
  components: {
    forgetPassword,
    registration,
    message,
    Footer,
    shade
  },
  methods: {
    toLogin() {
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>
<style lang="less">
.operateIndex {
  width: 100%;
  .forgetPasswordHead {
    height: 80px;
    width: 100%;
    background: #f5f5f5;
    float: left;
  }
  .headBox {
    height: 60px;
    width: 100%;
    background: #00cdca;
    .headInfo {
      width: 1200px;
      height: 60px;
      line-height: 60px;
      color: #fff;
      margin: auto;
      .infoLeft {
        float: left;
        .infoLogo {
          width: 132px;
          height: 32px;
          float: left;
          margin-top: 14px;
        }
        .infoLine {
          width: 2px;
          height: 20px;
          background: rgba(255, 255, 255, 1);
          opacity: 0.65;
          margin: 20px 20px 0 20px;
          float: left;
        }
        .infoTitle {
          font-size: 18px;
          float: left;
        }
      }
      .infoRight {
        float: right;
        font-size: 14px;
        cursor: pointer;
      }
    }
  }
  .contentBox {
    width: 100%;
    height: calc(100% - 120px);
    background: white;
    .contentInfo {
      width: 1200px;
      height: 100%;
      margin: auto;
    }
  }
}
</style>
