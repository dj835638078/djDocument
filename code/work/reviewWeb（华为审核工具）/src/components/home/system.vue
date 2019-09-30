<template>
  <div class="system-box">
    <shade />
    <div class="system-content">
      <div class="system-content-left" ref="menuLink">
        <div class="menuHead">
          <img
            :src="imgUrl"
            alt="logo-head"
            ref="menuLinkImg"
            @click="goHome"
          />
        </div>

        <MenuLink :navDatas="navData" />
      </div>
      <div class="system-content-right">
        <Header />

        <!--面包屑 ||'/developing'||'/common'      v-if="$route.name != 'temporaryHome'" v-if="$route.name != 'Common'"  v-if="$route.name != 'Developing'"-->
        <div
          class="system-content-Breadcrumb"
          v-if="$route.name != 'temporaryHome'"
        >
          <div v-if="$route.name != 'Common'">
            <div class="Breadcrumb-box" v-if="$route.name != 'Developing'">
              <!-- <h1>{{ $route.meta.title }}</h1> -->
              <div v-if="JSON.stringify($route.params) == '{}'">
                <div style="float:left;color:rgba(0,0,0,0.45)">
                  首页
                </div>
                <div v-for="(itema, index) in crumbs" :key="index">
                  <div
                    style="float:left;color:rgba(0,0,0,0.45);margin:0 5px;font-size:14px;"
                  >
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                  </div>
                  <div style="float:left;color:rgba(0,0,0,0.45)">
                    {{ itema }}
                  </div>
                </div>
              </div>

              <el-breadcrumb separator-class="el-icon-arrow-right" v-else>
                <el-breadcrumb-item
                  v-for="item in levelList"
                  :key="item.path"
                  v-if="item.meta.title"
                >
                  <span v-if="item.name == 'system'">{{
                    item.meta.title
                  }}</span>
                  <!-- <router-link v-else :to="item.redirect || item.path">{{
                    item.meta.title
                  }}</router-link> -->
                  <span v-else>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>
        </div>
        <!-- <div
          v-else
          class="system-home-Breadcrumb"
        >首页</div> -->
        <div class="system-content-min" v-if="$route.name != 'temporaryHome'">
          <div
            class="content-min-box"
            ref="contentMinBox"
            style="overflow-y: hidden;"
          >
            <div style="overflow-y: auto;height:100%" class="scrollClass">
              <!--<transition name="slide-fade">-->
              <router-view></router-view>
              <!--</transition>-->
            </div>
          </div>
        </div>
        <div class="system-content-min-add" v-else>
          <div
            class="content-min-box"
            ref="contentMinBox"
            style="overflow-y: hidden;"
          >
            <div style="overflow-y: auto;height:100%" class="scrollClass">
              <!--<transition name="slide-fade">-->
              <router-view></router-view>
              <!--</transition>-->
            </div>
          </div>
        </div>
        <div class="system-content-footer">
          <span>Copyright</span>
          <span>＠</span>
          <span>2018</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../common/Header";
import MenuLink from "../common/MenuLink";
import api from "@/api";
import { mapState, mapMutations } from "vuex";
import shade from "../common/Shade";
export default {
  name: "box",
  data() {
    return {
      routerBox: "",
      routerChild: "",
      levelList: null,
      crumbs: [],
      navData: [],
      imgUrl: require("../../assets/img/logo-head.svg")
    };
  },
  components: {
    Header,
    MenuLink,
    shade
  },
  computed: {
    ...mapState(["menuLinkFlag", "userInfo", "crumbData"])
  },
  mounted() {
    this.crumbs = this.tools.setCrumb(this.$route.path);
    this.getBreadcrumb();
    this.getNavLoginInfo();
  },
  //初始化导航菜单状态
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.changeMenu(true);
  //   });
  // },
  watch: {
    //监听路由变化
    $route(to, from) {
      this.getBreadcrumb();
      this.crumbs = this.tools.setCrumb(this.$route.path);
      this.getNavLoginInfo();
    },
    crumbData() {
      this.crumbs = this.tools.setCrumb(this.$route.path);
    },
    menuLinkFlag(newVla, oldVal) {
      if (newVla) {
        this.$refs.menuLink.style.flex = "0 0 64px";
        this.$refs.menuLinkImg.style.width = "38px";
        this.$refs.contentMinBox.style.width = "calc(100%-65px)";
        this.imgUrl = require("../../assets/img/logo-single.svg");
      } else {
        this.$refs.menuLink.style.flex = "0 0 220px";
        this.$refs.menuLinkImg.style.width = "143px";
        this.$refs.contentMinBox.style.width = "calc(100%-220px)";
        this.imgUrl = require("../../assets/img/logo-head.svg");
      }
    }
  },
  methods: {
    ...mapMutations(["setShowLogin", "changeMenu", "setUserInfo"]),
    goHome() {
      //成功之后跳转不同页面
      if (this.userInfo.redirect) {
        location.href = location.origin + "/#" + this.userInfo.redirect;
      } else {
        location.href = location.origin + "/#/common";
      }
    },
    btn() {
      this.setShowLogin("2");
    },
    //面包屑导航数据生成
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      if (first && first.name !== "首页") {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
      }
      this.levelList = matched;
    },
    //获取导航栏及登录信息

    getNavLoginInfo() {
      let vm = this;
      api
        .get(`./manage/headerinfo`)
        .then(function(response) {
          let data = response.data.split("=")[1];
          try {
            data = JSON.parse(data);
          } catch (error) {
            data = response.data.replace("headerinfo=","");
            data = JSON.parse(data);
          }
          //获取登录名
          vm.setUserInfo(data);
          //获取导航数据
          vm.navData = vm.treeData(data.menu);
        })
        .catch(function(error) {});
    },
    /**
     * 树结构处理
     */
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
    }
  }
};
</script>

