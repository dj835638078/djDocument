<template>
  <div class="choose">
    <div class="totalTitle">
      <Title
        :titleDes="titleDes"
        :titleName="titleName"
        :paperType="paperType"
      />
    </div>
    <div
      class="chooseContent"
      v-if="dataReceive && dataReceive.datas && dataReceive.datas.length"
    >
      <div
        class="chooseItem"
        v-for="(itemItem, indexItem) in dataReceive.datas"
        :key="indexItem"
      >
        <Subject
          :index="itemItem.questionSort"
          :textName="itemItem.questionTitle"
        />
        <div class="selectItem">
          <el-radio-group
            v-model="itemItem.userAnswer"
            v-if="
              itemItem.testPaperAnswers && !itemItem.testPaperAnswers[0].imgFId
            "
          >
            <el-radio
              :label="item.pAnswerId"
              v-for="(item, index) in itemItem.testPaperAnswers"
              :disabled="$route.name == 'paper' ? false : true"
              :key="index"
              >{{ item.answerTitle }}</el-radio
            >
          </el-radio-group>
          <div class="imgBox" v-else>
            <div
              class="imgItem"
              v-for="(item, index) in itemItem.testPaperAnswers"
            >
              <img :src="tools.downImg(item.imgFId)" v-if="item.imgFId" />
              <div v-else class="imgClass"></div>
              <el-radio
                :label="item.pAnswerId"
                :disabled="$route.name == 'paper' ? false : true"
                :key="index"
                v-model="itemItem.userAnswer"
                >{{ item.answerTitle }}</el-radio
              >
            </div>
          </div>
          <div
            class="answerBox"
            v-if="
              $route.name == 'examinationResults' ||
                $route.name == 'examinationChecked'
            "
          >
            <Answer
              :questionAnalyze="itemItem.questionAnalyze"
              :userScore="itemItem.userScore"
              :correctAnswer="tools.getJudgeAnsewr(itemItem.testPaperAnswers)"
              :everyScore="dataReceive.everyScore"
              :titleType="titleType"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Title from "./Title";
import Subject from "./Subject";
import Answer from "./Answer";
export default {
  data() {
    return {
      titleName: "",
      titleType: "Judge",
      titleDes: {
        everyScore: 0,
        totalScore: 0,
        totalTitle: 0
      }
    };
  },
  props: ["dataReceive", "paperType"],
  components: { Title, Subject, Answer },
  watch: {},
  computed: {},
  mounted() {
    let dataflag = this.dataReceive;
    if (dataflag && (dataflag.everyScore || dataflag.totalScore)) {
      this.titleDes.everyScore = dataflag.everyScore || 0;
      this.titleDes.totalScore = dataflag.totalScore || 0;
      this.titleDes.totalTitle = dataflag.totalScore / dataflag.everyScore || 0;
    }
    if (dataflag && dataflag.questionTypeSort) {
      this.titleName =
        this.tools.getCnNum(dataflag.questionTypeSort) + "判断题";
    }
  },
  methods: {}
};
</script>

<style scoped lang="less">
@import url("./choose.less");
</style>