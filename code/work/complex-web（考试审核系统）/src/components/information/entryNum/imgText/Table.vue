<template>
  <div class="information-table">
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column
        label="标题"
        align="left"
        width="120"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.checkTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检员"
        align="left"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setName(scope.row.checkAccount)"></span>
        </template>
      </el-table-column>
      <el-table-column label="来源" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-text="$parent.setDataName(scope.row.dataSource)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检开始时间"
        width="140"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.startDate, 1)"></span>
        </template>
      </el-table-column>
      <el-table-column
        label="质检结束时间"
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
        prop="checkNum"
        label="质检数量"
        width="70"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="passNum"
        label="通过数量"
        width="70"
      ></el-table-column>
      <el-table-column
        :show-overflow-tooltip="true"
        prop="nopassNum"
        label="不通过数量"
        width="90"
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
      <el-table-column label="质检截图" align="left" width="80">
        <template slot-scope="scope">
          <span
            v-if="scope.row.imgFid"
            style="color:#F5A623;cursor:pointer"
            @click="viewImgBtn(scope.row)"
            title="查看截图"
          >
            <img src="../../../../../static/img.svg" />
          </span>
          <span v-else>-</span>
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
import ViewImg from "../../../public/viewImg";
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
      this.imgName = val.checkTitle;
      this.imgUrl =
        location.origin +
        `/complex/publicservice/file/download?fId=${val.imgFid}`;
      this.imgShow = true;
    }
  }
};
</script>

<style scoped lang="less">
</style>