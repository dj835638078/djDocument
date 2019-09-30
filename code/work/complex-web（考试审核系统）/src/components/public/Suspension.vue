<template>
  <div>
    <el-collapse-transition>
      <div class="suspension" v-show="num != 0">
        <div class="suspension-top">
          <div class="suspension-top-left">
            <img src="/static/suspension.svg" />
            <span>提示：</span>
          </div>
          <div class="suspension-top-right" @click="closeBox">
            X
          </div>
        </div>
        <div class="suspension-box">
          <div>您有新的待办事项！</div>
          <div class="goPage" @click="todoBtn">查看>></div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      num: "0",
      myTimeS: ""
    };
  },
  watch: {
    "$route.name"() {
      if (this.$route.name == "todoList" && this.$route.name != "paper") {
        this.num = 0;
        clearInterval(this.myTimeS);
      } else {
        this.getSuspension();
        this.myTimeS = setInterval(() => {
          this.getSuspension();
        }, 15000);
      }
    }
  },
  components: {},
  computed: {},
  mounted() {
    if (this.$route.name != "todoList" && this.$route.name != "paper") {
      this.getSuspension();
    }
  },
  methods: {
    todoBtn() {
      this.$router.push({
        name: "todoList"
      });
    },
    closeBox() {
      this.num = 0;
    },
    getSuspension() {
      this.api
        .get(`./complex/service/task/task/count`)
        .then(response => {
          if (response.status == 200) {
            // console.log(response.data);
            this.num = response.data;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.suspension {
  width: 170px;
  height: 120px;
  background: #fff;
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 9999;
  border: 1px solid rgba(241, 241, 241, 1);
  .suspension-top {
    width: 100%;
    height: 32px;
    background: #00cdca;
    .suspension-top-left {
      float: left;
      line-height: 32px;
      img {
        margin-left: 13px;
        margin-right: 2px;
        margin-top: -3px;
      }
      span {
        font-size: 15px;
        color: #ddd;
      }
    }
    .suspension-top-right {
      float: right;
      color: #fff;
      line-height: 32px;
      margin-right: 13px;
      cursor: pointer;
    }
  }
  .suspension-box {
    padding: 17px 13px;
    .goPage {
      margin-top: 17px;
      color: #00cdca;
      cursor: pointer;
      float: left;
    }
  }
}
</style>