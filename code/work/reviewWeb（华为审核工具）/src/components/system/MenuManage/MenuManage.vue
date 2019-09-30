<template>
  <div class="menuManage">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <div class="content-box">
      <div class="infoHeadBtn">
        <div
          class="new"
          @click="addMenu"
          v-if="addMenu"
        ><i class="fa fa-plus-circle"></i>添加</div>

        <div
          class="new"
          @click="saveMenu"
          v-if="saveFlag"
        ><i class="fa fa-file-text-o"></i>保存</div>

        <div
          class="new"
          @click="refreshMenu"
          v-if="refreshFlag"
        ><i class="el-icon-refresh"></i>刷新</div>

        <div
          class="delete"
          @click="deleteMenu"
          v-if="deleteFlag"
        ><i class="fa fa-trash-o"></i>删除</div>

      </div>
      <div class="content-box-info">
        <menu-list
          @listenListClick="listDataClick"
          :treeData="listTreeData"
        ></menu-list>
        <menu-info :listContent="listDataObj"></menu-info>
      </div>
    </div>
  </div>
</template>

<script>
import MenuList from "./MenuList";
import MenuInfo from "./MenuInfo";
import Remove from "../../common/Remove";
export default {
  name: "menuManage",
  data() {
    return {
      listDataObj: {},
      listTreeData: [],
      formDataId: "", //点击时树节点ID
      formDatapId: "", //点击时树父节点ID
      judgeRemove: false,
      btnFlag: false,
      saveFlag: false,
      addFlag: true,
      refreshFlag: true,
      deleteFlag: false,
      controlFlag: ""
    };
  },
  methods: {
    //  添加菜单信息
    addMenu() {
      let vm = this;
      vm.addFlag = false;
      vm.deleteFlag = false;
      vm.refreshFlag = true;
      vm.saveFlag = true;
      let parentNameFlag = vm.listDataObj.menuName;
      let menuIdFlag = vm.listDataObj.menuId;
      vm.listDataObj = {};
      if (menuIdFlag) {
        vm.listDataObj.parentName = parentNameFlag;
      }
    },
    //  保存菜单信息
    saveMenu() {
      let vm = this;
      vm.saveMenuInfo(vm.formDataId);
    },
    //  刷新菜单信息
    refreshMenu() {
      let vm = this;
      vm.addFlag = true;
      vm.deleteFlag = true;
      vm.refreshFlag = true;
      vm.saveFlag = true;
      vm.getMenuTree();
      vm.listDataObj = {};
      vm.controlFlag = "";
      vm.formDataId = "";
      vm.formDatapId = "";
    },
    //  删除菜单信息
    deleteMenu() {
      let vm = this;
      if (!vm.formDataId) {
        vm.$message({
          showClose: true,
          message: "请选择要删除的内容",
          type: "warning"
        });
        return;
      }
      vm.judgeRemove = !vm.judgeRemove;
    },
    //删除菜单信息
    removeEvent() {
      let vm = this;
      vm.api
        .post("./manage/service/menu/delete", { menuId: vm.formDataId })
        .then(function(response) {
          if (response.status == 200) {
            vm.getMenuTree();
            vm.$message({
              message: "删除成功",
              type: "success"
            });
            vm.listDataObj = {};
            vm.controlFlag = "";
            vm.formDataId = "";
            vm.formDatapId = "";
          }
        })
        .catch(function(error) {});
    },
    //树节点点击事件
    listDataClick(data) {
      let vm = this;
      vm.btnFlag = !vm.btnFlag;
      vm.formDataId = data.id;
      vm.formDatapId = data.pId;
      vm.controlFlag = data.control;
      //查询单个菜单信息
      vm.getMenuInfo(data.id);
    },
    //获取菜单管理树信息
    getMenuTree() {
      let vm = this;
      let attr = {
        id: "id",
        pId: "pId",
        // name: 'name',
        rootId: 0
      };
      vm.api
        .get("./manage/service/menu/treelist")
        .then(function(response) {
          vm.listTreeData = vm.tools.toTreeData(response.data, attr);
        })
        .catch(function(error) {});
    },
    //点击树获取单条菜单信息
    getMenuInfo(id) {
      let vm = this;
      vm.api
        .post("./manage/service/menu/one", { menuId: id })
        .then(function(response) {
          if (response.status == 200) {
            let objData = Object.assign({}, response.data);
            vm.listDataObj = objData;
          }
        })
        .catch(function(error) {});
    },
    //保存菜单信息
    saveMenuInfo(parentId) {
      let vm = this;
      let objData = {};
      objData = Object.assign({}, vm.listDataObj);
      let url = "";
      let msg = "";
      if (!vm.listDataObj.menuName) {
        vm.$message({
          message: "请填写菜单名称",
          type: "warning"
        });
        return;
      }
      if (!/(^[0-9]\d*$)/.test(vm.listDataObj.orderId)) {
        vm.$message({
          message: "菜单排序请输入0或正整数",
          type: "warning"
        });
        return;
      }
      if (vm.listDataObj && vm.listDataObj.menuId) {
        url = "./manage/service/menu/update";
        msg = "修改成功";
        objData.menuId = vm.listDataObj.menuId;
      } else {
        url = "./manage/service/menu/insert";
        msg = "新增成功";
        objData.parentId = parentId || 0;
        objData.control = vm.controlFlag ? parseInt(vm.controlFlag) + 1 : 1;
      }
      vm.api
        .post(url, objData)
        .then(function(response) {
          if (response.status == 200) {
            vm.getMenuTree();
            vm.listDataObj = {};
            vm.$message({
              message: msg,
              type: "success"
            });
            vm.formDataId = "";
            vm.formDatapId = "";
            vm.controlFlag = "";
          }
        })
        .catch(function(error) {});
    }
  },
  components: {
    MenuList,
    MenuInfo,
    Remove
  },
  computed: {},
  mounted() {
    this.getMenuTree();
  },
  watch: {
    btnFlag(newVal, oldVal) {
      this.addFlag = true;
      this.refreshFlag = true;
      this.deleteFlag = true;
      this.saveFlag = true;
    }
  }
};
</script>

<style scoped lang="less">
.menuManage {
  height: calc(100% - 38px);
  padding: 14px 24px 24px 24px;
  .infoHeadBtn {
    margin-bottom: 14px;
    .el-button {
      background: #597ef7;
    }
  }
  .content-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    .content-box-info {
      height: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
