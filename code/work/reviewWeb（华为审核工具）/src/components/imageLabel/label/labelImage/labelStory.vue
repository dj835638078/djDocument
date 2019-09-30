<template>
  <div class="labelStory">
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
    <div class="content-box">
      <!-- 图片库 -->
      <div class="infoHeadBtn" v-if="$route.name != 'labelCheck'">
        <div
          class="release"
          style="width:0px"
          v-if="
            $route.params.nodeState == 2 ||
              $route.params.orderStatus == 98 ||
              $route.params.orderStatus == 99 ||
              $route.params.orderStatus == 4 ||
              $route.params.orderStatus == 5 ||
              $route.params.orderStatus == 6
          "
        ></div>
        <div class="new" v-else style="width:0px"></div>
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
      <div class="infoHeadBtn" v-else>
        <div
          class="release"
          v-if="
            $route.params.nodeState == 2 ||
              $route.params.orderStatus == 98 ||
              $route.params.orderStatus == 99 ||
              $route.params.orderStatus == 4 ||
              $route.params.orderStatus == 5 ||
              $route.params.orderStatus == 6 ||
              submitShowFlag
          "
        >
          提交
        </div>
        <div class="new" @click="submitCli" v-else>
          提交
        </div>
      </div>
      <div class="contentBoxInfo">
        <!-- 文件夹列表 -->
        <div class="fileListBox">
          <template v-for="(item, index) in fileList">
            <div
              class="fileItem"
              v-if="
                item.fileCount || (index == 0 && $route.name != 'labelCheck')
              "
            >
              <div class="fileImgBox">
                <img
                  src="../../../../assets/img/file.svg"
                  alt="file"
                  class="fileImg"
                  @click="fileClick(item, 1)"
                />
              </div>
              <!-- <input
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
              </p> -->
              <p class="fileTitle ellipsis" :title="item.classifyName">
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

      <div class="paging-box" v-if="totals">
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
    <labelImg
      :textName="textName"
      :imgS="imgS"
      :imgIdYN="imgIdYN"
      :list="listS"
      :decide="decide"
      :labelStatus="1"
      :flag="flagName"
      :discriminate="discriminate"
      checkout="保存"
    />
  </div>
</template>

