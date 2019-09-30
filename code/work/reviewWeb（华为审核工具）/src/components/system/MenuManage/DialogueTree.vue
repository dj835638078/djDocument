<template>
  <div class="dialogueTree">
    <el-tree
      :data="permissionTree"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :render-content="renderContent"
    ></el-tree>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "dialogueTree",
  data() {
    return {
      permissionTree: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  props: ["dialogFlag", "type"],
  methods: {
    handleNodeClick(data) {
      this.$emit("listenListClick", data);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span>
          <i class={data.className} />
          <span>{node.label}</span>
        </span>
      );
    },
    //获取权限树信息
    getRoleAuthorityTree() {
      let vm = this;
      let attr = {
        id: "id",
        pId: "pId",
        rootId: 0
      };
      vm.api
        .get(`./manage/service/permission/tree`)
        .then(function(response) {
          if (response.status == 200) {
            vm.permissionTree = vm.tools.toTreeData(response.data, attr);
          }
        })
        .catch(function(error) {});
    },
    setPersonData() {
      let vm = this;
      let attr = {
        id: "id",
        label: "label",
        regioncode: "regioncode",
        parentcode: "parentcode"
      };
      let data = {};
      vm.api
        .post(`./manage/service/regionmanage/findregion`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.permissionTree = vm.tools.toTreeDataOrg(
              response.data,
              attr,
              "1"
            );
          }
        })
        .catch(function(error) {});
    }
  },
  components: {},
  computed: {},
  mounted() {
    if (this.type == 1) {
      this.getRoleAuthorityTree();
    } else {
      this.setPersonData();
    }
  },
  watch: {
    dialogFlag(newVal, oldVal) {
      if (newVal) {
        this.permissionTree = [];
        if (this.type == 1) {
          this.getRoleAuthorityTree();
        }
        if (this.type == 2) {
          this.setPersonData();
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.dialogueTree /deep/ .tree-icon-add {
  margin-right: 10px;
}
.dialogueTree /deep/ .tree-icon-yellow {
  margin-right: 6px;
  color: #f5a623;
}
.dialogueTree /deep/ .tree-icon-blue {
  margin-right: 6px;
  color: #93c6ff;
}
.dialogueTree {
  height: 360px;
  overflow: auto;
}
</style>
