<template>
  <div class="answer" :class="[colorBoxFlag]">
    <div class="answerInfo">
      <div class="answerResult">
        正确答案：
        <span v-if="titleType == 'Apfill'">
          <span v-for="(item, index) in correctAnswer.split('、')" :key="index">
            <span class="answerIndex">{{ index + 1 }}</span>
            <span class="answerDetail">{{ item }}</span>
          </span>
        </span>
        <span
          v-else-if="titleType == 'Summary'"
          style="color:rgba(0, 205, 202, 1)"
          >见答案解析</span
        >
        <span v-else :class="[colorFlag]">{{ correctAnswer }}</span>
      </div>
      <div class="answerScore" v-if="$route.name == 'examinationResults'">
        得分：<span class="colorRight">{{ userScore }}</span>
        <!-- 得分：<span :class="[colorFlag]">{{ userScore }}</span> -->
      </div>
      <div class="answerScore" v-if="$route.name == 'examinationChecked'">
        <template
          v-if="
            titleType == 'Single' ||
              titleType == 'Multiple' ||
              titleType == 'Judge' ||
              $route.params.type == 'done'
          "
        >
          <!-- 得分：<span :class="[colorFlag]">{{ userScore || "0" }}</span> -->
          得分：<span class="colorRight">{{ userScore || "0" }}</span>
        </template>
        <template
          v-if="
            (titleType == 'Apfill' || titleType == 'Summary') &&
              $route.params.type == 'todo'
          "
        >
          <el-select
            v-model="score"
            placeholder="设置得分"
            @change="scoreChange"
          >
            <el-option
              v-for="(item, index) in everyScore + 1"
              :key="index"
              :label="index"
              :value="index"
            >
            </el-option>
          </el-select>
          分
        </template>
      </div>
    </div>
    <div class="answerDes">答案解析：{{ questionAnalyze }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colorFlag: "colorRight",
      colorBoxFlag: "colorRightBox",
      score: ""
    };
  },
  props: [
    "state",
    "userScore",
    "questionAnalyze",
    "correctAnswer",
    "everyScore",
    "titleType",
    "pQuestionId"
  ],
  components: {},
  watch: {},
  computed: {},
  mounted() {
    if (this.everyScore != this.userScore && this.userScore != 0) {
      this.colorFlag = "colorWarning";
      this.colorBoxFlag = "colorWarningBox";
    } else if (this.userScore == 0) {
      this.colorFlag = "colorError";
      this.colorBoxFlag = "colorErrorBox";
    } else {
      this.colorFlag = "colorRight";
      this.colorBoxFlag = "colorRightBox";
    }
  },
  methods: {
    scoreChange(val) {
      let obj = {};
      obj.pQuestionId = this.pQuestionId;
      obj.UserScore = val;
      this.$emit("setScore", obj);
    }
  }
};
</script>

<style scoped lang="less">
.answerScore /deep/ .el-input__inner {
  height: 32px !important;
  padding-left: 15px !important;
}

.colorRightBox {
  border-left: 4px solid rgba(0, 205, 202, 1);
  background: rgba(0, 205, 202, 0.08);
}
.colorRight {
  color: rgba(0, 205, 202, 1);
}
.colorWarningBox {
  border-left: 4px solid rgba(255, 183, 40, 1);
  background: rgba(255, 183, 40, 0.08);
}
.colorWarning {
  color: rgba(255, 183, 40, 1);
}
.colorErrorBox {
  border-left: 4px solid rgba(255, 85, 79, 1);
  background: rgba(255, 85, 79, 0.08);
}
.colorError {
  color: rgba(255, 85, 79, 1);
}
.answer {
  min-height: 100px;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  .answerIndex {
    border: 1px solid #dcdfe6;
    border-radius: 50%;
    display: inline-block;
    min-width: 20px;
    text-align: center;
  }
  .answerInfo {
    display: flex;
    justify-content: space-between;
    line-height: 20px;
    .answerResult {
      flex: 1;
    }
    .answerScore {
      flex: 0 0 130px;
      text-align: right;
      .el-select {
        width: 100px;
        height: 32px;
        margin-right: 5px;
      }
    }
  }
  .answerDetail {
    color: #00cdca;
    margin-right: 15px;
    text-decoration: underline;
  }
  .answerDes {
    line-height: 20px;
    margin-top: 15px;
  }
}
</style>