<template>
  <div class="distribute">
    <div>
      <div class="distribute-top-direct">&nbsp;&nbsp;&nbsp;基本信息</div>
      <div class="distribute-form-box">
        <div class="distribute-form">
          <div class="distribute-form-left">客户名称：</div>
          <div
            class="distribute-form-right ellipsis"
            v-text="tools.setRole($route.params.clientAccount)"
          ></div>
        </div>
        <div class="space"></div>
        <div class="distribute-form">
          <div class="distribute-form-left">订单名称：</div>
          <div
            class="distribute-form-right ellipsis"
            v-text="$route.params.orderName"
          ></div>
        </div>
        <div class="space"></div>
        <div class="distribute-form">
          <div class="distribute-form-left">订单编号：</div>
          <div
            class="distribute-form-right ellipsis"
            v-text="$route.params.orderCode"
          ></div>
        </div>
        <div class="space"></div>
        <div class="distribute-form">
          <div class="distribute-form-left">截止日期：</div>
          <div
            class="distribute-form-right ellipsis"
            v-text="tools.setFormTime(parseInt($route.params.endDate))"
          >
            {{ $route.params.endDate }}
          </div>
        </div>
      </div>
    </div>
    <div class="distribute-top-direct">&nbsp;&nbsp;&nbsp;人员配置</div>
    <div class="distribute-bottom">
      <el-table :data="cities" border style="width: 100%">
        <el-table-column prop="itemName" label="流程节点" min-width="85">
        </el-table-column>

        <el-table-column label="执行小组" align="left" width="320">
          <template slot-scope="scope">
            <div class="content-box-left">
              <div
                class="content-box-left-btn"
                @click="optGroup(scope.$index)"
                v-if="
                  scope.row.nodeState != 1 &&
                    scope.row.nodeState != 2 &&
                    $route.params.type != 98 &&
                    $route.params.type != 99 &&
                    $route.params.type != 4 &&
                    $route.params.type != 5 &&
                    $route.params.type != 6
                "
              >
                选择
              </div>
              <div
                class="content-box-left-btn"
                v-else
                style="background:#d9d9d9;"
              >
                选择
              </div>
            </div>
            <div class="content-box-right">
              <ul class="content-box-right-box">
                <!-- item.approvals-->
                <li
                  v-for="(itema, indexa) in scope.row.approvals"
                  :key="indexa"
                >
                  <div class="content-box-right-one">
                    <div
                      class="ellipsis right-one-name"
                      :title="
                        itema.approvalName.length > 4 ? itema.approvalName : ''
                      "
                    >
                      {{ itema.approvalName }}
                    </div>
                    <div
                      v-if="
                        scope.row.nodeState != 1 &&
                          scope.row.nodeState != 2 &&
                          $route.params.type != 98 &&
                          $route.params.type != 99 &&
                          $route.params.type != 4 &&
                          $route.params.type != 5 &&
                          $route.params.type != 6
                      "
                      class="right-one-close"
                      @click="deletegroupOut(scope.row, indexa)"
                    >
                      <i class="el-icon-close"></i>
                    </div>
                  </div>
                </li>
                <li
                  class="lookMorea"
                  v-if="scope.row.approvals.length > 9"
                  @click="seeRroupList(scope.$index)"
                >
                  查看更多
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="执行人员" align="left" width="320">
          <template slot-scope="scope">
            <div class="content-box-left">
              <div
                class="content-box-left-btn"
                @click="optPerson(scope.$index)"
                v-if="
                  scope.row.nodeState != 1 &&
                    scope.row.nodeState != 2 &&
                    $route.params.type != 98 &&
                    $route.params.type != 99 &&
                    $route.params.type != 4 &&
                    $route.params.type != 5 &&
                    $route.params.type != 6
                "
              >
                选择
              </div>
              <div
                class="content-box-left-btn"
                v-else
                style="background:#d9d9d9;"
              >
                选择
              </div>
            </div>
            <div class="content-box-right">
              <ul class="content-box-right-box">
                <!-- item.approvals-->
                <div v-if="scope.row.approvalUsers">
                  <li
                    v-for="(itema, indexa) in scope.row.approvalUsers"
                    :key="indexa"
                  >
                    <div class="content-box-right-one">
                      <div
                        class="ellipsis right-one-name"
                        :title="
                          itema.approvalName.length > 4
                            ? itema.approvalName
                            : ''
                        "
                      >
                        {{ itema.approvalName }}
                      </div>
                      <div
                        v-if="
                          scope.row.nodeState != 1 &&
                            scope.row.nodeState != 2 &&
                            $route.params.type != 98 &&
                            $route.params.type != 99 &&
                            $route.params.type != 4 &&
                            $route.params.type != 5 &&
                            $route.params.type != 6
                        "
                        class="right-one-close"
                        @click="deletePersonOut(scope.row, indexa)"
                      >
                        <i class="el-icon-close"></i>
                      </div>
                    </div>
                  </li>
                </div>
                <li
                  class="lookMorea"
                  v-if="scope.row.approvalUsers.length > 9"
                  @click="seeUserList(scope.$index)"
                >
                  查看更多
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="执行截止日期" align="left" min-width="150">
          <template slot-scope="scope">
            <div class="content-box-time">
              <el-date-picker
                :disabled="
                  $route.params.type == 4 ||
                    scope.row.nodeState == 1 ||
                    scope.row.nodeState == 2 ||
                    $route.params.type == 98 ||
                    $route.params.type == 99 ||
                    $route.params.type == 5 ||
                    $route.params.type == 6
                "
                v-model="scope.row.endDate"
                :picker-options="pickerOptions"
                type="date"
              >
              </el-date-picker>
            </div>
            <!--<div class="content-box-right">2018.08.19</div>-->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="left" min-width="131">
          <template slot-scope="scope">
            <div
              v-if="
                scope.row.nodeState != 1 &&
                  scope.row.nodeState != 2 &&
                  $route.params.type != 98 &&
                  $route.params.type != 99 &&
                  $route.params.type != 4 &&
                  $route.params.type != 5 &&
                  $route.params.type != 6
              "
              class="content-box-left-btn"
              style="float:left;"
              @click="allocation(scope.row, scope.$index)"
              v-text="nameYN(scope.row, scope.$index)"
            ></div>
            <div
              v-else
              class="content-box-left-btn"
              style="background:#d9d9d9;float:left;"
            >
              调整
            </div>
            <div
              v-if="
                scope.row.nodeState != 1 &&
                  scope.row.nodeState != 2 &&
                  $route.params.type != 98 &&
                  $route.params.type != 99 &&
                  $route.params.type != 4 &&
                  $route.params.type != 5 &&
                  $route.params.type != 6
              "
              style="float:left;margin-left:10px"
              class="content-box-left-btn"
              @click="deleteBtn(scope.row, scope.$index)"
            >
              重置
            </div>
            <div
              v-else
              class="content-box-left-btn"
              style="background:#d9d9d9;float:left;margin-left:10px"
            >
              重置
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--执行人员弹框-->
    <div v-if="cities.length">
      <el-dialog
        title="选择执行人员"
        :visible.sync="staff"
        width="630px"
        top="10vh"
      >
        <div class="person-opt">
          <div class="person-opt-box">
            <div class="person-opt-box-left">
              <div class="person-opt-box-left-top">
                <el-select
                  v-model="value8"
                  filterable
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in usersList"
                    :key="item.fwmAccount"
                    :label="item.userName"
                    :value="item.fwmAccount"
                  >
                  </el-option>
                </el-select>
              </div>
              <ul class="person-opt-box-left-bottom">
                <li
                  class="person-opt-box-left-bottom-list"
                  v-for="(itemUser, i) in usersList"
                  :key="i"
                >
                  <div style="float:left">
                    <i class="fa fa-user" style="color:rgba(0, 0, 0, 0.45)"></i>
                  </div>
                  <div
                    class="btnPu ellipsis"
                    @click="pushUser(itemUser)"
                    :title="
                      itemUser.userName.length > 15 ? itemUser.userName : ''
                    "
                  >
                    {{ itemUser.userName }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="person-opt-box-right">
              <div class="person-opt-box-right-name">
                已选执行人员：{{ pushUserList.length }}
              </div>
              <ul class="person-opt-box-right-list">
                <li>
                  <div v-for="(item, index) in pushUserList" :key="index">
                    <div
                      class="content-box-right-one"
                      style="margin-left:0px;margin-right:10px;"
                    >
                      <div class="ellipsis right-one-name">
                        {{ item.approvalName }}
                      </div>
                      <div
                        class="right-one-close"
                        @click="deletePerson(pushUserList, index)"
                      >
                        <i class="el-icon-close"></i>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div style="width:100%;height:65px;">
            <div
              class="blank"
              style="float:right;margin-right:20px;"
              @click="staff = false"
            >
              取消
            </div>
            <div class="new" style="float:right" @click="pushYes">确定</div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        title="选择执行小组"
        :visible.sync="groupY"
        width="630px"
        top="10vh"
      >
        <div class="person-opt">
          <div class="person-opt-box">
            <div class="person-opt-box-left">
              <ul class="person-opt-box-left-bottom" style="height:240px;">
                <li
                  class="person-opt-box-left-bottom-list"
                  v-for="(itemGroup, i) in groupList"
                  :key="i"
                >
                  <div style="float:left">
                    <i
                      class="fa fa-object-group"
                      style="color:rgba(0, 0, 0, 0.45)"
                    ></i>
                  </div>
                  <div
                    class="btnPu ellipsis"
                    @click="pushGroup(itemGroup)"
                    :title="
                      itemGroup.regionName.length > 15
                        ? itemGroup.regionName
                        : ''
                    "
                  >
                    {{ itemGroup.regionName }}
                  </div>
                </li>
              </ul>
            </div>
            <div class="person-opt-box-right">
              <div
                class="person-opt-box-right-name"
                style="height:30px;line-height:15px;"
              >
                已选执行小组：{{ pushGroupList.length }}
              </div>
              <ul class="person-opt-box-right-list">
                <li>
                  <div v-for="(item, index) in pushGroupList" :key="index">
                    <div
                      class="content-box-right-one"
                      style="margin-left:0px;margin-right:10px;"
                    >
                      <div class="ellipsis right-one-name">
                        {{ item.approvalName }}
                      </div>
                      <div
                        class="right-one-close"
                        @click="deletePerson(pushGroupList, index)"
                      >
                        <i class="el-icon-close"></i>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div style="width:100%;height:65px;">
            <div
              class="blank"
              style="float:right;margin-right:20px;"
              @click="groupY = false"
            >
              取消
            </div>
            <div class="new" style="float:right" @click="pushGroupYes">
              确定
            </div>
          </div>
        </div>
      </el-dialog>
      <el-dialog
        :title="cities[layIndex].itemName"
        :visible.sync="seeStaff"
        width="580px"
        top="10vh"
      >
        <div
          style="height:340px;padding:20px 0 0 20px;overflow-y:auto"
          class=""
        >
          <div
            style="width:100%;height:30px;font-weight: 600;"
            v-if="typeIndex == 1"
          >
            执行小组:
          </div>
          <div
            style="width:100%;height:30px;font-weight: 600;"
            v-if="typeIndex == 2"
          >
            执行人员:
          </div>
          <ul style="width:96%;overflow:hidden;" v-if="typeIndex == 1">
            <li
              v-for="(item, index) in cities[layIndex].approvals"
              :key="index"
              class="ellipsis diamondBox"
            >
              {{ item.approvalName }}
            </li>
          </ul>
          <ul style="width:96%;overflow:hidden;" v-if="typeIndex == 2">
            <li
              v-for="(item, index) in cities[layIndex].approvalUsers"
              :key="index"
              class="ellipsis diamondBox"
            >
              {{ item.approvalName }}
            </li>
          </ul>
        </div>
      </el-dialog>
    </div>
    <div class="distribute-top-direct">&nbsp;&nbsp;&nbsp;历史日志</div>
    <div
      class="dailyRecord"
      v-if="recordListBox.length > 0"
      style="border:none;padding-top:0px"
    >
      <div class="recordBox">
        <div class="recordImg">
          <i class="fa fa-map-marker"></i><span class="line"></span>
        </div>
        <div
          class="recordItem"
          v-for="(item, index) in recordListBox"
          :key="index"
        >
          <div>
            <div style="float:left;" class="recordPoint">
              <span class="line"></span>
            </div>
            <div class="recordData" style="float:left;">
              {{ tools.setFormTime(item.createDate, 1) }}
            </div>
            <div
              style="float:left;max-width:690px;height:16px;"
              class="ellipsis"
            >
              <span class="recordOperat"
                >【{{ tools.setOperateStatus(item.logType, 0) }}】</span
              >{{ item.fwmName }}&nbsp;&nbsp;{{ item.logRemark }}
            </div>
            <div style="clear:both"></div>
          </div>
        </div>
      </div>
      <div class="lookMore" v-if="recordList.length > 3">
        <div v-if="dailyLengthFlag" @click="openList">
          查看更多<i class="fa fa-angle-double-down"></i>
        </div>
        <div v-else @click="openList">
          收起<i class="fa fa-angle-double-up"></i>
        </div>
      </div>
    </div>
    <div v-else class="recordBoxa">暂无历史日志</div>
  </div>
</template>
<script>
import api from "@/api";
import { mapState } from "vuex";
export default {
  name: "distribute",
  data() {
    return {
      transferEndDate: "",
      staff: false,
      seeStaff: false,
      seeGroup: false,
      groupY: false,
      value8: "",
      groupList: [],
      pushGroupList: [],
      usersList: [],
      pushUserList: [],
      cities: [],
      citiesList: [],
      layIndex: 0,
      typeIndex: "",
      recordList: [],
      recordListBox: [],
      dailyLengthFlag: false,
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > this.$route.params.endDate;
        }
      }
    };
  },
  mounted() {
    console.log(this.$route.params.type, "ass");
    this.$route.matched[0].meta.title = "接收列表";
    this.findUsers();
    this.getGroup();
    this.queryRecord();
    this.getList();
  },
  watch: {
    //开关打开时 进行人员赋值
    staff() {
      if (this.staff) {
        for (
          var i = 0;
          i < this.cities[this.layIndex].approvalUsers.length;
          i++
        ) {
          if (this.cities[this.layIndex].approvalUsers.length > 0) {
            this.pushUserList.push(this.cities[this.layIndex].approvalUsers[i]);
          }
        }
      } else {
        this.pushUserList = [];
      }
    },
    groupY() {
      if (this.groupY) {
        for (var i = 0; i < this.cities[this.layIndex].approvals.length; i++) {
          if (this.cities[this.layIndex].approvals.length > 0) {
            this.pushGroupList.push(this.cities[this.layIndex].approvals[i]);
          }
        }
      } else {
        this.pushGroupList = [];
      }
    },
    value8() {
      var aaa = false;
      let data = {};
      if (this.value8) {
        for (var i = 0; i < this.usersList.length; i++) {
          if (this.usersList[i].fwmAccount == this.value8) {
            data = this.usersList[i];
          }
        }
        for (var i = 0; i < this.pushUserList.length; i++) {
          if (this.pushUserList[i].approvalPartner == data.fwmAccount) {
            aaa = true;
          }
        }
        if (!aaa) {
          let obj = {};
          obj.approvalPartner = data.fwmAccount;
          obj.approvalName = data.userName;
          this.pushUserList.push(obj);
        }
      }
    }
  },
  components: {},
  computed: {
    ...mapState(["lookUp"])
  },
  methods: {
    nameYN(item, index) {
      console.log(this.citiesList[index]);
      if (
        this.citiesList[index].approvalUsers.length > 0 ||
        this.citiesList[index].approvals.length > 0
      ) {
        return "调整";
      } else {
        return "分配";
      }
    },
    //查看详情
    openList() {
      this.dailyLengthFlag = !this.dailyLengthFlag;
      if (this.dailyLengthFlag) {
        this.recordListBox = this.recordList.slice(0, 3);
      } else {
        this.recordListBox = this.recordList;
      }
    },
    //历史日志
    queryRecord() {
      let vm = this;
      vm.api
        .get(
          `./manage/service/imglabelOrder/findLogs?orderId=${
            this.$route.params.id
          }`
        )
        .then(function(response) {
          if (response.status == 200) {
            let arrFlag = [];
            // arrFlag = response.data.filter(item => {
            //   return item.logType == "assign";
            // });
            vm.recordListBox = arrFlag;
            if (!response.data || response.data.length == 0) {
            } else {
              arrFlag = response.data.filter(item => {
                return item.logType == "assign";
              });
              vm.recordListBox = arrFlag;
              vm.recordList = arrFlag;
              if (arrFlag && arrFlag.length > 3) {
                vm.dailyLengthFlag = true;
                vm.recordListBox = arrFlag.slice(0, 3);
              }
            }
          }
        })
        .catch(function(error) {});
    },
    //获取数据列表
    getList() {
      let vm = this;
      let url = "./manage/service/imglabelDistribution/findDistribution";
      let data = {
        orderId: this.$route.params.id
      };
      this.api
        .post(url, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.citiesList = JSON.parse(JSON.stringify(response.data));
            vm.cities = response.data;
          }
        })
        .catch(function(error) {});
    },
    //分配
    allocation(item, index) {
      if (
        item.nodeState != 1 &&
        item.nodeState != 2 &&
        this.$route.params.type != 98 &&
        this.$route.params.type != 99 &&
        this.$route.params.type != 4 &&
        this.$route.params.type != 5 &&
        this.$route.params.type != 6
      ) {
        if (
          (item.approvals.length > 0 || item.approvalUsers.length > 0) &&
          item.endDate
        ) {
          let vm = this;
          let url = "";
          //有flowId时为修改，否则是新建
          if (item.flowId) {
            url = "./manage/service/imglabelDistribution/updateDistribution";
          } else {
            url = "./manage/service/imglabelDistribution/insertDistribution";
            item.nodeState = "0";
          }
          item.sortId = index + 1;
          item.orderId = this.$route.params.id;
          item.orderStatus = this.$route.params.type;
          this.api
            .post(url, item)
            .then(function(response) {
              if (response.status == 200) {
                vm.getList();
                vm.queryRecord();
              }
            })
            .catch(function(error) {});
        } else {
          if (
            item.approvals.length < 1 &&
            item.approvalUsers.length < 1 &&
            !item.endDate
          ) {
            this.$message.error("请选择执行小组或执行人员和截止日期");
            return;
          }
          if (item.approvals.length < 1 && item.approvalUsers.length < 1) {
            this.$message.error("请选择执行小组或执行人员");
            return;
          }
          if (!item.endDate) {
            this.$message.error("请选择截止日期");
            return;
          }
        }
      } else {
        this.$message.error("该状态下不可进行分配操作~");
      }
    },
    //重置
    deleteBtn(item, index) {
      if (
        item.nodeState != 1 &&
        item.nodeState != 2 &&
        this.$route.params.type != 98 &&
        this.$route.params.type != 99 &&
        this.$route.params.type != 4 &&
        this.$route.params.type != 5 &&
        this.$route.params.type != 6
      ) {
        this.$confirm(
          "此操作将会一键重置您选择的执行小组、执行人员、截止日期，是否继续？",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        )
          .then(() => {
            let data = {
              orderId: this.$route.params.id,
              orderStatus: this.$route.params.type,
              flowId: item.flowId,
              itemName: item.itemName
            };
            let vm = this;
            let url =
              "./manage/service/imglabelDistribution/deleteDistribution";
            this.api
              .post(url, data)
              .then(function(response) {
                if (response.status == 200) {
                  vm.getList();
                  vm.queryRecord();
                }
              })
              .catch(function(error) {});
          })
          .catch(() => {});
      } else {
        this.$message.error("该状态下不可进行删除操作~");
      }
    },
    //获取执行人员
    findUsers() {
      let vm = this;
      let url = "./manage/service/imglabelDistribution/findUsers";
      this.api
        .get(url)
        .then(function(response) {
          if (response.status == 200) {
            vm.usersList = response.data;
          }
        })
        .catch(function(error) {});
    },
    //执行小组
    getGroup() {
      let vm = this;
      let url = "./manage/service/imglabelDistribution/findGroups";
      this.api
        .get(url)
        .then(function(response) {
          if (response.status == 200) {
            vm.groupList = response.data;
          }
        })
        .catch(function(error) {});
    },
    //选择按钮执行小组弹框
    optGroup(index) {
      this.groupY = true;
      this.layIndex = index;
    },
    //选择按钮执行人员弹框
    optPerson(index) {
      this.staff = true;
      this.layIndex = index;
    },
    //执行人员弹窗确定
    pushYes() {
      this.cities[this.layIndex].approvalUsers = [];
      this.cities[this.layIndex].approvalUsers.push(...this.pushUserList);
      this.staff = false;
    },
    //执行人员弹窗确定
    pushGroupYes() {
      this.cities[this.layIndex].approvals = [];
      this.cities[this.layIndex].approvals.push(...this.pushGroupList);
      this.groupY = false;
    },
    //添加执行人员
    pushUser(item) {
      //监听是否重复
      var aaa = false;
      for (var i = 0; i < this.pushUserList.length; i++) {
        if (this.pushUserList[i].approvalPartner == item.fwmAccount) {
          aaa = true;
        }
      }
      if (!aaa) {
        let obj = {};
        obj.approvalPartner = item.fwmAccount;
        obj.approvalType = 1;
        obj.approvalName = item.userName;
        this.pushUserList.push(obj);
      }
    },
    //添加执行小组
    pushGroup(item) {
      //监听是否重复
      var aaa = false;
      for (var i = 0; i < this.pushGroupList.length; i++) {
        if (this.pushGroupList[i].approvalPartner == item.regioncode) {
          aaa = true;
        }
      }
      if (!aaa) {
        let obj = {};
        obj.approvalPartner = item.regioncode;
        obj.approvalName = item.regionName;
        obj.approvalType = 0;
        this.pushGroupList.push(obj);
      }
    },
    //查看执行人员更多
    seeUserList(index) {
      //人员为2
      this.typeIndex = 2;
      this.seeStaff = true;
      this.layIndex = index;
    },
    seeRroupList(index) {
      //小组为1
      this.typeIndex = 1;
      this.seeStaff = true;
      this.layIndex = index;
    },
    //弹框删除执行人员
    deletePerson(item, index) {
      item.splice(index, 1);
    },
    //页面删除执行人员
    deletePersonOut(item, indexa) {
      item.approvalUsers.splice(indexa, 1);
    },
    //页面删除执行小组
    deletegroupOut(item, indexa) {
      item.approvals.splice(indexa, 1);
    }
  }
};
</script>

