<template>
  <div class="manpower">
    <div class="manpower-title">
      <div class="manpower-title-name">人力投入分析：</div>
      <div class="manpower-title-btn">
        <div
          v-for="(item, index) in btnList"
          :key="index"
          @click="dayBtn(index)"
          :class="activeIndex == index ?'newBlankA':'blankA'"
        >{{item}}</div>
      </div>
    </div>
    <div class="manpower-content">
      <div
        class="fadeBox"
        v-if="listData && listData.length == 0"
      >暂无数据</div>
      <div
        class="manpower-content-box"
        v-for="(item,index) in listData"
        :key="index"
      >

        <div class="manpower-content-name">{{item.typeName}}：</div>

        <ul class="manpower-content-list">
          <li
            class="manpower-list"
            v-for="(a,i) in item.infoList"
            :key="i"
          >

            <div class="manpower-list-name ellipsis">
              <span>{{a.sourceName}}</span>

            </div>
            <div class="manpower-list-size">
              <el-tooltip
                placement="top"
                effect="dark"
                :open-delay="100"
                :visible-arrow='false'
                :enterable="false"
              >
                <div v-bind:style="{width: a.proportion+'%',background:a.color}"></div>
                <div slot="content">{{a.sourceName}}</div>
              </el-tooltip>
            </div>
            <div class="manpower-list-num ellipsis">{{a.dataSum}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      btnList: ["今日", "七天内"],
      //按钮index
      activeIndex: 0,
      day: "1",
      listData: []
    };
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {
    this.getManpower();
  },
  methods: {
    getManpower() {
      let vm = this;
      vm.api
        .get(`./manage/service/home/humanScale?day=${this.day}&scale=D`)
        .then(function(response) {
          if (response.status == 200) {
            vm.listData = response.data;
          }
        })
        .catch(function(error) {});
    },
    dayBtn(val) {
      if (val == 0) {
        this.day = 1;
      } else {
        this.day = 7;
      }
      this.activeIndex = val;
      this.getManpower();
    }
  }
};
</script>
<style scoped lang="less">
.manpower {
  height: 100%;
  .newBlankA {
    width: 72px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background: #597ef7;
    color: #fff;
    float: left;
    cursor: pointer;
  }
  .blankA {
    width: 72px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    background: #f0f2f5;
    float: left;
    cursor: pointer;
  }
  .manpower-title {
    margin-top: 14px;
    height: 40px;
    .manpower-title-name {
      float: left;
      font-size: 18px;
      font-weight: 600;
      margin-left: 4%;
      margin-top: 5px;
    }
    .manpower-title-btn {
      float: right;
      margin-right: 6%;
    }
  }
  .manpower-content {
    height: calc(100% - 85px);
    overflow-y: auto;
    .manpower-content-box {
      color: rgba(0, 0, 0, 0.65);
      padding: 10px 14px 0 20px;
      padding-left: 4%;
      .manpower-content-name {
        height: 25px;
        line-height: 25px;
        font-weight: 600;
      }
      .manpower-content-list {
        overflow: hidden;
        padding-bottom: 10px;
        border-bottom: 1px solid #f0f2f5;
        .manpower-list {
          height: 28px;
          line-height: 28px;
          .manpower-list-name {
            width: 80px;
            height: 28px;
            font-size: 12px;
            margin-right: 16px;
            float: left;
            cursor: default;
          }
          .manpower-list-size {
            float: left;
            margin-top: 8px;
            height: 12px;
            width: calc(100% - 96px - 60px);
            background: #f0f2f5;
            border-radius: 5px;
            position: relative;
            div {
              position: absolute;
              top: 0;
              left: 0;
              height: 12px;
              width: 60px;
              border-radius: 5px;
              &:hover {
                position: absolute;
                top: -2px;
                left: 0;
                height: 16px;
                width: 60px;
                border-radius: 8px;
              }
            }
          }
          .manpower-list-num {
            width: 60px;
            height: 28px;
            float: left;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>