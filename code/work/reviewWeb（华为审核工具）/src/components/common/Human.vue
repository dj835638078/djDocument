
<template>
  <!-- requiredFlag:设置必填标识 //不要了
       labelName：设置label名称 //不要了
       setHumanValue： 调用setHumanValue方法设置input值 -->
  <div class="human">
    <!-- <el-form-item
      label="区域管理员"
      :required="true"
    > -->
    <div class="inputHuman">
      <!-- <span class="labelName"><span
          v-if="requiredFlag"
          style="color:red"
        >*</span>{{labelName}}：</span> -->
      <el-input
        v-model="humanAccountName"
        placeholder="请输入后回车搜索"
        @keyup.enter.native="inputEnter"
        @blur="blurInput"
        @clear="clearInput"
        :disabled="disabledFlag"
        clearable
      ></el-input>
      <i class="fa fa-user humanIcon"></i>
      <i class="borderIcon"></i>
      <ul class="humanBody" v-if="humanFlag">
        <template v-if="humanArr && humanArr.length > 0">
          <li
            class="ellipsis"
            v-for="(item, index) in humanArr"
            :key="index"
            @click="humanClick"
          >
            {{ item }}
          </li>
        </template>

        <li v-else class="noData">暂无数据</li>
      </ul>
    </div>
    <!-- </el-form-item> -->
  </div>
</template>

<script>
export default {
  name: "human",
  props: ["val", "showYN", "result", "roleDiff", "disabledFlag"],
  data() {
    return {
      humanAccount: "",
      humanAccountName: "",
      humanArr: [],
      humanFlag: false,
      url: "",
      userRole: ""
    };
  },
  watch: {
    //判断是否重置
    result() {
      if (!this.showYN) {
        this.humanAccountName = "";
        this.$parent[this.val] = "";
      }
    },
    humanAccountName() {
      if (!this.humanAccountName) {
        this.$parent[this.val] = "";
      }
    }
  },
  methods: {
    inputEnter() {
      if (!this.humanAccountName) {
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
      if (vm.tools.setRoles("projectManagerA")) {
        vm.userRole = "clientA";
      }
      if (vm.tools.setRoles("clientA")) {
        vm.userRole = "projectManagerA";
      }
      vm.url = `./manage/service/usermanage/blur?searchInfo=${window.encodeURI(
        window.encodeURI(vm.humanAccountName)
      )}`;
      if (vm.roleDiff) {
        vm.url = `./manage/service/pcommon/rolename?rolename=${
          vm.userRole
        }&searchInfo=${window.encodeURI(
          window.encodeURI(vm.humanAccountName)
        )}`;
      }
      vm.api
        .get(vm.url)
        .then(function(response) {
          if (response.status == 200) {
            let data = response.data;

            if (data && data.length == 1) {
              vm.humanAccount = data[0].fwmAccount;
              vm.humanAccountName = data[0].userName;
              vm.humanFlag = false;
              vm.$parent[vm.val] = vm.humanAccount;
              //vm.$parent.setHumanValue(this.humanAccount);
              return;
            }
            for (var i = 0; i < data.length; i++) {
              vm.humanArr.push(data[i].fwmAccount + " " + data[i].userName);
            }
            vm.humanFlag = true;
          }
        })
        .catch(function(error) {});
    },
    humanClick(data) {
      this.humanAccount = data.target.innerText.split(" ")[0];
      this.humanAccountName = data.target.innerText.split(" ")[1];
      this.humanFlag = false;
      this.$parent[this.val] = this.humanAccount;
      //this.$parent.setHumanValue(this.humanAccount);
    }
  },
  components: {},
  computed: {},
  mounted() {}
};
</script>

<style scoped lang="less">
.inputHuman /deep/ input {
  padding-left: 40px !important;
}
.inputHuman /deep/ .el-form-item__label {
  width: 100px !important;
}
.human {
  .inputHuman {
    margin-bottom: 14px;
    height: 28px;
    display: flex;
    position: relative;
    // .labelName {
    //   // width: 120px;
    //   flex: 0 0 90px;
    //   margin-top: 10px;
    // }
    .el-input {
      flex: 1;
    }
    .humanIcon {
      color: #096dd9;
      position: absolute;
      top: 8px;
      left: 10px;
      padding-right: 8px;
      font-size: 18px;
    }
    .borderIcon {
      position: absolute;
      border-right: 1px solid #dcdfe6;
      height: 30px;
      top: 1px;
      left: 30px;
    }
    .humanBody {
      position: absolute;
      top: 38px;
      box-sizing: border-box;
      border-radius: 5px;
      padding: 0 10px;
      width: 100%;
      z-index: 10000;
      right: 0;
      width: 100%;
      border: 1px solid #dcdfe6;
      background: #fff;
      max-height: 200px;
      overflow-y: auto;
      li {
        cursor: pointer;
        height: 30px;
        line-height: 30px;
      }
      .noData {
        text-align: center;
        color: #999;
        font-size: 14px;
      }
    }
  }
}
</style>
