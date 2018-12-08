import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({ //将app.vue中的内容挂载到html（root）中
  render: (h) => h(App)
}).$mount(root)