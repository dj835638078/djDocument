<template>
  <div class="Lookup">
    <!--弹框-->
    <!--删除弹框-->
    <Remove event="removeLookup" />
    <div class="popBox">
      <el-dialog
        :title="titleName"
        :visible.sync="judgeQuery"
        :modal-append-to-body='false'
        :append-to-body='true'
        width="730px"
        top="10vh"
      >
        <el-form
          :inline="true"
          :model="list"
          class="demo-form-inline"
        >
          <div class="lookOne">
            <div class="abox">
              <span class="abox-lableName"><span v-if="titleName !='查询'">*</span>类别编号：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="autoCode"
                  placeholder="请填类别编号"
                  :disabled="stop"
                ></el-input>
              </div>
              <div
                class="error-point"
                v-if="judgeCode"
              >请填写类别编号</div>
            </div>
            <div class="abox">
              <span class="abox-lableName"><span v-if="titleName !='查询'">*</span>类别名称：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="autoName"
                  placeholder="请填写类别名称"
                ></el-input>
              </div>
              <div
                class="error-point"
                v-if="judgeName"
              >请填写类别名称</div>
            </div>
            <div class="abox">
              <span class="abox-lableName">&nbsp;类别描述：</span>
              <div class="input-box">
                <el-input
                  maxlength="50"
                  v-model="autoDesc"
                  placeholder="请填写类别描述"
                ></el-input>
              </div>
            </div>
            <div
              class="abox"
              v-if="titleName =='查询'"
            >
              <span class="abox-lableName">&nbsp;数据范围：</span>
              <div class="input-box">
                <el-select
                  v-model="dataRange"
                  placeholder="请选择数据范围"
                  style="width: 100%;"
                >
                  <el-option
                    v-for="(item,index) in lookUp.LOOKUP_DATA_RANGE"
                    :label="item.itemName"
                    :value="item.itemCode"
                    :key="index"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
        </el-form>
        <div style="clear:both"></div>
        <div
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="cancel">取 消</el-button>
          <el-button
            type="primary"
            @click="confirm"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="tabBox">
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="分类列表"
          name="first"
        >
        </el-tab-pane>
        <el-tab-pane
          v-if="judgeLabel"
          label="分类明细"
          name="second"
        ></el-tab-pane>
      </el-tabs>
      <div class="tabBottom"></div>
    </div>
    <!--下拉列表-->
    <div v-if="activeName == 'first'">
      <div class="btn-box">
        <div
          class="new"
          @click="newLookup"
        ><i class="fa fa-plus-circle"></i>新建</div>
        <div
          class="query"
          @click="queryLookup"
        ><i class="fa fa-search"></i>查询</div>
        <div
          class="delete"
          @click="deleteLookup"
          v-if="userInfo.isAdmin =='Y'"
        ><i class="fa fa-trash-o"></i>删除</div>
      </div>
      <div>
        <el-table
          :data="lookupList"
          border
          @selection-change="checkAll"
          style="width: 100%"
          tooltip-effect="light"
          :height="tableHeight"
        >
          <el-table-column
            type="selection"
            width="55"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="90"
            align="left"
          >
            <template slot-scope="scope">

              <div
                @click="configure(scope.row)"
                type="text"
                size="small"
                title="配置"
              ><i class="el-icon-setting settingCol"></i></div>
              <div
                type="text"
                size="small"
                title="修改"
                @click="edit(scope.row)"
                v-if="userInfo.isAdmin =='Y' || scope.row.dataRange=='region'"
              ><i class="el-icon-edit editCol"></i></div>
              <div
                type="text"
                size="small"
                title="删除"
                @click="removeOne(scope.row)"
                v-if="userInfo.isAdmin =='Y' || scope.row.dataRange=='region'"
              ><i class="el-icon-delete deleteCol"></i></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="autoCode"
            label="类别编号"
            :show-overflow-tooltip="true"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="autoName"
            label="类别名称"
            width="150"
          >
          </el-table-column>
          <el-table-column
            prop="autoDesc"
            label="类别描述"
            :show-overflow-tooltip="true"
            width="350"
          >
          </el-table-column>
          <el-table-column
            prop="dataRange"
            label="数据范围"
            width="100"
          >
            <template slot-scope="scope">
              <div v-text="tools.setDataRange(scope.row.dataRange)"></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="regionCode"
            label="区域编号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="创建用户"
            align="left"
            width="120"
          >
            <template slot-scope="scope">
              <div v-text="tools.setRole(scope.row.createBy)"></div>
            </template>
          </el-table-column>

          <el-table-column
            label="创建时间"
            align="left"
            width="160"
          >
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.createDate,1)"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="修改用户"
            align="left"
            width="120"
          >
            <template slot-scope="scope">
              <div v-text="tools.setRole(scope.row.lastUpdateBy)"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="修改时间"
            align="left"
            width="160"
          >
            <template slot-scope="scope">
              <div v-text="tools.setFormTime(scope.row.lastUpdateDate,1)"></div>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    <!--下拉明细-->
    <div v-if="activeName == 'second'">
      <setLookup
        :lookupCodeName="lookupCodeName "
        :lookupNameChild="lookupNameChild"
      />
    </div>
  </div>
