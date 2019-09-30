<template>
  <div class="paperTip">
    <el-dialog
      title="考试须知"
      :visible.sync="$parent.tipShow"
      width="550px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
    >
      <p class="textName-p">请认真阅读以下注意事项</p>
      <P class="textName-p" v-for="(item, index) in textName" :key="index"
        >{{ index + 1 }} {{ item.text }}</P
      >
      <span slot="footer" class="dialog-footer">
        <div class="paperTip-footer-N" v-if="time != 0">
          {{ time }}
        </div>
        <div class="paperTip-footer-Y" @click="goNewList" v-else>
          确定
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      textName: [
        {
          text:
            "在考试过程中，没有做提交动作的时候，每个人有两次打开试卷的机会，重新打开试卷是重新计时的。不保留试卷答题记录。"
        },
        {
          text: "做完主动提交后该试卷答题完毕。"
        },
        {
          text: "考试时间倒计时从您读完本次考试须知开始计算。"
        },
        {
          text: "打开试卷后，不要按F5刷新。"
        },
        {
          text: "考试用于绩效考核，请认真考试。"
        }
      ],
      time: "",
      myTime: ""
    };
  },
  props: ["tipShow", "testId"],
  watch: {
    tipShow() {
      if (this.tipShow) {
        this.countDown();
      } else {
        clearInterval(this.myTime);
      }
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.text;
  },
  methods: {
    //倒计时
    countDown() {
      this.time = 5;
      this.myTime = setInterval(() => {
        this.time--;
        if (this.time == 0) {
          clearInterval(this.myTime);
        }
      }, 1000);
    },
    goNewList() {
      this.$parent.tipShow = false;
      var w = screen.availWidth - 15;
      var h = screen.availHeight - 62;
      // var w = screen.availWidth;
      // var h = screen.availHeight;
      window.open(
        location.origin +
          "/#/paper/" +
          this.tools.getPaperWrroyNum() +
          "/" +
          this.testId,
        "newwindow",
        "height=" +
          h +
          ", width=" +
          w +
          ", toolbar=no, menubar=no, scrollbars=yes, resizable=yes, location=no, directories=no, status=yes,left=0,top=0,right=0,bottom=0,fullscreen=yes"
      );
    }
  }
};
</script>

<style scoped lang="less">
.paperTip /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
}
.paperTip /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.paperTip-footer-Y,
.paperTip-footer-N {
  width: 80px;
  height: 30px;
  background: rgba(0, 205, 202, 1);
  border-radius: 2px;
  color: #fff;
  line-height: 30px;
  text-align: center;
  display: inline-block;
}
.paperTip-footer-Y {
  background: rgba(0, 205, 202, 1);
  cursor: pointer;
}
.paperTip-footer-N {
  background: #ebedf0;
  // color: #9b9b9b;
  color: red;
  cursor: not-allowed;
}
.textName-p {
  text-align: left;
  margin-bottom: 20px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.9);
}
</style>