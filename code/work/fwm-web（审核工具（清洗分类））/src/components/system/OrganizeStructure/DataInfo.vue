<template>
  <div class="dataInfo">
    <div class="infoHeadText">详细信息</div>
    <div class="infoContent">
      <el-form
        ref="form"
        :model="listContent"
        label-width="95px"
      >
        <el-form-item
          label="区域编码"
          :required="true"
        >
          <el-input
            v-model="listContent.regioncode"
            :disabled="nameFlag"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="区域名称"
          :required="true"
        >
          <el-input v-model="listContent.regionName"></el-input>
        </el-form-item>
        <el-form-item label="区域等级">
          <el-input
            v-model="listContent.regionLevel"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="父区域编号">
          <el-input
            v-model="listContent.parentcode"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="区域管理员"
          :required="true"
          class="inputHuman"
        >
          <el-input
            v-model="listContent.fwmAccountName"
            @keyup.enter.native="inputEnter"
            @blur="blurInput"
            @clear="clearInput"
            clearable
            :disabled="listContent.regionLevel == 1 ? true : false"
          ></el-input>
          <i class="fa fa-user humanIcon"></i>
          <i class="borderIcon"></i>
          <ul
            class="humanBody"
            v-if="humanFlag"
          >
            <template v-if="humanArr&&humanArr.length > 0">
              <li
                v-for="(item, index) in humanArr"
                :key="index"
                @click="humanClick"
              >{{item}}</li>
            </template>
            <li v-else>暂无数据</li>
          </ul>
        </el-form-item>
        <!-- <el-form-item label="区域状态">
          <el-select
            v-model="listContent.regionStatus"
            placeholder="请选择区域状态"
          >
            <el-option
              v-for="(item,index) in lookUp.REGION_STATUS"
              :label="item.itemName"
              :value="item.itemCode"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域状态">
          <el-input
            v-model="listContent.regionStatus"
            :disabled="nameFlag"
          ></el-input>
        </el-form-item> -->
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "dataInfo",
  props: ["listContent", "nameFlag"],
  data() {
    return {
      form: {
        regioncode: "",
        regionName: "",
        regionLevel: "",
        parentcode: "",
        fwmAccount: "",
        fwmAccountName: "",
        regionStatus: ""
      },
      humanArr: [],
      humanFlag: false
    };
  },
  methods: {
    //弹出框确定按钮
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    inputEnter() {
      if (!this.listContent.fwmAccountName) {
        this.humanFlag = true;
        this.humanArr = [];
        return;
      }
      this.queryHuman();
    },
    //input失去焦点事件
    blurInput() {
      setTimeout(() => {
        this.humanFlag = false;
        this.humanArr = [];
      }, 500);
    },
    //input清除事件
    clearInput() {
      this.humanFlag = false;
      this.humanArr = [];
    },

    //input人员控件数据查询
    queryHuman() {
      let vm = this;
      vm.humanArr = [];
      let arr = [];
      vm.api
        .get(
          `./manage/service/usermanage/blur?searchInfo=${
            vm.listContent.fwmAccountName
          }`
        )
        .then(function(response) {
          if (response.status == 200) {
            let data = response.data;
            for (var i = 0; i < data.length; i++) {
              vm.humanArr.push(data[i].fwmAccount + " " + data[i].userName);
            }
            vm.humanFlag = true;
          }
        })
        .catch(function(error) {});
    },
    humanClick(data, event) {
      this.listContent.fwmAccount = data.target.innerText.split(" ")[0];
      this.listContent.fwmAccountName = data.target.innerText.split(" ")[1];
      this.humanFlag = false;
    }
  },
  components: {},
  computed: {
    ...mapState(["lookUp"])
  },
  watch: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.textAreaStyle /deep/ textarea {
  min-height: 70px !important;
}
.inputHuman /deep/ input {
  padding-left: 40px !important;
}
.dataInfo {
  width: 49%;
  height: calc(100%-38px);
  box-sizing: border-box;
  border: 1px solid rgba(232, 232, 232, 1);
  background: #fff;
  overflow-y: auto;
  overflow-x: hidden;
  .infoHeadText {
    text-align: left;
    height: 42px;
    line-height: 42px;
    font-size: 16px;
    font-weight: 900;
    color: #096dd9;
    padding-left: 24px;
    border-bottom: 1px solid rgba(232, 232, 232, 1);
  }
  .infoContent {
    .inputUnique {
      margin-bottom: 48px !important;
    }
    .el-input {
      width: 100%;
      margin-right: 40px;
    }
    .el-autocomplete {
      width: 100%;
      margin-right: 40px;
      input {
        padding-left: 30px !important;
      }
    }
    .el-form-item {
      margin-bottom: 14px;
      height: 28px;
      position: relative;
      .humanIcon {
        color: #096dd9;
        position: absolute;
        top: 10px;
        left: 10px;
        padding-right: 8px;
        font-size: 18px;
      }
      .borderIcon {
        position: absolute;
        border-right: 1px solid #dcdfe6;
        height: 32px;
        top: 2px;
        left: 32px;
      }
      .humanBody {
        position: absolute;
        top: 40px;
        box-sizing: border-box;
        border-radius: 5px;
        padding: 0 10px;
        width: 100%;
        max-height: 200px;
        overflow-y: auto;
        border: 1px solid #dcdfe6;
        li {
          cursor: pointer;
        }
      }
    }
    .textAreaStyle {
      textarea {
        height: 100px !important;
      }
    }
    padding: 10px;
    .el-select {
      width: 100%;
    }
  }
}
</style>
