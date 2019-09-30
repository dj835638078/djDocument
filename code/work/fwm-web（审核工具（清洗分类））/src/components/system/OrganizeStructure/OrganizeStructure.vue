<template>
  <div class="dataDictionary">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <div class="content-box">
      <div class="infoHeadBtn">
        <div
          class="new"
          @click="addData"
          v-if="addFlag"
        ><i class="fa fa-plus-circle"></i>添加</div>

        <div
          class="new"
          @click="saveData"
          v-if="saveFlag"
        ><i class="fa fa-file-text-o"></i>保存</div>

        <div
          class="new"
          @click="refreshData"
          v-if="refreshFlag"
        ><i class="el-icon-refresh"></i>刷新</div>

        <div
          class="delete"
          @click="deleteData"
          v-if="deleteFlag"
        ><i class="fa fa-trash-o"></i>删除</div>

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
      deleteFlag: false
    };
  },
  methods: {
    //  添加数据字典信息
    addData() {
      let vm = this;
      if (!vm.formDatapId) {
        vm.$message({
          message: "不能添加一级区域",
          type: "warning"
        });
        return;
      }
      vm.addFlag = false;
      vm.deleteFlag = false;
      vm.refreshFlag = true;
      vm.saveFlag = true;
      vm.nameFlagVal = false;
      let parentNameFlag = this.listDataObj.regioncode;
      vm.listDataObj = {};
      vm.listDataObj.parentcode = parentNameFlag;
    },
    //  保存数据字典信息
    saveData() {
      let vm = this;
      vm.saveDataInfo(vm.formDatapId);
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
      vm.formDataId = data.regioncode;
      vm.nameFlagVal = true;
      vm.formDatapId = data.parentcode;
      //查询单个菜单信息
      // vm.getDataInfo(data.id);
      let objData = Object.assign({}, data);
      vm.listDataObj = objData;
    },
    //获取数据字典树信息
    getDataTree() {
      let vm = this;
      let attr = {
        id: "id",
        label: "label",
        regioncode: "regioncode",
        parentcode: "parentcode"
      };
      vm.api
        .post("./manage/service/regionmanage/findregion", {})
        .then(function(response) {
          vm.listTreeData = vm.tools.toTreeDataOrg(response.data, attr);
        })
        .catch(function(error) {});
    },
    //点击树获取单条数据字典信息
    // getDataInfo(id) {
    //   let vm = this;
    //   vm.api
    //     .get("./manage/service/property/find/" + id)
    //     .then(function(response) {
    //       if (response.status == 200) {
    //         let objData = Object.assign({}, response.data);
    //         vm.listDataObj = objData;
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
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
        .post("./manage/service/regionmanage/delete", {
          regioncode: vm.formDataId
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
          }
        })
        .catch(function(error) {});
    },
    //保存数据字典信息
    saveDataInfo(parentcode) {
      let vm = this;
      let objData = {};
      objData = Object.assign({}, vm.listDataObj);
      let url = "";
      let msg = "";
      if (
        !vm.listDataObj.regioncode ||
        !vm.listDataObj.regionName ||
        !vm.listDataObj.fwmAccount
      ) {
        vm.$message({
          message: "请填写必填信息",
          type: "warning"
        });
        return;
      }
      if (vm.listDataObj && vm.listDataObj.regionLevel) {
        url = "./manage/service/regionmanage/update";
        msg = "修改成功";
        // objData.parentPath = vm.listDataObj.parentPath || "root";
      } else {
        url = "./manage/service/regionmanage/insert";
        msg = "新增成功";
        // objData.parentcode = parentcode || "";
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
