<template>
  <div class="infoDialog" v-if="$parent.infoDialogFlag">
    <i class="el-icon-close closeIcon" @click="closeDialog"></i>
    <dialogConfirm />
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
          <!-- <li>
            <span class="textHeadColor">转发量：</span>
            <span :title="formList.forwardingVolume">{{
              formList.forwardingVolume
            }}</span>
          </li> -->
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
        <div
          class="leftInfoHead"
          v-if="
            title == '记录' ||
              title == '质检' ||
              title == '巡检' ||
              title == '质检记录' ||
              title == '巡检记录'
          "
        >
          <h3>
            审核结果
            <i
              :class="[resultFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
              @click="resultFlagCli"
            ></i>
          </h3>
        </div>
        <!-- <transition name="el-zoom-in-top"> -->
        <ul v-if="title == '记录'" v-show="resultFlag">
          <li>
            <span class="textHeadColor">审核员：</span>
            <span :title="tools.setRole(formList.ownerAccount)"
              >{{ tools.setRole(formList.ownerAccount) }}（{{
                formList.ownerAccount
              }}）</span
            >
          </li>
          <li>
            <span class="textHeadColor">审核时间：</span>
            <span :title="tools.setFormTime(formList.lastProcessDate, 1)">{{
              tools.setFormTime(formList.lastProcessDate, 1)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">审核结果：</span>
            <span
              :title="tools.setStatus(formList.lastProcessResult)"
              :class="[
                formList.lastProcessResult == 'pass'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              >{{ tools.setStatus(formList.lastProcessResult) }}</span
            >
          </li>
          <li v-if="formList.lastProcessResult == 'fail'" class="noProcess">
            <span class="textHeadColor">不通过原因：</span>
            <span
              :title="formList.lastProcessReason"
              v-html="tools.changeBr(formList.lastProcessReason)"
            ></span>
          </li>
        </ul>
        <ul
          v-else
          v-show="resultFlag"
          v-for="(item, index) in formList.records"
          :key="index"
        >
          <li>
            <span class="textHeadColor">审核员：</span>
            <span :title="tools.setRole(item.processAccount)"
              >{{ tools.setRole(item.processAccount) }}（{{
                item.processAccount
              }}）</span
            >
          </li>
          <li>
            <span class="textHeadColor">审核时间：</span>
            <span :title="tools.setFormTime(item.processDate, 1)">{{
              tools.setFormTime(item.processDate, 1)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">审核结果：</span>
            <span
              :title="tools.setStatus(item.processResult)"
              :class="[
                item.processResult == 'pass' ? 'activeColorY' : 'activeColorN'
              ]"
              >{{ tools.setStatus(item.processResult) }}</span
            >
          </li>
          <li v-if="item.processResult == 'fail'" class="noProcess">
            <span class="textHeadColor">不通过原因：</span>
            <span
              :title="item.processReason"
              v-html="tools.changeBr(item.processReason)"
            ></span>
          </li>
        </ul>
        <div
          class="leftInfoHead"
          v-if="title == '质检记录' || title == '巡检记录'"
        >
          <h3>
            {{ title == "巡检记录" ? "巡检记录" : "质检结果" }}
            <i
              :class="[
                resultQualityFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
              ]"
              @click="resultQualityFlagCli"
            ></i>
          </h3>
        </div>
        <ul
          v-if="
            resultQualityFlag && (title == '质检记录' || title == '巡检记录')
          "
        >
          <li>
            <span class="textHeadColor">{{
              title == "巡检记录" ? "巡检人：" : "质检人："
            }}</span>
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
            <span class="textHeadColor">{{
              title == "巡检记录" ? "巡检时间：" : "质检时间："
            }}</span>
            <span :title="tools.setFormTime(formList.checkDate, 1)">{{
              tools.setFormTime(formList.checkDate, 1)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">{{
              title == "巡检记录" ? "巡检结果：" : "质检结果："
            }}</span>
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
              v-if="title == '巡检记录'"
              :title="formList.clientCheckReason"
              v-html="tools.changeBr(formList.clientCheckReason)"
              class="ellipsisClass"
            ></span>
            <span
              v-else
              :title="formList.checkReson"
              v-html="tools.changeBr(formList.checkReson)"
              class="ellipsisClass"
            ></span>
          </li>
        </ul>
        <!-- </transition> -->
      </div>
    </div>
    <div class="infoRightBox">
      <div class="rightInfoContent">
        <div class="rightInfoHead">
          <h3 style="border: none">内容信息展示</h3>
        </div>
        <div class="contentBox" id="contentBox">
          <iframe :src="formList.atricleUrl" frameborder="0"></iframe>
        </div>
        <div class="contentBtn" v-if="title != '记录' && title != '质检记录'">
          <!--zx-->
          <el-button
            @click="signOut"
            class="btnWhite"
            v-if="
              title != '质检' && title != '巡检' && !tools.setRight('图文退回')
            "
            >退回</el-button
          >
          <el-button
            @click="hangUpCli"
            v-if="title == '领单' && title != '质检' && title != '巡检'"
            class="btnWhite"
            >挂起</el-button
          >
          <el-button @click="noPassCli" class="btnWhite">不通过</el-button>
          <el-button type="primary" class="passBtn" @click="passCli"
            >通过</el-button
          >
        </div>
      </div>
      <div class="infoFooter"></div>
    </div>
  </div>
</template>
<script>
import dialogConfirm from "./taskDetailRefuse";
export default {
  name: "infoDialog",
  data() {
    return {
      formList: {},
      ConfirmFlag: false,
      noPassReason: {},
      deleteFlag: false,
      resultFlag: true,
      resultQualityFlag: true,
      contentFlag: true,
      formReason: {
        图片不通过原因: "",
        文字不通过原因: "",
        视频不通过原因: "",
        备注: ""
      }
    };
  },
  props: ["dataInfo", "title"],
  methods: {
    closeDialog() {
      let vm = this;
      vm.$parent.infoDialogFlag = false;
      if (
        vm.title == "领单" ||
        vm.title == "挂起" ||
        vm.title == "质检" ||
        vm.title == "巡检"
      ) {
        if (vm.deleteFlag) {
          vm.$parent.inquiry();
        }
      }
    },
    //点击链接跳转页面
    hrefClick() {
      window.open(this.formList.atricleUrl);
    },
    //退回
    signOut() {
      let vm = this;
      vm.$confirm("是否退回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          vm.signOutEvent();
        })
        .catch(() => {});
    },
    //退回事件
    signOutEvent() {
      let vm = this;
      let data = {
        graphicId: vm.formList.graphicId,
        dataSource: vm.formList.dataSource,
        dataState: 1
      };
      vm.api
        .post(`./manage/service/graphics/releaseByGraphiId`, data)
        .then(function(response) {
          if (response.data) {
            vm.formList = response.data;
            vm.getDetail();
          } else {
            vm.$parent.infoDialogFlag = false;
            if (vm.title == "领单") {
              vm.$parent.resetData();
              //vm.$parent.getNum();
            }
            if (vm.title == "挂起") {
              vm.$parent.reset();
              //vm.$parent.$parent.getNum();
            }
            vm.$parent.inquiry();
          }
          vm.deleteFlag = true;
        })
        .catch(function(error) {});
    },
    //挂起
    hangUpCli() {
      let vm = this;
      vm.$confirm("是否挂起?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          vm.hangEvent();
        })
        .catch(() => {});
    },
    //挂起事件
    hangEvent() {
      let vm = this;
      let data = {
        graphicId: vm.formList.graphicId,
        dataSource: vm.formList.dataSource,
        dataState: 1
      };

      vm.api
        .post(`./manage/service/graphics/hangup`, data)
        .then(function(response) {
          if (response.data) {
            vm.formList = response.data;
            vm.getDetail();
          } else {
            vm.$parent.infoDialogFlag = false;
            vm.$parent.resetData();
            vm.$parent.inquiry();
            //vm.$parent.getNum();
          }
          vm.deleteFlag = true;
        })
        .catch(function(error) {});
    },
    //通过
    passCli() {
      let vm = this;
      vm.$confirm("是否审核通过?", "提示", {
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
      let dataState = "";
      if (vm.title == "领单") {
        dataState = 1;
      }
      if (vm.title == "挂起") {
        dataState = 2;
      }
      let data = {};
      let url = "";
      if (vm.title == "质检") {
        data = {
          graphicId: vm.formList.graphicId,
          checkResult: "pass",
          dataSource: vm.formList.dataSource,
          atricleTitle: vm.formList.atricleTitle
        };
        url = `./manage/service/graphicsCheck/update`;
      } else if (vm.title == "巡检") {
        data = {
          graphicId: vm.formList.graphicId,
          clientCheckResult: "pass",
          dataSource: vm.formList.dataSource,
          atricleTitle: vm.formList.atricleTitle
        };
        url = `./manage/service/graphicsClientCheck/update`;
      } else {
        data = {
          graphicId: vm.formList.graphicId,
          lastProcessResult: "pass",
          dataSource: vm.formList.dataSource,
          dataState: dataState
        };
        url = `./manage/service/graphics/pending`;
      }
      vm.api
        .post(url, data)
        .then(function(response) {
          if (response.data) {
            vm.formList = response.data;
            vm.getDetail();
          } else {
            vm.$parent.infoDialogFlag = false;
            if (vm.title == "领单") {
              vm.$parent.resetData();
              //vm.$parent.getNum();
            }
            if (vm.title == "挂起") {
              vm.$parent.reset();
              //vm.$parent.$parent.getNum();
            }
            vm.$parent.inquiry();
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
      let processReason = "";
      if (
        this.noPassReason.图片不通过原因 ||
        this.noPassReason.文字不通过原因 ||
        this.noPassReason.视频不通过原因
      ) {
        for (var key in this.noPassReason) {
          if (this.noPassReason[key]) {
            processReason += `${key}:${this.noPassReason[key]};`;
          }
        }
        processReason = processReason.substring(0, processReason.length - 1);
        let dataState = "";
        if (vm.title == "领单") {
          dataState = 1;
        }
        if (vm.title == "挂起") {
          dataState = 2;
        }
        let data = {};
        let url = "";
        if (vm.title == "质检") {
          data = {
            graphicId: vm.formList.graphicId,
            checkResult: "fail",
            dataSource: vm.formList.dataSource,
            checkReason: processReason,
            atricleTitle: vm.formList.atricleTitle
          };
          url = `./manage/service/graphicsCheck/update`;
        } else {
          data = {
            graphicId: vm.formList.graphicId,
            lastProcessResult: "fail",
            dataSource: vm.formList.dataSource,
            lastProcessReason: processReason,
            dataState: dataState
          };
          url = `./manage/service/graphics/pending`;
        }
        if (vm.title == "巡检") {
          data = {
            graphicId: vm.formList.graphicId,
            clientCheckResult: "fail",
            dataSource: vm.formList.dataSource,
            clientCheckReason: processReason,
            atricleTitle: vm.formList.atricleTitle
          };
          url = `./manage/service/graphicsClientCheck/update`;
        }
        vm.api
          .post(url, data)
          .then(function(response) {
            vm.ConfirmFlag = false;
            if (response.data) {
              vm.formList = response.data;
              vm.getDetail();
            } else {
              vm.$parent.infoDialogFlag = false;
              if (vm.title == "领单") {
                vm.$parent.resetData();
                //vm.$parent.getNum();
              }
              if (vm.title == "挂起") {
                vm.$parent.reset();
                //vm.$parent.$parent.getNum();
              }
              vm.$parent.inquiry();
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
        url = `./manage/service/graphicsResult/queryById`;
      } else if (vm.title == "质检" || vm.title == "质检记录") {
        url = `./manage/service/graphicsCheck/queryById`;
      } else if (vm.title == "巡检" || vm.title == "巡检记录") {
        url = `./manage/service/graphicsClientCheck/queryById`;
      } else {
        url = `./manage/service/graphics/queryByCondition`;
      }
      let data = {
        graphicId: idFlag
      };
      vm.api
        .post(url, data)
        .then(function(response) {
          vm.formList = response.data;
          vm.resultFlag = true;
          vm.contentFlag = true;
        })
        .catch(function(error) {});
    },
    resultFlagCli() {
      setTimeout(() => {
        this.resultFlag = !this.resultFlag;
      }, 200);
    },
    contentFlagCli() {
      setTimeout(() => {
        this.contentFlag = !this.contentFlag;
      }, 200);
    },
    resultQualityFlagCli() {
      setTimeout(() => {
        this.resultQualityFlag = !this.resultQualityFlag;
      }, 200);
    }
  },
  components: {
    dialogConfirm
  },
  mounted() {
    this.getDetail(true);
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
    width: 480px;
    height: 100%;
    background: #f0f2f5;
    box-sizing: border-box;
    padding: 40px 30px 103px 0px;
    .infoLeftBoxAdd {
      display: flex;
      background: #fff;
      height: 100%;
      padding: 12px 30px;
      flex-direction: column;
      position: relative;
      overflow-y: auto;
      .leftInfoHead {
        padding-bottom: 12px;
        position: relative;
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
    .rightInfoHead {
      padding-bottom: 12px;
      position: relative;
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
        flex: 0 0 52px;
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
    }
    .infoFooter {
      flex: 0 0 68px;
    }
  }
}
</style>
