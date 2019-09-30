<template>
  <div class="deployLookup">
    <!--弹框-->
    <PopAddLookup
      :titleName="titleNamea"
      :list="listChild"
    />
    <!--删除弹框-->
    <Remove event="removeLookupChild" />
    <div class="popBox">
      <el-dialog
        title="查询"
        :visible.sync="judgeQuery"
        :modal-append-to-body='false'
        :append-to-body='true'
        width="730px"
        top="10vh"
      >
        <el-form
          :inline="true"
          :model="listBox"
          class="demo-form-inline"
        >
          <div class="popBox-lookup">
            <div class="abox">
              <span class="abox-lableName">项目编号：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="itemCode"
                  placeholder="请填项目编号"
                ></el-input>
              </div>
            </div>
            <div class="abox">
              <span class="abox-lableName">项目名称：</span>
              <div class="input-box">
                <el-input
                  maxlength="20"
                  v-model="itemName"
                  placeholder="请填写项目名称"
                ></el-input>
              </div>

            </div>
            <div class="abox">
              <span class="abox-lableName">项目描述：</span>
              <div class="input-box">
                <el-input
                  maxlength="50"
                  style="width:600px;"
                  v-model="itemDesc"
                  placeholder="请填写项目描述"
                ></el-input>
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
    <!--下拉列表-->
    <div>
      <div
        class="btn-box"
        style="display: flex;"
      >
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
        ><i class="fa fa-trash-o"></i>删除</div>
        <div
          class="roleSetItem"
          style="margin-left:40px;"
        >
          <span>类别编号：</span>
          <el-input
            v-model="lookupCodeName"
            :disabled="true"
          ></el-input>

        </div>
        <div class="roleSetItem">
          <span>类别名称：</span>
          <el-input
            v-model="lookupNameChild"
            :disabled="true"
          ></el-input>

        </div>
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
            width="85"
            align="left"
          >
            <template slot-scope="scope">

              <div
                type="text"
                size="small"
                title="修改"
                @click="edit(scope.row)"
              ><i class="el-icon-edit editCol"></i></div>
              <div
                type="text"
                size="small"
                title="删除"
                @click="removeOne(scope.row)"
              ><i class="el-icon-delete deleteCol"></i></div>
            </template>
          </el-table-column>
          <el-table-column
            prop="itemCode"
            label="项目编号"
            width="200"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="itemName"
            label="项目名称"
            width="200"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="itemDesc"
            label="项目描述"
            width="200"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="orderId"
            label="排序"
          >
          </el-table-column>
          <el-table-column
            prop="expandValue1"
            label="拓展字段1"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="expandValue2"
            label="拓展字段2"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="expandValue3"
            label="拓展字段3"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            prop="expandValue4"
            label="拓展字段4"
            :show-overflow-tooltip="true"
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
  </div>
</template>
<script>
import api from "@/api";
import Remove from "../../common/Remove";
import PopAddLookup from "./PopAddLookup";
import { mapState, mapMutations } from "vuex";
export default {
  name: "deployLookup",
  data() {
    return {
      //当前页
      currentPage: 1,
      pageSize: 10,
      totals: 0,
      asd: "",
      qwe: "",
      //删除触发
      judgeRemove: false,
      judgeQuery: false,
      container: [],
      //校验名称
      itemCode: "",
      itemName: "",
      itemDesc: "",
      lookupId: "",
      lookupList: [],
      userIdsList: [],
      listBox: {},
      listChild: {
        itemCode: "",
        itemName: "",
        orderId: "",
        itemDesc: "",
        expandValue1: "",
        expandValue2: "",
        expandValue3: "",
        expandValue4: ""
      },
      judgePopLookup: false,
      titleNamea: ""
    };
  },
  props: ["lookupCodeName", "lookupNameChild"],
  mounted() {
    this.deployLookup();
  },
  computed: {
    ...mapState(["tableHeight"])
  },
  watch: {},
  components: {
    Remove,
    PopAddLookup
  },
  methods: {
    //获取数据
    deployLookup() {
      let vm = this;
      let data = {
        lookupCode: this.lookupCodeName,
        itemCode: this.itemCode,
        itemName: this.itemName,
        itemDesc: this.itemDesc
      };

      api
        .post(
          `./manage/service/lookupitem/page?currentPage=${
            this.currentPage
          }&pageSize=${this.pageSize}`,
          data
        )
        .then(function(response) {
          if (response.status == 200) {
            vm.judgeQuery = false;
            vm.lookupList = response.data.result;
            vm.totals = response.data.page.totalRows;
          }
        })
        .catch(function(error) {});
    },
    //查询取消
    cancel() {
      this.judgeQuery = false;
    },
    //查询确定
    confirm() {
      this.currentPage = 1;
      this.pageSize = 10;
      this.deployLookup();
    },
    //新建
    newLookup() {
      this.titleNamea = "新建";
      this.listChild.itemCode = "";
      this.listChild.itemName = "";
      this.listChild.orderId = "";
      this.listChild.itemDesc = "";
      this.listChild.expandValue1 = "";
      this.listChild.expandValue2 = "";
      this.listChild.expandValue3 = "";
      this.listChild.expandValue4 = "";
      this.listChild.itemId = "";
      this.judgePopLookup = true;
    },
    queryLookup() {
      this.judgeQuery = true;
    },
    //修改
    edit(val) {
      this.titleNamea = "修改";
      this.listChild.itemCode = val.itemCode;
      this.listChild.itemName = val.itemName;
      this.listChild.orderId = val.orderId;
      this.listChild.itemDesc = val.itemDesc;
      this.listChild.expandValue1 = val.expandValue1;
      this.listChild.expandValue2 = val.expandValue2;
      this.listChild.expandValue3 = val.expandValue3;
      this.listChild.expandValue4 = val.expandValue4;
      this.listChild.itemId = val.itemId;
      this.judgePopLookup = true;
    },
    //删除一个
    removeOne(val) {
      this.judgeRemove = !this.judgeRemove;
      this.userIdsList = [];
      this.userIdsList.push(val);
    },
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
    },
    removeLookupChild() {
      let vm = this;
      let arr = [];
      for (let i = 0; i < this.userIdsList.length; i++) {
        let obj = {};
        obj.itemId = this.userIdsList[i].itemId;
        arr.push(obj);
      }
      let data = arr;
      api
        .post(`./manage/service/lookupitem/delete`, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.$message({
              showClose: true,
              message: "删除成功",
              type: "success"
            });
            vm.currentPage = 1;
            vm.pageSize = 10;
            vm.deployLookup();
          }
        })
        .catch(function(error) {});
    },
    //全选
    checkAll(val) {
      this.container = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.deployLookup();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.deployLookup();
    }
  }
};
</script>

<style scoped lang="less">
.deployLookup {
  .roleSetItem {
    display: flex;
    margin-right: 20px;
    span {
      width: 100px;
      line-height: 32px;
    }
  }
}
</style>
