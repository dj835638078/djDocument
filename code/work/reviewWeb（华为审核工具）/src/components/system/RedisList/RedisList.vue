<template>
  <div class="redisList">
    <!--删除弹框-->
    <Remove event="removeEvent" />
    <!--操作组-->
    <div class="btnList">
      <div
        class="prohibit"
        @click="clear"
      ><i class="fa fa-flask"></i>清理</div>
      <div
        class="delete"
        @click="deleteRedisList"
      ><i class="fa fa-trash-o"></i>删除</div>
      <span>缓存KEY：</span>
      <el-input v-model="key"></el-input>
      <div
        class="query"
        @click="researchForm"
      ><i class="fa fa-search"></i>查询</div>
    </div>
    <!--表格-->
    <div class="tableBox">
      <el-table
        :data="tableData"
        @selection-change="checkAll"
        border
        ref="table"
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
          width="50"
          align="left"
        >
          <template slot-scope="scope">
            <div
              type="text"
              size="small"
              @click="removeOne(scope.row)"
            ><i class="el-icon-delete deleteCol"></i></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="key"
          label="缓存KEY"
        >
        </el-table-column>
        <el-table-column label="缓存到期时间"> <template slot-scope="scope">
            <div v-text="tools.setFormTime(scope.row.expireTime,1)"></div>
          </template></el-table-column>
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
  name: "redisList",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //全选单选容器
      container: [],
      //删除的开关
      judgeRemove: false,
      tableData: [],
      redisList: [],
      key: ""
    };
  },
  computed: {
    ...mapState(["lookUp", "tableHeight"])
  },
  mounted() {
    this.getRedisList();
  },
  components: {
    Remove
  },
  methods: {
    //清理
    clear() {
      let vm = this;
      vm.api
        .get(`./manage/service/redis/clear`)
        .then(function(response) {
          if (response.status == 200) {
            // vm.setLookUp(response.data);
          }
        })
        .catch(function(error) {});
    },
    //查询
    researchForm() {
      this.getRedisList(true);
    },
    //全选
    checkAll(val) {
      //进行赋值,判断是否选中内容
      this.container = val;
    },
    //单独删除
    removeOne(val) {
      this.judgeRemove = !this.judgeRemove;
      this.redisList = [];
      this.redisList.push(val);
    },
    //多选删除
    deleteRedisList() {
      if (this.container.length != 0) {
        this.judgeRemove = !this.judgeRemove;
        this.redisList = this.container;
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
      for (let i = 0; i < vm.redisList.length; i++) {
        arr.push({ key: vm.redisList[i].key });
      }
      vm.api
        .post(`./manage/service/redis/delete`, arr)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            vm.getRedisList();
          }
        })
        .catch(function(error) {});
    },
    //查询角色信息
    getRedisList(flag) {
      let vm = this;
      let data = {};
      if (flag) {
        vm.currentPage = 1;
        vm.pageSize = 10;
        vm.totals = 0;
      }
      if (vm.key) {
        data.key = vm.key;
      }
      vm.api
        .post(
          `./manage/service/redis/list?currentPage=${vm.currentPage}&pageSize=${
            vm.pageSize
          }`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getRedisList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getRedisList();
    }
  }
};
</script>

<style scoped lang="less">
.queryList /deep/ .el-form-item__label {
  width: 90px !important;
  height: 35px;
}
.redisList {
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
    margin-bottom: 14px;
    padding-top: 18px;
    box-sizing: border-box;
    display: flex;
    height: 48px;
    span {
      line-height: 30px;
      margin-left: 14px;
    }
    .el-input {
      width: 300px;
      margin-right: 14px;
    }
  }
  .authorityBox {
    height: 100%;
    position: relative;
  }
}
</style>
