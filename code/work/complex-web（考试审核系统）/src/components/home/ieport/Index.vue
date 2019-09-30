<template>
  <div class="videoReportForm">
    <div class="imageText-top">
      <div class="imageText-top-name" style="margin-bottom:1px;">
        导入导出
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
      <importList v-if="activeIndex == 1" />
    </div>
    <div class="videoReportForm-content">
      <exportList v-if="activeIndex == 2" />
    </div>
  </div>
</template>

<script>
import importList from "./import/ImportList";
import exportList from "./export/ExportList";
export default {
  data() {
    return {
      activeIndex: "1",
      bulletinList: [
        {
          name: "我的导入",
          index: "1"
        },
        {
          name: "我的导出",
          index: "2"
        }
      ]
    };
  },
  components: { importList, exportList },
  computed: {},
  mounted() {
    // if(){}
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