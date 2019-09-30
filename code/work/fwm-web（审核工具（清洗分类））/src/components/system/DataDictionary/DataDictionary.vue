<template>
  <div class="dataDictionary">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <div class="content-box">
      <div class="infoHeadBtn">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addData"
          v-if="addFlag"
        >添加</el-button>
        <el-button
          type="primary"
          icon="el-icon-document"
          @click="saveData"
          v-if="saveFlag"
        >保存</el-button>
        <el-button
          type="primary"
          icon="el-icon-refresh"
          @click="refreshData"
          v-if="refreshFlag"
        >刷新</el-button>
        <el-button
          type="primary"
          icon="el-icon-delete"
          @click="deleteData"
          v-if="deleteFlag"
        >删除</el-button>
      </div>
      <div class="content-box-info">
        <data-list
          @listenListClick="listDataClick"
          :treeData="listTreeData"
        ></data-list>
        <data-info
          :listContent="listDataObj"
          :nameFlag="nameFlagVal"
        ></data-info>
      </div>
    </div>
  </div>
</template>

<script>
import DataList from "./DataList";
import DataInfo from "./DataInfo";
import Remove from "../../common/Remove";
export default {
  name: "dataDictionary",
  data() {
    return {
      listDataObj: {},
      listTreeData: [],
      formDataId: "", //点击时树节点ID
      formDatapId: "", //点击时树父节点ID
      judgeRemove: false,
      nameFlagVal: true,
      btnFlag: false,
      saveFlag: false,
      addFlag: true,
      refreshFlag: true,
      deleteFlag: false,
      currentName: ""
    };
  },
  methods: {
    //  添加数据字典信息
    addData() {
      let vm = this;
      vm.addFlag = false;
      vm.deleteFlag = false;
      vm.refreshFlag = true;
      vm.saveFlag = true;
      vm.nameFlagVal = false;
      let parentNameFlag = "";
      if (vm.currentName && vm.listDataObj.parentPath) {
        parentNameFlag = vm.listDataObj.parentPath + "." + vm.currentName;
      } else if (vm.currentName && !vm.listDataObj.parentPath) {
        parentNameFlag = vm.currentName;
      } else {
        parentNameFlag = "";
      }
      vm.listDataObj = {};
      vm.listDataObj.parentPath = parentNameFlag;
    },
    //  保存数据字典信息
    saveData() {
      let vm = this;
      vm.saveDataInfo(vm.formDataId);
    },
    //  刷新数据字典信息
    refreshData() {
      let vm = this;
      vm.addFlag = true;
      vm.deleteFlag = true;
      vm.refreshFlag = true;
      vm.saveFlag = true;
      vm.getDataTree();
      vm.listDataObj = {};
      vm.formDataId = "";
      vm.formDatapId = "";
      vm.currentName = "";
    },
    //  删除数据字典信息
    deleteData() {
      let vm = this;
      vm.deleteDataInfo();
    },
    //树节点点击事件
    listDataClick(data) {
      let vm = this;
      vm.btnFlag = !vm.btnFlag;
      vm.formDataId = data.id;
      vm.nameFlagVal = true;
      vm.formDatapId = data.pId;
      vm.currentName = data.name;
      //查询单个菜单信息
      vm.getDataInfo(data.id);
    },
    //获取数据字典树信息
    getDataTree() {
      let vm = this;
      let attr = {
        id: "id",
        pId: "pId",
        // name: 'name',
        rootId: 0
      };
      vm.api
        .get("./manage/service/property/treelist")
        .then(function(response) {
          vm.listTreeData = vm.tools.toTreeData(response.data, attr);
        })
        .catch(function(error) {});
    },
    //点击树获取单条数据字典信息
    getDataInfo(id) {
      let vm = this;
      vm.api
        .get("./manage/service/property/find/" + id)
        .then(function(response) {
          if (response.status == 200) {
            let objData = Object.assign({}, response.data);
            vm.listDataObj = objData;
          }
        })
        .catch(function(error) {});
    },
    //删除数据字典信息
    deleteDataInfo() {
      let vm = this;
      if (!vm.formDataId) {
        vm.$message({
          message: "请选择要删除的内容",
          type: "warning"
        });
        return;
      }
      vm.judgeRemove = !vm.judgeRemove;
    },
    removeEvent(id) {
      let vm = this;
      vm.api
        .post("./manage/service/property/delete", {
          propertyId: vm.formDataId
        })
        .then(function(response) {
          if (response.status == 200) {
            vm.getDataTree();
            vm.listDataObj = {};
            vm.$message({
              message: "删除成功",
              type: "success"
            });
            vm.formDataId = "";
            vm.formDatapId = "";
            vm.currentName = "";
          }
        })
        .catch(function(error) {});
    },
    //保存数据字典信息
    saveDataInfo(parentId) {
      let vm = this;
      let objData = {};
      objData = Object.assign({}, vm.listDataObj);
      let url = "";
      let msg = "";
      if (!vm.listDataObj.name) {
        vm.$message({
          message: "请填写字典名称",
          type: "warning"
        });
        return;
      }
      if (vm.listDataObj && vm.listDataObj.propertyId) {
        url = "./manage/service/property/update";
        msg = "修改成功";
        objData.parentPath = vm.listDataObj.parentPath || "root";
      } else {
        url = "./manage/service/property/insert";
        msg = "新增成功";
        objData.parentId = parentId || 0;
      }
      vm.api
        .post(url, objData)
        .then(function(response) {
          if (response.status == 200) {
            vm.getDataTree();
            vm.listDataObj = {};
            vm.$message({
              message: msg,
              type: "success"
            });
            vm.formDataId = "";
            vm.formDatapId = "";
            vm.currentName = "";
          }
        })
        .catch(function(error) {});
    }
  },
  components: {
    DataList,
    DataInfo,
    Remove
  },
  computed: {},
  mounted() {
    this.getDataTree();
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
.dataDictionary {
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
