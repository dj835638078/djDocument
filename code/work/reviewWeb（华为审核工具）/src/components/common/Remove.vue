<template>
  <div>

  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["event"],
  methods: {},
  mounted() {},
  watch: {
    "$parent.judgeRemove"() {
      this.$confirm("将会进行删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //调用传入的删除事件
          this.$parent[this.event]();
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="less">
</style>
