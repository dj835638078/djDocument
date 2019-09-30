<template>
  <div class="directorTable">
    <div
      class="table-box"
      v-if="chartList"
    >
      <div class="table-box-title">
        <div class="table-box-title-name">{{$parent.titleName}}表：</div>
        <div
          class="table-box-title-num"
          v-if="chartList.length"
        >
          <div class="table-box-title-num-top">已审核总数量</div>
          <div class="table-box-title-num-bottom">{{sum}}</div>
        </div>
      </div>
      <div
        class="table-box-content"
        v-if="$parent.heightN"
      >
        <el-table
          v-if="chartList.length"
          :data="chartList"
          style="width: 100%"
          highlight-current-row
          tooltip-effect="light"
          :height="$parent.heightN"
        >
          <el-table-column
            type="index"
            label="NO."
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="sourceName"
            align="center"
            label="已操作模块"
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
          style="text-align:center;color:#909399;font-size:12px;"
        >
          <div style="padding-top:100px;">暂无数据</div>
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
  methods: {}
};
</script>

<style scoped lang="less">
</style>
