<template>
  <div class="paper" :style="{ minHeight: detailHeight - 43 + 'px' }">
    <dialogTip
      :tipShow="tipShow"
      :tipMessage="tipMessage"
      @dialogConfirm="dialogConfirm"
      :hideCancel="hideCancel"
    />
    <div class="paperHeader">
      <div class="line"></div>
      <h1 class="paperTitle">{{ paperTitle }}</h1>
      <div class="paperDes" v-if="$route.name == 'paper'">
        <div class="paperNum">
          <img src="../../assets/img/totalScore.svg" alt="总分" />总分：{{
            paperTotalScore
          }}分
        </div>
        <div class="paperTime">
          <img src="../../assets/img/examineTime.svg" alt="时长" />考试时长：{{
            paperTotalTime
          }}分钟
        </div>
      </div>
      <div class="paperDes" v-if="$route.name == 'examinationResults'">
        <div class="paperTime paperNum">
          <img src="../../assets/img/paperTo.svg" alt="时长" />答卷人：{{
            tools.setName(fwmAccount)
          }}
          - {{ fwmAccount }}
        </div>
        <div class="paperNum">
          <img src="../../assets/img/checkPaper.svg" alt="总分" />阅卷人：{{
            tools.setName(markFwmAccount)
          }}
        </div>
        <div class="paperTime">
          <img src="../../assets/img/paperTime.svg" alt="时长" />交卷时间：{{
            tools.setFormTime(testEndDateTitle, 1)
          }}
        </div>
      </div>
      <div class="paperDes" v-if="$route.name == 'examinationChecked'">
        <div class="paperTime paperNum">
          <img src="../../assets/img/paperTo.svg" alt="时长" />答卷人：{{
            tools.setName(fwmAccount)
          }}
          - {{ fwmAccount }}
        </div>
        <div class="paperTime paperNum">
          <img src="../../assets/img/paperType.svg" alt="时长" />试卷类型：{{
            tools.setPaperType(testType)
          }}
        </div>
        <div class="paperNum">
          <img src="../../assets/img/totalScore.svg" alt="总分" />总分：{{
            paperTotalScore
          }}分
        </div>

        <div class="paperTime">
          <img src="../../assets/img/examineTime.svg" alt="时长" />时长：{{
            paperTotalTime
          }}分钟
        </div>
      </div>
    </div>
    <div class="paperContent">
      <div class="Single">
        <single
          :paperType="paperType"
          :dataReceive="singleChoice"
          v-if="
            singleChoice && singleChoice.datas && singleChoice.datas.length > 0
          "
        />
      </div>
      <div class="Multiple">
        <multiple
          :paperType="paperType"
          :dataReceive="multipleChoice"
          v-if="
            multipleChoice &&
              multipleChoice.datas &&
              multipleChoice.datas.length > 0
          "
        />
      </div>
      <div class="Judge">
        <judge
          :paperType="paperType"
          :dataReceive="judgement"
          v-if="judgement && judgement.datas && judgement.datas.length > 0"
        />
      </div>
      <div class="Apfill">
        <Apfill
          :paperType="paperType"
          :completion="completion"
          @setScoreFill="setScoreFill"
          v-if="completion && completion.datas && completion.datas.length > 0"
        />
      </div>
      <div class="Summary">
        <Summary
          :paperType="paperType"
          :shortAnswer="shortAnswer"
          @setScoreShortAnswer="setScoreShortAnswer"
          v-if="
            shortAnswer && shortAnswer.datas && shortAnswer.datas.length > 0
          "
        />
      </div>
    </div>
    <div class="paperRight" v-if="$route.name == 'paper'">
      <div class="timeContent">
        <div class="timeTitle">
          <img src="../../assets/img/timeBack.svg" alt="倒计时" />倒计时
        </div>
        <div class="timeDetile">
          {{ hour }}<span v-if="second">:</span>{{ munite
          }}<span v-if="second">:</span>{{ second }}
        </div>
      </div>
      <div class="handPaper" @click="handPaper">
        <img src="../../assets/img/handPaper.svg" alt="交卷" />交卷
      </div>
    </div>
    <div
      class="paperRight"
      v-if="$route.name == 'examinationResults' || $route.params.type == 'done'"
    >
      <div class="timeContent">
        <div class="timeTitle">
          <img src="../../assets/img/score.svg" alt="得分" />得分
        </div>
        <div class="timeDetile" style="text-align:center">
          {{ userTestScore }}
        </div>
      </div>
      <div class="handPaper" @click="backList">
        <img src="../../assets/img/backList.svg" alt="返回列表" />返回列表
      </div>
    </div>
    <div
      class="paperRight"
      v-if="$route.name == 'examinationChecked' && $route.params.type == 'todo'"
    >
      <div class="timeContent">
        <div class="timeTitle">
          <img src="../../assets/img/score.svg" alt="得分" />得分
        </div>
        <div class="timeDetile" style="text-align:center">
          --
        </div>
      </div>
      <div class="handPaper" @click="checkPaper">
        <img src="../../assets/img/paperSubmit.svg" alt="提交" />提交
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import Single from "./Single";
import Multiple from "./Multiple";
import Judge from "./Judge";
import Apfill from "./Apfill";
import Summary from "./Summary";
import dialogTip from "../public/DialogTip";
export default {
  data() {
    return {
      hour: "",
      munite: "",
      second: "",
      timeFlag: 0,
      tipShow: false,
      userTestScore: 0,
      tipMessage: "",
      paperTitle: "",
      paperTotalScore: "",
      paperTotalTime: "",
      markFwmAccount: "",
      fwmAccount: "",
      testEndDateTitle: "",
      testId: "",
      paperCode: "",
      testResultId: "",
      testBeginDate: "",
      testEndDate: "",
      completion: {},
      singleChoice: {},
      multipleChoice: {},
      judgement: {},
      shortAnswer: {},
      errorNumFlag: "",
      hasErrorNum: 0,
      confirmSure: 0,
      hideCancel: "hideCancel",
      testResultId: "",
      scoreFillArr: [],
      scoreShortAnswerArr: [],
      testType: "",
      paperType: ""
    };
  },
  components: {
    Single,
    Multiple,
    Judge,
    Apfill,
    Summary,
    dialogTip
  },
  watch: {
    newPaperWidth() {
      if (
        this.newPaperWidth > this.oldPaperWidth + 30 ||
        this.newPaperWidth < this.oldPaperWidth - 30
      ) {
        this.listenErrorNum();
      }
    },
    newPaperHeight() {
      if (
        this.newPaperHeight > this.oldPaperHeight + 20 ||
        this.newPaperHeight < this.oldPaperHeight - 20
      ) {
        this.listenErrorNum();
      }
    }
  },
  computed: {
    ...mapState([
      "oldPaperWidth",
      "oldPaperHeight",
      "newPaperWidth",
      "newPaperHeight",
      "detailHeight",
      "multipleChecked"
    ])
  },
  mounted() {
    let vm = this;
    vm.errorNumFlag = vm.$route.params.errorNum;
    let hasErrorNum = 0;
    document.onkeydown = function() {
      if (vm.$route.name != "paper") {
        return;
      }
      if (event.ctrlKey && event.keyCode == 83) {
        // ctrl+s
        return false;
      }
      if (event.ctrlKey && event.keyCode == 67) {
        // ctrl+c
        return false;
      }
      if (event.ctrlKey && event.keyCode == 86) {
        // ctrl+v
        return false;
      }
      if (event.ctrlKey && event.keyCode == 78) {
        // ctrl+n 不生效
        return false;
      }
      if (event.shiftKey && event.keyCode == 121) {
        // shift+F10
        return false;
      }
      if (event.altKey && event.keyCode == 115) {
        //屏蔽Alt+F4  不生效
        return false;
      }
      if (
        event.altKey &&
        (event.keyCode == 37 || //屏蔽   Alt+   方向键   ←
          event.keyCode == 39)
      ) {
        //屏蔽   Alt+   方向键   →
        return false;
      }
      if (
        // event.keyCode == 8 || //屏蔽退格删除键
        event.keyCode == 112 || //屏蔽   F1   刷新键
        event.keyCode == 113 || //屏蔽   F2   刷新键
        event.keyCode == 114 || //屏蔽   F3   刷新键
        event.keyCode == 115 || //屏蔽   F4   刷新键
        event.keyCode == 116 || //屏蔽   F5   刷新键
        event.keyCode == 117 || //屏蔽   F6   刷新键
        event.keyCode == 118 || //屏蔽   F7   刷新键
        event.keyCode == 119 || //屏蔽   F8   刷新键
        event.keyCode == 120 || //屏蔽   F9   刷新键
        event.keyCode == 121 || //屏蔽   F10   刷新键
        event.keyCode == 122 || //屏蔽   F11   刷新键
        event.keyCode == 123 || //屏蔽   F12   刷新键
        (event.ctrlKey && event.keyCode == 82)
      ) {
        //Ctrl   +   R
        return false;
      }
    };
    window.onblur = function() {
      vm.listenErrorNum();
    };
    window.onhelp = function() {
      // alert("认真答题！");
      return false;
    };

    this.setPageHeight();
    this.setOpenWindow();

    // 获取试卷信息
    this.getPaperInfo();
  },
  methods: {
    ...mapMutations(["setPageHeight"]),
    //验证是否切换了窗口
    setOpenWindow() {
      if (this.$route.name != "paper") {
        return;
      }
      var hiddenProperty =
        "hidden" in document
          ? "hidden"
          : "webkitHidden" in document
          ? "webkitHidden"
          : "mozHidden" in document
          ? "mozHidden"
          : null;
      var visibilityChangeEvent = hiddenProperty.replace(
        /hidden/i,
        "visibilitychange"
      );
      var onVisibilityChange = function() {
        if (!document[hiddenProperty]) {
          // console.log("页面激活");
        } else {
          this.listenErrorNum();
        }
      };
      document.addEventListener(visibilityChangeEvent, onVisibilityChange);
    },

    // 考试时间倒计时
    countTime: function() {
      if (this.$route.name != "paper") {
        return;
      }
      let time = this.paperTotalTime * 60;
      var setTime = setInterval(() => {
        if (time > 0) {
          this.timeFlag = time;
          time--;
          this.hour = this.tools.PrefixZero(Math.floor((time / 60 / 60) % 24));
          this.munite = this.tools.PrefixZero(Math.floor((time / 60) % 60));
          this.second = this.tools.PrefixZero(Math.floor(time % 60));
        }
        if (time == 0) {
          clearInterval(setTime);
          this.submitPaper();
        }
      }, 1000);
    },
    // 获取考试试卷
    getPaperInfo() {
      let vm = this;
      let url = `./complex/service/test/findDetail?testId=${
        this.$route.params.testId
      }`;
      if (vm.$route.name == "examinationResults") {
        let fwmAccount = this.$route.params.fwmAccount;
        let fwmAccountFlag;
        if (fwmAccount && fwmAccount != "my") {
          fwmAccountFlag = `&fwmAccount=${fwmAccount}`;
        } else {
          fwmAccountFlag = "";
        }
        url = `./complex/service/test/findDetailOfTested?testId=${
          this.$route.params.testId
        }&paperCode=${this.$route.params.paperCode}${fwmAccountFlag}`;
      }
      if (vm.$route.name == "examinationChecked") {
        url = `./complex/service/task/taskinfo?taskId=${
          this.$route.params.testId
        }`;
      }
      vm.api
        .get(url)
        .then(response => {
          if (response.status == 200) {
            window.scroll(0, 0);
            let dataFlag;
            if (vm.$route.name == "examinationChecked") {
              dataFlag = response.data.applyData;
              vm.testResultId = dataFlag.testResultId;
            } else {
              dataFlag = response.data;
            }
            vm.testId = dataFlag.testId;
            vm.paperType = dataFlag.paperType;
            vm.paperCode = dataFlag.paperCode;
            vm.userTestScore = dataFlag.userTestScore;
            vm.testResultId = dataFlag.testResultId;
            vm.paperTitle = dataFlag.testName;
            vm.paperTotalScore = dataFlag.testScore;
            vm.paperTotalTime = dataFlag.timeLimit;
            vm.testType = dataFlag.testType;
            vm.markFwmAccount = dataFlag.markFwmAccount;
            vm.fwmAccount = dataFlag.fwmAccount;
            vm.testEndDateTitle = dataFlag.testEndDate;
            vm.singleChoice = dataFlag.singleChoice;
            vm.multipleChoice = dataFlag.multipleChoice;
            vm.judgement = dataFlag.judgement;
            if (vm.singleChoice) {
              let single = vm.singleChoice.datas;
              for (var i = 0; i < single.length; i++) {
                if (single[i].userAnswer) {
                  single[i].userAnswer = +single[i].userAnswer;
                }
              }
            }
            if (vm.judgement) {
              let judge = vm.judgement.datas;
              for (var i = 0; i < judge.length; i++) {
                if (judge[i].userAnswer) {
                  judge[i].userAnswer = +judge[i].userAnswer;
                }
              }
            }
            vm.completion = dataFlag.completion;
            vm.shortAnswer = dataFlag.shortAnswer;
            vm.countTime();
          }
        })
        .catch(error => {});
    },
    // 监听违规次数
    listenErrorNum() {
      // let vm = this;
      // if (vm.$route.name != "paper") {
      //   return;
      // }
      // if (vm.errorNumFlag > 1) {
      //   --vm.errorNumFlag;
      //   vm.hasErrorNum++;
      //   vm.tipShow = true;
      //   vm.tipMessage = `<p>您有 <span class="numTotal">${
      //     vm.$route.params.errorNum
      //   } </span>次切屏机会，</p><p>您已切屏<span class="numTotal"> ${
      //     vm.hasErrorNum
      //   } </span>次，</p><p>最后一次切屏后将自动提交试卷~</p>`;
      // } else {
      //   vm.submitPaper();
      // }
    },
    // 交卷按钮
    handPaper() {
      let vm = this;
      //多选将字符串转换为数组
      let arr = vm.multipleChecked;
      if (vm.multipleChoice) {
        let multipleFlag = vm.multipleChoice.datas;
        for (let i = 0; i < multipleFlag.length; i++) {
          multipleFlag[i].userAnswer = "";
        }
        for (let i = 0; i < arr.length; i++) {
          let equipment = arr[i];
          if (equipment.length > 0) {
            vm.multipleChoice.datas[i].userAnswer = equipment.join("|");
          }
        }
      }
      // 校验题目是否做完
      let singleChoiceFlag = [];
      if (vm.singleChoice) {
        let singleChoiceData = vm.singleChoice.datas;
        for (var i = 0; i < singleChoiceData.length; i++) {
          if (!singleChoiceData[i].userAnswer) {
            singleChoiceFlag.push(singleChoiceData[i].pQuestionId);
          }
        }
      }
      let multipleChoiceFlag = [];
      if (vm.multipleChoice) {
        let multipleChoiceData = vm.multipleChoice.datas;
        for (var i = 0; i < multipleChoiceData.length; i++) {
          if (!multipleChoiceData[i].userAnswer) {
            multipleChoiceFlag.push(multipleChoiceData[i].pQuestionId);
          }
        }
      }
      let judgementFlag = [];
      if (vm.judgement) {
        let judgementData = vm.judgement.datas;
        for (var i = 0; i < judgementData.length; i++) {
          if (!judgementData[i].userAnswer) {
            judgementFlag.push(judgementData[i].pQuestionId);
          }
        }
      }
      let completionFlag = [];
      if (vm.completion) {
        let completionData = vm.completion.datas;
        for (var i = 0; i < completionData.length; i++) {
          let flag = completionData[i].testPaperAnswers;
          for (var j = 0; j < flag.length; j++) {
            if (!flag[j].userAnswer) {
              completionFlag.push(flag[j].pQuestionId);
            }
          }
        }
      }
      let shortAnswerFlag = [];
      if (vm.shortAnswer) {
        let shortAnswerData = vm.shortAnswer.datas;
        for (var i = 0; i < shortAnswerData.length; i++) {
          // let flag = shortAnswerData[i].testPaperAnswers;
          for (var j = 0; j < shortAnswerData.length; j++) {
            if (!shortAnswerData[j].userAnswer) {
              shortAnswerFlag.push(shortAnswerData[j].pQuestionId);
            }
          }
        }
      }
      if (
        singleChoiceFlag.length ||
        multipleChoiceFlag.length ||
        judgementFlag.length ||
        completionFlag.length ||
        shortAnswerFlag.length
      ) {
        this.tipShow = true;
        this.confirmSure = 1;
        this.hideCancel = "showCancel";
        this.tipMessage = "您还有题目未答完，确认要提交该试卷？";
      } else {
        this.tipShow = true;
        this.confirmSure = 1;
        this.hideCancel = "showCancel";
        this.tipMessage = "您确认要提交该试卷？";
      }
    },
    // 交卷弹框确认按钮操作
    dialogConfirm() {
      if (this.confirmSure == 1) {
        this.submitPaper();
      }
      if (this.confirmSure == 2) {
        this.checkPaperApi();
      }
    },
    // 交卷操作
    submitPaper() {
      let vm = this;
      //多选将字符串转换为数组
      let arr = vm.multipleChecked;
      if (vm.multipleChoice) {
        let multipleFlag = vm.multipleChoice.datas;
        for (let i = 0; i < multipleFlag.length; i++) {
          multipleFlag[i].userAnswer = "";
        }
        for (let i = 0; i < arr.length; i++) {
          let equipment = arr[i];
          if (equipment.length > 0) {
            vm.multipleChoice.datas[i].userAnswer = equipment.join("|");
          }
        }
      }
      let handData = {};
      handData.testId = vm.testId;
      handData.paperCode = vm.paperCode;
      handData.testResultId = vm.testResultId;
      handData.singleChoice = vm.singleChoice;
      handData.multipleChoice = vm.multipleChoice;
      handData.judgement = vm.judgement;
      handData.completion = vm.completion;
      handData.shortAnswer = vm.shortAnswer;
      // 获取开始结束时间
      var timestamp = new Date().getTime();
      handData.testEndDate = timestamp;
      let timePass = vm.paperTotalTime * 60 * 1000 - vm.timeFlag * 1000;
      handData.testBeginDate = timestamp - timePass;
      vm.api
        .post(`./complex/service/test/submit`, handData)
        .then(response => {
          //关闭考试页面
          // window.opener = null;
          // window.open("", "_self");
          window.close();
          //刷新考试列表
          window.opener.location.href = window.opener.location.href;
          window.opener.location.reload();
        })
        .catch(error => {});
    },
    // 评卷时填空题数据获取
    setScoreFill(val) {
      let arr = this.scoreFillArr;
      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].pQuestionId == val.pQuestionId) {
            arr.splice(i, 1);
          }
        }
        arr.push(val);
      } else {
        arr.push(val);
      }
    },
    // 评卷时填空题题数据获取
    setScoreShortAnswer(val) {
      let arr = this.scoreShortAnswerArr;
      if (arr.length) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].pQuestionId == val.pQuestionId) {
            arr.splice(i, 1);
          }
        }
        arr.push(val);
      } else {
        arr.push(val);
      }
    },
    // 评卷操作
    checkPaperApi() {
      let vm = this;
      let handData = {
        taskId: "",
        testResultId: "",
        completion: {
          datas: []
        },
        shortAnswer: {
          datas: []
        }
      };
      handData.taskId = vm.$route.params.testId;
      handData.testResultId = vm.testResultId;
      handData.completion.datas = vm.scoreFillArr;
      handData.shortAnswer.datas = vm.scoreShortAnswerArr;
      vm.api
        .post(`./complex/service/test/mark`, handData)
        .then(response => {
          vm.$router.push({
            name: "todoList"
          });
        })
        .catch(error => {});
    },
    // 返回列表
    backList() {
      let nameUrl = "";
      if (this.$route.name == "examinationChecked") {
        nameUrl = "todoList";
        this.$router.push({
          name: nameUrl,
          params: {
            type: 1
          }
        });
      }
      if (this.$route.name == "examinationResults") {
        this.$router.go(-1);
      }
    },
    // 试卷审批
    checkPaper() {
      // this.checkPaperApi();
      let vm = this;
      this.tipShow = true;
      this.confirmSure = 2;
      this.hideCancel = "showCancel";
      let completionFlag = false;
      if (vm.completion) {
        let completionData = vm.completion.datas;
        if (completionData.length == vm.scoreFillArr.length) {
          completionFlag = true;
        }
      } else {
        completionFlag = true;
      }
      let shortAnswerFlag = false;
      if (vm.shortAnswer) {
        let shortAnswerData = vm.shortAnswer.datas;
        if (shortAnswerData.length == vm.scoreShortAnswerArr.length) {
          shortAnswerFlag = true;
        }
      } else {
        shortAnswerFlag = true;
      }
      if (completionFlag && shortAnswerFlag) {
        this.tipMessage = "您确认要提交该试卷？";
      } else {
        this.tipMessage = "您还有试题没有打分，请确定要提交吗？";
      }
    }
  }
};
</script>

