<template>
  <div class="frame">
    <navigation v-if="$route.name != 'paper'" />
    <div class="contentBox" :style="{ minHeight: detailHeight + 'px' }">
      <router-view></router-view>
    </div>
    <suspension />
    <footerBox />
  </div>
</template>

<script>
import { mapState } from "vuex";
import navigation from "../public/Navigation";
import footerBox from "../public/Footer";
import suspension from "../public/Suspension";
export default {
  data() {
    return {};
  },
  components: {
    navigation,
    footerBox,
    suspension
  },
  computed: { ...mapState(["detailHeight"]) },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.frame {
  width: 1200px;
  margin: auto;
}
.contentBox {
  width: 1200px;
  overflow: hidden;
}
</style>