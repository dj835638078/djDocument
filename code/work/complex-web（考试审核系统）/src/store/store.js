//import { mapState, mapMutations } from "vuex";
// computed: {...mapState(["zx"])},
//methods: {...mapMutations(["setShowLogin"])}
import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios"
Vue.use(Vuex);

const key = "time"
const isLogin = "isLogin"
let store = new Vuex.Store({
  state: {
    shadeLog: false,
    // shadeText: "加载中......",
    shadeText: "",
    user: null,
    isLogin: "0",
    token: "",
    userInfo: {},
    userName: "",
    lookUp: {},
    userList: {},
    bulletinList: [],
    pageHeight: "100%",
    pageHeightContent: "100%",
    detailHeight: "100%",
    homeContentHeight: "100%",
    datasourceStore: {},
    regionNameStore: {},
    getPaperNumStore: 0,
    //试卷初始宽高
    oldPaperWidth: "",
    oldPaperHeight: "",
    //试卷改变后的宽高
    newPaperWidth: "",
    newPaperHeight: "",
    multipleChecked: [],
    ruleList: [],
    calssList: [],
  },
  getters: {
    // 登录时获取用户信息
    ["getStorage"](state) {
      if (!state.user) {
        state.user = JSON.parse(localStorage.getItem(key))
        state.isLogin = localStorage.getItem(isLogin)
      }
      return state.user
    },
  },
  actions: {
    // async setMutation(state, payload) {
    //   axios.get("./asdsad")
    //     .then(res => {
    //       state.commit('setShowLogin', 110)
    //     })
    // }
  },
  mutations: {
    ["setUserName"](state, payload) {
      state.userList = payload
    },
    ["getPaperNumFlag"](state, payload) {
      state.getPaperNumStore = payload
    },
    ["setUserInfo"](state, payload) {
      state.userInfo = payload.user
    },
    ["setDatasource"](state, payload) {
      state.datasourceStore = payload
    },
    ["setRegionName"](state, payload) {
      state.regionNameStore = payload
    },
    ["setLookUp"](state, payload) {
      state.lookUp = payload
      let objType = []
      //克隆数组，避免push污染
      Object.assign(objType, payload.SHIFT_APPLY_CLASS_1)
      objType.push(...payload.SHIFT_APPLY_CLASS_2)
      state.calssList = objType
      // state.userInfo = payload.user
      state.bulletinList = payload.COMPLEX_BULLETIN_TYPE
      let bulletinObj = {
        itemCode: "",
        itemName: "最新公告",
        orderId: ""
      }
      state.ruleList = payload.RULE_MANAGE_CLASSIFY
      let obj = {
        itemCode: "",
        itemName: "全部",
      }
      state.ruleList.unshift(obj)
      state.bulletinList.unshift(bulletinObj)
    },
    ["setStorage"](state, payload) {
      state.user = payload
      localStorage.setItem(key, JSON.stringify(payload))
    },
    ["setShadeLog"](state, payload) {
      state.shadeLog = payload
    },
    // ["setShowLogin"](state, payload) {},
    ["setToken"](state, payload) {
      localStorage.setItem("token", payload)
    },
    ["getUser"](state, payload) {
      state.userName = payload
    },
    ["setPageHeight"](state, payload) {
      let vm = this;
      //获取初始化试卷的宽高
      vm.state.oldPaperWidth = window.innerWidth
      vm.state.oldPaperHeight = window.innerHeight
      vm.state.pageHeight = window.innerHeight - 70 - 120
      vm.state.detailHeight = window.innerHeight - 50
      vm.state.homeContentHeight = window.innerHeight - 70 - 116 - 63 - 52
      // 监听窗口大小变化
      window.onresize = function () {
        //窗口改变后的试卷宽高
        vm.state.newPaperWidth = window.innerWidth
        vm.state.newPaperHeight = window.innerHeight
        vm.state.pageHeight = window.innerHeight - 70 - 120
        vm.state.detailHeight = window.innerHeight - 50
        vm.state.homeContentHeight = window.innerHeight - 70 - 116 - 63 - 52
      }
    },
    // 设置考试多选内容
    ["getMultipleChecked"](state, payload) {
      state.multipleChecked = payload
    },
  }
});
export default store;
