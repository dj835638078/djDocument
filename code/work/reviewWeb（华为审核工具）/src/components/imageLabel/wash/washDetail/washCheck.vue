<template>
  <div class="washDetail">
    <viewPicture
      :imgInfoPassFileList="imgInfoPassFileList"
      :imgUrlPass="imgUrlPass"
      @toChange="toChange"
      @detailClassifyTo="detailClassifyTo"
      @detailDelete="detailDelete"
    />
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
    <!-- 新建分类弹框 -->
    <el-dialog
      title="新建分类"
      :visible.sync="addClassifyFlag"
      width="420px"
      top="10vh"
      class="addClassifyBox"
      @close="classifyBtnN"
    >
      <img src="../../../../assets/img/file.svg" alt="Image" />
      <el-input v-model="classifyName" placeholder="请输入分类名"></el-input>
      <div class="btnBox">
        <div class="new" @click="classifyBtnY">确定</div>
        <div class="commonly" @click="classifyBtnN">取消</div>
      </div>
    </el-dialog>
    <!-- tab页签 -->
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="未质检" name="first"> </el-tab-pane>
        <el-tab-pane label="已质检" name="second"></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div class="content-box">
      <!-- 操作按钮 -->
      <div class="infoHeadBtn" v-if="activeName == 'first'">
        <div
          class="release"
          style="width:125px"
          v-if="
            $route.params.nodeState == 2 ||
              submitShowFlag ||
              $route.params.orderStatus == 98 ||
              $route.params.orderStatus == 99 ||
              $route.params.orderStatus == 4 ||
              $route.params.orderStatus == 5 ||
              $route.params.orderStatus == 6
          "
        >
          提交到已质检
        </div>
        <div class="new" @click="submitCli" v-else style="width:125px">
          提交到已质检
        </div>
      </div>
      <div class="contentBoxInfo" v-if="activeName == 'first'">
        <!-- 文件夹列表 -->
        <div class="fileListBox">
          <template v-for="(item, index) in fileList">
            <!-- <div
              class="fileItem"
              @mouseenter="mouEnterFile(item, index)"
              @mouseleave="mouOutFile()"
              v-if="item.fileCount || index == 0"
            > -->
            <div
              class="fileItem"
              @mouseenter="mouEnterFile(item, index)"
              @mouseleave="mouOutFile()"
              v-if="item.fileCount > 0"
            >
              <div class="fileImgBox">
                <img
                  src="../../../../assets/img/file.svg"
                  alt="file"
                  class="fileImg"
                  @click="fileClick(item, 1)"
                />
                <div
                  class="deleteOperate"
                  @click="deleteFile(index, item)"
                  v-if="fileSeen && index == fileCurrent && index != 0"
                >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <el-input
                type="text"
                class="fileTitle"
                v-focus
                v-model="classifyNameInput"
                @blur="inputBlur(item, index)"
                v-if="
                  fileNameSeen &&
                    index == fileNameCurrent &&
                    $route.name != 'washCheck'
                "
              />
              <p
                class="fileTitle ellipsis"
                @click="clickFileName(item, index)"
                :title="item.classifyName"
                v-else
              >
                {{ item.classifyName }}
              </p>
              <p class="fileNum ellipsis">{{ item.fileCount }}</p>
            </div>
          </template>
        </div>
        <!-- 图片列表 -->
        <div class="imgInfoBox">
          <div class="imgInfoHeader" v-if="totals">
            <div class="imgInfoTitle">
              <span class="title">{{ imgTitle }}</span>
              <span class="num">({{ totals }}张)</span>
            </div>
          </div>
          <div class="imgItemBox">
            <div
              v-for="(item, index) in imgList"
              :key="index"
              class="imgItem"
              @mouseenter="mouEnterOpe(item, index)"
              @mouseleave="mouOutOpe()"
            >
              <div
                :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"
                class="fileImg"
                :data-imgInfo="JSON.stringify(item)"
                @click="clickBig(item, index)"
              ></div>
              <div
                class="imgOperateBox"
                v-show="operateSeen && index == operateCurrent && !cheboxFlag"
              >
                <!-- <div class="imgOperateBox" v-show="true"> -->
                <div class="imgOperateLeft">
                  <div class="selectBox" @click.stop="moveSelShow">
                    <span>移动至</span><i class="el-icon-arrow-down"></i>
                  </div>
                  <ul class="selectItem" v-if="moveSelShowFlag">
                    <li
                      class="ellipsis"
                      v-for="(itema, indexa) in fileList"
                      :title="itema.classifyName"
                      :key="indexa"
                      @click.stop="moveSelChoose(itema, item, index)"
                    >
                      {{ itema.classifyName }}
                    </li>
                  </ul>
                </div>
                <div
                  class="imgOperateRight"
                  @click.stop="deleteOne(index, item)"
                >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <!-- <el-checkbox
                v-model="item.isSel"
                v-if="cheboxFlag"
                @change="checkboxChange(index, item)"
              ></el-checkbox> -->
              <input
                :id="checkName + index"
                class="btn-checkbox"
                type="checkbox"
                v-model="item.isSel"
                v-if="cheboxFlag"
                @change="checkboxChange(index, item)"
              />
              <label :for="checkName + index"></label>
            </div>
          </div>
        </div>
      </div>
      <div class="paging-box" v-if="totals && activeName == 'first'">
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
      <!-- 清洗库 -->
      <div class="content-box-second" v-if="activeName == 'second'">
        <washStory />
      </div>
    </div>
  </div>
