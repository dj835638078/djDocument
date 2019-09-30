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
      <div class="title">报备功能</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="informationAddContent">
      <div class="infoTitle">基本信息</div>
      <el-form>
        <div class="inputGroup">
          <span class="iconSymbol"
            >*<span class="iconTitle">审核来源：</span></span
          >
          <el-select
            clearable
            v-model="dataSource"
            placeholder="请选择审核来源"
            class="smallWidth"
          >
            <el-option
              v-for="(item, index) in lookUp.DATASOURCE_CD_TW"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            >
            </el-option>
          </el-select>
          <div class="infoError" v-if="judgeDataSource">
            请选择录入信息的来源
          </div>
        </div>
        <div class="inputGroup">
          <span class="iconSymbol"
            >*<span class="iconTitle">rowkey：</span></span
          >
          <el-input
            v-model="rowkey"
            maxlength="30"
            clearable
            class="smallWidth"
            placeholder="请输入rowkey"
          ></el-input>
          <div class="infoError" v-if="judgeRowkey">请输入rowkey</div>
        </div>
        <div class="inputGroup">
          <span class="iconSymbol"
            >*<span class="iconTitle">报备理由：</span></span
          >
          <el-input
            v-model="filingReason"
            maxlength="500"
            type="textarea"
            class="smallWidth"
            placeholder="请填写报备理由，最多可输入500字"
          ></el-input>
          <div class="infoError" v-if="judgeFilingReason" style="top: 70px;">
            请输报备理由
          </div>
        </div>
        <div class="inputGroup">
          <span class="iconSymbol"
            >*<span class="iconTitle">文章标题：</span></span
          >
          <el-input
            v-model="articleTitle"
            maxlength="50"
            clearable
            class="bigWidth"
            placeholder="请输入文章标题，最多支持输入50字"
          ></el-input>
          <div class="infoError" v-if="judgeArticleTitle">请输入文章标题</div>
        </div>
        <div class="inputGroup">
          <span class="iconSymbol"
            >*<span class="iconTitle">文章正文：</span></span
          >
          <quill-editor
            :content="articleContent"
            :options="editorOption"
            class="bigWidth"
            @change="onEditorChange($event)"
          >
          </quill-editor>
          <div class="infoError" v-if="judgeArticleContent" style="top: 255px;">
            请输入文章正文
          </div>
        </div>
        <div class="submitBtnBox">
          <div class="blank" @click="goBack">取消</div>
          <div class="main submitBtn" @click="submitBtn">提交</div>
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
      editorOption: {
        // something config
        placeholder: "请输入文章正文内容，支持上传图片"
      },
      //来源
      dataSource: "",
      judgeDataSource: false,
      //rowkey
      rowkey: "",
      judgeRowkey: false,
      //报备理由
      filingReason: "",
      judgeFilingReason: false,
      //文章标题
      articleTitle: "",
      judgeArticleTitle: false,
      //文章正文
      articleContent: "",
      judgeArticleContent: false,

      infoDialogShow: false
    };
  },
  components: {},
  computed: {
    ...mapState(["lookUp"])
  },
  mounted() {},
  watch: {},
  methods: {
    goBack() {
      this.$router.go(-1); //返回上一层
    },
    //处理富文本
    onEditorChange({ editor, html, text }) {
      //控制长度为2000
      this.articleContent = html;
    },
    infoConfirm() {
      let vm = this;
      let data = {
        dataSource: this.dataSource,
        rowkey: this.rowkey,
        filingReason: this.filingReason,
        articleTitle: this.articleTitle,
        articleContent: this.articleContent
      };
      vm.api
        .post(`./complex/service/filing/add`, data)
        .then(response => {
          if (response.status == 200) {
            // vm.infoDialogShow = false;
            vm.$router.push({ name: "reportFunction" });
          }
        })
        .catch(error => {});
    },
    infoCancel() {
      this.infoDialogShow = false;
    },
    // 保存按钮
    submitBtn() {
      this.checkedIn();
      if (this.judgeDataSource || this.judgeRowkey) {
        return;
      }
      this.infoConfirm();
      // this.infoDialogShow = true;
    },
    // 数据校验
    checkedIn() {
      if (!this.dataSource) {
        this.judgeDataSource = true;
      } else {
        this.judgeDataSource = false;
      }
      if (!this.rowkey) {
        this.judgeRowkey = true;
      } else {
        this.judgeRowkey = false;
      }
      if (!this.filingReason) {
        this.judgeFilingReason = true;
      } else {
        this.judgeFilingReason = false;
      }
      if (!this.articleTitle) {
        this.judgeArticleTitle = true;
      } else {
        this.judgeArticleTitle = false;
      }
      if (!this.articleContent) {
        this.judgeArticleContent = true;
      } else {
        this.judgeArticleContent = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.inputGroup /deep/.ql-editor.ql-blank::before {
  font-style: normal;
  color: #dbd3d6;
}
.inputGroup /deep/ .ql-container {
  min-height: 120px;
}
.inputGroup /deep/ strong {
  font-weight: 600;
}
.inputGroup /deep/ em {
  font-style: oblique;
}
.inputGroup /deep/ u {
  text-decoration: underline;
}
.inputGroup /deep/ s {
  text-decoration: line-through;
}
.informationAdd /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
}
.informationAdd /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.inputGroup /deep/ textarea {
  height: 68px;
  width: 846px;
  font-family: Arial;
}
.informationAdd {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 0 80px 0px;
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
    .infoTitle {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 25px;
    }
    .el-form {
      margin-top: 10px;
      .inputGroup {
        position: relative;
        margin-bottom: 18px;
        display: flex;
        .iconSymbol {
          color: red;
          display: inline-block;
          width: 90px;
          margin: 10px 5px 0 0;
        }
        .bigWidth {
          width: 846px;
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
          top: 33px;
          left: 95px;
        }
        .infoErrorSpecial {
          top: 98px;
        }
        .noNeed {
          opacity: 0;
        }
      }
      .submitBtnBox {
        width: 164px;
        height: 40px;
        // margin: auto;
        margin-top: 90px;
        margin-left: 420px;
        // margin-left: 95px;
        // margin: auto;
        .submitBtn {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>