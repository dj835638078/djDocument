<template>
  <div class="Modify">
    <!--上传头像-->
    <div class="Modify-left">
      <el-upload
        class="avatar-uploader"
        action="./manage/service/file/upload?fileType=public"
        :headers="myHeaders"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="list.imageUrl" :src="list.imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div class="upload-title" v-if="!list.imageUrl">上传照片</div>
      </el-upload>
      <div class="photo-point" v-if="judgeImageUrl">请上传照片</div>
    </div>
    <div class="Modify-right">
      <div class="abox">
        <div class="abox-lableName">用户账号：</div>
        <div class="input-box">
          <el-input
            v-model="list.fwmAccount"
            maxlength="20"
            :disabled="true"
            placeholder="请填写用户账号"
          ></el-input>
        </div>
      </div>
      <div class="abox">
        <span class="abox-lableName">用户姓名：</span>
        <div class="input-box">
          <el-input
            v-model="list.userName"
            maxlength="20"
            :disabled="true"
            placeholder="请填写用户姓名"
          ></el-input>
        </div>
      </div>
      <div class="abox">
        <span class="abox-lableName">部门：</span>
        <div class="input-box">
          <el-input
            v-model="list.regionCode"
            maxlength="20"
            :disabled="true"
            placeholder="请填写昵称"
          ></el-input>
        </div>
      </div>
      <div class="abox">
        <span class="abox-lableName"><span>*</span>性别：</span>
        <div class="input-box">
          <el-select v-model="list.sex" placeholder="请选择性别">
            <el-option label="男" value="M"></el-option>
            <el-option label="女" value="F"></el-option>
          </el-select>
        </div>
        <div class="error-point" v-if="judgeSex">请选择性别</div>
      </div>
      <div class="abox">
        <span class="abox-lableName"><span>*</span>电子邮箱：</span>
        <div class="input-box">
          <el-input
            v-model="list.email"
            maxlength="50"
            placeholder="请填写电子邮箱"
          ></el-input>
        </div>
        <div class="error-point" v-if="judgeEmail">请填写正确的电子邮箱</div>
      </div>
      <div class="abox">
        <span class="abox-lableName"><span>*</span>手机号码：</span>
        <div class="input-box">
          <el-input
            maxlength="11"
            v-model="list.mobileCode"
            placeholder="请填写手机号码"
          ></el-input>
        </div>
        <div class="error-point" v-if="judgeMobileCode">
          请填写正确的手机号码
        </div>
      </div>
      <!--<div class="abox">
        <span class="abox-lableName"><span style="color:white">*</span>证件类型：</span>
        <div class="input-box">
          <el-select
            v-model="list.identityType"
            placeholder="请选择证件类型"
          >
            <el-option
              label="身份证"
              value="1"
            ></el-option>
            <el-option
              label="护照"
              value="2"
            ></el-option>
            <el-option
              label="港澳通行证"
              value="3"
            ></el-option>
            <el-option
              label="其他"
              value="4"
            ></el-option>
          </el-select>
        </div>
      </div>
      
      <div class="abox">
        <span class="abox-lableName"><span style="color:white">*</span>证件号码：</span>
        <div class="input-box">
          <el-input
            v-model="list.identityId"
            placeholder="请填写证件号码"
          ></el-input>
        </div>
      </div>
      -->
      <div class="abox">
        <span class="abox-lableName"
          ><span style="color:white">*</span>出生日期：</span
        >
        <div class="input-box">
          <el-date-picker
            v-model="list.birthDate"
            type="date"
            placeholder="请选择出生日期"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="abox">
        <span class="abox-lableName"
          ><span style="color:white">*</span>通讯地址：</span
        >
        <div class="input-box">
          <el-input
            v-model="list.daddress"
            maxlength="50"
            placeholder="请填写通讯地址"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div
      style="text-align:center; margin-top:30px;overflow:hidden;width:100%;height:50px;"
    >
      <div style="margin-left:calc(50% - 36px)" class="new" @click="storage">
        <i class="fa fa-file-text-o"></i>保存
      </div>
    </div>
  </div>
</template>

