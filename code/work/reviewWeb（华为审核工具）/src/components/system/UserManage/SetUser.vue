<template>
  <div class="setUser">
    <Remove event="removeEvent" />
    <el-dialog
      :title="judgeName"
      :visible.sync="judgeAddUser"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="360px"
      top="10vh"
    >
      <el-form :inline="true" :model="addList" class="demo-form-inline">
        <div class="setUserClass">
          <el-form-item>
            <span class="lableName"><span>*</span>角色名称：</span>
            <el-select
              v-model="addList.roleName"
              :disabled="forbid"
              placeholder="请选择角色"
            >
              <el-option
                v-for="(item, index) in roleList"
                :label="item.areaCode"
                :value="item.roleName"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <div style="position:release;overflow:hidden;">
            <el-form-item>
              <span class="lableName"><span>*</span>开始时间：</span>
              <el-date-picker
                v-model="addList.beginDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <div
              v-if="judgeBeginDate"
              style="position:absolute;top:168px;left:105px;color:red;font-size:12px;"
            >
              请选择开始时间
            </div>
          </div>
          <div style="position:release;overflow:hidden;">
            <el-form-item>
              <span class="lableName"><span>*</span>结束时间：</span>
              <el-date-picker
                v-model="addList.endDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <div
              v-if="judgeEndDate"
              style="position:absolute;top:220px;left:105px;color:red;font-size:12px;"
            >
              请选择结束时间
            </div>
          </div>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <div>
      <!--操作组-->
      <div class="btn-box">
        <div class="new" @click="newUser">
          <i class="fa fa-plus-circle"></i>新建
        </div>

        <div class="delete" @click="deleteUser">
          <i class="fa fa-trash-o"></i>删除
        </div>
      </div>
      <!--表格-->
      <div>
        <el-table
          :data="userData"
          border
          @select-all="checkAll"
          @select="alone"
          style="width: 100%"
          tooltip-effect="light"
          :height="tableHeight"
        >
          <el-table-column type="selection" width="55" align="center">
          </el-table-column>
          <el-table-column fixed="left" label="操作" width="85" align="left">
            <template slot-scope="scope">
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
                title="删除"
                @click="removeOne(scope.row)"
              >
                <i class="el-icon-delete deleteCol"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="roleName" label="角色名称"> </el-table-column>
          <el-table-column prop="areaCode" label="角色说明"> </el-table-column>

          <el-table-column label="开始时间" align="left" width="140">
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.beginDate)"></div>
            </template>
          </el-table-column>

          <el-table-column label="结束时间" align="left" width="140">
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.endDate)"></div>
            </template>
          </el-table-column>

          <el-table-column label="创建人">
            <template slot-scope="scope">
              <div v-text="tools.setRole(scope.row.createBy)"></div>
            </template>
          </el-table-column>

          <el-table-column label="创建时间" align="left" width="140">
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.createDate, 1)"></div>
            </template>
          </el-table-column>

          <el-table-column label="最后修改人">
            <template slot-scope="scope">
              <div v-text="tools.setRole(scope.row.lastUpdateBy)"></div>
            </template>
          </el-table-column>

          <el-table-column label="最后修改时间" align="left" width="140">
            <template slot-scope="scope">
              <div
                v-text="tools.setFormTime(scope.row.lastUpdateDate, 1)"
              ></div>
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
  </div>
