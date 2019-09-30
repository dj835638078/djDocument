<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="rowkey"
        align="left"
        :show-overflow-tooltip="true"
        width="180"
      >
        <template slot-scope="scope">
          <span
            style="color:#00CDCA;cursor:pointer;"
            @click="goDetail(scope.row.filingId)"
            >{{ scope.row.rowkey }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="文章标题"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.articleTitle">{{
            scope.row.articleTitle
          }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核来源"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="$parent.setDataName(scope.row.dataSource)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="报备时间"
        align="left"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="处理人员"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.processAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="处理状态"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.filingStatus == '1'">已处理</span>
          <span v-else>待处理</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="processProposal"
        label="处理结果"
        align="left"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {
    goDetail(id) {
      this.$router.push({
        name: "reportDetail",
        params: { filingId: id }
      });
    }
  }
};
</script>

<style scoped lang="less">
</style>