<template>
  <div class="videoReportForm">
    <div class="imageText-top">
      <div class="imageText-top-name" style="margin-bottom:1px;">
        请假换班
      </div>
    </div>
    <div class="home-content-nav">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          :index="item.index"
          style="margin-right:40px;"
          v-for="(item, index) in bulletinList"
          :key="index"
          >{{ item.name }}</el-menu-item
        >
      </el-menu>
    </div>
    <div class="clear"></div>
    <div class="videoReportForm-content">
      <myShift v-if="activeIndex == 1" />
    </div>
    <div class="videoReportForm-content">
      <shiftChange v-if="activeIndex == 2" />
    </div>
  </div>
</template>

<script>
import myShift from "./myShift/Index";
import shiftChange from "./shiftChange/Index";
export default {
  data() {
    return {
      activeIndex: "1",
      bulletinList: [
        {
          name: "个人班表",
          index: "1"
        },
        {
          name: "请假换班",
          index: "2"
        }
      ]
    };
  },
  components: { myShift, shiftChange },
  computed: {},
  mounted() {
    if (this.$route.params.type == "1") {
      this.activeIndex = "2";
    }
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
    }
  }
};
</script>

<style scoped lang="less">
.videoReportForm {
  .home-content-nav {
    height: 48px;
    width: 100%;
  }
  .el-menu-item {
    color: rgba(42, 42, 42, 0.85);
    font-size: 16px;
    padding: 0px;
    font-weight: 600;
    font-family: PingFangSC-Semibold;
  }
  .el-menu--horizontal > .el-menu-item {
    height: 50px;
    border-color: #00cdca;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #00cdca;
  }
}
</style>