
<template>
  <div class="header">
    <div class="header-left" @click="menuClick">
      <i class="fa fa-th-large" v-if="!menuLinkFlag"></i
      ><i class="fa fa-list-ul" v-else></i>
    </div>

    <div class="header-right">
      <!-- <div class="badge-icon">
        <el-badge
          :value="6"
          class="item"
          :max="99"
        >
          <i class="el-icon-bell"></i>
        </el-badge>
      </div> -->
      <div class="goOut">
        <i class="fa fa-sign-out" @click="handleOut">&nbsp;退出</i>
      </div>
      <div class="userName">
        {{ userInfo.userName ? userInfo.userName : "" }}
      </div>
      <div class="userImg" v-if="userInfo.sex == 'M'">
        <img :src="setImgM" alt="头像" />
      </div>
      <div class="userImg" v-if="userInfo.sex == 'F'">
        <img :src="setImgF" alt="头像" />
      </div>
    </div>
    <div v-if="validate">
      <div class="revise-box" v-if="validate != 'N'">
        <div class="revise-box-min">
          <div class="interval-top"></div>
          <div class="revise-box-content">
            <div class="revise-box-content-title">修改初始密码</div>
            <div class="revise-box-content-point">
              <i class="fa fa-exclamation-circle"></i
              >尊敬的用户，为保障您的信息安全，请重置密码后再次登录！
            </div>
            <div class="abox">
              <span class="abox-lableName"><span>*</span>新密码：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="newPasswordOne"
                  placeholder="请填写新密码"
                  type="password"
                ></el-input>
              </div>
              <div class="error-point" v-if="judgeNewOne">
                {{ newPasswordOneText }}
              </div>
            </div>
            <div class="abox">
              <span class="abox-lableName"><span>*</span>确认密码：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="newPasswordTwo"
                  placeholder="请填写新密码"
                  type="password"
                ></el-input>
              </div>
              <div class="error-point" v-if="judgeNewTwo">
                {{ newPasswordTwoText }}
              </div>
            </div>
            <div class="clear"></div>
            <div class="interval-bottom"></div>
            <div class="revise-box-content-submit" @click="storage">提交</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import defaultImgM from "../../assets/img/userM.jpg";
