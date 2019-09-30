<template>
  <div class="homeBox">
    <!--承载轮播图和新员工注册待审批-->
    <div class="prompt-top">
      <!--管理员可以看到-->
      <Approver
        v-if="tools.setRight('approval')"
      />
      <Carousel />
    </div>
    <div
      class="todoBtnBox"
      v-if="tools.setRight('todo')"
    >
      <img class="todoBtn" src="../../assets/img/todoBtn.svg" @click="todoBtn"></img>
    </div>
    <div style="margin-top:281px;">
      <div style="width:900px;float:left;">
        <Content />
      </div>
      <!-- <div
        style="width:253px;float:right;background:rgba(0,205,202,0.4);height:100%;padding-bottom:10000px;margin-bottom:-10000px;line-height:400px;text-align:center;color:#fff"
      > -->
      <!-- <Content /> -->
      <!-- 开发中~
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Carousel from "./Carousel";
import Approver from "./Approver";
import Content from "./Content";
export default {
  data() {
    return {};
  },
  components: {
    Carousel,
    Approver,
    Content
  },
  computed: { ...mapState(["userInfo"]) },
  mounted() {},
  methods: {
    todoBtn() {
      this.$router.push({
        name: "todoList"
      });
    }
  }
};
</script>

<style scoped lang="less">
.homeBox {
  overflow: hidden;
  .prompt-top {
    position: absolute;
    left: 0;
    top: 50px;
    right: 0px;
  }
  .todoBtnBox {
    width: 1200px;
    height: 40px;
    position: absolute;
    top: 340px;
  }
  .todoBtn {
    width: 253px;
    height: 100%;
    float: right;
    cursor: pointer;
  }
}
</style>