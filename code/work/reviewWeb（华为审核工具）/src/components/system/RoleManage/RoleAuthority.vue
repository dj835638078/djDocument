<template>
  <div class="roleAuthority">
    <div class="roleSet">
      <!--操作组-->
      <div class="roleSetItem">

        <div
          v-for="(item,index) in buttonName"
          :key="index"
          @click="touchLabel(item)"
          :class="item.className"
        ><i :class="item.icon"></i>{{item.name}}</div>

      </div>
      <div class="roleSetItem">
        <span>角色名称：</span>
        <el-input
          v-model="roleInfoObj.roleName"
          :disabled="true"
        ></el-input>

      </div>
      <div class="roleSetItem">
        <span>角色说明：</span>
        <el-input
          v-model="roleInfoObj.areaCode"
          :disabled="true"
        ></el-input>

      </div>
    </div>
    <div class="contentBox">
      <div class="system">
        <div class="systemHead">系统权限点</div>
        <div class="systemContent">
          <el-tree
            :data="dataSystem"
            show-checkbox
            node-key="id"
            ref="treeSystem"
            :default-checked-keys="dataSystem && dataSystem.checkedFlag"
            :props="defaultProps"
            @node-click="handleNodeClickSys"
            @check-change="handleCheckChangeSys"
            @click="getCheckedNodesSys"
          >
          </el-tree>
        </div>
      </div>
      <div class="role">
        <div class="roleHead">角色权限点</div>
        <div class="roleContent">
          <el-tree
            :data="dataRole"
            :props="defaultProps"
            ref="treeRole"
            default-expand-all
          ></el-tree>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "roleAuthority",
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      checkedDataSys: [],
      buttonName: [
        {
          name: "刷新",
          type: "fa fa-refresh",
          icon: "el-icon-refresh",
          className: "new"
        },
        {
          name: "保存",
          type: "primary",
          icon: "fa fa-file-text-o",
          className: "new"
        },
        {
          name: "清理",
          type: "danger",
          icon: "fa fa-trash-o",
          className: "delete"
        }
      ]
    };
  },
  props: ["roleInfoObj", "dataSystem", "dataRole"],
  methods: {
    //标签触发
    touchLabel(val) {
      if (val.name == "刷新") {
        this.$emit("refreshTree", this.roleInfoObj.roleName);
      }
      if (val.name == "保存") {
        let vm = this;
        if (vm.checkedDataSys.length) {
          let data = vm.checkedDataSys;
          let obj = {};
          obj.roleTreeList = vm.checkedDataSys;
          obj.roleName = vm.roleInfoObj.roleName;
          vm.api
            .post(`./manage/service/role/savetree`, obj)
            .then(function(response) {
              if (response.status == 200) {
                vm.$message({
                  showClose: true,
                  message: "保存成功",
                  type: "success"
                });
                vm.$emit("refreshTree", vm.roleInfoObj.roleName);
              }
            })
            .catch(function(error) {});
        } else {
          vm.$message.warning("请选择要保存的数据!");
        }
      }
      if (val.name == "清理") {
        let vm = this;
        vm.api
          .post(`./manage/service/role/delelefalse`, {
            roleName: vm.roleInfoObj.roleName
          })
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                showClose: true,
                message: "清理成功",
                type: "success"
              });
              vm.$emit("refreshTree", vm.roleInfoObj.roleName);
            }
          })
          .catch(function(error) {});
      }
    },
    getCheckedNodesSys() {
      this.checkedDataSys = this.$refs.treeSystem.getCheckedNodes();
    },
    handleCheckChangeSys(data, checked, indeterminate) {
      let vm = this;
      vm.getCheckedNodesSys();
    },
    handleNodeClickSys(data) {}
  },
  components: {},
  computed: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.roleAuthority {
  height: 100%;
  .roleSet {
    display: flex;
    // padding-bottom: 10px;
    margin-left: 24px;
    .roleSetItem {
      display: flex;
      margin-right: 20px;
      span {
        width: 100px;
        line-height: 32px;
      }
    }
  }
  .contentBox {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 14px 24px 14px 24px;
  }
  .system {
    border: 1px solid rgba(232, 232, 232, 1);
    width: 49%;
    height: 100%;
    overflow-y: auto;
    .systemHead {
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      font-weight: 900;
      padding-left: 10px;
      background: #ecf5ff;
      border-bottom: 1px solid #e8e8e8;
    }
  }
  .role {
    background: #fff;
    border: 1px solid rgba(232, 232, 232, 1);
    width: 49%;
    height: 100%;
    overflow-y: auto;
    .roleHead {
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      font-weight: 900;
      padding-left: 10px;
      background: #fff;
      border-bottom: 1px solid #e8e8e8;
    }
  }
}
</style>
