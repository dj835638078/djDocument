<template>
  <div class="qualityDaily-Two-table">
    <h3 class="reportFormTitle">二、小组情况</h3>
    <ul class="qualityDaily-Two-table-box">
      <li
        class="qualityDaily-Two-table-box-li"
        v-for="(item, index) in tableData"
        :key="index"
        :style="{ marginRight: (index + 1) % 4 == 0 ? '0' : '12px' }"
      >
        <div class="qualityDaily-Two-table-box-li-top">
          {{ item.gGroup }}
        </div>
        <div class="qualityDaily-Two-table-box-li-bottom">
          <div class="li-bottom-left">出错量</div>
          <div class="li-bottom-right">
            <div class="li-bottom-right-top">
              <div>今日</div>
              <div>{{ item.errorNum }}</div>
            </div>
            <div class="li-bottom-right-bottom">
              <div>月累计</div>
              <div>{{ item.errorCountNum }}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="noDataTitle" v-if="tableData.length < 1">
      暂无数据
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: { ...mapState([]) },
  props: ["tableData"],
  components: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="less">
.qualityDaily-Two-table {
  overflow: hidden;
  .qualityDaily-Two-table-box {
    width: 100%;
    .qualityDaily-Two-table-box-li {
      width: 289px;
      height: 135px;
      border: 1px solid rgba(235, 238, 245, 1);
      float: left;
      margin-bottom: 10px;
      .qualityDaily-Two-table-box-li-top {
        height: 48px;
        width: 100%;
        text-align: center;
        line-height: 48px;
        background: rgba(240, 242, 245, 1);
        color: #2a2a2a;
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
      }
      .qualityDaily-Two-table-box-li-bottom {
        width: 100%;
        height: 87px;
        .li-bottom-left {
          float: left;
          width: 100px;
          height: 87px;
          text-align: center;
          line-height: 87px;
          color: #606266;
          font-size: 12px;
          font-family: PingFangSC-Regular;
        }
        .li-bottom-right {
          float: left;
          width: 189px;
          .li-bottom-right-top,
          .li-bottom-right-bottom {
            color: #606266;
            height: 43px;
            line-height: 43px;
            border-bottom: 1px solid #ebeef5;
            div {
              float: left;
              width: 50%;
              text-align: center;
            }
          }
          .li-bottom-right-bottom {
            border-bottom: none;
          }
        }
      }
    }
  }
}
</style>