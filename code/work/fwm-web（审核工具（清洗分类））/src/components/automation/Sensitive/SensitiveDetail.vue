<template>
  <div class="SensitiveDetail">
    <el-dialog
      title="详情"
      :visible.sync="$parent.judgeDetail"
      width="505px"
      top="10vh"
    >
      <el-form
        :inline="true"
        :model="datailData"
        class="demo-form-inline"
      >

        <div class="words-box">
          <div class="words-box-name nameColor">
            应用名称：
          </div>
          <div class="words-box-content boxContent">
            {{datailData.appName}}
          </div>
        </div>
        <div
          class="words-box"
          v-if="datailData.regionCode"
        >
          <div class="words-box-name nameColor">
            适用区域：
          </div>
          <div
            class="words-box-content boxContent"
            v-text="tools.setRegionName(datailData.regionCode)"
          >
          </div>
        </div>
        <div
          class="words-box"
          v-if="datailData.channelType"
        >
          <div class="words-box-name nameColor">
            适用范围：
          </div>
          <div class="words-box-content boxContent">
            <span
              v-for="(item,index) in datailData.channelType.split(',')"
              :key="index"
            >
              <span v-text="setType(item)">{{datailData.channelType}}</span>
              <span v-if="index!=datailData.channelType.split(',').length-1">/</span>
            </span>
          </div>
        </div>
        <div class="words-box">
          <div class="words-box-name nameColor">
            是否启用：
          </div>
          <div
            class="words-box-content boxContent"
            v-text="datailData.highlightState==1?'是':'否'"
          >

          </div>
        </div>
        <div class="words-box">
          <div class="words-box-name nameColor">
            颜色设置：
          </div>
          <div class="words-box-content">
            <div class="color-box"></div>
          </div>
        </div>
        <div class="words-box">
          <div
            class="words-box-name nameColor"
            style="text-align:left;padding-left:6px;width:70px;"
          >
            备注：
          </div>
          <div
            class="words-box-content boxContent"
            style="width: calc(100% - 92px)!important;"
          >
            {{datailData.highlightRemark}}
          </div>
        </div>
      </el-form>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "SensitiveDetail",
  data() {
    return {
      asdasd: "1,2,3"
    };
  },
  props: ["datailData"],
  components: {},
  watch: {},
  computed: {
    ...mapState(["lookUp"])
  },
  mounted() {},
  methods: {
    //自动化KEY
    setFindRegion: data => {
      if (data) {
        for (var key in this.$parent.findRegion) {
          if (data == store.state.lookUp.TASK_PROCESS_TYPE[key].itemCode) {
            return store.state.lookUp.TASK_PROCESS_TYPE[key].itemName;
          }
        }
      }
    },
    setType(data) {
      if (data) {
        for (var key in this.lookUp.CHANNEL_TASK_TYPE) {
          if (data == this.lookUp.CHANNEL_TASK_TYPE[key].itemCode) {
            return this.lookUp.CHANNEL_TASK_TYPE[key].itemName;
          }
        }
      }
    }
  }
};
</script>

<style  lang="less">
.SensitiveDetail {
  .nameColor {
    color: rgba(0, 0, 0, 0.35);
  }
  .boxContent {
    min-height: 32px;
    line-height: 32px;
    word-wrap: break-word;
    color: rgba(0, 0, 0, 0.85);
    width: 370px !important;
  }
}
</style>
