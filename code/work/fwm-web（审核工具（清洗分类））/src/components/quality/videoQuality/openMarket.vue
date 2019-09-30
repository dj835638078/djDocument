<template>
  <div class="openMarket">
    <el-form
      :model="formForbid"
      label-position="left"
      label-width="110px"
    >
      <div>
        <el-form-item
          label="选择分类："
          class="selectGroup"
          required
        >
          <div class="selectBox">
            <el-select
              v-model="dataType1"
              placeholder="所有分类"
            >
              <el-option
                v-for="item in options1"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="dataType2"
              placeholder="全部二级"
              :disabled="judgetype2"
            >
              <el-option
                v-for="item in options2"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="dataType3"
              placeholder="全部三级"
              :disabled="judgetype3"
            >
              <el-option
                v-for="item in options3"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemCode"
              >
              </el-option>
            </el-select>
          </div>
          <div
            class="error-info"
            v-if="dataType1Judge"
          >请选择一级分类</div>
        </el-form-item>
        <el-form-item label="搜索Tag：">
          <el-autocomplete
            class="inline-input inputClass"
            v-model="inputMind"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
            @keyup.enter.native="inputEnter"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item
          label="已选Tag："
          class="recommendTag"
          v-model="formList.videoTag"
          required
        >
          <div
            v-if="!dynamicTags.length"
            class="noLength"
          >
            <i class="el-icon-info"></i>
            <span>请至少添加一个Tag</span>
          </div>
          <el-tag
            v-else
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="true"
            @close="handleClose(tag)"
          >
            {{tag}}
          </el-tag>
          <div
            class="error-info"
            v-if="videoTagJudge"
          >请添加Tag</div>
        </el-form-item>
        <el-form-item
          label="视频质量："
          required
        >
          <el-select
            v-model="formList.videoQuality"
            placeholder="请选择视频质量"
            class="inputClass"
          >
            <el-option
              v-for="item in lookUpAdd.VIDEO_QUALITY"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
          <div
            class="error-info"
            v-if="videoQualityJudge"
          >请选择视频质量</div>
        </el-form-item>
        <el-form-item
          label="视频尺度："
          required
        >
          <el-select
            v-model="formList.videoScale"
            placeholder="请选择视频尺度"
            class="inputClass"
          >
            <el-option
              v-for="item in lookUpAdd.VIDEO_SCALE"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
          <div
            class="error-info"
            v-if="videoScaleJudge"
          >请选择视频尺度</div>
        </el-form-item>
        <el-form-item
          label="是否带广告："
          required
        >
          <el-radio-group v-model="formList.adAudit">
            <el-radio
              label="1"
              name="type"
            >有</el-radio>
            <el-radio
              label="0"
              name="type"
            >无</el-radio>
          </el-radio-group>
          <div
            class="error-info errorAudit"
            v-if="adAuditJudge"
          >请选择是否带广告</div>
        </el-form-item>
        <el-dropdown
          trigger="click"
          class="waterClick"
        >
          <span class="el-dropdown-link">
            <span style="color: red;margin-right:5px">*</span>
            <span class="inputDropSpan">水印分类：</span>
            <input
              class="inputDrop"
              v-model="watermarkInput"
              placeholder="请点击选择内容"
              disabled
            ></input>
          </span>
          <el-dropdown-menu
            slot="dropdown"
            class="waterMarketDrop"
          >
            <el-checkbox-group v-model="watermarkArr">
              <el-checkbox
                v-for="item in lookUpAdd.VIDEO_WATERMARK"
                :key="item.itemCode"
                :label="item.itemName"
                :value="item.itemName"
                name="type"
              ></el-checkbox>
            </el-checkbox-group>
          </el-dropdown-menu>
          <div
            class="error-info waterError"
            v-if="watermarkInputJudge"
          >请选择水印分类</div>
        </el-dropdown>
      </div>
    </el-form>

    <div class="operateBtnList">
      <div
        class="blank"
        @click="marketCancel"
      >取消</div>
      <div
        class="new"
        @click="marketSubmit"
      >提交</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "openMarket",
  data() {
    return {
      dataInfo: "",
      formForbid: {},
      val: false,
      dynamicTags: [],
      formList: {
        typeLevel1: "",
        typeLevel2: "",
        typeLevel3: "",
        videoTag: "",
        videoQuality: "",
        videoScale: "",
        adAudit: "",
        watermark: ""
      },
      options1: [],
      options2: [],
      options3: [],
      dataType1: "",
      judgetype1: false,
      dataType2: "",
      judgetype2: true,
      dataType3: "",
      judgetype3: true,
      watermarkArr: [],
      watermarkInput: "",
      watermarkFlag: false,
      inputMind: "",
      restaurants: [],
      dataType1Judge: false,
      videoTagJudge: false,
      videoQualityJudge: false,
      videoScaleJudge: false,
      adAuditJudge: false,
      watermarkInputJudge: false
    };
  },
  props: ["infoDetail"],
  computed: { ...mapState(["lookUpAdd"]) },
  watch: {
    watermarkArr() {
      this.watermarkInput = this.watermarkArr.join("、");
    },
    dataType1() {
      let vm = this;
      vm.formList.typeLevel1 = vm.dataType1;
      vm.dataType2 = "";
      vm.decide();
      vm.options2 = [];
      let roginName = "";
      for (var key in vm.lookUpAdd.VIDEO_TYPE) {
        if (vm.dataType1 == vm.lookUpAdd.VIDEO_TYPE[key].itemCode) {
          roginName = vm.lookUpAdd.VIDEO_TYPE[key].childrenAutoCode;
        }
      }
      for (var key in vm.lookUpAdd) {
        if (roginName == key) {
          vm.options2 = vm.lookUpAdd[key];
        }
      }
    },
    dataType2() {
      let vm = this;
      vm.dataType3 = "";
      vm.formList.typeLevel2 = vm.dataType2;
      vm.decide();
      vm.options3 = [];
      let roginName = "";
      for (var key in vm.options2) {
        if (vm.dataType2 == vm.options2[key].itemCode) {
          roginName = vm.options2[key].childrenAutoCode;
        }
      }
      for (var key in vm.lookUpAdd) {
        if (roginName == key) {
          vm.options3 = vm.lookUpAdd[key];
        }
      }
    },
    //监听类型3
    dataType3() {
      if (this.dataType3) {
        this.formList.typeLevel3 = this.dataType3;
      }
    }
  },
  methods: {
    //校验下拉
    decide() {
      if (this.dataType1) {
        this.judgetype2 = false;
      } else {
        this.judgetype2 = true;
      }
      if (this.dataType2) {
        this.judgetype3 = false;
      } else {
        this.judgetype3 = true;
      }
    },
    //重置下拉
    resetSelect() {
      this.options1 = [];
      this.options2 = [];
      this.options3 = [];
      this.dataType1 = "";
      this.judgetype1 = false;
      this.dataType2 = "";
      this.judgetype2 = true;
      this.dataType3 = "";
      this.judgetype3 = true;
    },
    //提交按钮事件
    marketSubmit() {
      let vm = this;
      vm.dataType1Judge = false;
      vm.videoTagJudge = false;
      vm.videoQualityJudge = false;
      vm.videoScaleJudge = false;
      vm.adAuditJudge = false;
      vm.watermarkInputJudge = false;
      let data = Object.assign({}, vm.formList);
      data.videoTag = vm.dynamicTags.join("|");
      data.watermark =
        vm.watermarkInput && vm.watermarkInput.indexOf("、") != -1
          ? vm.watermarkInput.replace(/、/g, "|")
          : vm.watermarkInput;
      data.checkResult = "pass";
      data.vId = vm.infoDetail.vId;
      if (!data.typeLevel1) {
        vm.dataType1Judge = true;
      }
      if (!data.videoTag) {
        vm.videoTagJudge = true;
      }
      if (!data.videoQuality) {
        vm.videoQualityJudge = true;
      }
      if (!data.videoScale) {
        vm.videoScaleJudge = true;
      }
      if (data.adAudit.toString() != "0" && data.adAudit.toString() != 1) {
        vm.adAuditJudge = true;
      }
      if (!data.watermark) {
        vm.watermarkInputJudge = true;
      }
      if (
        vm.dataType1Judge ||
        vm.videoTagJudge ||
        vm.videoQualityJudge ||
        vm.videoScaleJudge ||
        vm.adAuditJudge ||
        vm.watermarkInputJudge
      ) {
        return;
      }
      vm.api
        .post(`./manage/service/videoCheck/check`, data)
        .then(function(response) {
          if (response.status == 200) {
            if (response.data) {
              vm.$parent.$parent.infoDetail = response.data;
              vm.$parent.$parent.getList();
              vm.dynamicTags = [];
              vm.watermarkInput = "";
              vm.formList = {};
              vm.resetSelect();
            } else {
              vm.$parent.$parent.infoDialogFlag = false;
              vm.$parent.$parent.getList();
            }
            vm.dataType1Judge = false;
            vm.videoTagJudge = false;
            vm.videoQualityJudge = false;
            vm.videoScaleJudge = false;
            vm.adAuditJudge = false;
            vm.watermarkInputJudge = false;
            vm.$parent.btnClick("查看详情", 0);
          }
        })
        .catch(function(error) {});
    },
    //关闭弹框
    marketCancel() {
      this.$parent.$parent.infoDialogFlag = false;
    },
    //关闭标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    //input框联想
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //input框联想
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    //input框联想选中
    handleSelect(item) {
      this.dynamicTags.push(item.value);
      this.dynamicTags = this.dynamicTags.arrUnique();
      this.inputMind = "";
    },
    //input框联想enter事件
    inputEnter() {
      if (!this.inputMind) {
        return;
      }
      this.dynamicTags.push(this.inputMind);
      this.dynamicTags = this.dynamicTags.arrUnique();
      this.inputMind = "";
    },
    //标签数据查询
    queryTag() {
      let vm = this;
      let arr = [];
      vm.api
        .get(
          `./manage/service/videoVerify/findVideoTags?videoType=${
            vm.infoDetail.videoType
          }`
        )
        .then(function(response) {
          if (response.status == 200) {
            let data = response.data;
            for (var i = 0; i < data.length; i++) {
              let obj = {};
              obj.value = data[i];
              arr.push(obj);
            }
            vm.restaurants = arr;
          }
        })
        .catch(function(error) {});
    }
  },
  mounted() {
    this.options1 = this.lookUpAdd.VIDEO_TYPE;
    this.queryTag();
    //进入页面赋值
    if (this.infoDetail.processResult == "pass") {
      this.formList = Object.assign({}, this.infoDetail);
      setTimeout(() => {
        this.dataType1 = this.formList.typeLevel1;
      }, 100);
      setTimeout(() => {
        this.dataType2 = this.formList.typeLevel2;
      }, 200);
      setTimeout(() => {
        this.dataType3 = this.formList.typeLevel3;
      }, 300);
      this.dynamicTags = this.formList.videoTag.split("|");
      this.watermarkArr = this.formList.watermark.split("|");
      this.watermarkInput =
        this.formList.watermark.indexOf("|") == -1
          ? this.formList.watermark
          : this.formList.watermark.replace(/\|/g, "，");
    }
  }
};
</script>

