<template>
  <div class="infoDialog" v-if="$parent.infoDialogFlagPass">
    <i class="el-icon-close closeIcon" @click="closeDialog"></i>
    <div class="infoLeftBox">
      <div class="infoLeftBoxAdd">
        <h3>
          基本信息
          <i
            :class="[contentFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
            @click="contentFlagCli"
          ></i>
        </h3>
        <!-- <transition name="el-zoom-in-top"> -->
        <ul v-show="contentFlag">
          <li>
            <span class="textHeadColor">账号名称：</span>
            <span :title="infoDetail.accountName">{{
              infoDetail.accountName
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">账号ID：</span>
            <span :title="infoDetail.accountId">{{
              infoDetail.accountId
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">地址：</span>
            <span
              class="hrefClick"
              @click="hrefClick"
              :title="infoDetail.videoUrl"
              style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
              >{{ infoDetail.videoUrl }}</span
            >
          </li>
          <li>
            <span class="textHeadColor">rowkey：</span>
            <span :title="infoDetail.rowkey">{{ infoDetail.rowkey }}</span>
          </li>
          <li>
            <span class="textHeadColor">发布时间：</span>
            <span :title="tools.setFormTime(infoDetail.createDate, 1)">{{
              tools.setFormTime(infoDetail.createDate, 1)
            }}</span>
          </li>
        </ul>
        <!-- </transition> -->
        <h3>
          审核结果
          <i
            :class="[resultFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
            @click="resultFlagCli"
          ></i>
        </h3>
        <!-- <transition name="el-zoom-in-top"> -->
        <ul v-show="resultFlag">
          <li>
            <span class="textHeadColor">审核员：</span>
            <span :title="tools.setRole(infoDetail.processAccount)"
              >{{ tools.setRole(infoDetail.processAccount) }}（{{
                infoDetail.processAccount
              }}）</span
            >
          </li>
          <li v-if="infoDetail.processResult == 'pass'">
            <span class="textHeadColor">视频质量：</span>
            <span :title="tools.setQuality(infoDetail.videoQuality)">{{
              tools.setQuality(infoDetail.videoQuality)
            }}</span>
          </li>
          <li v-if="infoDetail.processResult == 'pass'">
            <span class="textHeadColor">视频水印：</span>
            <span :title="tools.changeSign(infoDetail.watermark)">{{
              tools.changeSign(infoDetail.watermark)
            }}</span>
          </li>
          <li v-if="infoDetail.processResult == 'pass'">
            <span class="textHeadColor">视频尺度：</span>
            <span :title="tools.setScale(infoDetail.videoScale)">{{
              tools.setScale(infoDetail.videoScale)
            }}</span>
          </li>
          <li v-if="infoDetail.processResult == 'pass'">
            <span class="textHeadColor">视频分类：</span>
            <span :title="videoType">{{ videoType }}</span>
          </li>
          <li v-if="infoDetail.processResult == 'pass'">
            <span class="textHeadColor">视频标签：</span>
            <span :title="tools.changeSign(infoDetail.videoTag)">{{
              tools.changeSign(infoDetail.videoTag)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">审核时间：</span>
            <span :title="tools.setFormTime(infoDetail.processDate, 1)">{{
              tools.setFormTime(infoDetail.processDate, 1)
            }}</span>
          </li>
          <li>
            <span class="textHeadColor">审核结果：</span>
            <span
              :title="tools.setStatus(infoDetail.processResult)"
              :class="[
                infoDetail.processResult == 'pass'
                  ? 'activeColorY'
                  : 'activeColorN'
              ]"
              >{{ tools.setStatus(infoDetail.processResult) }}</span
            >
          </li>
          <li v-if="infoDetail.processResult == 'fail'" class="noProcess">
            <span class="textHeadColor">审核原因：</span>
            <span
              :title="tools.changeSign(infoDetail.processReason)"
              v-html="tools.changeSignBr(infoDetail.processReason)"
            ></span>
          </li>
        </ul>
        <!-- </transition> -->
      </div>
    </div>
    <div class="infoRightBox">
      <div class="rightInfoContent">
        <div class="rightInfoHead">
          <h2>视频播放</h2>
        </div>
        <div class="contentBox">
          <div>
            <iframe :src="infoDetail.videoUrl" frameborder="0"></iframe>
          </div>
        </div>
        <div class="infoList">
          <ul>
            <li style="max-width:420px; font-weight:900">
              <span>标题：</span>
              <span :title="infoDetail.videoTitle">{{
                infoDetail.videoTitle
              }}</span>
            </li>
            <li class="doubleSpan">
              <div style="max-width:300px">
                <span>账号：</span>
                <span :title="infoDetail.accountName">{{
                  infoDetail.accountName
                }}</span>
              </div>
              <div style="max-width:300px">
                <span>时长：</span>
                <span
                  :title="tools.setFormTime(infoDetail.contentDuration, 1)"
                  >{{ tools.setTimeFormat(infoDetail.contentDuration) }}</span
                >
              </div>
            </li>
            <li style="max-width:420px">
              <span>备注：</span>
              <span :title="infoDetail.videoRemark">{{
                infoDetail.videoRemark
              }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "infoDialog",
  data() {
    return {
      btnIndex: 0,
      deleteFlag: false,
      resultFlag: true,
      contentFlag: true,
      videoType: ""
    };
  },
  props: ["infoDetail"],
  methods: {
    //关闭弹框
    closeDialog() {
      let vm = this;
      vm.$parent.infoDialogFlagPass = false;
    },
    //点击链接跳转页面
    hrefClick() {
      window.open(this.infoDetail.videoUrl);
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
  components: {},
  mounted() {
    let videoType2 = this.infoDetail.typeLevel2
      ? this.tools.setType2(this.infoDetail.typeLevel2)
      : "";
    let videoType3 = this.infoDetail.typeLevel3
      ? this.tools.setType3(this.infoDetail.typeLevel3)
      : "";
    this.videoType = this.infoDetail.typeLevel1
      ? this.tools.setType(this.infoDetail.typeLevel1)
      : "";
    if (videoType2 && !videoType3) {
      this.videoType = this.videoType + "/" + videoType2;
    }
    if (videoType3) {
      this.videoType = this.videoType + "/" + videoType2 + "/" + videoType3;
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
      .doubleSpan {
        display: flex;
        div {
          flex: 1;
        }
      }
      .rightSpan {
        float: right;
      }
      .btnList {
        height: 80px;
        margin-top: 30px;
        div {
          width: 90px !important;
          height: 28px !important;
          margin-right: 17px !important;
          margin-bottom: 19px !important;
        }
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .rightInfoContent {
      height: 100%;
      background: #fff;
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      .rightInfoHead {
        position: absolute;
        top: 8px;
        left: 22px;
        h2 {
          font-size: 16px;
          font-weight: 900;
          color: rgba(0, 0, 0, 0.85);
          line-height: 28px;
        }
      }
      .contentBox {
        border: 1px solid #ebeef2;
        margin: 22px;
        margin-top: 50px;
        overflow: hidden;
        overflow-x: hidden !important;
        flex: 1;
        > div {
          width: 100%;
          height: 100%;
          iframe {
            width: 100%;
            height: 100%;
          }
        }
      }
      .infoList {
        height: 100px;
        width: 100%;
        padding: 0 22px;
        // background: red;
        ul {
          // margin-top: 20px;
          .doubleSpan {
            display: flex;
            div {
              flex: 1;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          li {
            margin-bottom: 20px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
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
          }
        }
      }
    }
  }
}
</style>
