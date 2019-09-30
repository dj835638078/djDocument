<template>
  <div class="checkData">
    <div
      class="checkData-search"
      style="height: auto;overflow:hidden;margin-bottom:15px;"
    >
      <div class="search-one-box">
        <div class="search-one-box-name">类别：</div>
        <div class="search-one-box-input">
          <el-select v-model="applyType" placeholder="请选择类别">
            <el-option
              v-for="item in lookUp.SHIFT_APPLY_TYPE"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box" style="margin-left: 64.5px;">
        <div class="search-one-box-name" style="text-align:center;">
          类型：
        </div>
        <div class="search-one-box-input">
          <el-select
            v-if="!applyType"
            v-model="applyClass"
            placeholder="请选择类型"
            :disabled="!applyType"
          >
            <el-option
              v-for="item in lookUp.SHIFT_APPLY_CLASS_1"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
          <el-select
            v-if="applyType == 'leave'"
            v-model="applyClass"
            placeholder="请选择类型"
            :disabled="!applyType"
          >
            <el-option
              v-for="item in lookUp.SHIFT_APPLY_CLASS_1"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
          <el-select
            v-if="applyType == 'exchange'"
            v-model="applyClass"
            placeholder="请选择类型"
            :disabled="!applyType"
          >
            <el-option
              v-for="item in lookUp.SHIFT_APPLY_CLASS_2"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box" style="margin-left: 64.5px;">
        <div class="search-one-box-name" style="width:75px;">审批状态：</div>
        <div class="search-one-box-input">
          <el-select v-model="applyStatus" placeholder="请选择审批状态">
            <el-option
              v-for="item in lookUp.SHIFT_APPLY_STATUS"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box" style="margin-top:20px;">
        <div class="search-one-box-name">申请日期：</div>
        <div class="search-one-box-input">
          <el-date-picker
            v-model="beginTime"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div class="separate">-</div>
        <div class="search-one-box-input">
          <el-date-picker
            v-model="endTime"
            type="datetime"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
      </div>

      <div style="float:right;margin-top:20px;">
        <div class="query interval" @click="query">查询</div>
        <div
          class="release"
          v-if="
            !applyClass && !applyType && !endTime && !beginTime && !applyStatus
          "
        >
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
      </div>
    </div>
    <div style="margin-bottom:15px;overflow:hidden;">
      <div class="query interval" @click="shiftBtn">请假换班</div>
    </div>
    <div class="checkData-tab">
      <Table :tableData="list" />
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
    <shiftDialog />
  </div>
</template>

<script>
import shiftDialog from "./shiftDialog";
import { mapState } from "vuex";
import Table from "./Table";
export default {
  data() {
    return {
      dialogShow: false,
      applyClass: "",
      applyType: "",
      endTime: "",
      beginTime: "",
      applyStatus: "",
      list: [],
      currentPage: 1,
      pageSize: 10,
      totals: 0
    };
  },
  watch: {
    beginTime() {
      this.judgeTime();
    },
    endTime() {
      this.judgeTime();
    }
  },
  components: { Table, shiftDialog },
  computed: {
    ...mapState(["lookUp"])
  },
  mounted() {
    this.getFindMyApply();
  },
  methods: {
    //请假换班
    shiftBtn() {
      this.dialogShow = true;
    },
    //判断时间
    judgeTime() {
      if (this.beginTime && this.endTime) {
        if (this.endTime < this.beginTime) {
          this.endTime = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    },
    query() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.getFindMyApply();
    },
    release() {
      this.applyClass = "";
      this.applyType = "";
      this.endTime = "";
      this.beginTime = "";
      this.applyStatus = "";
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getFindMyApply();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFindMyApply();
    },
    //获取数据
    getFindMyApply() {
      let data = {
        applyClass: this.applyClass,
        applyType: this.applyType,
        endTime: this.endTime,
        beginTime: this.beginTime,
        applyStatus: this.applyStatus
      };
      this.api
        .post(
          `./complex/service/shift/findMyApplyPage?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(response => {
          if (response.status == 200) {
            this.list = response.data.result;
            this.totals = response.data.page.totalRows;
            window.scrollTo(0, 0);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.checkData-search /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 282px;
  height: 32px;
}
.checkData {
  width: 100%;
  margin-bottom: 100px;
  .checkData-search {
    height: 32px;
    width: 100%;
    margin-top: 20px;
    .search-one-box {
      height: 32px;
      float: left;
      .search-one-box-name,
      .search-one-box-input {
        float: left;
      }
      .search-one-box-name {
        width: 75px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .search-one-box-input {
        width: 282px;
        height: 32px;
        .el-select {
          width: 100%;
        }
      }
      .search-one-box-time {
        width: 282px;
        float: left;
        .el-date-editor {
          width: 225px;
        }
      }
    }
  }
}
</style>