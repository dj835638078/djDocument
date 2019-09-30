<template>
  <div class="imgTab">
    <el-dialog
      :title="textName"
      :visible.sync="$parent.imgShow"
      :close-on-click-modal="false"
      width="1090px"
      top="10vh"
    >
      <form action="" id="imgform">
        <div style="width:700px;height:400px;float:left;">
          <p>
            坐标:<span id="test" style="height:20px;line-height:20px"></span>
          </p>
          <div id="test2" style="width:700px;height:400px;"></div>
          <div class="imageLabel-buttons" style="margin-top: 20px;">
            <div class="imageLabel-btn imageLabel-closes" v-show="false">
              关闭
            </div>
            <!--v-if="decide == 'yes'"-->
            <div v-if="discriminate != 'down'">
              <div
                v-if="checkout == '提交'"
                class="imageLabel-btn imageLabel-btn-right"
                :class="
                  imgList.length > 0 ? 'imageLabel-colorY' : 'imageLabel-colorN'
                "
              >
                提交
              </div>
              <div
                v-else
                class="imageLabel-btn imageLabel-btn-right"
                :class="
                  imgList.length > 0 ? 'imageLabel-colorY' : 'imageLabel-colorN'
                "
              >
                保存
              </div>
            </div>
          </div>
        </div>
        <div class="imgRight">
          <div class="imgRight-top">
            <ul class="imgRight-top-ul">
              <li
                v-for="(item, index) in imgList"
                :key="index"
                class="imgRight-top-ul-li"
              >
                <div class="imgRight-li-left">
                  <div class="imgRight-li-content">
                    {{ index + 1 }}
                  </div>
                </div>
                <div
                  :class="[
                    index + 1 == judgeIndex
                      ? 'imgRight-li-centerY'
                      : 'imgRight-li-centerN'
                  ]"
                >
                  <!--@keyup.native="inputEnter"-->
                  <el-input
                    @focus="achieve(index)"
                    @blur="changgeText"
                    v-model="imgList[index].name"
                    placeholder="请输入内容"
                    :disabled="discriminate == 'down'"
                  ></el-input>
                </div>
                <div
                  v-if="discriminate != 'down'"
                  class="imgRight-li-right"
                  @click="removeText(index)"
                >
                  <i class="fa fa-trash-o"></i>
                </div>
              </li>
            </ul>
          </div>
          <div style="height:50px;"></div>
          <i class="fa fa-angle-left toPre changPage" @click="toLeft()"> </i>
          <i class="fa fa-angle-right toNext changPage" @click="toRight()"> </i>
        </div>
      </form>
    </el-dialog>
  </div>