import defaultImgF from "../../assets/img/userF.jpg";
export default {
  data() {
    return {
      setImgM: defaultImgM,
      setImgF: defaultImgF,
      newPasswordOne: "",
      newPasswordTwo: "",
      judgeNewOne: false,
      judgeNewTwo: false,
      newPasswordOneText: "请填写新密码",
      newPasswordTwoText: "请填写新密码"
    };
  },
  computed: {
    ...mapState(["userInfo", "menuLinkFlag", "validate"])
  },
  watch: {
    newPasswordOne() {
      this.testnewPasswordOne();
    },
    newPasswordTwo() {
      this.testnewPasswordOne();
    },
    userInfo() {
      if (this.userInfo.photoId) {
        this.setImgM =
          location.origin +
          "/manage/publicservice/file/download?fId=" +
          this.userInfo.photoId;
        this.setImgF =
          location.origin +
          "/manage/publicservice/file/download?fId=" +
          this.userInfo.photoId;
      }
    }
  },
  methods: {
    ...mapMutations([
      "changeMenu",
      "setLookUp",
      "setLookUpAdd",
      "setUseMap",
      "setHeight"
    ]),
    storage() {
      let vm = this;
      //判断是否填写新密码
      this.testnewPasswordOne();
      if (!this.judgeNewOne && !this.judgeNewTwo) {
        let data = {
          fwmAccount: this.userInfo.fwmAccount,
          passWords: this.userInfo.defaultPassWord,
          passWordsNew: this.newPasswordOne
        };
        vm.api
          .post("./manage/service/usermanage/updatepwd", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                message: "密码修改成功",
                type: "success"
              });
              setTimeout(function() {
                localStorage.removeItem("time");
                localStorage.removeItem("token");
                vm.$router.push({ name: "login" });
                vm.setOut();
              }, 2000);
            }
          })
          .catch(function(error) {});
      }
    },
    testnewPasswordOne() {
      let patrn = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,16}$/i;
      if (!patrn.exec(this.newPasswordOne)) {
        this.judgeNewOne = true;
        this.newPasswordOneText = "密码必须包是数字、字母、特殊字符8-16位长度";
      } else {
        this.judgeNewOne = false;
      }
      if (!patrn.exec(this.newPasswordTwo)) {
        this.judgeNewTwo = true;
        this.newPasswordTwoText = "密码必须包是数字、字母、特殊字符8-16位长度";
      } else {
        this.judgeNewTwo = false;
      }
      if (patrn.exec(this.newPasswordOne) && patrn.exec(this.newPasswordTwo)) {
        if (this.newPasswordOne === this.newPasswordTwo) {
        } else {
          this.judgeNewTwo = true;
          this.newPasswordTwoText = "新密码必须相同";
          this.judgeNewOne = true;
          this.newPasswordOneText = "新密码必须相同";
        }
      }
    },
    //获取lookUp
    getLookUp() {
      let vm = this;
      vm.api
        .get(`./manage/service/lookup/allmap`)
        .then(function(response) {
          if (response.status == 200) {
            vm.setLookUp(response.data);
          }
        })
        .catch(function(error) {});
    },
    //获取图文视频lookUp
    getLookUpAdd() {
      let vm = this;
      vm.api
        .get(`./manage/service/pcommon/autolookup/allmap`)
        .then(function(response) {
          if (response.status == 200) {
            vm.setLookUpAdd(response.data);
          }
        })
        .catch(function(error) {});
    },
    //获取useMap
    getUseMap() {
      let vm = this;
      vm.api
        .get(`./manage/service/usermanage/allmap`)
        .then(function(response) {
          if (response.status == 200) {
            vm.setUseMap(response.data);
          }
        })
        .catch(function(error) {});
    },
    menuClick() {
      this.changeMenu();
    },
    setOut() {
      let vm = this;

      vm.api
        .get(`./manage/service/account/logout`)
        .then(function(response) {
          if (response.status == 200) {
            // localStorage.removeItem("time");
            // localStorage.removeItem("token");
            // vm.$router.push({ name: "login" });
            vm.$router.push({ name: "login" });
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
    },
    handleOut() {
      let vm = this;
      vm.$confirm("此操作将退出登录，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("time");
          vm.setOut();
          // localStorage.removeItem("token");
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.setHeight();
    this.getLookUp();
    this.getLookUpAdd();
    this.getUseMap();
  }
};
</script>

<style scoped lang="less">
.header-right /deep/ sup {
  right: 0;
}
.loginOut-head {
  margin-left: 10px;
}
.header {
  width: 100%;
  height: 54px;
  background: #ffffff;
  // box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
  // display: flex;
  .header-left {
    float: left;
    margin-left: 24px;
    margin-top: 18px;
    i {
      cursor: pointer;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  .header-right {
    float: right;
    margin-top: 8px;
    width: 800px;
    .badge-icon {
      float: left;
      margin-top: 15px;
    }
    .goOut {
      width: 80px;
      color: rgba(0, 0, 0, 0.65);
      float: right;
      height: 42px;
      line-height: 42px;
      i {
        cursor: pointer;
      }
    }
    .userName {
      height: 42px;
      float: right;
      line-height: 42px;
      margin-right: 30px;
      margin-left: 10px;
      color: rgba(0, 0, 0, 0.65);
    }
    .userImg {
      width: 34px;
      height: 34px;
      margin-top: 3px;
      float: right;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
.revise-box {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
  .revise-box-min {
    width: 100%;
    height: 100%;
    margin-top: 54px;
    background: #fff;
    .interval-top {
      width: 100%;
      height: 36px;
    }
    .revise-box-content {
      width: 586px;
      height: 310px;
      border: 1px solid rgba(232, 232, 232, 1);
      margin: auto;
      .revise-box-content-title {
        height: 22px;
        font-size: 16px;
        color: #5675f5;
        line-height: 22px;
        margin-top: 24px;
        text-align: center;
      }
      .revise-box-content-point {
        height: 22px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 22px;
        margin-top: 19px;
        text-align: center;
        i {
          color: #f5a623;
          margin-right: 10px;
        }
      }
      .interval-bottom {
        width: 100%;
        height: 29px;
      }
      .revise-box-content-submit {
        width: 320px;
        margin: auto;
        height: 32px;
        background: #597ef7;
        color: #fff;
        text-align: center;
        line-height: 32px;
        border-radius: 2px;
        cursor: pointer;
      }
    }
  }
}
.abox {
  margin-top: 28px;
  width: 60%;
  margin-left: 120px;
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
</style>
