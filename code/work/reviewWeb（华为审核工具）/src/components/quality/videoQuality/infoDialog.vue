<template>
  <div class="infoDialog" v-if="$parent.infoDialogFlag">
    <i class="el-icon-close closeIcon" @click="closeDialog"></i>
    <dialogConfirm />
    <div class="infoLeftBox">
      <div class="infoLeftBoxAdd">
        <!-- 业务专家样式调整 -->
        <div class="btnList" :style="BusinessExpertStyle">
          <div
            v-for="(item, index) in btnList"
            :key="index"
            @click="btnClick(item, index)"
            :class="btnIndex == index ? 'newBlank' : 'blank'"
          >
            {{ item }}
          </div>
        </div>
        <div class="videoBox">
          <!-- <div v-if="titleName == '查看详情'" style="overflow: auto;"> -->
          <div v-if="titleName == '查看详情'">
            <h3>
              基本信息
              <i
                :class="[
                  contentFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                ]"
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
                :class="[
                  resultFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                ]"
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
              <li>
                <span class="textHeadColor">审核时间：</span>
                <span :title="tools.setFormTime(infoDetail.processDate, 1)">{{
                  tools.setFormTime(infoDetail.processDate, 1)
                }}</span>
              </li>
              <!-- <li>
                <span class="textHeadColor">审核人账号：</span>
                <span :title="infoDetail.processAccount">{{infoDetail.processAccount}}</span>
              </li> -->
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
                <span class="textHeadColor">不通过原因：</span>
                <span
                  :title="tools.changeSign(infoDetail.processReason)"
                  v-html="tools.changeSignBr(infoDetail.processReason)"
                ></span>
              </li>
            </ul>

            <!-- 业务专家审核员申诉页面 -->
            <h3
              v-if="
                $route.name == 'VideoAbnormal' || $route.name == 'VideoExpert'
              "
            >
              质检结果
              <i
                :class="[
                  resultQualityFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                ]"
                @click="resultQualityFlagCli"
              ></i>
            </h3>
            <!-- <transition name="el-zoom-in-top"> -->
            <ul
              v-show="
                resultQualityFlag &&
                  ($route.name == 'VideoAbnormal' ||
                    $route.name == 'VideoExpert')
              "
            >
              <li>
                <span class="textHeadColor">质检员：</span>
                <span :title="tools.setRole(infoDetail.checkAccount)"
                  >{{ tools.setRole(infoDetail.checkAccount) }}（{{
                    infoDetail.checkAccount
                  }}）</span
                >
              </li>
              <li>
                <span class="textHeadColor">质检时间：</span>
                <span :title="tools.setFormTime(infoDetail.checkDate, 1)">{{
                  tools.setFormTime(infoDetail.checkDate, 1)
                }}</span>
              </li>
              <li>
                <span class="textHeadColor">质检结果：</span>
                <span
                  :title="tools.setStatus(infoDetail.checkResult)"
                  :class="[
                    infoDetail.checkResult == 'pass'
                      ? 'activeColorY'
                      : 'activeColorN'
                  ]"
                  >{{ tools.setStatus(infoDetail.checkResult) }}</span
                >
              </li>
              <li v-if="infoDetail.checkResult == 'fail'" class="noProcess">
                <span class="textHeadColor">不通过原因：</span>
                <span
                  :title="tools.changeSign(infoDetail.checkReason)"
                  v-html="tools.changeSignBr(infoDetail.checkReason)"
                ></span>
              </li>
            </ul>
            <!-- 业务专家审核员申诉按钮 -->
            <div
              class="operateBtnList"
              v-if="infoDetail.showPage == 'videoCheck'"
            >
              <div class="new" @click="appealDialog">发起申诉</div>
            </div>

            <!-- 业务专家评审页面 -->
            <h3 v-if="infoDetail.showPage == 'videoExpert'">
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
              v-show="resultReviewFlag && infoDetail.showPage == 'videoExpert'"
              style="position: relative"
            >
              <el-input
                type="textarea"
                v-model="appealOpinion"
                placeholder="请填写评审意见，最多200字。"
                maxlength="200"
                style="margin-top:15px"
                class="textAreaHeight"
              ></el-input>
              <p class="appealInfo" v-if="appealInfoFlag">*请填写评审意见</p>
              <div class="operateBtnList" style="border-top:none">
                <div class="new" @click="appealDeal('yes')">通过</div>
                <div class="blank" @click="appealDeal('no')">不通过</div>
              </div>
            </div>

            <!-- 业务专家评审详情页面 -->
            <h3
              v-if="
                (infoDetail.showPage == 'videoSavantCheck' &&
                  infoDetail.appealState == 1) ||
                  infoDetail.showPage == 'videoFruit'
              "
            >
              {{ appealTitle }}
              <i
                :class="[
                  resultReviewFlag ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
                ]"
                @click="resultReviewFlagCli"
              ></i>
            </h3>
            <!-- <transition name="el-zoom-in-top"> -->
            <ul
              v-show="
                resultReviewFlag &&
                  ((infoDetail.showPage == 'videoSavantCheck' &&
                    infoDetail.appealState == 1) ||
                    infoDetail.showPage == 'videoFruit')
              "
            >
              <li>
                <span class="textHeadColor">业务专家：</span>
                <span :title="tools.setRole(infoDetail.expertAccount)"
                  >{{ tools.setRole(infoDetail.expertAccount) }}（{{
                    infoDetail.expertAccount
                  }}）</span
                >
              </li>
              <!-- <li>
            <span class="textHeadColor">质检人账号：</span>
            <span :title="infoDetail.checkAccount">{{
              infoDetail.checkAccount
            }}</span>
          </li> -->
              <li>
                <span class="textHeadColor">评审时间：</span>
                <span :title="tools.setFormTime(infoDetail.expertDate, 1)">{{
                  tools.setFormTime(infoDetail.expertDate, 1)
                }}</span>
              </li>
              <li>
                <span class="textHeadColor">评审结果：</span>
                <span
                  :title="tools.setStatus(infoDetail.expertResult)"
                  :class="[
                    infoDetail.expertResult == 'pass'
                      ? 'activeColorY'
                      : 'activeColorN'
                  ]"
                  >{{ tools.setStatus(infoDetail.expertResult) }}</span
                >
              </li>
              <!-- <li v-if="infoDetail.expertResult == 'fail'" class="noProcess"> -->
              <li v-if="infoDetail.expertReason" class="noProcess">
                <span class="textHeadColor">评审意见：</span>
                <span
                  :title="tools.changeSign(infoDetail.expertReason)"
                  v-html="tools.changeSignBr(infoDetail.expertReason)"
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
          </div>
          <div
            v-if="titleName == '查看封面'"
            style="overflow-y: hidden;"
            class="iframeDiv"
          >
            <iframe :src="infoDetail.coverUrl" frameborder="0"></iframe>
          </div>
          <div
            v-if="titleName == '查看评论'"
            style="overflow-y: hidden;"
            class="iframeDiv"
          >
            <iframe :src="infoDetail.commentUrl" frameborder="0"></iframe>
          </div>
          <openMarket v-if="titleName == '启标'" :infoDetail="infoDetail" />
          <forbid v-if="titleName == '禁用'" :infoDetail="infoDetail" />
        </div>
      </div>
    </div>
    <div class="infoRightBox">
      <div class="rightInfoContent">
        <div class="rightInfoHead">
          <h2>查看视频</h2>
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
              <span
                :title="infoDetail.videoTitle"
                v-html="tools.Sensitive(infoDetail.videoTitle, sensitiveArr)"
              ></span>
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
import openMarket from "./openMarket";
import forbid from "./forbid";
import dialogConfirm from "./dialogExpert";
// import dialogConfirm from "./dialogConfirm";openMarket
export default {
  name: "infoDialog",
  data() {
    return {
      btnList: ["查看详情", "查看封面", "查看评论", "启标", "禁用"],
      btnIndex: 0,
      formForbid: {},
      deleteFlag: false,
      //临时
      dataInfo: "100",
      titleName: "查看详情",
      title: "dj",
      resultFlag: true,
      contentFlag: true,
      resultQualityFlag: true,
      resultReviewFlag: true,
      ConfirmExpertFlag: false,
      sensitiveArr: [],
      BusinessExpertName: "",
      appealInfoFlag: false,
      appealOpinion: "",
      appealReason: "",
      appealTitle: "评审意见",
      BusinessExpertFlag: false, //业务专家标识
      BusinessExpertStyle: {} //业务专家样式
    };
  },
  props: ["infoDetail"],
  // props: ["dataInfo", "title"],
  methods: {
    //关闭弹框
    closeDialog() {
      let vm = this;
      vm.$parent.infoDialogFlag = false;
      if (
        vm.$route.name != "VideoAbnormal" &&
        vm.$route.name != "VideoExpert"
      ) {
        vm.$parent.getList();
      }
    },
    //点击链接跳转页面
    hrefClick() {
      window.open(this.infoDetail.videoUrl);
    },
    //按钮点击事件
    btnClick(item, index) {
      this.btnIndex = index;
      this.titleName = item;
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
    },
    resultReviewFlagCli() {
      setTimeout(() => {
        this.resultReviewFlag = !this.resultReviewFlag;
      }, 200);
    },
    //获取敏感信息
    getSensitive() {
      let vm = this;
      let data = {
        channelType: "3_2"
      };
      vm.api
        .post(`./manage/service/autoHighlight/findWords`, data)
        .then(function(response) {
          vm.sensitiveArr = response.data;
        })
        .catch(function(error) {});
    },
    // 业务专家审核员申诉按钮弹框
    appealDialog() {
      this.ConfirmExpertFlag = true;
    },
    // 业务专家审核员申诉提交按钮
    appealSubmit() {
      let vm = this;
      let data = {
        vId: vm.infoDetail.vId,
        expertAccount: vm.BusinessExpertName,
        appealReason: vm.appealReason
      };
      vm.api
        .post(`./manage/service/videoVerify/submitAppeal`, data)
        .then(function(response) {
          if (response.data && response.data == 1) {
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
        vevId: vm.infoDetail.vevId,
        expertResult: expertResult,
        expertReason: vm.appealOpinion
      };
      vm.api
        .post(`./manage/service/videoEexpert/approval`, data)
        .then(function(response) {
          if (response.data && response.data.code == 1) {
            vm.$parent.infoDialogFlag = false;
            vm.$parent.$parent.getImgexpertList();
            //调页面的查询接口
          } else {
            vm.$message({
              message: response.data.message,
              type: "warning"
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
    openMarket,
    forbid
  },
  mounted() {
    this.btnClick("查看详情", 0);
    //业务专家tab页签
    if (
      this.$route.name == "VideoAbnormal" ||
      this.$route.name == "VideoExpert"
    ) {
      this.btnList = ["查看详情", "查看封面", "查看评论"];
      this.BusinessExpertStyle = { width: "60%" };
    } else {
      this.btnList = ["查看详情", "查看封面", "查看评论", "启标", "禁用"];
    }
    if (this.$route.name == "VideoAbnormal") {
      this.appealTitle = "评审结果";
    }
  },
  beforeMount() {
    this.getSensitive();
  }
};
</script>

<style scoped lang="less">
.contentBox /deep/ .has-bottombar {
  overflow-x: hidden;
}
.textAreaHeight /deep/ textarea {
  height: 100px !important;
}
.infoDialog {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  padding-top: 54px;
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
      padding: 12px 30px 12px 30px;
      flex-direction: column;
      position: relative;
      overflow-y: auto;
      .textAreaHeight {
        height: 100px;
      }
      .videoBox {
        height: 100%;
        width: 330px;
        width: 100%;
        margin-top: 20px;
        overflow-y: auto;
        // border: 1px solid #dadcdd;
        .appealInfo {
          color: red;
          margin-top: 8px;
          position: absolute;
        }
        .operateBtnList {
          display: flex;
          justify-content: center;
          border-top: 1px solid #ebeef2;
          height: 36px;
          padding-top: 20px;
          margin-top: 20px;
        }
        // div改iframeDiv
        .iframeDiv {
          height: 100%;
          iframe {
            width: 100%;
            height: 100%;
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
              min-height: 16px;
            }
          }
        }
      }
      .btnList {
        display: flex;
        height: 32px;
        // width: 430px;
        margin-top: 5px;
        padding-bottom: 20px;
        border-bottom: 1px solid #ebeef2;
        div {
          flex: 1;
          border-radius: 2px !important;
          height: 28px !important;
          margin-right: 17px !important;
          margin-bottom: 19px !important;
        }
        div:last-child {
          margin-right: 0px !important;
        }
      }
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
      ul {
        margin-top: 20px;
        li {
          margin-bottom: 24px;
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
