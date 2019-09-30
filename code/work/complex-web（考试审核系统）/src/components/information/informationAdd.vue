<template>
  <div class="informationAdd">
    <el-dialog
      title="提示"
      :visible.sync="infoDialogShow"
      width="400px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <p style="margin-top:20px">请确认填写的信息真实无误~</p>
      <p style="color:#F5A623;margin-top:20px">确定后不可修改</p>
      <span slot="footer" class="dialog-footer">
        <div class="dialogShow-footer footerAdd" @click="infoConfirm">
          确定
        </div>
        <div class="dialogShow-footer" @click="infoCancel">
          取消
        </div>
      </span>
    </el-dialog>
    <div class="informationAddTitle">
      <div class="line"></div>
      <div class="title" style="float:left;">新增审核录入</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="clear"></div>
    <div class="informationAddContent">
      <el-form>
        <div class="inputGroup">
          <span class="iconSymbol"
            >*<span class="iconTitle"
              >标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 题</span
            ></span
          >
          <el-input
            v-model="verifyTitle"
            class="bigWidth"
            maxlength="50"
            placeholder="请正确输入审核信息的标题，字数不超过50字"
          ></el-input>
          <!-- <p class="inputDes">请正确输入审核信息的标题，字数不超过12字</p> -->
          <div class="infoError" v-if="verifyTitleFlag">请输入标题</div>
        </div>
        <div class="inputGroup">
          <span class="iconSymbol"
            >*<span class="iconTitle">审核时间</span></span
          >
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="选择审核时间"
          >
          </el-date-picker>
          <div class="separate">-</div>
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="选择审核时间"
          >
          </el-date-picker>
          <!-- <p class="inputDes">请正确选择审核信息的时间</p> -->
          <div class="infoError" v-if="dateFlag">请选择审核时间</div>
        </div>

        <div class="itemBox" v-for="(item, index) in itemArr" :key="index">
          <div
            class="deleteBtn el-icon-delete"
            @click="deleteBtn(index)"
            v-if="itemArr.length != 1"
          ></div>
          <div class="inputGroup">
            <span class="iconSymbol"
              >*<span class="iconTitle">审核来源</span></span
            >
            <el-select
              v-model="item.dataSource"
              placeholder="请选择审核来源"
              class="smallWidth"
            >
              <el-option
                v-for="(item, index) in datasourceStore"
                :label="item.itemName"
                :value="item.itemCode"
                :key="index"
              >
              </el-option>
            </el-select>
            <!-- <p class="inputDes">请选择审核录入信息的来源</p> -->
            <div class="infoError" v-if="item.dataSourceFlag">
              请选择审核来源
            </div>
          </div>
          <div class="inputGroup">
            <span class="iconSymbol"
              >*<span class="iconTitle">审核数量</span></span
            >
            <el-input
              v-model="item.verifyNum"
              class="smallWidth"
              placeholder="请正确输入该时段内审核总数量"
              @keyup.native="inputEnterverifyNum(item)"
              @change="inputEnterverifyNum(item)"
            ></el-input>
            <!-- <p class="inputDes">请正确输入该时段内审核总数量</p> -->
            <div class="infoError" v-if="item.verifyNumFlag">
              {{ item.verifyNumText }}
            </div>
          </div>
          <div class="inputGroup">
            <span class="iconSymbol"
              >*<span class="iconTitle">启用数量</span></span
            >
            <el-input
              v-model="item.startNum"
              class="smallWidth"
              placeholder="请输入审核通过的数量"
              @keyup.native="inputEnterstartNum(item)"
              @change="inputEnterstartNum(item)"
            ></el-input>
            <!-- <p class="inputDes">
              请正确输入该时段内审核启用数量（审核通过的数量）
            </p> -->
            <div class="infoError" v-if="item.startNumFlag">请输入启用数量</div>
          </div>
          <div class="inputGroup">
            <span class="iconSymbol"
              >*<span class="iconTitle">禁用数量</span></span
            >
            <el-input
              v-model="item.stopNum"
              class="smallWidth"
              placeholder="请输入审核不通过的数量"
              @keyup.native="inputEnterstopNum(item)"
              @change="inputEnterstopNum(item)"
            ></el-input>
            <!-- <p class="inputDes">
              请正确输入该时段内审核禁用量（审核不通过的数量）
            </p> -->
            <div class="infoError" v-if="item.stopNumFlag">请输入禁用数量</div>
          </div>
          <div class="inputGroup">
            <span class="iconSymbol"
              ><span class="iconTitle"
                >&nbsp;班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;次</span
              ></span
            >
            <el-input
              v-model="item.verifyShift"
              maxlength="20"
              class="smallWidth"
              placeholder="请输入班次"
            ></el-input>
            <!-- <p class="inputDes">
              请正确输入该时段内审核禁用量（审核不通过的数量）
            </p> -->
          </div>
          <div class="inputGroup">
            <span class="iconSymbol"
              >*<span class="iconTitle">审核截图</span></span
            >
            <div @click="uploadIndex(index)">
              <el-upload
                class="avatar-uploader"
                action="./complex/service/file/upload?fileType=public"
                :show-file-list="false"
                :headers="myHeaders"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="item.imageUrl" :src="item.imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <p class="inputDes inputDesSpecial">
              请上传一张真实审核数量的数据截图（支持上传jpg、png、jpeg、gif格式）
            </p>
            <div class="infoError infoErrorSpecial" v-if="item.verifyImgIdFlag">
              请上传图片
            </div>
          </div>
          <div class="inputGroup inputGroupSpecial">
            <span class="iconSymbol"
              ><span class="noNeed">*</span
              ><span class="iconTitle"
                >备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 注</span
              ></span
            >
            <el-input
              v-model="item.remark"
              placeholder="您可输入其他备注，200字以内"
              maxlength="200"
              type="textarea"
              class="bigWidth textareaHeight"
            ></el-input>
          </div>
        </div>

        <div class="submitBtnBox">
          <div class="blank submitBtn" @click="addBtn">添加</div>
          <div class="main submitBtn" @click="submitBtn">保存</div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      infoDialogShow: false,
      verifyTitle: "",
      verifyTitleFlag: false,
      dateFlag: false,
      startDate: "",
      endDate: "",
      itemArr: [
        {
          dataSource: "",
          verifyNum: "",
          startNum: "",
          stopNum: "",
          verifyImgId: "",
          remark: "",
          imageUrl: "",
          dataSourceFlag: false,
          verifyNumFlag: false,
          startNumFlag: false,
          stopNumFlag: false,
          verifyImgIdFlag: false,
          verifyNumText: "请输入审核数量"
        }
      ],
      itemObjDefault: {
        dataSource: "",
        verifyNum: "",
        startNum: "",
        stopNum: "",
        verifyImgId: "",
        remark: "",
        imageUrl: "",
        dataSourceFlag: false,
        verifyNumFlag: false,
        startNumFlag: false,
        stopNumFlag: false,
        verifyImgIdFlag: false,
        verifyNumText: "请输入审核数量"
      },
      uploadIndexNum: ""
    };
  },
  components: {},
  computed: {
    ...mapState(["detailHeight", "userInfo", "lookUp", "datasourceStore"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  mounted() {},
  watch: {
    // startDate() {
    //   this.judgeTime();
    // },
    // endDate() {
    //   this.judgeTime();
    // }
  },
  methods: {
    goBack() {
      this.$router.go(-1); //返回上一层
    },
    inputEnterverifyNum(item) {
      item.verifyNum = item.verifyNum.replace(/[^\d]+/g, "");
    },
    inputEnterstartNum(item) {
      item.startNum = item.startNum.replace(/[^\d]+/g, "");
    },
    inputEnterstopNum(item) {
      item.stopNum = item.stopNum.replace(/[^\d]+/g, "");
    },
    uploadIndex(index) {
      this.uploadIndexNum = index;
    },
    handleAvatarSuccess(res, file, fileList) {
      this.itemArr[this.uploadIndexNum].imageUrl = URL.createObjectURL(
        file.raw
      );
      this.itemArr[this.uploadIndexNum].verifyImgId = res[0].fId;
    },
    beforeAvatarUpload(file) {
      const flag = file.name
        .split(".")
        .pop()
        .toLowerCase();
      let arr = ["jpg", "png", "jpeg", "gif"];
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
        this.$message.error("上传文件只能是jpg,png,jpeg,gif格式!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isTYPE && isLt2M;
    },
    infoConfirm() {
      let vm = this;
      // let data = {
      //   verifyTitle: this.verifyTitle,
      //   dataSource: this.dataSource,
      //   startDate: this.startDate,
      //   endDate: this.endDate,
      //   verifyNum: this.verifyNum,
      //   startNum: this.startNum,
      //   stopNum: this.stopNum,
      //   verifyImgId: this.verifyImgId,
      //   remark: this.remark
      // };
      let data = this.itemArr;
      for (var i = 0; i < data.length; i++) {
        data[i].verifyTitle = this.verifyTitle;
        data[i].startDate = this.startDate;
        data[i].endDate = this.endDate;
      }
      vm.api
        .post(`./complex/service/verifyEntry/insert`, data)
        .then(response => {
          if (response.status == 200) {
            vm.infoDialogShow = false;
            vm.$router.push({ name: "information" });
          }
        })
        .catch(error => {});
    },
    infoCancel() {
      this.infoDialogShow = false;
    },
    // 删除按钮
    deleteBtn(index) {
      this.itemArr.splice(index, 1);
    },
    // 添加按钮
    addBtn() {
      let obj = {};
      obj = Object.assign({}, this.itemObjDefault);
      this.itemArr.push(obj);
    },
    // 保存按钮
    submitBtn() {
      this.checkedIn();

      let arr = this.itemArr;
      for (var i = 0; i < arr.length; i++) {
        if (
          this.verifyTitleFlag ||
          this.dateFlag ||
          arr[i].dataSourceFlag ||
          arr[i].verifyNumFlag ||
          arr[i].startNumFlag ||
          arr[i].stopNumFlag ||
          arr[i].verifyImgIdFlag
        ) {
          return;
        }
      }
      this.infoDialogShow = true;
    },
    //判断时间
    // judgeTime() {
    //   if (this.startDate && this.endDate) {
    //     if (this.endDate < this.startDate) {
    //       this.endDate = "";
    //       this.$message({
    //         message: "结束时间已超出开始时间",
    //         type: "error"
    //       });
    //     }
    //   }
    // },
    // 数据校验
    checkedIn() {
      if (this.startDate && this.endDate) {
        if (this.endDate < this.startDate) {
          this.endDate = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
      let arr = this.itemArr;
      if (!this.verifyTitle) {
        this.verifyTitleFlag = true;
      } else {
        this.verifyTitleFlag = false;
      }
      if (!this.startDate || !this.endDate) {
        this.dateFlag = true;
      } else {
        this.dateFlag = false;
      }
      for (var i = 0; i < arr.length; i++) {
        if (!arr[i].dataSource) {
          arr[i].dataSourceFlag = true;
        } else {
          arr[i].dataSourceFlag = false;
        }
        if (!arr[i].verifyNum) {
          arr[i].verifyNumFlag = true;
          arr[i].verifyNumText = "请输入审核数量";
        } else if (arr[i].verifyNum) {
          if (+arr[i].verifyNum != +arr[i].startNum + +arr[i].stopNum) {
            arr[i].verifyNumFlag = true;
            arr[i].verifyNumText = "审核数量应为启用数量和禁用数量之和";
          } else {
            arr[i].verifyNumFlag = false;
          }
        }
        if (!arr[i].startNum) {
          arr[i].startNumFlag = true;
        } else {
          arr[i].startNumFlag = false;
        }
        if (!arr[i].stopNum) {
          arr[i].stopNumFlag = true;
        } else {
          arr[i].stopNumFlag = false;
        }
        if (!arr[i].verifyImgId) {
          arr[i].verifyImgIdFlag = true;
        } else {
          arr[i].verifyImgIdFlag = false;
        }
      }
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
.textareaHeight /deep/ textarea {
  height: 90px;
}
.informationAdd {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 0 80px 0px;
  .informationAddTitle {
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
    }
  }
  .informationAddContent {
    .el-form {
      margin-top: 20px;
      .inputGroup {
        position: relative;
        margin-bottom: 25px;
        display: flex;
        .iconSymbol {
          color: red;
          display: inline-block;
          width: 90px;
          margin: 10px 5px 0 0;
        }
        .bigWidth {
          width: 460px;
        }
        .smallWidth {
          width: 220px;
        }
        .iconTitle {
          margin-left: 5px;
          color: rgba(0, 0, 0, 0.65);
        }
        .inputDes {
          line-height: 32px;
          color: rgba(0, 0, 0, 0.45);
          margin-left: 30px;
        }
        .inputDesSpecial {
          line-height: 96px;
        }
        .infoError {
          color: red;
          position: absolute;
          top: 38px;
          left: 95px;
        }
        .infoErrorSpecial {
          top: 98px;
        }
        .noNeed {
          opacity: 0;
        }
      }
      .inputGroupSpecial {
        margin-bottom: 20px;
      }
      .submitBtnBox {
        width: 555px;
        height: 40px;
        margin: auto;
        margin-top: 30px;
        display: flex;
        .submitBtn {
          margin-right: 25px;
        }
      }
      .itemBox {
        background: #f5f7fa;
        padding: 30px 90px;
        position: relative;
        margin-top: 25px;
        .deleteBtn {
          position: absolute;
          width: 24px;
          height: 24px;
          line-height: 24px;
          background: rgba(245, 108, 108, 1);
          border-radius: 2px;
          right: 0;
          top: 0;
          cursor: pointer;
          color: #fff;
          font-size: 18px;
          text-align: center;
        }
      }
    }
  }
}
</style>