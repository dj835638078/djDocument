<template>
  <div class="informationAdd">
    <div class="informationAddTitle">
      <div class="line"></div>
      <div class="title">申诉</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="informationAddContent">
      <el-form>
        <div class="basicInfo">
          <div class="groupTitle">基本信息：</div>
          <div class="itemGroup">
            <span class="title">启用状态：</span>
            <div class="content">
              {{ detailObj.openState == 1 ? "启用" : "禁用" }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">内容链接：</span>
            <div class="content">{{ detailObj.contentTitle }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">视频rowkey：</span>
            <div class="content">{{ detailObj.rowkey }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">错误分级：</span>
            <div class="content">
              {{ tools.setVideoErrorLevel(detailObj.errorLevel) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">错误原因：</span>
            <div class="content">{{ detailObj.errorReason }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">错误备注：</span>
            <div class="content">{{ detailObj.errorRemark }}</div>
          </div>
        </div>

        <div class="appealInfoLook" v-if="$route.params.type != 'todo'">
          <div class="groupTitle">申诉信息：</div>
          <div class="itemGroup">
            <span class="title">申诉理由：</span>
            <div class="content contentText">{{ detailObj.appealReason }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">截图：</span>
            <img
              class="content"
              v-if="detailObj.fId"
              :src="tools.downImg(detailObj.fId)"
            />
          </div>
        </div>

        <div class="appealInfo" v-if="$route.params.type == 'todo'">
          <div class="groupTitle">申诉信息：</div>

          <div class="itemGroup">
            <span class="iconSymbol"
              >*<span class="iconTitle">申诉理由：</span></span
            >
            <el-input
              v-model="appealReason"
              placeholder="请填写申诉理由，最多输入200字"
              maxlength="200"
              type="textarea"
            ></el-input>
            <p class="infoError" v-if="appealReasonFlag">请填写申诉理由</p>
          </div>
          <div class="itemGroup">
            <span class="iconSymbol"
              ><span class="iconTitle">上传截图：</span></span
            >
            <el-upload
              class="avatar-uploader"
              action="./complex/service/file/upload?fileType=public"
              :show-file-list="false"
              :headers="myHeaders"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <p class="inputDes inputDesSpecial">
              请上传一张截图（支持上传jpg、png格式）
            </p>
          </div>
        </div>

        <div class="examineInfo" v-if="$route.params.type == 'result'">
          <div class="groupTitle">审核信息：</div>
          <div class="itemGroup">
            <span class="title">结论：</span>
            <div class="content">
              {{ tools.setExamineResultAdd(detailObj.conclusion) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">原因：</span>
            <div class="content contentText">{{ detailObj.suggestion }}</div>
          </div>
        </div>

        <div class="btnList" v-if="$route.params.type == 'todo'">
          <div class="blank goBack" @click="goBack">取消</div>
          <div class="main submitBtn" @click="submitBtn">提交</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Human from "../../public/Human";
export default {
  data() {
    return {
      appealReason: "",
      appealReasonFlag: false,
      imgType: "fsafdafdfasdfs",
      imageUrl: "",
      gImgId: "",
      gImgIdFlag: "",
      detailObj: {}
    };
  },
  components: { Human },
  computed: {
    ...mapState(["detailHeight", "userInfo", "lookUp", "datasourceStore"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  mounted() {
    this.getDetail();
  },
  watch: {},
  methods: {
    //返回上一层
    goBack() {
      this.$router.go(-1);
    },
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.gImgId = res[0].fId;
      this.gImgIdFlag = res[0].fileId;
    },
    beforeAvatarUpload(file) {
      const flag = file.name
        .split(".")
        .pop()
        .toLowerCase();
      let arr = ["jpg", "png"];
      let isTYPE;
      for (var i = 0; i < arr.length; i++) {
        if (flag === arr[i]) {
          isTYPE = true;
          break;
        } else {
          isTYPE = false;
        }
      }
      if (!isTYPE) {
        this.$message.error("上传文件只能是jpg,png格式!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isTYPE && isLt2M;
    },
    // 获取详情
    getDetail() {
      let vm = this;
      vm.api
        .get(
          `./complex/service/appealEntry/video/findInfo?checkId=${
            vm.$route.params.id
          }`
        )
        .then(response => {
          if (response.status == 200) {
            vm.detailObj = response.data;
          }
        })
        .catch(error => {});
    },
    // 提交按钮
    submitBtn() {
      let vm = this;
      if (!vm.appealReason) {
        vm.appealReasonFlag = true;
        return;
      } else {
        vm.appealReasonFlag = false;
      }
      let data = {
        checkId: vm.$route.params.id,
        // appealType: 1,
        appealReason: vm.appealReason,
        appealImgId: vm.gImgIdFlag
      };
      vm.api
        .post(`./complex/service/appealEntry/video/appeal`, data)
        .then(response => {
          if (response.status == 200) {
            vm.$router.go(-1);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.informationAdd /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
}
.informationAdd /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.informationAdd /deep/ textarea {
  height: 120px;
  width: 600px;
}
.informationAdd {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 0 120px 0px;
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
  .informationAddContent {
    .el-form {
      margin-top: 20px;
      .groupTitle {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
        line-height: 22px;
        margin: 30px 0;
      }
      .itemGroup {
        position: relative;
        margin-bottom: 25px;
        display: flex;
        .iconSymbol {
          color: red;
          display: inline-block;
          flex: 0 0 120px;
          margin: 10px 0px 0 0;
        }
        .iconTitle {
          margin-left: 5px;
          color: #2a2a2a;
        }
        .inputDes {
          line-height: 32px;
          color: #2a2a2a;
          margin-left: 30px;
        }
        .inputDesSpecial {
          line-height: 96px;
        }
        .infoError {
          color: red;
          position: absolute;
          top: 125px;
          left: 120px;
        }
        .title {
          flex: 0 0 120px;
        }
        .content {
          flex: 1;
        }
        .contentText {
          line-height: 22px;
        }
      }
      .btnList {
        margin-left: 120px;
        .submitBtn {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>