<template>
  <div class="infoDialog" v-if="$parent.infoDialogFlag">
    <i class="el-icon-close closeIcon" @click="closeDialog"></i>
    <!-- <dialogConfirm /> -->
    <div class="infoLeftBox">
      <div class="infoLeftBoxAdd">
        <div class="leftInfoHead">
          <h2>基本信息</h2>
        </div>
        <div class="btnList">
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
          <div v-if="titleName == '查看封面'" style="overflow-y: hidden;">
            <iframe :src="infoDetail.coverUrl" frameborder="0"></iframe>
          </div>
          <div v-if="titleName == '查看评论'" style="overflow-y: hidden;">
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
// import dialogConfirm from "./dialogConfirm";openMarket
export default {
  name: "infoDialog",
  data() {
    return {
      btnList: ["查看封面", "查看评论", "启标", "禁用"],
      btnIndex: 0,
      formForbid: {},
      deleteFlag: false,
      //临时
      dataInfo: "100",
      titleName: "查看封面",
      title: "dj",
      sensitiveArr: []
    };
  },
  props: ["infoDetail"],
  // props: ["dataInfo", "title"],
  methods: {
    //关闭弹框
    closeDialog() {
      let vm = this;
      vm.$parent.infoDialogFlag = false;
      vm.$parent.getList();
    },
    //按钮点击事件
    btnClick(item, index) {
      this.btnIndex = index;
      this.titleName = item;
    },
    //查询详情信息
    getDetail() {
      let vm = this;
      let data = {
        graphicId: "1"
      };
      vm.api
        .post(`./manage/service/graphicsResult/queryById`, data)
        .then(function(response) {})
        .catch(function(error) {});
    },
    //获取敏感信息
    getSensitive() {
      let vm = this;
      let data = {
        channelType: "1_2"
      };
      vm.api
        .post(`./manage/service/autoHighlight/findWords`, data)
        .then(function(response) {
          vm.sensitiveArr = response.data;
        })
        .catch(function(error) {});
    }
  },
  components: {
    // dialogConfirm
    openMarket,
    forbid
  },
  mounted() {
    this.btnClick("查看封面", 0);
    // this.getDetail();
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
      .videoBox {
        height: 100%;
        width: 330px;
        width: 100%;
        margin-top: 20px;
        overflow-y: auto;
        // border: 1px solid #dadcdd;
        div {
          height: 100%;
          iframe {
            width: 100%;
            height: 100%;
          }
        }
      }
      .leftInfoHead {
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
      .btnList {
        display: flex;
        height: 32px;
        // width: 430px;
        margin-top: 38px;
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
