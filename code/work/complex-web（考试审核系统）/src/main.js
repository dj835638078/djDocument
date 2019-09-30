// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//import Vuex from 'vuex'
import App from './App'
import router from './router'
import tools from './components/common/common'
import api from "@/api";
import 'styles/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import 'babel-polyfill'
import Element from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import echarts from 'echarts'
import store from './store/store';
import './components/common/vue-slideshow.js';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//Vue.use(Vuex)
Vue.prototype.$echarts = echarts
Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});
Vue.use(VueQuillEditor);
Vue.prototype.tools = tools;
Vue.prototype.api = api;
//数组去重
Array.prototype.arrUnique = function myUnique() {
  var obj = {};
  for (var i = 0; i < this.length; i++) {
    var item = this[i];
    if (typeof obj[item] !== "undefined") {
      this[i] = this[this.length - 1];
      this.length--;
      i--;
      continue;
    }
    obj[item] = item;
  }
  obj = null;
  return this;
};
Array.prototype.indexOf = function (val) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
Vue.directive("Int", {
  bind: function (el) {
    const input = el.getElementsByTagName("input")[0];
    input.onkeyup = function (e) {
      if (input.value.length === 1) {
        input.value = input.value.replace(/[^0-9]/g, "");
      } else {
        input.value = input.value.replace(/[^\d]/g, "");
      }
      (function (el, type) {
        const e = document.createEvent("HTMLEvents");
        e.initEvent(type, true, true);
        el.dispatchEvent(e);
      })(input, "input");
    };
    input.onblur = function (e) {
      if (input.value.length === 1) {
        input.value = input.value.replace(/[^0-9]/g, "");
      } else {
        input.value = input.value.replace(/[^\d]/g, "");
      }
      (function (el, type) {
        const e = document.createEvent("HTMLEvents");
        e.initEvent(type, true, true);
        el.dispatchEvent(e);
      })(input, "input");
    };
  }
});
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
