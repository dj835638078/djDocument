<template>
  <div class="leaveDetail-relevant">
    <div class="relevant-title">
      <div class="relevant-title-sign"></div>
      <div class="relevant-title-name">
        基本信息
      </div>
    </div>
    <div class="sign-img">
      <div class="sign-name-L">姓名：</div>
      <div
        class="sign-name-R ellipsis"
        :title="tools.setName(dataList.fwmAccount)"
      >
        {{ tools.setName(dataList.fwmAccount) }}
      </div>
    </div>
    <div class="clear"></div>
    <div class="people-form">
      <div class="people-form-left">
        <div class="people-form-left-box">
          <div class="people-form-left-box-top">
            <div class="people-form-left-box-top-left">
              工号：
            </div>
            <div class="ellipsis people-form-left-box-top-right">
              {{ dataList.fwmAccount }}
            </div>
          </div>
          <div class="people-form-left-box-top" style="border:none;">
            <div class="people-form-left-box-top-left">
              部门：
            </div>
            <div class="ellipsis people-form-left-box-top-right">
              {{ dataList.regionName }}
            </div>
          </div>
        </div>
      </div>
      <div class="people-form-left" style="margin:0;">
        <div class="people-form-left-box">
          <div class="people-form-left-box-top">
            <div class="people-form-left-box-top-left">
              岗位：
            </div>
            <div class="ellipsis people-form-left-box-top-right">
              {{ dataList.employeeJob }}
            </div>
          </div>
          <div class="people-form-left-box-top" style="border:none;">
            <div class="people-form-left-box-top-left">
              请假小时数：
            </div>
            <div class="ellipsis people-form-left-box-top-right">
              {{ dataList.shiftHour }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="shift-reason">
      <div class="shift-reason-box">
        <div class="shift-reason-box-name">
          理由：
        </div>
        <div
          class="shift-reason-box-content"
          style="line-height:20px;margin-bottom:10px;"
        >
          {{ dataList.applyReason }}
        </div>
        <div>
          <div class="shift-enclosure">
            附件：
          </div>
          <div
            style="float:left;cursor:pointer;margin-right:10px;margin-left:5px;"
            v-for="(item, index) in applyImgFileId"
            :key="index"
            title="查看附件"
            @click="viewImgBtn(item)"
          >
            <img src="../../../../static/img.svg" style="margin-bottom: 1px;" />
          </div>
        </div>
      </div>
    </div>
    <ViewImg :imgUrl="imgUrl" />
  </div>
</template>

<script>
import ViewImg from "../../public/viewImg";
export default {
  data() {
    return {
      imgShow: false,
      imgUrl: ""
    };
  },
  props: ["dataList", "applyImgFileId"],
  components: { ViewImg },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    viewImgBtn(val) {
      this.imgUrl =
        location.origin + `/complex/publicservice/file/download?fId=${val}`;
      this.imgShow = true;
    }
  }
};
</script>

<style scoped lang="less">
.leaveDetail-relevant {
  .sign-img {
    width: 170px;
    height: 30px;
    background: url("../../../../static/sign.png");
    line-height: 30px;

    .sign-name-R,
    .sign-name-L {
      font-size: 14px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      float: left;
    }
    .sign-name-L {
      margin-left: 25px;
    }
    .sign-name-R {
      width: 80px;
    }
  }
  .people-form {
    overflow: hidden;
    margin-top: 5px;
    .people-form-left {
      width: 588px;
      margin-right: 8px;
      float: left;
      .people-form-left-box {
        padding: 0px 25px;
        background: #fff;
        .people-form-left-box-top {
          height: 49px;
          border-bottom: 1px solid #ebeef5;
          line-height: 49px;
          .people-form-left-box-top-left,
          .people-form-left-box-top-right {
            float: left;
            font-size: 14px;
            font-family: PingFangSC-Regular;
          }
          .people-form-left-box-top-left {
            font-weight: 600;
            color: rgba(42, 42, 42, 1);
            width: 150px;
          }
          .people-form-left-box-top-right {
            font-weight: 400;
            color: rgba(96, 98, 102, 1);
            width: 380px;
          }
        }
      }
    }
  }
  .shift-reason {
    overflow: hidden;
    background: #fff;
    margin-top: 8px;
    padding-bottom: 8px;
    .shift-reason-box {
      padding: 0 25px;
      .shift-reason-box-name {
        height: 35px;
        line-height: 35px;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
      }
      .shift-reason-box-content {
        min-height: 24px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(96, 98, 102, 1);
      }
      .shift-enclosure {
        float: left;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
      }
    }
  }
}
</style>