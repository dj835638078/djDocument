<template>
  <div class="carousel">
    <div class="carouselBox">
      <div class="imgActive">
        <vue-slideshow :data="images" :config="config"></vue-slideshow>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      images: [
        { src: "/static/10.jpg", background: "#4A58F6" },
        {
          src: "/static/11.jpg",
          background: "#36D6B5"
        },
        {
          src: "/static/12.jpg",
          background: "#182032"
        }
      ],
      config: {
        effect: "fade",
        autoplay: 2500,
        // arrow: true,
        dot: true,
        arrow: true,
        aaaa: true
      }
    };
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {}
};
</script>
<style scoped lang="less">
.carousel {
  width: 100%;
  min-width: 1200px;
  .carouselBox {
    height: 280px;
    width: 100%;
    .imgActive {
      width: 100%;
      height: 100%;
    }
  }
}
</style>