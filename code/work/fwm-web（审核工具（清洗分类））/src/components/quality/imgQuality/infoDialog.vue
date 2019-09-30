<template>
  <div class="infoDialog" v-if="$parent.infoDialogFlag">
    <i class="el-icon-close closeIcon" @click="closeDialog"></i>
    <dialogConfirm />
    <dialogExpert />
    <div class="infoLeftBox">
      <div class="infoLeftBoxAdd">
        <div class="leftInfoHead">
          <h3>
            基本信息
            <i
              :class="[contentFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
              @click="contentFlagCli"
            ></i>
          </h3>
        </div>
        <!-- <transition name="el-zoom-in-top"> -->
        <ul v-show="contentFlag">
          <li>
            <span class="textHeadColor">账号名称：</span>
            <span :title="formList.accountName">{{
              formList.accountName
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">账号UIN：</span>
            <span :title="formList.accountId">{{ formList.accountId }}</span>
          </li>
          <li>
            <span class="textHeadColor">rowkey：</span>
            <span :title="formList.rowKey">{{ formList.rowKey }}</span>
          </li>
          <li>
            <span class="textHeadColor">转发量：</span>
            <span :title="formList.forwardingVolume">{{
              formList.forwardingVolume
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">发布时间：</span>
            <span :title="tools.setFormTime(formList.createDate, 1)">{{
              tools.setFormTime(formList.createDate, 1)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">地址：</span>
            <span
              class="hrefClick"
              @click="hrefClick"
              :title="formList.atricleUrl"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              >{{ formList.atricleUrl }}</span
            >
          </li>
        </ul>
        <!-- </transition> -->
        <div class="leftInfoHead">
          <h3>
            审核结果
            <i
              :class="[resultFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
              @click="resultFlagCli"
            ></i>
          </h3>
        </div>
        <!-- <transition name="el-zoom-in-top"> -->
        <ul v-show="resultFlag">
          <li v-if="$route.name == 'ImgAbnormal' || $route.name == 'ImgExpert'">
            <span class="textHeadColor">审核人：</span>
            <span :title="tools.setRole(formList.processAccount)"
              >{{ tools.setRole(formList.processAccount) }}（{{
                formList.processAccount
              }}）</span
            >
          </li>
          <li v-else>
            <span class="textHeadColor">审核人：</span>
            <span :title="tools.setRole(formList.ownerAccount)"
              >{{ tools.setRole(formList.ownerAccount) }}（{{
                formList.ownerAccount
              }}）</span
            >
          </li>
          <!-- <li>
            <span class="textHeadColor">审核人账号：</span>
            <span :title="formList.ownerAccount">{{
              formList.ownerAccount
            }}</span>
          </li> -->
          <li>
            <span class="textHeadColor">审核时间：</span>
            <span :title="tools.setFormTime(formList.processDate, 1)">{{
              tools.setFormTime(formList.processDate, 1)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">审核结果：</span>
            <span
              :title="tools.setStatus(formList.processResult)"
              :class="[
                formList.processResult == 'pass'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              >{{ tools.setStatus(formList.processResult) }}</span
            >
          </li>
          <li v-if="formList.processResult == 'fail'" class="noProcess">
            <span class="textHeadColor">不通过原因：</span>
            <span
              :title="formList.processReason"
              class="ellipsisClass"
              v-html="tools.changeBr(formList.processReason)"
            ></span>
          </li>
        </ul>
        <!-- </transition> -->
        <div
          class="leftInfoHead"
          v-if="
            title == '记录' ||
              $route.name == 'ImgAbnormal' ||
              $route.name == 'ImgExpert'
          "
        >
          <h3>
            质检结果
            <i
              :class="[
                resultQualityFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
              ]"
              @click="resultQualityFlagCli"
            ></i>
          </h3>
        </div>
        <!-- <transition name="el-zoom-in-top"> -->
        <ul
          v-if="
            title == '记录' ||
              $route.name == 'ImgAbnormal' ||
              $route.name == 'ImgExpert'
          "
          v-show="resultQualityFlag"
        >
          <li>
            <span class="textHeadColor">质检人：</span>
            <span :title="tools.setRole(formList.checkAccount)"
              >{{ tools.setRole(formList.checkAccount) }}（{{
                formList.checkAccount
              }}）</span
            >
          </li>
          <!-- <li>
            <span class="textHeadColor">质检人账号：</span>
            <span :title="formList.checkAccount">{{
              formList.checkAccount
            }}</span>
          </li> -->
          <li>
            <span class="textHeadColor">质检时间：</span>
            <span :title="tools.setFormTime(formList.checkDate, 1)">{{
              tools.setFormTime(formList.checkDate, 1)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">质检结果：</span>
            <span
              :title="tools.setStatus(formList.checkResult)"
              :class="[
                formList.checkResult == 'pass' ? 'activeColorY' : 'activeColorN'
              ]"
              >{{ tools.setStatus(formList.checkResult) }}</span
            >
          </li>
          <li v-if="formList.checkResult == 'fail'" class="noProcess">
            <span class="textHeadColor">不通过原因：</span>
            <span
              :title="formList.checkReson"
              v-html="tools.changeBr(formList.checkReson)"
              class="ellipsisClass"
            ></span>
          </li>
        </ul>

        <!-- 业务专家审核员申诉按钮 -->
        <div class="operateBtnList" v-if="formList.showPage == 'imageCheck'">
          <div class="new" @click="appealDialog">发起申诉</div>
        </div>

        <!-- 业务专家评审页面 -->
        <h3 v-if="formList.showPage == 'imageExpert'">
          评审意见
          <i
            :class="[
              resultReviewFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
            ]"
            @click="resultReviewFlagCli"
          ></i>
        </h3>
        <!-- <transition name="el-zoom-in-top"> -->
        <div
          v-show="resultReviewFlag && formList.showPage == 'imageExpert'"
          style="position: relative"
        >
          <el-input
            type="textarea"
            v-model="appealOpinion"
            placeholder="请填写评审原因，最多200字。"
            maxlength="200"
            style="margin-top:15px"
          ></el-input>
          <p class="appealInfo" v-if="appealInfoFlag">*请填写审核意见</p>
          <div class="operateBtnList" style="border-top:none">
            <div class="new" @click="appealDeal('yes')">通过</div>
            <div class="blank" @click="appealDeal('no')">不通过</div>
          </div>
        </div>

        <!-- 业务专家评审详情页面 -->

        <div
          class="leftInfoHead"
          v-if="
            (formList.showPage == 'imageSavantCheck' &&
              formList.appealState == 1) ||
              formList.showPage == 'imageFruit'
          "
        >
          <h3>
            {{ appealTitle }}
            <i
              :class="[
                resultReviewFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
              ]"
              @click="resultReviewFlagCli"
            ></i>
          </h3>
        </div>
        <!-- <transition name="el-zoom-in-top"> -->
        <ul
          v-if="
            (formList.showPage == 'imageSavantCheck' &&
              formList.appealState == 1) ||
              formList.showPage == 'imageFruit'
          "
          v-show="resultReviewFlag"
        >
          <li>
            <span class="textHeadColor">业务专家：</span>
            <span :title="tools.setRole(formList.expertAccount)"
              >{{ tools.setRole(formList.expertAccount) }}（{{
                formList.expertAccount
              }}）</span
            >
          </li>
          <!-- <li>
            <span class="textHeadColor">质检人账号：</span>
            <span :title="formList.checkAccount">{{
              formList.checkAccount
            }}</span>
          </li> -->
          <li>
            <span class="textHeadColor">评审时间：</span>
            <span :title="tools.setFormTime(formList.expertDate, 1)">{{
              tools.setFormTime(formList.expertDate, 1)
            }}</span>
          </li>
          <li v-if="$route.name == 'ImgAbnormal'">
            <span class="textHeadColor">评审结果：</span>
            <span
              :title="appealFinallyVal"
              :class="[
                appealFinallyVal == '通过' ? 'activeColorY' : 'activeColorN'
              ]"
              >{{ appealFinallyVal }}</span
            >
          </li>
          <li v-else>
            <span class="textHeadColor">评审结果：</span>
            <span
              :title="tools.setStatus(formList.expertResult)"
              :class="[
                formList.expertResult == 'pass'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              >{{ tools.setStatus(formList.expertResult) }}</span
            >
          </li>
          <!-- <li v-if="formList.expertResult == 'fail'" class="noProcess"> -->
          <li v-if="formList.expertReason" class="noProcess">
            <span class="textHeadColor">评审意见：</span>
            <span
              :title="formList.expertReason"
              v-html="tools.changeBr(formList.expertReason)"
            ></span>
          </li>
        </ul>

        <!-- 解决ie中样式错乱问题 -->
        <div
          v-show="true"
          style="position:absolute;top:0;opacity:0;z-index:-999"
        >
          <el-input type="textarea" disabled></el-input>
        </div>

        <!-- </transition> -->
        <div class="contentBtn" v-if="title == '领单'">
          <el-button @click="noPassCli" v-if="title != '记录'" class="btnWhite"
            >不通过</el-button
          >
          <el-button
            type="primary"
            class="passBtn"
            v-if="title != '记录'"
            @click="passCli"
            >通过</el-button
          >
        </div>
      </div>
    </div>
    <div class="infoRightBox">
      <div class="rightInfoContent">
        <div class="rightInfoHead">
          <h3 style="border: none">内容信息展示</h3>
        </div>
        <div class="contentBox">
          <iframe :src="formList.atricleUrl" frameborder="0"></iframe>
        </div>
        <div class="contentBtn"></div>
      </div>
      <div class="infoFooter"></div>
    </div>
  </div>
</template>
<script>
import dialogConfirm from "./dialogConfirm";
import dialogExpert from "../VideoQuality/dialogExpert";
export default {
  name: "infoDialog",
  data() {
    return {
      // formList: {},
      ConfirmFlag: false,
      noPassReason: {},
      deleteFlag: false,
      resultFlag: true,
      resultQualityFlag: true,
      resultReviewFlag: true,
      contentFlag: true,
      formReason: {
        图片不通过原因: "",
        文字不通过原因: "",
        视频不通过原因: "",
        备注: ""
      },
      ConfirmExpertFlag: false,
      appealReason: "",
      BusinessExpertName: "",
      appealTitle: "评审意见",
      appealOpinion: "",
      appealInfoFlag: false,
      BusinessExpertFlag: false, //业务专家标识
      appealFinallyVal: ""
    };
  },
  props: ["dataInfo", "title", "formList"],
  methods: {
    closeDialog() {
      let vm = this;
      vm.$parent.infoDialogFlag = false;
      if (vm.title == "领单") {
        if (vm.deleteFlag) {
          vm.$parent.inquiry();
        }
      }
    },
    //点击链接跳转页面
    hrefClick() {
      window.open(this.formList.atricleUrl);
    },
    //通过
    passCli() {
      let vm = this;
      vm.$confirm("确认通过质检吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          vm.passEvent();
        })
        .catch(() => {});
    },
    //通过事件
    passEvent() {
      let vm = this;
      let data = {
        graphicId: vm.formList.graphicId,
        checkResult: "pass",
        dataSource: vm.formList.dataSource,
        atricleTitle: vm.formList.atricleTitle
      };
      vm.api
        .post(`./manage/service/graphicsCheck/update`, data)
        .then(function(response) {
          if (response.data) {
            vm.formList = response.data;
            vm.getDetail();
          } else {
            vm.$parent.infoDialogFlag = false;
            if (vm.title == "领单") {
              vm.$parent.inquiry();
            }
          }
          vm.deleteFlag = true;
        })
        .catch(function(error) {});
    },
    //不通过
    noPassCli() {
      this.ConfirmFlag = true;
    },
    //不通过事件
    noPassEvent() {
      let vm = this;
      let checkReason = "";
      if (
        this.noPassReason.图片不通过原因 ||
        this.noPassReason.文字不通过原因 ||
        this.noPassReason.视频不通过原因
      ) {
        for (var key in this.noPassReason) {
          if (this.noPassReason[key]) {
            checkReason += `${key}:${this.noPassReason[key]},`;
          }
        }
        checkReason = checkReason.substring(0, checkReason.length - 1);
        let data = {
          graphicId: vm.formList.graphicId,
          checkResult: "fail",
          dataSource: vm.formList.dataSource,
          checkReason: checkReason,
          atricleTitle: vm.formList.atricleTitle
        };
        vm.api
          .post(`./manage/service/graphicsCheck/update`, data)
          .then(function(response) {
            vm.ConfirmFlag = false;
            if (response.data) {
              vm.formList = response.data;
              vm.getDetail();
            } else {
              vm.$parent.infoDialogFlag = false;
              if (vm.title == "领单") {
                vm.$parent.inquiry();
                //vm.$parent.getNum();
              }
            }
            vm.deleteFlag = true;
            vm.formReason.图片不通过原因 = "";
            vm.formReason.文字不通过原因 = "";
            vm.formReason.视频不通过原因 = "";
            vm.formReason.备注 = "";
          })
          .catch(function(error) {});
      }
    },
    //查询详情信息
    getDetail(flag) {
      let vm = this;
      let idFlag = "";
      if (flag || vm.title == "记录") {
        idFlag = this.dataInfo;
      } else {
        idFlag = vm.formList.graphicId;
      }
      let url = "";
      if (vm.title == "记录") {
        url = `./manage/service/graphicsCheck/queryById`;
      } else {
        url = `./manage/service/graphicsCheck/queryById`;
      }
      let data = {
        graphicId: idFlag
      };
      vm.api
        .post(url, data)
        .then(function(response) {
          vm.formList = response.data;
          vm.resultFlag = true;
          vm.resultQualityFlag = true;
          vm.resultReviewFlag = true;
          vm.contentFlag = true;
        })
        .catch(function(error) {});
    },
    resultFlagCli() {
      setTimeout(() => {
        this.resultFlag = !this.resultFlag;
      }, 200);
    },
    resultQualityFlagCli() {
      setTimeout(() => {
        this.resultQualityFlag = !this.resultQualityFlag;
      }, 200);
    },
    resultReviewFlagCli() {
      setTimeout(() => {
        this.resultReviewFlag = !this.resultReviewFlag;
      }, 200);
    },
    contentFlagCli() {
      setTimeout(() => {
        this.contentFlag = !this.contentFlag;
      }, 200);
    },
    // 业务专家审核员申诉按钮弹框
    appealDialog() {
      this.ConfirmExpertFlag = true;
    },
    // 业务专家审核员申诉提交按钮
    appealSubmit() {
      let vm = this;
      let checkDate;
      if (vm.formList.checkDate) {
        checkDate = vm.formList.checkDate;
      } else {
        checkDate = vm.formList.processDate;
      }
      let data = {
        graphicId: vm.formList.graphicId,
        expertAccount: vm.BusinessExpertName,
        appealReason: vm.appealReason,
        checkDate: checkDate
      };
      vm.api
        .post(`./manage/service/graphics/submitExpert`, data)
        .then(function(response) {
          if (response.data && response.data.code == 1) {
            vm.ConfirmExpertFlag = false;
            vm.$parent.infoDialogFlag = false;
            vm.$parent.$parent.getImgAbnormalList();
            //调页面的查询接口
          }
        })
        .catch(function(error) {});
    },
    // 业务专家评审按钮
    appealDeal(flag) {
      let vm = this;
      let expertResult = "pass";
      if (flag == "no") {
        expertResult = "fail";
        if (!vm.appealOpinion) {
          vm.appealInfoFlag = true;
          return;
        }
      }
      let data = {
        vegId: vm.formList.vegId,
        expertResult: expertResult,
        expertReason: vm.appealOpinion
      };
      vm.api
        .post(`./manage/service/gexpert/approval`, data)
        .then(function(response) {
          if (response.data && response.data.code == 1) {
            vm.$parent.infoDialogFlag = false;
            vm.$parent.$parent.getImgexpertList();
            //调页面的查询接口
          } else {
            vm.$message({
              message: response.data.message,
              type: "error"
            });
          }
        })
        .catch(function(error) {});
    }
  },
  watch: {
    appealOpinion(newVal, oldVal) {
      if (newVal) {
        this.appealInfoFlag = false;
      }
    }
  },
  components: {
    dialogConfirm,
    dialogExpert
  },
  mounted() {
    if (this.$route.name == "ImgAbnormal" || this.$route.name == "ImgExpert") {
    } else {
      this.getDetail(true);
    }
    if (this.$route.name == "ImgAbnormal") {
      this.appealTitle = "评审结果";
    }
    if (this.formList.expertResult == "pass") {
      this.appealFinallyVal = this.tools.setStatus(this.formList.processResult);
    } else {
      this.appealFinallyVal = this.tools.setStatus(this.formList.checkResult);
    }
  }
};
</script>

<style scoped lang="less">
.contentBox /deep/ .has-bottombar {
  overflow-x: hidden;
}
.infoDialog {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 54px;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: row-reverse;
  h3 {
    border-bottom: 1px solid #ebeef2;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    margin-top: 9px;
    padding-bottom: 12px;
    i {
      float: right;
      cursor: pointer;
      font-size: 18px;
    }
  }
  .closeIcon {
    position: absolute;
    cursor: pointer;
    font-size: 26px;
    right: 30px;
    top: 60px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.65);
  }
  .infoLeftBox {
    width: 542px;
    height: 100%;
    background: #f0f2f5;
    box-sizing: border-box;
    padding: 40px 30px 103px 0px;
    .operateBtnList {
      display: flex;
      justify-content: center;
      border-top: 1px solid #ebeef2;
      height: 36px;
      margin-top: 20px;
      padding-top: 10px;
    }
    .appealInfo {
      color: red;
      margin-top: 8px;
      position: absolute;
    }
    .infoLeftBoxAdd {
      display: flex;
      background: #fff;
      height: 100%;
      padding: 12px 30px;
      flex-direction: column;
      position: relative;
      overflow-y: auto;
      .contentBtn {
        flex: 0 0 52px;
        margin-top: 15px;
        padding-top: 10px;
        border-top: 1px solid #ebeef2;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-button {
          width: 72px;
          height: 32px;
        }
        .btnWhite {
          &:focus {
            background: #fff;
            color: #606266;
          }
        }
        .passBtn {
          background: #597ef7;
        }
      }
      .leftInfoHead {
        padding-bottom: 12px;
        position: relative;
        // h3 {
        //   border-bottom: 1px solid #ebeef2;
        //   font-size: 16px;
        //   color: rgba(0, 0, 0, 0.85);
        //   font-weight: 600;
        //   margin-top: 9px;
        //   padding-bottom: 12px;
        //   i {
        //     float: right;
        //     cursor: pointer;
        //     font-size: 18px;
        //   }
        // }
      }
      ul {
        margin-top: 20px;
        li {
          margin-bottom: 24px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: flex;
          div {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .hrefClick {
            color: #1890ff;
            cursor: pointer;
          }
          span {
            color: rgba(0, 0, 0, 0.85);
          }
          span:first-child {
            flex: 0 0 84px;
          }
          span:last-child {
            white-space: normal;
            min-height: 16px;
          }
          .ellipsisClass {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 350px;
          }
        }
      }
    }
  }
  .infoRightBox {
    flex: 1;
    height: 100%;
    // margin-top: 54px;
    background: #f0f2f5;
    padding: 40px 10px 80px 30px;
    padding: 12px 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // h3 {
    //   border-bottom: 1px solid #ebeef2;
    //   font-size: 16px;
    //   color: rgba(0, 0, 0, 0.85);
    //   font-weight: 600;
    //   margin-top: 9px;
    //   padding-bottom: 12px;
    //   i {
    //     float: right;
    //     cursor: pointer;
    //     font-size: 18px;
    //   }
    // }
    .rightInfoHead {
      padding-bottom: 12px;
      position: relative;
      // h2 {
      //   font-size: 16px;
      //   font-weight: 900;
      //   color: rgba(0, 0, 0, 0.85);
      //   line-height: 28px;
      // }
    }
    .rightInfoContent {
      height: 100%;
      background: #fff;
      position: relative;
      margin-top: 28px;
      flex: 1;
      display: flex;
      flex-direction: column;
      .rightInfoHead {
        position: absolute;
        top: 8px;
        left: 22px;
        // h2 {
        //   font-size: 16px;
        //   font-weight: 900;
        //   color: rgba(0, 0, 0, 0.85);
        //   line-height: 28px;
        // }
      }
      .contentBox {
        border: 1px solid #ebeef2;
        margin: 22px;
        overflow: hidden;
        margin-top: 50px;
        overflow-x: hidden !important;
        flex: 1;
        iframe {
          width: 100%;
          height: 100%;
        }
      }
      .contentBtn {
        flex: 0 0 30px;
        // border-top: 1px solid #ebeef2;
      }
    }
    .infoFooter {
      flex: 0 0 68px;
    }
  }
}
</style>
