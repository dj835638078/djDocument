<template>
  <div class="chart">
    <div v-if="chartList">
      <div class="chart-box">
        <div class="chart-box-title-a">
          <div>{{ $parent.titleName }}图：</div>
        </div>
        <div class="chart-box-title-b" v-if="chartList.length">审核数</div>
        <div
          class="chart-box-content"
          style="padding-left:20px;"
          v-if="chartList.length"
          v-bind:style="{ height: $parent.heightN - 30 + 'px' }"
        >
          <div class="manpower-content">
            <ul class="manpower-content-list">
              <li class="manpower-list" v-for="(item, i) in chartList" :key="i">
                <div class="manpower-list-name ellipsis">
                  <span v-if="chartTitle == '全部'">{{
                    item.processName
                  }}</span>

                  <span v-if="chartTitle == '个人'">{{ item.sourceName }}</span>
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
                    <div v-if="chartTitle == '全部'" slot="content">
                      审核员： {{ item.processName }}<br /><br />审核数量：
                      {{ item.processCount }}条
                    </div>
                    <div v-if="chartTitle == '个人'" slot="content">
                      模块： {{ item.sourceName }}<br /><br />数量：
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
  props: ["chartList", "numList", "chartTitle"],
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
      height: calc(100% - 9px);
      overflow-y: auto;
      .manpower-content-list {
        overflow: hidden;

        .manpower-list {
          height: 40px;
          line-height: 40px;
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
