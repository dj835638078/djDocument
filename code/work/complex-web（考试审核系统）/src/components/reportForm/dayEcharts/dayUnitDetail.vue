<template>
  <div class="dayUnitDetailBox">
    <div class="content">
      <div class="item" v-for="(item, index) in dayUnitDetailData">
        <barEcharts
          :style="{
            height:
              item.userDataDayVo && item.userDataDayVo.length
                ? '400px'
                : '150px'
          }"
          :dataEcharts="item"
        />
      </div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import barEcharts from "./barEcharts";
export default {
  data() {
    return {};
  },
  props: ["dayUnitDetailData"],
  components: { barEcharts },
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.dayUnitDetailBox {
  .content {
    min-height: auto;
    width: 100%;
    .item {
      height: auto;
      width: 100%;
      margin-top: 60px;
    }
  }
}
</style>