<style scoped lang="less">
.paper /deep/ .el-input.is-disabled .el-input__inner {
  color: #606266;
}
.paper /deep/ .el-textarea.is-disabled .el-textarea__inner {
  color: #606266;
}
.paper /deep/ .el-radio__input.is-disabled + span.el-radio__label {
  color: #606266;
}
.paper /deep/ .el-checkbox__input.is-disabled + span.el-checkbox__label {
  color: #606266;
}
.paper /deep/.el-radio__input.is-disabled .el-radio__inner,
.el-radio__input.is-disabled.is-checked .el-radio__inner {
  background-color: none;
  border-color: none;
}
.paper /deep/.el-radio__input.is-checked .el-radio__inner {
  background-color: #00cdca;
  border-color: #00cdca;
}
.paper/deep/.el-radio__input.is-disabled.is-checked .el-radio__inner::after {
  background-color: #fff;
}
.paper /deep/.el-checkbox__input.is-disabled .el-checkbox_inner,
.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
  background-color: none;
  border-color: none;
}
.paper /deep/.el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #00cdca;
  border-color: #00cdca;
}
.paper/deep/.el-checkbox__input.is-disabled.is-checked
  .el-checkbox__inner::after {
  border-color: #fff;
}
.paper {
  width: 100%;
  margin-bottom: 83px;
  position: relative;
  .paperHeader {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 25px;
    .line {
      width: 1201px;
      height: 1px;
      background: #f1f1f1;
      position: relative;
      top: 55px;
    }
    .paperTitle {
      font-size: 28px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 40px;
    }
    .paperDes {
      display: flex;
      margin-top: 35px;
      img {
        margin-right: 5px;
        margin-top: -4px;
      }
      .paperNum {
        margin-right: 20px;
      }
    }
  }
  .paperContent {
    width: 1000px;
  }
  .paperRight {
    position: fixed;
    top: 145px;
    left: calc(50% + 420px);
    .timeContent {
      width: 180px;
      height: 165px;
      background: rgba(255, 255, 255, 1);
      border-radius: 2px;
      border: 1px solid rgba(241, 241, 241, 1);
      display: flex;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      padding-top: 32px;
      .timeTitle {
        font-size: 16px;
        line-height: 22px;
        font-weight: 600;
        img {
          margin-top: -4px;
          margin-right: 10px;
        }
      }
      .timeDetile {
        width: 131px;
        height: 43px;
        font-size: 36px;
        font-family: Impact;
        color: rgba(74, 74, 74, 1);
        line-height: 44px;
        margin-top: 25px;
      }
    }
    .handPaper {
      width: 180px;
      height: 50px;
      line-height: 50px;
      background: rgba(0, 205, 202, 1);
      border-radius: 2px;
      margin-top: 18px;
      cursor: pointer;
      color: rgba(255, 255, 255, 1);
      font-size: 16px;
      display: flex;
      justify-content: center;
      img {
        margin-right: 10px;
        margin-top: 11px;
        width: 18px;
        height: 24px;
      }
    }
  }
}
</style>