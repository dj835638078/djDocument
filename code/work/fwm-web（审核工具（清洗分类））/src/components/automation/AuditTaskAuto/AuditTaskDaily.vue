<template>
  <div class="AutoAssignDaily">
    <!--操作组-->
    <div class="btnList">
      <div
        class="new"
        @click="backCli"
      ><i class="fa fa-reply"></i>返回</div>
    </div>
    <!--表格-->
    <div class="tableBox">
      <el-table
        :data="tableData"
        highlight-current-row
        border
        tooltip-effect="light"
        ref="table"
        style="width: 100%"
        :height="tableHeight"
      >
        <el-table-column
          prop="operateType"
          label="操作"
          width="60"
        > </el-table-column>
        <el-table-column
          label="规则名称"
          min-width="150"
          prop="autoName"
          :show-overflow-tooltip="true"
        >
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
          label="规则状态"
          width="70"
        >
          <template slot-scope="scope">
            <div
              :class="[scope.row.autoState=='1'?'activeColorY':'activeColorN']"
              v-text="scope.row.autoState == '1' ? '启用' : '禁用'"
            >
            </div>
          </template></el-table-column>
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
            <div v-text="tools.setRole(scope.row.createBy)"></div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作时间"
          align="left"
          width="160"
        >
          <template slot-scope="scope">
            <div v-text="tools.setFormTime(scope.row.createDate,1)"></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="processConclusion"
          label="规则描述"
          min-width="150"
          :show-overflow-tooltip="true"
        > </el-table-column>
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
import { mapState, mapMutations } from "vuex";
export default {
  name: "AutoAssignDaily",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      totalPage: 1,
      tableData: []
    };
  },
  computed: {
    ...mapState(["lookUp", "tableHeight"])
  },
  mounted() {
    this.qeuryList(this.$route.params.id);
  },
  watch: {},
  components: {},
  methods: {
    //返回按钮
    backCli() {
      this.$router.push({ name: "AuditTaskAuto" });
    },
    //查询
    qeuryList(id) {
      let vm = this;
      vm.api
        .get(
          `./manage/service/taskAuto/findLogs?autoId=${id}&currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}`
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.totalPage = response.data.page.totalPage;
          }
        })
        .catch(function(error) {});
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.qeuryList(this.$route.params.id);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.qeuryList(this.$route.params.id);
    }
  }
};
</script>

<style scoped lang="less">
.AutoAssignDaily {
  height: calc(100% - 98px);
  display: flex;
  flex-direction: column;
  .btnList {
    margin-top: 14px;
    margin-left: 14px;
  }
}
</style>
