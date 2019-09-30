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
        <div class="leftInfoHead" v-if="title == '记录'">
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
              v-html="tools.changeBr(formList.processReason)"
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
          <!-- <div class="frameOne">
            <iframe
              :src="formList.coverUrl"
              frameborder="0"
              scrolling="no"
            ></iframe>
          </div> -->
          <!-- <div class="frameTwo"> -->
          <!-- <iframe
            :src="formList.atricleUrl"
            frameborder="0"
          ></iframe> -->
          <!-- </div> -->
          <!-- <div v-html="formList.graphicTxt"></div> -->
        </div>
        <div class="contentBtn">
          <el-button @click="hangUpCli" v-if="title == '领单'" class="btnWhite"
            >挂起</el-button
          >
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
      <div class="infoFooter"></div>
    </div>
  </div>
</template>
<script>
import dialogConfirm from "./dialogConfirm";
export default {
  name: "infoDialog",
  data() {
    return {
      formList: {},
      ConfirmFlag: false,
      noPassReason: {},
      deleteFlag: false,
      resultFlag: true,
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
      if (vm.title == "领单") {
        if (vm.deleteFlag) {
          vm.$parent.inquiry();
          // vm.$parent.getNum();
        }
      }
      if (vm.title == "挂起") {
        if (vm.deleteFlag) {
          vm.$parent.inquiry();
          //vm.$parent.$parent.getNum();
        }
      }
    },
    //点击链接跳转页面
    hrefClick() {
      window.open(this.formList.atricleUrl);
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
      let data = {
        graphicId: vm.formList.graphicId,
        processResult: "pass",
        dataSource: vm.formList.dataSource,
        dataState: dataState
      };
      vm.api
        .post(`./manage/service/graphics/pending`, data)
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
            processReason += `${key}:${this.noPassReason[key]},`;
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
        let data = {
          graphicId: vm.formList.graphicId,
          processResult: "fail",
          dataSource: vm.formList.dataSource,
          processReason: processReason,
          dataState: dataState
        };
        vm.api
          .post(`./manage/service/graphics/pending`, data)
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
    width: 542px;
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
