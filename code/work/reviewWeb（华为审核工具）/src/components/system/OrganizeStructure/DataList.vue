<template>
  <div class="dataList">
    <div class="ListHead">组织架构管理</div>
    <div class="ListContent">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :render-content="renderContent"
        highlight-current
      ></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataList",
  props: ["treeData"],
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      if (data.fwmAccount) {
        data.fwmAccountName = this.tools.setRole(data.fwmAccount);
      }
      this.$emit("listenListClick", data);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <i class={data.className} />
          <span>{node.label}</span>
        </span>
      );
    }
  },
  components: {},
  computed: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.ListContent /deep/ .tree-icon-yellow {
  margin-right: 6px;
  color: #f5a623;
}
.ListContent /deep/ .tree-icon-blue {
  margin-right: 6px;
  color: #93c6ff;
}
.dataList {
  background: #fff;
  box-sizing: border-box;
  border: 1px solid rgba(232, 232, 232, 1);
  width: 49%;
  height: 100%;
  overflow-y: auto;
  .ListHead {
    text-align: left;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    font-weight: 900;
    padding-left: 24px;
    background: rgba(236, 245, 255, 1);
    border-bottom: 1px solid rgba(232, 232, 232, 1);
  }
}
</style>
