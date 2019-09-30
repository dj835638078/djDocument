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
    //面包屑
    zx: "600",
    crumbData: {},
    shadeLog: false,
    shadeText: "加载中......",
    user: null,
    isLogin: "0",
    menuLinkFlag: false,
    token: "",
    userInfo: {},
    validate: "",
    lookUp: {},
    //订单状态
    lookUpStatea: [],
    lookUpStateb: [],
    lookUpStatec: [],
    lookUpStatee: [],
    lookUpStateq: [],
    lookUpStated: [],
    personData: {},
    lookUpAdd: {},
    useMap: {},
    setPathHome: "",
    listHeight: "300",
    tableHeight: "300",
    tableHeightOneV: "300",
    tableHeightThreeV: "300",
    tableHeightOne: "300",
    tableHeightTwo: "300",
    tableHeightTwoS: "300",
    tableHeightThree: "300",
    tableHeightThreeN: "300",
    tableHeightThreeY: '300',
    tableHeightTwoHalf: "300",
    tableHeightN: "300",
    tableWhiteHalf: "438px",
    automationTitle: "",



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
    // 参数列表state指的是state数据
    ['getCityFn'](state) {
      return state.city;
    },
  },
  actions: {
    ["showLoading"](state, payload) {
      if (payload) {
        state.commit("setLoading", payload)
      }
    },
    async setMutation(state, payload) {
      axios.get("./asdsad")
        .then(res => {
          state.commit('setShowLogin', 110)
        })
    }
  },
  mutations: {
    ["validatePassWord"](state, payload) {
      state.validate = payload
    },
    ["setStorage"](state, payload) {
      state.user = payload
      localStorage.setItem(key, JSON.stringify(payload))
    },
    ["setShadeLog"](state, payload) {
      state.shadeLog = payload
    },
    ["setShadeText"](state, payload) {
      state.shadeText = payload
    },
    ["setShowLogin"](state, payload) {

      state.zx = payload
    },
    ["setToken"](state, payload) {
      // state.token = payload
      localStorage.setItem("token", payload)
    },
    // 修改导航菜单显示状态
    ['changeMenu'](state, payload) {
      if (payload) {
        state.menuLinkFlag = !payload;
        return;
      }
      state.menuLinkFlag = !state.menuLinkFlag;
    },
    // 获取用户登录信息
    ["setUserInfo"](state, payload) {
      state.validate = payload.user.defaultPassWord
      state.userInfo = payload.user

      state.crumbData = payload.menuNameMap
    },
    // 获取lookUp信息
    ["setLookUp"](state, payload) {
      state.lookUp = payload
      let data = {
        itemCode: "",
        itemName: "全部",
      }
      state.lookUpStatea = payload.LABEL_ORDER_STATUS.filter(item => {
        return item.itemCode != "1";
      });
      state.lookUpStatec = payload.LABEL_CLASSIFY_STATE
      state.lookUpStatee = payload.LABEL_L_CHECK_STATUS
      state.lookUpStateq = payload.LABEL_C_CHECK_STATUS
      state.lookUpStated = payload.LABEL_LAB_STATUS
      state.lookUpStateb = payload.LABEL_ORDER_STATUS
      state.lookUpStatea.unshift(data)
      state.lookUpStateb.unshift(data)
      state.lookUpStatec.unshift(data)
      state.lookUpStatee.unshift(data)
      state.lookUpStateq.unshift(data)
      state.lookUpStated.unshift(data)
    },
    //获取人员
    ["setPerson"](state, payload) {
      state.personData = payload
    },

    // 获取图文视频lookUp信息
    ["setLookUpAdd"](state, payload) {
      state.lookUpAdd = payload
    },
    // 获取useMap信息
    ["setUseMap"](state, payload) {
      state.useMap = payload
    },
    ["setPath"](state, payload) {
      state.setPathHome = payload
    },
    ["setHeight"](state, payload) {
      this.state.listHeight = window.innerHeight - 230 - 50 - 45 + 94;
      this.state.tableHeight = window.innerHeight - 230 - 50 - 45 + 38;
      this.state.tableHeightOne = window.innerHeight - 230 - 50 - 55 + 38;
      this.state.tableHeightOneV = window.innerHeight - 230 - 50 - 55 + 72;
      this.state.tableHeightThreeV = window.innerHeight - 230 - 50 - 65 - 45 + 38 - 15;
      this.state.tableHeightTwo = window.innerHeight - 230 - 50 - 65 - 45 + 38;
      this.state.tableHeightTwoS = window.innerHeight - 230 - 50 - 65 - 45 + 88;
      this.state.tableHeightTwoV = window.innerHeight - 230 - 50 - 65 - 45 + 68;
      this.state.tableHeightTwoHalf = (window.innerHeight - 230 - 50 - 65 - 45 + 38) / 3;
      this.state.tableHeightThree = window.innerHeight - 230 - 50 - 65 - 45 + 38 - 48;
      this.state.tableHeightThreeN = window.innerHeight - 230 - 50 - 65 - 45 + 38 - 25;
      this.state.tableHeightThreeY = window.innerHeight - 230 - 50 - 65 - 45 + 38 - 25 + 56;
      this.state.tableHeightN = window.innerHeight - 380;
      this.state.tableWhiteHalf = (window.innerWidth - 221 - 48 - 16) / 2 + "px";

      // 监听窗口大小变化
      let vm = this;
      window.onresize = function () {
        vm.state.listHeight = window.innerHeight - 230 - 50 - 45 + 94;
        vm.state.tableHeight = window.innerHeight - 230 - 50 - 45 + 38;
        vm.state.tableHeightOne = window.innerHeight - 230 - 50 - 55 + 38;
        vm.state.tableHeightOneV = window.innerHeight - 230 - 50 - 55 + 72;
        vm.state.tableHeightThreeV = window.innerHeight - 230 - 50 - 65 - 45 + 38 - 15;
        vm.state.tableHeightTwo = window.innerHeight - 230 - 50 - 65 - 45 + 38;
        vm.state.tableHeightTwoS = window.innerHeight - 230 - 50 - 65 - 45 + 88;
        vm.state.tableHeightTwoV = window.innerHeight - 230 - 50 - 65 - 45 + 68;
        vm.state.tableHeightTwoHalf = (window.innerHeight - 230 - 50 - 65 - 45 + 38) / 3;
        vm.state.tableHeightThree = window.innerHeight - 230 - 50 - 65 - 45 + 38 - 48;
        vm.state.tableHeightThreeN = window.innerHeight - 230 - 50 - 65 - 45 + 38 - 25;
        vm.state.tableHeightThreeY = window.innerHeight - 230 - 50 - 65 - 45 + 38 - 25 + 56;
        vm.state.tableHeightN = window.innerHeight - 380;
        vm.state.tableWhiteHalf = (window.innerWidth - 221 - 48 - 16) / 2 + "px";
      };
    },
    ["setAutoTitle"](state, payload) {
      state.automationTitle = payload;
    },
  }
});
export default store;
// const state = {
//   zxzx: "1"
// }
// const actions = {
// ["showLoading"](state, payload) {
//   if (payload) {
//     state.commit("setLoading", payload)
//   }
// },
// async setMutation(state, payload) {
//   axios.get("./asdsad")
//     .then(res => {
//       state.commit('setShowLogin', 110)
//     })
// }
// }
// const mutations = {
//   // ["setShowLogin"](state, payload) {
//   //   state.zx = payload
//   // }
// }
// export default {
//   namespaced: true,
//   actions,
//   state,
//   mutations
// }
