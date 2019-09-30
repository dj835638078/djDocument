<template>
  <div class="Four-table">
    <h3 class="reportFormTitle">
      四、总质量排行TOP10<span class="smallText"
        >（数据包含除腾讯质检外所有数据，详情可在下个单元表查看，标红为上周已上榜人员）</span
      >
    </h3>
    <ul class="Four-box">
      <li class="Four-box-li">
        <Table
          titleName="各分组抽检质量排行TOP10"
          color="#569CF5"
          :tableData="fourData"
        />
      </li>
      <li class="Four-box-li" style="margin-right:0px;">
        <Table
          titleName="新人抽检质量排行TOP10"
          color="#00CDCA"
          :tableData="fourDataNew"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from "./Table";
export default {
  data() {
    return {};
  },
  computed: { ...mapState([]) },
  props: ["fourData", "fourDataNew"],
  components: { Table },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.Four-table {
  overflow: hidden;
  .Four-box {
    width: 100%;
    .Four-box-li {
      width: 580px;
      float: left;
      margin-right: 40px;
    }
  }
}
</style>