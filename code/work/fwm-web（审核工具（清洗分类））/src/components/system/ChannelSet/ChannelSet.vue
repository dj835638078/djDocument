<template>
  <div class="ChannelManage">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <!--角色弹框-->
    <ChannelAdd
      :list="channelList"
      :title="textTitle"
    />
    <!-- <div class="tabBox">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="渠道管理"
          name="first"
        >
        </el-tab-pane>
        <el-tab-pane
          v-if="judgeLabel"
          label="任务来源"
          name="second"
        ></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div> -->
    <!--查询组-->
    <div class="queryList">
      <el-form
        :inline="true"
        :model="formQuery"
        class="demo-form-inline"
      >
        <el-form-item label="渠道编号">
          <el-input
            v-model="formQuery.channelCode"
            placeholder="渠道编号"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道名称">
          <el-input
            v-model="formQuery.channelName"
            placeholder="渠道名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道状态">
          <el-select
            v-model="formQuery.channelState"
            placeholder="渠道状态"
          >
            <el-option
              v-for="(item,index) in lookUp.FWM_FLOW_STATUS"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
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
    <!--操作组-->
    <div class="btnList">
      <div
        class="new"
        @click="newChannel"
      ><i class="fa fa-plus-circle"></i>新建</div>
      <div
        class="delete"
        @click="deleteChannel"
      ><i class="fa fa-trash-o"></i>删除</div>
      <div
        class="start"
        @click="prohibit('start')"
      ><i class="fa fa-play-circle-o"></i>启用</div>
      <div
        class="prohibit"
        @click="prohibit('prohibit')"
      ><i class="fa fa-ban"></i>禁用</div>
    </div>
    <!--表格-->
    <div class="tableBox">
      <el-table
        :data="tableData"
        @selection-change="checkAll"
        highlight-current-row
        border
        ref="table"
        tooltip-effect="light"
        style="width: 100%"
        height="200"
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
            ><i class="el-icon-search settingCol"></i></div>
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
          prop="channelCode"
          label="渠道编号"
        >
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="渠道名称"
          min-width="100"
        > </el-table-column>
        <el-table-column label="任务类型">
          <template slot-scope="scope">
            <div v-text="tools.setChannelType(scope.row.channelType)"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="contactsAccount"
          label="联系人账号"
          min-width="90"
        >
        </el-table-column>
        <el-table-column label="渠道状态">
          <template slot-scope="scope">
            <div v-text="tools.setChannelState(scope.row.channelState)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建人"
          align="left"
          width="120"
        >
          <template slot-scope="scope">
            <div v-text="tools.setRole(scope.row.createBy)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="创建时间"
          align="left"
          width="160"
        >
          <template slot-scope="scope">
            <div v-text="tools.setFormTime(scope.row.createDate,1)"></div>
          </template>
        </el-table-column>

        <el-table-column
          label="最后修改人"
          align="left"
          width="120"
        >
          <template slot-scope="scope">
            <div v-text="tools.setRole(scope.row.lastUpdateBy)"></div>
          </template>
        </el-table-column>

        <el-table-column
          label="最后修改时间"
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
    <div v-if="showPage">
      <ChannelAsign
        :roleInfoObj="toAuthority"
        :channelCodeVal="channelCodeVal"
      />
    </div>
  </div>
