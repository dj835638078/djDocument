import Vue from 'vue'
import Router from 'vue-router'

import addPoi from '../ReporterAddPoi'
import myFeedback from '@/components/myFeedback'
import myFeedbackDetail from '@/components/feedback/myFeedbackDetail' //我的反馈详情
import addFeedbackDetail from '@/components/feedback/addFeedbackDetail'
import submitSuccess from '@/components/submitSuccess'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'addPoi',
            component: addPoi
        },
        {
            path: '/my-feedback',
            name: 'myfeedback',
            component: myFeedback
        },
        {
            path: '/my-feedback-detail',
            name: 'myFeedbackDetail',
            component: myFeedbackDetail
        },
        {
            path: '/add-feedback-detail',
            name: 'addFeedbackDetail',
            component: addFeedbackDetail
        },
        {
            path: '/submit-success',
            name: 'submitSuccess',
            component: submitSuccess
        }
    ]
})
