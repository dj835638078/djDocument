<template>
  <div class="videoDemo">
    <!-- <p>要使用的视频：</p> -->
    <!-- crossorigin="*"   跨域加的配置 -->
    <video id="video1" controls width="100%" ref="setVideoWidth">
      <source :src="videoUrl" type="video/mp4" preload />
    </video>
    <canvas id="myCanvas" width="600" height="300" v-show="canvasShow">
    </canvas>
    <div class="clear"></div>
    <div @click="saveImgBtn" v-if="btnShow" class="query saveImgBtn">
      保存图片
    </div>
  </div>
</template>
<script>
export default {
  name: "VideoExamine",
  data() {
    return {
      canvasShow: false,
      btnShow: false
    };
  },
  props: ["videoUrl"],
  mounted() {
    this.preventBtn();
    this.viedoBtn();
    this.drawCanvas();
  },
  computed: {},
  watch: {
    //当视频url变化时代表初始数据，关闭画布
    videoUrl() {
      this.canvasShow = false;
    }
  },
  components: {},
  methods: {
    //阻止浏览器默认事件，防止和键盘事件冲突
    preventBtn() {
      document.body.onkeydown = function(event) {
        var e = window.event || event;
        if (
          e.keyCode == 32 ||
          e.keyCode == 37 ||
          e.keyCode == 38 ||
          e.keyCode == 39 ||
          e.keyCode == 40
        ) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            window.event.returnValue = false;
          }
        }
      };
    },
    //下载截屏图片base64格式
    saveImgBtn() {
      var canvas = document.getElementById("myCanvas");
      var strDataURI = canvas.toDataURL();
      let data = {
        base64Str: strDataURI
      };
      this.api
        .post(`./manage/service/videoVerify/base64convert`, data)
        .then(function(response) {})
        .catch(function(error) {});
    },
    //视频操作上下左右空格
    viedoBtn() {
      //reurn false 禁止函数内部执行其他的事件或者方法
      let vm = this;
      var vol = 0.1; //1代表100%音量，每次增减0.1
      var time = 5; //单位秒，每次增减10秒
      var videoElement = document.getElementById("video1");
      document.onkeyup = function(event) {
        //键盘事件
        if (vm.$parent.isShowDialog) {
          return;
        }
        var e = event || window.event || arguments.callee.caller.arguments[0];

        //鼠标上下键控制视频音量
        if (e && e.keyCode === 38) {
          // 按 向上键
          videoElement.volume !== 1 ? (videoElement.volume += vol) : 1;
          return false;
        } else if (e && e.keyCode === 40) {
          // 按 向下键
          videoElement.volume !== 0 ? (videoElement.volume -= vol) : 1;
          return false;
        } else if (e && e.keyCode === 37) {
          // 按 向左键
          videoElement.currentTime !== 0
            ? (videoElement.currentTime -= time)
            : 1;
          return false;
        } else if (e && e.keyCode === 39) {
          // 按 向右键
          videoElement.volume !== videoElement.duration
            ? (videoElement.currentTime += time)
            : 1;
          return false;
        } else if (e && e.keyCode === 32) {
          videoElement.paused === true
            ? videoElement.play()
            : videoElement.pause();
          return false;
        }
      };
    },
    //绘制画布进行视频截图
    drawCanvas() {
      var v = document.getElementById("video1");
      var c = document.getElementById("myCanvas");
      let ctx = c.getContext("2d");
      let i;
      let vm = this;
      c.style.width = vm.$refs.setVideoWidth.clientWidth + "px";
      c.style.height = vm.$refs.setVideoWidth.clientHeight + "px";
      v.addEventListener(
        "play",
        function() {
          // console.log(vm.canvasShow, "aabbcc");
          //开关，打开画布画布
          vm.btnShow = false;
          vm.canvasShow = true;
          if (vm.canvasShow) {
            i = window.setInterval(function() {
              ctx.drawImage(v, 0, 0, 600, 300);
            }, 20);
          }
        },
        false
      );
      //暂停
      v.addEventListener(
        "pause",
        function() {
          //只有暂停状态下可以出现保存图片按钮
          // vm.btnShow = true;
          vm.btnShow = false;
          window.clearInterval(i);
        },
        false
      );
      v.addEventListener(
        "ended",
        function() {
          clearInterval(i);
        },
        false
      );
    }
  }
};
</script>
<style scoped lang="less">
#myCanvas {
  margin-top: 20px;
}
.saveImgBtn {
}
</style>
