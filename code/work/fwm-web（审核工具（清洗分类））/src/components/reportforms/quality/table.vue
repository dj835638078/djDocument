<template>
  <div class="table">
    <div class="table-box">
      <div class="table-box-title">
        <div class="table-box-title-name">各模块错误率：</div>
        <div class="table-box-title-num redbg" v-if="tableList.length">
          <div class="table-box-title-num-top">总错误率</div>
          <div class="table-box-title-num-bottom redColor">
            {{ totalErrorRate }}
          </div>
        </div>
        <div class="table-box-title-num bluebg" v-if="tableList.length">
          <div class="table-box-title-num-top">已审核总数量</div>
          <div class="table-box-title-num-bottom blueColor">
            {{ totalCount }}
          </div>
        </div>
      </div>
      <div class="table-box-content">
        <el-table
          :data="tableList"
          style="width: 100%"
          highlight-current-row
          tooltip-effect="light"
          :height="tableHeightN"
          v-if="tableList.length"
        >
          <el-table-column
            prop="moduleName"
            label="模块"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="质检数量"
            width="120"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <div
                type="text"
                size="small"
                v-text="scope.row.checkedCount"
                style="color:#1890FF;cursor:pointer"
                @click="godetail(scope.row)"
              ></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="errorCount"
            align="left"
            label="错误量"
            width="100"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="errorRate"
            align="left"
            label="错误率"
            width="100"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <div v-else class="noData">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["tableList", "totalCount", "totalErrorRate", "dataSourceList"],
  computed: {
    ...mapState(["tableHeightN"])
  },
  watch: {},
  mounted() {},
  methods: {
    godetail(val) {
      let vm = this;
      let routeData = vm.$router.resolve({
        name: "QualityDetail",
        params: {
          type: vm.$parent.type,
          sDate: vm.$parent.sDate,
          eDate: vm.$parent.eDate,
          dataSource: val.dataSource
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped lang="less">
.table {
  overflow: hidden;
  .noData {
    width: 50%;
    height: calc(68% - 12px);
    position: absolute;
    font-size: 12px;
    color: #909399;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .blueColor {
    color: #5675f5;
  }
  .bluebg {
    border-left: 2px solid #5675f5;
  }
  .redColor {
    color: #f5222d !important;
  }
  .redbg {
    border-left: 2px solid #f5222d !important;
  }
  .table-box {
    width: 100%;
    overflow: hidden;
    .table-box-title {
      height: 79px;
      .table-box-title-name {
        height: 79px;
        float: left;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
        line-height: 51px;
        margin-left: 20px;
      }
      .table-box-title-num {
        padding-left: 10px;
        margin-top: 23px;
        float: right;
        margin-right: 26px;
        height: 46px;
        .table-box-title-num-top {
          font-size: 12px;
          margin-top: 3px;
        }
        .table-box-title-num-bottom {
          font-weight: bold;
          font-size: 28px;
          margin-top: 6px;
          // width: 110px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .table-box-content {
      padding: 0 26px;
    }
  }
}
</style>
