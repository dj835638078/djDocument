<template>
  <div class="approvalDetail" :style="{ minHeight: detailHeight + 'px' }">
    <el-dialog
      title="驳回"
      :visible.sync="rejectDialogShow"
      width="400px"
      center
      class="rejectDialog"
      @close="closeReject"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-input
        v-model="rejectReason"
        placeholder="请填写驳回原因，最多输入200字"
        maxlength="200"
        type="textarea"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <div class="dialogShow-footer footerAdd" @click="rejectConfirm">
          确定
        </div>
        <div class="dialogShow-footer" @click="rejectCancel">
          取消
        </div>
      </span>
    </el-dialog>
    <departdialog
      :dialogShow="dialogShow"
      :departmentList="departmentList"
      @dialogConfirm="dialogConfirm"
      @dialogCancel="dialogCancel"
    />
    <!-- <div class="approvalTitle">
      <div class="titleContent">{{ approvalTitle }}</div>
    </div>
    <div class="main approvalBtn" @click="goBack()">
      返回列表
    </div> -->
    <div class="informationAddTitle">
      <div class="line"></div>
      <div class="title">{{ approvalTitle }}</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="approvalContent">
      <div class="contentTitle">员工信息：</div>
      <div class="contentInfo">
        <Personal :personalList="manInfoList" :showFlag="isChecked" />
      </div>
      <div class="contentTitle" v-if="!isChecked">所属部门：</div>
      <div class="contentBranch" v-if="!isChecked">
        <div class="inputGroup">
          <span class="iconSymbol"
            >*<span class="iconColor">所属部门：</span></span
          >
          <el-input
            v-model="department"
            placeholder="请选择所属部门"
            @focus="departmentFocus"
          ></el-input>
          <div class="infoError" v-if="departmentFlag">请选择所属部门</div>
        </div>
        <div class="inputGroup">
          <span class="iconSymbol iconSymbolAdd"
            >*<span class="iconColor">角色：</span></span
          >
          <el-select
            v-model="role"
            placeholder="请选择角色"
            multiple
            style="width:270px"
          >
            <el-option
              v-for="(item, index) in roleList"
              :label="item.areaCode"
              :value="item.roleName"
              :key="index"
            >
            </el-option>
          </el-select>
          <div class="infoError infoErrorAdd" v-if="roleFlag">请选择角色</div>
        </div>
        <div class="inputGroup" style="margin-right: 0px;">
          <span class="iconSymbol" style="width: 90px;"
            >*<span class="iconColor">上级领导：</span></span
          >
          <Human
            val="superiorAccount"
            :showYN="superiorAccount"
            :result="resultNum"
          />
          <div class="infoError" v-if="superiorAccountFlag">请输入上级领导</div>
        </div>
        <div class="btnList">
          <div class="main operateBtn" @click="pass()">
            通过
          </div>
          <div class="main operateBtn" @click="reject()">
            驳回
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Personal from "../public/Personal";
import departdialog from "./departdialog";
import Human from "../public/Human";
export default {
  data() {
    return {
      resultNum: "1",
      approvalTitle: "待审批",
      departmentFlag: false,
      roleFlag: false,
      role: "",
      roleList: [],
      departmentList: [],
      department: "",
      dialogShow: false,
      regionCodeFlag: "",
      rejectDialogShow: false,
      rejectReason: "",
      superiorAccount: "",
      superiorAccountFlag: false
    };
  },
  props: ["manInfoList", "isChecked"],
  components: { Personal, departdialog, Human },
  computed: { ...mapState(["detailHeight", "userInfo"]) },
  mounted() {
    this.getRole();
    this.getDepartment();
    if (this.isChecked) {
      this.approvalTitle = "已审批";
    }
  },
  watch: {
    department(newVal, oldVal) {
      if (newVal) {
        this.departmentFlag = false;
      }
    },
    role(newVal, oldVal) {
      if (newVal && newVal.length) {
        this.roleFlag = false;
      }
    },
    superiorAccount(newVal, oldVal) {
      if (newVal) {
        this.superiorAccountFlag = false;
      }
    },
    "userInfo.regionCode"(newVal, oldVal) {
      if (newVal) {
        this.getDepartment();
      }
    }
  },
  methods: {
    // 返回列表
    goBack() {
      // this.$router.go(-1); //返回上一层
      this.$parent.showDetail = true;
    },
    // 通过
    pass() {
      if (!this.department) {
        this.departmentFlag = true;
      }
      if (!this.role.length) {
        this.roleFlag = true;
      }
      if (!this.superiorAccount) {
        this.superiorAccountFlag = true;
      }
      if (this.departmentFlag || this.roleFlag || this.superiorAccountFlag) {
        return;
      }
      let roles = [];
      for (var i = 0; i < this.role.length; i++) {
        let obj = {};
        obj.roleName = this.role[i];
        roles.push(obj);
      }
      let data = {
        fwmAccount: this.manInfoList.fwmAccount,
        regionCode: this.regionCodeFlag,
        roles: roles,
        superiorAccount: this.superiorAccount
      };
      let vm = this;
      vm.api
        .post(`./complex/service/fuser/approvedAgree`, data)
        .then(response => {
          if (response.status == 200) {
            vm.$parent.showDetail = true;
            vm.$parent.getApprovalListOne("goFirst");
          }
        })
        .catch(error => {});
    },
    // 驳回
    reject() {
      this.rejectDialogShow = true;
    },
    // 获取角色接口
    getRole() {
      let vm = this;
      vm.api
        .get(`./complex/service/common/rolefilter/alllist`)
        .then(response => {
          if (response.status == 200) {
            vm.roleList = response.data;
          }
        })
        .catch(error => {});
    },
    // 获取部门
    getDepartment() {
      if (this.userInfo.regionCode) {
        let vm = this;
        let attr = {
          id: "id",
          label: "label",
          regioncode: "regioncode",
          parentcode: "parentcode"
        };
        vm.api
          .get(
            `./complex/service/regionmanage/findChildRegion?regioncode=${
              vm.userInfo.regionCode
            }`
          )
          .then(response => {
            if (response.status == 200) {
              vm.departmentList = vm.tools.toTreeDataOrg(
                response.data,
                attr,
                "1"
              );
            }
          })
          .catch(error => {});
      }
    },
    // 部门信息弹框确定按钮
    dialogConfirm(chckedData) {
      let vm = this;
      if (!chckedData) {
        vm.dialogShow = false;
        return;
      }
      vm.department = chckedData.label;
      vm.regionCodeFlag = chckedData.regioncode;
      vm.dialogShow = false;
    },

    // 部门信息弹框取消按钮
    dialogCancel() {
      this.dialogShow = false;
    },
    departmentFocus() {
      this.dialogShow = true;
    },
    // 驳回弹框按钮确认
    rejectConfirm() {
      let vm = this;
      if (!vm.rejectReason) {
        vm.$message({
          message: "请填写驳回原因",
          type: "warning"
        });
        return;
      }
      let data = {
        fwmAccount: this.manInfoList.fwmAccount,
        approvalOpinion: vm.rejectReason
      };
      vm.api
        .post(`./complex/service/fuser/approvedReject`, data)
        .then(response => {
          if (response.status == 200) {
            vm.$parent.showDetail = true;
            vm.$parent.getApprovalListOne("goFirst");
          }
        })
        .catch(error => {});
    },
    // 驳回弹框取消
    rejectCancel() {
      this.rejectDialogShow = false;
    },
    closeReject() {
      this.rejectReason = "";
    }
  }
};
</script>

