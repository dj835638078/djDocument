import Vue from 'vue'
import Router from 'vue-router'

import myFeedback from '@/components/myFeedback'    //我的反馈
import myFeedbackDetail from '@/components/connection/myFeedbackDetail' //我的反馈详情


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'myFeedback',
            component: myFeedback
        },
        {
            path: '/my-feedback-detail',
            name: 'myFeedbackDetail',
            component: myFeedbackDetail
        }
    ]
})
