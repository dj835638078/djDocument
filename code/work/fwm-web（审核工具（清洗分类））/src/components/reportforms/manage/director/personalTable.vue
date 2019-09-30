<template>
  <div class="directorTable">
    <div class="table-box" v-if="chartList">
      <div class="table-box-title">
        <div class="table-box-title-name">{{ $parent.titleName }}表：</div>
        <div class="table-box-title-num" v-if="chartList.length">
          <div class="table-box-title-num-top">已审核总数量</div>
          <div class="table-box-title-num-bottom">{{ sum }}</div>
        </div>
      </div>
      <div class="table-box-content" v-if="$parent.heightN">
        <el-table
          v-if="chartList.length"
          :data="chartList"
          style="width: 100%"
          highlight-current-row
          tooltip-effect="light"
          :height="$parent.heightN"
        >
          <el-table-column type="index" width="50" label="NO." align="center">
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <div
                type="text"
                size="small"
                style="color:#5675F5;cursor:pointer"
                @click="godetail(scope.row)"
              >
                查看详情
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="processName"
            align="center"
            label="审核员"
            :show-overflow-tooltip="true"
          >
          </el-table-column>

          <el-table-column
            prop="moduleCount"
            align="center"
            label="已操作模块数量"
            width="110"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="processCount"
            label="已审核数量"
            align="center"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <div
          v-else
          v-bind:style="{ height: $parent.heightN + 'px' }"
          style="text-align:center;color:#909399;font-size:12px;"
        >
          <div style="padding-top:125px;">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {},
  watch: {},
  computed: {},
  props: ["chartList", "sum"],

  mounted() {},
  methods: {
    godetail(val) {
      let routeData = this.$router.resolve({
        path: "/reportforms/Detail",
        name: "Detail",
        // params: { id: val.assignId }
        params: {
          name: val.processPerson,
          type: this.$parent.type,
          sDate: this.$parent.sDate,
          eDate: this.$parent.eDate
        }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped lang="less">
.directorTable {
  overflow: hidden;
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
        border-left: 2px solid #5675f5;
        .table-box-title-num-top {
          font-size: 12px;
          margin-top: 3px;
        }
        .table-box-title-num-bottom {
          font-weight: bold;
          font-size: 28px;
          color: #5675f5;
          margin-top: 6px;
        }
      }
    }
    .table-box-content {
      padding: 0 26px;
    }
  }
}
</style>
