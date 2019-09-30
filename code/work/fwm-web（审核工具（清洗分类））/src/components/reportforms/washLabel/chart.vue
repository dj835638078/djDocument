<template>
  <div class="chart">
    <div v-if="chartList">
      <div class="chart-box">
        <div
          class="table-box-title"
          style="height:65px;border-bottom:1px solid rgb(233, 233, 233);"
        >
          <div
            class="table-box-title-name"
            style="height: 50px;line-height: 70px;font-weight: 600;"
            v-text="
              dataType == '1' ? '清洗个人产出统计：' : '标注个人产出统计：'
            "
          ></div>
          <div
            class="table-box-title-num"
            style="margin-top: 15px;margin-right: 50px;"
            v-if="chartList.length"
          >
            <div class="table-box-title-num-top">
              总数量
            </div>
            <div class="table-box-title-num-bottom">{{ sum }}</div>
          </div>
        </div>
        <!-- <div class="chart-box-title-b"></div> -->
        <div
          class="chart-box-content"
          style="padding-left:20px;padding-top:20px;"
          v-if="chartList.length"
          v-bind:style="{ height: $parent.heightN - 5 + 'px' }"
        >
          <div class="manpower-content">
            <ul class="manpower-content-list">
              <li class="manpower-list" v-for="(item, i) in chartList" :key="i">
                <div class="manpower-list-name ellipsis">
                  <!-- <span>{{ item.labelUserNmae }}</span>
                  <span>{{ item.userName }}</span> -->
                  <el-tooltip
                    placement="top"
                    effect="dark"
                    :open-delay="200"
                    :visible-arrow="false"
                    v-if="item.labelUserNmae && item.labelUserNmae.length > 4"
                  >
                    <span>{{ item.labelUserNmae }}</span>
                    <div slot="content">{{ item.labelUserNmae }}</div>
                  </el-tooltip>
                  <span v-else>{{ item.labelUserNmae }}</span>
                  <el-tooltip
                    placement="top"
                    effect="dark"
                    :open-delay="200"
                    :visible-arrow="false"
                    v-if="item.userName && item.userName.length > 4"
                  >
                    <span>{{ item.userName }}</span>
                    <div slot="content">{{ item.userName }}</div>
                  </el-tooltip>
                  <span v-else>{{ item.userName }}</span>
                </div>
                <div class="manpower-list-size">
                  <el-tooltip
                    placement="top"
                    effect="dark"
                    :open-delay="200"
                    :visible-arrow="false"
                    v-if="item.processCount"
                  >
                    <div
                      v-bind:style="{
                        width: item.proportion + '%',
                        background: item.color
                      }"
                    ></div>

                    <div v-if="dataType == '1'" slot="content">
                      清洗员： {{ item.userName }}<br /><br />清洗数量：
                      {{ item.processCount }}条
                    </div>
                    <div v-if="dataType == '2'" slot="content">
                      标注员： {{ item.labelUserNmae }}<br /><br />标注数量：
                      {{ item.processCount }}条
                    </div>
                  </el-tooltip>
                </div>
                <div class="manpower-list-num ellipsis">
                  {{ item.processCount }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        v-if="!chartList.length"
        v-bind:style="{ height: $parent.heightN + 10 + 'px' }"
        style="text-align:center;color:#909399;font-size:12px;"
      >
        <div style="padding-top:125px;">暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      widthN: ""
    };
  },
  components: {},
  computed: {
    ...mapState(["menuLinkFlag"])
  },
  watch: {
    "$parent.monitorW"() {
      this.widthN = this.$parent.monitorW;
    },
    menuLinkFlag() {
      this.monitor();
    }
  },
  props: ["chartList", "sum", "dataType"],
  mounted() {
    this.monitor();
    var str = ["80", "160", "220", "842", "1234"];
    var num = Math.ceil(410 / 100);
  },
  methods: {
    //动态监听滚动条窗口
    monitor() {
      let _this = this;
      setTimeout(function() {
        if (document.getElementsByClassName("chart-box-list-box-one")[0]) {
          _this.widthN = document.getElementsByClassName(
            "chart-box-list-box-one"
          )[0].offsetWidth;
        }
      }, 100);
    }
  }
};
</script>

<style scoped lang="less">
.chart {
  overflow: hidden;
  .chart-box {
    width: 100%;
    overflow: hidden;
    //标题
    .chart-box-title-a {
      height: 78px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 51px;
      padding: 0 20px;
      div {
        width: 100%;
        height: 100%;
        border-bottom: 1px solid rgba(240, 242, 245, 1);
      }
    }
    .chart-box-title-b {
      height: 40px;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 40px;
      margin-left: 20px;
      margin-right: 20px;
    }
    .manpower-content {
      height: calc(100% - 0px);
      overflow-y: auto;
      .manpower-content-list {
        overflow: hidden;

        .manpower-list {
          height: 40px;
          line-height: 40px;
          padding-right: 10px;
          .manpower-list-name {
            width: 50px;
            height: 40px;
            font-size: 12px;
            margin-right: 16px;
            float: left;
            cursor: default;
          }
          .manpower-list-size {
            float: left;
            margin-top: 14px;
            height: 12px;
            width: calc(100% - 96px - 60px - 27px + 57px);
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
