<template>
  <div class="choose">
    <div class="totalTitle">
      <Title
        :titleDes="titleDes"
        :titleName="titleName"
        :multipleTitle="true"
        :lessAnswerScore="lessAnswerScore"
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
          <el-checkbox-group
            v-model="checkedEquipments[indexItem]"
            @change="handleChange"
            v-if="
              itemItem.testPaperAnswers && !itemItem.testPaperAnswers[0].imgFId
            "
          >
            <el-checkbox
              :label="item.pAnswerId"
              :disabled="$route.name == 'paper' ? false : true"
              v-for="(item, index) in itemItem.testPaperAnswers"
              :key="index"
              >{{ tools.getLetter(index) }}{{ item.answerTitle }}</el-checkbox
            >
          </el-checkbox-group>
          <div class="imgBox" v-else>
            <div
              class="imgItem"
              v-for="(item, index) in itemItem.testPaperAnswers"
            >
              <img :src="tools.downImg(item.imgFId)" v-if="item.imgFId" />
              <div v-else class="imgClass"></div>
              <el-checkbox-group
                v-model="checkedEquipments[indexItem]"
                @change="handleChange"
              >
                <el-checkbox
                  :label="item.pAnswerId"
                  :key="index"
                  :disabled="$route.name == 'paper' ? false : true"
                  >{{ tools.getLetter(index) }}{{ item.answerTitle }}
                </el-checkbox>
              </el-checkbox-group>
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
              :correctAnswer="tools.getCorrectAnsewr(itemItem.testPaperAnswers)"
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
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      checkedEquipments: [],
      titleName: "多选题",
      titleType: "Multiple",
      lessAnswerScore: 0,
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
  created() {
    // 初始化默认选中状态
    let datas = this.dataReceive.datas;
    for (let i = 0; i < datas.length; i++) {
      let checkArr = [];
      let item = datas[i].userAnswer;
      if (item) {
        if (typeof item == "string") {
          item = item.split("|");
        }
      } else {
        item = [];
      }
      if (item.length === 0) {
        this.checkedEquipments.push([]);
      } else {
        for (let j = 0; j < item.length; j++) {
          checkArr.push(item[j]);
        }
        this.checkedEquipments.push(checkArr);
      }
    }
  },
  mounted() {
    let dataflag = this.dataReceive;
    if (dataflag && (dataflag.everyScore || dataflag.totalScore)) {
      this.lessAnswerScore = dataflag.lessAnswerScore || 0;
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
    ...mapMutations(["getMultipleChecked"]),
    handleChange() {
      this.getMultipleChecked(this.checkedEquipments);
    }
  }
};
</script>

<style scoped lang="less">
@import url("./choose.less");
</style>