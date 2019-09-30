<template>
  <div class="imageText">
    <div class="imageText-top">
      <div class="imageText-top-name">
        质检详情录入
      </div>
    </div>
    <div class="imageText-search">
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:75px;">业务来源：</div>
        <div class="search-one-box-input">
          <el-select
            v-model="dataSource"
            placeholder="请选择"
            :clearable="true"
          >
            <el-option
              v-for="item in lookUp.DATASOURCE_WX_SP"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:76px;">质检时间：</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="startDate"
            type="datetime"
            placeholder="选择质检时间"
          >
          </el-date-picker>
        </div>
        <div class="separate">-</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="endDate"
            type="datetime"
            placeholder="选择质检时间"
          >
          </el-date-picker>
        </div>
      </div>
      <div style="float:right">
        <div class="query interval" @click="query">查询</div>
        <div class="release" v-if="!dataSource && !startDate && !endDate">
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
      </div>
    </div>
    <!--审核员进来进行角色判断  v-if="
        tools.setRoles('graphic_auditor') || tools.setRoles('video_auditor')
      "-->
    <div
      class="query imageText-add"
      @click="add"
      v-if="tools.setRight('checkDetail')"
    >
      新增
    </div>
    <div
      class="query imageText-add"
      @click="downLoadText"
      v-if="tools.setRight('checkDetail')"
    >
      下载摸板
    </div>
    <div
      style="margin-left:12px;float: left;"
      v-if="tools.setRight('checkDetail')"
    >
      <el-upload
        class="upload-demo"
        action="./complex/service/file/upload?fileType=import"
        :headers="myHeaders"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload"
        multiple
      >
        <el-button size="small" type="primary">导入</el-button>
      </el-upload>
    </div>
    <div
      class="query interval"
      @click="exportList"
      style="margin-left:12px;"
      v-if="tools.setRight('视频质检导出')"
    >
      导出
    </div>
    <!-- <div class="release " style="margin-left:12px;" v-else>
      导出
    </div> -->
    <div class="imageText-tab">
      <Table :tableData="list" />
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="totals > 0"
        style="text-align:right;"
        background
        :total="totals"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Table from "./Table";
// import Human from "../public/Human";
export default {
  data() {
    return {
      //人员控件重置控制
      resultNum: "1",
      fwmAccount: "",
      dataSource: "",
      startDate: "",
      endDate: "",
      dataSourceS: "",
      startDateS: "",
      endDateS: "",
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      list: [],
      options: []
    };
  },
  components: { Table },
  computed: {
    ...mapState(["homeContentHeight", "userInfo", "lookUp", "datasourceStore"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  mounted() {
    this.getInformation();
  },
  methods: {
    exportList() {
      let vm = this;
      if (this.totals > 0) {
        let data = {
          dataSource: this.dataSourceS,
          startDate: this.startDateS,
          endDate: this.endDateS,
          checkType: "2"
        };
        this.api
          .post(`./complex/service/checkEntry/video/export`, data)
          .then(response => {
            if (response.status == 200) {
              vm.$confirm(
                "导入成功，前往【<a style='color: rgb(0, 205, 202);' href=" +
                  location.origin +
                  "/#/importExport/1" +
                  ">导入导出</a>】页面查看详情",
                "提示",
                {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "success",
                  dangerouslyUseHTMLString: true
                }
              )
                .then(() => {
                  // vm.$router.push({
                  //   name: "importExport"
                  // });
                  location.href = location.origin + "/#/importExport/1";
                })
                .catch(() => {});
            }
          })
          .catch(error => {});
      }
    },
    //下载摸板
    downLoadText() {
      location.href =
        location.origin + `/complex/publicservice/checkEntry/video/template`;
    },
    beforeAvatarUpload(file) {
      const flag = file.name
        .split(".")
        .pop()
        .toLowerCase();
      let arr = ["xls", "xlsx"];
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
        this.$message.error("上传文件只能是xls,xlsx格式!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
      }
      return isTYPE && isLt2M;
    },
    handleAvatarSuccess(res, file) {
      let vm = this;
      this.api
        .get(`./complex/service/checkEntry/video/import?fId=${res[0].fId}`)
        .then(function(response) {
          if (response.status == 200) {
            vm.$confirm(
              "导入成功，前往【<a style='color: rgb(0, 205, 202);' href=" +
                location.origin +
                "/#/importExport" +
                ">导入导出</a>】页面查看详情",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "success",
                dangerouslyUseHTMLString: true
              }
            )
              .then(() => {
                vm.$router.push({
                  name: "importExport"
                });
              })
              .catch(() => {});
          }
        })
        .catch(function(error) {});
    },
    handleAvatarError(err, file, fileList) {
      this.$message.error(JSON.parse(err.message).message);
    },
    query() {
      this.dataSourceS = this.dataSource;
      this.startDateS = this.startDate;
      this.endDateS = this.endDate;
      this.currentPage = 1;
      this.pageSize = 10;
      this.getInformation();
    },
    release() {
      this.resultNum++;
      this.dataSourceS = "";
      this.startDateS = "";
      this.endDateS = "";
      this.fwmAccount = "";
      this.dataSource = "";
      this.startDate = "";
      this.endDate = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getInformation();
    },
    add() {
      this.$router.push({
        name: "VideoAdd"
      });
    },
    //设置来源名称
    setDataName(data) {
      if (data) {
        for (var key in this.lookUp.DATASOURCE_WX_SP) {
          if (data == this.lookUp.DATASOURCE_WX_SP[key].itemCode) {
            return this.lookUp.DATASOURCE_WX_SP[key].itemName;
          }
        }
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInformation();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInformation();
    },
    //获取数据
    getInformation() {
      let data = {
        dataSource: this.dataSource,
        startDate: this.startDate,
        endDate: this.endDate,
        checkType: "2"
      };
      this.api
        .post(
          `./complex/service/checkEntry/video/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(response => {
          if (response.status == 200) {
            this.list = response.data.result;
            this.totals = response.data.page.totalRows;
            window.scrollTo(0, 0);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.upload-demo/deep/ .el-upload-list {
  display: none !important;
}
.upload-demo/deep/ .el-button {
  width: 72px;
  height: 28px;
  line-height: 8px;
  background: #00cdca;
  padding: 6px 15px;
  font-size: 14px;
  border-radius: 2px;
  border: none;
  margin-top: 2px;
}
.imageText-search /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
  height: 32px;
}
.imageText {
  width: 100%;
  margin-bottom: 100px;

  .imageText-search {
    height: 32px;
    width: 100%;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .search-one-box {
      height: 32px;
      float: left;
      margin-right: 20px;
      .search-one-box-name,
      .search-one-box-input {
        float: left;
      }
      .search-one-box-name {
        width: 64px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .search-one-box-input {
        width: 190px;
        height: 32px;
      }
      .search-one-box-time {
        width: 190px;
        float: left;
      }
    }
  }
  .imageText-add {
    margin: 0px 0px 16px 12px;
  }
}
</style>