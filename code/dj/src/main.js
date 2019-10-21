// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mixin from '@common/mixins' //全局混入
import '@common/filters' //全局过滤器
import '@common/directives' //全局过滤器
import tools from '@common/tools' //全局调用方法(代码下面在原型中引入)混入也可以
import '@common/toolsTwo' //全局调用方法（通过window调用，不建议使用）

Vue.config.productionTip = false

Vue.prototype.tools = tools//全局调用方法
Vue.mixin(mixin)//全局混入


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
