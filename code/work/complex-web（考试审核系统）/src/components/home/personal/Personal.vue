<template>
  <div class="personalInfo">
    <div class="itemList" style="margin-right: 20px;">
      <div class="itemOne">
        <span class="requiredFlag">*</span>
        <span class="title">员工工号：</span>
        <el-input
          v-model="personalList.fwmAccount"
          class="content"
          disabled
        ></el-input>
      </div>
      <div class="itemOne">
        <span class="title">所属部门：</span>
        <el-input v-model="department" class="content" disabled></el-input>
      </div>
      <div class="itemOne">
        <span class="title">公司邮箱：</span>
        <el-input
          v-model="personalList.email"
          class="content email"
          maxlength="30"
        ></el-input>
        <span class="emailName">@isoftstone.com</span>
      </div>
      <div class="itemOne">
        <span class="requiredFlag">*</span>
        <span class="title">所属区域：</span>
        <el-input
          v-model="region"
          class="content"
          disabled
        ></el-input>
      </div>
      <div class="itemOne">
        <span class="title">入职时间：</span>
        <!-- <el-input v-model="entryDate" class="content" disabled></el-input> -->
        <el-date-picker
          v-model="personalList.entryDate"
          class="content"
          :picker-options="pickerOptions"
          type="date"
          :disabled="entryDateFlag ? true : false"
          placeholder="选择入职时间"
        >
        </el-date-picker>
      </div>
      <div class="itemOne">
        <span class="title">上级领导：</span>
        <el-input
          v-model="personalList.superiorName"
          class="content"
          disabled
        ></el-input>
      </div>
    </div>
    <div class="itemList" style="margin-right: 20px;">
      <div class="itemOne">
        <span class="requiredFlag">*</span>
        <span class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 名：</span>
        <el-input
          v-model="personalList.userName"
          class="content"
          disabled
        ></el-input>
      </div>
      <div class="itemOne">
        <span class="title">角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 色：</span>
        <el-input v-model="roleNames" class="content" disabled></el-input>
      </div>
      <div class="itemOne">
        <span class="requiredFlag">*</span>
        <span class="title">手机号码：</span>
        <el-input
          v-model="personalList.mobileCode"
          class="content"
          maxlength="11"
          @keyup.native="inputEnterMobileCode"
          @change="inputEnterMobileCode"
        ></el-input>
        <div class="errorInfo" v-if="mobileCodeFlag">请填写正确的手机号码</div>
      </div>
      <div class="itemOne">
        <span class="title">员工岗位：</span>
        <el-input
          v-model="personalList.employeeJob"
          class="content"
          maxlength="20"
        ></el-input>
      </div>
      <div class="itemOne">
        <span class="title">参培时间：</span>
        <el-date-picker
          v-model="personalList.trainingDate"
          class="content"
          type="date"
          placeholder="选择参培时间"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="itemList">
      <div class="itemOne">
        <span class="title">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 别：</span>
        <el-select
          v-model="personalList.sex"
          placeholder="请选择性别"
          class="content"
          clearable
        >
          <el-option
            v-for="item in lookUp.USER_SEX"
            :key="item.itemCode"
            :label="item.itemName"
            :value="item.itemCode"
          ></el-option>
          <!-- <el-option label="男" value="M"></el-option>
          <el-option label="女" value="F"></el-option> -->
        </el-select>
      </div>
      <div class="itemOne">
        <span class="title">身份证号：</span>
        <el-input
          v-model="personalList.identityId"
          class="content"
          maxlength="18"
        ></el-input>
      </div>
      <div class="itemOne">
        <span class="title">QQ号码：</span>
        <el-input
          v-model="personalList.qqAccount"
          class="content"
          maxlength="12"
          @keyup.native="inputEnterqqAccount"
          @change="inputEnterqqAccount"
        ></el-input>
      </div>
      <div class="itemOne">
        <span class="title">员工性质：</span>
        <!-- <span class="content">{{
          tools.setProperty(personalList.employeeNature)
        }}</span> -->
        <!-- <el-input
          v-model="personalList.employeeNature"
          class="content"
        ></el-input> -->
        <el-select
          v-model="personalList.employeeNature"
          placeholder="请选择员工性质"
          class="content"
          clearable
        >
          <el-option
            v-for="item in lookUp.EMPLOYEE_NATURE_CODE"
            :key="item.itemCode"
            :label="item.itemName"
            :value="item.itemCode"
          ></el-option>
        </el-select>
      </div>
      <div class="itemOne">
        <span class="title">培训班主任：</span>
        <el-input
          v-model="personalList.trainingTeacher"
          maxlength="20"
          class="content"
        ></el-input>
      </div>
    </div>
    <div class="btnList">
      <div class="blank" @click="cancelBtn">取消</div>
      <div
        class="saveBtn"
        @click="saveBtn"
        :class="[saveBtnFlag > 1 ? 'main' : 'release']"
      >
        保存
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() >= Date.now();
        }
      }
    };
  },
  props: [
    "personalList",
    "saveBtnFlag",
    "department",
    "region",
    "entryDate",
    "entryDateFlag",
    "roleNames",
    "mobileCodeFlag"
  ],
  components: {},
  computed: { ...mapState(["lookUp"]) },
  mounted() {},
  methods: {
    inputEnterMobileCode() {
      this.personalList.mobileCode = this.personalList.mobileCode.replace(
        /[^\d]+/g,
        ""
      );
    },
    inputEnterqqAccount() {
      this.personalList.qqAccount = this.personalList.qqAccount.replace(
        /[^\d]+/g,
        ""
      );
    },
    saveBtn() {
      if (this.saveBtnFlag > 1) {
        this.$emit("saveBtn");
      }
    },
    cancelBtn() {
      this.$emit("cancelBtn");
    }
  }
};
</script>

<style scoped lang="less">
.email /deep/ input {
  padding-right: 115px;
}
.personalInfo {
  display: flex;
  justify-content: space-between;
  position: relative;
  .itemList {
    flex: 1;
    .itemOne {
      display: flex;
      position: relative;
      height: 36px;
      line-height: 36px;
      margin-top: 12px;
      .errorInfo {
        color: red;
        position: absolute;
        left: 112px;
        top: 25px;
      }
      .requiredFlag {
        position: absolute;
        left: 0px;
        margin-top: 4px;
        font-size: 20px;
        color: red;
      }
      .title {
        flex: 100px 0 0;
        margin-left: 10px;
      }
      .content {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .emailName {
        display: inline-block;
        width: 105px;
        position: absolute;
        left: 270px;
        color: #c0c4cc;
      }
    }
  }
  .btnList {
    position: absolute;
    bottom: -50px;
    left: 110px;
    .saveBtn {
      margin-left: 20px;
    }
  }
}
</style>