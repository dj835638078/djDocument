<template>
  <div class="informationAdd">
    <div class="informationAddTitle">
      <div class="line"></div>
      <div class="title">查看详情</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="informationAddContent">
      <el-form>
        <div class="basicInfo">
          <div class="itemGroup">
            <span class="title">业务来源：</span>
            <div class="content">
              {{ tools.getDataSource(detailObj.dataSource) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">日期：</span>
            <div class="content">
              {{ tools.setFormTime(detailObj.checkDate, 0) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">来源：</span>
            <div class="content">{{ detailObj.dataOrigin }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">分类：</span>
            <div class="content">{{ detailObj.vClassify }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">启用状态：</span>
            <div class="content">
              {{ detailObj.openState == 1 ? "启用" : "禁用" }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">标注状态：</span>
            <div class="content">
              {{ detailObj.labelState == 1 ? "已标注" : "未标注" }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">内容链接：</span>
            <div class="content">{{ detailObj.contentTitle }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">标签：</span>
            <div class="content">{{ detailObj.vSign }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">视频质量：</span>
            <div class="content">
              {{ tools.getVideoQuality(detailObj.videoQuality) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">内容尺度：</span>
            <div class="content">
              {{ tools.getContentScare(detailObj.videoScale) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">广告：</span>
            <div class="content">
              {{ detailObj.adAudit == 1 ? "含" : "不含" }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">账号名称：</span>
            <div class="content">{{ detailObj.vAccount }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">审核人员：</span>
            <div class="content">
              {{ tools.setName(detailObj.processAccount) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">视频rowkey：</span>
            <div class="content">{{ detailObj.rowkey }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">组别：</span>
            <div class="content">
              {{ tools.getRegionName(detailObj.verifyGroup) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">是否正确：</span>
            <div class="content" v-if="detailObj.checkResult == 'pass'">
              正确
            </div>
            <div class="content" v-else-if="detailObj.checkResult == 'fail'">
              错误
            </div>
            <div class="content" v-else></div>
          </div>
          <div class="itemGroup">
            <span class="title">错误分级：</span>
            <div class="content">
              {{ tools.setVideoErrorLevel(detailObj.errorLevel) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">错误原因：</span>
            <div class="content">{{ detailObj.errorReason }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">错误备注：</span>
            <div class="content">{{ detailObj.errorRemark }}</div>
          </div>
          <div class="itemGroup">
            <span class="title">质检人员：</span>
            <div class="content">
              {{ tools.setName(detailObj.checkAccount) }}
            </div>
          </div>
          <div class="itemGroup">
            <span class="title">质检来源：</span>
            <div class="content">
              {{ tools.setVideoCheckChannel(detailObj.checkChannel) }}
            </div>
          </div>

          <div class="itemGroup">
            <span class="title">抽检是否正确：</span>
            <div class="content" v-if="detailObj.spotCheckResult == 'pass'">
              是
            </div>
            <div
              class="content"
              v-else-if="detailObj.spotCheckResult == 'fail'"
            >
              否
            </div>
            <div class="content" v-else></div>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailObj: {}
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.getDetail();
  },
  watch: {},
  methods: {
    //返回上一层
    goBack() {
      this.$router.go(-1);
    },
    // 获取详情
    getDetail() {
      let vm = this;
      let data = {
        checkId: vm.$route.params.checkId
      };
      vm.api
        .post(`./complex/service/appealEntry/video/findDetail`, data)
        .then(response => {
          if (response.status == 200) {
            vm.detailObj = response.data;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.informationAdd /deep/ textarea {
  height: 120px;
  width: 600px;
}
.informationAdd {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 0 120px 0px;
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
    .el-form {
      margin-top: 20px;
      .groupTitle {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
        line-height: 22px;
        margin: 30px 0;
      }
      .itemGroup {
        position: relative;
        margin-bottom: 25px;
        display: flex;
        .iconSymbol {
          color: red;
          display: inline-block;
          flex: 0 0 120px;
          margin: 10px 0px 0 0;
        }
        .iconTitle {
          margin-left: 5px;
          color: #2a2a2a;
        }
        .inputDes {
          line-height: 32px;
          color: #2a2a2a;
          margin-left: 30px;
        }
        .inputDesSpecial {
          line-height: 96px;
        }
        .infoError {
          color: red;
          position: absolute;
          top: 125px;
          left: 120px;
        }
        .title {
          flex: 0 0 120px;
        }
        .content {
          flex: 1;
        }
        .contentText {
          line-height: 22px;
        }
      }
    }
  }
}
</style>