<style scoped lang="less">
.content-box-time /deep/.el-input__inner {
  border: 1px solid #597ef7;
}
.distribute /deep/.el-dialog__body {
  padding: 0px !important;
}
.distribute /deep/.el-dialog__header {
  padding: 10px 20px !important;

  .el-dialog__title {
    font-size: 16px !important;
  }
  .el-dialog__headerbtn {
    top: 12px;
  }
}
.lookMore {
  display: flex;
  margin-bottom: 20px;
  justify-content: center;
  color: #597ef7;
  i {
    font-size: 20px;
    top: -3px;
    position: absolute;
    margin-left: 5px;
  }
  div {
    cursor: pointer;
    position: relative;
  }
}
.diamondBox {
  padding: 0 5px;
  font-size: 12px;
  float: left;
  width: 66px;
  height: 23px;
  background: #ecf5ff;
  border: 1px solid #b3d8ff;
  line-height: 23px;
  text-align: center;
  border-radius: 2px;
  margin-right: 5px;
  margin-bottom: 8px;
}
.person-opt {
  width: 100%;
  height: 326px;
  .person-opt-box {
    height: 260px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
    width: 100%;
    .person-opt-box-left {
      padding: 20px 0px 0px 20px;
      width: 239px;
      height: 240px;
      float: left;
      border-right: 1px solid rgba(0, 0, 0, 0.09);
      .person-opt-box-left-top {
        width: 100%;
        height: 50px;
      }
      .person-opt-box-left-bottom {
        width: 100%;
        height: 190px;
        overflow-y: auto;
        .person-opt-box-left-bottom-list {
          width: 100%;
          height: 25px;
          .btnPu {
            float: left;
            color: rgba(0, 0, 0, 0.85);
            margin-left: 10px;
            cursor: pointer;
            font-size: 12px;
            margin-top: 1px;
            width: 180px;
            height: 12px;
          }
        }
      }
    }
    .person-opt-box-right {
      width: 350px;
      height: 100%;
      float: left;
      padding: 20px 0px 0px 20px;
      .person-opt-box-right-name {
        width: 100%;
        height: 50px;
        line-height: 30px;
      }
      .person-opt-box-right-list {
        width: 100%;
        height: 190px;
        overflow-y: auto;
      }
    }
  }
}
.content-box-right-one {
  float: left;
  width: 72px;
  height: 23px;
  background: #ecf5ff;
  font-size: 12px;
  text-align: center;
  line-height: 23px;
  margin: 5px 0px 5px 10px;
  color: #409eff;
  border-radius: 2px;
  border: 1px solid #b3d8ff;
  .right-one-name {
    width: 50px;
    float: left;
    margin-left: 5px;
    height: 23px;
  }
  .right-one-close {
    width: 15px;
    float: left;
    font-size: 14px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.35);
  }
}
.distribute {
  .distribute-form-box {
    padding: 0px 24px 0px 24px;
    overflow: hidden;
    .distribute-form {
      float: left;
      width: calc(25% - 15px);
      .distribute-form-left {
        float: left;
        width: 80px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .distribute-form-right {
        float: left;
        width: calc(100% - 102px);
        height: 30px;
        line-height: 30px;
        border: 1px solid #e4e7ed;
        padding-left: 20px;
        border-radius: 4px;
        background: #f5f7fa;
        color: #666;
      }
    }
    .space {
      width: 22.5px;
      float: left;
      height: 32px;
    }
  }

  .distribute-top-direct {
    margin: 20px 0px;
    border-left: 2px solid #597ef7;
    margin-left: 20px;
  }
  .distribute-bottom {
    width: 100%;
    .content-box-left {
      float: left;
      height: 100%;
      width: 50px;
    }
    .content-box-time {
      .el-date-editor {
        width: 130px;
      }
    }
    .content-box-right {
      float: left;
      width: calc(100% - 50px);
      max-height: 95px;
      position: relative;
      .content-box-right-box {
        overflow: hidden;

        .lookMorea {
          z-index: 10;
          position: absolute;
          bottom: 1px;
          right: 3px;
          font-size: 12px;
          float: left;
          width: 72px;
          height: 23px;
          text-align: center;
          line-height: 23px;
          background: rgba(240, 242, 245, 1);
          border-radius: 2px;
          cursor: pointer;
          color: #409eff;
        }
      }
    }
  }
  .recordBoxa {
    font-size: 14px;
    text-align: left;
    margin-left: 20px;
  }
  .content-box-left-btn {
    width: 50px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    background: #597ef7;
    color: #fff;
    border-radius: 2px;
    font-size: 12px;
    cursor: pointer;
    margin: 5px 0;
  }
}
</style>
