<template>
  <div class="forbid">
    <h3><span style="color: red;margin-right:5px">*</span>请选择禁用原因</h3>
    <div>
      <el-form label-width="80px">
        <el-form-item prop="type">
          <el-checkbox-group v-model="forbidInfo">
            <el-checkbox
              v-for="item in lookUpAdd.VIDEO_DISABLE_REASON"
              :key="item.itemCode"
              :label="item.itemName"
              name="type"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- <el-form-item>
          <el-input
            type="textarea"
            v-model="dataInfo"
          ></el-input>
        </el-form-item> -->
      </el-form>
    </div>
    <div class="operateBtnList">
      <div
        class="blank"
        @click="marketCancel"
      >取消</div>
      <div
        class="new"
        @click="forbidSubmit"
      >提交</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "forbid",
  data() {
    return {
      forbidInfo: [],
      // dataInfo: "",
      formForbid: {}
    };
  },
  props: ["infoDetail"],
  computed: { ...mapState(["lookUpAdd"]) },
  methods: {
    //关闭弹框
    marketCancel() {
      this.$parent.$parent.infoDialogFlag = false;
    },
    forbidSubmit() {
      let vm = this;
      let data = {};
      if (vm.forbidInfo.length == 0) {
        vm.$message({
          message: "请选择禁用原因",
          type: "warning"
        });
        return;
      }
      data.processResult = "fail";
      data.processReason = vm.forbidInfo.join("|");
      data.vId = vm.infoDetail.vId;
      data.videoTitle = vm.infoDetail.videoTitle;
      vm.api
        .post(`./manage/service/videoVerify/verify`, data)
        .then(function(response) {
          if (response.status == 200) {
            if (response.data) {
              vm.$parent.$parent.infoDetail = response.data;
              vm.$parent.$parent.getList();
              vm.forbidInfo = [];
              vm.dataInfo = "";
            } else {
              vm.$parent.$parent.infoDialogFlag = false;
              vm.$parent.$parent.getList();
            }
            vm.$parent.btnClick("查看封面", 0);
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style scoped lang="less">
.forbid /deep/ textarea {
  min-height: 128px !important;
}
.forbid {
  overflow: auto;
  h3 {
    color: #4a4a4a;
    margin: 10px 0 20px 0px;
  }
  .el-form {
    padding-right: 60px;
  }
  .el-form-item {
    margin-bottom: 8px;
    .el-checkbox {
      display: block;
      margin-left: 0;
    }
  }
  .operateBtnList {
    display: flex;
    justify-content: center;
    border-top: 1px solid #ebeef2;
    margin-top: 30px;
    padding-top: 20px;
  }
}
</style>
