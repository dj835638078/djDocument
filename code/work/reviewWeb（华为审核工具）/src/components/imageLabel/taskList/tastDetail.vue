<template>
  <div class="tastDetail" ref="aaa">
    <div class="taskInfo">
      <div class="el-form">
        <div class="titleInfo" style="margin-left:24px">基本信息</div>
        <div class="rowList">
          <span class="specialSpan" style="margin-left:24px"
            ><span>*</span>订单名称</span
          >
          <div class="el-form-item">
            <el-input
              v-model="orderName"
              placeholder="最多输入12个字"
              maxlength="12"
            >
            </el-input>
            <div class="error-point" v-if="orderNameFlag">
              请填写订单名称
            </div>
          </div>

          <span class="specialSpan"><span>*</span>客户名称</span>
          <div class="el-form-item">
            <human
              val="clientAccount"
              :roleDiff="roleDiff"
              :disabledFlag="disabledFlag"
            />
            <div class="error-point" v-if="clientAccountFlag">
              请填写客户名称
            </div>
          </div>
          <span class="specialSpan"><span>*</span>项目经理</span>
          <div class="el-form-item">
            <human
              val="manageAccount"
              :roleDiff="roleDiff"
              :disabledFlag="!disabledFlag"
            />
            <div class="error-point" v-if="manageAccountFlag">
              请填写项目经理
            </div>
          </div>
        </div>
        <div class="rowList">
          <span
            class="specialSpan"
            style="margin-left:24px"
            v-if="!orderNumFlag"
            ><span style="opacity:0">*</span>订单编号</span
          >
          <div class="el-form-item" v-if="!orderNumFlag">
            <el-input v-model="orderCode" :disabled="true"> </el-input>
          </div>
          <!-- <span
            style="margin-left:24px"
            v-if="orderNumFlag"
          ></span> -->
          <span class="specialSpan"
            ><span style="opacity:0">*</span>交付数量</span
          >
          <div class="el-form-item">
            <el-input
              v-model.number="orderQuantity"
              placeholder="请输入阿拉伯数字"
              type="number"
            >
            </el-input>
          </div>
          <span class="specialSpan"><span>*</span>截止日期</span>
          <div class="el-form-item">
            <!-- placeholder="请选择日期" -->
            <el-date-picker
              v-model="endDate"
              type="date"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
            <div class="error-point" v-if="endDateFlag">
              请选择截止日期
            </div>
          </div>
          <span class="specialSpan" v-if="orderNumFlag"></span>
          <div class="el-form-item" v-if="orderNumFlag"></div>
        </div>
      </div>
    </div>
    <div class="taskState" v-if="false">订单状态</div>
    <div class="tastDetailInfo">
      <div class="ruleDescription">
        <div class="titleInfo" style="margin-top: 15px">规则描述</div>
        <quill-editor
          :content="orderDescription"
          :options="editorOption"
          @change="onEditorChange($event)"
        >
        </quill-editor>
        <div class="error-point" v-if="desFlag">
          请填写规则描述或上传附件
        </div>
      </div>
      <div class="attachmentUpload ">
        <el-upload
          class="upload-demo"
          action="./manage/service/file/upload?fileType=public"
          :headers="myHeaders"
          multiple
          :limit="5"
          :before-upload="onBeforeUpload"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :on-exceed="handleExceed"
          :file-list="filelist"
        >
          <div class="query" style="width:100px">
            <i class="el-icon-upload el-icon--right"></i>附件上传
          </div>
          <div slot="tip" class="el-upload__tip">
            附件上传格式：jpg、png、jpeg、gif、doc、docx、ppt、pptx、xls、xlsx、zip、rar、pdf、txt,最多支持上传5个文件,每个最大20MB。
          </div>
        </el-upload>
        <div class="error-point" v-if="desFlag">
          请填写规则描述或上传附件
        </div>
      </div>
    </div>
    <div class="btnList">
      <div class="query" @click="saveCli">保存</div>
      <div class="query" @click="publishCli">发布</div>
    </div>
  </div>
