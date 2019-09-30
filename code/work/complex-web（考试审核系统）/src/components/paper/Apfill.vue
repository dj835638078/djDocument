<template>
  <div class="apfill">
    <Title :titleDes="titleDes" :titleName="titleName" :paperType="paperType" />
    <ul class="apfill-list">
      <li
        v-for="(item, index) in completion.datas"
        :key="index"
        class="apfill-list-box"
      >
        <!--题目序号和名称-->
        <Subject :index="item.questionSort" :textName="item.questionTitle" />
        <ul class="apfill-answer">
          <li
            v-for="(childItem, childIndex) in item.testPaperAnswers"
            :key="childIndex"
            class="apfill-answer-box"
          >
            <div class="apfill-answer-box-index">
              {{ childIndex + 1 }}
            </div>
            <el-input
              v-model="childItem.userAnswer"
              v-if="$route.name == 'paper'"
              placeholder="请输入内容"
              maxlength="100"
            ></el-input>
            <el-input v-model="childItem.userAnswer" v-else disabled></el-input>
          </li>
          <div
            class="answerBox"
            v-if="
              $route.name == 'examinationResults' ||
                $route.name == 'examinationChecked'
            "
          >
            <Answer
              :userScore="item.userScore || '0'"
              :everyScore="completion.everyScore"
              :questionAnalyze="item.questionAnalyze"
              :correctAnswer="tools.getFillAnsewr(item.testPaperAnswers)"
              :titleType="titleType"
              :pQuestionId="item.pQuestionId"
              @setScore="setScore"
            />
          </div>
        </ul>
      </li>
    </ul>
    <!-- {{ $parent.completion }} -->
  </div>
</template>
<script>
import Title from "./Title";
import Subject from "./Subject";
import Answer from "./Answer";
export default {
  data() {
    return {
      titleName: "填空题",
      titleType: "Apfill",
      titleDes: {
        everyScore: 0,
        totalScore: 0,
        totalTitle: 0
      }
    };
  },
  components: { Title, Subject, Answer },
  props: ["completion", "paperType"],
  watch: {},
  computed: {},
  mounted() {
    let dataflag = this.completion;
    if (dataflag && (dataflag.everyScore || dataflag.totalScore)) {
      this.titleDes.everyScore = dataflag.everyScore || 0;
      this.titleDes.totalScore = dataflag.totalScore || 0;
      this.titleDes.totalTitle = dataflag.totalScore / dataflag.everyScore || 0;
    }
    if (dataflag && dataflag.questionTypeSort) {
      this.titleName =
        this.tools.getCnNum(dataflag.questionTypeSort) + this.titleName;
    }
  },
  methods: {
    setScore(val) {
      this.$emit("setScoreFill", val);
    }
  }
};
</script>

<style scoped lang="less">
.apfill /deep/ .el-input__inner {
  height: 40px;
  padding-left: 40px;
}
.apfill {
  width: 100%;
  overflow: hidden;
  padding-bottom: 15px;
  .apfill-list {
    width: 100%;
    .apfill-list-box {
      width: 100%;
      overflow: hidden;
      margin: 45px 46px 0 0;
      padding-bottom: 24px;
      border-bottom: 1px dashed #9b9b9b;
      .apfill-answer {
        width: 928px;
        margin-left: 47px;
        margin-top: 45px;
        .apfill-answer-box {
          width: 100%;
          height: 40px;
          position: relative;
          margin-bottom: 21px;
          .apfill-answer-box-index {
            position: absolute;
            width: 20px;
            height: 20px;
            border-radius: 100%;
            line-height: 20px;
            border: 1px solid #dcdfe6;
            z-index: 100;
            text-align: center;
            top: 8px;
            left: 8px;
          }
        }
      }
    }
  }
}
</style>