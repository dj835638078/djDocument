<template>
  <div class="viewPicture">
    <!-- 提示语-->
    <el-dialog
      title="提示"
      :visible.sync="operatePoint"
      width="430px"
      top="10vh"
    >
      <div class="task-title">
        <div class="el-icon-warning title-img"></div>
        <div class="title-name">{{ titleName }}</div>
      </div>
      <div class="task-point">{{ titleDesc }}</div>
      <div class="task-btn">
        <div class="task-btn-N" @click="operateBtnN">取消</div>
        <div class="task-btn-Y" @click="operateBtnY">确定</div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="$parent.imgInfoPassFlag"
      width="740px"
      top="10vh"
      @close="closeDialog"
    >
      <div class="viewPictureBox">
        <!--头部操作组-->
        <div class="viewPictureHeader">
          <div class="selectBox">
            <el-select
              v-model="$parent.classifyChildren"
              placeholder="分类至"
              @change="classifyTo"
            >
              <el-option
                v-for="(item, index) in imgInfoPassFileList"
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

        <i class="fa fa-angle-left toPre changPage" @click="toChange('上')">
        </i>
        <i class="fa fa-angle-right toNext changPage" @click="toChange('下')">
        </i>
        <div class="imgBox">
          <span
            style="font-size: 0;width: 700px;height: 400px;display: table-cell;text-align: center;vertical-align: middle;"
          >
            <img
              :src="imgUrlPass"
              :style="styleObj"
              style="max-width:700px;max-height:400px"
            />
          </span>
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
      titleName: "确定要把图片删除吗？",
      titleDesc: "删除后图片不可恢复",
      operatePoint: false
    };
  },
  props: ["imgInfoPassFileList", "imgUrlPass"],
  mounted() {
    this.$set(this.styleObj, "transform", "rotate(0deg)");
  },
  watch: {
    imgUrlPass(newVal, oldVal) {
      this.$set(this.styleObj, "transform", "rotate(0deg)");
    }
  },
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
    //分类至
    classifyTo(val) {
      this.$emit("detailClassifyTo", val);
    },
    //删除操作
    deleteBtn() {
      // this.$emit("detailDelete");
      this.operatePoint = true;
    },
    closeDialog() {
      this.$set(this.styleObj, "transform", "rotate(0deg)");
      this.$parent.classifyChildren = "";
    },
    //上一张
    toChange(flag) {
      this.$emit("toChange", flag);
    },
    operateBtnN() {
      this.operatePoint = false;
    },
    operateBtnY() {
      this.operatePoint = false;
      this.$emit("detailDelete");
    }
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
  .task-title {
    width: 100%;
    height: 22px;
    text-align: left;
    line-height: 22px;
    font-size: 14px;
    margin-top: 7px;
    margin-bottom: 22px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    div {
      float: left;
    }
    .title-img {
      color: #e6a23c;
      display: inline-block;
      margin-right: 10px;
      font-size: 21px;
    }
  }
  .task-point {
    height: 30px;
    text-align: left;
    color: rgba(0, 0, 0, 0.55);
    font-size: 12px;
    margin-left: 30px;
    div {
      height: 15px;
    }
  }
  .input-box {
    margin-top: 5px;
    min-height: 28px;
    position: relative;
    .el-input--small {
      font-size: 12px;
    }
  }
  .task-btn {
    margin: 20px 0 5px 0;
    overflow: hidden;
    .task-btn-N,
    .task-btn-Y {
      float: right;
      width: 65px;
      height: 28px;
      cursor: pointer;
      text-align: center;
      line-height: 28px;
      font-size: 12px;
      border-radius: 2px;
    }
    .task-btn-N {
      color: rgba(0, 0, 0, 0.65);
      border: 1px solid rgba(217, 217, 217, 1);
      margin-left: 8px;
    }
    .task-btn-Y {
      background: #597ef7;
      color: #fff;
    }
  }
  .viewPictureBox {
    width: 100%;
    height: 400px;
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
      top: 170px;
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
        // width: 100%;
        // height: 100%;
      }
    }
  }
}
</style>
