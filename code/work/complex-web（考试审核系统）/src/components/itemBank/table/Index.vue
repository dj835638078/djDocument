<template>
  <div class="itemBanl-table">
    <div class="itemBanl-table-top">
      <div class="itemBanl-table-top-name">
        {{ title }}
      </div>
    </div>
    <!-- 普通员工-->
    <NormalTable v-if="$route.name == 'itemBank'" />
    <!--领导-->
    <LeaderTable v-if="$route.name == 'paperResult'" />
  </div>
</template>

<script>
import NormalTable from "./NormalTable";
import LeaderTable from "./LeaderTable";
export default {
  data() {
    return {
      title: ""
    };
  },
  components: { NormalTable, LeaderTable },
  computed: {},
  watch: {
    "$route.name"() {
      this.paperName();
    }
  },
  mounted() {
    this.paperName();
  },
  methods: {
    paperName() {
      if (this.$route.name == "itemBank") {
        this.title = "考试入口";
      }
      if (this.$route.name == "paperResult") {
        this.title = "考试结果";
      }
    }
  }
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
      margin-bottom: 16px;
    }
  }
}
</style>