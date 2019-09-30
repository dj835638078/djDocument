<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="标题"
        align="left"
        width="190"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.verifyTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核员"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.fwmAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column label="班次" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-text="scope.row.verifyShift"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务来源"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="$parent.setDataName(scope.row.dataSource)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核开始时间"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.startDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="审核结束时间"
        align="left"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.endDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="verifyNum"
        label="审核数量"
        width="70"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="startNum"
        label="通过数量"
        width="70"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="stopNum"
        label="禁用数量"
        width="70"
      ></el-table-column>
      <el-table-column
        label="录入时间"
        align="left"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column label="审核截图" align="left" width="80">
        <template slot-scope="scope">
          <span
            style="color:#F5A623;cursor:pointer"
            @click="viewImgBtn(scope.row)"
            title="查看截图"
            ><img src="../../../static/img.svg"
          /></span>
        </template>
      </el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="remark"
        label="备注"
      ></el-table-column>
    </el-table>
    <ViewImg :imgUrl="imgUrl" :imgName="imgName" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import ViewImg from "../public/viewImg";
export default {
  data() {
    return {
      imgShow: false,
      imgUrl: "",
      imgName: ""
    };
  },
  computed: { ...mapState(["userList"]) },
  props: ["tableData"],
  components: { ViewImg },
  mounted() {},
  methods: {
    viewImgBtn(val) {
      this.imgName = val.verifyTitle;
      this.imgUrl =
        location.origin +
        `/complex/publicservice/file/download?fId=${val.verifyImgId}`;
      this.imgShow = true;
    }
  }
};
</script>

<style scoped lang="less">
</style>