</template>
<script>
import imageLabel from "../../../common/imageLabel.js";
export default {
  props: [
    "textName",
    "imgS",
    "imgIdYN",
    "list",
    "decide",
    "discriminate",
    "labelStatus",
    "flag",
    "checkout"
  ],
  data() {
    return {
      verify: true,
      imgList: [],
      judgeIndex: ""
    };
  },
  watch: {
    "$parent.imgS"() {
      this.imgList = this.list;
      this.judgeIndex = 0;
      this.badge();
    },
    "$parent.imgShow"() {
      if (this.$parent.imgShow) {
        this.imgList = this.list;
        this.judgeIndex = 0;
        this.badge();
      }
    }
  },
  components: {},
  computed: {},
  mounted() {},
  methods: {
    achieve(index) {
      this.judgeIndex = index + 1;
    },
    toLeft() {
      // this.imgS =
      //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552909133930&di=ebca1193695080e5daecab1e23d66eb5&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F019c955574edcc00000043830f3171.jpg%401280w_1l_2o_100sh.jpg";
      this.$parent.goLeft();
      //this.badge();
    },
    toRight() {
      this.$parent.goRight();
    },
    setImgLabel(data) {
      let vm = this;
      if (this.verify) {
        data.labelStatus = this.labelStatus;
        data.flag = this.flag;
        vm.api
          .post(`./manage/service/imglabel/label`, data)
          .then(function(response) {
            if (response.status == 200) {
              vm.judgeIndex = 0;
              vm.$message({
                message: "标注成功。",
                type: "success"
              });
              vm.$parent.getFL();

              if (vm.decide == "no") {
                vm.$parent.goRight();
                vm.$parent.getBT();
              } else {
                vm.$parent.nextBtn("最后一张");
              }
              vm.verify = true;
            }
          })
          .catch(function(error) {
            vm.verify = true;
          });
      }
    },
    removeText(index) {
      this.imgList.splice(index, 1);
      this.badge();
    },
    changgeText() {
      this.badge();
    },
    badge() {
      let vm = this;
      $(function() {
        $("#test2").mousemove(function(e) {
          var image = new Image();
          image.src = vm.imgS;

          var w = image.width,
            h = image.height;
          var w2 = $("#test2")[0].scrollWidth,
            h2 = $("#test2")[0].scrollHeight;

          var x = $("#test2").offset().left;
          var y = $("#test2").offset().top;

          var xmin = (e.clientX - x) * (w / w2);
          var ymin = (e.clientY - y) * (h / h2);
          $("#test").text(Math.round(xmin) + "px;" + Math.round(ymin) + "px;");
          //$("#test").text(Math.round(xmin)+"px;"+Math.round(ymin)+"px;"+"e.clientX:"+e.clientX+";"+"e.clientY:"+e.clientY+";");
          //$("#test").text(xmin+"px;"+ymin+"px;"+"e.clientX:"+e.clientX+";"+"e.clientY:"+e.clientY+";"+"x:"+x+";"+"y:"+y+";"+"w:"+w+";"+"h:"+h+";"+"w2:"+w2+";"+"h2:"+h2+";");
        });
        var imgLabel = imageLabel.imageLabel;
        imgLabel({
          //img: require("http://img1.imgtn.bdimg.com/it/u=873265023,1618187578&fm=26&gp=0.jpg"),
          img: vm.imgS,
          only: false,
          editPop: true, //修改内容弹窗
          data: vm.imgList,
          dataInit: function(data) {
            vm.imgList = data;
          },
          close: function(d) {
            if (d.length) {
              alert(JSON.stringify(d));
            }
            // return true;
          },
          judgeLabel: function() {
            return vm.discriminate;
            //return vm.discriminate;
          },
          clickArea: function() {
            //点击选区事件
          },
          edit: function($d) {},
          startArea: function() {
            //alert(1);
            //开始绘制事件
          },
          getIndex: function(item, data) {
            for (var i = 0; i < data.length; i++) {
              if (
                data[i].x == JSON.parse($(item).attr("data-json")).x &&
                data[i].y == JSON.parse($(item).attr("data-json")).y
              ) {
                vm.judgeIndex = i + 1;
              }
            }
          },
          warning: function() {
            vm.$message.error("最多支持15个标注信息");
          },

          confirm: function(d) {
            //确定按钮
            var image = new Image();
            image.src = vm.imgS;
            var w = image.width,
              h = image.height;
            var w2 = $("#test2")[0].scrollWidth,
              h2 = $("#test2")[0].scrollHeight;

            var data = [];
            var $drops = $(".imageLabel-imgdrop");
            //比例
            var wb = w / w2;
            var hb = h / h2;
            //图片边界
            var x = $("#test2").offset().left;
            var y = $("#test2").offset().top;

            //var ff = $content.offset().left;
            var obj2;
            $drops.each(function(index, obj) {
              var w2 = $(obj)[0].scrollWidth,
                h2 = $(obj)[0].scrollHeight;
              obj2 = {
                //标注边界
                x: $(obj).offset().left,
                y: $(obj).offset().top,
                //标注框大小
                w: $(obj)[0].getBoundingClientRect().width,
                h: $(obj)[0].getBoundingClientRect().height
              };

              var data1 = {
                xmin: Math.round((obj2.x - x) * wb),
                ymin: Math.round((obj2.y - y) * hb),
                xmax: Math.round((obj2.x - x + obj2.w) * wb),
                ymax: Math.round((obj2.y - y + obj2.h) * hb)
              };
              data.push(data1);
            });
            var imgData = {};
            imgData.imgLabelData = data;
            imgData.imgLabelCoordinate = d;
            imgData.width = w;
            imgData.height = h;
            imgData.imgId = vm.imgIdYN;
            // 提交数据
            var jjj = false;

            if (vm.imgList.length > 0) {
              vm.setImgLabel(imgData);
              vm.verify = false;
            }

            return true;
          }
        });
      });
    }
  }
};
</script>
<style >
@import "../../../../assets/styles/edit";
@import "../../../../assets/styles/imageLabel";
</style>
<style scoped lang="less">
.imgTab /deep/.el-dialog__header {
  padding: 10px 20px !important;
  span {
    font-weight: 500 !important;
  }
  .el-dialog__title {
    font-size: 16px !important;
  }
  .el-dialog__headerbtn {
    top: 12px;
  }
}
.imgRight-li-centerY /deep/.el-input__inner {
  border: 1px solid #409eff !important;
}
.imgTab /deep/.el-dialog__body {
  height: 420px;
  padding: 0px 0px 20px 20px !important;
}
.imgTab {
  .changPage {
    position: absolute;
    top: 210px;
    font-size: 55px;
    color: #fff;
    cursor: pointer;
  }
  .toPre {
    left: -70px;
  }
  .toNext {
    right: -70px;
  }
  .imgRight {
    float: left;
    width: 350px;
    margin-left: 20px;
    height: 420px;
    .imgRight-top {
      margin-top: 20px;
      height: 350px;
      .imgRight-top-ul {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        .imgRight-top-ul-li {
          overflow: hidden;
          margin-bottom: 18px;
          .imgRight-li-left {
            float: left;
            width: 32px;
            height: 32px;
            background: #f0f2f5;
            .imgRight-li-content {
              width: 20px;
              height: 20px;
              border-radius: 20px;
              background: #f15858;
              color: #fff;
              line-height: 20px;
              text-align: center;
              margin-top: 6px;
              margin-left: 6px;
            }
          }
          .imgRight-li-centerY {
            float: left;
            margin-left: 5px;
            width: 255px;
            height: 32px;
          }
          .imgRight-li-centerN {
            float: left;
            margin-left: 5px;
            width: 255px;
            height: 32px;
          }
          .imgRight-li-right {
            background: #f56c6c;
            width: 32px;
            height: 32px;
            float: left;
            color: #fff;
            line-height: 32px;
            text-align: center;
            font-size: 16px;
            cursor: pointer;
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>