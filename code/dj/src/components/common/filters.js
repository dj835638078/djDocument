// 全局过滤器
import Vue from 'vue';

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('changeVal', function (value) {
  return value + "全局过滤器"
});