</template>
<script>
// var token = localStorage.getItem("token");
import human from "../../common/Human";
import { mapState } from "vuex";
export default {
  name: "tastDetail",
  data() {
    return {
      // myHeaders: { Authorization: token },
      orderName: "",
      clientAccount: "",
      clientAccountName: "",
      manageAccount: "",
      manageAccountName: "",
      orderCode: "",
      orderQuantity: "",
      endDate: "",
      editFlag: false,
      orderNumFlag: false,
      orderDescription: "",
      editorOption: {
        // something config
        placeholder:
          "请填写您对该项目的规则描述，或者您可以直接在下方附件上传处上传文件哦，更简介、方便~"
      },
      fileIds: [],
      filelist: [],
      roleDiff: true,
      disabledFlag: false,
      orderNameFlag: false,
      clientAccountFlag: false,
      manageAccountFlag: false,
      endDateFlag: false,
      desFlag: false,
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 3600 * 24 * 1000;
        }
      }
    };
  },
  mounted() {
    let vm = this;
    // vm.listenRole();
    if (vm.$route.params.role == "receive") {
      vm.$route.matched[0].meta.title = "任务接收";
    } else {
      vm.$route.matched[0].meta.title = "发布任务";
    }
    if (vm.$route.params.name == "edit" || vm.$route.params.name == "copy") {
      vm.queryList(vm.$route.params.id);
    }
    if (vm.$route.params.name == "new" || vm.$route.params.name == "copy") {
      vm.orderNumFlag = true;
      vm.$route.meta.title = "新增任务";
    }
    if (vm.$route.params.name == "edit") {
      vm.$route.meta.title = "编辑任务";
    }
  },
  watch: {
    userInfo(newVal, oldVal) {
      this.listenRole();
    }
  },
  components: { human },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
    ...mapState(["userInfo"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      this.orderDescription = html;
    },
    handleChange(file, fileList) {
      this.desFlag = false;
      // this.fileList = fileList;
      // this.fileList = fileList.slice(-3);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      this.fileIds = fileList;
    },
    handleAvatarSuccess(res, file) {
      let arr1 = [];
      if (res[0] && res[0].fileId) {
        arr1.push(res[0].fileId);
      }
      if (this.fileIds && this.fileIds.length) {
        this.fileIds = this.fileIds.concat(arr1);
      } else {
        this.fileIds = [].concat(arr1);
      }
    },
    handleAvatarError(err, file, fileList) {
      this.$message.error(JSON.parse(err.message).message);
    },
    onBeforeUpload(file) {
      const flag = file.name
        .split(".")
        .pop()
        .toLowerCase();
      let arr = [
        "jpg",
        "png",
        "jpeg",
        "gif",
        "doc",
        "docx",
        "ppt",
        "pptx",
        "xls",
        "xlsx",
        "zip",
        "rar",
        "pdf",
        "txt"
      ];
      let isTYPE;
      for (var i = 0; i < arr.length; i++) {
        if (flag === arr[i]) {
          isTYPE = true;
          break;
        } else {
          isTYPE = false;
        }
      }
      const isLt1M = file.size / 1024 / 1024 < 20;

      if (!isTYPE) {
        this.$message.error(
          "上传文件只能是jpg,png,jpeg,gif,doc,docx,ppt,pptx,xls,xlsx,zip,rar,pdf,txt格式!"
        );
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 20MB!");
      }
      return isTYPE && isLt1M;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        // `当前限制选择 5 个文件，本次选择了 ${
        //   files.length
        // } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        `最多支持上传5个文件`
      );
    },
    saveCli(publishFlag) {
      let vm = this;
      let obj = {};
      vm.orderNameFlag = false;
      vm.clientAccountFlag = false;
      vm.manageAccountFlag = false;
      vm.endDateFlag = false;
      vm.desFlag = false;
      let url = "./manage/service/imglabelOrder/add";
      if (vm.orderName) {
        obj.orderName = vm.orderName.trim();
      }
      obj.clientAccount = vm.clientAccount;
      obj.manageAccount = vm.manageAccount;
      obj.orderCode = vm.orderCode;
      obj.orderQuantity = vm.orderQuantity;
      obj.endDate = vm.endDate;
      obj.orderDescription = vm.orderDescription;
      if (vm.fileIds && vm.fileIds.length) {
        for (var i = 0; i < vm.fileIds.length; i++) {
          if (typeof vm.fileIds[i] === "object") {
            vm.fileIds[i] = vm.fileIds[i].fileId;
          }
        }
      }
      obj.fileIds = vm.fileIds;
      if (publishFlag == 1) {
        if (!obj.orderName) {
          vm.orderNameFlag = true;
        }
        if (!obj.clientAccount) {
          vm.clientAccountFlag = true;
        }
        if (!obj.manageAccount) {
          vm.manageAccountFlag = true;
        }
        if (!obj.endDate) {
          vm.endDateFlag = true;
        }
        if (!obj.orderDescription) {
          if (!obj.fileIds) {
            vm.desFlag = true;
          }
          if (obj.fileIds && obj.fileIds.length == 0) {
            vm.desFlag = true;
          }
        }
        if (obj.orderDescription) {
          vm.desFlag = false;
        }
        if (
          vm.orderNameFlag ||
          vm.clientAccountFlag ||
          vm.manageAccountFlag ||
          vm.endDateFlag ||
          vm.desFlag
        ) {
          document.getElementsByClassName("scrollClass")[0].scrollTo(0, 0);
          return;
        }
        url = "./manage/service/imglabelOrder/publish";
      }
      vm.api
        .post(url, obj)
        .then(function(response) {
          if (response.status == 200) {
            vm.$router.push({
              name: "taskList"
            });
          }
        })
        .catch(function(error) {});
    },
    publishCli() {
      this.saveCli(1);
    },
    queryList(orderCodeFlag) {
      let vm = this;
      vm.api
        .get(
          `./manage/service/imglabelOrder/findByOrderId?orderId=${orderCodeFlag}`
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.orderName = response.data.orderName;
            if (vm.tools.setRoles("projectManagerA")) {
              vm.clientAccount = response.data.clientAccount;
              vm.$children[1]._data.humanAccount = response.data.clientAccount;
              vm.$children[1]._data.humanAccountName = response.data.clientName;
            }
            if (vm.tools.setRoles("clientA")) {
              vm.manageAccount = response.data.manageAccount;
              vm.$children[2]._data.humanAccount = response.data.manageAccount;
              vm.$children[2]._data.humanAccountName = response.data.manageName;
            }
            vm.orderQuantity = response.data.orderQuantity;
            vm.endDate = response.data.endDate;
            if (vm.$route.params.name == "edit") {
              vm.orderCode = response.data.orderCode;
            }
            vm.orderDescription = response.data.orderDescription;
            vm.fileIds = response.data.files;
            // this.imageUrl = URL.createObjectURL(response.data.files[0]);
            for (var i = 0; i < response.data.files.length; i++) {
              response.data.files[i].name = response.data.files[i].fileName;
            }
            vm.filelist = response.data.files;
          }
        })
        .catch(function(error) {});
    },
    listenRole() {
      let vm = this;
      if (vm.tools.setRoles("projectManagerA")) {
        vm.disabledFlag = false;
        vm.manageAccount = vm.userInfo.fwmAccount;
        vm.$children[2]._data.humanAccount = vm.userInfo.fwmAccount;
        vm.$children[2]._data.humanAccountName = vm.userInfo.userName;
      }
      if (vm.tools.setRoles("clientA")) {
        vm.disabledFlag = true;
        vm.clientAccount = vm.userInfo.fwmAccount;
        vm.$children[1]._data.humanAccount = vm.userInfo.fwmAccount;
        vm.$children[1]._data.humanAccountName = vm.userInfo.userName;
      }
    }
  }
};
</script>

