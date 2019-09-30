<template>
  <div class="department">
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      show-checkbox
      @check-change="handleCheckChange"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["departmentList"],
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.department {
}
</style>