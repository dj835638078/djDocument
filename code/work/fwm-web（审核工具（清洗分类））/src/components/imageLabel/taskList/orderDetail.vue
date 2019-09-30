<template>
  <div class="orderDetail">
    <div class="taskInfo">
      <div class="el-form">
        <div class="titleInfo">
          <span class="line"></span><span class="title">订单详情</span>
        </div>
        <div class="rowList">
          <div class="el-form-item itemSpecial">
            <span>订单名称：</span>{{ orderName }}
          </div>
          <div class="el-form-item">
            <span>客户名称：</span>{{ clientAccount }}
          </div>
          <div class="el-form-item"><span>截止日期：</span>{{ endDate }}</div>
          <div class="el-form-item">
            <span>交付数量：</span>{{ tools.toThousands(orderQuantity) }}
          </div>
        </div>
        <div class="rowList">
          <div class="el-form-item itemSpecial">
            <span>订单编号：</span>{{ orderCode }}
          </div>
          <div class="el-form-item">
            <span>项目经理：</span>{{ manageAccount }}
          </div>
          <div class="el-form-item"><span>发布日期：</span>{{ startDate }}</div>
          <div class="el-form-item" v-if="true"></div>
        </div>
        <div
          class="downLoadOpe"
          @click="downLoadOpe"
          v-if="
            orderStatusFlag == 4 || orderStatusFlag == 5 || orderStatusFlag == 6
          "
        >
          订单结果 <i class="fa fa-arrow-down"></i>
        </div>
      </div>
    </div>
    <div class="taskState" v-if="nodeData.length">
      <div class="titleInfo">
        <span class="line"></span><span class="title">订单状态</span>
      </div>
      <div class="orderDescription detailStep">
        <!-- <div class="stepBox"></div> -->
        <el-steps :active="active">
          <el-step v-for="(item, index) in nodeData" :key="index">
            <template slot="description">
              <div
                class="stepTitle stepCommon"
                :title="tools.setOperateState(item.nodeCode)"
              >
                {{ tools.setOperateState(item.nodeCode)
                }}{{ item.stateName ? "(" + item.stateName + ")" : "" }}
              </div>
              <div
                v-if="item.endDate && showStep"
                class="stepDate stepCommon"
                :title="tools.setFormTime(item.endDate, 0)"
              >
                截止时间：{{ tools.setFormTime(item.endDate, 0) }}
              </div>
              <div
                v-if="item.users && item.users.length && showStep"
                class="stepUser stepCommon"
                :title="item.users.join('、')"
              >
                执行人员：{{ item.users.join("、") }}
              </div>
              <div
                v-if="item.approvals && item.approvals.length && showStep"
                class="stepGroup stepCommon"
                :title="item.approvals.join('、')"
              >
                执行小组：{{ item.approvals.join("、") }}
              </div>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="ruleDescription">
      <div class="titleInfo">
        <span class="line"></span><span class="title">规则描述</span>
      </div>
      <div
        class="orderDescription"
        :class="[ruleResFlag ? 'showBasic' : 'showMore', orderDescription]"
        v-html="orderDescription"
        v-if="descriptionFlag"
      ></div>
      <div class="lookMore" v-if="descriptionFlag">
        <div @click="openRule" v-if="ruleResFlag">
          查看更多<i class="fa fa-angle-double-down"></i>
        </div>
        <div @click="openRule" v-else>
          收起<i class="fa fa-angle-double-up"></i>
        </div>
      </div>
      <div class="orderDescription" v-else>暂无规则描述</div>
    </div>
    <div class="attachment">
      <div class="titleInfo">
        <span class="line"></span><span class="title">附件</span
        ><span class="downLoad" @click="downAll" v-if="attachmentFlag"
          ><i class="fa fa-cloud-download"></i>全部下载</span
        >
      </div>
      <div class="attachmentBox" v-if="attachmentFlag">
        <div
          class="attachmentItem"
          v-for="(item, index) in filelist"
          :key="index"
          @click="download(item.fId)"
        >
          <div class="attachmentTitle">{{ item.fileName }}</div>
          <div class="attachmentSize">
            {{ tools.FileSizeTransform(item.fileSize) }}
          </div>
          <!-- <div class="query" style="width:100px" @click="download(item.fId)">
            <i class="fa fa-cloud-download"></i>附件下载
          </div> -->
        </div>
      </div>
      <div v-else class="attachmentBox">暂无附件</div>
    </div>
    <div class="dailyRecord">
      <div class="titleInfo">
        <span class="line"></span><span class="title">历史日志</span>
      </div>
      <div class="recordBox" v-if="dailyFlag">
        <div class="recordImg">
          <i class="fa fa-map-marker"></i><span class="line"></span>
        </div>
        <div
          class="recordItem"
          v-for="(item, index) in recordListBox"
          :key="index"
        >
          <span class="recordPoint"><span class="line"></span></span>
          <span class="recordData">{{
            tools.setFormTime(item.createDate, 1)
          }}</span>
          <span>{{ item.fwmName }}进行了</span>
          <span class="recordOperat"
            >【{{ tools.setOperateStatus(item.logType, 0) }}】</span
          >
          <span>，备注：{{ item.logRemark }}</span>
        </div>
      </div>
      <div class="lookMore" v-if="recordList.length > 3">
        <div v-if="dailyLengthFlag" @click="openList">
          查看更多<i class="fa fa-angle-double-down"></i>
        </div>
        <div v-else @click="openList">
          收起<i class="fa fa-angle-double-up"></i>
        </div>
      </div>
      <div v-else-if="recordList.length == 0" class="recordBox">
        暂无历史日志
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "orderDetail",
  data() {
    return {
      orderName: "",
      clientAccount: "",
      manageAccount: "",
      orderCode: "",
      orderQuantity: "",
      endDate: "",
      startDate: "",
      editFlag: false,
      orderNumFlag: false,
      orderDescription: "",
      filelist: [],
      fIds: [],
      recordList: [],
      recordListBox: [],
      attachmentFlag: true,
      descriptionFlag: true,
      dailyFlag: true,
      dailyLengthFlag: false,
      ruleResFlag: true,
      nodeData: [],
      active: -1,
      showStep: true,
      orderStatusFlag: ""
    };
  },
  mounted() {
    let vm = this;
    if (vm.$route.params.name == "look") {
      if (vm.$route.params.role == "receive") {
        vm.$route.matched[0].meta.title = "任务接收";
      } else if (vm.$route.params.role == "publish") {
        vm.$route.matched[0].meta.title = "发布任务";
      } else if (vm.$route.params.role == "operateWash") {
        vm.$route.matched[0].meta.title = "清洗分类列表";
      } else if (vm.$route.params.role == "operateLabel") {
        vm.$route.matched[0].meta.title = "数据标注列表";
      } else if (this.$route.params.role == "checkWashDetail") {
        this.$route.matched[0].meta.title = "任务质检";
      } else if (this.$route.params.role == "checkLabelDetail") {
        this.$route.matched[0].meta.title = "任务质检";
      } else {
        vm.$route.matched[0].meta.title = "任务列表";
      }
      vm.queryList(vm.$route.params.id);
      vm.queryRecord(vm.$route.params.id);
      if (vm.tools.setRoles("clientA")) {
        vm.showStep = false;
      }
    }
  },
  watch: {},
  components: {},
  computed: {},
  methods: {
    //右上角下载按钮
    downLoadOpe() {
      location.href =
        location.origin +
        "/manage/publicservice/imglabelOrder/download?orderId=" +
        this.$route.params.id;
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
            vm.clientAccount = response.data.clientName;
            vm.manageAccount = response.data.manageName;
            vm.startDate = vm.tools.setFormTime(response.data.startDate, 1);
            vm.orderCode = response.data.orderCode;
            vm.orderQuantity = response.data.orderQuantity;
            vm.endDate = vm.tools.setFormTime(response.data.endDate, 1);
            vm.orderStatusFlag = response.data.orderStatus;
            //订单状态
            vm.nodeData = response.data.nodeData;
            if (vm.nodeData.length > 0) {
              let nodeDataLastObj = {};
              nodeDataLastObj.nodeCode = "未完成";
              nodeDataLastObj.nodeState = 1000;
              vm.nodeData.push(nodeDataLastObj);
              for (var i = 0; i < vm.nodeData.length; i++) {
                if (vm.nodeData[0].nodeState == 1) {
                  vm.active = 0;
                }
                if (
                  vm.nodeData[i].nodeState == 2 &&
                  vm.nodeData[i + 1].nodeState == 0
                ) {
                  vm.active = i + 0.5;
                }
                if (
                  vm.nodeData[i].nodeState == 2 &&
                  vm.nodeData[i + 1].nodeState == 1
                ) {
                  vm.active = i + 1;
                }
              }
              if (vm.nodeData[0].nodeState == 0) {
                vm.active = -1;
              }
              if (vm.nodeData[vm.nodeData.length - 2].nodeState == 2) {
                vm.active = vm.nodeData.length;
                vm.nodeData[vm.nodeData.length - 1].nodeCode = "已完成";
              }
            }

            vm.orderDescription = response.data.orderDescription;
            // this.imageUrl = URL.createObjectURL(response.data.files[0]);
            if (!response.data.files || response.data.files.length == 0) {
              vm.attachmentFlag = false;
            }
            if (
              !response.data.orderDescription ||
              response.data.orderDescription == ""
            ) {
              vm.descriptionFlag = false;
            }
            vm.filelist = response.data.files;
            if (vm.filelist && vm.filelist.length) {
              for (var i = 0; i < vm.filelist.length; i++) {
                vm.fIds.push(vm.filelist[i].fId);
              }
            }
          }
        })
        .catch(function(error) {});
    },
    openList() {
      this.dailyLengthFlag = !this.dailyLengthFlag;
      if (this.dailyLengthFlag) {
        this.recordListBox = this.recordList.slice(0, 3);
      } else {
        this.recordListBox = this.recordList;
      }
    },
    openRule() {
      let vm = this;
      vm.$nextTick(() => {
        vm.ruleResFlag = !vm.ruleResFlag;
      });
    },
    queryRecord(orderCodeFlag) {
      let vm = this;
      vm.api
        .get(`./manage/service/imglabelOrder/findLogs?orderId=${orderCodeFlag}`)
        .then(function(response) {
          if (response.status == 200) {
            let arrFlag = [];
            if (!response.data || response.data.length == 0) {
              vm.dailyFlag = false;
            } else {
              arrFlag = response.data.filter(item => {
                return item.logType != "assign";
              });
              vm.recordListBox = arrFlag;
              vm.recordList = arrFlag;
              if (arrFlag && arrFlag.length > 3) {
                vm.dailyLengthFlag = true;
                vm.recordListBox = arrFlag.slice(0, 3);
              }
            }
          }
        })
        .catch(function(error) {});
    },
    download(val) {
      location.href =
        location.origin + "/manage/publicservice/file/download?fId=" + val;
    },
    asyncFunc(item) {
      return new Promise(function(resolve, reject) {
        setTimeout(function() {
          location.href =
            location.origin + "/manage/publicservice/file/download?fId=" + item;
          resolve();
        }, 500);
      });
    },
    async downAll() {
      let vm = this;
      if (!vm.fIds || !vm.fIds.length) {
        return;
      }
      if (vm.fIds && vm.fIds.length) {
        for (let i = 0; i < vm.fIds.length; i++) {
          await vm.asyncFunc(vm.fIds[i]);
        }
      }
    }
  }
};
</script>
<style scoped lang="less">
.orderDetail /deep/ strong {
  font-weight: 600;
}
.orderDetail /deep/ em {
  font-style: oblique;
}
.orderDetail /deep/ u {
  text-decoration: underline;
}
.orderDetail /deep/ s {
  text-decoration: line-through;
}
.orderDetail /deep/ ol {
  padding-left: 40px;
  list-style-type: decimal;
}
.orderDetail /deep/ ul {
  padding-left: 40px;
  list-style: initial;
}
.orderDetail /deep/ menu {
  padding-left: 40px;
  list-style: initial;
}
.orderDetail /deep/ h1 {
  font-weight: normal;
  font-size: 2em;
}
.orderDetail /deep/ h2 {
  font-weight: normal;
  font-size: 1.5em;
}
.orderDetail /deep/ h3 {
  font-weight: normal;
  font-size: 1.17em;
}
.orderDetail /deep/ h4 {
  font-weight: normal;
  font-size: 1em;
}
.orderDetail /deep/ h5 {
  font-weight: normal;
  font-size: 0.83em;
}
.orderDetail /deep/ h6 {
  font-weight: normal;
  font-size: 0.67em;
}
.orderDetail /deep/ pre.ql-syntax {
  background-color: #23241f;
  color: #f8f8f2;
  overflow: visible;
}
.orderDetail /deep/ blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}
.orderDetail /deep/ .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 3em;
}
.orderDetail /deep/ .ql-indent-2:not(.ql-direction-rtl) {
  padding-left: 6em;
}
.orderDetail /deep/ .ql-indent-3:not(.ql-direction-rtl) {
  padding-left: 9em;
}
.orderDetail /deep/ .ql-indent-4:not(.ql-direction-rtl) {
  padding-left: 12em;
}
.orderDetail /deep/ .ql-indent-5:not(.ql-direction-rtl) {
  padding-left: 15em;
}
.orderDetail /deep/ .ql-indent-6:not(.ql-direction-rtl) {
  padding-left: 18em;
}
.orderDetail /deep/ .ql-indent-7:not(.ql-direction-rtl) {
  padding-left: 21em;
}
.orderDetail /deep/ .ql-indent-8:not(.ql-direction-rtl) {
  padding-left: 24em;
}
.orderDetail /deep/ .ql-align-right {
  text-align: right;
}
.orderDetail /deep/ .ql-direction-rtl {
  direction: rtl;
  text-align: inherit;
}
.orderDetail /deep/ .ql-size-large {
  font-size: 1.5em;
}
.orderDetail /deep/ .ql-size-small {
  font-size: 0.75em;
}
.orderDetail /deep/ .ql-size-huge {
  font-size: 2.5em;
}
.orderDetail /deep/ .ql-font-serif {
  font-family: Georgia, Times New Roman, serif;
}
.orderDetail /deep/ .ql-font-monospace {
  font-family: Monaco, Courier New, monospace;
}
.orderDetail /deep/ .ql-align-center {
  text-align: center;
}
.orderDetail /deep/ .ql-align-right {
  text-align: right;
}
.orderDetail /deep/ .ql-align-justify {
  text-align: justify;
}
.detailStep /deep/ .el-steps {
  // display: -webkit-box;
  // display: -moz-box;
  // display: -ms-flexbox;
  // display: -webkit-flex;
  // display: flex;
  // .el-step {
  //   box-flex: 1;
  //   -webkit-box-flex: 1;
  //   -moz-box-flex: 1;
  //   flex: 1;
  //   -webkit-flex: 1;
  // }
  .stepTitle {
    font-size: 16px;
    margin-top: 10px;
  }
  .stepCommon {
    max-width: 300px;
    color: rgba(0, 0, 0, 0.85);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .stepDate {
  }
  .stepUser {
  }
  .stepGroup {
  }
  .el-step__icon.is-text {
    background: #ebebeb;
    width: 40px;
    height: 40px;
    border: none;
  }
  .el-step__line {
    color: #ebebeb;
    background: #ebebeb;
    top: 18px;
    height: 6px;
  }
  .el-step__line-inner {
    border-color: #ebebeb;
    border-width: 3px !important;
  }
  .el-step__icon-inner {
    font-size: 24px;
    color: white;
  }
  .el-step__main {
    color: rgba(0, 0, 0, 0.85);
  }
  .is-finish {
    .el-step__icon.is-text {
      background: #0bc1a0;
    }
    .el-step__line {
      color: #0bc1a0;
      background: #0bc1a0;
    }
    .el-step__line-inner {
      border-color: #0bc1a0;
    }
    .stepTitle {
      color: #0bc1a0;
    }
  }
  .is-process {
    .el-step__icon.is-text {
      background: #597ef7;
      width: 50px;
      height: 50px;
      top: -5px;
    }
    .el-step__line {
      color: #597ef7;
      background: #597ef7;
    }
    .el-step__line-inner {
      border-color: #597ef7;
    }
    .stepTitle {
      color: #597ef7;
    }
  }
}
.orderDetail {
  .lookMore {
    display: flex;
    justify-content: center;
    color: #597ef7;
    margin-bottom: 20px;
    i {
      font-size: 20px;
      top: -3px;
      position: absolute;
      margin-left: 5px;
    }
    div {
      cursor: pointer;
      position: relative;
    }
  }
  .taskInfo {
    padding-top: 15px;
    .el-form {
      margin-right: 25px;
      margin-left: 24px;
      position: relative;
      .downLoadOpe {
        position: absolute;
        right: 16px;
        top: 6px;
        cursor: pointer;
        color: #597ef7;
        border-bottom: 1px solid #597ef7;
        padding-bottom: 2px;
        font-size: 16px;
      }
      .rowList {
        display: flex;
        flex-wrap: nowrap;
        margin-bottom: 5px;
        .el-form-item {
          flex: 1;
          display: flex;
          margin-bottom: 10px;
          margin-left: 24px;
          color: rgba(0, 0, 0, 0.85);
          span {
            color: rgba(0, 0, 0, 0.65);
            margin-right: 10px;
            width: 76px;
          }
        }
        .itemSpecial {
          margin-left: 0;
          flex: 0 0 254px;
        }
      }
    }
  }
  .attachment,
  .taskState,
  .ruleDescription {
    margin: 12px 25px 0 24px;
    border-top: 1px solid #e9e9e9;
    padding-top: 20px;
    .orderDescription {
      line-height: 1.4;
      margin-bottom: 10px;
    }
    .showBasic {
      height: 22px;
      overflow: hidden;
    }
    .showMore {
      height: auto;
      overflow: none;
    }
  }
  .attachment {
    font-size: 14px;
    .attachmentBox {
      display: flex;
      flex-wrap: nowrap;
      .attachmentItem {
        width: 20%;
        padding-right: 20px;
        cursor: pointer;
        .attachmentTitle {
          color: #597ef7;
        }
        .attachmentSize {
          color: rgba(0, 0, 0, 0.45);
          margin: 8px 0;
        }
      }
    }
  }
}
</style>
