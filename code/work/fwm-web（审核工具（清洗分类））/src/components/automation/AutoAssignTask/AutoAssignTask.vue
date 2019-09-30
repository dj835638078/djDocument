<template>
  <div class="AutoAssignTask">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <!--操作组-->
    <div class="btnList">
      <div
        class="new"
        @click="newRule"
      >新建规则</div>
      <div
        class="start"
        @click="prohibit('start')"
      ><i class="fa fa-play-circle-o"></i>启用</div>
      <div
        class="prohibit"
        @click="prohibit('prohibit')"
      ><i class="fa fa-ban"></i>禁用</div>
    </div>
    <!--查询组-->
    <div class="queryList">
      <el-form
        :inline="true"
        :model="formQuery"
        class="demo-form-inline"
      >
        <div class="formItemList">
          <span
            class="specialSpan"
            style="margin-left:24px"
          >适用范围</span>
          <el-form-item>
            <el-select
              v-model="formQuery.channelType"
              placeholder="适用范围"
              clearable
            >
              <el-option
                v-for="(item,index) in lookUp.CHANNEL_TASK_TYPE"
                :label="item.itemName"
                :value="item.itemCode"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <span class="specialSpan">规则类型</span>
          <el-form-item>
            <el-select
              v-model="formQuery.dataSource"
              placeholder="规则类型"
              multiple
              clearable
              :disabled="dataSourceFlag"
            >
              <el-option
                v-for="(item,index) in dataSourceArr"
                :label="item.sourceName"
                :value="item.dataSource"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <span class="specialSpan">账号名称</span>
          <el-form-item>
            <el-select
              v-model="formQuery.fwmAccount"
              placeholder="账号名称"
              filterable
              clearable
            >
              <el-option
                v-for="(item,index) in userArr"
                :label="item.userName"
                :value="item.fwmAccount"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <span class="specialSpan">操作人</span>
          <el-form-item>
            <el-select
              v-model="formQuery.lastUpdateBy"
              placeholder="操作人"
              filterable
              clearable
            >
              <el-option
                v-for="(item,index) in createUserArr"
                :label="item.userName"
                :value="item.fwmAccount"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item class="queryBtn">
          <div
            class="query"
            @click="researchForm"
          ><i class="fa fa-search"></i>查询</div>
          <div
            class="query"
            @click="resetForm"
          ><i class="fa fa-refresh"></i>重置</div>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <div class="tableBox">
      <el-table
        :data="tableData"
        @selection-change="checkAll"
        highlight-current-row
        border
        tooltip-effect="light"
        ref="table"
        style="width: 100%"
        :height="tableHeightTwo"
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
          width="66"
          align="left"
        >
          <template slot-scope="scope">
            <div
              type="text"
              size="small"
              title="编辑"
              @click="edit(scope.row)"
            ><i class="el-icon-edit editCol"></i></div>
            <div
              type="text"
              size="small"
              title="查看日志"
              @click="queryDaily(scope.row)"
            ><i class="fa fa-wpforms settingCol"></i></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="assignName"
          label="规则名称"
          min-width="150"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <div
              @click="lookCli(scope.row)"
              class="ruleName"
            ><i
                v-if="scope.row.assignState==1"
                class="fa fa-play-circle-o"
                style="font-size:14px;color:#67c23a;margin-right:10px;line-height:20px;"
                title="启用中"
              ></i>
              <i
                title="已禁用"
                v-if="scope.row.assignState==0"
                class="fa fa-ban"
                style="font-size:14px;color:#f56c6c;margin-right:10px;line-height:20px;"
              ></i><span style="color:#1890FF">{{scope.row.assignName}}</span></div>
          </template>
        </el-table-column>
        <el-table-column
          label="账号名称"
          min-width="100"
        >
          <template slot-scope="scope">
            <div v-text="tools.setRole(scope.row.fwmAccount)"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="channelTypeName"
          label="适用范围"
          min-width="100"
        >
          <!-- <template slot-scope="scope">
            <div v-text="tools.setChannelState(scope.row.channelType)"></div>
          </template> -->
        </el-table-column>
        <el-table-column
          prop="dataSourceName"
          label="规则类型"
          min-width="150"
          :show-overflow-tooltip="true"
        > </el-table-column>
        <el-table-column
          label="操作人"
          align="left"
          width="120"
        >
          <template slot-scope="scope">
            <div v-text="tools.setRole(scope.row.lastUpdateBy)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          align="left"
          width="160"
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
</template>
<script>
import Remove from "../../common/Remove";
import { mapState } from "vuex";
export default {
  name: "AutoAssignTask",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      totalPage: 1,
      //新建的开关
      addChannelSet: false,
      //删除的开关
      judgeRemove: false,
      //全选单选容器
      container: [],
      channelCodeFlag: false,
      //新建查询编辑
      channelList: {
        channelCode: "",
        channelName: "",
        contactsAccount: "",
        channelType: ""
      },
      defaultChannelList: {
        channelCode: "",
        channelName: "",
        contactsAccount: "",
        channelType: ""
      },
      tableData: [],
      channelCheckList: [],
      toAuthority: {},
      formQuery: {
        channelType: "",
        dataSource: [],
        fwmAccount: "",
        lastUpdateBy: ""
      },
      formQueryDefault: {
        channelType: "",
        dataSource: [],
        fwmAccount: "",
        lastUpdateBy: ""
      },
      dataSourceArr: [],
      userArr: [],
      createUserArr: [],
      dataSourceFlag: true,
      listLength: ""
    };
  },
  computed: {
    ...mapState(["lookUp", "tableHeightTwo"]),
    channelType() {
      return this.formQuery.channelType;
    }
  },
  mounted() {
    this.getUserArr();
    this.getCreateUserArr();
    this.getRuleList();
  },
  watch: {
    channelType(newVal, oldVal) {
      if (newVal) {
        let vm = this;
        vm.formQuery.dataSource = [];
        vm.dataSourceFlag = false;
        vm.api
          .get("./manage/service/channelSource/querySource/" + newVal)
          .then(function(response) {
            if (response.status == 200) {
              vm.dataSourceArr = response.data;
            }
          })
          .catch(function(error) {});
      }
    }
  },
  components: {
    Remove
  },
  methods: {
    //查询
    researchForm() {
      this.getRuleList(true);
    },
    resetForm() {
      this.formQuery = Object.assign({}, this.formQueryDefault);
      this.dataSourceFlag = true;
    },
    //全选
    checkAll(val) {
      //进行赋值,判断是否选中内容
      this.container = val;
    },
    //查看日志
    queryDaily(val) {
      this.$router.push({
        name: "AutoAssignDaily",
        params: { id: val.assignId }
      });
    },
    edit(val) {
      this.$router.push({
        name: "AutoAssignTaskRule",
        params: { name: "edit", id: val.assignId }
      });
    },
    //新建
    newRule() {
      this.$router.push({
        name: "AutoAssignTaskRule",
        params: { name: "new", id: "new" }
      });
    },
    //查看详情
    lookCli(val) {
      this.$router.push({
        name: "AutoAssignTaskRule",
        params: { name: "look", id: val.assignId }
      });
    },
    //禁用、启用
    prohibit(name) {
      let vm = this;
      if (vm.container.length != 0) {
        let assignState = "";
        let strName;
        let num = "";
        if (vm.totalPage == 1) {
          if (vm.totals == vm.container.length) {
            num = "全部";
          } else if (vm.container.length == 1) {
            num = "此条";
          } else {
            num = "这" + vm.container.length + "条";
          }
        } else {
          if (vm.pageSize == vm.container.length) {
            num = "全部";
          } else if (vm.container.length == 1) {
            num = "此条";
          } else {
            num = "这" + vm.container.length + "条";
          }
        }
        if (name == "start") {
          assignState = 1;
          strName = "确定要启用" + num + "规则";
        } else {
          assignState = 0;
          strName = "确定要禁用" + num + "规则";
        }
        if (vm.container.length == 1) {
          if (vm.container[0].assignState == 1 && name == "start") {
            vm.$message({
              showClose: true,
              message: "此条数据已启用",
              type: "warning"
            });
            return;
          }
          if (vm.container[0].assignState == 0 && name == "prohibit") {
            vm.$message({
              showClose: true,
              message: "此条数据已禁用",
              type: "warning"
            });
            return;
          }
        }
        vm.$confirm(strName, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let arr = [];
            for (let i = 0; i < vm.container.length; i++) {
              let obj = {};
              obj = Object.assign({}, vm.container[i]);
              obj.assignState = assignState;
              arr.push(obj);
            }
            vm.api
              .post(`./manage/service/automation/updateTaskState`, arr)
              .then(function(response) {
                if (response.status == 200) {
                  vm.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success"
                  });
                  vm.getRuleList();
                }
              })
              .catch(function(error) {});
          })
          .catch(() => {});
      } else {
        this.$message({
          showClose: true,
          message:
            name == "start" ? "请选择要启用的内容" : "请选择要禁用的内容",
          type: "warning"
        });
      }
    },
    //查询信息
    getRuleList(flag) {
      let vm = this;
      let data = {};
      if (flag) {
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.totals = 0;
      }
      if (vm.formQuery.channelType) {
        data.channelType = vm.formQuery.channelType;
      }
      if (vm.formQuery.dataSource.length) {
        data.dataSource = vm.formQuery.dataSource.join(",");
      }
      if (vm.formQuery.fwmAccount) {
        data.fwmAccount = vm.formQuery.fwmAccount;
      }
      if (vm.formQuery.lastUpdateBy) {
        data.lastUpdateBy = vm.formQuery.lastUpdateBy;
      }
      vm.api
        .post(
          `./manage/service/automation/query?currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.totalPage = response.data.page.totalPage;
            // vm.channelList = Object.assign({}, vm.defaultChannelList);
          }
        })
        .catch(function(error) {});
    },
    getUserArr() {
      let vm = this;
      vm.api
        .get(`./manage/service/usermanage/queryRegion`)
        .then(function(response) {
          if (response.status == 200) {
            vm.userArr = response.data;
          }
        })
        .catch(function(error) {});
    },
    getCreateUserArr() {
      let vm = this;
      vm.api
        .get(`./manage/service/usermanage/blur`)
        .then(function(response) {
          if (response.status == 200) {
            vm.createUserArr = response.data;
          }
        })
        .catch(function(error) {});
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRuleList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRuleList();
    }
  }
};
</script>

<style scoped lang="less">
.queryList /deep/ .el-form-item__label {
  width: 128px !important;
  height: 35px;
}
.formItemList /deep/.el-form-item__content {
  width: 90%;
  .el-select {
    width: 100%;
  }
}
.AutoAssignTask {
  height: calc(100% - 98px);
  display: flex;
  flex-direction: column;
  .ruleName {
    cursor: pointer;
  }
  .queryList {
    margin-top: 12px;
    // margin-left: 24px;
    .el-form {
      // flex: 1;
      display: flex;
      flex-wrap: nowrap;
      // justify-content: space-between;
      .formItemList {
        flex: 1;
        display: flex;
        justify-content: space-between;
        .specialSpan {
          flex: 0 0 72px;
          height: 35px;
          line-height: 35px;
        }
        .el-form-item {
          flex: 1;
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
          width: 100%;
        }
      }
      .queryBtn {
        flex: 0 0 156px;
      }
    }
  }
  .btnList {
    padding-left: 24px;
    margin-bottom: 10px;
    margin-top: 10px;
    border-bottom: 1px solid #e9e9e9;
  }
  .authorityBox {
    height: 100%;
    position: relative;
  }
}
</style>
