<template>
  <div class="userManage">
    <el-dialog
      title="部门选择"
      :visible.sync="dialogShow"
      width="30%"
      @close="closeDialog"
    >
      <dialogue-tree
        @listenListClick="permissionDataEvent"
        :dialogFlag="dialogFlag"
        type="2"
      ></dialogue-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogShow = false">取 消</el-button>
        <el-button type="primary" @click="permissionChoose">确 定</el-button>
      </span>
    </el-dialog>
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <!--新建弹框-->
    <AddUser :list="formInline" :titleName="titleName" />
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户列表" name="first"> </el-tab-pane>
        <el-tab-pane
          v-if="judgeLabel"
          label="角色设置"
          name="second"
        ></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div v-if="activeName == 'first'">
      <!--操作组-->
      <div class="btn-box">
        <div class="new" @click="newUser">
          <i class="fa fa-plus-circle"></i>新建
        </div>
        <div class="query" @click="query"><i class="fa fa-search"></i>查询</div>
        <div class="delete" @click="deleteUser">
          <i class="fa fa-trash-o"></i>删除
        </div>
        <div class="start" @click="prohibit('start')">
          <i class="fa fa-play-circle-o"></i>启用
        </div>
        <div class="prohibit" @click="prohibit('prohibit')">
          <i class="fa fa-ban"></i>禁用
        </div>
        <div class="query" style="width:90px;" @click="download()">
          <i class="fa fa-download"></i>模板下载
        </div>

        <el-upload
          class="upload-demo"
          action="./manage/service/file/upload?fileType=public"
          :headers="myHeaders"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          multiple
        >
          <el-button size="small" type="primary"
            ><i class="fa fa-file-excel-o" style="margin-right:5px;"></i
            >导入</el-button
          >
        </el-upload>
      </div>
      <!--表格-->
      <div>
        <el-table
          :data="tableData"
          border
          @selection-change="checkAll"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          :height="tableHeight"
          tooltip-effect="light"
          ref="table"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column fixed="left" label="操作" width="111" align="left">
            <template slot-scope="scope">
              <div
                @click="configure(scope.row)"
                type="text"
                size="small"
                title="配置"
              >
                <i class="el-icon-setting settingCol"></i>
              </div>
              <div
                type="text"
                size="small"
                @click="edit(scope.row)"
                title="修改"
              >
                <i class="el-icon-edit editCol"></i>
              </div>
              <div
                type="text"
                size="small"
                @click="removeOne(scope.row)"
                title="删除"
              >
                <i class="el-icon-delete deleteCol"></i>
              </div>
              <div
                type="text"
                size="small"
                @click="clearPW(scope.row)"
                title="重置密码"
              >
                <i class="fa fa-undo deleteCol"></i>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="用户账号"
            align="left"
            width="160"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div>
                <i
                  v-if="scope.row.userState == 1"
                  class="fa fa-play-circle-o"
                  style="font-size:14px;color:#67c23a;margin-right:10px;line-height:20px;"
                  title="启用中"
                ></i>
                <i
                  title="已禁用"
                  v-if="scope.row.userState == 0"
                  class="fa fa-ban"
                  style="font-size:14px;color:#f56c6c;margin-right:10px;line-height:20px;"
                ></i
                ><span>{{ scope.row.fwmAccount }}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="userName"
            label="用户姓名"
            width="120"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="性别"
            align="left"
            width="60"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-text="setSex(scope.row.sex)"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="regionCode"
            label="部门"
            min-width="150"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-text="tools.setRegionName(scope.row.regionCode)"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="email"
            label="电子邮箱"
            width="180"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column prop="mobileCode" label="手机号码" width="122">
          </el-table-column>

          <!-- <el-table-column
            label="证件类型"
            align="left"
            width="85"
          >
            <template slot-scope="scope">
              <div v-text="tools.setPaper(scope.row.identityType)"></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="identityId"
            label="证件号码"
            width="172"
          >
          </el-table-column>
          -->

          <el-table-column label="出生日期" align="left" width="100">
            <template slot-scope="scope">
              <span v-text="tools.setFormTime(scope.row.birthDate)"></span>
            </template>
          </el-table-column>
          <el-table-column
            prop="daddress"
            label="通讯地址"
            width="250"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column label="用户状态" align="left">
            <template slot-scope="scope">
              <span v-text="setState(scope.row.userState)"></span>
            </template>
          </el-table-column>
          <!--<el-table-column
            prop="zip"
            label="创建方式"
            width="120"
          >
          </el-table-column>-->
          <el-table-column label="创建人" align="left" width="120">
            <template slot-scope="scope">
              <span v-text="tools.setRole(scope.row.createBy)"></span>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" align="left" width="160">
            <template slot-scope="scope">
              <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
            </template>
          </el-table-column>

          <el-table-column label="最后修改人" align="left" width="120">
            <template slot-scope="scope">
              <span v-text="tools.setRole(scope.row.lastUpdateBy)"></span>
            </template>
          </el-table-column>

          <el-table-column label="最后修改时间" align="left" width="160">
            <template slot-scope="scope">
              <span
                v-text="tools.setFormTime(scope.row.lastUpdateDate, 1)"
              ></span>
            </template>
          </el-table-column>
        </el-table>
      </div>

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
    <div v-if="activeName == 'second'">
      <SetUser :accountData="configName" />
    </div>
  </div>
