<template>
  <div class="directorTable">
    <div class="table-box" v-if="chartList">
      <div class="table-box-title">
        <div
          class="table-box-title-name"
          style="font-weight: 600;line-height: 70px;"
        >
          {{ $parent.titleName }}表：
        </div>
        <div class="table-box-title-num" v-if="chartList.length">
          <div class="table-box-title-num-top">总数量</div>
          <div class="table-box-title-num-bottom">{{ sum }}</div>
        </div>
      </div>
      <div class="table-box-content" v-if="$parent.heightN">
        <el-table
          v-if="chartList.length"
          :data="chartList"
          style="width: 100%"
          highlight-current-row
          tooltip-effect="light"
          :height="$parent.heightN"
        >
          <el-table-column
            prop="regionName"
            label="组别"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column label="操作" align="left">
            <template slot-scope="scope">
              <div
                type="text"
                size="small"
                style="color:#5675F5;cursor:pointer"
                @click="goOne(scope.row)"
              >
                查看详情
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="userCount"
            align="left"
            label="人员数量"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            v-if="washLabel != 'yes'"
            prop="moduleCount"
            align="left"
            label="已操作模块数量"
            width="110"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            v-if="washLabel != 'yes'"
            prop="processCount"
            label="已审核数量"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            v-if="labelName == '标注数量'"
            prop="processCount"
            :label="labelName"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            v-if="labelName == '清洗分类数量'"
            prop="processCount"
            :label="labelName"
            align="left"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
        <div
          v-else
          v-bind:style="{ height: $parent.heightN + 'px' }"
          style="text-align:center;color:#909399;font-size:12px;"
        >
          <div style="padding-top:123px;">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  components: {},
  watch: {},
  computed: {},
  props: ["chartList", "sum", "washLabel", "labelName"],

  mounted() {},
  methods: {
    goOne(val) {
      if (this.washLabel != "yes") {
        this.$parent.regioncode = val.regioncode;
        this.$parent.getData();
      } else {
        let type = "";
        if (this.labelName == "清洗分类数量") {
          type = 1;
        } else {
          type = 2;
        }
        this.$router.push({
          name: "personal",
          params: {
            id: val.regioncode,
            type: type,
            s: this.$parent.sDate,
            e: this.$parent.eDate
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>
