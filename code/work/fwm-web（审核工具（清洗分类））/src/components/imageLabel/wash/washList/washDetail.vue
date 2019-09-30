<template>
  <div class="washDetail">
    <div style="height:42px;padding:20px 20px 10px 20px">
      <div class="video-box">
        <div class="video-box-name">清洗分类：</div>
        <div class="video-box-select">
          <el-select
            v-model="fileClassify"
            placeholder="请选择清洗分类"
            clearable
          >
            <el-option
              v-for="(item, index) in stateData"
              :label="item.classifyName"
              :value="item.classifyId"
              :key="index"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="video-box">
        <div class="video-box-name">清洗人员：</div>
        <div class="video-box-select">
          <human val="createBy" :showYN="createBy" :result="resultNum" />
        </div>
      </div>
      <div class="video-box-two">
        <div class="video-box-two-name">
          清洗时间：
        </div>
        <div class="video-box-two-child">
          <div class="video-box-two-select">
            <el-date-picker v-model="createDate" placeholder="请选择时间">
            </el-date-picker>
          </div>
          <div class="space">-</div>
          <div class="video-box-two-select">
            <el-date-picker v-model="endDate" placeholder="请选择时间">
            </el-date-picker>
          </div>
        </div>
      </div>
    </div>
    <div style="padding:0 20px;">
      <div style="overflow:hidden;">
        <div
          class="query"
          style="float:right;margin-right:0px;"
          @click="downLoad()"
        >
          <i class="fa fa-download"></i>下载
        </div>
        <div class="query" style="float:right" @click="resetForm()">
          <i class="fa fa-refresh"></i>重置
        </div>
        <div class="query" style="float:right" @click="researchForm()">
          <i class="fa fa-search"></i>查询
        </div>
      </div>
    </div>
    <div style="margin-top:10px;">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :height="tableHeightTwoV"
        tooltip-effect="light"
        ref="table"
      >
        <el-table-column
          type="index"
          width="50"
          label="NO."
          align="center"
          fixed="left"
        >
        </el-table-column>
        <el-table-column
          prop="fileClassify"
          label="分类"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          label="名称"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span
              style="color:#597EF7;cursor:pointer;"
              @click="viewImg(scope.row, scope.$index)"
              >{{ scope.row.fileName }}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          label="清洗人员"
          align="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-text="tools.setRole(scope.row.lastUpdateBy)"></span>
          </template>
        </el-table-column>

        <el-table-column label="清洗时间" align="left">
          <template slot-scope="scope">
            <span
              v-text="tools.setFormTime(scope.row.lastUpdateDate, 1)"
            ></span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging-box">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        >
        </el-pagination>
      </div>
    </div>
    <!--封装组件
    -->
    <el-dialog
      :title="textName"
      :visible.sync="imgShow"
      :close-on-click-modal="false"
      width="740px"
      top="10vh"
    >
      <div style="width:100%;height:400px;position:relative;">
        <i
          class="fa fa-angle-left"
          style="position: absolute;left: -70px;top: 170px;font-size:55px;color:#fff;cursor:pointer;"
          @click="goLeft"
        >
        </i>
        <i
          class="fa fa-angle-right"
          style="position: absolute;right: -70px;top: 170px;font-size:55px;color:#fff;cursor:pointer;"
          @click="goRight"
        >
        </i>
        <span
          style="font-size: 0;width: 700px;height: 400px;display: table-cell;text-align: center;vertical-align: middle;"
        >
          <img :src="imgUrl" style="max-width:700px;max-height:400px" />
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import human from "../../../common/Human";
import api from "@/api";
import { mapState } from "vuex";
export default {
  name: "washDetail",
  data() {
    return {
      //人员控件重置控制
      resultNum: "1",
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      totalPage: 1,
      imgShow: false,
      fileClassify: "",
      createBy: "",
      createDate: "",
      endDate: "",
      tableData: [],
      textName: "",
      imgList: [],
      imgIndex: "",
      imgUrl: "",
      stateData: []
    };
  },
  mounted() {
    this.$route.matched[0].meta.title = "清洗分类列表";
    this.getState();
    this.getDetail();
  },
  watch: {
    createDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    }
  },
  components: { human },
  computed: {
    ...mapState(["tableHeightTwoV"])
  },
  methods: {
    //判断时间
    judgeTime() {
      if (this.createDate && this.endDate) {
        if (this.endDate < this.createDate) {
          this.endDate = "";
          this.$message({
            message: "结束时间不能早于开始时间",
            type: "error"
          });
        }
      }
    },
    //获取分类
    getState() {
      let vm = this;
      this.api
        .get(
          `./manage/service/materiai/findImgfileGroup?orderId=${
            this.$route.params.id
          }`
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.stateData = response.data;
          }
        })
        .catch(function(error) {});
    },
    //查看图片
    viewImg(val, index) {
      this.imgIndex = index;
      this.textName = val.fileName;
      this.imgUrl =
        location.origin +
        `/manage/publicservice/label/image/download?fId=${
          this.imgList[index].materiaiId
        }&imgType=1`;
      this.imgShow = true;
    },
    //点击向左
    goLeft() {
      //判断储存变量是否和大变量相同来判断是不是第一位
      if (
        this.imgList[this.imgIndex].materiaiId != this.tableData[0].materiaiId
      ) {
        //不是第一位时,向前一位
        this.imgIndex = this.imgIndex - 1;
        this.imgUrl =
          location.origin +
          `/manage/publicservice/label/image/download?fId=${
            this.imgList[this.imgIndex].materiaiId
          }&imgType=1`;
        this.textName = this.imgList[this.imgIndex].fileName;
      } else {
        //如果是第一位时，查看是否为第一页，大于第一页时当前页数-1 调用服务重新拿到数据，下标为最后一个
        if (this.imgList[this.imgIndex].currentPage > 1) {
          this.currentPage = this.currentPage - 1;
          //this.getDetail();
          let vm = this;
          let data = {
            orderId: this.$route.params.id,
            //orderId: 12312,
            lastUpdateDate: this.createDate,
            endDate: this.endDate,
            lastUpdateBy: this.createBy,
            fileClassify: this.fileClassify
          };

          this.api
            .post(
              `./manage/service/materiai/findPage?currentPage=${
                this.currentPage
              }&pageSize=${this.pageSize}`,
              data
            )
            .then(function(response) {
              if (response.status == 200) {
                //初始化储存数组
                vm.imgList = [];
                vm.tableData = response.data.result;
                vm.totals = response.data.page.totalRows;
                vm.totalPage = response.data.page.totalPage;
                for (let i = 0; i < vm.tableData.length; i++) {
                  let obj = {};
                  obj.materiaiId = vm.tableData[i].materiaiId;
                  obj.fileName = vm.tableData[i].fileName;
                  obj.currentPage = vm.currentPage;
                  vm.imgList.push(obj);
                }
                vm.imgIndex = vm.tableData.length - 1;
                vm.imgUrl =
                  location.origin +
                  `/manage/publicservice/label/image/download?fId=${
                    vm.imgList[vm.imgIndex].materiaiId
                  }&imgType=1`;
                vm.textName = vm.imgList[vm.imgIndex].fileName;
              }
            })
            .catch(function(error) {});
        }
      }
    },
    goRight() {
      if (
        this.imgList[this.imgIndex].materiaiId !=
        this.tableData[this.tableData.length - 1].materiaiId
      ) {
        this.imgIndex = this.imgIndex + 1;
        this.imgUrl =
          location.origin +
          `/manage/publicservice/label/image/download?fId=${
            this.imgList[this.imgIndex].materiaiId
          }&imgType=1`;
        this.textName = this.imgList[this.imgIndex].fileName;
      } else {
        //如果是第一位时，查看是否为第一页，大于第一页时当前页数-1 调用服务重新拿到数据，下标为最后一个
        if (this.imgList[this.imgIndex].currentPage != this.totalPage) {
          this.currentPage = this.currentPage + 1;
          //this.getDetail();
          let vm = this;
          let data = {
            orderId: this.$route.params.id,
            //orderId: 12312,
            lastUpdateDate: this.createDate,
            endDate: this.endDate,
            lastUpdateBy: this.createBy,
            fileClassify: this.fileClassify
          };

          this.api
            .post(
              `./manage/service/materiai/findPage?currentPage=${
                this.currentPage
              }&pageSize=${this.pageSize}`,
              data
            )
            .then(function(response) {
              if (response.status == 200) {
                //初始化储存数组
                vm.imgList = [];
                vm.tableData = response.data.result;
                vm.totals = response.data.page.totalRows;
                vm.totalPage = response.data.page.totalPage;
                for (let i = 0; i < vm.tableData.length; i++) {
                  let obj = {};
                  obj.materiaiId = vm.tableData[i].materiaiId;
                  obj.fileName = vm.tableData[i].fileName;
                  obj.currentPage = vm.currentPage;
                  vm.imgList.push(obj);
                }
                vm.imgIndex = 0;
                vm.imgUrl =
                  location.origin +
                  `/manage/publicservice/label/image/download?fId=${
                    vm.imgList[vm.imgIndex].materiaiId
                  }&imgType=1`;
                vm.textName = vm.imgList[vm.imgIndex].fileName;
              }
            })
            .catch(function(error) {});
        }
      }
    },
    //$route.params.id
    //查询
    researchForm() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.totalPage = 1;
      this.getDetail();
    },
    //重置
    resetForm() {
      this.resultNum++;
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.totalPage = 1;
      this.fileClassify = "";
      this.createBy = "";
      this.createDate = "";
      this.endDate = "";
      this.getDetail();
    },
    //下载
    downLoad() {
      if (this.tableData.length > 0) {
        let timea = "";
        let timeb = "";
        if (this.createDate) {
          timea = Date.parse(this.createDate);
        }
        if (this.endDate) {
          timeb = Date.parse(this.endDate);
        }
        location.href =
          location.origin +
          `/manage/publicservice/materiai/imglabelDown?orderId=${
            this.$route.params.id
          }&fileClassify=${this.fileClassify}&lastUpdateBy=${
            this.createBy
          }&lastUpdateDate=${timea}&endDate=${timeb}`;
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getDetail();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getDetail();
    },
    //获取数据
    getDetail() {
      let vm = this;
      let data = {
        orderId: this.$route.params.id,
        //orderId: 12312,
        lastUpdateDate: this.createDate,
        endDate: this.endDate,
        lastUpdateBy: this.createBy,
        fileClassify: this.fileClassify
      };

      this.api
        .post(
          `./manage/service/materiai/findPage?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            //初始化储存数组
            vm.imgList = [];
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
            vm.totalPage = response.data.page.totalPage;
            for (let i = 0; i < vm.tableData.length; i++) {
              let obj = {};
              obj.materiaiId = vm.tableData[i].materiaiId;
              obj.fileName = vm.tableData[i].fileName;
              obj.currentPage = vm.currentPage;
              vm.imgList.push(obj);
            }
          }
        })
        .catch(function(error) {});
    }
  }
};
</script>

<style scoped lang="less">
.washDetail /deep/.el-dialog__header {
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
.washDetail /deep/.el-dialog__body {
  padding: 20px !important;
}
.washDetail {
  .video-box {
    width: 27%;
    float: left;
    .video-box-name {
      width: 70px;
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: center;
      //padding-left: 16px;
      padding-right: 5px;
    }
    .video-box-select {
      width: calc(100% - 95px);
      float: left;
      .el-select {
        width: 100%;
      }
    }
  }
  .video-box-two {
    width: 46%;
    float: left;
    .video-box-two-name {
      width: 70px;
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: center;
      padding-left: 0px;
      padding-right: 5px;
    }
    .video-box-two-child {
      width: calc(100% - 75px);
      float: left;
      .video-box-two-select {
        width: calc(50% - 10px);
        float: left;
        .el-select {
          width: 100%;
        }
        .el-date-editor {
          width: 100%;
        }
      }
      .space {
        float: left;
        width: 20px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        color: gray;
      }
    }
  }
}
</style>
