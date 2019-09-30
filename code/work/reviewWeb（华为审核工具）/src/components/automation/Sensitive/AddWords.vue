<template>
  <div class="AddWords">
    <el-dialog
      :title="titleName"
      :visible.sync="$parent.judgeAddWords"
      width="690px"
      top="10vh"
    >
      <el-form :inline="true" :model="listData" class="demo-form-inline">
        <div class="words-box">
          <div class="words-box-name"><span>*</span>应用名称：</div>
          <div class="words-box-content">
            <el-select v-model="listData.appName" placeholder="请选择应用名称">
              <el-option
                v-for="item in lookUp.HIGHLIGHT_APP_NAME"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemName"
              >
              </el-option>
            </el-select>
          </div>
          <div class="clear"></div>
          <div v-if="judgeAppName" class="judgeYN">请选择应用名称</div>
        </div>
        <!--<div
          class="words-box"
          v-if="!$parent.judgeUset"
        >
          <div class="words-box-name">
            <span>*</span>适用区域：
          </div>
           <div class="words-box-content">
            <el-select
              v-model="listData.regionCode"
              placeholder="请选择适用区域"
            >
              <el-option
                v-for="item in $parent.findRegion"
                :key="item.regioncode"
                :label="item.regionName"
                :value="item.regioncode"
              >
              </el-option>
            </el-select>
          </div>
          <div class="clear"></div>
          <div
            v-if="judgeRegion"
            class="judgeYN"
          >请选择适用区域</div>
        </div>
        <div class="words-box">
          <div class="words-box-name">
            <span>*</span>适用范围：
          </div>
          <div class="words-box-content">
            <el-select
              v-model="$parent.channelList"
              placeholder="请选择适用范围"
              multiple
            >
              <el-option
                v-for="item in lookUp.CHANNEL_TASK_TYPE"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>
          </div>
          <div class="clear"></div>
          <div
            v-if="judgeChannel"
            class="judgeYN"
          >请选择适用范围</div>
        </div> -->
        <div class="words-box">
          <div class="words-box-name">
            是否启用：
          </div>
          <div class="words-box-content">
            <el-radio
              style="margin-top:10px"
              v-model="listData.highlightState"
              label="1"
            >
              是</el-radio
            >
            <el-radio v-model="listData.highlightState" label="0">否</el-radio>
          </div>
        </div>
        <div class="words-box">
          <div class="words-box-name">
            颜色设置：
          </div>
          <div class="words-box-content">
            <div class="color-box"></div>
          </div>
        </div>
        <div class="words-box">
          <div
            class="words-box-name"
            style="text-align:left;padding-left:6px;width:70px;"
          >
            备注：
          </div>
          <div class="words-box-content" style="width: calc(100% - 92px);">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入备注，100字以内"
              v-model="listData.highlightRemark"
              maxlength="100"
            >
            </el-input>
          </div>
        </div>
      </el-form>
      <div style="clear:both"></div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
        <!--<el-button
          v-else
          style="background: #d9d9d9;cursor: not-allowed;color:#fff;border:1px solid #d9d9d9"
        >确 定</el-button>-->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "AddWords",
  data() {
    return {
      kg: false,
      judgeAppName: false
      // judgeRegion: false,
      // judgeChannel: false
    };
  },
  props: ["listData", "titleName", "highlightId"],
  components: {},
  watch: {
    "$parent.judgeAddWords"() {
      this.judgeAppName = false;
      // this.judgeRegion = false;
      // this.judgeChannel = false;
      if (this.$parent.judgeAddWords) {
        if (this.titleName == "新建应用") {
          this.resultDataList();
        }
      }
    }
  },
  computed: {
    ...mapState(["lookUp"])
  },
  mounted() {},
  methods: {
    //取消
    cancel() {
      this.$parent.judgeAddWords = false;
    },
    judge() {
      if (this.listData.appName) {
        this.judgeAppName = false;
      } else {
        this.judgeAppName = true;
      }
      // if (!this.$parent.judgeUset) {
      //   if (this.listData.regionCode) {
      //     this.judgeRegion = false;
      //   } else {
      //     this.judgeRegion = true;
      //   }
      // }
      // if (this.$parent.channelList.length) {
      //   this.judgeChannel = false;
      // } else {
      //   this.judgeChannel = true;
      // }
    },
    //确定
    confirm() {
      this.judge();
      //&& !this.judgeRegion && !this.judgeChannel
      if (!this.judgeAppName) {
        let vm = this;
        //this.$parent.listData.channelType = this.$parent.channelList.join(",");
        let data = this.listData;
        if (this.titleName == "新建应用") {
          api
            .post(`./manage/service/autoHighlight/insert`, data)
            .then(function(response) {
              if (response.status == 200) {
                vm.$parent.judgeAddWords = false;
                vm.$parent.getWords();
              }
            })
            .catch(function(error) {});
        } else {
          data.highlightId = vm.highlightId;
          api
            .post(`./manage/service/autoHighlight/update`, data)
            .then(function(response) {
              if (response.status == 200) {
                vm.$parent.judgeAddWords = false;
                vm.$parent.getWords();
              }
            })
            .catch(function(error) {});
        }
      }
    },
    //重置
    resultDataList() {
      this.$parent.listData.appName = "";
      this.$parent.listData.appName = "";
      // this.$parent.listData.regionCode = "";
      this.$parent.listData.channelType = [];
      this.$parent.channelList = [];
      this.$parent.listData.highlightRemark = "";
      this.$parent.listData.highlightState = "1";
      this.$parent.listData.highlightColour = "#002233";
    }
  }
};
</script>

<style  lang="less">
.AddWords {
  .judgeYN {
    position: absolute;
    left: 97px;
    top: 35px;
    font-size: 12px;
    color: red;
  }
}
</style>
