/**
 * http配置啊
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
import Vue from 'vue'
import store from './store/store'
import {
  Loading,
  Message
} from 'element-ui'
Vue.prototype.axios = axios;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Authorization'] = localStorage.getItem("token");
// 超时时间
axios.defaults.timeout = 15000
// http请求拦截器
var loadinginstace
//声明一个对象用于存储请求个数
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    store.commit("setShadeLog", true)
  }
  needLoadingRequestCount++;
};

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    store.commit("setShadeLog", false)
  }
};
axios.interceptors.request.use(config => {
  if (localStorage.getItem("token")) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = localStorage.getItem("token");
  }
  // element ui Loading方法
  // loadinginstace = Loading.service({
  //   fullscreen: true
  // })
  showFullScreenLoading()
  //给URL后面加时间戳，解决IE上不更新问题
  if (config.url.indexOf("?") === -1) {
    config.url = config.url + "?" + new Date().getTime(); /*拼接完整请求路径*/
  } else {
    config.url = config.url + "&" + new Date().getTime(); /*拼接完整请求路径*/
  }
  return config
}, error => {
  // loadinginstace.close()

  Message.error({
    message: '加载超时'
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(
  config => { // 响应成功关闭loading
    if (localStorage.getItem("token")) { // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = localStorage.getItem("token");
    }
    tryHideFullScreenLoading();
    return config;
  }, error => {
    // loadinginstace.close()
    tryHideFullScreenLoading();
    if (error.response) {
      let messageError = JSON.parse(JSON.stringify(error.response)).data.message;
      switch (error.response.status) {
        case 400:
          Message.error({
            message: messageError || '请求错误(400)'
          })
          break;
        case 401:
          // 这里写清除token的代码
          // Message.error({
          //   message: messageError || '未授权，请重新登录(401)'
          // })
          localStorage.removeItem("time");
          localStorage.removeItem("token");
          location.href = location.origin + '/#/Login'
          // router.replace({
          //   path: 'login',
          //   query: {
          //     redirect: router.currentRoute.fullPath
          //   } //登录成功后跳入浏览的当前页面
          // })
          break;
        case 403:
          Message.error({
            message: messageError || '拒绝访问(403)'
          })
          break;
        case 404:
          Message.error({
            message: messageError || '请求出错(404)'
          })
          break;
        case 500:
          Message.error({
            message: messageError || '服务器错误(500)'
          })
          break;
        case 504:
          Message.error({
            message: messageError || '网络超时(504)'
          })

          break;
          //   break;
        default:
          Message.error({
            message: messageError || `连接出错(${error.response.status})!`
          })
      }
    }
    return Promise.reject(error)
  })
export default axios