<script>
import labelImg from "./labelImg";
export default {
  name: "labelStory",
  data() {
    return {
      discriminate: "down",
      flagName: "label",
      checkName: "btn-checkboxId",
      decide: "no",
      textName: "",
      imgShow: false,
      imgS: "",
      imgList: "",
      imgIdYN: "",
      imgListYN: [],
      imgIndex: "",
      totalPage: "",
      listS: [],
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
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
      deleteArrObj: {},
      dragArr: [],
      dragArrObj: {},
      fileClassifyId: "",
      fileClassifyObj: {},
      commandFlag: "",
      classifyNameInput: "",
      classifyNameInputFlag: "",
      submitShowFlag: false
    };
  },
  methods: {
    // 提交按钮
    submitCli() {
      if (this.$parent.totals) {
        this.$message.warning(`未质检还有数据待质检，请质检后再提交！`);
        return;
      }
      this.titleName = "确定要提交？";
      this.titleDesc = "提交后该订单将进入下一流程";
      this.operateFlag = "submit";
      this.operatePoint = true;
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
      objObj.labelStatus = 1;
      objObj.flag = "label";
      if (this.$route.name == "labelCheck") {
        objObj.flag = "check";
        objObj.checkingStatus = "1";
      }
      objArr.push(item.imgId);
      objObj.ids = objArr;
      objObj.orderId = this.$route.params.id;
      this.operateItem(objObj, "batchMove");
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
      this.dragArrObj.fileClassify = command;
      this.commandFlag = command;
      this.operateItem(this.dragArrObj, "batchMove");
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
      this.titleDesc = "删除图片不可恢复";
      this.operateFlag = "deleteMulti";
      this.operatePoint = true;
    },
    deleteOne(index, item) {
      this.titleName = "确定要把照片删除吗？";
      this.titleDesc = "删除图片不可恢复";
      this.operateFlag = "deleteOne";
      this.operatePoint = true;
      this.itemOne = item;
      this.itemOne.imgIndex = index;
    },
    //删除确认操作
    operateBtnY() {
      let vm = this;
      if (this.operateFlag == "deleteOne") {
        let arrFlag = [];
        let objFlag = {};
        arrFlag.push(this.itemOne.imgId);
        objFlag.orderId = this.$route.params.id;
        objFlag.labelStatus = 1;
        objFlag.ids = arrFlag;
        vm.operateItem(objFlag, "batchDelete");
      }
      if (this.operateFlag == "deleteMulti") {
        this.operateItem(this.deleteArrObj, "batchDelete");
        this.operatePoint = false;
      }
      if (this.operateFlag == "submit") {
        vm.api
          .get(
            `./manage/service/imglabel/labelCommit?orderId=` +
              this.$route.params.id
          )
          .then(function(response) {
            if (response.status == 200) {
              vm.$router.push({ name: "checkLabelList" });
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
        .post(`./manage/service/imglabel/${url}`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.getFileList();
            vm.currentPage = 1;
            vm.fileClick(vm.fileClassifyObj);
          }
        })
        .catch(function(error) {});
    },
    goLeft() {
      if (this.imgList[this.imgIndex].imgId != this.imgListYN[0].imgId) {
        this.imgIndex = this.imgIndex - 1;
        this.imgS = this.imgList[this.imgIndex].imgUrl;
        this.textName = this.imgList[this.imgIndex].fileName;
        this.listS = JSON.parse(this.imgList[this.imgIndex].imgLabelCoordinate);
      } else {
        if (this.imgList[this.imgIndex].currentPage > 1) {
          this.currentPage = this.currentPage - 1;
          this.fileClick(this.fileClassifyObj, 2);
        }
      }
    },
    goRight(val) {
      if (
        this.imgList[this.imgIndex].imgId !=
        this.imgListYN[this.imgListYN.length - 1].imgId
      ) {
        this.imgIndex = this.imgIndex + 1;
        this.imgS = this.imgList[this.imgIndex].imgUrl;
        this.textName = this.imgList[this.imgIndex].fileName;
        this.listS = JSON.parse(this.imgList[this.imgIndex].imgLabelCoordinate);
      } else {
        if (this.imgList[this.imgIndex].currentPage != this.totalPage) {
          this.currentPage = this.currentPage + 1;
          this.fileClick(this.fileClassifyObj, 3);
        } else {
          this.imgShow = false;
          // if(val =='最后一张'){
          //   if(this.imgList[this.imgIndex].currentPage>1)
          // }
        }
      }
    },
    getFL() {
      this.getFileList();
    },
    nextBtn() {
      if (this.imgList[this.imgIndex].currentPage == this.totalPage) {
        //当前页最后一张时
        if (this.totalPage == 1) {
          if (this.imgIndex == this.imgList.length - 1) {
            this.imgShow = false;
          }
        } else {
          this.currentPage = 1;
          this.imgIndex = 0;
        }
      }
      this.fileClick(this.fileClassifyObj, 4);
    },
    //点击展示大图
    clickBig(item, index) {
      //alert("再来打我呀！！！");
      // if (
      //   this.$route.params.nodeState == 2 ||
      //   this.$route.params.orderStatus == 98 ||
      //   this.$route.params.orderStatus == 99
      // ) {
      //   return;
      // }
      this.listS = JSON.parse(item.imgLabelCoordinate);
      this.imgIndex = index;
      this.imgShow = true;
      this.textName = item.fileName;
      this.imgS = item.imgUrl;
      this.imgIdYN = item.imgId;
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
    //图片鼠标移入显示
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
    //图片鼠标移出隐藏
    mouOutOpe: function(index) {
      this.operateSeen = false;
      this.operateCurrent = null;
      this.moveSelShowFlag = false;
    },
    //复选框选择
    checkboxChange(index, item) {
      if (item.isSel) {
        this.deleteArr.push(item.imgId);
        this.deleteArrObj.orderId = item.orderId;
        this.deleteArrObj.labelStatus = 1;
        this.deleteArrObj.ids = this.deleteArr;
        this.dragArr.push(item.imgId);
        this.dragArrObj.orderId = item.orderId;
        this.dragArrObj.fileClassify = "";
        this.dragArrObj.labelStatus = 1;
        this.dragArrObj.ids = this.dragArr;
      } else {
        for (var i = 0; i < this.deleteArr.length; i++) {
          if (this.deleteArr[i] == item.imgId) {
            this.deleteArr.splice(i, 1);
            this.deleteArrObj.ids = this.deleteArr;
          }
        }
        for (var i = 0; i < this.dragArr.length; i++) {
          if (this.dragArr[i] == item.imgId) {
            this.dragArr.splice(i, 1);
            this.dragArrObj.ids = this.dragArr;
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
      this.deleteArrObj = {};
      this.dragArr = [];
      this.dragArrObj = {};
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
      data.flag = "label";
      data.labelStatus = "1";
      data.checkingStatus = "1";
      if (this.$route.name == "labelCheck") {
        data.flag = "check";
      }
      vm.fileClassifyObj.orderId = this.$route.params.id;
      vm.fileClassifyObj.classifyId = item.classifyId;
      vm.fileClassifyObj.classifyName = item.classifyName;
      vm.api
        .post(
          `./manage/service/imglabel/findList?currentPage=${
            vm.currentPage
          }&pageSize=${vm.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            if (response.data) {
              vm.deleteArr = [];
              vm.deleteArrObj = {};
              vm.dragArr = [];
              vm.dragArrObj = {};
              vm.imgList = response.data.result;
              vm.imgListYN = response.data.result;
              vm.totals = response.data.page.totalRows;
              vm.totalPage = response.data.page.totalPage;
              if (vm.totals) {
                for (var i = 0; i < vm.imgList.length; i++) {
                  vm.imgList[i].isSel = false;
                  vm.imgList[i].currentPage = vm.currentPage;
                  if (vm.imgList[i].imgId) {
                    vm.imgList[i].imgUrl =
                      location.origin +
                      `/manage/publicservice/label/image/download?fId=${
                        vm.imgList[i].imgId
                      }&imgType=2`;
                  }
                }
              }

              if (flagClick == 2) {
                vm.imgIndex = vm.imgListYN.length - 1;
                vm.imgS = vm.imgList[vm.imgIndex].imgUrl;
                vm.textName = vm.imgList[vm.imgIndex].fileName;

                vm.listS = JSON.parse(
                  vm.imgList[vm.imgIndex].imgLabelCoordinate
                );
              }
              if (flagClick == 3) {
                vm.imgIndex = 0;
                vm.imgS = vm.imgList[vm.imgIndex].imgUrl;
                vm.textName = vm.imgList[vm.imgIndex].fileName;
                vm.listS = JSON.parse(
                  vm.imgList[vm.imgIndex].imgLabelCoordinate
                );
              }
              if (flagClick == 4) {
                vm.imgS = vm.imgList[vm.imgIndex].imgUrl;
                vm.textName = vm.imgList[vm.imgIndex].fileName;
                vm.imgIdYN = vm.imgList[vm.imgIndex].imgId;
              }
            }
          }
        })
        .catch(function(error) {});
    },
    getBT() {
      this.fileClick(this.fileClassifyObj, 4);
    },
    // 获取文件夹列表数据
    getFileList(firstLoad) {
      let vm = this;
      let data = {};
      data.orderId = this.$route.params.id;
      data.flag = "label";
      data.labelStatus = "1";
      data.checkingStatus = "1";
      if (this.$route.name == "labelCheck") {
        data.flag = "check";
      }
      vm.api
        .post("./manage/service/imglabel/findClassify", data)
        .then(function(response) {
          if (response.status == 200) {
            if (response.data && response.data.length > 1) {
              vm.fileList = response.data;
              let a = vm.fileList.unshift(vm.fileList.pop());
            } else {
              vm.fileList = response.data;
            }
            vm.fileListOptinUpload = vm.fileList.slice(0);
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
                if (arrFlagAdd.length) {
                  if (arrFlagAdd[1] && arrFlagAdd[1].fileCount) {
                    let dataObj = {};
                    vm.fileClassifyId = arrFlagAdd[1].classifyId;
                    dataObj.orderId = arrFlagAdd[1].orderId;
                    dataObj.classifyId = arrFlagAdd[1].classifyId;
                    dataObj.classifyName = arrFlagAdd[1].classifyName;
                    vm.fileClassifyObj.classifyId = arrFlagAdd[1].classifyId;
                    vm.fileClassifyObj.orderId = arrFlagAdd[1].orderId;
                    vm.fileClassifyObj.classifyName =
                      arrFlagAdd[1].classifyName;
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
                    vm.fileClassifyObj.classifyName =
                      arrFlagAdd[0].classifyName;
                    vm.fileClick(dataObj);
                  }
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
  components: { labelImg },
  computed: {},
  mounted() {
    //zx2019.04.01
    if (
      this.$route.params.nodeState == 2 ||
      this.$route.params.orderStatus == 98 ||
      this.$route.params.orderStatus == 99 ||
      this.$route.params.orderStatus == 4 ||
      this.$route.params.orderStatus == 5 ||
      this.$route.params.orderStatus == 6
    ) {
      this.discriminate = "down";
    } else {
      this.discriminate = "yes";
    }
    if (this.$route.name == "labelImage") {
      this.flagName = "label";
    } else {
      this.flagName = "check";
    }
    this.getFileList(true);
  },
  watch: {
    selectFile(newVal, oldVal) {
      if (newVal) {
        this.upFlagEnable = false;
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
.labelStory {
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
    margin-bottom: 8px;
    position: relative;
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
  .content-box {
    height: 100%;
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
          // cursor: pointer;
          position: relative;
        }
        .fileImgBox {
          width: 38px;
          height: 36px;
          overflow: hidden;
          padding-top: 15px;
          cursor: pointer;
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
          // cursor: pointer;
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