</template>
<script>
import Remove from "../../common/Remove";
import ChannelAdd from "./ChannelAdd";
import ChannelInfo from "./ChannelInfo";
import ChannelAsign from "./ChannelAsign";
import { mapState } from "vuex";
export default {
  name: "ChannelManage",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "first",
      //新建的开关
      addChannelSet: false,
      //删除的开关
      judgeRemove: false,
      //判断哪个标签
      judgeLabel: false,
      //全选单选容器
      container: [],
      //新建编辑数据
      textTitle: "新建渠道",
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
        channelCode: "",
        channelName: "",
        channelState: ""
      },
      formQueryDefault: {
        channelCode: "",
        channelName: "",
        channelState: ""
      },
      judgeChannelCode: false,
      judgeChannelName: false,
      judgeContactsAccount: false,
      judgeChannelType: false,
      channelCodeVal: "",
      showPage: false,
      tableHeightFlag: 200
    };
  },
  computed: {
    ...mapState(["lookUp", "tableHeightTwoHalf", "tableHeightTwo"])
  },
  mounted() {
    this.getChannelList();
    this.channelCodeVal = "";

    this.$nextTick(() => {
      this.tableHeightFlag = this.tableHeightTwo;
    });
    this.showPage = false;
  },
  watch: {
    tableHeightTwoHalf() {
      if (this.showPage) {
        this.tableHeightFlag = this.tableHeightTwoHalf;
      } else {
        this.tableHeightFlag = this.tableHeightTwo;
      }
    }
  },
  components: {
    Remove,
    ChannelAdd,
    ChannelInfo,
    ChannelAsign
  },
  methods: {
    //查询
    researchForm() {
      this.getChannelList(true);
    },
    resetForm() {
      this.formQuery = Object.assign({}, this.formQueryDefault);
    },
    //全选
    checkAll(val) {
      //进行赋值,判断是否选中内容
      this.container = val;
    },
    //单独删除
    removeOne(val) {
      this.judgeRemove = !this.judgeRemove;
      this.channelCheckList = [];
      this.channelCheckList.push(val);
    },
    deleteChannel() {
      if (this.container.length != 0) {
        this.judgeRemove = !this.judgeRemove;
        this.channelCheckList = this.container;
      } else {
        this.$message({
          showClose: true,
          message: "请选择要删除的内容",
          type: "warning"
        });
      }
    },
    //标签操作
    handleClick(row) {
      if (row.label == "渠道管理") {
        //this.activeName = "first";
        this.judgeLabel = false;
      }
    },
    //配置
    configure(val) {
      this.channelCodeVal = val.channelCode;
      this.showPage = true;
      this.tableHeightFlag = this.tableHeightTwoHalf;
    },
    edit(val) {
      let vm = this;
      vm.addChannelSet = true;
      vm.textTitle = "编辑渠道";
      vm.channelList = Object.assign({}, val);
      vm.channelCodeFlag = true;
      vm.judgeChannelCode = false;
      vm.judgeChannelName = false;
      vm.judgeContactsAccount = false;
      vm.judgeChannelType = false;
    },
    //新建
    newChannel() {
      //打开新建开关
      let vm = this;
      vm.addChannelSet = true;
      vm.channelList = Object.assign({}, vm.defaultChannelList);
      vm.judgeChannelCode = false;
      vm.judgeChannelName = false;
      vm.judgeContactsAccount = false;
      vm.judgeChannelType = false;
      vm.textTitle = "新建渠道";
      vm.channelCodeFlag = false;
    },
    //新建的服务
    setNewChannel() {
      let vm = this;
      vm.proof();
      //判断是否可以保存
      if (
        !vm.judgeChannelCode &&
        !vm.judgeChannelName &&
        !vm.judgeContactsAccount &&
        !vm.judgeChannelType
      ) {
        let data = vm.channelList;
        vm.api
          .post(`./manage/service/channel/insert`, data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                showClose: true,
                message: "新建成功",
                type: "success"
              });
              vm.addChannelSet = false;
              vm.channelList = Object.assign({}, vm.defaultChannelList);
              vm.getChannelList();
            }
          })
          .catch(function(error) {});
      }
    },
    //删除确认事件
    removeEvent() {
      let vm = this;
      let arr = [];
      for (let i = 0; i < vm.channelCheckList.length; i++) {
        arr.push({ channelCode: vm.channelCheckList[i].channelCode });
      }
      vm.api
        .post(`./manage/service/channel/delete`, arr)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            vm.getChannelList();
          }
        })
        .catch(function(error) {});
    },
    //禁用、启用
    prohibit(name) {
      let vm = this;
      if (vm.container.length != 0) {
        let channelState = "";
        let strName;
        if (name == "start") {
          channelState = 1;
          strName = "此操作会启用渠道, 是否继续?";
        } else {
          channelState = 2;
          strName = "此操作会禁用渠道, 是否继续?";
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
              obj.channelCode = vm.container[i].channelCode;
              obj.channelState = channelState;
              arr.push(obj);
            }
            vm.api
              .post(`./manage/service/channel/changeState`, arr)
              .then(function(response) {
                if (response.status == 200) {
                  vm.$message({
                    showClose: true,
                    message: "操作成功",
                    type: "success"
                  });
                  vm.getChannelList();
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
    //查询渠道信息
    getChannelList(flag) {
      let vm = this;
      let data = {};
      if (flag) {
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.totals = 0;
      }
      if (vm.formQuery.channelCode) {
        data.channelCode = vm.formQuery.channelCode;
      }
      if (vm.formQuery.channelName) {
        data.channelName = vm.formQuery.channelName;
      }
      if (vm.formQuery.channelState) {
        data.channelState = vm.formQuery.channelState;
      }
      vm.api
        .post(
          `./manage/service/channel/page?currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            // vm.addChannelSet = false;
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.channelList = Object.assign({}, vm.defaultChannelList);
          }
        })
        .catch(function(error) {});
    },
    // 编辑渠道信息
    reviseRole() {
      let vm = this;
      vm.proof();
      //判断是否可以保存
      if (
        !vm.judgeChannelCode &&
        !vm.judgeChannelName &&
        !vm.judgeContactsAccount &&
        !vm.judgeChannelType
      ) {
        let data = vm.channelList;
        vm.api
          .post("./manage/service/channel/update", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                message: "修改成功",
                type: "success"
              });
              vm.addChannelSet = false;
              vm.channelList = Object.assign({}, vm.defaultChannelList);
              vm.getChannelList();
            }
          })
          .catch(function(error) {});
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getChannelList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getChannelList();
    },
    //校验信息
    proof() {
      let obj = this.channelList;
      //判断是否填写渠道编号
      if (!obj.channelCode) {
        this.judgeChannelCode = true;
      } else {
        this.judgeChannelCode = false;
      }
      //判断是否填写渠道名称
      if (!obj.channelName) {
        this.judgeChannelName = true;
      } else {
        this.judgeChannelName = false;
      }
      //判断是否填写联系人账号
      if (!obj.contactsAccount) {
        this.judgeContactsAccount = true;
      } else {
        this.judgeContactsAccount = false;
      }
      //判断是否填写任务类型
      if (!obj.channelType) {
        this.judgeChannelType = true;
      } else {
        this.judgeChannelType = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.queryList /deep/ .el-form-item__label {
  width: 90px !important;
  height: 35px;
}
.ChannelManage {
  height: calc(100% - 98px);
  .queryList {
    padding-top: 14px;
    .el-form {
      display: flex;
      flex-wrap: nowrap;
      .el-form-item {
        flex: 1;
        display: flex;
        flex-wrap: nowrap;
      }
      .queryBtn {
        flex: 0 0 156px;
      }
    }
  }
  .btnList {
    margin-left: 24px;
    margin-bottom: 14px;
    margin-top: -10px;
  }
  .authorityBox {
    height: 100%;
    position: relative;
  }
}
</style>
