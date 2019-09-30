<template>
  <div class="addLookup">
    <div class="popLookup">
      <el-dialog
        :title="titleName"
        :visible.sync="$parent.judgePopLookup"
        :modal-append-to-body='false'
        :append-to-body='true'
        width="700px"
        top="10vh"
      >
        <el-form
          :inline="true"
          :model="list"
          class="demo-form-inline"
        >
          <div class="lookOne">
            <div class="abox">
              <span class="abox-lableName"><span>*</span>项目编号：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="list.itemCode"
                  placeholder="请填写项目编号"
                ></el-input>
              </div>
              <div
                class="error-point"
                v-if="judgeItemCode"
              >请填写项目编号</div>
            </div>
            <div class="abox">
              <span class="abox-lableName"><span>*</span>项目名称：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="list.itemName"
                  placeholder="请填写项目名称"
                ></el-input>
              </div>
              <div
                class="error-point"
                v-if="judgeItemName"
              >请填写项目编号</div>
            </div>
            <div class="abox">
              <span class="abox-lableName"><span>*</span>排序：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="list.orderId"
                  placeholder="请填写排序"
                ></el-input>
              </div>
              <div
                class="error-point"
                v-if="judgeOrderId"
              >请填写排序</div>
            </div>
            <div class="abox">
              <span class="abox-lableName">子类别编号：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="list.childrenAutoCode"
                  placeholder="请填写类别编号"
                ></el-input>
              </div>
              <div
                class="error-point"
                v-if="judgeOrderId"
              >请填写排序</div>
            </div>
            <div class="abox">
              <span class="abox-lableName">项目描述：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="list.itemDesc"
                  placeholder="请填写项目描述"
                ></el-input>
              </div>
            </div>
          </div>
        </el-form>
        <div style="clear:both"></div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="cancel">取 消</el-button>
          <el-button
            type="primary"
            @click="confirm"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
import api from "@/api";

export default {
  name: "addLookup",
  data() {
    return {
      judgeItemCode: false,
      judgeItemName: false,
      judgeOrderId: false
    };
  },
  props: ["titleName", "list"],
  mounted() {},
  watch: {
    "$parent.judgePopLookup"() {
      this.judgeItemCode = false;
      this.judgeItemName = false;
      this.judgeOrderId = false;
    }
  },
  components: {},
  methods: {
    //重置
    resetData() {
      this.$parent.currentPage = 1;
      this.$parent.pageSize = 10;
      this.$parent.itemCode = "";
      this.$parent.itemName = "";
      this.$parent.itemDesc = "";
      this.$parent.childrenAutoCode = "";
      this.$parent.judgePopLookup = false;
    },
    //新建
    addLookupChild() {
      this.list.autoCode = this.$parent.lookupCodeName;
      let vm = this;
      let data = this.list;
      api

        .post(`./manage/service/autoLookupItem/insert`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.resetData();
            vm.$parent.deployLookup();
          }
        })
        .catch(function(error) {});
    },
    //修改
    updateLookupChild() {
      this.list.autoCode = this.$parent.lookupCodeName;
      let vm = this;
      let data = this.list;
      api
        .post(`./manage/service/autoLookupItem/update`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.resetData();
            vm.$parent.deployLookup();
          }
        })
        .catch(function(error) {});
    },
    //查询取消
    cancel() {
      this.$parent.judgePopLookup = false;
    },
    //查询确定
    confirm() {
      //this.$parent.judgePopLookup = false;
      if (this.list.itemCode) {
        this.judgeItemCode = false;
      } else {
        this.judgeItemCode = true;
      }
      if (this.list.itemName) {
        this.judgeItemName = false;
      } else {
        this.judgeItemName = true;
      }
      if (this.list.orderId) {
        this.judgeOrderId = false;
      } else {
        this.judgeOrderId = true;
      }
      if (
        !this.judgeItemCode &&
        !this.list.judgeItemName &&
        !this.judgeOrderId
      ) {
        if (this.titleName == "新建") {
          this.addLookupChild();
        } else {
          this.updateLookupChild();
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.addLookup {
  .abox {
    margin-top: 28px;
    width: 50%;
    height: 32px;
    float: left;
    position: relative;
    .error-point {
      position: absolute;
      left: 86px;
      top: 35px;
      color: red;
      font-size: 12px;
    }
    .abox-lableName {
      width: 86px;
      float: left;
      line-height: 32px;
      span {
        color: red;
        font-size: 14px;
      }
    }
    .input-box {
      float: left;
      width: calc(100% - 111px);
      margin-right: 25px;
      .el-select,
      .el-select--small,
      .el-date-editor {
        width: 100%;
      }
    }
  }
}
</style>
