<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="rowkey"
        align="left"
        :show-overflow-tooltip="true"
        width="180"
      >
        <template slot-scope="scope">
          <span
            style="color:#00CDCA;cursor:pointer;"
            @click="goDetail(scope.row.checkId)"
            >{{ scope.row.rowkey }}</span
          >
        </template>
      </el-table-column>
      <el-table-column
        label="标题"
        align="left"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.contentTitle">{{
            scope.row.contentTitle
          }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类型"
        align="left"
        :show-overflow-tooltip="true"
        width="80"
      >
        <template slot-scope="scope">
          <span v-text="tools.getType(scope.row.checkType)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="来源"
        align="left"
        :show-overflow-tooltip="true"
        width="100"
      >
        <template slot-scope="scope">
          <span v-text="$parent.setDataName(scope.row.dataSource)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="文章类型"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setGroup(scope.row.graGenre)"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="来源"
        align="left"
        :show-overflow-tooltip="true"
        width="100"
      >
        <template slot-scope="scope">
          <span v-text="$parent.setDataName(scope.row.dataSource)"></span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="审核人员"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.processAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核时间"
        align="left"
        :show-overflow-tooltip="true"
        width="150"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.processDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核结果"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.processResult == 'fail'">不通过</span>
          <span v-else>通过</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核人员组别"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.getRegionName(scope.row.verifyGroup)"></span>
        </template>
      </el-table-column>

      <el-table-column
        label="质检时间"
        align="left"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.checkDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检结果"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.checkResult == 'fail'">错误</span>
          <span v-else>正确</span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检人员"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.checkAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检来源"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.checkChannel == 1">自检</span>
          <span v-else>客检</span>
        </template>
      </el-table-column>
      <el-table-column
        label="错误类型"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            v-text="tools.setErrorRefuseType(scope.row.errorType)"
            v-if="scope.row.processResult == 'fail'"
          ></span>
          <span v-text="tools.setErrorType(scope.row.errorType)" v-else></span>
        </template>
      </el-table-column>
      <el-table-column
        label="错误程度"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setErrorLevel(scope.row.errorLevel)"></span>
        </template>
      </el-table-column>
      <!-- <el-table-column
        label="是否正确"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.checkResult == 'pass'">正确</span>
          <span v-else-if="scope.row.checkResult == 'fail'">不正确</span>
          <span v-else>-</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="问题点描述"
        align="left"
        width="90"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.errorDesc">{{ scope.row.errorDesc }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column
        label="问题点截图"
        align="left"
        width="100"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span
            @click="viewImgBtn(scope.row.graImgId)"
            style="cursor:pointer;color:#00CDCA"
            v-if="scope.row.graImgId"
            title="查看图片"
            ><img src="../../../../static/img.svg"
          /></span>
          <span
            v-else
            @click="uploadImg(scope.row.checkId)"
            style="cursor:pointer;color:#00CDCA"
            >上传图片</span
          >
        </template>
      </el-table-column>
    </el-table>
    <div>
      <el-dialog
        :visible.sync="uploadImgShow"
        :close-on-click-modal="false"
        title="上传图片"
        width="640px"
        top="10vh"
      >
        <div style="height:180px;text-align:center;">
          <el-upload
            class="avatar-uploader"
            action="./complex/service/file/upload?fileType=public"
            :show-file-list="false"
            :headers="myHeaders"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <p style="text-align:center;">
          点击上传图片,图片大小不能超过<span style="color:#e6ae3c">2M</span>
        </p>
        <div style="padding:40px 0;">
          <div
            class=" query"
            style="margin-left:220px;margin-right:20px;"
            @click="uploadYes"
            v-if="this.graImgId && this.imageUrl"
          >
            确定
          </div>
          <div
            class="release"
            style="margin-left:220px;margin-right:20px;"
            v-else
          >
            确定
          </div>
          <div class="blank" @click="uploadNo">取消</div>
        </div>
      </el-dialog>
    </div>
    <ViewImg :imgUrl="imgUrl" :imgName="imgName" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ViewImg from "../../public/viewImg";
export default {
  data() {
    return {
      uploadImgShow: false,
      graImgId: "",
      imgShow: false,
      imgUrl: "",
      imgName: "",
      imageUrl: "",
      checkId: ""
    };
  },
  computed: {
    ...mapState(["lookUp", "userList"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  props: ["tableData"],
  components: { ViewImg },
  mounted() {},
  methods: {
    //设置质检来源名称
    setGroupName(data) {
      if (data) {
        for (var key in this.lookUp.VERIFY_GROUP) {
          if (data == this.lookUp.VERIFY_GROUP[key].itemCode) {
            return this.lookUp.VERIFY_GROUP[key].itemName;
          }
        }
      }
    },
    uploadYes() {
      if (this.graImgId && this.imageUrl) {
        let data = {
          checkId: this.checkId,
          graImgId: this.graImgId
        };
        this.api
          .post(
            `./complex/service/checkEntry/graphics/updateImg?currentPage=${
              this.currentPage
            }&pageSize=${this.pageSize}`,
            data
          )
          .then(response => {
            if (response.status == 200) {
              this.$parent.getInformation();
              this.uploadImgShow = false;
            }
          })
          .catch(error => {});
      } else {
      }
    },
    uploadNo() {
      this.uploadImgShow = false;
    },
    //上传图片
    uploadImg(id) {
      this.checkId = id;
      this.imageUrl = "";
      this.graImgId = "";
      this.uploadImgShow = true;
    },
    //查看图片
    viewImgBtn(val) {
      //this.imgName = val.verifyTitle;
      this.imgUrl =
        location.origin + `/complex/publicservice/file/download?fId=${val}`;
      this.imgShow = true;
    },
    goDetail(id) {
      this.$router.push({
        name: "imageTextAdd",
        params: { type: id }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.graImgId = res[0].fId;
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
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isTYPE && isLt2M;
    }
  }
};
</script>

<style scoped lang="less">
.information-table /deep/ .avatar {
  width: 150px !important;
  height: 150px !important;
}
.information-table /deep/ .avatar-uploader-icon {
  width: 150px !important;
  height: 150px !important;
  line-height: 150px !important;
}
</style>