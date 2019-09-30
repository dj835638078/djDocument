<template>
  <div class="dayErrorTypeBox">
    <!-- <h3 class="reportFormTitle">四、出错类型</h3> -->
    <div class="content">
      <div class="item" v-for="(item, index) in dayErrorTypeData" :key="index">
        <pieEcharts
          :dataEcharts="item.errorData"
          :dataSource="item.dataSource"
        />
      </div>
    </div>
    <!-- <div class="noDataTitle" v-else>暂无数据</div> -->
    <div style="clear:both"></div>
  </div>
</template>

<script>
import pieEcharts from "./pieEcharts";
export default {
  data() {
    return {};
  },
  props: ["dayErrorTypeData"],
  components: { pieEcharts },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.dayErrorTypeBox {
  .content {
    min-height: 400px;
    width: 100%;
    .item {
      float: left;
      height: 400px;
      width: 30%;
      margin-right: 2%;
      margin-top: 30px;
    }
  }
}
</style>