<style scoped lang="less">
.Breadcrumb-box /deep/ .el-breadcrumb__inner {
  color: rgba(0, 0, 0, 0.45) !important;
}
.Breadcrumb-box /deep/ .el-breadcrumb__separator {
  font-size: 10px !important;
  color: rgba(0, 0, 0, 0.45);
  margin: 0 1px;
}
.system-box {
  position: relative;
  height: 100%;
  .el-breadcrumb {
    padding-top: 15px;
  }
  .system-content {
    height: 100%;
    display: flex;
    .system-content-left {
      flex: 0 0 220px;
      float: left;
      height: 100%;
      border-right: 1px solid #3f4457;
      background: #3f4457;
      overflow-y: auto;
      scrollbar-arrow-color: #666; /**/ /*三角箭头的颜色*/
      scrollbar-face-color: #999; /**/ /*立体滚动条的颜色*/
      scrollbar-3dlight-color: #ccc; /**/ /*立体滚动条亮边的颜色*/
      scrollbar-highlight-color: #666; /**/ /*滚动条空白部分的颜色*/
      scrollbar-shadow-color: #999; /**/ /*立体滚动条阴影的颜色*/
      scrollbar-darkshadow-color: #666; /**/ /*立体滚动条强阴影的颜色*/
      scrollbar-track-color: #ccc; /**/ /*立体滚动条背景颜色*/
      scrollbar-base-color: #f8f8f8; /**/ /*滚动条的基本颜色*/
      /*滚动条样式*/
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: rgba(0, 0, 0, 0.2);
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0, 0, 0, 0.1);
      }
      .menuHead {
        height: 54px;
        background: #5675f5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        img {
          margin-left: 12px;
          width: 143px;
          height: 31px;
          cursor: pointer;
        }
      }
    }
    .system-content-right {
      position: relative;
      float: left;
      flex: 1;
      width: calc(100% - 220px);
      // height: calc(100% - 64px- 54px);
      height: 100%;
      // background: #f0f2f5;
      .system-content-Breadcrumb {
        .Breadcrumb-box {
          .el-breadcrumb {
            font-size: 13px !important;
          }
          height: 46px;
          line-height: 46px;

          padding-left: 25px;
          background: #f0f2f5;
        }
      }
      .system-home-Breadcrumb {
        height: 46px;
        line-height: 46px;
        padding-left: 25px;
        background: #f0f2f5;
      }
      .system-content-min {
        height: calc(100% - 30px - 64px - 80px + 35px);
        background: #f0f2f5;
        padding: 0px 24px 0 24px;
        overflow-x: hidden;
        overflow-y: auto;
        .content-min-box {
          height: 100%;
          width: calc(100%-220px);
          background: #fff;
        }
      }
      .system-content-min-add {
        height: calc(100% - 30px - 64px - 80px + 35px + 46px);
        background: #f0f2f5;
        padding: 0px 24px 0 24px;
        overflow-x: hidden;
        overflow-y: auto;
        .content-min-box {
          height: 100%;
          width: calc(100%-220px);
          background: #fff;
        }
      }
      .system-content-footer {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        height: 32px;
        line-height: 32x;
        text-align: center;
        span {
          font-size: 12px;
          display: inline-block;
          height: 32px;
          line-height: 28px;
        }
      }
    }
  }

  /*动画*/
  .slide-fade {
    position: absolute;
    left: 0;
    right: 0;
  }
  .slide-fade-enter-active {
    transition: all 1.2s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    left: 0;
    right: 0;
    transform: translateX(50px);
    opacity: 0;
  }
}
</style>

