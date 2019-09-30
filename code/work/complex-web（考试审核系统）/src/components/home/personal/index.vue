<template>
  <div class="personal" :style="{ height: pageHeight + 'px' }">
    <el-dialog
      title="提示"
      :visible.sync="tipShow"
      width="400px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
    >
      <span>请确认填写的信息真实无误~</span>
      <span slot="footer" class="dialog-footer">
        <div class="homeTip-footer" @click="infoConfirm">
          确定
        </div>
      </span>
    </el-dialog>
    <div class="personalTitle">
      <div class="line"></div>
      <div class="title">个人中心</div>
    </div>
    <div class="personalContent">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="个人资料" name="first" style="height:400px">
          <personal
            :personalList="personalList"
            :saveBtnFlag="saveBtnFlag"
            :department="department"
            :region="region"
            :entryDate="entryDate"
            :entryDateFlag="entryDateFlag"
            :roleNames="roleNames"
            :mobileCodeFlag="mobileCodeFlag"
            @cancelBtn="cancelBtn"
            @saveBtn="saveBtn"
          />
        </el-tab-pane>
        <el-tab-pane label="密码设置" name="second" class="secondContent">
          <!-- 设置新密码 -->
          <form class="setPassWord">
            <div class="passwordGroup">
              <div class="inputTitle">旧密码：</div>
              <el-input v-model="oldPassword" type="password"></el-input>
              <div class="textInfo" v-if="judgeNewOld">
                {{ PasswordOldText }}
              </div>
            </div>
            <div class="passwordGroup">
              <div class="inputTitle">新密码：</div>
              <el-input v-model="newPassword" type="password"></el-input>
              <div class="textInfo" v-if="judgeNewOne">
                {{ newPasswordOneText }}
              </div>
            </div>
            <div class="passwordGroup">
              <div class="inputTitle">确认新密码：</div>
              <el-input v-model="confirmPassword" type="password"></el-input>
              <div class="textInfo" v-if="judgeNewTwo">
                {{ newPasswordTwoText }}
              </div>
            </div>
            <div class="passwordTitlt">
              新密码要求：
            </div>
            <div class="passwordTitlt passwordTitltFont">
              密码必须包是数字、字母、特殊字符8-16位长度
            </div>
            <div class="main submitBtn" @click="submitBtn">保存</div>
          </form></el-tab-pane
        >
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import personal from "./Personal";
export default {
  data() {
    return {
      activeName: "first",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      PasswordOldText: "",
      newPasswordOneText: "",
      newPasswordTwoText: "",
      judgeNewOld: false,
      judgeNewOne: false,
      judgeNewTwo: false,
      personalList: {},
      saveBtnFlag: 0,
      department: "",
      region: "",
      entryDate: "",
      entryDateFlag: true,
      roleNames: "",
      tipShow: false,
      mobileCodeFlag: false
    };
  },
  components: { personal },
  computed: { ...mapState(["pageHeight", "userInfo"]) },
  mounted() {
    this.getPersonal();
  },
  methods: {
    // tab栏切换
    handleClick(tab, event) {
      let vm = this;
      vm.judgeNewOld = false;
      vm.judgeNewOne = false;
      vm.judgeNewTwo = false;
      vm.oldPassword = "";
      vm.newPassword = "";
      vm.confirmPassword = "";
      vm.PasswordOldText = "";
      vm.newPasswordOneText = "";
      vm.newPasswordTwoText = "";
    },
    // 获取个人资料
    getPersonal() {
      let vm = this;
      if (vm.userInfo.fwmAccount) {
        let data = {
          fwmAccount: vm.userInfo.fwmAccount
        };
        vm.api
          .post("./complex/service/fuser/findUserManageInfo", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.personalList = response.data;
              //渲染上级领导
              if (vm.personalList && vm.personalList.superiorAccount) {
                vm.personalList.superiorName = vm.tools.setName(
                  vm.personalList.superiorAccount
                );
              }
              // vm.entryDate = vm.tools.setFormTime(vm.personalList.entryDate, 0);
              if (vm.personalList.entryDate) {
                vm.entryDateFlag = true;
              } else {
                vm.entryDateFlag = false;
              }
              vm.roleNames =
                vm.personalList.roleNames ||
                vm.tools.setRoleName(vm.personalList.roles);
              vm.setRegionName();
              if (vm.personalList.email.indexOf("@isoftstone.com") != "-1") {
                vm.personalList.email = vm.personalList.email.replace(
                  "@isoftstone.com",
                  ""
                );
              }
            }
          })
          .catch(function(error) {});
      }
    },
    // 密码保存按钮
    submitBtn() {
      let vm = this;
      vm.testnewPasswordOne();
      vm.testnewPasswordTwo();
      if (!vm.oldPassword) {
        this.judgeNewOld = true;
        this.PasswordOldText = "请输入旧密码";
        return;
      }
      if (vm.judgeNewTwo || vm.judgeNewOne) {
        return;
      }
      let data = {
        fwmAccount: this.userInfo.fwmAccount,
        passWords: this.oldPassword,
        passWordsNew: this.newPassword
      };
      vm.api
        .post("./complex/service/usermanage/updatepwd", data)
        .then(function(response) {
          if (response.status == 200) {
            localStorage.removeItem("time");
            localStorage.removeItem("token");
            vm.$router.push({ name: "login" });
          }
        })
        .catch(function(error) {});
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
      } else if (this.newPassword == this.oldPassword) {
        this.judgeNewOne = true;
        this.newPasswordOneText = "新密码不应与旧密码一致";
      } else {
        this.judgeNewOne = false;
      }
    },
    //确认新密码
    testnewPasswordTwo() {
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
    //个人资料取消按钮
    cancelBtn() {
      this.getPersonal();
      this.saveBtnFlag = 0;
    },
    //个人资料保存按钮
    saveBtn() {
      if (
        !this.personalList.mobileCode ||
        this.personalList.mobileCode.length < 11
      ) {
        this.mobileCodeFlag = true;
        return;
      } else {
        this.mobileCodeFlag = false;
      }
      this.tipShow = true;
    },
    infoConfirm() {
      let vm = this;
      let data = JSON.parse(JSON.stringify(this.personalList));
      if (data.email) {
        data.email = data.email + "@isoftstone.com";
      }
      vm.api
        .post("./complex/service/fuser/updateUserInfo", data)
        .then(function(response) {
          if (response.status == 200) {
            vm.tipShow = false;
            vm.saveBtnFlag = 0;
            vm.getPersonal();
          }
        })
        .catch(function(error) {});
    },
    setRegionName() {
      let vm = this;
      vm.api
        .get(
          "./complex/service/property/find/value?path=fwm.conf.region.region_begin_show"
        )
        .then(response => {
          if (response.status == 200) {
            let code = response.data;
            let name = code.substring(0, code.length - 4) + "Name";
            vm.region = vm.personalList[name];
            let indexFlag = 0;
            let arr = [];
            let regionArr = [
              "levelOneRegionCode",
              "levelTwoRegionCode",
              "levelThreeRegionCode",
              "levelFourRegionCode",
              "levelFiveRegionCode",
              "levelSixRegionCode",
              "levelSenvenRegionCode",
              "levelEightRegionCode",
              "levelNineRegionCode",
              "levelTenRegionCode"
            ];
            for (var i = 0; i < regionArr.length; i++) {
              if (regionArr[i] == code) {
                arr.push(vm.personalList[name]);
                indexFlag = i;
              }
              if (i > indexFlag) {
                let codeAdd = regionArr[i];
                let nameAdd = codeAdd.substring(0, codeAdd.length - 4) + "Name";
                if (vm.personalList[nameAdd]) {
                  arr.push(vm.personalList[nameAdd]);
                }
              }
            }
            if (arr.length == 1) {
              vm.department = arr.join("/");
            } else {
              vm.department = arr.slice(1).join("/");
            }
          }
        })
        .catch(error => {});
    }
  },
  watch: {
    "userInfo.fwmAccount"(newVal, oldVal) {
      if (newVal) {
        this.getPersonal();
      }
    },
    newPassword() {
      this.testnewPasswordOne();
    },
    confirmPassword() {
      this.testnewPasswordTwo();
    },
    oldPassword(newVal, oldVal) {
      if (newVal) {
        this.judgeNewOld = false;
      }
    },
    personalList: {
      handler() {
        this.saveBtnFlag++;
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
.personalContent /deep/ .el-tabs__item.is-active {
  color: #00cdca;
}
.personalContent /deep/ .el-tabs__active-bar {
  background-color: #00cdca;
}
.personalContent /deep/ .el-tabs__item:hover {
  color: #00cdca;
}
.personal {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 0 80px 20px;
  .homeTip-footer {
    width: 80px;
    height: 30px;
    background: rgba(0, 205, 202, 1);
    border-radius: 2px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    display: inline-block;
  }
  .personalTitle {
    margin-top: 18px;
    .line {
      width: 2px;
      height: 22px;
      background: rgba(0, 205, 202, 1);
      float: left;
      margin-top: 5px;
      margin-right: 5px;
    }
    .title {
      width: 145px;
      height: 29px;
      font-size: 22px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 30px;
    }
  }
  .personalContent {
    .el-tabs {
      margin-top: 5px;
    }
    .personalInfo {
      display: flex;
      justify-content: space-between;
      .itemList {
        flex: 1;
        .itemOne {
          display: flex;
          height: 24px;
          margin-top: 20px;
          .title {
            flex: 120px 0 0;
          }
          .content {
            flex: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .secondContent {
      .setPassWord {
        width: 460px;
        height: 270px;
        .passwordTitlt {
          // height: 24px;
          // font-size: 14px;
          // font-weight: 400;
          // line-height: 24px;
          margin-bottom: 20px;
        }
        .passwordTitltFont {
          font-size: 12px;
        }
        .passwordGroup {
          margin: 10px 0 35px 0;
          height: 32px;
          position: relative;
          display: flex;
          .inputTitle {
            width: 120px;
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
            margin-left: 96px;
            top: 40px;
            left: 0;
            color: red;
          }
        }
        .submitBtn {
          margin-left: 216px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>