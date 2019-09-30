<template>
  <div class="infoDialog" v-if="$parent.infoImgFlag">
    <i class="el-icon-close closeIcon" @click="closeDialog"></i>
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
        <div
          class="leftInfoHead"
          v-if="formList.dataState == 3 || formList.dataState == 4"
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
        <ul
          v-show="resultFlag"
          v-if="formList.dataState == 3 || formList.dataState == 4"
        >
          <li>
            <span class="textHeadColor">审核人：</span>
            <span :title="tools.setRole(formList.ownerAccount)">{{
              tools.setRole(formList.ownerAccount)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">审核人账号：</span>
            <span :title="formList.ownerAccount">{{
              formList.ownerAccount
            }}</span>
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
        <div class="leftInfoHead" v-if="formList.dataState == 4">
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
        <ul v-if="formList.dataState == 4" v-show="resultQualityFlag">
          <li>
            <span class="textHeadColor">质检人：</span>
            <span :title="tools.setRole(formList.checkAccount)">{{
              tools.setRole(formList.checkAccount)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">质检人账号：</span>
            <span :title="formList.checkAccount">{{
              formList.checkAccount
            }}</span>
          </li>
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
            ></span>
          </li>
        </ul>
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
export default {
  name: "infoDialog",
  data() {
    return {
      ConfirmFlag: false,
      noPassReason: {},
      deleteFlag: false,
      resultFlag: true,
      resultQualityFlag: true,
      contentFlag: true
    };
  },
  props: ["formList"],
  methods: {
    closeDialog() {
      let vm = this;
      vm.$parent.infoImgFlag = false;
    },
    //点击链接跳转页面
    hrefClick() {
      window.open(this.formList.atricleUrl);
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
    contentFlagCli() {
      setTimeout(() => {
        this.contentFlag = !this.contentFlag;
      }, 200);
    }
  },
  components: {},
  mounted() {}
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
        flex: 0 0 30px;
      }
    }
    .infoFooter {
      flex: 0 0 68px;
    }
  }
}
</style>