<style scoped lang="less">
.tastDetail /deep/.ql-editor.ql-blank::before {
  font-style: normal;
  color: #dbd3d6;
}
.tastDetailInfo /deep/ .el-upload-list {
  width: 40%;
}
.ruleDescription /deep/ .ql-container {
  min-height: 120px;
}
.tastDetail /deep/ strong {
  font-weight: 600;
}
.tastDetail /deep/ em {
  font-style: oblique;
}
.tastDetail /deep/ u {
  text-decoration: underline;
}
.tastDetail /deep/ s {
  text-decoration: line-through;
}
.taskInfo /deep/.el-form-item__content,
.el-select,
.el-date-editor {
  width: 100% !important;
}
.tastDetail /deep/ .el-input.is-disabled .el-input__inner {
  color: rgba(0, 0, 0, 0.55) !important;
}
.tastDetail {
  position: relative;

  .taskInfo {
    padding-top: 15px;
    .el-form {
      margin-right: 25px;
      .titleInfo {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        margin: 0 25px 10px 24px;
      }
      .rowList {
        display: flex;
        flex-wrap: nowrap;
        .specialSpan {
          flex: 0 0 72px;
          height: 35px;
          line-height: 35px;
          margin-left: 24px;
          span {
            color: red;
          }
        }
        .el-form-item {
          flex: 1;
          display: flex;
          margin-bottom: 10px;
          position: relative;
          .error-point {
            position: absolute;
            color: red;
            top: 35px;
            left: 0;
          }
          .human {
            width: 100%;
          }
        }
      }
    }
  }
  .taskState {
    margin: 0 25px 0 24px;
  }
  .tastDetailInfo {
    margin: 12px 25px 0 24px;
    border-top: 1px solid #e9e9e9;
    .titleInfo {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      margin: 15px 25px 10px 0;
    }
    .ruleDescription {
      position: relative;
      .error-point {
        position: absolute;
        color: red;
        bottom: -20px;
      }
    }
  }
  .attachmentUpload {
    position: relative;
    margin-top: 25px;
    .error-point {
      position: absolute;
      color: red;
      bottom: -10px;
    }
    .el-button {
      color: #597ef7;
      background-color: #597ef7;
      border-color: #597ef7;
      i {
        margin-right: 5px;
        font-size: 14px;
      }
    }
    .el-upload__tip {
      display: inline-block;
      position: absolute;
      margin-left: 10px;
    }
  }
  .btnList {
    margin: 15px 25px 0 24px;
    position: absolute;
    right: 0;
  }
}
</style>