</template>
<script>
// var token = localStorage.getItem("token");
import DialogueTree from "../MenuManage/DialogueTree";
import SetUser from "./SetUser";
import AddUser from "./AddUser";
import Remove from "../../common/Remove";
import { mapState, mapMutations } from "vuex";
import api from "@/api";
export default {
  name: "userManage",
  data() {
    return {
      // myHeaders: { Authorization: token },
      dialogShow: false,
      dialogFlag: false,
      permissionData: {},
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "first",
      //新建的开关
      judgeAddUser: false,
      titleName: "新建",
      //配置名称
      configName: "",
      //删除的开关
      judgeRemove: false,
      //判断哪个标签
      judgeLabel: false,
      //全选单选容器
      container: [],
      //判断数据
      judgeAccount: false,
      judgeUserName: false,
      judgeSex: false,
      judgeEmail: false,
      judgePerson: false,
      judgeMobileCode: false,
      userIdsList: [],
      //新建编辑数据
      formInline: {
        regionCode: "",
        fwmAccount: "",
        userName: "",
        sex: "",
        email: "",
        mobileCode: "",
        identityType: "",
        identityId: "",
        birthDate: "",
        daddress: ""
      },
      tableData: [],
      arrList: []
    };
  },
  components: {
    AddUser,
    Remove,
    SetUser,
    DialogueTree
  },
  computed: {
    ...mapState(["tableHeight"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  mounted() {
    this.judgeAddUser = false;
    this.getUserList();
    this.setPersonData();
  },
  methods: {
    ...mapMutations(["setPerson"]),
    setPersonData() {
      let vm = this;
      let data = {};
      vm.api
        .post(`./manage/service/regionmanage/findregion`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.setPerson(response.data);
          }
        })
        .catch(function(error) {});
    },
    //弹出框确定按钮
    permissionChoose() {
      if (JSON.stringify(this.permissionData) != "{}") {
        if (
          this.permissionData.children &&
          //this.permissionData.children.length > 0
          this.permissionData.regionLevel == "1"
        ) {
          this.$message({
            showClose: true,
            message: "请选择具体的子项权限",
            type: "error"
          });
          return;
        }
        this.formInline.regionCode = this.permissionData.regioncode;
        this.dialogShow = false;
      } else {
        this.$message({
          showClose: true,
          message: "请选择具体的子项权限",
          type: "error"
        });
      }
    },
    permissionDataEvent(data) {
      this.permissionData = data;
    },
    closeDialog() {
      this.dialogFlag = false;
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
    handleAvatarSuccess(res, file) {
      let vm = this;
      api
        .get(`./manage/service/usermanage/import?fId=${res[0].fId}`)
        .then(function(response) {
          vm.$message({
            showClose: true,
            message: "导入成功",
            type: "success"
          });
        })
        .catch(function(error) {});
    },
    handleAvatarError(err, file, fileList) {
      this.$message.error(JSON.parse(err.message).message);
    },
    //摸板下载
    download() {
      location.href =
        location.origin + "/manage/publicservice/usermanage/template";
    },
    //重置密码
    clearPW(val) {
      this.$confirm("此操作将重置用户密码, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let data = {
            fwmAccount: val.fwmAccount
          };
          let vm = this;
          api
            .post(`./manage/service/usermanage/resetPwd`, data)
            .then(function(response) {
              vm.$message({
                type: "success",
                message: "重置密码成功!"
              });
            })
            .catch(function(error) {});
        })
        .catch(() => {});
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.userState == 0) {
        return "warning-row";
      }
      return "";
    },
    getUserList() {
      let data = this.formInline;
      let vm = this;
      api
        .post(
          `./manage/service/usermanage/finduserPage?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.judgeAddUser = false;
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    //标签操作
    handleClick(row) {
      if (row.label == "用户列表") {
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
      this.configName = val.fwmAccount;
    },
    //全选
    checkAll(val) {
      //进行赋值,判断是否选中内容
      this.container = val;
    },
    edit(val) {
      //tools.setRegionName(list.regionCode)
      this.titleName = "编辑";
      this.result();
      this.judgeAddUser = true;
      this.formInline.fwmAccount = val.fwmAccount;
      this.formInline.userName = val.userName;
      this.formInline.sex = val.sex;
      this.formInline.email = val.email;
      this.formInline.mobileCode = val.mobileCode;
      this.formInline.identityType = val.identityType;
      this.formInline.identityId = val.identityId;
      this.formInline.birthDate = val.birthDate;
      this.formInline.daddress = val.daddress;
      this.formInline.regionCode = val.regionCode;
    },
    //重置
    result() {
      this.judgeAccount = false;
      this.judgeUserName = false;
      this.judgeSex = false;
      this.judgeEmail = false;
      this.judgeMobileCode = false;
      this.formInline.fwmAccount = "";
      this.formInline.userName = "";
      this.formInline.sex = "";
      this.formInline.email = "";
      this.formInline.mobileCode = "";
      this.formInline.identityType = "";
      this.formInline.identityId = "";
      this.formInline.birthDate = "";
      this.formInline.daddress = "";
      this.formInline.regionCode = "";
      this.currentPage = 1;
      this.pageSize = 10;
    },
    //新建
    newUser() {
      this.titleName = "新建";
      this.result();
      this.judgeAddUser = true;
    },
    //新建的服务
    setNewUser() {
      this.proof();
      //判断是否可以保存
      if (
        !this.judgeUserName &&
        !this.judgeSex &&
        !this.judgeMobileCode &&
        !this.judgeEmail
      ) {
        let data = this.formInline;
        let vm = this;
        api
          .post(`./manage/service/usermanage/insert`, data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                showClose: true,
                message: "新建成功",
                type: "success"
              });

              vm.judgeAddUser = false;
              vm.result();
              vm.getUserList();
            }
          })
          .catch(function(error) {});
      }
    },
    //查询
    query() {
      this.titleName = "查询";
      this.result();
      this.judgeAddUser = true;
    },
    //校验信息
    proof() {
      let obj = this.formInline;
      //判断是否填电子邮箱
      if (!obj.email) {
        this.judgeEmail = true;
      } else {
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(obj.email)) {
          this.judgeEmail = true;
        } else {
          this.judgeEmail = false;
        }
      }
      //判断是否填手机号码
      if (!obj.mobileCode) {
        this.judgeMobileCode = true;
      } else {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(obj.mobileCode)) {
          this.judgeMobileCode = true;
        } else {
          this.judgeMobileCode = false;
        }
      }
      //判断是否填性别
      if (!obj.sex) {
        this.judgeSex = true;
      } else {
        this.judgeSex = false;
      }
      //判断是否填写用户姓名
      if (!obj.userName) {
        this.judgeUserName = true;
      } else {
        this.judgeUserName = false;
      }
      if (!obj.fwmAccount) {
        this.judgeAccount = true;
      } else {
        this.judgeAccount = false;
      }
      if (!obj.regionCode) {
        this.judgePerson = true;
      } else {
        this.judgePerson = false;
      }
    },
    //修改个人信息
    reviseUser() {
      this.proof();
      //判断是否可以修改
      if (
        !this.judgeUserName &&
        !this.judgeSex &&
        !this.judgeMobileCode &&
        !this.judgeEmail &&
        !this.judgePerson
      ) {
        let data = this.formInline;
        let vm = this;
        api
          .post("./manage/service/usermanage/update", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                message: "修改成功",
                type: "success"
              });
              vm.judgeAddUser = false;
              vm.result();
              vm.getUserList();
            }
          })
          .catch(function(error) {});
      }
    },
    //单独删除
    removeOne(val) {
      this.judgeRemove = !this.judgeRemove;
      this.userIdsList = [];
      this.userIdsList.push(val);
    },
    //多选删除
    deleteUser() {
      if (this.container.length != 0) {
        this.judgeRemove = !this.judgeRemove;
        this.userIdsList = this.container;
      } else {
        this.$message({
          showClose: true,
          message: "请选择要删除的内容",
          type: "warning"
        });
      }
    },
    removeEvent() {
      let vm = this;
      let arr = [];
      for (let i = 0; i < this.userIdsList.length; i++) {
        arr.push(this.userIdsList[i].fwmAccount);
      }
      let data = {
        userIds: arr.join(",")
      };
      api
        .post(`./manage/service/usermanage/delete`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            vm.result();
            vm.getUserList();
          }
        })
        .catch(function(error) {});
    },
    //禁用
    prohibit(name) {
      if (this.container.length != 0) {
        let status = "";
        let strName;
        if (name == "start") {
          status = 1;
          strName = "此操作会启用操作账号, 是否继续?";
        } else {
          status = 0;
          strName = "此操作会禁用操作账号, 是否继续?";
        }
        this.$confirm(strName, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let vm = this;
            let arr = [];
            for (let i = 0; i < this.container.length; i++) {
              arr.push(this.container[i].fwmAccount);
            }

            let data = {
              userState: status,
              userIds: arr.join(",")
            };
            api
              .post(`./manage/service/usermanage/updatestate`, data)
              .then(function(response) {
                if (response.status == 200) {
                  vm.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success"
                  });
                  vm.getUserList();
                }
              })
              .catch(function(error) {});
          })
          .catch(() => {});
      } else {
        this.$message({
          showClose: true,
          message: "请选择内容",
          type: "warning"
        });
      }
    },
    //启用
    start() {
      //判断是否有数据
      if (this.container.length != 0) {
        alert(this.container);
      } else {
        this.$message({
          showClose: true,
          message: "请选择要启用的内容",
          type: "warning"
        });
      }
    },
    setSex(val) {
      if (val == "F") {
        return "女";
      }
      if (val == "M") {
        return "男";
      }
    },
    setState(val) {
      if (val == 0) {
        return "禁用";
      }
      if (val == 1) {
        return "启用";
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUserList();
    }
  }
};
</script>

<style scoped lang="less">
.userManage {
  .upload-demo/deep/ .el-upload-list {
    display: none !important;
  }
  .upload-demo/deep/ .el-button {
    width: 72px;
    height: 28px;
    line-height: 8px;
    background: #597ef7;
    padding: 6px 15px;
    font-size: 14px;
    border-radius: 2px;
    border: none;
  }
}
.el-table/deep/ .warning-row {
  background: #f1f1f1;
}
</style>