<style scoped lang="less">
.openMarket /deep/ .inputClass {
  width: 100% !important;
}
.openMarket {
  overflow: auto;
  .el-form {
    // padding: 10px;
    .selectGroup {
      .selectBox {
        display: flex;
        // width: 320px;
        justify-content: space-between;
      }
      .el-select {
        margin-right: 6px;
        flex: 1;
      }
      .el-select:last-child {
        margin-right: 0;
      }
    }
    .recommendTag {
      .noLength {
        i {
          color: #909399;
          margin-right: 6px;
          font-size: 16px;
        }
        span {
          color: #bfbfbf;
        }
      }
      .el-tag {
        margin-right: 10px;
      }
    }
    .el-form-item {
      margin-bottom: 22px;
      position: relative;
    }
    .error-info {
      color: red;
      position: absolute;
      top: 28px;
    }
    .waterError {
      margin-left: 110px;
    }
    .errorAudit {
      top: 20px;
    }
  }
  .operateBtnList {
    display: flex;
    justify-content: center;
    border-top: 1px solid #ebeef2;
    padding-top: 20px;
    margin-top: 20px;
  }
  .waterMark {
    position: relative;
    .waterMarkBox {
      width: 60%;
      height: auto;
      border: 1px solid #ccc;
      border-radius: 10px;
      box-shadow: 1px 1px 3px#ccc;
      position: absolute;
      bottom: 25px;
      background: #fff;
      padding: 8px;
      .el-checkbox {
        margin-left: 0;
        margin-right: 10px;
      }
    }
  }
  .waterClick {
    width: 100%;
    height: 34px;
    .el-dropdown-link {
      display: flex;
      flex-wrap: nowrap;
      .inputDropSpan {
        display: inline-block;
        width: 110px;
        height: 32px;
        padding-right: 12px;
        box-sizing: border-box;
      }
      .inputDrop {
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        width: 340px;
        border: 1px solid #dcdfe6;
        margin-top: -8px;
        padding: 0 15px;
        // color: #bfbfbf;
        box-sizing: border-box;
        cursor: pointer;
      }
    }
  }
}
</style>
