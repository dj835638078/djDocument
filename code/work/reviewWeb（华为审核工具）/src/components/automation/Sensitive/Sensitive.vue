<template>
  <div
    class="Sensitive"
    v-if="showNav"
  >
    <!--添加  修改-->
    <AddWords
      :listData="listData"
      :titleName="titleName"
      :highlightId="highlightId"
    />
    <!--添加  修改-->
    <SensitiveDetail :datailData="datailData" />

    <div class="tabBox">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-if="judgeUset"
          label="敏感词设置"
          name="1"
          style="color:red;"
        >
        </el-tab-pane>
        <el-tab-pane
          label="默认敏感词"
          name="2"
        ></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <div v-if="tag==1">
      <div class="btn-box shadow">
        <div
          style="width:75px"
          class="new"
          @click="newBuilt"
        >新建应用</div>
      </div>
      <div
        class="Sensitive-content"
        v-bind:style="{height: listHeight+'px'}"
      >
        <div
          class="Sensitive-content-box"
          v-if="userList.length"
        >
          <div style="height:24px;width:100%"></div>
          <div
            class="Sensitive-min"
            v-for="(item,index) in userList"
            :key="index"
          >
            <div class="Sensitive-min-top">
              <div
                class="Sensitive-min-top-show"
                @click="showBtn(index,1)"
              >
                <i
                  class="fa fa-angle-down"
                  v-if="switchList[index].showList"
                ></i>
                <i
                  class="fa fa-angle-right"
                  v-else
                ></i>
              </div>
              <div class="Sensitive-min-top-name">
                {{item.appName}}
              </div>
              <div
                class="new more"
                style="float:right;margin-top:10px;"
              >
                <el-row class="block-col-2">
                  <el-col>
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link">
                        更多<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <div @click="edit(item)">编辑</div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <div @click="defaultDetail(item)">详情</div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <div @click="detailBtn(item)">删除</div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-col>
                </el-row>
              </div>
              <div
                class="new"
                style="float:right;margin-top:10px;"
                @click="addWords(index)"
              ><i class="fa fa-plus-circle"></i>添加</div>
            </div>

            <div
              class="Sensitive-min-bottom"
              v-if="switchList[index].showList"
            >
              <div>
                <div
                  class="Sensitive-min-bottom-input"
                  v-if="switchList[index].showInput"
                >
                  <el-input
                    v-model="switchList[index].name"
                    @keyup.enter.native="inputEnter(switchList[index].name,index,item)"
                    placeholder="回车生成，标签长度最短为1，最长为15，输入多个以逗号分隔。"
                  ></el-input>
                </div>
              </div>
              <ul
                class="Sensitive-list"
                style="min-height:40px;"
              >
                <div
                  v-if="item.wordsList"
                  style="overflow:hidden;"
                >
                  <li
                    class="Sensitive-list-box"
                    v-for="(itema,indexa) in item.wordsList.split(',')"
                    :key="indexa"
                  >
                    <span class="Sensitive-list-box-one">{{itema}}</span>
                    <span
                      class="el-icon-close Sensitive-list-box-two"
                      @click="removeName(itema,item)"
                    ></span>
                  </li>
                  <div class="clear"></div>
                  <div style="height:14px;width:100%;"></div>
                </div>
                <div
                  v-else
                  style="text-align:center;line-height: 40px;color:gray;"
                >
                  暂无敏感词,请添加敏感词~
                </div>
              </ul>
            </div>
          </div>
        </div>
        <div
          v-else
          style="height:200px;width:100%;line-height:200px;text-align:center;color:gray"
        >您还没有新建任何敏感词应用~</div>
      </div>
    </div>
    <!--默认敏感词-->
    <div v-if="tag==2">
      <div
        class="Sensitive-content"
        v-bind:style="{height: listHeight+'px'}"
        v-if="defaultSwitchList.length"
      >
        <div class="Sensitive-content-box">
          <div style="height:24px;width:100%"></div>
          <div
            class="Sensitive-min"
            v-for="(item,index) in defaultList"
            :key="index"
          >
            <div class="Sensitive-min-top">
              <div
                class="Sensitive-min-top-show"
                @click="showBtn(index,2)"
              >
                <i
                  class="fa fa-angle-down"
                  v-if="defaultSwitchList[index].showList"
                ></i>
                <i
                  class="fa fa-angle-right"
                  v-else
                ></i>
              </div>
              <div class="Sensitive-min-top-name">
                {{item.appName}}
              </div>

              <div
                class="new"
                style="float:right;margin-top:10px;"
                @click="defaultDetail(item)"
              >详情</div>
            </div>

            <div
              class="Sensitive-min-bottom"
              v-if="defaultSwitchList[index].showList"
            >
              <ul class="Sensitive-list">
                <div v-if="item.wordsList">
                  <li
                    class="Sensitive-list-box"
                    v-for="(itema,indexa) in item.wordsList.split(',')"
                    :key="indexa"
                  >
                    <span class="Sensitive-list-box-one">{{itema}}</span>
                    <span class=" Sensitive-list-box-two"></span>
                  </li>
                  <div class="clear"></div>
                  <div style="height:14px;width:100%;"></div>
                </div>
                <div
                  v-else
                  style="text-align:center;line-height: 40px;color:gray;"
                >
                  暂无敏感词~
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        style="height:200px;width:100%;line-height:276px;text-align:center;color:gray"
      >暂无默认敏感词~</div>
    </div>
  </div>
