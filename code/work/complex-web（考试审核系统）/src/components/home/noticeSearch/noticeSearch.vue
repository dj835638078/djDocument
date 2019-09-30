<template>
  <div class="noticeSearch">
    <div class="noticeSearch-box">
      <div class="noticeSearch-box-top">
        <div class="noticeSearch-input">
          <div class="noticeSearch-input-left">
            <el-input
              v-model="textName"
              placeholder="请输入公告名称"
              maxlength="50"
              @focus="verification"
              @blur="inputBlur"
              :clearable="true"
            ></el-input>
          </div>
          <div class="noticeSearch-input-right" @click="searchList">
            <span class="el-icon-search"></span>搜索
          </div>
          <div
            class="noticeSearch-bottom"
            v-show="show"
            v-clickoutside="handleClose"
          >
            <div class="noticeSearch-bottom-top">
              <img src="/static/hot.svg" />
              热搜词
            </div>
            <ul class="noticeSearch-hot-list">
              <li
                v-for="(item, index) in hotList"
                :key="index"
                @click="getHotName(item)"
              >
                {{ item.hotWord }}
              </li>
            </ul>
          </div>
        </div>
        <div class="noticeSearch-text" v-if="bulletinTitle">
          <div>
            "<span style="color:#00CDCA">{{ bulletinTitle }}</span
            >"相关的文章
          </div>
        </div>
      </div>
      <BulletinList :list="list" v-if="list.length > 0" />
      <Remind v-else />
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="list.length > 0"
        style="text-align:right;"
        background
        layout="prev, pager, next"
        :total="totals"
        :current-page="currentPage"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind(el, binding, vnode) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.vueClickOutside = documentHandler;
    document.addEventListener("click", documentHandler);
  },
  update() {},
  unbind(el, binding) {
    // 解除事件监听
    document.removeEventListener("click", el.vueClickOutside);
    delete el.vueClickOutside;
  }
};
import BulletinList from "../BulletinList";
import Remind from "../../public/Remind";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      totals: 0,
      list: [],
      listaaa: [],
      textName: "",
      bulletinTitle: "",
      show: false,
      windowShow: false,
      hotList: []
    };
  },
  components: {
    BulletinList,
    Remind
  },
  computed: {},
  mounted() {
    this.getHotList();
    this.getNoticeType();
  },
  watch: {
    textName() {
      if (this.textName) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  },
  directives: { clickoutside },
  methods: {
    handleClose(e) {
      if (!this.windowShow) {
        this.show = false;
      }
    },
    //鼠标点击输入框验证是否出现hot词
    verification() {
      this.windowShow = true;
      if (this.hotList.length > 0 && !this.textName) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    getHotName(item) {
      this.textName = item.hotWord;
    },
    inputBlur() {
      this.windowShow = false;
    },
    //搜索
    searchList() {
      this.currentPage = 1;
      this.pageSize = 5;
      this.bulletinTitle = this.textName;
      this.getNoticeType();
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getNoticeType();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getNoticeType();
    },
    //获取数据
    getNoticeType() {
      let data = {
        homePage: "1",
        bulletinTitle: this.bulletinTitle,
        bulletinType: this.$route.params.type
      };
      this.api
        .post(
          `./complex/service/complexBulletin/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(response => {
          if (response.status == 200) {
            this.list = response.data.result;
            this.totals = response.data.page.totalRows;
            window.scrollTo(0, 0);
          }
        })
        .catch(error => {});
    },
    //获取热搜词数据
    getHotList() {
      let data = {};
      this.api
        .post(`./complex/service/complexBulletin/findSearch`, data)
        .then(response => {
          if (response.status == 200) {
            this.hotList = response.data;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.noticeSearch-box-top /deep/.el-input__suffix {
  right: 110px !important;
}
.noticeSearch-box-top /deep/.el-input__inner {
  border-radius: 100px;
  border: 1px solid #00cdca;
  height: 40px;
}
.noticeSearch {
  width: 100%;
  margin-bottom: 100px;
  .noticeSearch-box {
    width: 900px;
    margin: auto;
    .noticeSearch-box-top {
      width: 100%;
      margin-top: 24px;
      .noticeSearch-input {
        height: 40px;
        width: 100%;
        position: relative;
        .noticeSearch-input-left {
          width: 100%;
        }
        .noticeSearch-input-right {
          width: 107px;
          height: 40px;
          position: absolute;
          top: 0;
          right: 0;
          border-bottom-right-radius: 100px;
          border-top-right-radius: 100px;
          background: #00cdca;
          font-size: 14px;
          color: #fff;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
          span {
            margin-right: 5px;
          }
        }
      }
      .noticeSearch-text {
        width: 100%;
        height: 69px;
        border-bottom: 1px solid #f1f1f1;
        line-height: 69px;
        font-size: 18px;
        font-family: PingFangSC-Medium;
        color: #2a2a2a;
      }
      .noticeSearch-bottom {
        width: 763px;
        position: absolute;
        top: 45px;
        z-index: 100;
        padding: 15px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
        border-radius: 4px;
        .noticeSearch-bottom-top {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          font-weight: 600;
          img {
            margin-top: -5px;
            margin-right: 5px;
          }
        }
        .noticeSearch-hot-list {
          margin-top: 20px;
          li {
            height: 30px;
            background: rgba(245, 247, 250, 1);
            border-radius: 2px;
            padding: 0px 10px;
            float: left;
            line-height: 30px;
            text-align: center;
            margin-right: 16px;
            margin-bottom: 16px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>