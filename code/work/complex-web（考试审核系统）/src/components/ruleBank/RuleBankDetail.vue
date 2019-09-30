<template>
  <div class="trainDetail" :style="{ minHeight: detailHeight - 130 + 'px' }">
    <div class="detailContent">
      <div class="detailTitle">
        <div class="title" style="height:33px;">
          {{ detailInfo.ruleTitle }}
        </div>
        <div class="main approvalBtn" @click="goBack()">
          返回列表
        </div>
      </div>
      <div class="detailDes">
        <div class="infoSimpleLsft">
          <img src="../../assets/img/type.svg" />
          分类：
          <span style="color:#00cdca">{{
            tools.setRuleName(detailInfo.ruleClassify)
          }}</span>
        </div>
        <div class="infoSimple">
          <img src="../../../static/user.svg" />
          <span class="author">{{ detailInfo.ruleAuthor }}</span>
          <div class="line"></div>
          <span class="date">{{
            tools.setFormTime(detailInfo.relaseDate, 0)
          }}</span>
        </div>
        <div v-text="detailInfo.ruleDesc" class="bulletinDesc"></div>
      </div>
      <div
        class="detailInfo"
        v-html="detailInfo.ruleContent"
        style=" border-bottom: 1px solid #dcdfe6;padding-bottom:0px;line-height:10px;margin-bottom:15px;"
      ></div>
      <!-- <div class="relateCase" v-if="detailInfo.egRowkey">
        <div class="caseTitle">相关案例</div>
        <div class="caseItem">
          <span class="title">rowkey：</span>
          <span>{{ detailInfo.egRowkey }}</span>
        </div>
        <div class="caseItem">
          <span class="title">链接：</span>
          <a :href="detailInfo.egUrl" target="_blank">{{ detailInfo.egUrl }}</a>
        </div>
        <div class="caseItem caseImg">
          <span class="title imgTitle">图片：</span>
          <div class="imgBox">
            <img
              v-for="(item, index) in scrArr"
              :src="tools.downImg(item)"
              :key="index"
            />
          </div>
        </div>
      </div> -->
      <div
        class="caseTitle"
        v-if="detailInfo.itemList && detailInfo.itemList.length"
      >
        规则明细
      </div>
      <div
        class="relateCase"
        v-if="detailInfo.itemList && detailInfo.itemList.length"
        v-for="(item, index) in detailInfo.itemList"
        :key="index"
        style="border-bottom: 1px solid #dcdfe6;margin-top:20px;"
      >
        <div class="caseTitle" v-if="item.ruleContent">
          规则{{ index + 1 }}：
        </div>
        <div
          class="detailInfo"
          v-html="item.ruleContent"
          v-if="item.ruleContent"
        ></div>
        <div v-if="!item.egRowkey && !item.egUrl && !item.egImgId"></div>
        <div class="caseTitle" v-else>案例{{ index + 1 }}：</div>
        <div class="caseItem" v-if="item.egRowkey">
          <span class="title">rowkey：</span>
          <span>{{ item.egRowkey }}</span>
        </div>
        <div class="caseItem" v-if="item.egUrl">
          <span class="title">链接：</span>
          <a :href="item.egUrl" target="_blank">{{ item.egUrl }}</a>
        </div>
        <div class="caseItem caseImg" v-if="item.egImgId">
          <span class="title imgTitle">图片：</span>
          <div class="imgBox" v-if="item.egImgId">
            <img
              v-for="(itemA, indexA) in item.egImgId.split(',')"
              :src="tools.downImg(itemA)"
              :key="indexA"
            />
          </div>
        </div>
        <!--v-if="item.egVideoUrl" -->
        <div class="caseItem caseImg" v-if="item.egVideoUrl">
          <span class="title imgTitle">附件：</span>
          <div class="imgBox" v-if="item.egVideoUrl">
            <video
              style="width:100%;"
              controls="controls"
              :src="item.egVideoUrl"
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      detailInfo: {},
      scrArr: []
    };
  },
  computed: { ...mapState(["detailHeight"]) },
  mounted() {
    this.getInfo();
  },
  methods: {
    // 返回列表
    goBack() {
      this.$router.go(-1); //返回上一层
    },
    getInfo() {
      let vm = this;
      vm.api
        .get(
          `./complex/service/rule/findInfo?ruleId=${vm.$route.params.ruleId}`
        )
        .then(response => {
          if (response.status == 200) {
            vm.detailInfo = response.data;
            window.scrollTo(0, 0);
            // if (vm.detailInfo.egImgId) {
            //   vm.scrArr = vm.detailInfo.egImgId.split(",");
            // }
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style scoped lang="less">
.detailContent /deep/ img {
  max-width: 866px;
}
.trainDetail {
  padding: 10px 0 100px 20px;
  display: flex;
  justify-content: center;
  .detailContent {
    width: 866px;
    display: inline-block;
    padding-top: 10px;
    .detailTitle {
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 33px;
      margin-bottom: 20px;
      position: relative;
      .approvalBtn {
        position: absolute;
        right: 0;
        top: 5px;
      }
      .title {
        padding-right: 70px;
      }
    }
    .detailDes {
      .infoSimpleLsft {
        height: 20px;
        line-height: 20px;
      }
      .infoSimple {
        float: right;
        position: relative;
        top: -27px;
      }
      img {
        margin-bottom: 2px;
      }
      .author {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(42, 42, 42, 1);
        line-height: 20px;
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 12px;
        background: rgba(155, 155, 155, 1);
        margin: 0 20px;
      }
      .date {
        color: rgba(155, 155, 155, 1);
      }
      .bulletinDesc {
        color: #9b9b9b;
        margin-top: 10px;
        line-height: 28px;
      }
    }
    .detailInfo {
      margin-top: 15px;
      margin-bottom: 30px;
      line-height: 28px;
    }
    .caseTitle {
      font-size: 20px;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 28px;
      //padding-bottom: 20px;
    }
    .relateCase {
      .caseItem {
        margin: 25px 0;
        display: flex;
        span {
          display: inline-block;
        }
        .title {
          width: 80px;
        }
        a {
          color: #00cdca;
        }
      }
      .caseImg {
        display: flex;
        //border-bottom: 1px solid #dcdfe6;
        padding-bottom: 25px;
        box-sizing: border-box;
        .imgTitle {
          flex: 0 0 80px;
        }
        .imgBox {
          flex: 1;
          img {
            width: 100%;
            height: 304px;
            margin-bottom: 18px;
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>