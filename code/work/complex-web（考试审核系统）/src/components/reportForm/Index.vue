<template>
  <div class="reportForm">
    <div class="imageText-top">
      <div class="imageText-top-name" style="margin-bottom:8px;">
        质检报表
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
    <div class="reportForm-content">
      <checkData v-if="activeIndex == 1" />
    </div>
    <div class="qualityDaily-content">
      <qualityDaily v-if="activeIndex == 2" />
    </div>
    <div class="qualityWeekly-content">
      <qualityWeekly v-if="activeIndex == 3" />
    </div>
    <div class="qualityMonth-content">
      <qualityMonth v-if="activeIndex == 4" />
    </div>
  </div>
</template>

<script>
import checkData from "./checkData/Index";
import qualityDaily from "./qualityDaily/Index";
import qualityWeekly from "./qualityWeekly/Index";
import qualityMonth from "./qualityMonth/Index";
export default {
  data() {
    return {
      activeIndex: "1",
      bulletinList: [
        {
          name: "质检数据",
          index: "1"
        },
        {
          name: "质检日报",
          index: "2"
        },
        {
          name: "质检周报",
          index: "3"
        },
        {
          name: "质检月报",
          index: "4"
        }
      ]
    };
  },
  components: { checkData, qualityDaily, qualityWeekly, qualityMonth },
  computed: {},
  mounted() {},
  methods: {
    handleSelect(key) {
      this.activeIndex = key;
    }
  }
};
</script>

<style scoped lang="less">
.reportForm {
  padding-bottom: 60px;
  box-sizing: border-box;
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
    height: 45px;
    border-color: #00cdca;
    line-height: 45px;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #00cdca;
  }
}
</style>