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
import reporter from '@/components/reporter'
import roadClosed from '@/components/reporters/roadClosed'
import accident from '@/components/reporters/accident'
import congestion from '@/components/reporters/congestion'
import trafficControl from '@/components/reporters/trafficControl'
import construction from '@/components/reporters/construction'
import myFeedback from '@/components/myFeedback' 

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
            path: '/add-poi',
            name: 'addPoi',
            component: addPoi
        },
        {
            path: '/add-road',
            name: 'addRoad',
            component: addRoad
        },
        {
            path: '/add-station',
            name: 'addStation',
            component: addStation
        },
        {
            path: '/add-line',
            name: 'addLine',
            component: addLine
        },
        {
            path: '/error-poi',
            name: 'errorPoi',
            component: errorPoi
        },
        {
            path: '/error-road',
            name: 'errorRoad',
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
    ]
})
