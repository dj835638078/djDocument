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
  //判断权限
  setRoles: (data) => {
    if (data) {
      for (var key in store.state.userInfo.roles) {
        if (data == store.state.userInfo.roles[key].roleName) {
          return true
        }
      }
    }
  },
  //判断权限
  // setRolesN: (data) => {
  //   if (data) {
  //     for (var key in store.state.userInfo.roles) {
  //       if (data == store.state.userInfo.roles[key].roleName) {
  //         return false
  //       }
  //     }
  //   }
  // },
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
  //专拿时分
  setFormTimeSF: (val, type) => {
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
      return h + ":" + minute;
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
  // 设置性别
  setSex(val) {
    if (val == "F") {
      return "女";
    }
    if (val == "M") {
      return "男";
    }
  },
  // 设置角色
  setRoleInfo(data) {
    if (data && data.length) {
      return data[0].areaCode;
    }
  },
  // 下载图片
  downImg(fId) {
    if (fId) {
      return (
        location.origin + `/complex/publicservice/file/download?fId=${fId}`
      );
    }
  },
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
  //获取角色
  setRoleName: (data) => {
    let arr = [];
    if (data) {
      for (var key = 0; key < data.length; key++) {
        arr.push(data[key].areaCode)
      }
    }
    return arr.join(",")
  },
  //设置公告名称
  setNoticeName: (data) => {
    if (data) {
      for (var key in store.state.bulletinList) {
        if (data == store.state.bulletinList[key].itemCode) {
          return store.state.bulletinList[key].itemName
        }
      }
    }
  },
  //设置规则名称
  setRuleName: (data) => {
    if (data) {
      for (var key in store.state.lookUp.RULE_MANAGE_CLASSIFY) {
        if (data == store.state.lookUp.RULE_MANAGE_CLASSIFY[key].itemCode) {
          return store.state.lookUp.RULE_MANAGE_CLASSIFY[key].itemName
        }
      }
    }
  },
  //设置区域名称
  setRegion: (data) => {
    if (data) {
      for (var key in store.state.lookUp.REIGSTER_REGION_CODE) {
        if (data == store.state.lookUp.REIGSTER_REGION_CODE[key].itemCode) {
          return store.state.lookUp.REIGSTER_REGION_CODE[key].itemName
        }
      }
    }
  },
  //设置待办类型
  setTodoType: (data) => {
    if (data) {
      for (var key in store.state.lookUp.FWM_FLOW_TYPE) {
        if (data == store.state.lookUp.FWM_FLOW_TYPE[key].itemCode) {
          return store.state.lookUp.FWM_FLOW_TYPE[key].itemName
        }
      }
    }
  },
  //设置员工性质
  setProperty: (data) => {
    if (data) {
      for (var key in store.state.lookUp.EMPLOYEE_NATURE_CODE) {
        if (data == store.state.lookUp.EMPLOYEE_NATURE_CODE[key].itemCode) {
          return store.state.lookUp.EMPLOYEE_NATURE_CODE[key].itemName
        }
      }
    }
  },
  //图文视频类型
  getType: (data) => {
    if (store.state.lookUp && store.state.lookUp.RULE_MANAGE_TYPE) {
      for (var i = 0; i < store.state.lookUp.RULE_MANAGE_TYPE.length; i++) {
        if (data == store.state.lookUp.RULE_MANAGE_TYPE[i].itemCode) {
          return store.state.lookUp.RULE_MANAGE_TYPE[i].itemName
        }
      }
    }

  },
  //获取考试违规次数
  getPaperWrroyNum: () => {
    if (store.state.getPaperNumStore) {
      return +store.state.getPaperNumStore
    }

  },
  //获取试卷类型
  setPaperType: (data) => {
    if (data) {
      for (var key in store.state.lookUp.TEST_TYPE) {
        if (data == store.state.lookUp.TEST_TYPE[key].itemCode) {
          return store.state.lookUp.TEST_TYPE[key].itemName
        }
      }
    }
  },
  //获取申诉状态
  setAppeal: (data) => {
    if (data) {
      for (var key in store.state.lookUp.ENTRY_APPEAL_STATUS) {
        if (data == store.state.lookUp.ENTRY_APPEAL_STATUS[key].itemCode) {
          return store.state.lookUp.ENTRY_APPEAL_STATUS[key].itemName
        }
      }
    }
  },

  //获取审核结果(通过)
  setExamineResult: (data) => {
    if (data) {
      for (var key in store.state.lookUp.ENTRY_APPROVAL_RESULT) {
        if (data == store.state.lookUp.ENTRY_APPROVAL_RESULT[key].itemCode) {
          return store.state.lookUp.ENTRY_APPROVAL_RESULT[key].itemName
        }
      }
    }
  },


  //获取审核结果(同意)
  setExamineResultAdd: (data) => {
    if (data) {
      for (var key in store.state.lookUp.ENTRY_APPEAL_RESULT) {
        if (data == store.state.lookUp.ENTRY_APPEAL_RESULT[key].itemCode) {
          return store.state.lookUp.ENTRY_APPEAL_RESULT[key].itemName
        }
      }
    }
  },
  //获取组别
  setGroup: (data) => {
    if (data) {
      for (var key in store.state.lookUp.ENTRY_CHECK_G_GENRE) {
        if (data == store.state.lookUp.ENTRY_CHECK_G_GENRE[key].itemCode) {
          return store.state.lookUp.ENTRY_CHECK_G_GENRE[key].itemName
        }
      }
    }
  },

  //获取周时间
  setWeekTime: (data) => {
    if (data) {
      if (data == 1) {
        return "本周"
      }
      if (data == 2) {
        return "上周"
      }
      if (data == 3) {
        return "上上周"
      }
    }
  },
  //获取错误类型误过
  setErrorType: (data) => {
    if (data) {
      let arr = [];
      let arrFlag = data.split(",");
      for (var i = 0; i < arrFlag.length; i++) {
        for (var key in store.state.lookUp.ENTRY_CHECK_G_ERR_TYPE) {
          if (arrFlag[i] == store.state.lookUp.ENTRY_CHECK_G_ERR_TYPE[key].itemCode) {
            arr.push(store.state.lookUp.ENTRY_CHECK_G_ERR_TYPE[key].itemName)
          }
        }
      }
      return arr.join("，")
    }
  },
  //获取错误类型误拒
  setErrorRefuseType: (data) => {
    if (data) {
      let arr = [];
      let arrFlag = data.split(",");
      for (var i = 0; i < arrFlag.length; i++) {
        for (var key in store.state.lookUp.ENTRY_G_FALSE_REFUSE_TYPE) {
          if (arrFlag[i] == store.state.lookUp.ENTRY_G_FALSE_REFUSE_TYPE[key].itemCode) {
            arr.push(store.state.lookUp.ENTRY_G_FALSE_REFUSE_TYPE[key].itemName)
          }
        }
      }
      return arr.join("，")
    }
  },
  //获取错误类型数组误过
  setErrorTypeArr: (data) => {
    if (data && data.length) {
      let arr = [];
      for (var i = 0; i < data.length; i++) {
        for (var key in store.state.lookUp.ENTRY_CHECK_G_ERR_TYPE) {
          if (data[i] == store.state.lookUp.ENTRY_CHECK_G_ERR_TYPE[key].itemCode) {
            arr.push(store.state.lookUp.ENTRY_CHECK_G_ERR_TYPE[key].itemName)
          }
        }
      }
      return arr.join("，")
    }
  },
  //获取错误类型数组误拒
  setErrorRefuseTypeArr: (data) => {
    if (data && data.length) {
      let arr = [];
      for (var i = 0; i < data.length; i++) {
        for (var key in store.state.lookUp.ENTRY_G_FALSE_REFUSE_TYPE) {
          if (data[i] == store.state.lookUp.ENTRY_G_FALSE_REFUSE_TYPE[key].itemCode) {
            arr.push(store.state.lookUp.ENTRY_G_FALSE_REFUSE_TYPE[key].itemName)
          }
        }
      }
      return arr.join("，")
    }
  },
  //主要分布
  setMainArr: (data) => {
    let str = "";
    if (data && JSON.stringify(data) != "{}") {
      for (var key in data) {
        str += (store.state.regionNameStore[key] + "(" + data[key] + ")")
      }
    }
    return str
  },
  //设置图文质检来源名称
  setImgCheckChannel(data) {
    if (data) {
      for (var key in store.state.lookUp.COMPLEX_CHECK_CHANNEL) {
        if (data == store.state.lookUp.COMPLEX_CHECK_CHANNEL[key].itemCode) {
          return store.state.lookUp.COMPLEX_CHECK_CHANNEL[key].itemName;
        }
      }
    }
  },
  //设置视频质检来源名称
  setVideoCheckChannel(data) {
    if (data) {
      for (var key in store.state.lookUp.COMPLEX_CHECK_CHANNEL_VIDEO) {
        if (data == store.state.lookUp.COMPLEX_CHECK_CHANNEL_VIDEO[key].itemCode) {
          return store.state.lookUp.COMPLEX_CHECK_CHANNEL_VIDEO[key].itemName;
        }
      }
    }
  },

  //获取视频质量
  getVideoQuality: (data) => {
    if (data) {
      for (var key in store.state.lookUp.ENTRY_CHECK_V_QUALITY) {
        if (data == store.state.lookUp.ENTRY_CHECK_V_QUALITY[key].itemCode) {
          return store.state.lookUp.ENTRY_CHECK_V_QUALITY[key].itemName;
        }
      }
    }
  },
  //获取内容尺度
  getContentScare: (data) => {
    if (data) {
      for (var key in store.state.lookUp.ENTRY_CHECK_V_SCALE) {
        if (data == store.state.lookUp.ENTRY_CHECK_V_SCALE[key].itemCode) {
          return store.state.lookUp.ENTRY_CHECK_V_SCALE[key].itemName;
        }
      }
    }
  },
  //获取来源
  getDataSource: (data) => {
    if (data) {
      for (var key in store.state.lookUp.DATASOURCE_WX_SP) {
        if (data == store.state.lookUp.DATASOURCE_WX_SP[key].itemCode) {
          return store.state.lookUp.DATASOURCE_WX_SP[key].itemName;
        }
      }
    }
  },
  //获取来源
  getDataSourceImg: (data) => {
    if (data) {
      for (var key in store.state.lookUp.DATASOURCE_CD_TW) {
        if (data == store.state.lookUp.DATASOURCE_CD_TW[key].itemCode) {
          return store.state.lookUp.DATASOURCE_CD_TW[key].itemName;
        }
      }
    }
  },
  //设置类别
  setApplyType: (data) => {
    if (data) {
      for (var key in store.state.lookUp.SHIFT_APPLY_TYPE) {
        if (data == store.state.lookUp.SHIFT_APPLY_TYPE[key].itemCode) {
          return store.state.lookUp.SHIFT_APPLY_TYPE[key].itemName;
        }
      }
    }
  },
  //设置类型
  setApplyClass: (data) => {
    if (data) {
      var classValue = "";
      if (data) {
        var values = data.split(",");
        for (var i = 0; i < values.length; i++) {
          if (classValue) {
            classValue += "、";
          }
          for (var key in store.state.calssList) {
            if (values[i] == store.state.calssList[key].itemCode) {
              classValue += store.state.calssList[key].itemName;
            }
          }
        }
      }
      return classValue;
    }
  },
  //设置审批状态
  setApplyStatus: (data) => {
    if (data) {
      for (var key in store.state.lookUp.SHIFT_APPLY_STATUS) {
        if (data == store.state.lookUp.SHIFT_APPLY_STATUS[key].itemCode) {
          return store.state.lookUp.SHIFT_APPLY_STATUS[key].itemName;
        }
      }
    }
  },

  //获取试卷分数
  setPaperNum: (data) => {
    if (data.markDate) {
      return data.userTestScore;
    } else {
      return "待阅卷"
    }
  },
  //数据为空时转换为0
  setZero: (data) => {
    if (!data && data != 0) {
      return 0;
    } else {
      return data + "%"
    }
  },
  //获取试卷正确答案
  getCorrectAnsewr: (data) => {
    let arr = [];
    let arrFlag = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
    if (data && data.length) {
      for (var key in data) {
        if (data[key].isCorrect == 1) {
          arr.push(arrFlag[key])
        }
      }
    }
    return arr.join("、")
  },
  //获取试卷填空题正确答案
  getFillAnsewr: (data) => {
    let arr = [];
    if (data && data.length) {
      for (var key in data) {
        if (data[key].answerTitle) {
          arr.push(data[key].answerTitle)
        }
      }
    }
    return arr.join("、")
  },
  //获取试卷判断题正确答案
  getJudgeAnsewr: (data) => {
    if (data && data.length) {
      for (var key in data) {
        if (data[key].isCorrect == 1) {
          return data[key].answerTitle
        }
      }
    }
  },
  //获取区域名称
  getRegionName: (data) => {
    if (data) {
      let arr = [];
      for (var key in store.state.regionNameStore) {
        if (data == key) {
          arr.push(store.state.regionNameStore[key]);
        }
      }
      return arr.join("/")
    }
  },
  //设置班次类型
  setShiftType: (data) => {
    if (data) {
      for (var key in store.state.lookUp.EMPLOYEE_SHIFT_TYPE) {
        if (data == store.state.lookUp.EMPLOYEE_SHIFT_TYPE[key].itemCode) {
          return store.state.lookUp.EMPLOYEE_SHIFT_TYPE[key].itemName;
        }
      }
    } else {
      return "";
    }
  },
  //lookUp所有用户获取名称
  setName: (data) => {
    if (data) {
      for (var key in store.state.userList) {
        if (data == key) {
          return store.state.userList[key]
        }
      }
    } else {
      return ""
    }
  },
  //lookUp所有用户冒号分割获取名称
  setMulName: (data) => {
    // if (data) {
    //   for (var key in store.state.userList) {
    //     if (data == key) {
    //       return store.state.userList[key]
    //     }
    //   }
    // } else {
    //   return ""
    // }
    if (data) {
      let arr = [];
      let arrFlag = data.split("、");
      for (var i = 0; i < arrFlag.length; i++) {
        for (var key in store.state.userList) {
          if (arrFlag[i] == key) {
            arr.push(store.state.userList[key])
          }
        }
      }
      return arr.join("、")
    }
  },
  //用户角色排版
  setRoleList: (list) => {
    if (list) {
      let arr = []
      for (var i = 0; i < list.length; i++) {
        arr.push(list[i].areaCode)
      }
      return arr.join("/")
    } else {
      return ""
    }
  },
  // 获取字母
  getLetter(index) {
    let arr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]
    return arr[index] + "、";
  },
  // 阿拉伯数字转中文
  getCnNum(index) {
    let arr = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
    return arr[index] + "、";
  },
  SectionToChinese(section) {
    var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var chnUnitChar = ["", "十", "百", "千"];
    var strIns = '',
      chnStr = '';
    var unitPos = 0;
    var zero = true;
    while (section > 0) {
      var v = section % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = chnNumChar[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = chnNumChar[v];
        strIns += chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    return chnStr;
  },
  NumberToChinese(num) {
    var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
    var unitPos = 0;
    var strIns = '',
      chnStr = '';
    var needZero = false;

    if (num === 0) {
      return chnNumChar[0];
    }

    while (num > 0) {
      var section = num % 10000;
      if (needZero) {
        chnStr = chnNumChar[0] + chnStr;
      }
      strIns = this.SectionToChinese(section);
      strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = (section < 1000) && (section > 0);
      num = Math.floor(num / 10000);
      unitPos++;
    }

    return chnStr;
  },
  // 数字前面补0
  PrefixZero(num, n = 2) {
    return (Array(n).join(0) + num).slice(-n);
  },
  // 设置字符长度
  intercept: (val, length) => {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
      var a = val.charAt(i);
      if (a.match(/[^\x00-\xff]/gi) != null) {
        len += 2;
      } else {
        len += 1;
      }
    }
    if (length == '678') {
      if (len > 200) {
        return true;
      } else {
        return false;
      }
    }
    if (length == '256') {
      if (len > 72) {
        return true;
      } else {
        return false;
      }
    }

  },
  //入职年限
  setEntryDate: (date) => {
    if (date) {
      let day = parseInt((new Date() - date) / (24 * 60 * 60 * 1000));
      if (day < 90) {
        return "1-3个月"
      }
      if (day < 180 && day >= 90) {
        return "3-6个月"
      }
      if (day > 180) {
        return "6个月以上"
      }
    }
  },
  //设置角色权限按钮开关
  setRight: (name) => {
    if (name && store.state.userInfo.permissions) {
      for (var i = 0; i < store.state.userInfo.permissions.length; i++) {
        // console.log(store.state.userInfo.permissions[i].permissionCode, "dsz")
        if (name == "审核录入") {
          if ('complex.entry.verify_export' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "图文质检导出") {
          if ('complex.checkEntry.check_g_export' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "视频质检导出") {
          if ('complex.checkEntry.check_v_export' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "checkDetail") {
          if ('complex.checkEntry.check_details_add_button' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "checkNum") {
          if ('complex.checkEntry.check_num_add_button' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "information") {
          if ('complex.entry.verify_add_button' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "imgAppeal") {
          if ('complex.appealEntry.tw_g_add_button' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "videoAppeal") {
          if ('complex.appealEntry.tw_v_add_button' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "todo") {
          if ('fwm.flow.task' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "shift") {
          if ('complex.shift.exchange_apply' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "approval") {
          if ('complex.user.user_approve' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "reportAdd") {
          if ('complex.filing.filing_add_button' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "ieport") {
          if ('fwm.excel.import' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "leader") {
          if ('complex.gReporter.download_pdf' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "HR") {
          if ('complex.shift.leave_hr_know' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
        if (name == "verifyStatistics") { //审核录入页面-审核统计
          if ('complex.entry.verify_statistics' == store.state.userInfo.permissions[i].permissionCode) {
            return true
          }
        }
      }
    } else {
      return false
    }
  },
  //设置错误程度
  setErrorLevel: (data) => {
    if (data) {
      for (let i = 0; i < store.state.lookUp.ENTRY_CHECK_G_ERR_LEVEL.length; i++) {
        if (data == store.state.lookUp.ENTRY_CHECK_G_ERR_LEVEL[i].itemCode) {
          return store.state.lookUp.ENTRY_CHECK_G_ERR_LEVEL[i].itemName
        }
      }
    }
  },
  //设置视频错误程度
  setVideoErrorLevel: (data) => {
    if (data) {
      for (let i = 0; i < store.state.lookUp.ENTRY_CHECK_V_ERR_LEVEL.length; i++) {
        if (data == store.state.lookUp.ENTRY_CHECK_V_ERR_LEVEL[i].itemCode) {
          return store.state.lookUp.ENTRY_CHECK_V_ERR_LEVEL[i].itemName
        }
      }
    }
  },
  //操作下拉
  setOperation: (data) => {
    if (data) {
      for (var key in store.state.lookUp.FWM_FLOW_CONCLUSION) {
        if (data == store.state.lookUp.FWM_FLOW_CONCLUSION[key].itemCode) {
          return store.state.lookUp.FWM_FLOW_CONCLUSION[key].itemName;
        }
      }
    } else {
      return ""
    }
  },
}
