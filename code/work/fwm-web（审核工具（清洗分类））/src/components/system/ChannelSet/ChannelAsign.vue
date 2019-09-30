<template>
  <div class="ChannelManage">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <!--角色弹框-->
    <ChannelAsignAdd
      :list="channelList"
      :title="textTitle"
    />
    <div class="tabBox">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="任务通道"
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
    </div>
    <div
      v-if="activeName == 'first'"
      class="roleBox"
    >
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
            prop="aisleCode"
            label="通道编号"
          >
          </el-table-column>
          <el-table-column
            prop="aisleName"
            label="通道名称"
          > </el-table-column>
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
    <div
      v-if="activeName == 'second'"
      class="authorityBox"
    >
      <ChannelInfo :roleInfoObj="toAuthority" />
    </div>
  </div>
</template>
<script>
import Remove from "../../common/Remove";
import ChannelAsignAdd from "./ChannelAsignAdd";
import ChannelInfo from "./ChannelInfo";
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
      channelCheckList: [],
      //新建编辑数据
      textTitle: "新建通道",
      aisleCodeFlag: false,
      //新建查询编辑
      channelList: {
        aisleCode: "",
        aisleName: ""
      },
      defaultChannelList: {
        aisleCode: "",
        aisleName: ""
      },
      tableData: [],
      toAuthority: {},
      judgeAisleCode: false,
      judgeAisleName: false
    };
  },
  props: ["channelCodeVal"],
  computed: {
    ...mapState(["lookUp", "tableHeightTwoHalf"])
  },
  watch: {
    channelCodeVal(newVal, oldVal) {
      this.getChannelList();
    }
  },
  mounted() {
    this.getChannelList(true);
  },
  components: {
    Remove,
    ChannelAsignAdd,
    ChannelInfo
  },
  methods: {
    //全选
    checkAll(val) {
      //进行赋值,判断是否选中内容
      this.container = val;
    },
    //标签操作
    handleClick(row) {
      if (row.label == "任务通道") {
        //this.activeName = "first";
        this.judgeLabel = false;
      }
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
    //配置
    configure(val) {
      //打开配置页开关
      this.judgeLabel = true;
      //重置数据
      this.container = [];
      //光标对位
      this.activeName = "second";
      this.toAuthority = Object.assign({}, val);
    },
    edit(val) {
      let vm = this;
      vm.addChannelSet = true;
      vm.textTitle = "编辑通道";
      vm.channelList = Object.assign({}, val);
      vm.aisleCodeFlag = true;
      vm.judgeAisleCode = false;
      vm.judgeAisleName = false;
    },
    //新建
    newChannel() {
      //打开新建开关
      let vm = this;
      vm.addChannelSet = true;
      vm.channelList = Object.assign({}, vm.defaultChannelList);
      vm.judgeAisleCode = false;
      vm.judgeAisleName = false;
      vm.textTitle = "新建通道";
      vm.aisleCodeFlag = false;
    },
    //新建的服务
    setNewChannel() {
      let vm = this;
      vm.proof();
      //判断是否可以保存
      if (!vm.judgeAisleCode && !vm.judgeAisleName) {
        let data = vm.channelList;
        data.channelCode = vm.channelCodeVal;
        vm.api
          .post(`./manage/service/channelAisle/insert`, data)
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
        arr.push({ aisleCode: vm.channelCheckList[i].aisleCode });
      }
      vm.api
        .post(`./manage/service/channelAisle/delete`, arr)
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
    getChannelList(flag) {
      let vm = this;
      let data = {};
      data.channelCode = vm.channelCodeVal;
      if (flag) {
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.totals = 0;
      }
      data.channelCode = vm.$parent.channelCodeVal;
      vm.api
        .post(
          `./manage/service/channelAisle/page?currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.judgeLabel = false;
            vm.activeName = "first";
            // vm.addChannelSet = false;
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.channelList = Object.assign({}, vm.defaultChannelList);
            // vm.$parent.channelCodeVal = "";
          }
        })
        .catch(function(error) {});
    },
    // 编辑任务通道信息
    reviseRole() {
      let vm = this;
      vm.proof();
      //判断是否可以保存
      if (!vm.judgeAisleCode && !vm.judgeAisleName) {
        let data = vm.channelList;
        vm.api
          .post("./manage/service/channelAisle/update", data)
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
      //判断是否填写任务通道编号
      if (!obj.aisleCode) {
        this.judgeAisleCode = true;
      } else {
        this.judgeAisleCode = false;
      }
      //判断是否填写任务通道名称
      if (!obj.aisleName) {
        this.judgeAisleName = true;
      } else {
        this.judgeAisleName = false;
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
    margin-left: 24px;
    .el-form {
      display: flex;
      flex-wrap: nowrap;
      .el-form-item {
        flex: 1;
        display: flex;
        flex-wrap: nowrap;
      }
      .queryBtn {
        flex: 0 0 130px;
      }
    }
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
