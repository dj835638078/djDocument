// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import reporters from './ReporterConstruction'
import axios from 'axios'
Vue.prototype.$http = axios

axios.interceptors.request.use(function (config) {
    if (config.method === 'post') {
        if (config.data && config.data !== {}) {
            Object.keys(config.data).map(function (key, index) {
                config.data[key] = String(config.data[key])
            })
        }
    }
    return config
}, function (error) {
    return Promise.reject(error)
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    components: { reporters },
    template: '<reporters/>'
})