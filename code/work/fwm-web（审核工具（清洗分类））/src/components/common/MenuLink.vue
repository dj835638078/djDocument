<template>
  <div class="MenuLink">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          class="el-menu-vertical-demo"
          router
          @open="handleOpen"
          @close="handleClose"
          :default-active="$route.path"
          :collapse="menuFlag"
          text-color="#fff"
          active-text-color="#fff"
          background-color="#3f4457"
          active-background-color="#ffffff"
          unique-opened
          :collapse-transition="false"
        >
          <template v-for="first in navDatas" clearable>
            <div :key="first.menuId">
              <el-menu-item
                :index="first.menuId + ''"
                v-if="!first.children.length"
              >
                <i :class="first.menuIcon"></i>
                <span slot="title">{{ first.menuName }}</span>
              </el-menu-item>
              <el-submenu
                ref="titleArrow"
                :index="first.menuId + ''"
                :class="[!menuFlag ? 'arrowShow' : 'arrowHide']"
                v-else
              >
                <template slot="title">
                  <div class="fontStyle">
                    <i :class="first.menuIcon"></i>
                    <span v-if="!menuFlag">{{ first.menuName }}</span>
                  </div>
                </template>
                <template v-for="second in first.children">
                  <div :key="second.menuId" class="navSecond">
                    <el-menu-item-group v-if="!second.children.length">
                      <el-menu-item :index="second.menuUrl + ''">{{
                        second.menuName
                      }}</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu v-else :index="second.menuId + ''">
                      <template slot="title">{{ second.menuName }}</template>
                      <el-menu-item
                        v-for="third in second.children"
                        :key="third.menuId"
                        :index="third.menuUrl + ''"
                        >{{ third.menuName }}</el-menu-item
                      >
                    </el-submenu>
                  </div>
                </template>
              </el-submenu>
            </div>
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "MenuLink",
  data() {
    return {
      // openeds: ["1", "2"]
      menuFlag: false
    };
  },
  props: ["navDatas"],
  components: {},
  computed: {
    ...mapState(["menuLinkFlag"])
  },
  mounted() {
    if (this.$route.name == "temporaryHome") {
      this.changeMenu(false);
    }
  },
  watch: {
    "$route.name"() {
      if (this.$route.name == "temporaryHome") {
        this.changeMenu(false);
      }
    },
    menuLinkFlag(newVal, oldVal) {
      // let vm = this;
      this.menuFlag = newVal;
      // this.$nextTick(() => {
      //   this.menuFlag = newVal;
      // });
    }
  },
  methods: {
    ...mapMutations(["changeMenu"]),
    handleOpen(key, keyPath) {},
    handleClose(key, keyPath) {}
  }
};
</script>

<style scoped lang="less">
.MenuLink /deep/ .fa {
  margin-right: 10px;
}
.MenuLink /deep/ .el-submenu__title:hover {
  background: #202230 !important; //鼠标hover颜色
}
.MenuLink /deep/ .el-menu-item-group__title {
  display: none;
}
.arrowShow /deep/ .el-icon-arrow-right {
  display: block;
}
.arrowHide /deep/ .el-icon-arrow-right {
  display: none;
}
.navSecond /deep/ .el-submenu {
  .el-submenu__title {
    background: #303241 !important; //二级菜单背景黑
    padding-left: 51px !important;
  }
  .el-submenu__title:hover {
    background: #202230 !important; //二级菜单hover
  }
}
.navSecond /deep/ .el-menu-item-group,
.el-menu--popup {
  // background: #3f4457 !important;
  .el-menu-item {
    background: #303241 !important; //收缩后子菜单背景色
    padding-left: 51px !important; //reset.css中设置收缩后弹框离左侧位置
  }
  .el-menu-item:hover {
    background: #202230 !important; //鼠标hover颜色
  }
  .el-menu-item.is-active {
    background: #5675f5 !important;
  }
}
.fontStyle /deep/ span {
  font-size: 15px;
  font-weight: 500;
}
.MenuLink {
  .el-submenu {
    // border-bottom: 1px solid #1a1c20;
  }
  .navSecond {
    .el-submenu {
      border-bottom: none;
    }
    // el-submenu__title
  }
  .el-col-12 {
    width: 100%;
    text-align: left;
  }
  .el-menu {
    border: none;
    .el-menu-item.is-active {
      background: #5675f5 !important;
    }
    .el-menu-item {
      background: #303241 !important; //子菜单黑
    }
    .el-menu-item:hover {
      background: #202230 !important; //子菜单黑hover
    }
    // .el-icon-goods {
    //   color: #fff !important;
    // }
    // .el-menu-item {
    //   i {
    //     color: #fff !important;
    //   }
    // }
  }
}
</style>
