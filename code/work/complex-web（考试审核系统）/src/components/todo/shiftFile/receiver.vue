<template>
  <div class="leaveDetail-relevant">
    <div class="sign-img">
      <div class="sign-name-L">接受人：</div>
      <div
        class="sign-name-R ellipsis"
        :title="tools.setName(dataList.receiveAccount)"
      >
        {{ tools.setName(dataList.receiveAccount) }}
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
              {{ dataList.receiveAccount }}
            </div>
          </div>
          <div class="people-form-left-box-top">
            <div class="people-form-left-box-top-left">
              部门：
            </div>
            <div class="ellipsis people-form-left-box-top-right">
              {{ dataList.receiveRegionName }}
            </div>
          </div>
          <div class="people-form-left-box-top" style="border:none;">
            <div class="people-form-left-box-top-left">
              岗位：
            </div>
            <div class="ellipsis people-form-left-box-top-right">
              {{ dataList.receiveRoleNames }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["dataList"],
  components: {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {}
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
      width: 100%;
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
        height: 43px;
        line-height: 43px;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
      }
      .shift-reason-box-content {
        height: 44px;
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