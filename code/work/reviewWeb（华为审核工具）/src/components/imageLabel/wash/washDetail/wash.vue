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
    <!-- 上传图片弹框 -->
    <el-dialog
      :visible.sync="uploadFileFlag"
      width="540px"
      top="10vh"
      class="uploadFileBox"
      @close="upLoadBtnN"
    >
      <div class="selectFile">
        <span class="title">上传文件到</span>
        <el-select
          v-model="selectFile"
          placeholder="请选择"
          @change="upLoadChange"
          clearable
        >
          <el-option
            v-for="(item, index) in fileListOptinUpload"
            :key="index"
            :label="item.classifyName"
            :value="item.classifyId"
          >
          </el-option>
        </el-select>
      </div>
      <!-- <div class="new" @click="upLoadAddFile">添加文件</div> -->
      <div class="attachmentUpload ">
        <el-upload
          class="upload-demo"
          :action="actionUrl"
          :headers="myHeaders"
          multiple
          :limit="5"
          :before-upload="onBeforeUpload"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :on-exceed="handleExceed"
          :on-error="handleAvatarError"
          :file-list="upLoadFilelist"
        >
          <div
            class="query addFileBtn"
            style="width:100px"
            @click="upLoadAddFile"
          >
            添加文件
          </div>
          <div slot="tip" class="el-upload__tip">
            添加文件格式：jpg、png、zip、最多支持上传5个文件,每个最大20MB。
          </div>
        </el-upload>
      </div>
    </el-dialog>
    <!-- tab页签 -->
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="图片库" name="first"> </el-tab-pane>
        <el-tab-pane label="清洗库" name="second"></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div class="content-box">
      <!-- 操作按钮 -->
      <div class="infoHeadBtn" v-if="activeName == 'first'">
        <div
          class="release"
          v-if="
            $route.params.nodeState == 2 ||
              $route.params.orderStatus == 98 ||
              $route.params.orderStatus == 99 ||
              $route.params.orderStatus == 4 ||
              $route.params.orderStatus == 5 ||
              $route.params.orderStatus == 6
          "
        >
          上传图片
        </div>
        <div class="new" @click="uploadImg" v-else>
          上传图片
        </div>

        <div
          class="release"
          v-if="
            $route.params.nodeState == 2 ||
              $route.params.orderStatus == 98 ||
              $route.params.orderStatus == 99 ||
              $route.params.orderStatus == 4 ||
              $route.params.orderStatus == 5 ||
              $route.params.orderStatus == 6
          "
        >
          新建分类
        </div>
        <div class="new" @click="newClassify" v-else>
          新建分类
        </div>
        <div class="imgInfoOperate" v-if="activeName == 'first' && totals">
          <div
            class="commonly btnCommon"
            @click="batchManage"
            v-if="batchManageFlag"
          >
            批量管理
          </div>
          <div class="imgInfoList" v-else>
            <div class="commonly btnCommon" @click="operateFinish">
              完成
            </div>
            <div class="commonly btnCommon">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  移动至<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item, index) in fileList"
                    :key="index"
                    :command="item.classifyId"
                    >{{ item.classifyName }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="delete btnCommon" @click="multiDelete">
              <i class="el-icon-delete"></i>删除
            </div>
          </div>
        </div>
      </div>
      <div class="contentBoxInfo" v-if="activeName == 'first'">
        <!-- 文件夹列表 -->
        <div class="fileListBox">
          <template v-for="(item, index) in fileList">
            <div
              class="fileItem"
              @mouseenter="mouEnterFile(item, index)"
              @mouseleave="mouOutFile()"
            >
              <div class="fileImgBox">
                <img
                  src="../../../../assets/img/file.svg"
                  alt="file"
                  class="fileImg"
                  :data-classifyId="item.classifyId"
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
                v-if="fileNameSeen && index == fileNameCurrent"
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
              <span class="title">图片库</span>
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
                class="pictureImg"
                :data-imgInfo="JSON.stringify(item)"
                @click.stop="clickBig(item, index)"
                @mousedown="mousedownPic(item, index)"
              ></div>
              <div
                class="imgOperateBox"
                v-show="operateSeen && index == operateCurrent && !cheboxFlag"
              >
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
import washStory from "./washStory";
import viewPicture from "./viewPicture";
var key = false; //设置了一个标志 false为点击事件 ture为鼠标移动事件
var firstTime = 0;
var lastTime = 0;
export default {
  name: "washDetail",
  data() {
    return {
      //当前页
      checkName: "btn-checkboxId",
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      activeName: "first",
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
      fileCurrent: 0,
      operateCurrent: 0,
      fileNameCurrent: 0,
      itemOne: {},
      itemFile: {},
      cheboxFlag: false,
      batchManageFlag: true,
      moveSelShowFlag: false,
      upLoadFilelist: [],
      fileIds: [],
      fileList: [],
      fileListOptinUpload: [],
      moveObj: {},
      imgList: [],
      imgListOriginal: [],
      imgListRest: [],
      moveClassify: "",
      actionUrl: "",
      uploadFlag: false,
      indexItemArr: [],
      deleteArr: [],
      dragArr: [],
      classifyNameInput: "",
      classifyNameInputFlag: "",
      upLoadSaveName: "",
      imgIndexPass: 0,
      tableData: [],
      imgUrlPass: "",
      imgInfoPassFlag: false,
      imgInfoPassFileList: [],
      totalPage: 1,
      materiaiIdPass: "",
      classifyChildren: "",
      ieClientX: 0,
      ieClientY: 0,
      getClientFlag: false,
      materiaiIdSave: 0,
      operateShowFlag: false
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
        this.cheboxFlag = false;
        this.batchManageFlag = true;
        this.currentPage = 1;
        this.pageSize = 10;
        this.getFileList();
        this.getImgList();
      }
    },
    //  上传图片
    uploadImg() {
      this.uploadFileFlag = true;
      this.uploadFlag = false;
      // this.upLoadAddFile();
    },
    //  新建分类
    newClassify() {
      this.batchManageFlag = true;
      this.resetCheck();
      this.addClassifyFlag = true;
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
      if (vm.uploadFileFlag) {
        vm.upLoadSaveName = vm.classifyName;
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
    //上传文件按钮
    upLoadAddFile() {
      // let fileClassify;
      // if (this.selectFile) {
      //   fileClassify = this.selectFile;
      // } else {
      //   fileClassify = 0;
      // }
      // this.actionUrl = `./manage/publicservice/label/image/upload?orderId=${
      //   this.$route.params.id
      // }&imgType=1&fileClassify=${fileClassify}`;
    },
    // 分类取消按钮
    classifyBtnN() {
      this.addClassifyFlag = false;
      this.classifyName = "";
      this.selectFile = "";
    },
    //单个下拉显示隐藏
    moveSelShow() {
      this.moveSelShowFlag = !this.moveSelShowFlag;
    },
    // 上传关闭按钮
    upLoadBtnN() {
      this.batchManageFlag = true;
      this.resetCheck();
      this.selectFile = "";
      this.upLoadFilelist = [];
      this.fileIds = [];
      if (this.uploadFlag) {
        this.currentPage = 1;
        // this.pageSize = 10;
        this.getFileList();
        this.getImgList();
      }
    },
    upLoadChange(item) {
      if (item.toString() == "0") {
        this.addClassifyFlag = true;
      }
    },
    //上传图片操作
    onBeforeUpload(file) {
      const flag = file.name
        .split(".")
        .pop()
        .toLowerCase();
      let arr = ["jpg", "png", "zip"];
      let isTYPE;
      for (var i = 0; i < arr.length; i++) {
        if (flag === arr[i]) {
          isTYPE = true;
          break;
        } else {
          isTYPE = false;
        }
      }
      const isLt1M = file.size / 1024 / 1024 < 20;

      if (!isTYPE) {
        this.$message.error("上传文件只能是jpg,png,jpeg,gif,zip格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传文件大小不能超过 20MB!");
      }
      return isTYPE && isLt1M;
    },
    handleRemove(file, fileList) {
      this.upLoadFilelist = fileList;
      this.fileIds = fileList;
    },
    handleAvatarSuccess(res, file) {
      this.uploadFlag = true;
      let arr1 = [];
      if (res[0] && res[0].fileId) {
        arr1.push(res[0].fileId);
      }
      if (this.fileIds && this.fileIds.length) {
        this.fileIds = this.fileIds.concat(arr1);
      } else {
        this.fileIds = [].concat(arr1);
      }
    },
    handleAvatarError(err, file, fileList) {
      this.$message.error(JSON.parse(err.message).message);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        // `当前限制选择 5 个文件，本次选择了 ${
        //   files.length
        // } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        `最多支持上传5个文件`
      );
    },
    //操作图片调取服务
    dragImg(data, operatObj) {
      let vm = this;
      vm.api
        .post(`./manage/service/materiai/updateMetariai`, data)
        .then(function(response) {
          if (response.status == 200) {
            if (operatObj == "big") {
              vm.getFileList();
              vm.toChange("下", "delete");
            } else {
              vm.currentPage = 1;
              vm.getFileList();
              vm.getImgList();
            }
          }
        })
        .catch(function(error) {});
    },
    //移动单个
    moveSelChoose(itema, item, indexa) {
      let objArr = [];
      let objObj = {};
      objObj.fileClassify = itema.classifyId;
      objObj.filterStatus = 1;
      objObj.materiaiId = item.materiaiId;
      objObj.orderId = this.$route.params.id;
      objArr.push(objObj);
      this.dragImg(objArr);
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
      this.dragImg(this.dragArr);
    },
    //删除多个
    multiDelete() {
      if (this.deleteArr.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择要删除的照片",
          type: "warning"
        });
        return;
      }
      this.titleName = "确定要把照片删除吗？";
      this.titleDesc = "删除后不可恢复";
      this.operateFlag = "deleteMulti";
      this.operatePoint = true;
    },
    //删除单个
    deleteOne(index, item) {
      this.titleName = "确定要把照片删除吗？";
      this.titleDesc = "删除后不可恢复";
      this.operateFlag = "deleteOne";
      this.operatePoint = true;
      this.itemOne = item;
      this.itemOne.imgIndex = index;
    },
    //删除文件夹
    deleteFile(index, item) {
      this.titleName = "确定要把文件夹删除吗？";
      this.titleDesc = "删除后不可恢复";
      this.operateFlag = "deleteFile";
      this.operatePoint = true;
      this.itemFile = item;
    },
    //删除确认操作
    operateBtnY() {
      if (this.operateFlag == "deleteOne") {
        let arrFlag = [];
        let objFlag = {};
        objFlag.dataState = 0;
        objFlag.materiaiId = this.itemOne.materiaiId;
        objFlag.orderId = this.$route.params.id;
        arrFlag.push(objFlag);
        this.dragImg(arrFlag);
        this.operatePoint = false;
      }
      if (this.operateFlag == "deleteMulti") {
        this.dragImg(this.deleteArr);
        this.operatePoint = false;
      }
      if (this.operateFlag == "deleteFile") {
        let vm = this;
        let objFlag = {};
        objFlag.fileClassify = vm.itemFile.classifyId;
        objFlag.orderId = vm.$route.params.id;
        vm.operatePoint = false;
        vm.api
          .post(`./manage/service/materiai/updateMetariaiClassly`, objFlag)
          .then(function(response) {
            if (response.status == 200) {
              vm.getFileList();
            }
          })
          .catch(function(error) {});
      }
    },
    operateBtnN() {
      this.operatePoint = false;
    },
    //点击展示大图
    clickBig(item, index) {
      if (!this.batchManageFlag) {
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
      }
      if (key) {
        // console.log("click");
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
        key = false;
      }
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
            this.getImgList(2);
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

          this.getImgList(6);
        } else {
          if (this.imgList[this.imgIndexPass].currentPage != this.totalPage) {
            if (operateFlag == "delete") {
              this.getImgList(6);
            } else {
              this.currentPage = this.currentPage + 1;
              this.getImgList(3);
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
          this.currentPage = 1;
          if (this.imgIndexPass == this.imgList.length - 1) {
            this.imgInfoPassFlag = false;
          }
        }
        //  else {
        //   if (this.imgIndexPass == this.imgList.length - 1) {
        //     // this.currentPage = 1;
        //     this.imgIndexPass = 0;
        //   }
        // }
        // return;
      }
      this.getImgList(4);
    },
    //大图分类至
    detailClassifyTo(val) {
      let objArr = [];
      let objObj = {};
      objObj.fileClassify = val;
      objObj.filterStatus = 1;
      objObj.materiaiId = this.materiaiIdPass;
      objObj.orderId = this.$route.params.id;
      objArr.push(objObj);
      this.dragImg(objArr, "big");
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
      this.dragImg(arrFlag, "big");
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
        this.$route.params.orderStatus == 6
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
    //鼠标移入显示
    mouEnterOpe: function(item, index) {
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
      this.moveObj = item;
      this.operateSeen = true;
      this.operateCurrent = index;
    },
    //鼠标移出隐藏
    mouOutOpe: function(index) {
      this.operateSeen = false;
      this.operateCurrent = null;
      this.moveSelShowFlag = false;
    },
    mousedownPic(item, index) {
      if (!this.batchManageFlag) {
        return;
      }
      firstTime = new Date().getTime();
      // console.log("mouseDown");
      let e = event || window.event;
      let itemFile = document.getElementsByClassName("fileItem");
      let saveDragIndex = "x";
      let odiv = $($(".pictureImg")[index])[0]; //获取目标元素imgItem
      let clientWidth = odiv.clientWidth;
      let clientHeight = odiv.clientWidth;
      odiv.style.float = "none";
      odiv.style.zIndex = 100000;
      odiv.style.position = "fixed";
      odiv.style.opacity = 0.6;
      //算出鼠标相对元素的位置
      let disX = e.clientX;
      let disY = e.clientY;
      let left;
      let top;
      odiv.style.left = disX - clientWidth / 2 + "px";
      odiv.style.top = disY - clientWidth / 2 + "px";

      // odiv.style.left = e.clientX - (e.clientX - odiv.offsetLeft) + "px";
      // odiv.style.top = e.clientY - (e.clientY - odiv.offsetTop) + "px";

      odiv.style.width = clientWidth + "px";
      odiv.style.height = clientWidth + "px";
      odiv.style.padding = 0;
      for (var i = 0; i < $(".imgOperateBox").length; i++) {
        $(".imgOperateBox")[i].style.display = "none";
      }
      document.onmousemove = e => {
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置

        let odivParent = $($(".imgItem")[index])[0]; //获取目标元素
        odivParent.style.width = clientWidth + "px";
        odivParent.style.height = clientWidth + "px";
        left = e.clientX;
        top = e.clientY;
        odiv.style.width = clientWidth + "px";
        odiv.style.height = clientWidth + "px";
        odiv.style.padding = 0;
        //移动当前元素
        odiv.style.left = left - clientWidth / 2 + "px";
        odiv.style.top = top - clientWidth / 2 + "px";
        // odiv.style.left = e.clientX - (e.clientX - odiv.offsetLeft) + "px";
        // odiv.style.top = e.clientY - (e.clientY - odiv.offsetTop) + "px";

        for (var i = 0; i < this.fileList.length; i++) {
          let bigLeft =
            itemFile[i].getBoundingClientRect().left +
            itemFile[i].getBoundingClientRect().width;
          let leftFile = itemFile[i].getBoundingClientRect().left;
          let bigTop =
            itemFile[i].getBoundingClientRect().top +
            itemFile[i].getBoundingClientRect().height;
          let topFile = itemFile[i].getBoundingClientRect().top;
          if (
            left < bigLeft &&
            left > leftFile &&
            top < bigTop &&
            top > topFile
          ) {
            itemFile[i].style.background = "red";
            saveDragIndex = i;
          } else {
            itemFile[i].style.background = "none";
            // saveDragIndex = "x";
          }
        }
        this.operateSeen = true;
      };
      document.onmouseup = e => {
        // console.log("mouseUp");
        //鼠标抬起后 记录时间 超过200ms就是移动事件
        lastTime = new Date().getTime();
        if (lastTime - firstTime < 200) {
          key = true;
        }
        document.onmousemove = null;
        document.onmouseup = null;
        odiv.style.position = "static";
        odiv.style.float = "left";
        odiv.style.opacity = 1;
        //鼠标按下并移动的事件
        //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
        left = e.clientX;
        top = e.clientY;
        odiv.style.width = clientWidth + "px";
        odiv.style.height = clientHeight + "px";
        //移动当前元素
        odiv.style.left = left - clientWidth / 2 + "px";
        odiv.style.top = top - clientHeight / 2 + "px";

        for (var i = 0; i < this.fileList.length; i++) {
          let bigLeft =
            itemFile[i].getBoundingClientRect().left +
            itemFile[i].getBoundingClientRect().width;
          let leftFile = itemFile[i].getBoundingClientRect().left;
          let bigTop =
            itemFile[i].getBoundingClientRect().top +
            itemFile[i].getBoundingClientRect().height;
          let topFile = itemFile[i].getBoundingClientRect().top;
          if (
            left < bigLeft &&
            left > leftFile &&
            top < bigTop &&
            top > topFile
          ) {
            itemFile[i].style.background = "red";
            saveDragIndex = i;
            itemFile[saveDragIndex].style.background = "none";
            let obj = {};
            let dataFlagArr = [];
            obj.filterStatus = 1;
            obj.orderId = this.$route.params.id;
            obj.fileClassify = this.fileList[saveDragIndex].classifyId;
            obj.materiaiId = this.imgList[index].materiaiId;
            dataFlagArr.push(obj);
            this.dragImg(dataFlagArr);
          } else {
            itemFile[i].style.background = "none";
          }
        }
        this.operateSeen = true;
      };
    },
    //复选框选择
    checkboxChange(index, item) {
      let deleteObj = {};
      let dragObj = {};
      // this.$set(this.imgList[index], "isSel", item.isSel);
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
      this.indexArr = [];
      for (var i = 0; i < this.imgList.length; i++) {
        this.imgList[i].isSel = false;
      }
    },
    // 获取文件夹列表数据
    getFileList() {
      let vm = this;
      vm.api
        .get(
          "./manage/service/materiai/findImgfileGroup?checkingStatus=" +
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
            vm.fileListOptinUpload = vm.fileList.slice(0);
            let dataAddObj = {};
            dataAddObj.classifyId = 0;
            dataAddObj.classifyName = "+ 创建新分类";
            vm.fileListOptinUpload.push(dataAddObj);
            //上传文件新建分类时回填值
            if (vm.uploadFileFlag) {
              for (var i = 0; i < vm.fileListOptinUpload.length; i++) {
                if (
                  vm.fileListOptinUpload[i].classifyName == vm.upLoadSaveName
                ) {
                  vm.selectFile = vm.fileListOptinUpload[i].classifyId;
                }
              }
            }
          }
        })
        .catch(function(error) {});
    },
    // 获取图片列表数据
    getImgList(flagClick) {
      let vm = this;
      vm.api
        .get(
          `./manage/service/materiai/findMetariaiImg?currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}&orderId=` + this.$route.params.id
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
    //下载图片
    downImg(dataArr) {
      if (dataArr.length) {
        for (var i = 0; i < dataArr.length; i++) {
          if (dataArr[i] && dataArr[i].materiaiId && !dataArr[i].imgUrl) {
            dataArr[i].imgUrl =
              location.origin +
              `/manage/publicservice/label/image/download?fId=${
                dataArr[i].materiaiId
              }&imgType=1`;
          } else {
            break;
          }
        }
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getImgList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getImgList();
    }
  },
  components: { washStory, viewPicture },
  computed: {
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  mounted() {
    this.$route.matched[0].meta.title = "清洗分类";
    this.getFileList();
    this.getImgList();
    this.actionUrl = `./manage/publicservice/label/image/upload?orderId=${
      this.$route.params.id
    }&imgType=1&fileClassify=0`;
  },
  watch: {
    selectFile(newVal, oldVal) {
      let fileClassify;
      if (this.selectFile) {
        fileClassify = this.selectFile;
      } else {
        fileClassify = 0;
      }
      this.actionUrl = `./manage/publicservice/label/image/upload?orderId=${
        this.$route.params.id
      }&imgType=1&fileClassify=${fileClassify}`;
    },
    operateShowFlag(newVal, oldVal) {
      if (newVal) {
        // this.operateSeen = false;
        this.operateCurrent = 10000000000000;
      }
    }
  }
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
.uploadFileBox /deep/ .el-dialog__body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 280px;
  justify-content: center;
}
.attachmentUpload /deep/ .el-upload-list__item {
  height: 36px;
}
.fileTitle /deep/ .el-input__inner {
  height: 18px !important;
  line-height: 16px !important;
  padding: 0 8px !important;
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
  .attachmentUpload {
    height: 100%;
    width: 100%;
    .addFileBtn {
      position: absolute;
      left: 335px;
      top: 22px;
    }
    .el-upload-list__item {
      height: 36px;
    }
  }
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
            cursor: pointer;
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
          .el-input__inner {
            height: 15px;
          }
        }
        .fileNum {
          width: 100%;
          padding: 0px 10px;
          font-size: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #597ef7;
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
        // position: relative;
        .imgInfoHeader {
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: space-between;
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
          //display: flex;
          // justify-content: space-between;
          //flex-wrap: wrap;
          width: 100%;
          //box-sizing: border-box;
          .imgItem {
            position: relative;
            width: calc(20% - 20px);
            margin-right: 20px;
            margin-bottom: 20px;
            float: left;
            // border: 1px solid red;
            //box-sizing: border-box;
            // &:after {
            //   display: block;
            //   content: "";
            //   visibility: hidden;
            //   clear: both;
            // }

            .fileImg {
              width: 100%;
              position: relative;
              padding-top: 100%;
              background-size: cover;
              background-repeat: no-repeat;
              cursor: pointer;
              box-sizing: border-box;
            }
            .pictureImg {
              width: 100%;
              position: relative;
              padding-top: 100%;
              background-size: cover;
              background-repeat: no-repeat;
              cursor: pointer;
              box-sizing: border-box;
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
                  margin-top: 5px;
                  background: #fff;
                  z-index: 1001;
                  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                  border-radius: 2px;
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
