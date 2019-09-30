<template>
  <div class="TreeIcon">
    <el-tree
      :data="listData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :render-content="renderContent"
    ></el-tree>
  </div>
</template>

<script>
export default {
  name: "TreeIcon",
  data() {
    return {
      listData: [
        {
          label: "一级 1",
          className: "fa fa-folder-open-o tree-icon-yellow",
          children: [
            {
              label: "二级 1-1",
              className: "fa fa-folder-open-o tree-icon-yellow",
              children: [
                {
                  label: "三级 1-1-1",
                  className: "fa fa-file-text-o tree-icon-blue"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    handleNodeClick(data) {
      this.$emit("listenListClick", data);
    },
    //添加树图标
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
.TreeIcon /deep/ .tree-icon-yellow {
  margin-right: 6px;
  color: #f5a623;
}
.TreeIcon /deep/ .tree-icon-blue {
  margin-right: 6px;
  color: #93c6ff;
}
</style>