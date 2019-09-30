<template>
  <div class="washStory">
    <viewPicture :imgInfoPass="imgInfoPass" @toChange="toChange" />
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
    <!-- <el-dialog
      :visible.sync="uploadFileFlag"
      width="560px"
      top="10vh"
      class="uploadFileBox"
    >
      <div class="selectFile">
        <span class="title">上传文件到</span>
        <el-select v-model="selectFile" placeholder="请选择">
          <el-option
                      v-for="(item, index) in fileList"
                      :key="index"
                      :label="item.classifyName"
                      :value="item.classifyId"
                    >
                    </el-option>
        </el-select>
      </div>
      <div class="new" @click="classifyBtnY">添加文件</div>
    </el-dialog> -->
    <div class="content-box">
      <!-- tab页签 -->
      <!-- <div class="tabBox">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="图片库" name="first"> </el-tab-pane>
          <el-tab-pane label="清洗库" name="second"></el-tab-pane>
        </el-tabs>
        <div class="tabBottom"></div>
      </div> -->
      <!-- 图片库 -->
      <div class="infoHeadBtn">
        <div class="new" @click="newClassify">新建分类</div>
        <div class="new" @click="submitCli">提交</div>
      </div>
      <div class="contentBoxInfo">
        <!-- 文件夹列表 -->
        <div class="fileListBox">
          <template v-for="(item, index) in fileList">
            <div
              class="fileItem"
              @mouseenter="mouEnterFile(item, index)"
              @mouseleave="mouOutFile()"
              v-if="item.fileCount || index == 0"
            >
              <div class="fileImgBox">
                <img
                  src="../../../../assets/img/file.svg"
                  alt="file"
                  class="fileImg"
                  @click="fileClick(item)"
                />
                <div
                  class="deleteOperate"
                  @click="deleteFile(index, item)"
                  v-if="fileSeen && index == fileCurrent && index != 0"
                >
                  <i class="el-icon-delete"></i>
                </div>
              </div>
              <input
                type="text"
                focus
                class="fileTitle"
                style="line-height:1;border:1px solid #c0c4cc;padding:3px 8px"
                v-model="classifyNameInput"
                @blur="inputBlur(item, index)"
                v-if="fileNameSeen && index == fileNameCurrent && index != 0"
              />
              <p
                class="fileTitle ellipsis"
                @click="clickFileName(item, index)"
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
          <div class="imgInfoHeader" v-if="imgLength">
            <div class="imgInfoTitle">
              <span class="title">{{ imgTitle }}</span>
              <span class="num">({{ imgLength }}张)</span>
            </div>
            <div class="imgInfoOperate">
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
          <div class="imgItemBox">
            <div
              v-for="(item, index) in imgList"
              :key="index"
              class="imgItem"
              @mouseenter="mouEnterOpe(item, index)"
              @mouseleave="mouOutOpe()"
              @click="clickBig(item, index)"
            >
              <div
                :style="{ backgroundImage: 'url(' + item.imgUrl + ')' }"
                class="fileImg"
                :data-imgInfo="JSON.stringify(item)"
              ></div>
              <div
                class="imgOperateBox"
                v-if="operateSeen && index == operateCurrent && !cheboxFlag"
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
              <el-checkbox
                v-model="item.isSel"
                v-if="cheboxFlag"
                @change="checkboxChange(index, item)"
              ></el-checkbox>
            </div>
          </div>
          <div class="paging-box" v-if="imgLength > pageSize || pageSize > 10">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import viewPicture from "./viewPicture";
