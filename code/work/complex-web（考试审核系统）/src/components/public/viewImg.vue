<template>
  <div class="viewImg">
    <el-dialog
      :title="imgName"
      :visible.sync="$parent.imgShow"
      :close-on-click-modal="false"
      width="740px"
      top="10vh"
    >
      <div style="width:100%;height:400px;position:relative;">
        <span
          style="font-size: 0;width: 700px;height: 400px;display: table-cell;text-align: center;vertical-align: middle;"
        >
          <img :src="imgUrl" style="max-width:700px;max-height:400px" />
        </span>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["imgUrl", "imgName"],
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
</style>