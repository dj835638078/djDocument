<template>
  <div class="personalInfo">
    <div class="itemList" style="margin-right: 20px;">
      <div class="itemOne">
        <span class="title">员工工号：</span>
        <span class="content">{{ personalList.fwmAccount }}</span>
      </div>
      <div class="itemOne">
        <span class="title">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 名：</span>
        <span class="content">{{ personalList.userName }}</span>
      </div>
      <div class="itemOne">
        <span class="title">性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 别：</span>
        <span class="content">{{ tools.setSex(personalList.sex) }}</span>
      </div>
      <div class="itemOne">
        <span class="title">员工岗位：</span>
        <span class="content">{{ personalList.employeeJob }}</span>
      </div>
      <div class="itemOne" v-if="!showFlag">
        <span class="title">培训班主任：</span>
        <span class="content">{{ personalList.trainingTeacher }}</span>
      </div>
      <div class="itemOne" v-if="showFlag">
        <span class="title">所属部门：</span>
        <span class="content">{{ department }}</span>
      </div>
    </div>
    <div class="itemList" style="margin-right: 20px;">
      <div class="itemOne">
        <span class="title">公司邮箱：</span>
        <span class="content" :title="personalList.email">{{
          personalList.email
        }}</span>
      </div>
      <div class="itemOne">
        <span class="title">入职时间：</span>
        <span class="content">{{
          tools.setFormTime(personalList.entryDate, 0)
        }}</span>
      </div>
      <div class="itemOne">
        <span class="title">参培时间：</span>
        <span class="content">{{
          tools.setFormTime(personalList.trainingDate, 0)
        }}</span>
      </div>
      <div class="itemOne">
        <span class="title">所属区域：</span>
        <span class="content">{{ region || personalList.regionName }}</span>
      </div>
      <div class="itemOne" v-if="showFlag">
        <span class="title">角&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 色：</span>
        <span
          class="content"
          :title="
            personalList.roleNames || tools.setRoleName(personalList.roles)
          "
          >{{
            personalList.roleNames || tools.setRoleName(personalList.roles)
          }}</span
        >
      </div>
    </div>
    <div class="itemList">
      <div class="itemOne">
        <span class="title">手机号码：</span>
        <span class="content">{{ personalList.mobileCode }}</span>
      </div>
      <div class="itemOne">
        <span class="title">QQ号码：</span>
        <span class="content">{{ personalList.qqAccount }}</span>
      </div>
      <div class="itemOne">
        <span class="title">身份证号：</span>
        <span class="content">{{ personalList.identityId }}</span>
      </div>
      <div class="itemOne">
        <span class="title">员工性质：</span>
        <span class="content">{{
          tools.setProperty(personalList.employeeNature)
        }}</span>
      </div>
      <div class="itemOne" v-if="showFlag">
        <span class="title">培训班主任：</span>
        <span class="content">{{ personalList.trainingTeacher }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      region: "",
      department: ""
    };
  },
  props: ["personalList", "showFlag"],
  watch: {
    personalList() {
      this.setRegionName();
    }
  },
  components: {},
  computed: {},
  mounted() {
    this.setRegionName();
  },
  methods: {
    setRegionName() {
      let vm = this;
      vm.api
        .get(
          "./complex/service/property/find/value?path=fwm.conf.region.region_begin_show"
        )
        .then(response => {
          if (response.status == 200) {
            let code = response.data;
            let name = code.substring(0, code.length - 4) + "Name";
            vm.region = vm.personalList[name];
            let indexFlag = 0;
            let arr = [];
            let regionArr = [
              "levelOneRegionCode",
              "levelTwoRegionCode",
              "levelThreeRegionCode",
              "levelFourRegionCode",
              "levelFiveRegionCode",
              "levelSixRegionCode",
              "levelSenvenRegionCode",
              "levelEightRegionCode",
              "levelNineRegionCode",
              "levelTenRegionCode"
            ];
            for (var i = 0; i < regionArr.length; i++) {
              if (regionArr[i] == code) {
                arr.push(vm.personalList[name]);
                indexFlag = i;
              }
              if (i > indexFlag) {
                let codeAdd = regionArr[i];
                let nameAdd = codeAdd.substring(0, codeAdd.length - 4) + "Name";
                if (vm.personalList[nameAdd]) {
                  arr.push(vm.personalList[nameAdd]);
                }
              }
            }
            if (arr.length == 1) {
              vm.department = arr.join("/");
            } else {
              vm.department = arr.slice(1).join("/");
            }
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.personalInfo {
  display: flex;
  justify-content: space-between;
  .itemList {
    flex: 1;
    .itemOne {
      display: flex;
      height: 24px;
      line-height: 24px;
      margin-top: 20px;
      .title {
        flex: 120px 0 0;
      }
      .content {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>