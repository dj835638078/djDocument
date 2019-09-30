<template>
  <div
    :class="[
      $route.name == 'todoDetailReport' ? 'informationAddContentAdd' : '',
      'informationAddContent'
    ]"
  >
    <el-form>
      <div class="basicInfo">
        <div class="groupTitle">基本信息</div>
        <div class="itemGroup">
          <span class="title">审核来源：</span>
          <div class="content">
            {{ tools.getDataSourceImg(detailObj.dataSource) }}
          </div>
        </div>
        <div class="itemGroup">
          <span class="title">rowkey：</span>
          <div class="content">{{ detailObj.rowkey }}</div>
        </div>
        <div class="itemGroup">
          <span class="title">报备理由：</span>
          <div class="content">{{ detailObj.filingReason }}</div>
        </div>
        <div class="itemGroup">
          <span class="title">文章标题：</span>
          <div class="content">{{ detailObj.articleTitle }}</div>
        </div>
        <div class="itemGroup articlecontent">
          <span class="title">文章正文：</span>
          <div class="content" v-html="detailObj.articleContent"></div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["detailObj"],
  components: {},
  computed: {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="less">
.articlecontent /deep/ strong {
  font-weight: 600;
}
.articlecontent /deep/ em {
  font-style: oblique;
}
.articlecontent /deep/ u {
  text-decoration: underline;
}
.articlecontent /deep/ s {
  text-decoration: line-through;
}
.articlecontent /deep/ ol {
  padding-left: 40px;
  list-style-type: decimal;
}
.articlecontent /deep/ ul {
  padding-left: 40px;
  list-style: initial;
}
.articlecontent /deep/ menu {
  padding-left: 40px;
  list-style: initial;
}
.articlecontent /deep/ h1 {
  font-weight: normal;
  font-size: 2em;
}
.articlecontent /deep/ h2 {
  font-weight: normal;
  font-size: 1.5em;
}
.articlecontent /deep/ h3 {
  font-weight: normal;
  font-size: 1.17em;
}
.articlecontent /deep/ h4 {
  font-weight: normal;
  font-size: 1em;
}
.articlecontent /deep/ h5 {
  font-weight: normal;
  font-size: 0.83em;
}
.articlecontent /deep/ h6 {
  font-weight: normal;
  font-size: 0.67em;
}
.articlecontent /deep/ pre.ql-syntax {
  background-color: #23241f;
  color: #f8f8f2;
  overflow: visible;
}
.articlecontent /deep/ blockquote {
  border-left: 4px solid #ccc;
  margin-bottom: 5px;
  margin-top: 5px;
  padding-left: 16px;
}
.articlecontent /deep/ .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 3em;
}
.articlecontent /deep/ .ql-indent-2:not(.ql-direction-rtl) {
  padding-left: 6em;
}
.articlecontent /deep/ .ql-indent-3:not(.ql-direction-rtl) {
  padding-left: 9em;
}
.articlecontent /deep/ .ql-indent-4:not(.ql-direction-rtl) {
  padding-left: 12em;
}
.articlecontent /deep/ .ql-indent-5:not(.ql-direction-rtl) {
  padding-left: 15em;
}
.articlecontent /deep/ .ql-indent-6:not(.ql-direction-rtl) {
  padding-left: 18em;
}
.articlecontent /deep/ .ql-indent-7:not(.ql-direction-rtl) {
  padding-left: 21em;
}
.articlecontent /deep/ .ql-indent-8:not(.ql-direction-rtl) {
  padding-left: 24em;
}
.articlecontent /deep/ .ql-align-right {
  text-align: right;
}
.articlecontent /deep/ .ql-direction-rtl {
  direction: rtl;
  text-align: inherit;
}
.articlecontent /deep/ .ql-size-large {
  font-size: 1.5em;
}
.articlecontent /deep/ .ql-size-small {
  font-size: 0.75em;
}
.articlecontent /deep/ .ql-size-huge {
  font-size: 2.5em;
}
.articlecontent /deep/ .ql-font-serif {
  font-family: Georgia, Times New Roman, serif;
}
.articlecontent /deep/ .ql-font-monospace {
  font-family: Monaco, Courier New, monospace;
}
.articlecontent /deep/ .ql-align-center {
  text-align: center;
}
.articlecontent /deep/ .ql-align-right {
  text-align: right;
}
.articlecontent /deep/ .ql-align-justify {
  text-align: justify;
}
.informationAddContentAdd {
  padding-bottom: 60px;
}
.informationAddContent {
  .el-form {
    margin-top: 5px;
    .groupTitle {
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      line-height: 22px;
      margin: 0px 0 15px 0;
    }
    .itemGroup {
      position: relative;
      margin-bottom: 25px;
      display: flex;
      .title {
        flex: 0 0 120px;
      }
      .content {
        padding-right: 10px;
        height: auto;
        width: 1080px;
        line-height: 20px;
        word-break: break-all;
        flex: 1;
      }
    }
  }
}
</style>