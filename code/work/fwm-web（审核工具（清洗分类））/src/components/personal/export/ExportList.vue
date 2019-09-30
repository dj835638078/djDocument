<template>
  <div class="ExportList">
    <div class="ExportList-top">
      <div class="ExportList-top-left">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="导入状态：">
            <el-select
              v-model="formInline.importStatus"
              placeholder="请选择导入状态"
            >
              <el-option
                v-for="(item, index) in optionList"
                :label="item.name"
                :value="item.value"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="ExportList-top-right">
        <div class="query" @click="search">
          <i class="fa fa-search"></i>搜索
        </div>
        <div class="delete" @click="empty">
          <i class="fa fa-trash-o"></i>清空
        </div>
      </div>
    </div>
    <div>
      <el-table
        :data="ExportList"
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

        <el-table-column fixed="left" label="操作" align="left" width="50">
          <template slot-scope="scope">
            <div
              style="color:#f56c6c;"
              class="downloadIcon fa fa-download"
              @click="download(scope.row)"
              title="下载文件"
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
            <span style="color:#1890FF">{{ scope.row.tmpName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="导出状态" align="left" min-width="80">
          <template slot-scope="scope">
            <div v-text="setStatus(scope.row.exportStatus)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="exportQty" label="记录总数" min-width="80">
        </el-table-column>

        <el-table-column label="文件大小" align="left" min-width="80">
          <template slot-scope="scope">
            <span v-text="setSize(scope.row.fileSize)"></span>
          </template>
        </el-table-column>
        <el-table-column label="操作用户" min-width="100">
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.fwmAccount)"></span>
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
</template>
<script>
import api from "@/api";
import { mapState, mapMutations } from "vuex";
export default {
  name: "ExportList",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      ExportList: [],
      optionList: [],
      formInline: {
        importStatus: ""
      }
    };
  },
  mounted() {
    this.exportServe();
  },
  components: {},
  computed: {
    ...mapState(["tableHeight"])
  },
  methods: {
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.exportServe();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.exportServe();
    },
    //设置大小
    setSize(val) {
      if (val) {
        return parseInt(val / 1000) + "KB";
      } else {
        return "null";
      }
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
    exportServe() {
      let vm = this;
      let data = {
        exportStatus: this.formInline.importStatus
      };
      api
        .post(
          `./manage/service/export/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.optionList = [
              { name: "全部", value: "" },
              { name: "等待处理", valueL: "0" },
              { name: "处理中", valueL: "1" },
              { name: "处理完成", valueL: "2" },
              { name: "部分成功", valueL: "3" },
              { name: "导入失败", valueL: "4" }
            ];
            vm.ExportList = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    download(val) {
      location.href =
        location.origin + "/manage/publicservice/file/download?fId=" + val.fId;
    },
    search() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.exportServe();
    },
    empty() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.formInline.importStatus = "";
      this.exportServe();
    }
  }
};
</script>

<style scoped lang="less">
.ExportList {
  .ExportList-top {
    height: 56px;
    overflow: hidden;
    .ExportList-top-left {
      margin-left: 24px;
      float: left;
      margin-top: 12px;
    }
  }
  .ExportList-top-right {
    margin-left: 20px;
    float: left;
    margin-top: 15px;
  }
}
</style>
