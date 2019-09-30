<template>
  <div class="checkData">
    <div class="checkData-search" style="height: auto;overflow:hidden;">
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:82px;margin-left:5px;">
          <span style="color:red">*</span>质检日期：
        </div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="startDate"
            type="date"
            placeholder="选择时间"
            value-format="timestamp"
            :clearable="false"
          >
          </el-date-picker>
        </div>
        <div class="separate">-</div>
        <div class="search-one-box-time">
          <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="选择时间"
            value-format="timestamp"
            :clearable="false"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="search-one-box">
        <div class="search-one-box-name" style="text-align:center;">日期：</div>
        <div class="search-one-box-input">
          <el-select v-model="dateText" placeholder="请选择来源">
            <el-option
              v-for="item in timeList"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box" style="margin-right:0;height:auto">
        <div class="search-one-box-name" style="width:77.5px;margin-left:10px;">
          质检来源：
        </div>
        <div class="search-one-box-input" style="height:auto">
          <!-- <el-select
            v-model="dataSource"
            placeholder="请选择业务来源"
            :clearable="true"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in lookUp.DATASOURCE_WX_SP"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select> -->
          <el-select
            v-model="checkChannel"
            placeholder="请选择质检来源"
            :clearable="true"
          >
            <el-option
              v-for="item in lookUp.COMPLEX_CHECK_CHANNEL_VIDEO"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box" style="margin:20px 0;height: auto;">
        <div class="search-one-box-name" style="width:77.5px;margin-left:10px;">
          业务来源：
        </div>
        <div class="search-one-box-input" style="height: auto;">
          <el-select
            v-model="dataSource"
            placeholder="请选择业务来源"
            :clearable="true"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in lookUp.DATASOURCE_WX_SP"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box" style="margin:20px 0 20px 10px;height: auto;">
        <div class="search-one-box-name" style="margin-left:5px;">
          QQ号码：
        </div>
        <div class="search-one-box-input" style="height: auto;">
          <!-- <el-input
            v-model="qqAccount"
            placeholder="请输入QQ号码"
            clearable
          ></el-input> -->

          <el-select
            v-model="qqAccount"
            @change="qqBtn"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="每输入一个QQ号后按回车分隔"
            collapse-tags
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="search-one-box" style="margin:20px 0;height:auto">
        <div
          class="search-one-box-name"
          style="width: 75px;margin-left:15px;text-align:center;"
        >
          组别：
        </div>
        <div class="search-one-box-input" style="width:225px;height:auto">
          <el-select
            v-model="vGroup"
            placeholder="请选择组别"
            :clearable="true"
            multiple
            collapse-tags
          >
            <el-option
              v-for="item in lookUp.VERIFY_GROUP"
              :key="item.itemCode"
              :label="item.itemName"
              :value="item.itemCode"
            >
            </el-option>
          </el-select>
          <!-- <el-cascader
            :options="lookUp.VERIFY_GROUP"
            :props="props"
            collapse-tags
            clearable
          ></el-cascader> -->
        </div>
      </div>
      <div style="float:right;margin-top:20px;">
        <div class="query interval" @click="query">查询</div>
        <div
          class="release"
          v-if="
            !startDate &&
              !endDate &&
              !dataSource &&
              !vGroup &&
              !dateText &&
              !checkChannel &&
              !qqAccount
          "
        >
          重置
        </div>
        <div class="main" @click="release" v-else>重置</div>
      </div>
    </div>
    <div class="count-list">
      <ul class="count-list-ul">
        <li class="count-list-li">
          <div class="count-value" style="margin-right: 0px;">
            <span
              style="width: 10px;float: left;height: 34px;margin-left: 20px;"
            >
              <div
                style="width: 6px;height: 6px;background: #00CDCA;border-radius: 50%;margin-top: 14px;"
              ></div>
            </span>
            <span style="font-weight: 700;">审核总量：{{ videoCountSum }}</span>
          </div>
        </li>
        <li class="count-list-li">
          <div class="count-value">
            <span
              style="width: 10px;float: left;height: 34px;margin-left: 20px;"
            >
              <div
                style="width: 6px;height: 6px;background: #00CDCA;border-radius: 50%;margin-top: 14px;"
              ></div>
            </span>
            <span style="font-weight: 700;">质检总量：{{ checkCountSum }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="checkData-tab">
      <Table :tableData="list" :dateTextType="dateNum" />
    </div>
    <div style="margin-top:20px;height:32px;">
      <el-pagination
        v-if="totals > 0"
        style="text-align:right;"
        background
        :total="totals"
        :page-size="pageSize"
        :current-page="currentPage"
        layout="total,sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Human from "../../public/Human";
import { mapState } from "vuex";
import Table from "./Table";
// import Human from "../public/Human";
export default {
  data() {
    return {
      props: { multiple: true },
      videoCountSum: "",
      checkCountSum: "",
      options: [
        // {
        //   value: "",
        //   label: ""
        // },
        // {
        //   value: "",
        //   label: ""
        // },
        // {
        //   value: "",
        //   label: ""
        // }
      ],
      timeList: [
        {
          itemCode: "1",
          itemName: "日"
        },
        {
          itemCode: "7",
          itemName: "周"
        },
        {
          itemCode: "30",
          itemName: "月"
        }
      ],
      dateNum: "1",
      startDate: "",
      endDate: "",
      dateText: "1",
      checkChannel: "",
      qqAccount: [],
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      list: [],
      dataSource: "",
      vGroup: "",
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() < this.startDate;
        }
      }
    };
  },
  watch: {},
  components: { Table, Human },
  computed: {
    ...mapState(["lookUp"])
  },
  mounted() {
    this.startDate = new Date(new Date() - 24 * 60 * 60 * 1000);
    this.endDate = new Date(new Date() - 24 * 60 * 60 * 1000);
    this.getInformation();
    this.getProbability();
  },
  methods: {
    qqBtn() {
      if (this.qqAccount.length) {
        var reg = /^[1-9][0-9]{4,15}$/g;
        if (!reg.test(this.qqAccount[this.qqAccount.length - 1])) {
          this.qqAccount.splice(this.qqAccount.length - 1, 1);
          this.$message({
            message: "请输入正确的QQ号",
            type: "error"
          });
        } else {
          let obj = {
            value: this.qqAccount[this.qqAccount.length - 1],
            label: this.qqAccount[this.qqAccount.length - 1]
          };
          for (let i = 0; i < this.options.length; i++) {
            if (this.options[i].value == obj.value) {
              return;
            }
          }
          this.options.push(obj);
        }
      }
    },
    query() {
      if (this.endDate < this.startDate) {
        this.$message({
          message: "结束时间不能早于开始时间",
          type: "error"
        });
      } else {
        this.currentPage = 1;
        this.pageSize = 10;
        this.getInformation();
        this.getProbability();
      }
    },
    release() {
      this.dataSource = [];
      this.vGroup = [];
      this.startDate = new Date(new Date() - 24 * 60 * 60 * 1000);
      this.endDate = new Date(new Date() - 24 * 60 * 60 * 1000);
      this.dateText = "1";
      this.checkChannel = "";
      this.options = [];
      this.qqAccount = [];
      this.videoCountSum = "";
      this.checkCountSum = "";
      this.currentPage = 1;
      this.pageSize = 10;
      this.totals = 0;
      this.getInformation();
      this.getProbability();
    },

    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getInformation();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getInformation();
    },
    //获取数据
    getInformation() {
      let data = {
        dataSource: this.dataSource.join(","),
        verifyGroup: this.vGroup.join(","),
        startDate: this.startDate,
        endDate: this.endDate,
        dateText: this.dateText,
        checkChannel: this.checkChannel,
        qqAccount: this.qqAccount.join(",")
      };
      this.api
        .post(
          `./complex/service/vReporter/checkDataRep?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(response => {
          if (response.status == 200) {
            this.list = response.data.result;
            this.totals = response.data.page.totalRows;
            this.dateNum = this.dateText;
            window.scrollTo(0, 0);
          }
        })
        .catch(error => {});
    },
    //获取总量
    getProbability() {
      let data = {
        dataSource: this.dataSource.join(","),
        verifyGroup: this.vGroup.join(","),
        startDate: this.startDate,
        endDate: this.endDate,
        dateText: this.dateText,
        checkChannel: this.checkChannel,
        qqAccount: this.qqAccount.join(",")
      };
      this.api
        .post(`./complex/service/vReporter/checkDataSum`, data)
        .then(response => {
          if (response.status == 200) {
            this.videoCountSum = response.data.videoCountSum;
            this.checkCountSum = response.data.checkCountSum;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.checkData-search /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
  height: 32px;
}
.checkData {
  width: 100%;
  margin-bottom: 100px;
  .checkData-search {
    height: 32px;
    width: 100%;
    margin-top: 20px;
    .search-one-box {
      height: 32px;
      float: left;
      margin-right: 15px;
      .search-one-box-name,
      .search-one-box-input {
        float: left;
      }
      .search-one-box-name {
        width: 75px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .search-one-box-input {
        width: 225px;
        height: 32px;
        .el-select {
          width: 100%;
        }
      }
      .search-one-box-time {
        width: 225px;
        float: left;
        .el-date-editor {
          width: 225px;
        }
      }
    }
  }
  .count-list {
    .count-list-ul {
      width: 100%;
      overflow: hidden;
      height: 50px;
      background-color: #f5f7fa;
      margin-bottom: 10px;
      .count-list-li {
        float: left;
        width: 50%;
        line-height: 34px;
        .count-value {
          margin: 0 auto;
          background-color: white;
          height: 34px;
          margin-top: 8px;
          margin-left: 8px;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>