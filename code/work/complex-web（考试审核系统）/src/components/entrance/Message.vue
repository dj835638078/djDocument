<template>
  <div class="message">
    <div class="messageLogin" v-if="$route.params.name == 'messageLogin'">
      <img src="../../assets/img/login-success.png" />
      <div>您提交的信息管理员正在审核，</div>
      <div>审核后您的邮箱将会收到邮件。</div>
      <!-- <div>请点击邮件中内容激活后登录。</div> -->
    </div>
    <div class="messagePassword" v-if="$route.params.name == 'messagePassword'">
      <i class="el-icon-warning"></i>
      <div>
        <p>链接失效</p>
        <span>你访问的页面已失效，请重新认证</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  data() {
    return {};
  },
  mounted() {},
  components: {},
  methods: {}
};
</script>
<style lang="less">
.message {
  width: 1200px;
  height: 100%;
  .messageLogin {
    width: 200px;
    height: 400px;
    margin: auto;
    img {
      margin: 100px 0 38px 18px;
    }
    div {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
    }
  }
  .messagePassword {
    width: 290px;
    height: 100%;
    margin: auto;
    i {
      color: #f56c6c;
      font-size: 60px;
      float: left;
      margin-top: 100px;
    }
    div {
      margin-left: 70px;
      p {
        font-weight: 500px;
        margin-bottom: 10px;
        padding-top: 110px;
      }
      span {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
}
</style>
