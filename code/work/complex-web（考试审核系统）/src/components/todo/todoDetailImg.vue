<template>
  <div class="informationAdd">
    <div class="informationAddTitle">
      <div class="line"></div>
      <div class="title">申诉</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="tipMessage">
      <div class="itemBox">
        <div class="itemTitle">
          <h3>基本信息</h3>
        </div>
        <div class="itemContent">
          <div class="itemSingle">
            <span>标题：</span>
            <!-- <el-input v-model="dealInfo.contentTitle" disabled></el-input> -->
            <div class="el-input">{{ dealInfo.contentTitle }}</div>
          </div>
          <div class="itemSingle">
            <span>rowkey：</span>
            <!-- <el-input v-model="dealInfo.rowkey" disabled></el-input> -->
            <div class="el-input">{{ dealInfo.rowkey }}</div>
          </div>
          <div class="itemSingle">
            <span>审核结果：</span>
            <!-- <el-input v-model="processResult" disabled></el-input> -->
            <div class="el-input">{{ processResult }}</div>
          </div>
          <div class="itemSingle">
            <span>错误类型：</span>
            <!-- <el-input
              v-model="errorType"
              disabled
              :title="errorType"
              class="appealReason"
            ></el-input> -->
            <div class="el-input appealReason">{{ errorType }}</div>
          </div>
        </div>
      </div>
      <div class="itemBox">
        <div class="itemTitle">
          <h3>申诉信息</h3>
        </div>
        <div class="itemContent">
          <div class="itemSingle">
            <span>申诉理由：</span>
            <!-- <el-input
              v-model="dealInfo.appealReason"
              disabled
              :title="dealInfo.appealReason"
              class="appealReason"
            ></el-input> -->
            <div class="el-input appealReason">{{ dealInfo.appealReason }}</div>
          </div>
          <div class="itemSingle">
            <span>截图：</span>
            <div class="imgBox">
              <img
                v-if="dealInfo.fId"
                :src="tools.downImg(dealInfo.fId)"
                @click="viewImgBtn(dealInfo)"
                style="cursor:pointer;"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="itemBox">
        <div class="itemTitle">
          <h3>审批信息</h3>
        </div>
        <div class="itemContent">
          <div class="itemSingle">
            <span><span class="redColor">*</span>结论：</span>
            <div class="imgBox">
              <el-radio-group
                v-model="conclusion"
                v-if="$route.name == 'todoDetailImg'"
              >
                <el-radio :label="1">同意</el-radio>
                <el-radio :label="2">不同意</el-radio>
              </el-radio-group>
              <el-radio-group
                v-model="conclusion"
                v-if="$route.name == 'doneDetailImg'"
                disabled
              >
                <el-radio :label="1">同意</el-radio>
                <el-radio :label="2">不同意</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="itemSingle">
            <span><span class="redColor">*</span>原因：</span>
            <el-input
              v-model="suggestion"
              type="textarea"
              v-if="$route.name == 'todoDetailImg'"
              maxlength="200"
            ></el-input>
            <!-- <el-input
              v-model="suggestion"
              disabled
              type="textarea"
              v-if="$route.name == 'doneDetailImg'"
            ></el-input> -->
            <div
              class="el-input appealReason"
              v-if="$route.name == 'doneDetailImg'"
            >
              {{ suggestion }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <span
      slot="footer"
      class="dialog-footer"
      v-if="$route.name == 'todoDetailImg'"
    >
      <div class="informationAddFooter footerLeft" @click="goBack">
        取消
      </div>
      <div class="informationAddFooter" @click="goNewList">
        提交
      </div>
    </span>
    <ViewImg :imgUrl="imgUrl" :imgName="imgName" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ViewImg from "../public/viewImg";
export default {
  data() {
    return {
      imgShow: false,

      imgName: "截图",
      imgUrl: "",
      title: "",
      conclusion: "",
      suggestion: "",
      processResult: "",
      errorType: "",
      dealInfo: {}
    };
  },
  props: {
    tipMessage: {
      default: "default"
    }
  },
  components: {
    ViewImg
  },
  computed: {},
  mounted() {
    this.getDetail();
  },
  watch: {},
  methods: {
    viewImgBtn(val) {
      this.imgUrl =
        location.origin + `/complex/publicservice/file/download?fId=${val.fId}`;
      this.imgShow = true;
    },
    //返回上一层
    goBack() {
      if (this.$route.name == "doneDetailImg") {
        this.$router.push({
          name: "todoList",
          params: {
            type: 1
          }
        });
      } else {
        this.$router.go(-1);
      }
    },
    getDetail() {
      let vm = this;
      vm.api
        .get(
          `./complex/service/task/taskinfo?taskId=${vm.$route.params.taskId}`
        )
        .then(response => {
          if (response.status == 200) {
            vm.dealInfo = response.data.applyData;
            vm.errorType = vm.tools.setErrorType(vm.dealInfo.errorType);
            vm.processResult = vm.tools.setExamineResult(
              response.data.applyData.processResult
            );
            if (vm.$route.name == "doneDetailImg") {
              vm.suggestion = response.data.suggestion;
              vm.conclusion = +response.data.conclusion;
            }
          }
        })
        .catch(error => {});
    },
    //申诉确认
    goNewList() {
      let vm = this;
      if (!vm.conclusion || !vm.suggestion) {
        vm.$message({
          message: "请填写结论和原因",
          type: "warning"
        });
        return;
      }
      let data = {
        taskId: vm.$route.params.taskId,
        conclusion: vm.conclusion,
        suggestion: vm.suggestion
      };
      vm.api
        .post(`./complex/service/task/approve`, data)
        .then(response => {
          if (response.status == 200) {
            vm.$router.go(-1);
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
  width: 800px;
}
.informationAdd /deep/ .el-input.is-disabled .el-input__inner {
  color: #606266;
}
.informationAdd /deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
  height: 205px;
}
.informationAdd /deep/ .el-radio__input.is-disabled + span.el-radio__label {
  color: #606266;
}
.informationAdd
  /deep/
  .el-checkbox__input.is-disabled
  + span.el-checkbox__label {
  color: #606266;
}
.informationAdd /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
  padding-bottom: 10px;
  max-height: 400px;
  overflow-y: auto;
}
.informationAdd /deep/ .el-dialog__title {
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 600;
}
.informationAdd /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.informationAddFooter {
  width: 80px;
  height: 30px;
  background: rgba(0, 205, 202, 1);
  border-radius: 2px;
  color: #fff;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}
.footerLeft {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(220, 223, 230, 1);
  color: rgba(74, 74, 74, 1);
  margin-right: 10px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.tipMessage /deep/ p {
  margin-top: 10px;
}
.tipMessage /deep/ .numTotal {
  font-size: 18px;
  color: red;
}
.tipMessage /deep/ .numRest {
  font-size: 18px;
  color: yellow;
}
.tipMessage /deep/.el-textarea__inner {
  height: 100px;
}
.appealReason /deep/ input {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tipMessage {
  width: 900px;
  .itemBox {
    .itemTitle {
      display: flex;
      justify-content: space-between;
      margin: 20px 0 0 0;
      h3 {
        font-size: 16px;
        font-family: PingFangSC-Medium;
        font-weight: 600;
        color: rgba(42, 42, 42, 1);
        line-height: 25px;
      }
      i {
        margin-top: 5px;
        cursor: pointer;
        color: rgb(0, 205, 202);
        font-weight: 600;
      }
    }
    .itemContent {
      // border-top: 1px solid #e8e6e6;
      padding-top: 20px;
      .itemSingle {
        display: flex;
        text-align: left;
        margin-bottom: 8px;
        .redColor {
          color: red;
        }
        span {
          flex: 0 0 90px;
          line-height: 32px;
        }
        .el-input {
          flex: 1;
          margin-top: 0;
          line-height: 32px;
        }
        .imgBox {
          flex: 1;
          margin-top: 10px;
          img {
            display: inline-block;
            width: 100px;
            height: 100px;
            &:hover {
              box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.6);
            }
          }
        }
      }
    }
  }
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
      height: 22px;
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
}
</style>