export default {
  name: "washStory",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
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
      imgLength: 0,
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
      indexArr: [],
      indexItemArr: [],
      deleteArr: [],
      dragArr: [],
      fileClassifyId: "",
      commandFlag: "",
      classifyNameInput: "",
      classifyNameInputFlag: "",
      imgInfoPass: {
        fileList: [],
        imgInfo: {},
        showFlag: false
      }
    };
  },
  methods: {
    //  tabs切换
    handleClick() {},
    //  上传图片
    uploadImg() {
      this.uploadFileFlag = true;
    },
    //  新建分类
    newClassify() {
      this.batchManageFlag = true;
      this.resetCheck();
      this.addClassifyFlag = true;
    },
    // 提交按钮
    submitCli() {
      this.titleName = "确定要提交？";
      this.titleDesc = "提交后该订单将进入下一流程";
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
      objArr.push(objObj);
      let obj = {};
      obj.toFileClassify = itema.classifyId;
      obj.fileClassify = this.fileClassifyId;
      this.operateItem(objArr, "updateMetariai", "moveOne", obj);
      this.operateOne(indexa);
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
      this.operateItem(this.dragArr, "updateMetariai", "moveMulti");
      this.operateMulti(this.indexItemArr);
      // this.addImg(this.indexArr.length);
    },
    //移动后补全全照片
    addImg(num) {
      let vm = this;
      if (num == 1 && vm.imgLength < 11) {
        return;
      }
      if (vm.imgListRest.length) {
        for (var i = 0; i < num; i++) {
          if (vm.imgListRest[i] && vm.imgListRest[i].materiaiId) {
            vm.imgListRest[i].imgUrl =
              location.origin +
              `/manage/publicservice/label/image/download?fId=${
                vm.imgListRest[i].materiaiId
              }&imgType=1`;
          } else {
            break;
          }
        }
        vm.imgList = vm.imgList.concat(vm.imgListRest.splice(0, num));
        vm.imgLength = vm.imgLength - num;
        for (var i = 0; i < vm.imgList.length; i++) {
          vm.imgList[i].isSel = false;
        }
      }
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
      this.titleDesc = "删除后可在图片库查询";
      this.operateFlag = "deleteMulti";
      this.operatePoint = true;
    },
    deleteOne(index, item) {
      this.titleName = "确定要把照片删除吗？";
      this.titleDesc = "删除后可在图片库查询";
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
    //操作单个文件后图片变化
    operateOne(index) {
      let vm = this;
      vm.imgList.splice(index, 1);
      vm.imgLength > 0 ? vm.imgLength-- : 0;
      //其他页删完了跳向上一页
      if (!vm.imgList.length && vm.currentPage > 1) {
        vm.handleCurrentChange(vm.currentPage - 1);
        return;
      }
      vm.addImg(1);
    },
    //操作多个文件后图片变化
    operateMulti(indexItemArrFlag) {
      let vm = this;
      let arrFlag = vm.imgListOriginal.slice(0);
      for (var i = 0; i < arrFlag.length; i++) {
        for (var j = 0; j < indexItemArrFlag.length; j++) {
          if (arrFlag[i].materiaiId == indexItemArrFlag[j]) {
            arrFlag.splice(i, 1);
          }
        }
      }
      vm.imgLength = arrFlag.length;
      vm.totals = arrFlag.length;
      vm.imgListOriginal = arrFlag;
      if (vm.imgLength < vm.pageSize) {
        vm.imgList = arrFlag;
      } else {
        vm.imgList = arrFlag.slice(0, vm.pageSize);
        vm.imgListRest = arrFlag.slice(vm.pageSize, vm.imgLength);
      }
      vm.currentPage = Math.ceil(vm.imgLength / vm.pageSize);
      vm.indexItemArr = [];
      vm.handleCurrentChange(1);
      // vm.downImg(vm.imgList);
    },
    //删除确认操作
    operateBtnY() {
      let vm = this;
      if (this.operateFlag == "deleteOne") {
        let arrFlag = [];
        let objFlag = {};
        objFlag.dataState = 0;
        objFlag.materiaiId = this.itemOne.materiaiId;
        arrFlag.push(objFlag);
        vm.operateItem(arrFlag, "updateMetariaiFile", "one");
        vm.operateOne(this.itemOne.imgIndex);
      }
      if (this.operateFlag == "deleteMulti") {
        this.operateItem(this.deleteArr, "updateMetariaiFile", "multi");
        this.operatePoint = false;
        this.operateMulti(this.indexItemArr);
        // this.addImg(this.indexArr.length);
      }
      if (this.operateFlag == "deleteFile") {
        let objFlag = {};
        objFlag.fileClassify = this.itemFile.classifyId;
        objFlag.orderId = this.$route.params.id;
        this.operateItem(objFlag, "updateMetariaiClassly");
      }
      if (this.operateFlag == "submit") {
        vm.api
          .post(`./manage/service/materiai/submtImgFile`, {
            orderId: this.$route.params.id
          })
          .then(function(response) {
            if (response.status == 200) {
              vm.$router.push({ name: "washList" });
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
    operateItem(data, url, num, operatObj) {
      let vm = this;
      vm.api
        .post(`./manage/service/materiai/${url}`, data)
        .then(function(response) {
          if (response.status == 200) {
            if (url == "updateMetariaiClassly") {
              vm.getFileList();
            }
            if (num == "moveOne") {
              for (var i = 0; i < vm.fileList.length; i++) {
                if (vm.fileList[i].classifyId == operatObj.fileClassify) {
                  vm.fileList[i].fileCount > 0 ? vm.fileList[i].fileCount-- : 0;
                }
                if (vm.fileList[i].classifyId == operatObj.toFileClassify) {
                  vm.fileList[i].fileCount++;
                }
              }
            }
            if (num == "moveMulti") {
              for (var i = 0; i < vm.fileList.length; i++) {
                if (vm.fileList[i].classifyId == vm.fileClassifyId) {
                  vm.fileList[i].fileCount =
                    vm.fileList[i].fileCount - vm.indexArr.length;
                }
                if (vm.fileList[i].classifyId == vm.commandFlag) {
                  vm.fileList[i].fileCount =
                    vm.fileList[i].fileCount + vm.indexArr.length;
                }
              }
            }
            if (num == "one") {
              for (var i = 0; i < vm.fileList.length; i++) {
                if (vm.fileList[i].classifyId == vm.fileClassifyId) {
                  vm.fileList[i].fileCount > 0 ? vm.fileList[i].fileCount-- : 0;
                }
              }
            }
            if (num == "multi") {
              for (var i = 0; i < vm.fileList.length; i++) {
                if (vm.fileList[i].classifyId == vm.fileClassifyId) {
                  vm.fileList[i].fileCount =
                    vm.fileList[i].fileCount - vm.indexArr.length;
                }
              }
            }
          }
        })
        .catch(function(error) {});
    },
    //点击展示大图
    clickBig(item, index) {
      this.imgInfoPass.showFlag = true;
      this.imgInfoPass.imgInfo = item;
    },
    toChange(materiaiId, flag) {
      console.log(materiaiId);
      console.log(flag);
    },
    //点击文件夹名称
    clickFileName: function(item, index) {
      if (index == 0) {
        this.fileNameSeen = false;
      }
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
      this.moveObj = item;
      this.operateSeen = true;
      this.operateCurrent = index;
    },
    //图片鼠标移出隐藏
    mouOutOpe: function(index) {
      this.operateSeen = false;
      this.operateCurrent = null;
      this.moveSelShowFlag = false;
    },
    //复选框选择
    checkboxChange(index, item) {
      this.imgInfoPass.showFlag = false;
      let deleteObj = {};
      let dragObj = {};
      if (item.isSel) {
        deleteObj.dataState = 0;
        deleteObj.materiaiId = item.materiaiId;
        dragObj.fileClassify = "";
        dragObj.orderId = item.orderId;
        dragObj.materiaiId = item.materiaiId;
        dragObj.filterStatus = 1;
        this.deleteArr.push(deleteObj);
        this.dragArr.push(dragObj);
        this.indexArr.push(index + this.pageSize * (this.currentPage - 1));
        this.indexItemArr.push(item.materiaiId);
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
        this.indexArr.remove(index + this.pageSize * (this.currentPage - 1));
        this.indexItemArr.remove(item.materiaiId);
      }
    },
    //批量管理按钮点击
    batchManage() {
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
    //点击文件夹查询图片
    fileClick(item) {
      let vm = this;
      vm.imgTitle = item.classifyName;
      vm.currentPage = 1;
      vm.batchManageFlag = true;
      vm.resetCheck();
      vm.fileClassifyId = item.classifyId;
      let data = {};
      data.orderId = this.$route.params.id;
      data.fileClassify = item.classifyId;
      vm.api
        .post(`./manage/service/materiai/findMetaImgById`, data)
        .then(function(response) {
          if (response.status == 200) {
            if (response.data) {
              vm.imgLength = response.data.length;
              vm.totals = response.data.length;
              vm.imgListOriginal = response.data;
              if (vm.imgLength > vm.pageSize) {
                vm.imgList = response.data.slice(0, vm.pageSize);
                vm.imgListRest = response.data.slice(vm.pageSize, vm.imgLength);
              } else {
                vm.imgList = response.data;
              }
              vm.downImg(vm.imgList);
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
          "./manage/service/materiai/findImgfileGroup?orderId=" +
            this.$route.params.id
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.imgInfoPass.fileList = response.data;
            vm.fileList = response.data;
            if (response.data && response.data.length) {
              let arrFlag = response.data.slice(0);
              let arrFlagAdd = [];
              for (var i = 0; i < arrFlag.length; i++) {
                if (arrFlag[i].fileCount > 0) {
                  arrFlagAdd.push(arrFlag[i]);
                }
              }
              //第一次加载时渲染图片列表
              if (firstLoad) {
                if (arrFlagAdd.length) {
                  if (arrFlagAdd[1] && arrFlagAdd[1].fileCount) {
                    let dataObj = {};
                    dataObj.orderId = arrFlagAdd[1].orderId;
                    dataObj.classifyId = arrFlagAdd[1].classifyId;
                    dataObj.classifyName = arrFlagAdd[1].classifyName;
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
                    vm.fileClick(dataObj);
                  }
                }
              }
            }
          }
        })
        .catch(function(error) {});
    },
    // 获取图片列表数据
    // getImgList() {
    //   let vm = this;
    //   vm.api
    //     .get("./manage/service/materiai/findMetariaiImg?orderId="+this.$route.params.id)
    //     .then(function(response) {
    //       if (response.status == 200) {
    //         if (response.data && response.data.length) {
    //           vm.imgList = response.data;
    //           vm.imgLength = response.data.length;
    //           for (var i = 0; i < 11; i++) {
    //             if (response.data[i].materiaiId) {
    //               vm.imgList[i].imgUrl =
    //                 location.origin +
    //                 `/manage/publicservice/label/image/download?fId=${
    //                   response.data[i].materiaiId
    //                 }&imgType=1`;
    //             }
    //           }
    //         }
    //       }
    //     })
    //     .catch(function(error) {});
    // },
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
      let vm = this;
      vm.currentPage = val;
      let arrFlag = vm.imgListOriginal.slice(0);
      vm.imgList = arrFlag.slice((val - 1) * vm.pageSize, val * vm.pageSize);
      vm.imgListRest = arrFlag.slice(val * vm.pageSize, vm.imgLength);
      vm.downImg(vm.imgList);
      //设置复选框的值
      for (var j = 0; j < vm.imgList.length; j++) {
        vm.imgList[j].isSel = false;
        for (var i = 0; i < vm.indexItemArr.length; i++) {
          if (vm.imgList[j].materiaiId == vm.indexItemArr[i]) {
            vm.imgList[j].isSel = true;
          }
        }
      }
    }
  },
  components: { viewPicture },
  computed: {},
  mounted() {
    this.getFileList(true);
    // this.getImgList();
  },
  watch: {}
};
</script>

<style scoped lang="less">
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
.washStory {
  height: 100%;
  // padding: 14px 24px 24px 24px;
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
    margin-bottom: 8px;
    .el-button {
      background: #597ef7;
    }
  }
  .content-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    .contentBoxInfo {
      height: 100%;
      display: flex;
      justify-content: space-between;
      .fileListBox {
        background: #fff;
        box-sizing: border-box;
        border: 1px solid rgba(232, 232, 232, 1);
        width: 270px;
        height: 100%;
        overflow-y: auto;
        .fileItem {
          float: left;
          width: 33%;
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
            width: 28px;
            height: 28px;
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
        }
        .fileNum {
          width: 100%;
          padding: 0px 10px;
          font-size: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #597ef7;
          cursor: default;
        }
      }
      .imgInfoBox {
        width: calc(100% - 270px);
        height: calc(100%-38px);
        padding: 0 0 0 25px;
        box-sizing: border-box;
        border: 1px solid rgba(232, 232, 232, 1);
        border-left: none;
        background: #fff;
        overflow-y: auto;
        overflow-x: hidden;
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
          .imgInfoOperate {
            .btnCommon {
              margin-right: 0 !important;
              margin-bottom: 0 !important;
              margin-left: 6px;
            }
          }
        }
        .imgItemBox {
          display: flex;
          flex-wrap: wrap;
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
            .el-checkbox {
              position: absolute;
              right: 6px;
              top: 6px;
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
