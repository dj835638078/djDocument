<template>
  <div class="ImgExamine">
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="审核领单" name="1" style="color:red;">
        </el-tab-pane>
        <el-tab-pane label="审核记录" name="2"></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <!-- one -->
    <div v-if="tag == 1">
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
        <div style="width:30%;float:left;">
          <div class="search-box-two-right-name">账号UIN：</div>
          <div style="width:calc(100% - 100px);float:left;padding-right:20px">
            <el-input v-model="accountId" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <div class="search-box-two">
        <div class="search-box-top-name"><span>*</span>送审时间：</div>
        <div class="box-two">
          <div class="two-one-box">
            <div class="box-two-child">
              <el-date-picker
                v-model="createDate"
                type="datetime"
                placeholder="请选择时间"
              >
              </el-date-picker>
            </div>
            <div class="Pul">-</div>
          </div>
          <div class="two-one-box">
            <div class="box-two-child">
              <el-date-picker
                v-model="endDate"
                type="datetime"
                placeholder="请选择时间"
              >
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="search-box-right">
        <div
          v-if="!tableData.length"
          class="release"
          style="margin-right:20px;"
        >
          <i class="fa fa-recycle"></i>释放
        </div>
        <div
          v-if="tableData.length"
          class="new"
          @click="release"
          style="margin-right:20px;"
        >
          <i class="fa fa-recycle"></i>释放
        </div>
        <div
          v-if="dataType3 && createDate && endDate && !tableData.length"
          class="new"
          @click="receive"
        >
          <i class="fa fa-plus-circle"></i>领单
        </div>
        <div v-else class="release"><i class="fa fa-plus-circle"></i>领单</div>
      </div>
      <div class="clear"></div>
      <div v-if="tableData.length" style="margin-top:20px;">
        <receive />
        <div class="paging-box">
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
      </div>
    </div>

    <!-- three -->
    <div v-if="tag == 2">
      <record />
    </div>
  </div>
</template>
<script>
import receive from "./videoTab/receive";
import record from "./videoTab/record";
import { mapState, mapMutations } from "vuex";
export default {
  name: "ImgExamine",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "1",
      tag: "1",
      title: "领单",
      num1: "",
      num2: "",
      options1: [],
      options2: [],
      options3: [],
      tableData: [],
      dataType1: "",
      judgetype1: false,
      dataType2: "",
      judgetype2: true,
      dataType3: "",
      judgetype3: true,
      createDate: "",
      endDate: "",
      accountId: ""
    };
  },
  mounted() {
    this.createDate = new Date().setMinutes(new Date().getMinutes() - 120);
    this.endDate = new Date();
    this.getoptions();
  },
  computed: {
    ...mapState(["tableHeightTwo"])
  },
  watch: {
    tag() {
      this.resetData();
    },
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
        this.currentPage = 1;
        this.pageSize = 10;
        this.inquiry();
      }
    },
    createDate() {
      this.judgeTime();
    },
    endDate() {
      this.judgeTime();
    }
  },
  components: {
    receive,
    record
  },
  methods: {
    //判断时间
    judgeTime() {
      if (this.createDate && this.endDate) {
        if (this.endDate < this.createDate) {
          //this.endDate = "";
          this.$message({
            message: "结束时间已超出开始时间",
            type: "error"
          });
        }
      }
    },
    //重置
    resetData() {
      //zx
      this.dataType1 = "";
      this.dataType2 = "";
      this.dataType3 = "";
      this.createDate = new Date().setMinutes(new Date().getMinutes() - 120);
      this.endDate = new Date();
      this.accountId = "";
    },
    //获取内容下拉数据
    getoptions() {
      let vm = this;
      vm.api
        .get(
          `./manage/service/channelLookUp/findLookUpsAssgin?type=1_2&level=1`
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
        vm.api
          .get(
            `./manage/service/channelLookUp/findLookUpsAssgin?type=1_2&level=2&code=${this.dataType1}`
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
        vm.api
          .get(
            `./manage/service/channelLookUp/findLookUpsAssgin?type=1_2&level=3&code=${this.dataType2}`
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
        //dataType: this.dataType3
        dataSource: this.dataType3,
        dataState: 1
      };
      let vm = this;
      vm.api
        .post(
          `./manage/service/videoVerify/findPage?currentPage=${this.currentPage}&pageSize=${this.pageSize}`,
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
    //标签操作
    handleClick(row) {
      this.activeName = row.name;
      this.tag = row.name;
    },
    //领单
    receive() {
      let data = {
        //dataType: this.dataType3,
        dataSource: this.dataType3,
        startDate: this.createDate,
        endDate: this.endDate,
        accountId: this.accountId
      };
      let vm = this;
      vm.api
        .post(`./manage/service/videoVerify/add`, data)
        .then(function(response) {
          vm.inquiry();
        })
        .catch(function(error) {});
    },
    //释放
    release() {
      let data = {
        dataSource: this.dataType3
      };
      let vm = this;
      vm.api
        .post(`./manage/service/graphics/release`, data)
        .then(function(response) {
          vm.dataType1 = "";
          vm.dataType2 = "";
          vm.dataType3 = "";
          vm.createDate = new Date().setMinutes(new Date().getMinutes() - 120);
          vm.endDate = new Date();
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
    }
  }
};
</script>

<style scoped lang="less">
.ImgExamine {
  overflow: hidden;
}
</style>