</template>
<script>
import api from "@/api";
import Remove from "../../common/Remove";
import setLookup from "./setLookup";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Lookup",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      //导航控制
      activeName: "first",
      //删除触发
      judgeRemove: false,
      judgeLabel: false,
      judgeQuery: false,
      titleName: "查询",
      container: [],
      //校验编号
      judgeCode: false,
      //校验名称
      judgeName: false,
      autoCode: "",
      autoName: "",
      autoDesc: "",
      dataRange: "",
      autoId: "",
      lookupList: [],
      stop: false,
      list: {},
      //传给子级调用方法
      lookupCodeName: "",
      lookupNameChild: ""
    };
  },
  mounted() {
    this.getLookup();
  },
  watch: {},
  components: {
    Remove,
    setLookup
  },
  computed: {
    ...mapState(["userInfo", "tableHeight", "lookUp"])
  },
  methods: {
    //重置校验
    resetProof() {
      this.judgeCode = false;
      this.judgeName = false;
      this.autoCode = "";
      this.autoName = "";
      this.dataRange = "";
      this.autoDesc = "";
    },
    //添加修改校验
    proof() {
      if (!this.autoCode) {
        this.judgeCode = true;
      } else {
        this.judgeCode = false;
      }
      if (!this.autoName) {
        this.judgeName = true;
      } else {
        this.judgeName = false;
      }
    },
    //标签操作
    handleClick(row) {
      if (row.label == "下拉列表") {
        //this.activeName = "first";
        this.judgeLabel = false;
      }
    },
    assort(name) {
      this.titleName = name;
      this.judgeQuery = true;
      this.resetProof();
    },
    //全选
    checkAll(val) {
      this.container = val;
    },
    //删除
    removeOne(val) {
      this.judgeRemove = !this.judgeRemove;
      this.userIdsList = [];
      this.userIdsList.push(val);
    },
    //全部删除
    deleteLookup() {
      if (this.container.length != 0) {
        this.judgeRemove = !this.judgeRemove;
        this.userIdsList = this.container;
      } else {
        this.$message({
          showClose: true,
          message: "请选择要删除的内容",
          type: "warning"
        });
      }
      //this.judgeRemove = !this.judgeRemove;
    },
    removeLookup() {
      let vm = this;
      let arr = [];
      for (let i = 0; i < this.userIdsList.length; i++) {
        let obj = {};
        obj.autoId = this.userIdsList[i].autoId;
        obj.autoCode = this.userIdsList[i].autoCode;
        arr.push(obj);
      }
      let data = arr;
      api
        .post(`./manage/service/autoLookup/delete`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            vm.currentPage = 1;
            vm.pageSize = 10;
            vm.getLookup();
          }
        })
        .catch(function(error) {});
    },
    //修改
    edit(val) {
      this.assort("编辑");
      this.stop = true;
      this.autoId = val.autoId;
      (this.dataRange = val.dataRange), (this.autoCode = val.autoCode);
      this.autoName = val.autoName;
      this.autoDesc = val.autoDesc;
    },
    //查询
    queryLookup() {
      this.stop = false;
      this.assort("查询");
    },
    //添加
    newLookup() {
      this.stop = false;
      this.assort("新建");
    },
    //配置
    configure(val) {
      this.judgeLabel = true;
      //光标对位
      this.activeName = "second";
      this.lookupCodeName = val.autoCode;
      this.lookupNameChild = val.autoName;
    },
    //取消
    cancel() {
      this.judgeQuery = false;
    },
    //分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.getLookup();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLookup();
    },
    updateLookup() {
      let vm = this;
      let data = {
        autoCode: this.autoCode,
        autoName: this.autoName,
        autoDesc: this.autoDesc,
        dataRange: this.dataRange,
        autoId: this.autoId
      };
      api
        .post(`./manage/service/autoLookup/update`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.resetProof();
            vm.getLookup();
            vm.judgeQuery = false;
          }
        })
        .catch(function(error) {});
    },
    //新建
    setLookupData() {
      let vm = this;
      let data = {
        autoCode: this.autoCode,
        autoName: this.autoName,
        dataRange: this.dataRange,
        autoDesc: this.autoDesc
      };
      api
        .post(`./manage/service/autoLookup/insert`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.resetProof();
            vm.getLookup();
            vm.judgeQuery = false;
          }
        })
        .catch(function(error) {});
    },
    //获取下拉数据
    getLookup() {
      let vm = this;
      let data = {
        autoCode: this.autoCode,
        autoName: this.autoName,
        autoDesc: this.autoDesc,
        dataRange: this.dataRange
      };
      api
        .post(
          `./manage/service/autoLookup/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.totals = response.data.page.totalRows;
            vm.lookupList = response.data.result;
            vm.judgeQuery = false;
          }
        })
        .catch(function(error) {});
    },
    //确定
    confirm() {
      if (this.titleName != "查询") {
        this.proof();
        this.currentPage = 1;
        this.pageSize = 10;
        if (!this.judgeCode && !this.judgeName) {
          if (this.titleName == "新建") {
            this.setLookupData();
          } else {
            this.updateLookup();
          }
        }
      } else {
        this.getLookup();
      }
    }
  }
};
</script>

<style scoped lang="less">
.Lookup {
}
</style>