</template>
<script>
import api from "@/api";
import { mapState, mapMutations } from "vuex";
import AddWords from "./AddWords";
import SensitiveDetail from "./SensitiveDetail";
export default {
  name: "Sensitive",
  data() {
    return {
      aaa: "",
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //新建弹出框
      judgeAddWords: false,
      //详情弹出框
      judgeDetail: false,
      datailData: {},
      titleName: "新建应用",
      highlightId: "",
      channelList: [],
      findRegion: [],
      showNav: false,
      listData: {
        appName: "",
        regionCode: "",
        channelType: [],
        highlightRemark: "",
        highlightState: "1",
        highlightColour: "#002233",
        highlightId: ""
      },
      //导航控制
      activeName: "1",
      tag: "1",
      input: "",
      judge: true,
      //判断什么角色展示什么内容
      judgeUset: true,
      //判断用户打开关闭输入等动态字段
      switchList: [],
      //判断用户打开关闭输入默认数据等动态字段
      defaultSwitchList: [],
      //数据存放
      userList: [],
      //普通用户查看默认数据
      defaultList: []
    };
  },
  mounted() {
    this.getWords();
    this.getRegion();
    this.setPersonData();
  },
  computed: {
    ...mapState(["listHeight"])
  },
  watch: {},
  components: {
    AddWords,
    SensitiveDetail
  },
  methods: {
    ...mapMutations(["setPerson"]),
    setPersonData() {
      let vm = this;
      let data = {};
      vm.api
        .post(`./manage/service/regionmanage/findregion`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.setPerson(response.data);
          }
        })
        .catch(function(error) {});
    },
    //获取区域
    getRegion() {
      let vm = this;
      api
        .get(`./manage/service/autoHighlight/findRegion`)
        .then(function(response) {
          if (response.status == 200) {
            vm.findRegion = response.data;
          }
        })
        .catch(function(error) {});
    },
    //输入回车事件
    inputEnter(val, index, item) {
      let arr = [];
      let list = [];
      let affirm = true;
      let vm = this;
      if (val) {
        arr = val.replace(/，/g, ",").split(",");
        for (let a = 0; a < arr.length; a++) {
          if (arr[a].trim()) {
            list.push(arr[a].trim());
          }
        }
        list = Array.from(new Set(list));
        this.switchList[index].name = list.join(",");
        for (let i = 0; i < list.length; i++) {
          if (list[i].length > 0 && list[i].length < 16) {
            affirm = true;
          } else {
            affirm = false;
          }
        }
        if (affirm) {
          let data = {
            highlightId: item.highlightId,
            wordsList: list
          };
          api
            .post(`./manage/service/highlightItem/insert`, data)
            .then(function(response) {
              if (response.status == 200) {
                vm.switchList[index].name = "";
                vm.getWords();
              }
            })
            .catch(function(error) {});
        } else {
          this.$message({
            showClose: true,
            message: "回车生成，标签长度最短为1，最长为15，输入多个以逗号分隔",
            type: "error"
          });
        }
      }
    },
    //关闭数据列表
    showBtn(index, type) {
      if (type == 1) {
        this.switchList[index].showList = !this.switchList[index].showList;
      } else {
        this.defaultSwitchList[index].showList = !this.defaultSwitchList[index]
          .showList;
      }
    },
    //添加敏感词
    addWords(index) {
      this.switchList[index].showInput = true;
    },
    edit(data) {
      let vm = this;
      this.highlightId = data.highlightId;
      api
        .get(
          `./manage/service/autoHighlight/findOne?highlightId=${
            data.highlightId
          }`
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.titleName = "编辑";
            vm.judgeAddWords = true;
            vm.listData.appName = response.data.appName;
            vm.listData.regionCode = response.data.regionCode;
            if (response.data.channelType) {
              vm.channelList = response.data.channelType.split(",");
            }
            vm.listData.highlightRemark = response.data.highlightRemark;
            vm.listData.highlightState = response.data.highlightState;
            vm.listData.highlightColour = response.data.highlightColour;
          }
        })
        .catch(function(error) {});
    },
    detail() {
      alert(2);
    },
    //新建
    newBuilt() {
      this.titleName = "新建应用";
      this.judgeAddWords = true;
    },
    //查看详情
    defaultDetail(val) {
      let vm = this;
      api
        .get(
          `./manage/service//autoHighlight/findOne?highlightId=${
            val.highlightId
          }`
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.datailData = response.data;
            vm.judgeDetail = true;
          }
        })
        .catch(function(error) {});
    },
    //删除整条敏感词
    detailBtn(val) {
      this.$confirm("确认删除该类型敏感词吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let vm = this;
          let data = {
            highlightId: val.highlightId
          };
          api
            .post(`./manage/service/autoHighlight/delete`, data)
            .then(function(response) {
              if (response.status == 200) {
                vm.getWords();
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {});
    },

    //删除单个敏感词
    removeName(val, parent) {
      this.$confirm("确认删除此敏感词吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let vm = this;
          let data = {
            highlightId: parent.highlightId,
            keywordContent: val
          };
          api
            .post(`./manage/service/highlightItem/delete`, data)
            .then(function(response) {
              if (response.status == 200) {
                vm.getWords();
              }
            })
            .catch(function(error) {});
        })
        .catch(() => {});
    },
    getWords() {
      let vm = this;
      api
        .get(`./manage/service/autoHighlight/findAll`)
        .then(function(response) {
          if (response.status == 200) {
            vm.showNav = true;
            //判断是不是管理员
            if (
              response.data[0].usersetting ||
              response.data[0].usersetting == "[]"
            ) {
              //管理员页面
              //开关判断 避免关闭输入框
              //赋值
              vm.activeName = "1";
              vm.judgeUset = true;
              vm.userList = response.data[0].usersetting;
              vm.defaultList = response.data[0].default;
              if (vm.judge) {
                //循环数据，也是开关的数量
                for (let i = 0; i < response.data[0].usersetting.length; i++) {
                  let obj = {};
                  //显示隐藏input
                  obj.showInput = false;
                  //显示隐藏数据表
                  obj.showList = true;
                  //每个数据下的input值
                  obj.name = "";
                  vm.switchList.push(obj);
                }
              }
              //默认数据
              for (let i = 0; i < response.data[0].default.length; i++) {
                let obj = {};
                //显示隐藏数据表
                obj.showList = true;
                vm.defaultSwitchList.push(obj);
              }
            } else {
              vm.activeName = "2";
              vm.judgeUset = false;
              vm.userList = response.data[0].default;
              //赋值
              if (vm.judge) {
                //循环数据，也是开关的数量
                for (let i = 0; i < response.data[0].default.length; i++) {
                  let obj = {};
                  //显示隐藏input
                  obj.showInput = false;
                  //显示隐藏数据表
                  obj.showList = true;
                  //每个数据下的input值
                  obj.name = "";
                  vm.switchList.push(obj);
                }
              }
            }
          }
        })
        .catch(function(error) {});
    },
    //标签操作
    handleClick(row) {
      if (this.judgeUset) {
        this.tag = row.name;
      }
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  }
};
</script>

<style scoped lang="less">
.Sensitive {
  height: 100%;
  .shadow {
    box-shadow: -9px 21px 10px -16px rgba(0, 21, 41, 0.12);
  }
  .Sensitive-content {
    padding: 0 24px;
    overflow-y: auto;
    .Sensitive-content-box {
      width: 100%;
      height: 100%;
      .Sensitive-min {
        margin-bottom: 24px;
        border: 1px solid rgba(232, 232, 232, 1);
        .Sensitive-min-top {
          height: 47px;
          line-height: 47px;

          .Sensitive-min-top-show {
            width: 18px;
            height: 18px;
            float: left;
            margin-left: 14px;
            background: #1890ff;
            margin-top: 13.5px;
            line-height: 18px;
            text-align: center;
            cursor: pointer;
            i {
              color: #fff;
              font-size: 16px;
            }
          }
          .Sensitive-min-top-name {
            float: left;
            margin-left: 14px;
            width: 200px;
            overflow: hidden;
          }
          .more {
            span {
              color: #fff;
              padding-top: 5px;
              padding-bottom: 5px;
              padding-left: 15px;
            }
          }
        }
        .Sensitive-min-bottom {
          border-top: 1px solid rgba(232, 232, 232, 1);
          .Sensitive-min-bottom-input {
            width: 430px;
            margin-top: 14px;
            margin-left: 14px;
            //margin-bottom: 14px;
          }
          .Sensitive-list {
            overflow: hidden;
            //margin-bottom: 14px;
            .Sensitive-list-box {
              float: left;
              margin-left: 14px;
              background: rgba(179, 216, 255, 0.3);
              height: 24px;
              line-height: 24px;
              border-radius: 4px;
              border: 1px solid rgba(179, 216, 255, 1);
              margin-top: 14px;
              .Sensitive-list-box-one {
                margin-left: 14px;
                color: rgba(64, 158, 255, 1);
              }
              .Sensitive-list-box-two {
                color: rgba(0, 0, 0, 0.5);
                margin-right: 7px;
                margin-left: 7px;
                font-size: 8px;
                cursor: pointer;
                &:hover {
                  background: rgba(0, 0, 0, 0.2);
                  border-radius: 50%;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
