<template>
  <div style="height:49px;">
    <div class="navigation">
      <Shade />
      <div class="navigation-content">
        <el-menu
          :default-active="$route.path"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <div class="nav-logo">
            <img src="/static/logo.svg" />
          </div>
          <template
            v-for="(item, index) in navData"
            v-if="item.showmenu != '3'"
          >
            <el-submenu
              :key="index"
              :index="item.menuId + ''"
              v-if="item.children.length > 0"
              style="margin-right:30px;"
            >
              <template slot="title">
                {{ item.menuName }}
              </template>
              <template v-for="(childItem, childIndex) in item.children">
                <el-menu-item
                  :index="childItem.menuUrl ? childItem.menuUrl : 'aaaa'"
                  :key="childIndex"
                  >{{ childItem.menuName }}</el-menu-item
                >
              </template>
            </el-submenu>
            <el-menu-item
              :key="index"
              :index="item.menuUrl ? item.menuUrl : 'aaaa'"
              v-else
              style="margin-right:30px;"
              >{{ item.menuName }}</el-menu-item
            >
          </template>
          <div class="nav-info">
            <div class="nav-info-user">
              <el-dropdown @command="handleCommand">
                <span
                  class="el-dropdown-link "
                  style="max-width:111px;display:inline-block;height:48.75px"
                >
                  <span
                    :title="userInfo.userName"
                    class="ellipsis"
                    style="max-width:95px;display:inline-block;cursor:pointer;height:48.75px"
                    >{{ userInfo.userName }}</span
                  ><img
                    src="/static/user.svg"
                    style="float:right;margin-top:15px;margin-left:0;"
                  />
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="个人中心"
                    >个人中心</el-dropdown-item
                  >
                  <el-dropdown-item
                    command="导入导出"
                    v-if="tools.setRight('ieport')"
                    >导入导出</el-dropdown-item
                  >
                  <el-dropdown-item command="我的收藏"
                    >我的收藏</el-dropdown-item
                  >
                  <el-dropdown-item
                    command="注册审批"
                    v-if="tools.setRight('approval')"
                    >注册审批</el-dropdown-item
                  >
                  <el-dropdown-item command="退出登录"
                    >退出登录</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div
              class="nav-info-query"
              @click="searchList"
              v-if="$route.name == 'home'"
            >
              <img src="/static/query.svg" /><span>搜索</span>
            </div>
            <div v-if="adminName" class="adminHref" @click="adminHref">
              {{ adminName }}
            </div>
          </div>
        </el-menu>
      </div>
    </div>

    <homeTip :tipShow="tipShow" />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import homeTip from "../home/homeTip";
