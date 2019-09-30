<template>
  <div class="RoleManage">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <!--角色弹框-->
    <SetRole
      :list="roleList"
      :title="textTitle"
    />
    <div class="tabBox">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="角色列表"
          name="first"
        >
        </el-tab-pane>
        <el-tab-pane
          v-if="judgeLabel"
          label="权限设置"
          name="second"
        ></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div
      v-if="activeName == 'first'"
      class="roleBox"
    >
      <!--操作组-->
      <!--操作组-->
      <div class="btnList">
        <div
          class="new"
          @click="newUser"
        ><i class="fa fa-plus-circle"></i>新建</div>
        <div
          class="query"
          @click="query"
        ><i class="fa fa-search"></i>查询</div>
        <div
          class="delete"
          @click="deleteUser"
        ><i class="fa fa-trash-o"></i>删除</div>
      </div>
      <!--表格-->
      <div class="tableBox">
        <el-table
          :data="tableData"
          border
          ref="table"
          @selection-change="checkAll"
          style="width: 100%"
          tooltip-effect="light"
          :height="tableHeight"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="90"
            align="left"
          >
            <template slot-scope="scope">
              <div
                @click="configure(scope.row)"
                type="text"
                size="small"
              ><i class="el-icon-setting settingCol"></i></div>
              <div
                type="text"
                size="small"
                @click="edit(scope.row)"
              ><i class="el-icon-edit editCol"></i></div>
              <div
                type="text"
                size="small"
                @click="removeOne(scope.row)"
              ><i class="el-icon-delete deleteCol"></i></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="roleName"
            label="角色名称"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="areaCode"
            label="角色说明"
            :show-overflow-tooltip="true"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="roleDesc"
            label="角色描述"
            :show-overflow-tooltip="true"
            minWidth="200"
          >
          </el-table-column>
          <el-table-column
            prop="defaultUrl"
            label="默认跳转URL"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="orderId"
            label="优先级"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="创建人"
            align="left"
            width="100"
          >
            <template slot-scope="scope">
              <div v-text="tools.setRole(scope.row.createBy)"></div>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="left"
            width="150"
          >
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.createDate,1)"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="最后修改人"
            align="left"
            width="100"
          >
            <template slot-scope="scope">
              <div v-text="tools.setRole(scope.row.lastUpdateBy)"></div>
            </template>
          </el-table-column>

          <el-table-column
            label="最后修改时间"
            align="left"
            width="150"
          >
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.lastUpdateDate,1)"></div>
            </template>
          </el-table-column>
        </el-table>
        <div class="paging-box">
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totals"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="activeName == 'second'"
      class="authorityBox"
    >
      <RoleAuthority
        :roleInfoObj="toAuthority"
        :dataSystem="dataSystem"
        :dataRole="dataRole"
        @refreshTree="refreshTreeClick"
      />
    </div>

  </div>
