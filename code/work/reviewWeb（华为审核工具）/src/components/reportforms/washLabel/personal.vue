<template>
  <div class="personal">
    <div style="overflow:hidden;border-bottom:1px solid #E9E9E9">
      <div style="margin:10px 0px 10px 20px;" @click="goBack" class="query">
        <i class="fa fa-refresh"></i>返回
      </div>
    </div>

    <div>
      <oneChart :chartList="chartList" :sum="sum" :dataType="dataType" />
    </div>
  </div>
</template>

<script>
import api from "@/api";

import oneChart from "./chart";

export default {
  data() {
    return {
      heightN: "",
      //总数
      sum: "",
      chartList: [],
      dataType: ""
    };
  },
  components: { oneChart },
  watch: {},
  computed: {},
  mounted() {
    this.getPersonal();
    //监听窗口大小变化;
    this.heightN = window.innerHeight - 291;
    let vm = this;
    window.onresize = function() {
      vm.heightN = window.innerHeight - 291;
    };
  },
  methods: {
    getPersonal() {
      let vm = this;
      let url;
      let data;
      if (this.$route.params.type == 1) {
        url = `./manage/service/classifyStatistics/personalStatistics`;
        this.dataType = 1;
        data = {
          reginCode: this.$route.params.id,
          lastUpdateDate: this.$route.params.s,
          endDate: this.$route.params.e
        };
      }
      if (this.$route.params.type == 2) {
        url = `./manage/service/labelStatistics/personalStatistics`;
        this.dataType = 2;
        data = {
          regioncode: this.$route.params.id,
          startDate: this.$route.params.s,
          endDate: this.$route.params.e
        };
      }
      api
        .post(url, data)
        .then(function(response) {
          if (response.status == 200) {
            vm.chartList = response.data.persons;
            vm.sum = response.data.totalProcessCount;
          }
        })
        .catch(function(error) {});
    },
    goBack() {
      if (this.$route.params.type == 1) {
        this.$router.push({
          name: "reportWash",
          params: {
            s: this.$route.params.s,
            e: this.$route.params.e
          }
        });
      } else {
        this.$router.push({
          name: "reportLabel",
          params: {
            s: this.$route.params.s,
            e: this.$route.params.e
          }
        });
      }
    }
  }
};
</script>

<style scoped lang="less">
.personal {
  width: 100%;
  height: 100%;
  .personal-top {
    padding: 20px;
    .personal-top-nameBox {
      width: 100%;
      height: 30px;
      margin-bottom: 19.5px;
      .nameBox-left {
        width: 2px;
        height: 16px;
        background: #597ef7;
        float: left;
      }
      .nameBox-right {
        float: left;
        height: 22px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        margin-left: 10px;
      }
    }
    .personal-top-query {
      width: 100%;
      height: 32px;
      .query-left {
        float: left;
        width: 70%;
        height: 100%;
        line-height: 100%;
        .query-left-name {
          height: 100%;
          line-height: 32px;
          float: left;
        }
        .query-left-form {
          float: left;
        }
      }
      .query-right {
        float: right;
        width: 30%;
        height: 30px;
        margin-top: 2px;
      }
    }
  }
  .personal-bottom {
    width: 100%;
    overflow: hidden;
    position: relative;

    padding-bottom: 15px;
    .personal-bottom-left {
      width: calc(50% - 8px);
      float: left;
      height: 100%;
      // overflow-y: auto;
    }
    .personal-bottom-divide {
      width: 16px;
      float: left;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      margin-left: calc(50% - 8px);
      background: #f0f2f5;
    }
    .personal-bottom-btoom {
      width: calc(50% - 8px);
      float: left;
      margin-left: 16px;
      height: 100%;
      overflow-y: auto;
    }
  }
}
</style>
