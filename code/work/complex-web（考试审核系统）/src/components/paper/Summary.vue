<template>
  <div class="summary">
    <Title
      :titleDes="titleDes"
      :titleName="titleName"
      :shortAnswerFlag="shortAnswerFlag"
      :paperType="paperType"
    />
    <ul class="summary-list">
      <li
        v-for="(item, index) in shortAnswer.datas"
        :key="index"
        class="summary-list-box"
      >
        <!--题目序号和名称-->
        <Subject
          :index="item.questionSort"
          :textName="item.questionTitle"
          :questionScore="item.questionScore"
        />
        <div class="summary-text-box">
          <el-input
            type="textarea"
            v-if="$route.name == 'paper'"
            :autosize="{ minRows: 5, maxRows: 10 }"
            placeholder="请输入答案，最多支持输入600字"
            v-model="item.userAnswer"
            maxlength="600"
          >
          </el-input>
          <el-input
            type="textarea"
            v-else
            disabled
            :autosize="{ minRows: 5, maxRows: 10 }"
            v-model="item.userAnswer"
          >
          </el-input>
          <div
            class="answerBox"
            v-if="
              $route.name == 'examinationResults' ||
                $route.name == 'examinationChecked'
            "
          >
            <Answer
              :userScore="item.userScore || '0'"
              :everyScore="item.questionScore"
              :questionAnalyze="item.questionAnalyze"
              :correctAnswer="tools.getFillAnsewr(item.testPaperAnswers)"
              :titleType="titleType"
              :pQuestionId="item.pQuestionId"
              @setScore="setScore"
            />
          </div>
        </div>
      </li>
    </ul>
    <!-- {{ shortAnswer }} -->
  </div>
</template>
<script>
import Title from "./Title";
import Subject from "./Subject";
import Answer from "./Answer";
export default {
  data() {
    return {
      titleName: "简答题",
      titleType: "Summary",
      shortAnswerFlag: "shortAnswerFlag",
      questionScore: "",
      titleDes: {
        everyScore: 0,
        totalScore: 0,
        totalTitle: 0
      }
    };
  },
  components: { Title, Subject, Answer },
  props: ["shortAnswer", "paperType"],
  watch: {},
  computed: {},
  mounted() {
    let dataflag = this.shortAnswer;
    if (dataflag && (dataflag.everyScore || dataflag.totalScore)) {
      this.titleDes.everyScore = dataflag.everyScore || 0;
      this.titleDes.totalScore = dataflag.totalScore || 0;
      this.titleDes.totalTitle = dataflag.datas.length;
    }
    if (dataflag && dataflag.questionTypeSort) {
      this.titleName =
        this.tools.getCnNum(dataflag.questionTypeSort) + this.titleName;
    }
  },
  methods: {
    setScore(val) {
      this.$emit("setScoreShortAnswer", val);
    }
  }
};
</script>

<style scoped lang="less">
// .summary /deep/ .el-input__inner {
//   height: 40px;
//   padding-left: 40px;
// }
.summary {
  width: 100%;
  overflow: hidden;
  padding-bottom: 45px;
  .answerBox {
    margin-top: 21px;
  }
  .summary-list {
    width: 100%;
    .summary-list-box {
      border-bottom: 1px dashed #9b9b9b;
      width: 100%;
      overflow: hidden;
      margin: 45px 46px 0 0;
      .summary-text-box {
        margin-left: 47px;
        margin-top: 32px;
        padding-bottom: 24px;
      }
    }
  }
}
</style>