<script>
// var token = localStorage.getItem("token");
import { mapState, mapMutations } from "vuex";
import defaultImgM from "../../../assets/img/userM.jpg";
import defaultImgF from "../../../assets/img/userF.jpg";
import api from "@/api";
export default {
  name: "Modify",
  data() {
    return {
      setImgM: defaultImgM,
      setImgF: defaultImgF,
      // myHeaders: { Authorization: token },
      judgeImageUrl: false,
      judgeSex: false,
      judgeEmail: false,
      judgeMobileCode: false,
      list: {
        imageUrl: "",
        fwmAccount: "",
        userName: "",
        regionCode: "",
        regionName: "",
        sex: "",
        email: "",
        mobileCode: "",
        identityType: "",
        identityId: "",
        birthDate: "",
        daddress: "",
        photoId: ""
      }
    };
  },
  mounted() {
    this.give();
  },
  computed: {
    ...mapState(["userInfo"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  methods: {
    give() {
      let data = {
        //fwmAccount: this.userInfo.fwmAccount
        fwmAccount: ""
      };
      let vm = this;
      let obj = this.list;
      api
        .get("./manage/service/usermanage/findCurrent", data)
        .then(function(response) {
          if (response.status == 200) {
            let objList = response.data;
            obj.fwmAccount = objList.fwmAccount;
            obj.userName = objList.userName;
            obj.regionCode = objList.regionCode + " " + objList.regionName;
            obj.regionName = objList.regionName;
            obj.sex = objList.sex;
            obj.email = objList.email;
            obj.mobileCode = objList.mobileCode;
            obj.identityType = objList.identityType;
            obj.identityId = objList.identityId;
            obj.birthDate = objList.birthDate;
            obj.daddress = objList.daddress;
            obj.photoId = objList.photoId;
            if (objList.photoId) {
              obj.imageUrl =
                location.origin +
                "/manage/publicservice/file/download?fId=" +
                objList.photoId;
            }
          }
        })
        .catch(function(error) {
          if (error.code == 0) {
          }
        });
    },
    //注销
    logout() {
      let vm = this;
      api
        .get(`./manage/service/account/logout`)
        .then(function(response) {
          if (response.status == 200) {
            localStorage.removeItem("time");
            localStorage.removeItem("token");
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
    //确定
    storage() {
      let obj = this.list;
      //判断是否填电子邮箱
      if (!obj.email) {
        this.judgeEmail = true;
      } else {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(obj.email)) {
          this.judgeEmail = true;
        } else {
          this.judgeEmail = false;
        }
      }
      //判断是否填手机号码
      if (!obj.mobileCode) {
        this.judgeMobileCode = true;
      } else {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(obj.mobileCode)) {
          this.judgeMobileCode = true;
        } else {
          this.judgeMobileCode = false;
        }
      }
      //判断是否填性别
      if (!obj.sex) {
        this.judgeSex = true;
      } else {
        this.judgeSex = false;
      }
      //判断是否上传图片
      if (!obj.imageUrl) {
        this.judgeImageUrl = true;
      } else {
        this.judgeImageUrl = false;
      }
      //判断是否可以保存
      if (
        !this.judgeImageUrl &&
        !this.judgeUserName &&
        !this.judgeSex &&
        !this.judgeMobileCode &&
        !this.judgeEmail
      ) {
        let data = this.list;
        let vm = this;
        api
          .post("./manage/service/usermanage/updateSelf", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$confirm("修改成功，是否需要重新登录?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success"
              })
                .then(() => {
                  //vm.$router.push({ name: "login" });
                  vm.logout();
                })
                .catch(() => {
                  vm.give();
                });
            }
          })
          .catch(function(error) {});
      }
    },
    handleAvatarSuccess(res, file) {
      this.list.imageUrl = URL.createObjectURL(file.raw);
      this.list.photoId = res[0].fId;
    },
    handleAvatarError(err, file, fileList) {
      this.$message.error(JSON.parse(err.message).message);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style  lang="less">
.Modify {
  width: 100%;
  .el-form--inline .el-form-item {
    margin-right: 20px;
    margin-left: 20px;
  }
  .el-dialog__body {
    padding: 20px 0px 20px 0px;
  }
  .Modify-left {
    float: left;
    width: 350px;
    height: 100%;
    .photo-point {
      margin-left: 142px;
      color: red;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
    }
    .upload-title {
      position: absolute;
      bottom: 10px;
      left: 83px;
      color: #666666;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      margin-left: 60px;
      margin-top: 25px;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 220px;
      height: 220px;
      line-height: 220px;
      text-align: center;
    }
    .avatar {
      width: 220px;
      height: 220px;
      display: block;
    }
  }
  .Modify-right {
    float: left;
    width: calc(100% - 350px);
    height: 100%;
    .abox {
      margin-top: 28px;
      width: 50%;
      height: 32px;
      float: left;
      position: relative;
      .error-point {
        position: absolute;
        left: 76px;
        top: 35px;
        color: red;
        font-size: 12px;
      }
      .abox-lableName {
        width: 76px;
        float: left;
        line-height: 32px;
        span {
          color: red;
          font-size: 14px;
        }
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
</style>