import Shade from "../../components/common/Shade";
export default {
  data() {
    return {
      navData: [],
      tipShow: false,
      num: "",
      adminUrl: "",
      adminName: "",
      judegUser: false
    };
  },
  components: {
    Shade,
    homeTip
  },
  computed: { ...mapState(["userInfo"]) },
  mounted() {
    this.getTip();
    this.getUserList();
    this.getPaperNum();
    this.getLookUp();
    this.getRegionName();
    this.getNavLoginInfo();
    this.setPageHeight();
    this.getDatasource();
  },
  watch: {
    "$route.name"() {
      if (
        this.$route.name == "noticeNew" ||
        this.$route.name == "detailIsNew"
      ) {
        this.tipShow = false;
      } else {
        if (this.num != 0) {
          this.getTip();
        }
      }
    }
  },
  methods: {
    ...mapMutations([
      "setLookUp",
      "setUserInfo",
      "getPaperNumFlag",
      "setPageHeight",
      "setUserName",
      "setDatasource",
      "setRegionName"
    ]),
    handleSelect(key, keyPath) {
      this.activeIndex = keyPath[0];
      if (key.indexOf("/complex/admin") > -1) {
        // window.open(location.origin + key);
      } else {
        location.href = location.origin + "/#" + key;
      }
    },
    handleCommand(command) {
      if (command == "个人中心") {
        this.$router.push({
          name: "personal"
        });
      }
      if (command == "退出登录") {
        this.logout();
      }
      if (command == "我的收藏") {
        this.$router.push({
          name: "myCollection"
        });
      }
      if (command == "导入导出") {
        this.$router.push({
          name: "importExport"
        });
      }
      if (command == "注册审批") {
        this.$router.push({
          name: "approval"
        });
      }
    },
    //获取首页提示框
    getTip() {
      let url = `./complex/service/complexBulletin/findLatestCount`;
      this.api
        .get(url)
        .then(response => {
          //如果数量大于0，证明有未读的公告,打开提示框
          if (response.data > 0) {
            //最新公告的情况下关闭提示框
            this.num = response.data;
            if (
              this.$route.name == "noticeNew" ||
              this.$route.name == "detailIsNew"
            ) {
              this.tipShow = false;
            } else {
              this.tipShow = true;
              // this.tipShow = false;
            }
          }
        })
        .catch(error => {});
    },
    //搜索
    searchList() {
      this.$router.push({ name: "noticeSearch" });
    },
    //获取数据字典
    getDictionaries(arr) {
      // let vm = this;
      // this.api
      //   .get(
      //     `./complex/service/property/find/value?path=complex.user_approve_role`
      //   )
      //   .then(function(response) {
      //     //let arr = response.data.split(",");
      //     let arrBox = [];
      //     for (var i = 0; i < arr.length; i++) {
      //       arrBox.push(arr[i].roleName);
      //     }
      //     arrBox.push(...response.data.split(","));
      //     //console.log(arrBox, "数据字典");
      //     var nary = arrBox.sort();
      //     for (var i = 0; i < arrBox.length; i++) {
      //       if (nary[i] == nary[i + 1]) {
      //         vm.judegUser = true;
      //       }
      //     }
      //   })
      //   .catch(function(error) {});
    },
    //获取导航栏及登录信息
    getNavLoginInfo() {
      let vm = this;
      this.api
        .get(`./complex/headerinfo`)
        .then(function(response) {
          let data = response.data.split("=")[1];
          data = JSON.parse(data);
          //获取登录名
          vm.setUserInfo(data);
          vm.getDictionaries(data.user.roles);
          //获取导航数据
          let dataMenu = data.menu;
          //成都区域菜单处理
          if (
            data.user.levelOneRegionCode &&
            data.user.levelTwoRegionCode == "A03000001"
          ) {
            for (var i = 0; i < dataMenu.length; i++) {
              //换班申请菜单处理
              if (dataMenu[i].menuUrl && dataMenu[i].menuUrl == "/shift") {
                dataMenu.splice(i, 1);
              }
            }
          }
          let dataMenuFlag = [];
          for (var i = 0; i < dataMenu.length; i++) {
            if (
              dataMenu[i].menuUrl &&
              dataMenu[i].menuUrl.indexOf("/complex/admin") > -1
            ) {
              vm.adminUrl = dataMenu[i].menuUrl;
              vm.adminName = dataMenu[i].menuName;
            } else {
              dataMenuFlag.push(dataMenu[i]);
            }
          }
          vm.navData = vm.treeData(dataMenuFlag);
        })

        .catch(function(error) {});
    },
    // 管理员跳转
    adminHref() {
      window.open(location.origin + this.adminUrl, "_self");
    },
    //获取lookUp
    getLookUp() {
      this.api
        .get(`./complex/service/lookup/allmap`)
        .then(response => {
          if (response.status == 200) {
            this.setLookUp(response.data);
          }
        })
        .catch(error => {});
    },
    //获取区域名称
    getRegionName() {
      this.api
        .get(`./complex/service/regionmanage/allMap`)
        .then(response => {
          if (response.status == 200) {
            this.setRegionName(response.data);
          }
        })
        .catch(error => {});
    },
    //获取来源
    getDatasource() {
      this.api
        .get(`./complex/service/verifyEntry/getDatasource`)
        .then(response => {
          if (response.status == 200) {
            this.setDatasource(response.data);
          }
        })
        .catch(error => {});
    },
    //获取所有用户
    getUserList() {
      this.api
        .get(`./complex/service/usermanage/allmap`)
        .then(response => {
          if (response.status == 200) {
            this.setUserName(response.data);
          }
        })
        .catch(error => {});
    },
    //获取考试次数
    getPaperNum() {
      this.api
        .get(
          `./complex/service/property/find/value?path=complex.test.test.CUTTING_SCREEN`
        )
        .then(response => {
          if (response.status == 200) {
            this.getPaperNumFlag(response.data);
          }
        })
        .catch(error => {});
    },
    //树结构
    treeData(dataInfo) {
      let first = dataInfo.filter(item => {
        return item.control == 1;
      });
      let second = dataInfo.filter(item => {
        return item.control == 2;
      });
      let third = dataInfo.filter(item => {
        return item.control == 3;
      });
      let firstData = [];
      let secondData = [];
      for (let i = 0; i < second.length; i++) {
        var obj2 = Object.assign({}, second[i]);
        obj2.children = [];
        for (let j = 0; j < third.length; j++) {
          if (second[i].menuId === third[j].parentId) {
            obj2.children.push(third[j]);
          }
        }
        secondData.push(obj2);
      }
      for (let i = 0; i < first.length; i++) {
        var obj1 = Object.assign({}, first[i]);
        obj1.children = [];
        for (let j = 0; j < secondData.length; j++) {
          if (first[i].menuId === secondData[j].parentId) {
            obj1.children.push(secondData[j]);
          }
        }
        firstData.push(obj1);
      }
      return firstData;
    },
    logout() {
      this.api
        .get(`./complex/service/account/logout`)
        .then(response => {
          if (response.status == 200) {
            this.$router.push({ name: "login" });
          } else {
            this.$message({
              showClose: true,
              message: response.data.message,
              type: "error"
            });
          }
        })
        .catch(error => {
          if (error.code == 0) {
            this.$message({
              showClose: true,
              message: error.message,
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style scoped lang="less">
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  color: #00cdca;
}
.navigation /deep/ .el-dropdown {
  height: 49px;
}
.navigation /deep/ .el-submenu__title:hover,
.navigation /deep/ .el-menu-item:hover {
  color: #00cdca !important; //鼠标hover颜色
}
.navigation /deep/ .el-menu-item-group,
.el-menu--popup {
  .el-menu-item:hover {
    color: #00cdca !important; //鼠标hover颜色
  }
  .el-menu-item.is-active {
    color: #00cdca !important;
  }
}
.navigation /deep/ .is-active {
  color: #00cdca !important;
}

.navigation /deep/ .el-submenu__title {
  color: rgba(42, 42, 42, 0.85) !important;
  font-size: 16px;
  padding: 0px;
  height: 49px !important;
  line-height: 49px !important;
  font-weight: 600;
  font-family: PingFangSC-Semibold;
}
.navigation /deep/ .el-submenu__icon-arrow {
  margin-left: 0px;
}
.navigation {
  position: fixed;
  background: #fff;
  top: 0px;
  left: 0;
  right: 0;
  z-index: 2999;
  height: 49px;
  border-bottom: 1px solid #f1f1f1;
  .navigation-content {
    width: 1200px;
    margin: auto;
    height: 49px;
  }
  .nav-logo {
    float: left;
    outline: 0;
    img {
      margin-top: 12px;
      margin-right: 30px;
    }
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu-item {
    color: rgba(42, 42, 42, 0.85) !important;
    font-size: 16px;
    padding: 0px;
    height: 49px;
    line-height: 49px;
    font-weight: 600;
    font-family: PingFangSC-Semibold;
  }

  .el-menu--horizontal > .el-menu-item {
    height: 49px;
    border: none;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    color: #00cdca !important;
  }
  .nav-info {
    float: right;
    height: 49px;
    outline: 0;
    .adminHref,
    .nav-info-query,
    .nav-info-user {
      float: right;
      line-height: 49px;
      font-size: 14px;
      height: 49px;
      overflow: hidden;
      color: rgba(42, 42, 42, 0.85);
      outline: 0;
      img {
        margin-top: -2px;
        cursor: pointer;
      }
    }
    .nav-info-user {
      margin-left: 30px;
      img {
        margin-left: 5px;
      }
    }
    .nav-info-query {
      cursor: pointer;
      img {
        margin-right: 5px;
      }
    }
    .adminHref {
      cursor: pointer;
      margin-right: 30px;
      font-weight: 600;
      font-size: 16px;
      font-family: PingFangSC-Semibold;
    }
  }
}
.navigation /deep/ .el-submenu.is-active .el-submenu__title {
  // border-bottom: #f1f1f1 !important;
  // border: none !important;
  color: #00cdca !important;
}
.navigation /deep/.el-menu--horizontal > .el-submenu .el-submenu__title {
  border: none !important;
}
</style>