</template>
<script>
import Remove from "../../common/Remove";
import RoleAuthority from "./RoleAuthority";
import SetRole from "./SetRole";
import { mapState, mapMutations } from "vuex";
export default {
  name: "RoleManage",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "first",
      //新建的开关
      addRole: false,
      //删除的开关
      judgeRemove: false,
      //判断哪个标签
      judgeLabel: false,
      //全选单选容器
      container: [],
      //新建编辑数据
      textTitle: "新建角色",
      //新建查询编辑
      roleList: {
        roleName: "",
        areaCode: "",
        orderId: "",
        roleDesc: "",
        defaultUrl: ""
      },
      defaultRoleList: {
        roleName: "",
        areaCode: "",
        roleDesc: "",
        orderId: "",
        defaultUrl: ""
      },
      tableData: [],
      judgeRoleName: false,
      judgeRoleInfo: false,
      roleNameList: [],
      toAuthority: {},
      dataSystem: [],
      dataRole: []
    };
  },
  mounted() {
    this.addRole = false;
    this.getRoleList();
  },
  computed: {
    ...mapState(["tableHeight"])
  },
  components: {
    Remove,
    RoleAuthority,
    SetRole
  },
  methods: {
    setRemove() {
      //删除提示/加入在方法ajax事件中
      this.$message({
        showClose: true,
        message: "删除成功",
        type: "success"
      });
    },
    //单独删除
    removeOne(val) {
      this.judgeRemove = !this.judgeRemove;
      this.roleNameList = [];
      this.roleNameList.push(val);
    },
    //标签操作
    handleClick(row) {
      if (row.label == "角色列表") {
        //this.activeName = "first";
        this.judgeLabel = false;
      }
    },
    //配置
    configure(val) {
      //打开配置页开关
      this.judgeLabel = true;
      //重置数据
      this.container = [];
      //光标对位
      this.activeName = "second";
      this.toAuthority = Object.assign({}, val);
      //获取权限树信息
      this.getRoleAuthorityTree(val.roleName);
    },
    //全选
    checkAll(val) {
      //进行赋值,判断是否选中内容
      this.container = val;
    },
    edit(val) {
      this.addRole = true;
      this.textTitle = "编辑角色";
      this.roleList.roleName = val.roleName;
      this.roleList.areaCode = val.areaCode;
      this.roleList.roleDesc = val.roleDesc;
      this.roleList.orderId = val.orderId;
      this.roleList.defaultUrl = val.defaultUrl;
      this.judgeRoleName = false;
      this.judgeRoleInfo = false;
    },
    //新建
    newUser() {
      //打开新建开关
      this.addRole = true;
      this.roleList = Object.assign({}, this.defaultRoleList);
      this.judgeRoleName = false;
      this.judgeRoleInfo = false;
      this.textTitle = "新建角色";
    },
    //新建的服务
    setNewUser() {
      let vm = this;
      vm.proof();
      //判断是否可以保存
      if (!vm.judgeRoleName && !vm.judgeRoleInfo) {
        let data = vm.roleList;
        if (!/(^[1-9]\d*$)/.test(vm.roleList.orderId)) {
          vm.$message({
            message: "优先级请输入正整数",
            type: "warning"
          });
          return;
        }
        vm.api
          .post(`./manage/service/role/insert`, data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                showClose: true,
                message: "新建成功",
                type: "success"
              });
              vm.addRole = false;
              vm.roleList = Object.assign({}, vm.defaultRoleList);
              vm.getRoleList();
            }
          })
          .catch(function(error) {});
      }
    },
    //查询
    query() {
      //打开查询开关
      this.addRole = true;
      this.roleList = Object.assign({}, this.defaultRoleList);
      this.judgeRoleName = false;
      this.judgeRoleInfo = false;
      this.textTitle = "查询角色";
    },
    //删除
    deleteUser() {
      if (this.container.length != 0) {
        this.judgeRemove = !this.judgeRemove;
        this.roleNameList = this.container;
      } else {
        this.$message({
          showClose: true,
          message: "请选择要删除的内容",
          type: "warning"
        });
      }
    },
    //删除确认事件
    removeEvent() {
      let vm = this;
      let arr = [];
      for (let i = 0; i < vm.roleNameList.length; i++) {
        arr.push({ roleName: vm.roleNameList[i].roleName });
      }
      vm.api
        .post(`./manage/service/role/delete`, arr)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            vm.getRoleList();
          }
        })
        .catch(function(error) {});
    },
    //查询角色信息
    getRoleList() {
      let vm = this;
      let data = vm.roleList;
      vm.api
        .post(
          `./manage/service/role/page?currentPage=${vm.currentPage}&pageSize=${
            vm.pageSize
          }`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            // vm.addRole = false;
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.roleList = Object.assign({}, vm.defaultRoleList);
          }
        })
        .catch(function(error) {});
    },
    // 编辑角色信息
    reviseRole() {
      let vm = this;
      vm.proof();
      if (!/(^[1-9]\d*$)/.test(vm.roleList.orderId)) {
        vm.$message({
          message: "优先级请输入正整数",
          type: "warning"
        });
        return;
      }
      //判断是否可以保存
      if (!vm.judgeRoleName && !vm.judgeRoleInfo) {
        let data = vm.roleList;
        vm.api
          .post("./manage/service/role/update", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                message: "修改成功",
                type: "success"
              });
              vm.addRole = false;
              vm.roleList = Object.assign({}, vm.defaultRoleList);
              vm.getRoleList();
            }
          })
          .catch(function(error) {});
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRoleList();
    },
    //校验信息
    proof() {
      let obj = this.roleList;
      //判断是否填写角色名称
      if (!obj.roleName) {
        this.judgeRoleName = true;
      } else {
        this.judgeRoleName = false;
      }
      //判断是否填写角色说明
      if (!obj.areaCode) {
        this.judgeRoleInfo = true;
      } else {
        this.judgeRoleInfo = false;
      }
    },
    //获取权限树信息
    getRoleAuthorityTree(val) {
      let vm = this;
      let attr = {
        id: "id",
        pId: "pId",
        // name: 'name',
        rootId: 0
      };
      vm.api
        .get(`./manage/service/role/treelist?roleName=${val}`)
        .then(function(response) {
          if (response.status == 200) {
            vm.dataSystem = vm.tools.toTreeData(response.data.treeList, attr);
            vm.dataRole = vm.tools.toTreeData(response.data.roleTreeList, attr);
          }
        })
        .catch(function(error) {});
    },
    //刷新树数据
    refreshTreeClick(data) {
      this.getRoleAuthorityTree(data);
    }
  }
};
</script>

<style scoped lang="less">
.RoleManage {
  height: calc(100% - 98px);
  .btnList {
    overflow: hidden;
    margin-left: 24px;
    // margin-bottom: 14px;
  }
  .authorityBox {
    height: 100%;
    position: relative;
  }
}
</style>
