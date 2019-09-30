<template>
  <div class="passwordModify">
    <div class="passwordModify-box">
      <div class="passwordModify-box-left">
        <img src="../../../assets/img/print-3.jpg" />
      </div>
      <div class="passwordModify-box-right">
        <div class="abox">
          <span class="abox-lableName"><span>*</span>用户账号：</span>
          <div class="input-box">
            <el-input
              v-model="list.fwmAccount"
              maxlength="20"
              placeholder="请填写用户姓名"
              :disabled="true"
            ></el-input>
          </div>
          <div class="abox">
            <span class="abox-lableName"><span>*</span>旧密码：</span>
            <div class="input-box">
              <el-input
                v-model="list.oldPassword"
                maxlength="20"
                placeholder="请填写旧密码"
                type="password"
              ></el-input>
            </div>
            <div
              class="error-point"
              v-if="judgeOld"
            >请填写旧密码</div>
          </div>

          <div class="abox">
            <span class="abox-lableName"><span>*</span>新密码：</span>
            <div class="input-box">
              <el-input
                maxlength="20"
                v-model="list.newPasswordOne"
                placeholder="请填写新密码"
                type="password"
              ></el-input>
            </div>
            <div
              class="error-point"
              v-if="judgeNewOne"
            >{{newPasswordOneText}}</div>
          </div>
          <div class="abox">
            <span class="abox-lableName"><span>*</span>确认密码：</span>
            <div class="input-box">
              <el-input
                maxlength="20"
                v-model="list.newPasswordTwo"
                placeholder="请填写新密码"
                type="password"
              ></el-input>
            </div>
            <div
              class="error-point"
              v-if="judgeNewTwo"
            >{{newPasswordTwoText}}</div>
          </div>
        </div>
        <div class="clear"></div>
        <div style="text-align:right;margin-top:20px;overflow:hidden;width:93%;height:50px;">
          <div
            style="margin-left:50%"
            class="new"
            @click="storage"
          ><i class="fa fa-file-text-o"></i>保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import api from "@/api";
export default {
  name: "passwordModify",
  data() {
    return {
      judgeOld: false,
      judgeNewOne: false,
      judgeNewTwo: false,
      newPasswordOneText: "请填写新密码",
      newPasswordTwoText: "请填写新密码",
      list: {
        fwmAccount: "",
        oldPassword: "",
        newPasswordOne: "",
        newPasswordTwo: ""
      }
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    let obj = this.list;
    obj.fwmAccount = this.userInfo.fwmAccount;
  },
  watch: {
    //userInfo
    userInfo() {
      let obj = this.list;
      obj.fwmAccount = this.userInfo.fwmAccount;
    },
    //判断旧密码
    "list.oldPassword"() {
      this.testOldPassword();
    },
    "list.newPasswordOne"() {
      this.testnewPasswordOne();
    },
    "list.newPasswordTwo"() {
      this.testnewPasswordOne();
    }
  },
  methods: {
    storage() {
      let obj = this.list;
      let vm = this;
      //判断是否填写新密码
      this.testOldPassword();
      this.testnewPasswordOne();
      if (!this.judgeOld && !this.judgeNewOne && !this.judgeNewTwo) {
        let data = {
          fwmAccount: this.list.fwmAccount,
          passWords: this.list.oldPassword,
          passWordsNew: this.list.newPasswordOne
        };
        api
          .post("./manage/service/usermanage/updatepwd", data)
          .then(function(response) {
            if (response.status == 200) {
              localStorage.removeItem("time");
              localStorage.removeItem("token");
              vm.$router.push({ name: "login" });
            }
          })
          .catch(function(error) {});
      }
    },
    //判断旧密码
    testOldPassword() {
      if (!this.list.oldPassword) {
        this.judgeOld = true;
      } else {
        this.judgeOld = false;
      }
    },
    //判断新密码
    testnewPasswordOne() {
      let patrn = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/i;
      if (!patrn.exec(this.list.newPasswordOne)) {
        this.judgeNewOne = true;
        this.newPasswordOneText = "密码必须包是数字、字母、特殊字符8-16位长度";
      } else {
        this.judgeNewOne = false;
      }
      if (!patrn.exec(this.list.newPasswordTwo)) {
        this.judgeNewTwo = true;
        this.newPasswordTwoText = "密码必须包是数字、字母、特殊字符8-16位长度";
      } else {
        this.judgeNewTwo = false;
      }
      if (
        patrn.exec(this.list.newPasswordOne) &&
        patrn.exec(this.list.newPasswordTwo)
      ) {
        if (this.list.newPasswordOne === this.list.newPasswordTwo) {
        } else {
          this.judgeNewTwo = true;
          this.newPasswordTwoText = "新密码必须相同";
          this.judgeNewOne = true;
          this.newPasswordOneText = "新密码必须相同";
        }
      }
    }
  }
};
</script>

<style  lang="less">
.passwordModify {
  width: 100%;
  height: 100%;
  .passwordModify-box {
    width: 850px;
    margin: 0 auto;
    height: 100%;
    .passwordModify-box-left {
      width: 400px;
      height: 100%;
      float: left;
      img {
        width: 280px;
        height: 208px;
        margin-top: 40px;
        margin-left: 50px;
      }
    }
    .passwordModify-box-right {
      width: 341px;
      height: 100%;
      overflow: hidden;
      float: left;
      .abox {
        margin-top: 28px;
        width: 100%;
        float: left;
        position: relative;
        .abox-lableName {
          width: 76px;
          float: left;
          line-height: 32px;
          span {
            color: red;
            font-size: 14px;
          }
        }
        .error-point {
          position: absolute;
          left: 76px;
          top: 35px;
          color: red;
          font-size: 12px;
        }
        .input-box {
          float: left;
          width: calc(100% - 101px);
          margin-right: 25px;
          .el-select,
          .el-select--small,
          .el-date-editor {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
