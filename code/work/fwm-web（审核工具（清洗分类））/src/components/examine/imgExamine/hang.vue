<template>
  <div class="hang">
    <div class="search-box-one">
      <div class="search-box-top">
        <div class="search-box-top-name"><span>*</span>内容选择：</div>
        <div class="search-box-top-right">
          <div class="one-box">
            <div class="one-box-child">
              <el-select v-model="dataType1" placeholder="请选择审核类型">
                <el-option
                  v-for="item in options1"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="one-box">
            <div class="one-box-child">
              <el-select
                v-model="dataType2"
                placeholder="请选择审核通道"
                :disabled="judgetype2"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="one-box">
            <div class="one-box-child">
              <el-select
                v-model="dataType3"
                placeholder="请选择审核来源"
                :disabled="judgetype3"
              >
                <el-option
                  v-for="item in options3"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="search-box-right">
        <div
          v-if="dataType3 || dataType2 || dataType1"
          class="new"
          style="margin-right:20px;"
          @click="reset"
        >
          <i class="fa fa-refresh"></i>重置
        </div>
        <div v-else class="release" style="margin-right:20px;">
          <i class="fa fa-refresh"></i>重置
        </div>
        <!--
        <div
          v-if="dataType3"
          class="query"
          @click="query"
        ><i class="fa fa-search"></i>查询</div>
        <div
          class="release"
          v-else
        ><i class="fa fa-search"></i>查询</div>
        -->
      </div>
    </div>
    <div style="width:100%;margin-top:20px;" v-if="tableData.length">
      <el-table
        :data="tableData"
        border
        :height="tableHeightOne"
        tooltip-effect="light"
        style="width: 100%"
      >
        <el-table-column label="NO." type="index" width="50" align="center">
        </el-table-column>

        <el-table-column label="标题" :show-overflow-tooltip="true">
          <template slot-scope="scope">
            <span
              style="color:#1890FF;cursor:pointer;"
              @click="openDetail(scope.row)"
            >
              <el-tooltip
                content="高转发量"
                placement="bottom"
                effect="light"
                v-if="scope.row.forwardingVolume > 300"
              >
                <span class="fa fa-star" style="color:#F5A623;"
                  >&nbsp;</span
                > </el-tooltip
              ><span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span
              >{{ scope.row.atricleTitle }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
          prop="rowKey"
          label="rowkey"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="accountId"
          label="账号UIN"
          :show-overflow-tooltip="true"
        >
        </el-table-column>

        <el-table-column label="账号名称">
          <template slot-scope="scope">
            <div v-text="scope.row.accountName"></div>
          </template>
        </el-table-column>

        <el-table-column label="入库时间" align="left" width="160">
          <template slot-scope="scope">
            <div v-text="tools.setFormTime(scope.row.createDate, 1)"></div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging-box" v-if="tableData.length">
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals"
        >
        </el-pagination>
      </div>
    </div>
    <!--<div
      v-if="!tableData.length"
      style="text-align:center;"
    >
      <img
        src="../../../assets/img/print-1.jpg"
        style="width:280px;height:208px;margin-top:102px;margin-bottom:10px;"
      />
      <p>暂无数据</p>
    </div>-->
    <div v-if="infoDialogFlag">
      <infoDialog :dataInfo="detailListVal" :title="title" />
    </div>
  </div>
</template>
<script>
import api from "@/api";
import infoDialog from "./infoDialog";
import { mapState, mapMutations } from "vuex";
export default {
  name: "hang",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      tableData: [],
      dataType1: "",
      judgetype1: false,
      dataType2: "",
      infoDialogFlag: false,
      title: "挂起",
      detailListVal: "",
      judgetype2: true,
      dataType3: "",
      judgetype3: true,
      options1: [],
      options2: [],
      options3: []
    };
  },
  mounted() {
    this.inquiry();
    this.getoptions();
  },
  computed: {
    ...mapState(["tableHeightOne"])
  },
  watch: {
    dataType1() {
      this.dataType2 = "";
      this.tableData = [];
      this.decide();
    },
    dataType2() {
      this.dataType3 = "";
      this.tableData = [];
      this.decide();
    },
    //监听类型3
    dataType3() {
      if (this.dataType3) {
        this.inquiry();
      }
    }
  },
  components: { infoDialog },
  methods: {
    openDetail(val) {
      this.detailListVal = val.graphicId;
      this.infoDialogFlag = true;
    },
    //获取内容下拉数据
    getoptions() {
      let vm = this;
      api
        .get(
          `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=1`
        )
        .then(function(response) {
          vm.options1 = response.data;
        })
        .catch(function(error) {});
    },
    //校验
    decide() {
      if (this.dataType1) {
        this.judgetype2 = false;
        let vm = this;
        api
          .get(
            `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=2&code=${
              this.dataType1
            }`
          )
          .then(function(response) {
            vm.options2 = response.data;
          })
          .catch(function(error) {});
      } else {
        this.judgetype2 = true;
      }
      if (this.dataType2) {
        let vm = this;
        api
          .get(
            `./manage/service/channelLookUp/findLookUpsAssgin?type=1_1&level=3&code=${
              this.dataType2
            }`
          )
          .then(function(response) {
            vm.options3 = response.data;
          })
          .catch(function(error) {});
        this.judgetype3 = false;
      } else {
        this.judgetype3 = true;
      }
    },
    //查询单
    inquiry() {
      let data = {
        dataSource: this.dataType3,
        dataState: 2
      };
      let vm = this;
      api
        .post(
          `./manage/service/graphics/query?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.tableData = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.inquiry();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.inquiry();
    },
    query() {
      this.inquiry();
    },
    reset() {
      this.dataType1 = "";
      this.dataType2 = "";
      this.dataType3 = "";
      this.inquiry();
    }
  }
};
</script>

<style scoped lang="less">
.hang {
}
</style>
