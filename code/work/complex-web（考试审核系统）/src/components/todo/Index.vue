<template>
  <div class="itemBanl-table">
    <div class="itemBanl-table-top">
      <div class="itemBanl-table-top-name">待办事项</div>
    </div>
    <TodoTable />
  </div>
</template>

<script>
import TodoTable from "./TodoTable";
export default {
  data() {
    return {};
  },
  components: { TodoTable },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.itemBanl-table {
  width: 100%;
  margin-bottom: 100px;
  .itemBanl-table-top {
    width: 100%;
    .itemBanl-table-top-name {
      margin-top: 18px;
      border-left: 2px solid #00cdca;
      padding-left: 10px;
      font-size: 18px;
      font-weight: 600;
      font-family: PingFangSC-Semibold;
      color: #2a2a2a;
      margin-bottom: 6px;
    }
  }
}
</style>