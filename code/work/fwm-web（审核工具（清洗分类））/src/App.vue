<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    function checkIE() {
      return (
        "-ms-scroll-limit" in document.documentElement.style &&
        "-ms-ime-align" in document.documentElement.style
      );
    }
    if (checkIE()) {
      window.addEventListener(
        "hashchange",
        () => {
          var currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        },
        false
      );
    }
  }
};
</script>
<style lang="less">
.el-picker-panel /deep/ .el-time-panel__content::after,
.el-time-panel__content::before {
  border-top: 1px solid #3f4457b3 !important;
  border-bottom: 1px solid #3f4457b3 !important;
}
html,
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
  min-width: 1200px;
}

#app /deep/ .el-table__header {
  th {
    background: #f5f7fa;
  }
}
.el-tooltip__popper {
  max-width: 80% !important;
}
#app {
  input::-webkit-input-placeholder {
    color: #d2c9cc;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "å¾®è½¯é›…é»‘", Arial, sans-serif !important;
  }
  textarea::-webkit-input-placeholder {
    color: #d2c9cc;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "å¾®è½¯é›…é»‘", Arial, sans-serif !important;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    //ie10+ input和textarea
    color: #999 !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "å¾®è½¯é›…é»‘", Arial, sans-serif !important;
  }

  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #999 !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "å¾®è½¯é›…é»‘", Arial, sans-serif !important;
  }

  input:-moz-placeholder,
  textarea:-moz-placeholder {
    color: #999 !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "å¾®è½¯é›…é»‘", Arial, sans-serif !important;
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: #999 !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "å¾®è½¯é›…é»‘", Arial, sans-serif !important;
  }

  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #999 !important;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", "å¾®è½¯é›…é»‘", Arial, sans-serif !important;
  }

  height: 100%;
  min-width: 1200px;
  overflow-x: hidden;
  //三个点超出隐藏
  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  //清浮动
  .clear {
    clear: both;
  }
  //弹性盒子，横排均分
  .flex-container {
    display: -webkit-flex;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  //导航标签
  //新建，查询，删除，启用，禁用，
  .new,
  .query,
  .start,
  .delete,
  .prohibit,
  .release,
  .blank,
  .newBlank,
  .commonly {
    float: left;
    margin-bottom: 10px;
    width: 72px;
    height: 28px;
    border-radius: 2px;
    color: #ffffff;
    text-align: center;
    line-height: 28px;
    font-size: 14px;
    cursor: pointer;
    margin-right: 6px;
    i {
      margin-right: 5px;
    }
  }
  .new {
    background: #597ef7;
  }
  .query {
    background: #597ef7;
  }
  .start {
    background: #67c23a;
  }
  .delete {
    background: #f56c6c;
  }
  .prohibit {
    background: #f5a623;
  }
  .commonly {
    background: rgba(240, 242, 245, 1);
    color: rgba(0, 0, 0, 0.65);
  }
  .newBlank {
    background: #597ef7;
    border: 1px solid #d9d9d9;
  }
  .blank {
    background: #fff;
    border: 1px solid #d9d9d9;
    color: rgba(0, 0, 0, 0.65);
  }
  .release {
    background: #d9d9d9;
    cursor: not-allowed;
  }
  //下载
  .downloadIcon {
    text-align: center;
    font-size: 14px;
    cursor: pointer;
    height: 100%;
    width: 20px;
  }
  .tabBox {
    padding-left: 24px;
    position: relative;
    .tabBottom {
      width: 24px;
      border-bottom: 2px solid #e4e7ed;
      position: absolute;
      left: 0;
      top: 38px;
    }
  }
  .btn-box {
    overflow: hidden;
    padding-left: 24px;
  }
  //#597ef7
  //配置
  .settingCol {
    color: #f5a623;
  }
  //修改
  .editCol {
    color: #1890ff;
  }
  //删除
  .deleteCol {
    color: #f56c6c;
  }
  .el-pager {
    .active {
      background: #597ef7;
    }
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #597ef7;
  }
  .el-tabs__item.is-active {
    color: #597ef7;
  }
  .el-tabs__active-bar {
    background: #597ef7;
  }
  .editCol,
  .settingCol,
  .deleteCol {
    float: left;
    font-size: 14px;
    width: 22px;
    cursor: pointer;
  }
  .paging-box {
    overflow: hidden;
    background: #ffffff;
    .block {
      float: right;
      margin: 10px 10px 10px 0;
      overflow: hidden;
      .el-input__inner {
        margin-top: -4px;
        line-height: 25px;
      }
    }
  }
  tr {
    height: 40px;
  }
  .el-input__inner {
    line-height: 28px;
  }
  .box-btn {
    width: 100%;
    margin-top: 20px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .search-box-top-name {
    float: left;
    width: 80px;
    margin-left: 25px;
    height: 32px;
    line-height: 32px;
    span {
      color: red;
    }
  }
  .search-box-one {
    overflow: hidden;
    .search-box-top {
      width: 70%;
      float: left;
      .search-box-top-right {
        float: left;
        width: calc(100% - 105px);
        .one-box {
          float: left;
          width: 33%;
          .one-box-child {
            width: 94%;
            margin-right: 6%;
            .el-select {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .search-box-right {
    overflow: hidden;
    width: 200px;
    height: 28px;
    float: right;
    margin-top: 2px;
    div {
      float: right !important;
    }
  }
  .search-box-two {
    margin-top: 20px;
    width: 70%;
    .box-two {
      width: calc(100% - 105px);
      float: left;
      position: relative;
      .two-one-box {
        float: left;
        width: 33%;
        .box-two-child {
          width: 94%;
          float: left;

          .el-date-editor {
            width: 100%;
          }
        }
        .Pul {
          float: left;
          height: 32px;
          line-height: 32px;
          width: 6%;
          text-align: center;
          color: gray;
        }
      }
    }
  }
  .search-box-two-right-name {
    width: 80px;
    float: left;
    text-align: center;
    line-height: 32px;
    line-height: 32px;
  }
  .dopeOne,
  .dopeTwo {
    position: absolute;
    top: 5px;
    border-radius: 50%;
    height: 18px;
    text-align: center;
    line-height: 18px;
    color: #ffffff;
    min-width: 18px;
    font-size: 12px;
  }
  .dopeOne {
    left: 80px;
    background: #67c23a;
  }
  .dopeTwo {
    left: 177px;
    background: #f5222d;
  }
  .activeColorY {
    color: #67c23a;
  }
  .activeColorN {
    color: #f5222d;
  }
  .textHeadColor {
    color: rgba(0, 0, 0, 0.35);
  }
  .words-box {
    width: 100%;
    overflow: hidden;
    padding-bottom: 20px;
    position: relative;
    .words-box-name {
      float: left;
      line-height: 32px;
      margin-right: 15px;
      width: 76px;
      text-align: right;
      span {
        color: red;
      }
    }
    .words-box-content {
      float: left;
      width: 240px;
      .el-select {
        width: 100%;
      }
      .color-box {
        width: 48px;
        height: 18px;
        background: #ffec00;
        float: left;
        margin-right: 12px;
        margin-top: 8px;
      }
      .el-textarea__inner {
        min-height: 80px !important;
      }
    }
  }
  //分割线
  .divide {
    width: 100%;
    height: 16px;
    background: #f0f2f5;
  }
  //搜索栏样式
  .infoHeadSearch .el-form-item__label {
    flex: 0 0 80px;
  }
  .content .el-form-item__content {
    width: 75%;
    .el-select {
      width: 100%;
    }
  }
  .timeCheck .el-form-item__content {
    width: 100%;
    flex: 1;
    display: flex;
    .el-date-editor {
      flex: 1;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: auto;
    }
  }
  .btnBox .el-form-item__content {
    width: 100%;
    flex: 1;
    display: flex;
    .flexlayout {
      flex: 1;
    }
  }
  .infoHeadSearch {
    margin-bottom: 14px;
    .el-form {
      display: flex;
      width: 100%;
      .el-form-item {
        // flex: 1;
        // width: 40%;
        display: flex;

        .line {
          margin: 0 10px;
        }
      }
      .el-form-item:first-child {
        width: 35%;
      }
      .el-form-item:last-child {
        width: 65%;
      }
      .btnlist {
        display: flex;
        justify-content: flex-end;
        .resetBtn {
          margin-right: 0 !important;
        }
      }
      .el-form-item--small.el-form-item {
        margin-bottom: 13px;
      }
    }
  }
  .directorTable {
    overflow: hidden;
    .table-box {
      width: 100%;
      overflow: hidden;

      .table-box-content {
        padding: 0 26px;
      }
    }
  }
  .table-box-title {
    height: 79px;
    .table-box-title-name {
      height: 79px;
      float: left;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 51px;
      margin-left: 20px;
    }
    .table-box-title-num {
      padding-left: 10px;
      margin-top: 23px;
      float: right;
      margin-right: 26px;
      height: 46px;
      border-left: 2px solid #5675f5;
      .table-box-title-num-top {
        font-size: 12px;
        margin-top: 3px;
        color: rgba(0, 0, 0, 0.65);
        font-size: 14px;
        font-weight: 600;
      }
      .table-box-title-num-bottom {
        font-weight: bold;
        font-size: 28px;
        color: #5675f5;
        margin-top: 6px;
      }
    }
  }
  .space {
    width: 20px;
    height: 32px;
    float: left;
    line-height: 32px;
    text-align: center;
  }
  .btnShow {
    float: left;
    font-size: 12px;
    color: #5675f5;
    line-height: 32px;
    cursor: pointer;
    i {
      margin-left: 8px;
    }
  }
  .fadeBox {
    position: absolute;
    width: 100%;
    height: calc(100% - 54px);
    top: 54px;
    background: #fff;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.65);
  }
  .titleInfo {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.85);
    margin: 0 25px 20px 0;
    position: relative;
    .line {
      width: 2px;
      height: 16px;
      background: rgba(89, 126, 247, 1);
      position: absolute;
    }
    .title {
      margin-left: 10px;
    }
    .downLoad {
      margin-left: 15px;
      cursor: pointer;
      color: #597ef7;
      i {
        margin-right: 8px;
      }
    }
  }
  .dailyRecord {
    margin: 12px 25px 0 24px;
    border-top: 1px solid #e9e9e9;
    padding-top: 20px;
    .recordBox {
      .recordImg {
        font-size: 22px;
        color: #597ef7;
        margin-bottom: 15px;
        position: relative;
        i {
          margin-left: -1px;
        }
        .line {
          width: 2px;
          height: 100%;
          left: 4px;
          bottom: -21px;
          background: #f0f2f5;
          position: absolute;
        }
      }
      .recordItem {
        position: relative;
        height: 34px;
        .recordPoint {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #597ef7;
          border-radius: 50%;
          .line {
            width: 2px;
            height: 100%;
            left: 4px;
            top: 12px;
            background: #f0f2f5;
            position: absolute;
          }
        }
        .recordData {
          color: rgba(0, 0, 0, 0.45);
          margin: 0 15px;
        }
        .recordOperat {
          // color: #597ef7;
        }
      }
    }
  }
}
</style>
