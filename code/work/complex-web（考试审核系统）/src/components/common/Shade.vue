<template>
  <div class="shade" v-if="shadeLog">
    <p class="el-icon-loading shadeIcon"></p>
    <p class="loadText">{{ shadeText }}</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "shade",
  data() {
    return {};
  },
  computed: {
    ...mapState(["shadeLog", "shadeText"])
  }
};
</script>

<style scoped lang="less">
.shade {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 9999;
  .shadeIcon {
    font-size: 30px;
    color: rgb(46, 112, 138);
  }
  .loadText {
    margin-top: 10px;
  }
}
</style>