<style scoped lang="less">
.approvalDetail /deep/ .el-dialog__body {
  text-align: center;
  height: 280px;
  background: #f5f7fa;
  overflow-y: auto;
}
.rejectDialog /deep/ .el-dialog__body {
  height: 120px;
}
.approvalDetail /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.approvalDetail /deep/ textarea {
  height: 120px !important;
}
.approvalDetail {
  box-sizing: border-box;
  padding: 0 0 100px 0;
  .informationAddTitle {
    overflow: hidden;
    margin-top: 18px;
    .line {
      width: 2px;
      height: 18px;
      background: rgba(0, 205, 202, 1);
      float: left;
      //margin-top: 5px;
      margin-right: 5px;
    }
    .title {
      width: 145px;
      //height: 29px;
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      //line-height: 30px;
      float: left;
    }
  }
  .approvalTitle {
    height: 60px;
    width: 100%;
    left: 0;
    background: rgba(245, 245, 245, 1);
    position: absolute;
    .titleContent {
      width: 1200px;
      height: 100%;
      margin: auto;
      font-size: 22px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 30px;
      margin-top: 13px;
    }
  }
  .approvalBtn {
    margin-top: 72px !important;
    margin-left: 1128px;
  }
  .approvalContent {
    box-sizing: border-box;
    padding-top: 70px;
    .contentTitle {
      height: 23px;
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 22px;
      margin: 25px 0;
    }
    .contentBranch {
      width: 100%;
      height: auto;
      .inputGroup {
        width: 30%;
        float: left;
        position: relative;
        display: flex;
        margin-right: 50px;
        .iconSymbol {
          color: red;
          display: inline-block;
          width: 120px;
          margin-top: 7px;
          .iconColor {
            color: rgba(0, 0, 0, 0.65);
            margin-left: 4px;
          }
        }
        .iconSymbolAdd {
          width: 64px;
        }
        .infoError {
          color: red;
          position: absolute;
          top: 40px;
          left: 88px;
        }
        .infoErrorAdd {
          left: 64px;
        }
      }
      .btnList {
        width: 100%;
        padding-top: 50px;
        display: flex;
        justify-content: center;
        .operateBtn {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>