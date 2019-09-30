<template>
  <div class="viewPicture">
    <el-dialog :visible.sync="imgInfoPass.showFlag" width="730px" top="10vh" @close = "closeDialog">
      <div class="viewPictureBox">
        <!--头部操作组-->
        <div class="viewPictureHeader">
          <div class="selectBox">
            <el-select v-model="value" placeholder="分类至">
              <el-option
                v-for="(item,index) in imgInfoPass.fileList"
                  :key="index"
                  :label="item.classifyName"
                  :value="item.classifyId"
              >
              </el-option>
            </el-select>
          </div>
          <div class="operateBtn" @click="revolveBtn">
            <i class="fa fa-refresh"></i> 旋转
          </div>
          <i
            class="el-icon-delete operateBtn operateBtnDel"
            @click="deleteBtn"
          ></i>
        </div>

        <i class="fa fa-angle-left toPre changPage" @click="toChange(imgInfoPass.imgInfo.materiaiId,'上')"> </i>
        <i class="fa fa-angle-right toNext changPage" @click="toChange(imgInfoPass.imgInfo.materiaiId,'下')"> </i>
        <div class="imgBox">
          <img
            :src="imgInfoPass.imgInfo.imgUrl"
            :style="styleObj"
          />
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "@/api";
export default {
  name: "viewPicture",
  data() {
    return {
      styleObj: {
        transform: "rotate(0deg)"
      },
      rotateNum: 0,

      value: "",
      options: []
    };
  },
  props: ["imgInfoPass"],
  mounted() {},
  watch: {},
  components: {},
  computed: {},
  methods: {
    //旋转操作
    revolveBtn() {
      let rotateStrNum = this.styleObj.transform.split("deg")[0].split("(")[1];
      this.rotateNum = +rotateStrNum + 90;
      let finalStr = "rotate(" + this.rotateNum + "deg)";
      this.$set(this.styleObj, "transform", finalStr);
    },
    closeDialog(){
      this.$set(this.styleObj, "transform", "rotate(0deg)");
    },
    //删除操作
    deleteBtn() {},
    //上一张
    toChange(materiaiId,flag) {
      this.$emit("toChange", materiaiId,flag);
    },
  }
};
</script>

<style scoped lang="less">
.viewPicture /deep/.el-dialog__header {
  height: 35px;
  padding: 10px 20px !important;
  span {
    font-weight: 500 !important;
  }
  .el-dialog__title {
    display: none;
  }
  .el-dialog__headerbtn {
    top: 12px;
  }
}
.viewPicture /deep/.el-dialog__body {
  padding: 20px !important;
}
.viewPicture {
  .viewPictureBox {
    width: 100%;
    height: 500px;
    position: relative;
    .viewPictureHeader {
      overflow: hidden;
      width: 300px;
      position: absolute;
      top: -65px;
      .selectBox {
        float: left;
        width: 100px;
      }
      .operateBtn {
        float: left;
        width: 70px;
        height: 32px;
        line-height: 32px;
        background: #f0f2f5;
        margin-left: 8px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
      }
      .operateBtnDel {
        background: rgba(245, 108, 108, 1);
        color: #fff;
        width: 32px;
        height: 32px;
        font-size: 16px;
      }
    }
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
    .imgBox {
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