</template>
<script>
import Remove from "../../common/Remove";
import { mapState, mapMutations } from "vuex";
import api from "@/api";
export default {
  name: "setUser",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      judgeBeginDate: false,
      judgeEndDate: false,
      //新建的开关
      judgeAddUser: false,
      //删除使用组
      userIdsList: [],
      //弹框名称
      judgeName: "",
      //删除的开关
      judgeRemove: false,
      //全选单选容器
      containerUser: [],
      forbid: false,
      //新建容器
      addList: {
        roleName: "admin",
        beginDate: "",
        endDate: ""
      },
      buttonName: [
        {
          name: "添加"
        },
        {
          name: "删除"
        }
      ],
      userData: [],
      roleList: []
    };
  },
  props: ["accountData"],
  computed: {
    ...mapState(["tableHeight"])
  },
  components: {
    Remove
  },
  mounted() {
    this.configData();
    this.getRole();
  },
  methods: {
    //获取权限
    getRole() {
      let vm = this;
      api
        .get(`./manage/service/role/alllist`)
        .then(function(response) {
          if (response.status == 200) {
            vm.roleList = response.data;
          }
        })
        .catch(function(error) {});
    },
    configData() {
      let data = {
        fwmAccount: this.accountData
      };
      let vm = this;
      api
        .post(
          `./manage/service/userrole/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.userData = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    edit(val) {
      this.forbid = true;
      this.judgeName = "编辑";
      this.judgeBeginDate = false;
      this.judgeEndDate = false;
      this.judgeAddUser = true;

      //赋值给表单
      this.addList.roleName = val.roleName;
      this.addList.beginDate = val.beginDate;
      this.addList.endDate = val.endDate;
    },
    removeOne(val) {
      //删除时触发开关
      this.judgeRemove = !this.judgeRemove;
      this.userIdsList = [];
      this.userIdsList.push(val);
    },
    //删除
    deleteUser() {
      if (this.containerUser.length != 0) {
        //删除时触发开关
        this.judgeRemove = !this.judgeRemove;
        this.userIdsList = this.containerUser;
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
        let obj = {};
        obj.roleName = this.userIdsList[i].roleName;
        obj.fwmAccount = this.accountData;
        arr.push(obj);
      }
      let data = arr;
      //[{ fwmAccount: "xinzhangdd", roleName: "user" }];
      api
        .post(`./manage/service/userrole/delete`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            vm.configData();
          }
        })
        .catch(function(error) {});
    },
    //全选
    checkAll(val) {
      this.containerUser = val;
    },
    //单选
    alone(val) {
      this.containerUser = val;
    },
    cancel() {
      this.judgeAddUser = false;
    },
    decideTime() {},
    confirm() {
      if (!this.addList.beginDate) {
        this.judgeBeginDate = true;
      } else {
        this.judgeBeginDate = false;
      }
      if (!this.addList.endDate) {
        this.judgeEndDate = true;
      } else {
        this.judgeEndDate = false;
      }
      if (!this.judgeBeginDate && !this.judgeEndDate) {
        if (this.addList.beginDate <= this.addList.endDate) {
          if (this.judgeName == "新建") {
            this.touchNewUser();
          } else {
            this.touchRevise();
          }
        } else {
          this.$message({
            showClose: true,
            message: "开始时间要大于结束时间",
            type: "error"
          });
        }
      }
    },
    //新建
    newUser() {
      //添加用户开关
      this.forbid = false;
      this.judgeName = "新建";
      this.judgeBeginDate = false;
      this.judgeEndDate = false;
      this.judgeAddUser = true;
      this.addList.roleName = "admin";
      this.addList.beginDate = new Date();
      this.addList.endDate = new Date().setDate(new Date().getDate() + 365);
    },
    //新建事件
    touchNewUser() {
      let data = {
        fwmAccount: this.accountData,
        roleName: this.addList.roleName,
        beginDate: this.addList.beginDate,
        endDate: this.addList.endDate
      };
      let vm = this;
      api
        .post(`./manage/service/userrole/insert`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.judgeAddUser = false;
            vm.configData();
          }
        })
        .catch(function(error) {});
    },
    //修改事件
    touchRevise() {
      let data = {
        fwmAccount: this.accountData,
        roleName: this.addList.roleName,
        beginDate: this.addList.beginDate,
        endDate: this.addList.endDate
      };
      let vm = this;
      api
        .post(`./manage/service/userrole/update`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.judgeAddUser = false;
            vm.configData();
          }
        })
        .catch(function(error) {});
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.configData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.configData();
    }
  }
};
</script>

<style scoped lang="less">
.setUserClass {
  .lableName {
    width: 76px;
    display: inline-block;
    span {
      color: red;
      font-size: 14px;
    }
  }
  .el-input {
    width: 220px;
  }
  .el-select {
    width: 220px;
  }
}
</style>
