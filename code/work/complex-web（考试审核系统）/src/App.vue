<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    //IE浏览器中的路由跳转后页面不变更问题
    function checkIE() {
      return (
        "-ms-scroll-limit" in document.documentElement.style &&
        "-ms-ime-align" in document.documentElement.style
      );
    }
    if (checkIE()) {
      window.addEventListener(
        "hashchange",
        () => {
          var currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        },
        false
      );
    }
  }
};
</script>
<style lang="less">
@import "./assets/styles/common";
</style>
