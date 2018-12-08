import Vue from 'vue'
import Router from 'vue-router'
import goods from '@/components/goods'
import comment from '@/components/comment'
import sell from '@/components/sell'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',  //改变路由激活时的class名称
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },// 设置当服务器启动的时候默认进入 /home中    
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment
    },
    {
      path: '/sell',
      name: 'sell',
      component: sell
    },
  ]
})
