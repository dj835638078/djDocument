<template>
  <div class="shiftDialog">
    <el-dialog
      title="请假换班"
      top="100px"
      :visible.sync="$parent.dialogShow"
      width="782px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="shiftDialog-box">
        <div style="padding: 0 26px;">
          <div class="shiftDialog-box-top">
            <div>发起申请</div>
          </div>
          <div class="radio-box">
            <div class="radio-box-left">
              <span style="color:red;">*</span>类别：
            </div>
            <div class="radio-box-right">
              <el-radio
                v-model="applyType"
                label="leave"
                style="margin-left:40px;"
                >请假</el-radio
              >
              <el-radio
                v-model="applyType"
                label="exchange"
                v-if="tools.setRight('shift')"
                >换班</el-radio
              >
            </div>
          </div>
          <div class="radio-box" v-if="applyType == 'leave'">
            <div class="radio-box-left">
              <span style="color:red;">*</span>明细：
            </div>
            <div class="form-box-right">
              <div class="form-box-right-box">
                <div class="form-title">
                  <div class="form-title-type">类型</div>
                  <div class="form-title-day">日期</div>
                  <div class="form-title-shifts">班次</div>
                  <div class="form-title-beginTime">开始时间</div>
                  <div class="form-title-endTime">结束时间</div>
                  <div class="form-title-hour">小时</div>
                  <div class="form-title-btn">
                    操作
                  </div>
                </div>
              </div>
              <ul class="form-box-right-box">
                <li
                  class="form-title"
                  style="height:32px;margin-bottom:14px"
                  v-for="(item, index) in shiftList"
                  :key="index"
                >
                  <div class="form-title-type">
                    <el-select v-model="item.applyClass" placeholder="类型">
                      <el-option
                        v-for="itema in lookUp.SHIFT_APPLY_CLASS_1"
                        :key="itema.itemCode"
                        :label="itema.itemName"
                        :value="itema.itemCode"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div class="form-title-day">
                    <el-date-picker
                      v-model="item.applyShiftDate"
                      type="date"
                      @change="setShifts(item.applyShiftDate, index)"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </div>
                  <div
                    class="form-title-shifts"
                    style="line-height: 32px;text-align:center;width:30px;height:32px;"
                  >
                    <!-- v-if="item.applyShiftType"-->
                    <span v-if="item.applyShiftType">{{
                      tools.setShiftType(item.applyShiftType)
                    }}</span>
                  </div>
                  <div class="form-title-beginTime">
                    <el-time-picker
                      v-model="item.beginTime"
                      placeholder="请选择"
                      @change="setTime(item)"
                    >
                    </el-time-picker>
                  </div>
                  <div class="form-title-endTime">
                    <el-time-picker
                      v-model="item.endTime"
                      placeholder="请选择"
                      @change="setTime(item)"
                    >
                    </el-time-picker>
                  </div>
                  <div class="form-title-hour">
                    <el-input
                      v-model="item.shiftHour"
                      placeholder="请输入"
                      @change="abcd(item.shiftHour, index)"
                    ></el-input>
                  </div>
                  <div class="form-title-btn" style="height:32px;">
                    <div
                      v-if="index != 0"
                      class="deleteBtn el-icon-delete"
                      @click="deleteBtn(index)"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="shift-add" v-if="applyType == 'leave'">
            <div class="query" style="margin-left:58px;" @click="addShift">
              添加
            </div>
            <div class="shift-tips" style="color:#F5A623;">
              （提示：1.请假最少是半小时；
              2.选择请假时间后，需手动输入请假小时。）
            </div>
          </div>
          <div
            class="radio-box"
            style="margin-top:10px;"
            v-if="applyType == 'exchange'"
          >
            <div class="radio-box-left" style="width:80px;line-height:32px;">
              <span style="color:red;">*</span>换班日期：
            </div>
            <div
              class="form-box-right"
              style="border:none;overflow:hidden;width:640px;background:none;"
            >
              <div style="width:40%;float:left;">
                <el-date-picker
                  v-model="shiftDate"
                  type="date"
                  placeholder="选择日期"
                  @change="shiftDateSee()"
                >
                </el-date-picker>
              </div>

              <div style="float:right;width:calc(50% - 42px)">
                <el-input v-model="applyShiftType" :disabled="true"> </el-input>
              </div>
              <div style="float:right;line-height:32px;">班次：</div>
            </div>
          </div>
          <div
            v-if="applyType == 'exchange'"
            style="font-size:12px;color:#F5A623;line-height:21px;padding-left: 85px;text-align:left;"
          >
            （提示：1.换班日期为一天；2.换班日期指申请人需要换班的日期。）
          </div>
          <div
            class="radio-box"
            style="margin-top:10px;"
            v-if="applyType == 'exchange'"
          >
            <div class="radio-box-left" style="width:80px;line-height:32px;">
              <span style="color:red;">*</span>换班员工：
            </div>
            <div
              class="form-box-right"
              style="border:none;overflow:hidden;width:640px;background:none;"
            >
              <!-- :disabled="!shiftDate"-->
              <el-select
                multiple
                :multiple-limit="5"
                v-model="firstTaskAccount"
                filterable
                placeholder="请选择换班日期后，再选择换班员工"
              >
                <el-option
                  v-for="item in options"
                  :key="item.fwmAccount"
                  :label="item.userName"
                  :value="item.fwmAccount"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="radio-box" style="margin-top:10px;">
            <div class="radio-box-left">
              <span style="color:red;">*</span>理由：
            </div>
            <div
              class="form-box-right"
              style="border:none;overflow:hidden;"
              :style="{
                marginLeft: applyType == 'exchange' ? '37px' : '',
                width: applyType == 'exchange' ? '643px' : ''
              }"
            >
              <el-input
                type="textarea"
                placeholder="支持最多输入200字"
                v-model="applyReason"
                :rows="3"
                maxlength="200"
                show-word-limit
              >
              </el-input>
            </div>
          </div>
          <div class="radio-box" style="margin-top:10px;">
            <div class="radio-box-left">
              <span style="color:#f5f7fa;">*</span>附件：
            </div>
            <div
              class="form-box-right"
              :style="{
                marginLeft: applyType == 'exchange' ? '37px' : '',
                width: applyType == 'exchange' ? '643px' : ''
              }"
              style="border:none;overflow:hidden;background:none;"
            >
              <div style="float:left;">
                <el-upload
                  class="avatar-uploader"
                  action="./complex/service/file/upload?fileType=public"
                  :show-file-list="false"
                  :headers="myHeaders"
                  :on-success="handleAvatarSuccess0"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="imageUrl0"
                    :src="imageUrl0"
                    class="avatar"
                    @click="removeImg(0)"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    style="background:#fff"
                  ></i>
                </el-upload>
              </div>
              <div style="float:left;margin-left:12px;">
                <el-upload
                  class="avatar-uploader"
                  action="./complex/service/file/upload?fileType=public"
                  :show-file-list="false"
                  :headers="myHeaders"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="imageUrl1"
                    :src="imageUrl1"
                    class="avatar"
                    @click="removeImg(1)"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    style="background:#fff"
                  ></i>
                </el-upload>
              </div>
              <div style="float:left;margin-left:12px;">
                <el-upload
                  class="avatar-uploader"
                  action="./complex/service/file/upload?fileType=public"
                  :show-file-list="false"
                  :headers="myHeaders"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="imageUrl2"
                    :src="imageUrl2"
                    class="avatar"
                    @click="removeImg(2)"
                  />
                  <i
                    v-else
                    class="el-icon-plus avatar-uploader-icon"
                    style="background:#fff"
                  ></i>
                </el-upload>
              </div>
              <div
                style="float:left;margin-left:12px;line-height:90px;font-size:12px;color:rgba(0,0,0,0.45);"
              >
                支持上传jpg,png,jpeg,gif格式，支持上传3张哦
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="overflow:hidden;padding-top:20px;background: #f5f7fa;">
        <div
          class="query footerAdd"
          @click="determine"
          style="margin-bottom:20px;margin-left:310px;"
        >
          确定
        </div>
        <div class="blank" @click="cancel">
          取消
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="提示"
      :visible.sync="determineShow"
      width="400px"
      top="250px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <p style="margin:20px 0;text-align:center;">
        请确认填写的信息真实无误~
      </p>
      <div style="overflow:hidden;padding-top:20px;background: #f5f7fa;">
        <div
          class="query footerAdd"
          @click="shiftY"
          style="margin-bottom:20px;margin-left:125px;"
        >
          确定
        </div>
        <div class="blank" @click="shiftN">
          取消
        </div>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
        <div class="query footerAdd" @click="shiftY">
          确定
        </div>
        <div class="blank" @click="shiftN">
          取消
        </div>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      shiftDate: "",
      firstTaskAccount: [],
      applyShiftType: "",
      determineShow: false,
      applyType: "leave",
      applyReason: "",
      imageUrl0: "",
      imageUrl1: "",
      imageUrl2: "",
      graImgId0: "",
      graImgId1: "",
      graImgId2: "",
      shiftList: [
        {
          applyClass: "",
          applyShiftDate: "",
          applyShiftType: "",
          beginTime: "",
          endTime: "",
          shiftHour: "",
          workHour: ""
        }
      ],
      options: []
    };
  },
  watch: {
    "$parent.dialogShow"() {
      if (this.$parent.dialogShow) {
        this.applyType = "leave";
        this.resetData();
      }
    },
    applyType() {
      this.resetData();
    }
  },
  computed: {
    ...mapState(["userList", "lookUp"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  props: [],
  components: {},
  mounted() {},
  methods: {
    shiftDateSee() {
      this.options = [];
      this.firstTaskAccount = [];
      this.applyShiftType = "";
      if (this.shiftDate) {
        let data = {
          shiftDate: this.shiftDate
        };
        this.api
          .post(`./complex/service/shiftex/findUser`, data)
          .then(response => {
            if (response.status == 200) {
              this.options = response.data;
            }
          })
          .catch(error => {});
        this.api
          .post(`./complex/service/shift/findday`, data)
          .then(response => {
            if (response.status == 200) {
              this.applyShiftType = this.tools.setShiftType(
                response.data.shiftType
              );
            }
          })
          .catch(error => {});
      }
    },
    resetData() {
      this.firstTaskAccount = [];
      this.applyShiftType = "";
      this.determineShow = false;
      this.shiftDate = "";
      this.shiftList = [
        {
          applyClass: "",
          applyShiftDate: "",
          applyShiftType: "",
          beginTime: "",
          endTime: "",
          shiftHour: "",
          workHour: ""
        }
      ];
      this.applyReason = "";
      this.imageUrl0 = "";
      this.imageUrl1 = "";
      this.imageUrl2 = "";
      this.graImgId0 = "";
      this.graImgId1 = "";
      this.graImgId2 = "";
    },
    setShifts(time, index) {
      if (time) {
        //alert(11);
        let data = {
          shiftDate: time
        };
        this.api
          .post(`./complex/service/shift/findday`, data)
          .then(response => {
            if (response.status == 200) {
              this.shiftList[index].applyShiftType = response.data.shiftType;
              this.shiftList[index].workHour = response.data.workHour;
            }
          })
          .catch(error => {});
      }
    },
    deleteBtn(index) {
      this.shiftList.splice(index, 1);
    },
    //添加换班
    addShift() {
      let obj = {
        applyClass: "",
        applyShiftDate: "",
        applyShiftType: "",
        beginTime: "",
        endTime: "",
        shiftHour: "",
        workHour: ""
      };
      this.shiftList.push(obj);
    },
    handleAvatarSuccess0(res, file, index) {
      this.imageUrl0 = URL.createObjectURL(file.raw);
      this.graImgId0 = res[0].fileId;
    },
    handleAvatarSuccess1(res, file, index) {
      this.imageUrl1 = URL.createObjectURL(file.raw);
      this.graImgId1 = res[0].fileId;
    },
    handleAvatarSuccess2(res, file, index) {
      this.imageUrl2 = URL.createObjectURL(file.raw);
      this.graImgId2 = res[0].fileId;
    },
    beforeAvatarUpload(file) {
      const flag = file.name
        .split(".")
        .pop()
        .toLowerCase();
      let arr = ["jpg", "png", "jpeg", "gif"];
      let isTYPE;
      for (var i = 0; i < arr.length; i++) {
        if (flag === arr[i]) {
          isTYPE = true;
          break;
        } else {
          isTYPE = false;
        }
      }
      if (!isTYPE) {
        this.$message.error("上传文件只能是jpg,png,jpeg,gif格式!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isTYPE && isLt2M;
    },
    removeImg(index) {
      if (index == 0) {
        this.imageUrl0 = "";
        this.graImgId0 = "";
      }
      if (index == 1) {
        this.imageUrl1 = "";
        this.graImgId1 = "";
      }
      if (index == 2) {
        this.imageUrl2 = "";
        this.graImgId2 = "";
      }
    },
    determine() {
      if (this.applyType == "leave") {
        let detailed = [];
        for (let i = 0; i < this.shiftList.length; i++) {
          if (
            this.shiftList[i].applyClass &&
            this.shiftList[i].applyShiftDate &&
            this.shiftList[i].beginTime &&
            this.shiftList[i].endTime &&
            this.shiftList[i].shiftHour
          ) {
            detailed.push(true);
          } else {
            detailed.push(false);
          }
        }
        for (let j = 0; j < detailed.length; j++) {
          if (!detailed[j]) {
            this.$message({
              message: `请将明细第${j + 1}条填写完整`,
              type: "error"
            });
            return;
          }
        }
      }
      if (this.applyType == "exchange") {
        if (!this.shiftDate) {
          this.$message({
            message: `请选择换班日期`,
            type: "error"
          });
          return;
        }
        if (this.firstTaskAccount.length < 1) {
          this.$message({
            message: `请选择换班员工`,
            type: "error"
          });
          return;
        }
      }

      if (!this.applyReason) {
        this.$message({
          message: `请填写理由`,
          type: "error"
        });
        return;
      }
      this.determineShow = true;
    },
    shiftY() {
      let imgId = [];
      if (this.graImgId0) {
        imgId.push(this.graImgId0);
      }
      if (this.graImgId1) {
        imgId.push(this.graImgId1);
      }
      if (this.graImgId2) {
        imgId.push(this.graImgId2);
      }
      if (this.applyType == "leave") {
        let data = {
          applyType: this.applyType,
          applyReason: this.applyReason,
          applyImgFileId: imgId.join(","),
          shiftReviseItemVOS: this.shiftList
        };
        this.api
          .post(`./complex/service/leave/apply`, data)
          .then(response => {
            if (response.status == 200) {
              this.determineShow = false;
              this.$parent.dialogShow = false;
              this.$parent.getFindMyApply();
            }
          })
          .catch(error => {});
      }
      if (this.applyType == "exchange") {
        let data = {
          shiftDate: this.shiftDate,
          firstTaskAccount: this.firstTaskAccount.join(","),
          applyImgFileId: imgId.join(","),
          applyReason: this.applyReason
        };
        this.api
          .post(`./complex/service/shiftex/apply`, data)
          .then(response => {
            if (response.status == 200) {
              this.determineShow = false;
              this.$parent.dialogShow = false;
              this.$parent.getFindMyApply();
            }
          })
          .catch(error => {});
      }
    },
    shiftN() {
      this.determineShow = false;
    },
    cancel() {
      this.$parent.dialogShow = false;
    },
    abcd(value, index) {
      if (value > 8) {
        this.$message({
          message: "请假小时数不能大于8小时",
          type: "error"
        });
        this.shiftList[index].shiftHour = "";
      } else {
        if ((value * 10) % 5 != 0) {
          this.$message({
            message: "请假小时数只能是0.5的倍数",
            type: "error"
          });
          this.shiftList[index].shiftHour = "";
        }
      }
    },
    setTime(item) {
      if (item.endTime) {
        if (item.endTime < item.beginTime) {
          item.endTime = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.shiftDialog /deep/ .el-dialog__footer {
  background: #f5f7fa;
}
.shiftDialog /deep/.el-dialog__title {
  font-size: 22px;
}
.shiftDialog /deep/ .el-dialog__body {
  padding: 0px;
}
.shiftDialog /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner,
.el-select {
  width: 100%;
}
.shiftDialog /deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.shiftDialog {
  .shift-add {
    overflow: hidden;
    margin-top: 9px;
    .shift-tips {
      float: left;
      line-height: 32px;
      font-size: 12px;
      color: rgba(134, 135, 137, 1);
      margin-left: 14px;
    }
  }

  .shiftDialog-box {
    width: 100%;
    overflow: hidden;
    background: rgba(245, 247, 250, 1);
    .shiftDialog-box-top {
      div {
        height: 60px;
        text-align: left;
        border-bottom: 1px solid rgba(232, 230, 230, 1);
        font-size: 18px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #2a2a2a;
        line-height: 60px;
      }
    }
    .radio-box {
      overflow: hidden;
      .radio-box-left {
        width: 50px;
        float: left;
        height: 40px;
        line-height: 40px;
      }
      .radio-box-right {
        float: left;
        line-height: 40px;
      }
      .form-box-right {
        float: left;
        width: 670px;
        margin-left: 8px;
        border: 1px solid #dcdfe6;
        border-radius: 2px;
        background: #fff;
        .form-box-right-box {
          overflow: hidden;
          padding: 15px 15px 0px 15px;
          .form-title {
            div {
              float: left;
              margin-right: 10px;
            }
            .form-title-type {
              width: 83px;
            }
            .form-title-day {
              width: 128px;
            }
            .form-title-shifts {
              width: 30px;
            }
            .form-title-beginTime {
              width: 113px;
            }
            .form-title-endTime {
              width: 113px;
            }
            .form-title-hour {
              width: 73px;
            }
            .form-title-btn {
              width: 40px;
              margin-right: 0px;
              .deleteBtn {
                background: rgba(245, 108, 108, 1);
                padding: 5px;
                color: #fff;
                margin-top: 3px;
                margin-left: 3px;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
</style>