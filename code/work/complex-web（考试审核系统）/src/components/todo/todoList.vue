<template>
  <div class="information-table">
    <div v-if="tipShow">
      <dialogTip
        :tipMessage="tipMessage"
        v-if="tipMessage"
        :tipShow="tipShow"
      />
    </div>
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column type="index" label="NO." width="50"> </el-table-column>
      <el-table-column label="操作" align="left" width="50">
        <template slot-scope="scope">
          <span style="color:#00cdca;cursor:pointer;" @click="goTodo(scope.row)"
            >审批</span
          >
        </template>
      </el-table-column>
      <el-table-column label="描述" align="left" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span v-if="scope.row.flowType == 'filing_apply'">
            <span v-if="scope.row.taskTitel.indexOf('[') != -1">
              {{ scope.row.taskTitel.split("[")[0]
              }}<span style="color:#F5A623"
                >【{{
                  tools.getDataSourceImg(
                    scope.row.taskTitel.substring(
                      scope.row.taskTitel.indexOf("[") + 1,
                      scope.row.taskTitel.lastIndexOf("]")
                    )
                  )
                }}】</span
              >{{ scope.row.taskTitel.split("]")[1] }}
            </span>
            <span v-else>{{ scope.row.taskTitel }}</span>
          </span>
          <span v-else>{{ scope.row.taskTitel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="类型" align="left">
        <template slot-scope="scope">
          {{ tools.setTodoType(scope.row.flowType) }}
        </template>
      </el-table-column>
      <el-table-column label="发起人" align="left">
        <template slot-scope="scope">
          {{ tools.setName(scope.row.applyFwmAccount) }}
        </template>
      </el-table-column>
      <el-table-column
        label="发起时间"
        align="left"
        width="150"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-text="tools.setFormTime(scope.row.createDate, 1)"></span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import dialogTip from "./DialogTip";
// import dialogTip from "../public/DialogTip";
export default {
  data() {
    return {
      tipShow: false,
      tipMessage: "",
      processResult: "",
      taskId: ""
    };
  },
  props: ["tableData"],
  components: { dialogTip },
  mounted() {},
  methods: {
    goTodo(val) {
      let vm = this;
      if (val.approveUrl == "/examinationChecked") {
        vm.$router.push({
          name: "examinationChecked",
          params: {
            testId: val.taskId,
            type: "todo"
          }
        });
      } else if (val.flowType == "appeal_deal_apply_video") {
        vm.$router.push({
          name: "todoDetailVideo",
          params: {
            taskId: val.taskId
          }
        });
      } else if (val.flowType == "filing_apply") {
        vm.$router.push({
          name: "todoDetailReport",
          params: {
            taskId: val.taskId
          }
        });
      } else if (val.flowType == "v_exchange") {
        vm.$router.push({
          name: "shiftDetail",
          params: {
            taskId: val.taskId
          }
        });
      } else if (val.flowType == "v_leave") {
        vm.$router.push({
          name: "leaveDetail",
          params: {
            taskId: val.taskId
          }
        });
      } else {
        vm.$router.push({
          name: "todoDetailImg",
          params: {
            taskId: val.taskId
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>