<template>
  <div class="footer" v-if="$route.name != 'todoDetailReport'">
    版权所有@软通动力信息技术(集团)有限公司
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.footer {
  background: #343434;
  height: 63px;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  line-height: 63px;
  text-align: center;
  color: #9b9b9b;
  font-size: 12px;
}
</style>