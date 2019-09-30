<template>
  <div class="ChannelInfo">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <!--角色弹框-->
    <infoAdd
      :list="channelList"
      :title="textTitle"
    />
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
    </div>
    <!--表格-->
    <div class="tableBox">
      <el-table
        :data="tableData"
        border
        ref="table"
        tooltip-effect="light"
        @selection-change="checkAll"
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
          width="65"
        >
          <template slot-scope="scope">
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
          prop="dataSource"
          label="来源编号"
          min-width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="sourceName"
          label="来源名称"
          min-width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="pushUrl"
          label="推送地址"
          min-width="150"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="tokenInfo"
          label="认证信息"
          width="180"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="beanId"
          label="处理beanId"
          width="180"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="sourceRemark"
          label="备注"
          max-width="180"
          :show-overflow-tooltip="true"
        >
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

  </div>
</template>
<script>
import Remove from "../../common/Remove";
import infoAdd from "./infoAdd";
import { mapState, mapMutations } from "vuex";
export default {
  name: "ChannelInfo",
  props: ["roleInfoObj"],
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //新建的开关
      addRoleDialog: false,
      //删除的开关
      judgeRemove: false,
      //全选单选容器
      container: [],
      //新建编辑数据
      textTitle: "新建来源",
      //新建查询编辑
      channelList: {
        dataSource: "",
        sourceName: "",
        pushUrl: "",
        tokenInfo: "",
        beanId: "",
        sourceRemark: ""
      },
      defaultChannelList: {
        dataSource: "",
        sourceName: "",
        pushUrl: "",
        tokenInfo: "",
        beanId: "",
        sourceRemark: ""
      },
      tableData: [],
      judgeDataSource: false,
      judgeSourceName: false,
      judgePushUrl: false,
      judgeTokenInfo: false,
      judgeBeanId: false,
      roleNameList: [],
      dataSourceFlag: false
    };
  },
  mounted() {
    this.getChannelList();
  },
  components: {
    Remove,
    infoAdd
  },
  computed: {
    ...mapState(["tableHeightTwoHalf"])
  },
  methods: {
    //单独删除
    removeOne(val) {
      this.judgeRemove = !this.judgeRemove;
      this.roleNameList = [];
      this.roleNameList.push(val);
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
    //全选
    checkAll(val) {
      //进行赋值,判断是否选中内容
      this.container = val;
    },
    edit(val) {
      this.addRoleDialog = true;
      this.textTitle = "编辑来源";
      this.channelList = Object.assign({}, val);
      this.judgeDataSource = false;
      this.judgeSourceName = false;
      this.judgePushUrl = false;
      this.judgeTokenInfo = false;
      this.judgeBeanId = false;
      this.dataSourceFlag = true;
    },
    //新建
    newChannel() {
      //打开新建开关
      this.addRoleDialog = true;
      this.channelList = Object.assign({}, this.defaultChannelList);
      this.channelList = Object.assign({}, this.roleInfoObj);
      this.judgeDataSource = false;
      this.judgeSourceName = false;
      this.judgePushUrl = false;
      this.judgeTokenInfo = false;
      this.judgeBeanId = false;
      this.textTitle = "新建来源";
      this.dataSourceFlag = false;
    },
    //新建的服务
    setNewChannel() {
      let vm = this;
      vm.proof();
      //判断是否可以保存
      if (
        !vm.judgeDataSource &&
        !vm.judgeSourceName &&
        !vm.judgePushUrl &&
        !vm.judgeTokenInfo &&
        !vm.judgeBeanId
      ) {
        let data = vm.channelList;
        vm.api
          .post(`./manage/service/channelSource/insert`, data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                showClose: true,
                message: "新建成功",
                type: "success"
              });
              vm.addRoleDialog = false;
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
      for (let i = 0; i < vm.roleNameList.length; i++) {
        arr.push({ dataSource: vm.roleNameList[i].dataSource });
      }
      vm.api
        .post(`./manage/service/channelSource/delete`, arr)
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
    //查询角色信息
    getChannelList() {
      let vm = this;
      let data = vm.channelList;
      vm.api
        .post(
          `./manage/service/channelSource/page?currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}`,
          { aisleCode: vm.roleInfoObj.aisleCode }
        )
        .then(function(response) {
          if (response.status == 200) {
            // vm.addRoleDialog = false;
            vm.tableData = response.data.result;
            if (vm.tableData.length) {
            }
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
        !vm.judgeDataSource &&
        !vm.judgeSourceName &&
        !vm.judgePushUrl &&
        !vm.judgeTokenInfo &&
        !vm.judgeBeanId
      ) {
        let data = vm.channelList;
        vm.api
          .post("./manage/service/channelSource/update", data)
          .then(function(response) {
            if (response.status == 200) {
              vm.$message({
                message: "修改成功",
                type: "success"
              });
              vm.addRoleDialog = false;
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
      //判断是否填写来源编号
      if (!obj.dataSource) {
        this.judgeDataSource = true;
      } else {
        this.judgeDataSource = false;
      }
      //判断是否填写来源名称
      if (!obj.sourceName) {
        this.judgeSourceName = true;
      } else {
        this.judgeSourceName = false;
      }
      //判断是否填写推送地址
      if (!obj.pushUrl) {
        this.judgePushUrl = true;
      } else {
        this.judgePushUrl = false;
      }
      //判断是否填写认证信息
      if (!obj.tokenInfo) {
        this.judgeTokenInfo = true;
      } else {
        this.judgeTokenInfo = false;
      }
      //判断是否填写处理beanid
      if (!obj.beanId) {
        this.judgeBeanId = true;
      } else {
        this.judgeBeanId = false;
      }
    }
  }
};
</script>

<style scoped lang="less">
.ChannelInfo {
  height: calc(100% - 98px);
  .queryList {
    margin-left: 24px;
  }
  .btnList {
    margin-left: 24px;
  }
  .authorityBox {
    height: 100%;
    position: relative;
  }
}
</style>
