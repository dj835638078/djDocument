<template>
  <div class="importData">
    <div class="importData-search">
      <div>
        <div class="search-one-box">
          <div class="search-one-box-name">文件名称：</div>
          <div class="search-one-box-input">
            <el-input
              v-model="fileName"
              placeholder="请输入文件名称"
              clearable
            ></el-input>
          </div>
        </div>
        <div class="search-one-box">
          <div class="search-one-box-name">导入状态：</div>
          <div class="search-one-box-input">
            <el-select
              v-model="importStatus"
              placeholder="请选择导入状态"
              :clearable="true"
            >
              <el-option
              v-for="item in lookUp.EXCEL_IMPORT_STATUS"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div style="float:right">
        <div class="query interval" @click="search">查询</div>
        <div
          class="release"
          v-if="!fileName && !importStatus"
        >
          重置
        </div>
        <div class="main" @click="empty" v-else>重置</div>
      </div>
    </div>
    <div>
      <el-table
        :data="importList"
        border
        style="width: 100%"
        tooltip-effect="light"
        :height="tableHeight"
      >
        <el-table-column
          type="index"
          width="50"
          label="NO."
          align="center"
          fixed="left"
        >
        </el-table-column>
        <el-table-column fixed="left" label="操作" align="left" width="65">
          <template slot-scope="scope">
            <div
              style="color:#f56c6c;"
              class="downloadIcon fa fa-download"
              @click="download(scope.row)"
              title="下载文件"
            ></div>
            <div
              v-if="scope.row.importStatus == 4"
              style="color:#f56c6c;"
              class="downloadIcon fa fa-exclamation-circle"
              @click="downloadError(scope.row)"
              title="下载错误信息"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          label="文件名称"
          align="left"
          min-width="150"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span style="color:#1890FF">{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="导入状态" align="left" min-width="80">
          <template slot-scope="scope">
            <span v-text="setStatus(scope.row.importStatus)"></span>
          </template>
        </el-table-column>

        <el-table-column prop="importQty" label="成功数量" min-width="80">
        </el-table-column>
        <el-table-column label="文件大小" align="left" min-width="80">
          <template slot-scope="scope">
            <span v-text="setSize(scope.row.fileSize)"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作用户" min-width="100">
          <template slot-scope="scope">
            <span v-text="tools.setName(scope.row.fwmAccount)"></span>
          </template>
        </el-table-column>
        <el-table-column label="开始时间" align="left" width="160">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.runStartTime, 1)"></span>
          </template>
        </el-table-column>

        <el-table-column label="结束时间" align="left" width="160">
          <template slot-scope="scope">
            <span v-text="tools.setFormTime(scope.row.runEndTime, 1)"></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="totals > 0"
        style="text-align:right;"
        background
        :total="totals"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "ImportList",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      importList: [],
      fileName: null,
      importStatus: null
    };
  },
  mounted() {
    this.importServe();
  },
  computed: {
    ...mapState(["tableHeight","lookUp"])
  },
  components: {},
  methods: {
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.importServe();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.importServe();
    },
    //设置大小
    setSize(val) {
      return parseInt(val / 1000) + "KB";
    },
    //设置状态
    setStatus(val) {
      if (val == 0) {
        return "等待处理";
      }
      if (val == 1) {
        return "处理中";
      }
      if (val == 2) {
        return "处理完成";
      }
      if (val == 3) {
        return "部分成功";
      }
      if (val == 4) {
        return "导入失败";
      }
    },
    importServe() {
      let vm = this;
      let data = {
        fileName: this.fileName,
        importStatus: this.importStatus
      };
      this.api
        .post(
          `./complex/service/import/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.importList = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    download(val) {
      location.href =
        location.origin + "/complex/publicservice/file/download?fId=" + val.fId;
    },
    downloadError(val) {
      location.href =
        location.origin + "/complex/publicservice/import/error/" + val.importId;
    },
    search() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.importServe();
    },
    empty() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.fileName = "";
      this.importStatus = "";
      this.importServe();
    }
  }
};
</script>

<style scoped lang="less">
.downloadIcon {
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    height: 100%;
    width: 20px;
}
.importData {
  width: 100%;
  margin-bottom: 100px;
  .importData-search {
    height: 32px;
    width: 100%;
    margin-top: 20px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .search-one-box {
      height: 32px;
      float: left;
      margin-right: 15px;
      .search-one-box-name,
      .search-one-box-input {
      float: left;
      }
      .search-one-box-name {
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .search-one-box-input {
        width: 167px;
        height: 32px;
      }
    }
  }
}
</style>
