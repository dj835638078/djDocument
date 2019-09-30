<template>
  <div class="infoDialog" v-if="$parent.infoDialogFlag">
    <i class="el-icon-close closeIcon" @click="closeDialog"></i>
    <refuseDialog :isShowDialog="isShowDialog" @noPassEvent="noPassEvent" />
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
            <span class="textHeadColor">标题：</span>
            <span :title="formList.videoTitle">{{ formList.videoTitle }}</span>
          </li>
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
            <span :title="formList.rowkey">{{ formList.rowkey }}</span>
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
              :title="formList.videoUrl"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              >{{ formList.videoUrl }}</span
            >
          </li>
        </ul>
        <!-- </transition> -->
        <div
          class="leftInfoHead"
          v-if="
            title == '记录' ||
              title == '质检' ||
              title == '质检记录' ||
              title == '巡检' ||
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
            <span
              :title="
                tools.setRole(
                  formList.processAccount || formList.lastProcessAccount
                )
              "
              >{{
                tools.setRole(
                  formList.processAccount || formList.lastProcessAccount
                )
              }}（{{
                formList.processAccount || formList.lastProcessAccount
              }}）</span
            >
          </li>
          <li>
            <span class="textHeadColor">审核时间：</span>
            <span
              :title="
                tools.setFormTime(
                  formList.processDate || formList.lastProcessDate,
                  1
                )
              "
              >{{
                tools.setFormTime(
                  formList.processDate || formList.lastProcessDate,
                  1
                )
              }}</span
            >
          </li>
          <li>
            <span class="textHeadColor">审核结果：</span>
            <span
              :title="
                tools.setStatus(
                  formList.processResult || formList.lastProcessResult
                )
              "
              :class="[
                formList.processResult == 'pass' ||
                formList.lastProcessResult == 'pass'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              >{{
                tools.setStatus(
                  formList.processResult || formList.lastProcessResult
                )
              }}</span
            >
          </li>
          <li
            v-if="
              formList.processResult == 'fail' ||
                formList.lastProcessResult == 'fail'
            "
            class="noProcess"
          >
            <span class="textHeadColor">不通过原因：</span>
            <span
              :title="formList.processReason || formList.lastProcessReason"
              v-html="
                tools.changeBr(
                  formList.processReason || formList.lastProcessReason
                )
              "
            ></span>
          </li>
        </ul>
        <ul
          v-else
          v-show="resultFlag"
          v-for="(item, index) in processResultList"
          :key="index"
        >
          <li>
            <span class="textHeadColor">审核员：</span>
            <span
              :title="
                tools.setRole(item.processAccount || item.lastProcessAccount)
              "
              >{{
                tools.setRole(item.processAccount || item.lastProcessAccount)
              }}（{{ item.processAccount || item.lastProcessAccount }}）</span
            >
          </li>
          <li>
            <span class="textHeadColor">审核时间：</span>
            <span
              :title="
                tools.setFormTime(item.processDate || item.lastProcessDate, 1)
              "
              >{{
                tools.setFormTime(item.processDate || item.lastProcessDate, 1)
              }}</span
            >
          </li>
          <li>
            <span class="textHeadColor">审核结果：</span>
            <span
              :title="
                tools.setStatus(item.processResult || item.lastProcessResult)
              "
              :class="[
                item.processResult == 'pass' || item.lastProcessResult == 'pass'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              >{{
                tools.setStatus(item.processResult || item.lastProcessResult)
              }}</span
            >
          </li>
          <li
            v-if="
              item.processResult == 'fail' || item.lastProcessResult == 'fail'
            "
            class="noProcess"
          >
            <span class="textHeadColor">不通过原因：</span>
            <span
              :title="item.processReason || item.lastProcessReason"
              v-html="
                tools.changeBr(item.processReason || item.lastProcessReason)
              "
            ></span>
          </li>
        </ul>
        <div
          class="leftInfoHead"
          v-if="title == '质检记录' || title == '巡检记录'"
        >
          <h3>
            {{ title == "巡检记录" ? "巡检结果" : "质检结果" }}
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
              :title="tools.changeSign(formList.checkReason)"
              v-html="tools.changeSignBr(formList.checkReason)"
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
          <!-- <iframe :src="formList.atricleUrl" frameborder="0"></iframe> -->
          <videoScreen
            :videoUrl="formList.videoUrl"
            v-if="isRouterAlive"
            ref="videoScreen"
          />
        </div>
        <div
          class="contentBtn"
          v-if="title != '记录' && title != '质检记录' && title != '巡检记录'"
        >
          <!--zx-->
          <el-button
            @click="signOut"
            class="btnWhite"
            v-if="
              title != '质检' && title != '巡检' && !tools.setRight('视频退回')
            "
            >退回</el-button
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
import refuseDialog from "./refuseDialog";
import videoScreen from "./videoScreen";
export default {
  name: "infoDialog",
  data() {
    return {
      isRouterAlive: true,
      isShowDialog: false,
      ConfirmFlag: false,
      noPassReason: "",
      resultFlag: true,
      resultQualityFlag: true,
      contentFlag: true,
      dealFlag: false,
      processResultList: [
        {
          processAccount: "",
          processDate: 0,
          processReason: "",
          processResult: ""
        }
      ]
    };
  },
  props: ["title", "formList"],
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    closeDialog() {
      let vm = this;
      vm.$parent.infoDialogFlag = false;
      if (vm.dealFlag) {
        if (vm.title == "领单") {
          vm.$parent.$parent.inquiry();
        }
        if (vm.title == "质检" || vm.title == "巡检") {
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
          vm.isPassEvent("退回");
        })
        .catch(() => {});
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
          vm.isPassEvent("通过");
        })
        .catch(() => {});
    },
    //是否通过事件
    isPassEvent(flag) {
      let vm = this;
      let data = {};
      let url = "";
      if (flag == "通过") {
        if (vm.title == "质检") {
          url = "/manage/service/videoCheck/check";
          data = {
            vId: vm.formList.vId,
            rowkey: vm.formList.rowkey,
            dataSource: vm.formList.dataSource,
            checkResult: "pass"
          };
        } else if (vm.title == "巡检") {
          url = "/manage/service/videoClientCheck/check";
          data = {
            vId: vm.formList.vId,
            clientCheckResult: "pass"
          };
        } else {
          url = "/manage/service/videoVerify/verify";
          data = {
            vId: vm.formList.vId,
            processResult: "pass"
          };
        }
      }
      if (flag == "不通过") {
        if (vm.title == "质检") {
          url = "/manage/service/videoCheck/check";
          data = {
            vId: vm.formList.vId,
            checkResult: "fail",
            rowkey: vm.formList.rowkey,
            dataSource: vm.formList.dataSource,
            checkReason: vm.noPassReason
          };
        } else if (vm.title == "巡检") {
          url = "/manage/service/videoClientCheck/check";
          data = {
            vId: vm.formList.vId,
            clientCheckResult: "fail",
            clientCheckReason: vm.noPassReason
          };
        } else {
          url = "/manage/service/videoVerify/verify";
          data = {
            vId: vm.formList.vId,
            processResult: "fail",
            processReason: vm.noPassReason
          };
        }
      }
      if (flag == "退回") {
        url = "/manage/service/videoVerify/releaseOfSingle";
        data = {
          vId: vm.formList.vId
        };
      }

      vm.api
        .post(url, data)
        .then(function(response) {
          if (response.data) {
            vm.$parent.detailList = response.data;
            vm.reload();
            if (flag == "不通过") {
              vm.isShowDialog = false;
            }
          } else {
            vm.$parent.infoDialogFlag = false;
            if (vm.title == "领单") {
              vm.$parent.$parent.inquiry();
            }
            if (vm.title == "质检" || vm.title == "巡检") {
              vm.$parent.inquiry();
            }
          }
          vm.dealFlag = true;
          vm.$parent.$parent.inquiry();
        })
        .catch(function(error) {});
    },
    // 获取详情
    getDetail() {
      let vm = this;
      if (
        vm.title == "质检" ||
        vm.title == "质检记录" ||
        vm.title == "巡检" ||
        vm.title == "巡检记录"
      ) {
        vm.api
          .get(`./manage/service/videoCheck/findInfo?vId=${vm.formList.vId}`)
          .then(function(response) {
            vm.processResultList = response.data.processList;
            console.log(vm.processResultList);
          })
          .catch(function(error) {});
      }
    },
    //不通过
    noPassCli() {
      this.isShowDialog = true;
    },
    noPassEvent(reason) {
      this.noPassReason = reason;
      this.isPassEvent("不通过");
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
    videoScreen,
    refuseDialog
  },
  created() {
    this.getDetail();
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
        overflow-y: auto;
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
