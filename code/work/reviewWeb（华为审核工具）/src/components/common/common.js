import store from '../../store/store'
export default {
  //树结构数据组装
  toTreeData: (data, attr) => {
    let tree = [];
    let resData = data;
    let checked = [];
    for (let i = 0; i < resData.length; i++) {
      if (resData[i].checked) {
        checked.push(resData[i].id);
      }
      if (resData[i].pId == attr.rootId) {
        // let obj = {
        //   id: resData[i][attr.id],
        //   label: resData[i][attr.name],
        //   children: []
        // };
        let obj = Object.assign({}, resData[i]);
        obj.label = resData[i].name;
        // obj.className = "fa fa-folder-open-o tree-icon-yellow";
        obj.children = [];
        tree.push(obj);
        resData.splice(i, 1);
        i--;
      }
    }
    let run = function (treeArrs) {
      if (resData.length > 0) {
        for (let i = 0; i < treeArrs.length; i++) {
          for (let j = 0; j < resData.length; j++) {
            if (treeArrs[i].id === resData[j][attr.pId]) {
              // let obj = {
              //   id: resData[j][attr.id],
              //   label: resData[j][attr.name],
              //   children: []
              // };
              let index = checked.indexOf(treeArrs[i].id);
              if (index > -1) {
                checked.splice(index, 1);
              }
              resData[j].className = "fa fa-file-text-o tree-icon-blue";
              let obj = Object.assign({}, resData[j]);
              obj.label = resData[j].name;
              obj.children = [];
              treeArrs[i].children.push(obj);
              resData.splice(j, 1);
              j--;
            }
          }
          if (treeArrs[i].children.length) {
            treeArrs[i].className = "fa fa-folder-open-o tree-icon-yellow";
          } else {
            treeArrs[i].className = "fa fa-file-text-o tree-icon-blue";
          }
          run(treeArrs[i].children);
        }
      }
    };
    run(tree);
    tree.checkedFlag = checked;
    return tree;
  },
  //组织架构管理树结构数据组装
  toTreeDataOrg: (data, attr, type) => {
    let tree = [];
    let resData = data;
    for (let i = 0; i < resData.length; i++) {
      if (!resData[i].parentcode) {
        let obj = Object.assign({}, resData[i]);
        obj.label = resData[i].regionName;
        obj.id = resData[i].regioncode;
        obj.children = [];
        tree.push(obj);
        resData.splice(i, 1);
        i--;
      }
    }
    let run = function (treeArrs) {
      if (resData.length > 0) {
        for (let i = 0; i < treeArrs.length; i++) {
          for (let j = 0; j < resData.length; j++) {
            if (treeArrs[i].regioncode === resData[j][attr.parentcode]) {
              resData[j].className = "fa fa-file-text-o tree-icon-blue";
              let obj = Object.assign({}, resData[j]);
              obj.label = resData[j].regionName;
              obj.id = resData[j].regioncode;
              obj.children = [];
              treeArrs[i].children.push(obj);
              resData.splice(j, 1);
              j--;
            }
          }
          if (treeArrs[i].children.length) {
            if (type == 1) {
              treeArrs[i].className = "fa fa-sitemap tree-icon-yellow";
            } else {
              treeArrs[i].className = "fa fa-folder-open-o tree-icon-yellow";
            }

          } else {
            if (type == 1) {
              treeArrs[i].className = "fa fa-users tree-icon-blue";
            } else {
              treeArrs[i].className = "fa fa-file-text-o tree-icon-blue";
            }
          }
          run(treeArrs[i].children);
        }
      }
    };
    run(tree);
    return tree;
  },
  //设置时间日期
  setFormTime: (val, type) => {
    if (val) {
      var date = new Date(val);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      if (type == 1) {
        return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second;
      } else {
        return y + "-" + m + "-" + d
      }

    } else {
      return ""
    }
  },
  //设置时分秒
  setTimeFormat(value) {
    if (value) {
      var second = parseInt(value); // 秒
      var min = 0; // 分
      var hour = 0; // 小时
      if (second > 60) {
        min = parseInt(second / 60);
        second = parseInt(second % 60);
        if (min > 60) {
          hour = parseInt(min / 60);
          min = parseInt(min % 60);
        }
      }
      var result = "" + parseInt(second) + "秒";
      if (min > 0) {
        result = "" + parseInt(min) + "分" + result;
      }
      if (hour > 0) {
        result = "" + parseInt(hour) + "小时" + result;
      }
      return result;
    }
  },
  //设置角色名称
  setRole: (data) => {
    if (data) {
      if (JSON.stringify(store.state.useMap).indexOf(data) > -1) {
        for (var key in store.state.useMap) {
          if (data == key) {
            return store.state.useMap[key]
          }
        }
      } else {
        return data
      }
    }
  },
  //设置身份证
  setPaper: (name) => {
    if (name) {
      for (var key in store.state.lookUp.USER_IDENTITY_TYPE) {
        if (name == store.state.lookUp.USER_IDENTITY_TYPE[key].itemCode) {
          return store.state.lookUp.USER_IDENTITY_TYPE[key].itemName
        }
      }
    }
  },
  //设置渠道状态
  setChannelState: (name) => {
    if (name) {
      for (var key in store.state.lookUp.FWM_FLOW_STATUS) {
        if (name == store.state.lookUp.FWM_FLOW_STATUS[key].itemCode) {
          return store.state.lookUp.FWM_FLOW_STATUS[key].itemName
        }
      }
    }
  },
  //状态pass、fail
  setStatus: (data) => {
    if (data) {
      for (var key in store.state.lookUp.TASK_APPROVAL_RESULT) {
        if (data == store.state.lookUp.TASK_APPROVAL_RESULT[key].itemCode) {
          return store.state.lookUp.TASK_APPROVAL_RESULT[key].itemName
        }
      }
    } else {
      return ''
    }
  },
  //反馈状态pass、fail
  setStatusB: (data) => {
    if (data) {
      for (var key in store.state.lookUp.TASK_APPEAL_RESULT) {
        if (data == store.state.lookUp.TASK_APPEAL_RESULT[key].itemCode) {
          return store.state.lookUp.TASK_APPEAL_RESULT[key].itemName
        }
      }
    } else {
      return ''
    }
  },
  //申诉结果pass、fail
  setStatusA: (data) => {
    if (data) {
      for (var key in store.state.lookUp.EXPERT_REVIEW_RESULT) {
        if (data == store.state.lookUp.EXPERT_REVIEW_RESULT[key].itemCode) {
          return store.state.lookUp.EXPERT_REVIEW_RESULT[key].itemName
        }
      }
    } else {
      return ''
    }
  },
  //来源名称
  setSource: (data) => {
    if (data) {
      for (var key in store.state.lookUpAdd.VIDEO_SOURCE) {
        if (data == store.state.lookUpAdd.VIDEO_SOURCE[key].itemCode) {
          return store.state.lookUpAdd.VIDEO_SOURCE[key].itemName
        }
      }
    }
  },
  //视频分类1
  setType: (data) => {
    if (data) {
      for (var key in store.state.lookUpAdd.VIDEO_TYPE) {
        if (data == store.state.lookUpAdd.VIDEO_TYPE[key].itemCode) {
          return store.state.lookUpAdd.VIDEO_TYPE[key].itemName
        }
      }
    }
  },
  //视频分类2
  setType2: (data) => {
    if (data) {
      for (var key in store.state.lookUpAdd.VIDEO_TYPE_YL) {
        if (data == store.state.lookUpAdd.VIDEO_TYPE_YL[key].itemCode) {
          return store.state.lookUpAdd.VIDEO_TYPE_YL[key].itemName
        }
      }
    }
  },
  //视频分类3
  setType3: (data) => {
    if (data) {
      for (var key in store.state.lookUpAdd.VIDEO_TYPE_YL_BX) {
        if (data == store.state.lookUpAdd.VIDEO_TYPE_YL_BX[key].itemCode) {
          return store.state.lookUpAdd.VIDEO_TYPE_YL_BX[key].itemName
        }
      }
    }
  },
  //视频质量
  setQuality: (data) => {
    if (data) {
      for (var key in store.state.lookUpAdd.VIDEO_QUALITY) {
        if (data == store.state.lookUpAdd.VIDEO_QUALITY[key].itemCode) {
          return store.state.lookUpAdd.VIDEO_QUALITY[key].itemName
        }
      }
    }
  },
  //视频尺度
  setScale: (data) => {
    if (data) {
      for (var key in store.state.lookUpAdd.VIDEO_SCALE) {
        if (data == store.state.lookUpAdd.VIDEO_SCALE[key].itemCode) {
          return store.state.lookUpAdd.VIDEO_SCALE[key].itemName
        }
      }
    }
  },
  //视频不通过原因
  setVedioReason: (data) => {
    if (data) {
      for (var key in store.state.lookUpAdd.VIDEO_FAILED_REASON) {
        if (data == store.state.lookUpAdd.VIDEO_FAILED_REASON[key].itemCode) {
          return store.state.lookUpAdd.VIDEO_FAILED_REASON[key].itemName
        }
      }
    }
  },
  //视频水印
  setWatermark: (data) => {
    if (data) {
      for (var key in store.state.lookUpAdd.VIDEO_WATERMARK) {
        if (data == store.state.lookUpAdd.VIDEO_WATERMARK[key].itemCode) {
          return store.state.lookUpAdd.VIDEO_WATERMARK[key].itemName
        }
      }
    }
  },
  //|转、
  changeSign: (data) => {
    if (data && data.indexOf("|") != -1) {
      return data.replace(/\|/g, '、')
    } else {
      return data
    }
  },
  //|转换行
  changeSignBr: (data) => {
    if (data && data.indexOf("|") != -1) {
      return data.replace(/\|/g, '<br/>')
    } else {
      return data
    }
  },
  //，转换行
  changeBr: (data) => {
    if (data && data.indexOf(";") != -1) {
      return data.replace(/;/g, '<br/>')
    } else {
      return data
    }
  },
  //部门名称
  setRegionName: (data) => {
    if (data) {
      for (var key in store.state.personData) {
        if (data == store.state.personData[key].regioncode) {
          return store.state.personData[key].regionName
        }
      }
    }
  },
  //渠道任务类型
  setChannelType: (data) => {
    if (data) {
      for (var key in store.state.lookUp.CHANNEL_TASK_TYPE) {
        if (data == store.state.lookUp.CHANNEL_TASK_TYPE[key].itemCode) {
          return store.state.lookUp.CHANNEL_TASK_TYPE[key].itemName
        }
      }
    }
  },
  //渠道任务类型转id
  setChannelTypeCode: (data) => {
    if (data) {
      for (var key in store.state.lookUp.CHANNEL_TASK_TYPE) {
        if (data == store.state.lookUp.CHANNEL_TASK_TYPE[key].itemName) {
          return store.state.lookUp.CHANNEL_TASK_TYPE[key].itemCode
        }
      }
    }
  },
  //规则类型转id
  setRuleTypeCode: (data, arr) => {
    if (data) {
      for (var key in arr) {
        if (data == arr.sourceName) {
          return arr.dataSource
        }
      }
    }
  },
  //数据范围
  setDataRange: (data) => {
    if (data) {
      for (var key in store.state.lookUp.LOOKUP_DATA_RANGE) {
        if (data == store.state.lookUp.LOOKUP_DATA_RANGE[key].itemCode) {
          return store.state.lookUp.LOOKUP_DATA_RANGE[key].itemName
        }
      }
    }
  },
  //自动化KEY
  setAutoKey: (data) => {
    if (data) {
      for (var key in store.state.lookUp.TASK_PROCESS_TYPE) {
        if (data == store.state.lookUp.TASK_PROCESS_TYPE[key].itemCode) {
          return store.state.lookUp.TASK_PROCESS_TYPE[key].itemName
        }
      }
    }
  },
  //自动化条件
  setAutoRule: (data) => {
    if (data) {
      for (var key in store.state.lookUp.TASK_PROCESS_RULE) {
        if (data == store.state.lookUp.TASK_PROCESS_RULE[key].itemCode) {
          return store.state.lookUp.TASK_PROCESS_RULE[key].itemName
        }
      }
    }
  },
  //自动化审核状态
  setAutoprocess: (data) => {
    if (data) {
      for (var key in store.state.lookUp.TASK_PROCESS_RESULT) {
        if (data == store.state.lookUp.TASK_PROCESS_RESULT[key].itemCode) {
          return store.state.lookUp.TASK_PROCESS_RESULT[key].itemName
        }
      }
    }
  },
  //视频状态
  setDataName: (data) => {
    if (data) {
      for (var key in store.state.lookUp.TASK_DATA_STATUS_G) {
        if (data == store.state.lookUp.TASK_DATA_STATUS_G[key].itemCode) {
          return store.state.lookUp.TASK_DATA_STATUS_G[key].itemName
        }
      }
    }
  },
  //图文状态
  setDataNameImg: (data) => {
    if (data) {
      for (var key in store.state.lookUp.TASK_DATA_STATUS_V) {
        if (data == store.state.lookUp.TASK_DATA_STATUS_V[key].itemCode) {
          return store.state.lookUp.TASK_DATA_STATUS_V[key].itemName
        }
      }
    }
  },

  //面包屑
  setCrumb: (data) => {
    if (data) {
      for (var key in store.state.crumbData) {
        if (key == data) {
          return store.state.crumbData[key]
        }
      }
    }
  },

  //订单状态 
  setLabelStatus: (data) => {
    if (data) {
      for (var key in store.state.lookUp.LABEL_ORDER_STATUS) {
        if (data == store.state.lookUp.LABEL_ORDER_STATUS[key].itemCode) {
          return store.state.lookUp.LABEL_ORDER_STATUS[key].itemName
        }
      }
    }
  },
  //清洗状态
  setWashStatus: (data) => {
    if (data) {
      for (var key in store.state.lookUp.LABEL_CLASSIFY_STATE) {
        if (data == store.state.lookUp.LABEL_CLASSIFY_STATE[key].itemCode) {
          return store.state.lookUp.LABEL_CLASSIFY_STATE[key].itemName
        }
      }
    }
  },
  //标注状态
  setLabelStatusA: (data) => {
    if (data) {
      for (var key in store.state.lookUp.LABEL_LAB_STATUS) {
        if (data == store.state.lookUp.LABEL_LAB_STATUS[key].itemCode) {
          return store.state.lookUp.LABEL_LAB_STATUS[key].itemName
        }
      }
    }
  },
  //标注状态
  setLabelStatusB: (data) => {
    if (data) {
      for (var key in store.state.lookUp.LABEL_L_CHECK_STATUS) {
        if (data == store.state.lookUp.LABEL_L_CHECK_STATUS[key].itemCode) {
          return store.state.lookUp.LABEL_L_CHECK_STATUS[key].itemName
        }
      }
    }
  },
  //清洗状态
  setLabelStatusC: (data) => {
    if (data) {
      for (var key in store.state.lookUp.LABEL_C_CHECK_STATUS) {
        if (data == store.state.lookUp.LABEL_C_CHECK_STATUS[key].itemCode) {
          return store.state.lookUp.LABEL_C_CHECK_STATUS[key].itemName
        }
      }
    }
  },
  //用户角色
  setRoles: (data) => {
    if (data) {
      for (var key in store.state.userInfo.roles) {
        if (data == store.state.userInfo.roles[key].roleName) {
          return true
        }
      }
    }
  },
  //处理状态
  setOperateState: (data) => {
    if (data) {
      for (var key in store.state.lookUp.LABEL_FLOW_NODE_CODE) {
        if (data == store.state.lookUp.LABEL_FLOW_NODE_CODE[key].itemCode) {
          return store.state.lookUp.LABEL_FLOW_NODE_CODE[key].itemName
        }
      }
      if (data == "未完成") {
        return "未完成"
      }
      if (data == "已完成") {
        return "已完成"
      }
    }
  },
  //敏感词高亮
  //bbb为获取的敏感词数组
  // Sensitive: (val, arr) => {
  //   let str = val;
  //   if (arr.length) {
  //     for (var a = 0; a < arr.length; a++) {
  //       str = str.replace(
  //         arr[a].name,
  //         `<span style="color:${arr[a].color}">` +
  //         arr[a].name +
  //         "</span>"
  //       );
  //     }
  //   }
  //   return str;
  // },
  Sensitive: (val, arr) => {
    let str = val;
    if (arr.length) {
      for (var i = 0; i < arr.length; i++) {
        str = str.replace(
          arr[i],
          `<span style="background:#FFEC00">` +
          arr[i] +
          "</span>"
        );
      }
    }
    return str;
  },
  //储存单位转换
  FileSizeTransform: (size) => {
    if (!size) {
      return "0B";
    }
    var u = "B";
    if (size >= 1024) {
      size = Math.round(size / 1024);
      u = "KB";
    }
    if (size >= 1024) {
      size = Math.round(size / 1024);
      u = "MB";
    }
    if (size >= 1024) {
      size = Math.round(size / 1024);
      u = "G";
    }
    return size + u;
  },
  //订单操作状态
  setOperateStatus: (data) => {
    if (data) {
      for (var key in store.state.lookUp.LABEL_ORDER_LOG_TYPE) {
        if (data == store.state.lookUp.LABEL_ORDER_LOG_TYPE[key].itemCode) {
          return store.state.lookUp.LABEL_ORDER_LOG_TYPE[key].itemName
        }
      }
    }
  },
  toThousands: (num) => {
    var num = (num || 0).toString(),
      result = '';
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return result;
  },
  //设置角色权限按钮开关
  setRight: (name) => {
    if (name && store.state.userInfo.permissions) {
      for (var i = 0; i < store.state.userInfo.permissions.length; i++) {
        if (name == "图文退回") {
          if ('hwreview.Graphics.senior_examine' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "视频退回") {
          if ('hwreview.videoVerify.high_level_add' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
      }
    } else {
      return false
    }
  },

}