</template>

<script>
import viewPicture from "./viewPicture";
import washStory from "./washStory";
export default {
  name: "washDetail",
  data() {
    return {
      checkName: "btn-checkboxId",
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      totalsCheck: 0,
      activeName: "first",
      falgs: "article",
      classifyName: "",
      selectFile: "",
      titleName: "",
      titleDesc: "",
      operateFlag: "",
      operatePoint: false,
      addClassifyFlag: false,
      uploadFileFlag: false,
      disabled: false,
      operateSeen: false,
      fileSeen: false,
      fileNameSeen: false,
      imgChecked: false,
      operateCurrent: 0,
      fileCurrent: 0,
      fileNameCurrent: 0,
      itemOne: {},
      itemFile: {},
      imgTitle: "",
      cheboxFlag: false,
      batchManageFlag: true,
      moveSelShowFlag: false,
      fileList: [],
      moveObj: {},
      imgList: [],
      imgListOriginal: [],
      imgListRest: [],
      moveClassify: "",
      deleteArr: [],
      dragArr: [],
      fileClassifyId: "",
      fileClassifyObj: {},
      commandFlag: "",
      classifyNameInput: "",
      classifyNameInputFlag: "",
      imgIndexPass: 0,
      tableData: [],
      imgUrlPass: "",
      imgInfoPassFlag: false,
      imgInfoPassFileList: [],
      totalPage: 1,
      materiaiIdPass: "",
      passLast: false,
      submitShowFlag: false,
      classifyChildren: ""
    };
  },
  directives: {
    // 注册一个局部的自定义指令 v-focus
    focus: {
      // 指令的定义
      inserted: function(el) {
        // 聚焦元素
        el.querySelector("input").focus();
      }
    }
  },
  methods: {
    //  tabs切换
    handleClick() {
      if (this.activeName == "first") {
        this.getFileList(true);
      }
    },
    //  新建分类
    newClassify() {
      this.batchManageFlag = true;
      this.resetCheck();
      this.addClassifyFlag = true;
    },
    // 提交按钮
    submitCli() {
      this.titleName = "您确定已经质检过了吗？";
      this.titleDesc = "提交表示您已经质检";
      // if (this.$parent.totals) {
      //   this.titleDesc =
      //     "图片库还有图片没有分类，确定要提交吗？提交后该订单将进入下一流程";
      // }
      this.operateFlag = "submit";
      this.operatePoint = true;
    },
    // 分类确认按钮
    classifyBtnY() {
      let vm = this;
      let dataObj = {};
      dataObj.dataState = 1;
      dataObj.classifyName = vm.classifyName;
      dataObj.orderId = this.$route.params.id;
      if (!vm.classifyName.trim()) {
        vm.$message({
          showClose: true,
          message: "请输入要新建分类的名称",
          type: "warning"
        });
        return;
      }
      vm.api
        .post(`./manage/service/materiai/addMetariai`, dataObj)
        .then(function(response) {
          if (response.status == 200) {
            vm.getFileList();
          }
        })
        .catch(function(error) {});
      vm.addClassifyFlag = false;
      vm.classifyName = "";
    },
    // 分类取消按钮
    classifyBtnN() {
      this.addClassifyFlag = false;
      this.classifyName = "";
    },
    //单个下拉显示隐藏
    moveSelShow() {
      this.moveSelShowFlag = !this.moveSelShowFlag;
    },
    //移动单个
    moveSelChoose(itema, item, indexa) {
      let objArr = [];
      let objObj = {};
      objObj.fileClassify = itema.classifyId;
      objObj.filterStatus = 1;
      objObj.materiaiId = item.materiaiId;
      objObj.orderId = this.$route.params.id;
      if (this.$route.name == "washCheck") {
        objObj.flag = "check";
      }
      objArr.push(objObj);
      this.operateItem(objArr, "updateMetariai");
    },
    //移动多个
    handleCommand(command) {
      if (this.dragArr.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择要移动的照片",
          type: "warning"
        });
        return;
      }
      for (var i = 0; i < this.dragArr.length; i++) {
        this.dragArr[i].fileClassify = command;
      }
      this.commandFlag = command;
      this.operateItem(this.dragArr, "updateMetariai");
    },
    deleteOne(index, item) {
      this.titleName = "确定要把照片删除吗？";
      this.titleDesc = "删除后不可恢复";
      this.operateFlag = "deleteOne";
      this.operatePoint = true;
      this.itemOne = item;
      this.itemOne.imgIndex = index;
    },
    deleteFile(index, item) {
      this.titleName = "确定要把文件夹删除吗？";
      this.titleDesc = "删除后不可恢复";
      this.operateFlag = "deleteFile";
      this.operatePoint = true;
      this.itemFile = item;
    },
    //删除确认操作
    operateBtnY() {
      let vm = this;
      if (this.operateFlag == "deleteOne") {
        // let arrFlag = [];
        let objFlag = {};
        objFlag.dataState = 0;
        objFlag.materiaiId = this.itemOne.materiaiId;
        objFlag.orderId = this.$route.params.id;
        // arrFlag.push(objFlag);
        vm.operateItem(objFlag, "deleteMetariai");
      }
      if (this.operateFlag == "deleteMulti") {
        this.operateItem(this.deleteArr, "updateMetariaiFile");
        this.operatePoint = false;
      }
      if (this.operateFlag == "deleteFile") {
        let objFlag = {};
        objFlag.fileClassify = this.itemFile.classifyId;
        objFlag.orderId = vm.$route.params.id;
        this.operateItem(objFlag, "updateMetariaiClassly");
      }
      if (this.operateFlag == "submit") {
        vm.api
          .post(`./manage/service/materiai/submtImgCheck`, {
            orderId: this.$route.params.id
          })
          .then(function(response) {
            if (response.status == 200) {
              // vm.$router.push({ name: "washList" });
              vm.getFileList(true);
              vm.fileClick(vm.fileClassifyObj);
            }
          })
          .catch(function(error) {});
      }
      this.operatePoint = false;
    },
    operateBtnN() {
      this.operatePoint = false;
    },
    //操作文件调取服务
    operateItem(data, url, operatObj) {
      let vm = this;
      vm.api
        .post(`./manage/service/materiai/${url}`, data)
        .then(function(response) {
          if (response.status == 200) {
            if (operatObj == "big") {
              vm.getFileList();
              vm.toChange("下", "delete");
            } else {
              vm.getFileList();
              vm.currentPage = 1;
              vm.fileClick(vm.fileClassifyObj);
            }
          }
        })
        .catch(function(error) {});
    },
    //点击展示大图
    clickBig(item, index) {
      if (
        this.$route.params.nodeState == 2 ||
        this.$route.params.orderStatus == 98 ||
        this.$route.params.orderStatus == 99 ||
        this.$route.params.orderStatus == 4 ||
        this.$route.params.orderStatus == 5 ||
        this.$route.params.orderStatus == 6
      ) {
        return;
      }
      this.imgInfoPassFlag = true;
      this.imgIndexPass = index;
      this.imgUrlPass = item.imgUrl;
      this.materiaiIdPass = item.materiaiId;
    },
    toChange(flag, operateFlag) {
      if (flag == "上") {
        if (
          this.imgList[this.imgIndexPass].materiaiId !=
          this.tableData[0].materiaiId
        ) {
          this.imgIndexPass = this.imgIndexPass - 1;
          this.imgUrlPass =
            location.origin +
            `/manage/publicservice/label/image/download?fId=${
              this.imgList[this.imgIndexPass].materiaiId
            }&imgType=1`;
        } else {
          if (this.imgList[this.imgIndexPass].currentPage > 1) {
            this.currentPage = this.currentPage - 1;
            this.fileClick(this.fileClassifyObj, 2);
          } else {
            this.$message({
              showClose: true,
              message: "已到第一张图片",
              type: "warning"
            });
          }
        }
      }
      if (flag == "下") {
        if (operateFlag == "delete") {
          this.nextBtn();
        }
        if (
          this.imgList[this.imgIndexPass].materiaiId !=
          this.tableData[this.tableData.length - 1].materiaiId
        ) {
          if (operateFlag == "delete") {
            this.imgIndexPass = this.imgIndexPass;
          } else {
            this.imgIndexPass = this.imgIndexPass + 1;
          }

          this.fileClick(this.fileClassifyObj, 6);
        } else {
          if (this.imgList[this.imgIndexPass].currentPage != this.totalPage) {
            if (operateFlag == "delete") {
              this.fileClick(this.fileClassifyObj, 6);
            } else {
              this.currentPage = this.currentPage + 1;
              this.fileClick(this.fileClassifyObj, 3);
            }
          } else {
            if (operateFlag == "delete") {
              this.imgInfoPassFlag = false;
              if (this.totalPage == 2 && this.totals - 1 == this.pageSize) {
                this.currentPage = 1;
                this.fileClick(this.fileClassifyObj, 1);
              }
            }
            this.$message({
              showClose: true,
              message: "已到最后一张图片",
              type: "warning"
            });
          }
        }
      }
    },
    nextBtn() {
      if (this.imgList[this.imgIndexPass].currentPage == this.totalPage) {
        //当前页最后一张时
        if (this.totalPage == 1) {
          if (this.imgIndexPass == this.imgList.length - 1) {
            this.imgInfoPassFlag = false;
          }
        }
        // else {
        //   if (this.imgIndexPass == this.imgList.length - 1) {
        //     // this.currentPage = 1;
        //     this.imgIndexPass = 0;
        //   }
        // }
        // return;
      }
      this.fileClick(this.fileClassifyObj, 4);
    },
    //大图分类至
    detailClassifyTo(val) {
      let objArr = [];
      let objObj = {};
      objObj.fileClassify = val;
      objObj.filterStatus = 1;
      objObj.materiaiId = this.materiaiIdPass;
      objObj.flag = "check";
      objObj.orderId = this.$route.params.id;
      objArr.push(objObj);
      this.operateItem(objArr, "updateMetariai", "big");
      this.classifyChildren = "";
    },
    //大图删除
    detailDelete() {
      let arrFlag = [];
      let objFlag = {};
      objFlag.dataState = 0;
      objFlag.materiaiId = this.materiaiIdPass;
      objFlag.orderId = this.$route.params.id;
      arrFlag.push(objFlag);
      this.operateItem(arrFlag, "updateMetariaiFile", "big");
    },
    //点击文件夹名称
    clickFileName: function(item, index) {
      if (
        this.$route.params.nodeState == 2 ||
        this.$route.params.orderStatus == 98 ||
        this.$route.params.orderStatus == 99 ||
        this.$route.params.orderStatus == 4 ||
        this.$route.params.orderStatus == 5 ||
        this.$route.params.orderStatus == 6
      ) {
        return;
      }
      // if (index == 0) {
      //   this.fileNameSeen = false;
      // }
      this.classifyNameInput = item.classifyName;
      this.classifyNameInputFlag = item.classifyName;
      this.fileNameSeen = true;
      this.fileNameCurrent = index;
    },
    //input框失去焦点触发事件
    inputBlur(item, index) {
      let vm = this;
      vm.fileNameSeen = false;
      let data = {};
      data.classifyId = item.classifyId;
      data.orderId = this.$route.params.id;
      if (!vm.classifyNameInput.trim()) {
        this.$message({
          showClose: true,
          message: "请输入要修改的分类名称",
          type: "warning"
        });
        vm.fileNameSeen = true;
        return;
      }
      if (this.classifyNameInputFlag == this.classifyNameInput) {
        return;
      }
      data.classifyName = vm.classifyNameInput;
      vm.api
        .post(`./manage/service/materiai/updateClassfly`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.getFileList();
          }
        })
        .catch(function(error) {});
    },
    //文件夹鼠标移入显示
    mouEnterFile: function(item, index) {
      if (
        this.$route.params.nodeState == 2 ||
        this.$route.params.orderStatus == 98 ||
        this.$route.params.orderStatus == 99 ||
        this.$route.params.orderStatus == 4 ||
        this.$route.params.orderStatus == 5 ||
        this.$route.params.orderStatus == 6 ||
        this.$route.name == "washCheck"
      ) {
        return;
      }
      this.fileSeen = true;
      this.fileCurrent = index;
    },
    //文件夹鼠标移出隐藏
    mouOutFile: function(index) {
      this.fileSeen = false;
      this.fileCurrent = null;
    },
    //图片鼠标移入显示
    mouEnterOpe: function(item, index) {
      console.log(111);
      let vm = this;
      if (
        this.$route.params.nodeState == 2 ||
        this.$route.params.orderStatus == 98 ||
        this.$route.params.orderStatus == 99 ||
        this.$route.params.orderStatus == 4 ||
        this.$route.params.orderStatus == 5 ||
        this.$route.params.orderStatus == 6
      ) {
        return;
      }
      vm.moveObj = item;
      vm.operateSeen = true;
      vm.operateCurrent = index;
    },
    //图片鼠标移出隐藏
    mouOutOpe: function(index) {
      this.operateSeen = false;
      this.operateCurrent = null;
      this.moveSelShowFlag = false;
    },
    //复选框选择
    checkboxChange(index, item) {
      this.$nextTick(() => {
        this.imgInfoPassFlag = false;
      });
      let deleteObj = {};
      let dragObj = {};
      if (item.isSel) {
        deleteObj.dataState = 0;
        deleteObj.materiaiId = item.materiaiId;
        deleteObj.orderId = item.orderId;
        dragObj.fileClassify = "";
        dragObj.orderId = item.orderId;
        dragObj.materiaiId = item.materiaiId;
        dragObj.filterStatus = 1;
        this.deleteArr.push(deleteObj);
        this.dragArr.push(dragObj);
      } else {
        for (var i = 0; i < this.deleteArr.length; i++) {
          if (this.deleteArr[i].materiaiId == item.materiaiId) {
            this.deleteArr.splice(i, 1);
          }
        }
        for (var i = 0; i < this.dragArr.length; i++) {
          if (this.dragArr[i].materiaiId == item.materiaiId) {
            this.dragArr.splice(i, 1);
          }
        }
      }
    },
    //批量管理按钮点击
    batchManage() {
      if (
        this.$route.params.nodeState == 2 ||
        this.$route.params.orderStatus == 98 ||
        this.$route.params.orderStatus == 99 ||
        this.$route.params.orderStatus == 4 ||
        this.$route.params.orderStatus == 5 ||
        this.$route.params.orderStatus == 6
      ) {
        return;
      }
      this.cheboxFlag = true;
      this.batchManageFlag = false;
    },
    //完成按钮点击
    operateFinish() {
      this.cheboxFlag = false;
      this.batchManageFlag = true;
      this.resetCheck();
    },
    //重置复选框
    resetCheck() {
      this.cheboxFlag = false;
      this.deleteArr = [];
      this.dragArr = [];
      for (var i = 0; i < this.imgList.length; i++) {
        this.imgList[i].isSel = false;
      }
    },
    //点击文件夹查询图片
    fileClick(item, flagClick) {
      let vm = this;
      vm.imgTitle = item.classifyName;
      vm.batchManageFlag = true;
      vm.resetCheck();
      vm.fileClassifyId = item.classifyId;
      if (flagClick == 1) {
        vm.currentPage = 1;
      }
      let data = {};
      data.orderId = this.$route.params.id;
      data.fileClassify = item.classifyId;
      data.checkingStatus = 0;
      vm.fileClassifyObj.orderId = this.$route.params.id;
      vm.fileClassifyObj.classifyId = item.classifyId;
      vm.fileClassifyObj.classifyName = item.classifyName;
      vm.api
        .post(
          `./manage/service/materiai/findMetaImgById?currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            if (response.data) {
              vm.tableData = response.data.result;
              vm.totalPage = response.data.page.totalPage;
              vm.deleteArr = [];
              vm.dragArr = [];
              vm.imgList = response.data.result;
              vm.totals = response.data.page.totalRows;
              vm.totalsCheck = response.data.page.totalRows;
              if (vm.totals) {
                for (var i = 0; i < vm.imgList.length; i++) {
                  vm.imgList[i].isSel = false;
                  vm.imgList[i].currentPage = vm.currentPage;
                  if (vm.imgList[i].materiaiId) {
                    vm.imgList[i].imgUrl =
                      location.origin +
                      `/manage/publicservice/label/image/download?fId=${
                        vm.imgList[i].materiaiId
                      }&imgType=1`;
                  }
                }
              }
              if (flagClick == 2) {
                vm.imgIndexPass = vm.tableData.length - 1;
                vm.materiaiIdPass = vm.imgList[vm.imgIndexPass].materiaiId;
                vm.imgUrlPass =
                  location.origin +
                  `/manage/publicservice/label/image/download?fId=${
                    vm.imgList[vm.imgIndexPass].materiaiId
                  }&imgType=1`;
              }
              if (flagClick == 3) {
                vm.imgIndexPass = 0;
                vm.materiaiIdPass = vm.imgList[vm.imgIndexPass].materiaiId;
                vm.imgUrlPass =
                  location.origin +
                  `/manage/publicservice/label/image/download?fId=${
                    vm.imgList[vm.imgIndexPass].materiaiId
                  }&imgType=1`;
              }
              if (flagClick == 4) {
                vm.materiaiIdPass = vm.imgList[vm.imgIndexPass].materiaiId;
                vm.imgUrlPass =
                  location.origin +
                  `/manage/publicservice/label/image/download?fId=${
                    vm.imgList[vm.imgIndexPass].materiaiId
                  }&imgType=1`;
                // vm.imgIdYN = vm.imgList[vm.imgIndexPass].imgId;
              }
              if (flagClick == 6) {
                vm.materiaiIdPass = vm.imgList[vm.imgIndexPass].materiaiId;
                vm.imgUrlPass =
                  location.origin +
                  `/manage/publicservice/label/image/download?fId=${
                    vm.imgList[vm.imgIndexPass].materiaiId
                  }&imgType=1`;
              }
            }
          }
        })
        .catch(function(error) {});
    },
    // 获取文件夹列表数据
    getFileList(firstLoad) {
      let vm = this;
      vm.api
        .get(
          "./manage/service/materiai/findImgfileGroup?checkingStatus=0" +
            "&orderId=" +
            this.$route.params.id
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.imgInfoPassFileList = response.data;
            if (response.data && response.data.length > 1) {
              vm.fileList = response.data;
              let a = vm.fileList.unshift(vm.fileList.pop());
            } else {
              vm.fileList = response.data;
            }
            if (response.data && response.data.length) {
              let arrFlag = vm.fileList.slice(0);
              let arrFlagAdd = [];
              let arrFlagAddShow = [];
              arrFlagAdd.push(arrFlag[0]);
              for (var i = 0; i < arrFlag.length; i++) {
                if (arrFlag[i].fileCount > 0 && i > 0) {
                  arrFlagAdd.push(arrFlag[i]);
                }
              }
              for (var i = 0; i < vm.fileList.length; i++) {
                if (vm.fileList[i].fileCount > 0) {
                  arrFlagAddShow.push(vm.fileList[i]);
                }
              }
              if (!arrFlagAddShow.length) {
                vm.submitShowFlag = true;
              } else {
                vm.submitShowFlag = false;
              }
              //第一次加载时渲染图片列表
              if (firstLoad) {
                if (arrFlagAdd[1] && arrFlagAdd[1].fileCount) {
                  let dataObj = {};
                  vm.fileClassifyId = arrFlagAdd[1].classifyId;
                  dataObj.orderId = arrFlagAdd[1].orderId;
                  dataObj.classifyId = arrFlagAdd[1].classifyId;
                  dataObj.classifyName = arrFlagAdd[1].classifyName;
                  vm.fileClassifyObj.classifyId = arrFlagAdd[1].classifyId;
                  vm.fileClassifyObj.orderId = arrFlagAdd[1].orderId;
                  vm.fileClassifyObj.classifyName = arrFlagAdd[1].classifyName;
                  vm.fileClick(dataObj);
                }
                if (
                  !arrFlagAdd[1] &&
                  arrFlagAdd[0] &&
                  arrFlagAdd[0].fileCount
                ) {
                  let dataObj = {};
                  dataObj.orderId = arrFlagAdd[0].orderId;
                  dataObj.classifyId = arrFlagAdd[0].classifyId;
                  dataObj.classifyName = arrFlagAdd[0].classifyName;
                  vm.fileClassifyObj.classifyId = arrFlagAdd[0].classifyId;
                  vm.fileClassifyObj.orderId = arrFlagAdd[0].orderId;
                  vm.fileClassifyObj.classifyName = arrFlagAdd[0].classifyName;
                  vm.fileClick(dataObj);
                }
              }
            }
          }
        })
        .catch(function(error) {});
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.fileClick(this.fileClassifyObj);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fileClick(this.fileClassifyObj);
    }
  },
  components: { viewPicture, washStory },
  computed: {},
  mounted() {
    this.getFileList(true);
    if (this.$route.name == "washCheck") {
      this.$route.matched[0].meta.title = "任务质检";
    }
  },
  watch: {}
};
</script>

<style scoped lang="less">
@import "../../../../assets/styles/checkBoxSelf.css";
.addClassifyBox /deep/ .el-dialog__header {
  border-bottom: none;
}
.addClassifyBox /deep/ .el-dialog__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .el-input {
    width: 80%;
    margin: 20px 0 30px 0;
  }
}

.uploadFileBox /deep/ .el-dialog__header {
  border-bottom: none;
}
.uploadFileBox {
  .selectFile {
    position: absolute;
    left: 20px;
    top: 20px;
    .title {
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
      font-weight: 600;
    }
  }
}
.uploadFileBox /deep/ .el-dialog__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 360px;
  justify-content: center;
}
.fileTitle /deep/ .el-input__inner {
  height: 21px;
  padding: 0 8px;
}
.washDetail {
  height: calc(100% - 38px);
  padding: 14px 24px 24px 24px;
  position: relative;
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
  .infoHeadBtn {
    position: relative;
    margin-bottom: 8px;
    .el-button {
      background: #597ef7;
    }
    .imgInfoOperate {
      position: absolute;
      right: 0;
      .btnCommon {
        margin-right: 0 !important;
        margin-bottom: 0 !important;
        margin-left: 6px;
      }
    }
  }
  .content-box-second {
    height: 100%;
  }
  .content-box {
    height: calc(100% - 54px);
    display: flex;
    flex-direction: column;
    .contentBoxInfo {
      height: calc(100% - 38px);
      display: flex;
      justify-content: space-between;
      .fileListBox {
        background: #fff;
        box-sizing: border-box;
        border: 1px solid rgba(232, 232, 232, 1);
        width: 150px;
        height: 100%;
        overflow-y: auto;
        .fileItem {
          float: left;
          width: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          position: relative;
        }
        .fileImgBox {
          width: 38px;
          height: 36px;
          overflow: hidden;
          padding-top: 15px;
          .deleteOperate {
            position: absolute;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            right: 10px;
            top: 8px;
            background: #f56c6c;
            color: #fff;
          }
        }
        .fileTitle {
          padding: 5px 10px;
          font-size: 14px;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
          height: 27px;
          box-sizing: border-box;
          border-radius: 5px;
        }
        .fileNum {
          width: 100%;
          padding: 0px 10px;
          font-size: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #597ef7;
          cursor: default;
          font-weight: 600;
        }
      }
      .imgInfoBox {
        width: calc(100% - 150px);
        height: calc(100%-38px);
        padding: 0 25px 0 25px;
        box-sizing: border-box;
        border: 1px solid rgba(232, 232, 232, 1);
        border-left: none;
        background: #fff;
        overflow-y: scroll;
        overflow-x: hidden;
        position: relative;
        .imgInfoHeader {
          height: 54px;
          display: flex;
          align-items: center;
          margin-right: 20px;
          .imgInfoTitle {
            .title {
              font-size: 16px;
              color: rgba(0, 0, 0, 0.85);
              font-weight: 900;
            }
            .num {
              font-size: 12px;
              color: #597ef7;
            }
          }
          // .imgInfoOperate {
          //   .btnCommon {
          //     margin-right: 0 !important;
          //     margin-bottom: 0 !important;
          //     margin-left: 6px;
          //   }
          // }
        }
        .imgItemBox {
          display: flex;
          flex-wrap: wrap;
          // justify-content: space-between;
          width: 100%;
          .imgItem {
            position: relative;
            width: calc(20% - 20px);
            margin-right: 20px;
            margin-bottom: 20px;
            cursor: pointer;
            z-index: 100;
            box-sizing: border-box;
            &:after {
              display: block;
              content: "";
              visibility: hidden;
              clear: both;
              z-index: 100;
            }
            .fileImg {
              width: 100%;
              position: relative;
              padding-top: 100%;
              background-size: cover;
              background-repeat: no-repeat;
            }
            .imgOperateBox {
              position: absolute;
              width: 100%;
              height: 32px;
              left: 0;
              top: 0;
              padding: 3px;
              box-sizing: border-box;
              .imgOperateLeft {
                float: left;
                width: 60%;
                height: 100%;
                position: relative;
                .selectBox {
                  cursor: pointer;
                  line-height: 26px;
                  width: 100%;
                  height: 100%;
                  background: #fff;
                  padding: 0;
                  padding-left: 5px;
                  color: #d2c9cc;
                  z-index: 10;
                  .el-icon-arrow-down {
                    position: absolute;
                    right: -1px;
                    top: 7px;
                    color: #d2c9cc;
                  }
                }
                .selectItem {
                  width: 100%;
                  height: 100px;
                  overflow-y: auto;
                  padding-left: 5px;
                  margin-top: 3px;
                  background: #fff;
                  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                  border-radius: 2px;
                  z-index: 1001;
                  li {
                    padding: 5px;
                    cursor: pointer;
                  }
                }
                .el-select {
                  height: 28px !important;
                }
              }
              .imgOperateRight {
                float: right;
                width: 26px;
                height: 26px;
                background: rgba(245, 108, 108, 1);
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 18px;
                border-radius: 2px;
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
