<template>
  <div class="approver" v-if="totalRows > 0">
    <div class="approver-box">
      <div class="approver-content">
        <div class="approver-content-title">新员工注册待审批</div>
        <ul class="approver-content-list">
          <li
            @click="goList(item)"
            class="approver-content-list-box"
            v-for="(item, index) in list"
            :key="index"
            :class="index == 5 ? '' : 'approver-border'"
          >
            <div class="approver-user-index">0{{ index + 1 }}</div>
            <div class="approver-user-name ellipsis">{{ item.userName }}</div>
            <div class="approver-user-gh ellipsis" style="width:65px;">
              {{ item.fwmAccount }}
            </div>
            <div
              class="approver-user-name ellipsis"
              style="margin-right:0px;text-align:right"
              v-text="tools.setRegion(item.regionCode)"
            ></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      totalRows: ""
    };
  },
  components: {},
  computed: {},
  mounted() {
    this.getApproverList();
  },
  methods: {
    //跳列表
    goList() {
      this.$router.push({
        name: "approval"
      });
    },
    getApproverList() {
      let data = {
        fwmAccount: ""
      };
      this.api
        .post(
          `./complex/service/fuser/findPendingApprovalPage?currentPage=1&pageSize=5`,
          data
        )
        .then(response => {
          if (response.status == 200) {
            this.list = response.data.result;
            this.totalRows = response.data.page.totalRows;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.approver {
  width: 100%;
  height: 280px;
  position: absolute;
  top: 0px;
  margin: auto;
  .approver-box {
    width: 1200px;
    height: 100%;
    margin: auto;
    position: relative;
    .approver-content {
      width: 253px;
      height: 100%;
      background: rgba(0, 0, 0, 0.28);
      position: absolute;
      right: 0px;
      z-index: 100;
      .approver-content-title {
        height: 82px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        line-height: 95px;
        font-weight: 600;
        font-size: 16px;
        color: rgba(255, 255, 255, 1);
        padding-left: 13px;
      }
      .approver-content-list {
        padding: 0px 15px;
        .approver-border {
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
        .approver-content-list-box {
          cursor: pointer;
          height: 36px;
          color: #fff;
          .approver-user-index {
            width: 18px;
            height: 18px;
            border-radius: 2px;
            border: 1px solid #fff;
            float: left;
            line-height: 18px;
            text-align: center;
            margin-top: 10px;
            margin-right: 15px;
          }
          .approver-user-name {
            width: 50px;
            height: 18px;
            font-size: 12px;
            float: left;
            margin-top: 13px;
            margin-right: 15px;
          }
          .approver-user-gh {
            width: 50px;
            height: 18px;
            font-size: 12px;
            float: left;
            margin-top: 13px;
            margin-right: 5px;
          }
        }
      }
    }
  }
}
</style>