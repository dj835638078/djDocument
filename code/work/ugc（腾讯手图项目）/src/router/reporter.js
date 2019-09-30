import Vue from 'vue'
import Router from 'vue-router'
import addPoi from '@/components/addPoi'
import addRoad from '@/components/addRoad'
import addStation from '@/components/addStation'
import addLine from '@/components/addLine'
import errorPoi from '@/components/errorPoi'
import errorRoad from '@/components/errorRoad'
import errorBusNearRoute from '@/components/errorBusNearRoute'
import errorBusLine from '@/components/errorBusLine'
import errorBusIndex from '@/components/errorBusIndex'
import reporter from '@/components/reporter'
import roadClosed from '@/components/reporters/roadClosed'
import accident from '@/components/reporters/accident'
import congestion from '@/components/reporters/congestion'
import trafficControl from '@/components/reporters/trafficControl'
import construction from '@/components/reporters/construction'
import myFeedback from '@/components/myFeedback'
import myFeedbackDetail from '@/components/feedback/myFeedbackDetail' //我的反馈详情
import addFeedbackDetail from '@/components/feedback/addFeedbackDetail'
import submitSuccess from '@/components/submitSuccess'

import errorBusRoute from '@/components/errorBus/errorBusRoute'
import errorBusOther from '@/components/errorBus/errorBusOther'
import errorBusStation from '@/components/errorBus/errorBusStation'
import errorBusNearLine from '@/components/errorBusNearLine'

export default new Router({
    routes: [
        {
            path: '/',
            name: 'reporter',
            component: reporter
        },
        {
            path: '/roadClosed',
            name: 'roadClosed',
            component: roadClosed

        },
        {
            path: '/accident',
            name: 'accident',
            component: accident
        },
        {
            path: '/congestion',
            name: 'congestion',
            component: congestion
        },
        {
            path: '/trafficControl',
            name: 'trafficControl',
            component: trafficControl
        },
        {
            path: '/construction',
            name: 'construction',
            component: construction
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
            path: '/add-poi',
            name: 'addPoiReporter',
            component: addPoi
        },
        {
            path: '/add-road',
            name: 'addRoadReporter',
            component: addRoad
        },
        {
            path: '/add-station',
            name: 'addStationReporter',
            component: addStation
        },
        {
            path: '/add-line',
            name: 'addLineReporter',
            component: addLine
        },
        {
            path: '/error-poi',
            name: 'errorPoiReporter',
            component: errorPoi
        },
        {
            path: '/error-road',
            name: 'errorRoadReporter',
            component: errorRoad
        },
        {
            path: '/error-bus-near-route',
            name: 'errorBusNearRoute',
            component: errorBusNearRoute
        },
        {
            path: '/error-bus-line',
            name: 'errorBusLine',
            component: errorBusLine
        },
        {
            path: '/submit-success',
            name: 'submitSuccess',
            component: submitSuccess
        },
        {
            path: '/error-bus-index',
            name: 'errorBusIndex',
            component: errorBusIndex
        },
        
        {
            path: '/error-bus-route',
            name: 'errorBusRoute',
            component: errorBusRoute
        },
        {
            path: '/error-bus-other',
            name: 'errorBusOther',
            component: errorBusOther
        },
        {
            path: '/error-bus-station',
            name: 'errorBusStation',
            component: errorBusStation
        },
        {
            path: '/error-bus-near-line',
            name: 'errorBusNearLine',
            component: errorBusNearLine
        },
    ]
})
