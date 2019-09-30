import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import addPoi from '@/components/addPoi'/* 新增地点 */
import addRoad from '@/components/addRoad'/* 新增道路 */
import addStation from '@/components/addStation'/* 新增车站 */
import addLine from '@/components/addLine'/* 新增线路 */
import errorPoi from '@/components/errorPoi'/* 地点报错 */
import errorPoiRoute from '@/components/errorPoiRoute'/*  */
import errorRoad from '@/components/errorRoad'/* 道路报错 */
import errorBusNearLine from '@/components/errorBusNearLine'/* 附近公交线路报错 */
import errorBusLine from '@/components/errorBusLine'/* 公交线报错 */
import errorBusIndex from '@/components/errorBusIndex'/* 公交站报错 */
import errorBusNearRoute from '@/components/errorBusNearRoute'/* 附近公交线报错 */
import errorBusStation from '@/components/errorBus/errorBusStation'/* 车站报错 */
import busLine from '@/components/subComponents/busLine'/* 选择线路 */
import chooseBusLine from '@/components/subComponents/chooseBusLine'/* 多余线路 */

import errorBusRoute from '@/components/errorBus/errorBusRoute'/* 途径线路错误 */
import errorBusOther from '@/components/errorBus/errorBusOther'/* 纠错其他问题 */
import submitSuccess from '@/components/submitSuccess'/* 提交成功 */
import noSite from '@/components/subComponents/noSite'/*  */
import noNetwork from '@/components/subComponents/noNetwork'/*  */

import InaccuratePositioning from '@/components/InaccuratePositioning'/* 定位不准 */
import startPositionIndex from '@/components/startPositionIndex'/* 定位不准 */
import startPosition from '@/components/positionFunction/startPosition'/* 开启定位 */
import noPosition from '@/components/positionFunction/noPosition'/* 定位不准 */
import unableLocate from '@/components/positionFunction/unableLocate'/* 无法定位 */
import weekGps from '@/components/positionFunction/weekGps'/* GPS信号弱 */

import driveRecord from '@/components/driveRecord'/* 驾车记录 */
import otherDriveNavigation from '@/components/drive/otherDriveNavigation'/* 其他驾车导航问题 */
import driveNavigation from '@/components/drive/driveNavigation'/* 驾车导航 */
import otherUsageIssue from '@/components/otherUsageIssue'/* 其他使用问题 */

import myFeedback from '@/components/myFeedback'/* 我的反馈 */
import myFeedbackDetail from '@/components/feedback/myFeedbackDetail'/* 我的反馈详情 */
import addFeedbackDetail from '@/components/feedback/addFeedbackDetail'/* 我的反馈详情 */
import feedbackSuccess from '@/components/feedback/feedbackSuccess'/* 我的反馈详情 */

import busFunction from '@/components/busFunction'/* 公交功能 */
import walkRecord from '@/components/walkRecord'/* 步行导航 */
import otherWalkNavigation from '@/components/drive/otherWalkNavigation'/* 其他步行导航问题 */
import walkNavigation from '@/components/drive/walkNavigation'/* 步行导航 */

import rideRecord from '@/components/rideRecord'/* 骑行导航 */
import otherRideNavigation from '@/components/drive/otherRideNavigation'/* 其他骑行导航问题 */
import rideNavigation from '@/components/drive/rideNavigation'/* 骑行导航 */

import mapUsageHelp from '@/components/mapUsageHelp'/* 查看地图使用帮助 */
import howContact from '@/components/feedback/howContact'/* 如何反馈 */
import addFeedback from '@/components/feedback/addFeedback'/* 如何反馈 */

import otherFunction from '@/components/other/otherFunction'/* 查看地图使用帮助里面的文案[其他] */
import zeroFlow from '@/components/other/zeroFlow'
import streetView from '@/components/other/streetView'
import howUsePosition from '@/components/other/howUsePosition'
import leakInformation from '@/components/other/leakInformation'
import howContactUs from '@/components/other/howContactUs'
import checkFlow from '@/components/other/checkFlow' 
import zoomMap from '@/components/other/zoomMap'
import threeMap from '@/components/other/threeMap'
import satelliteMap from '@/components/other/satelliteMap'
import howLogin from '@/components/other/howLogin'
import checkRoad from '@/components/other/checkRoad'
import queryRoute from '@/components/other/queryRoute'
import howSearch from '@/components/other/howSearch'

import zeroFlowMode from '@/components/other/zeroFlowMode'
import isFree from '@/components/other/isFree'
import differZeroOff from '@/components/other/differZeroOff'
import startZeroFlow from '@/components/other/startZeroFlow'

import reporter from '@/components/reporter'
import roadClosed from '@/components/reporters/roadClosed'
import accident from '@/components/reporters/accident'
import congestion from '@/components/reporters/congestion'
import trafficControl from '@/components/reporters/trafficControl'
import construction from '@/components/reporters/construction'

import upGreadeUse from '@/components/other/upGreadeUse'
import howContactUse from '@/components/other/howContactUse'
import howSearchConsistent from '@/components/other/howSearchConsistent'
import zeroDiff from '@/components/other/zeroDiff'
import updaTeno from '@/components/other/updaTeno'
import downLoadNeed from '@/components/other/downLoadNeed'
import abnormalFunction from '@/components/other/abnormalFunction'
import streetViewError from '@/components/other/streetViewError'
import inaccuratePosition from '@/components/other/inaccuratePosition'
import mapTip from '@/components/other/mapTip'
import downloadFailed from '@/components/other/downloadFailed'
import locationProblem from '@/components/other/locationProblem'
import newInstitution from '@/components/other/newInstitution'
import errorNotification from '@/components/other/errorNotification'
import lineChange from '@/components/other/lineChange'
import nameNotshown from '@/components/other/nameNotshown'
import noInforMation from '@/components/other/noInforMation'
import labelMerchant from '@/components/other/labelMerchant'
Vue.use(Router)

const router =  new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/add-poi',
            name: 'addPoiFeedback',
            component: addPoi
        },
        {
            path: '/add-road',
            name: 'addRoadFeedback',
            component: addRoad
        },
        {
            path: '/add-line',
            name: 'addLineFeedback',
            component: addLine
        },
        {
            path: '/add-station',
            name: 'addStationFeedback',
            component: addStation
        },
        {
            path: '/error-poi',
            name: 'errorPoiFeedback',
            component: errorPoi
        },
        {
            path: '/error-poi-route',
            name: 'errorPoiRoute',
            component: errorPoiRoute
        },
        {
            path: '/error-road',
            name: 'errorRoadFeedback',
            component: errorRoad
        },
        {
            path: '/error-bus-near-line',
            name: 'errorBusNearLineFeedback',
            component: errorBusNearLine
        },
        {
            path: '/error-bus-line',
            name: 'errorBusLineFeedback',
            component: errorBusLine
        },
        {
            path: '/error-bus-index',
            name: 'errorBusIndex',
            component: errorBusIndex
        },
        {
            path: '/error-bus-near-route',
            name: 'errorBusNearRouteFeedback',
            component: errorBusNearRoute
        },
        {
            path: '/error-bus-station',
            name: 'errorBusStationFeedback',
            component: errorBusStation
        },
        {
            path: '/bus-line',
            name: 'busLine',
            component: busLine
        },
        {
            path: '/choose-bus-line',
            name: 'chooseBusLine',
            component: chooseBusLine
        },
        {
            path: '/error-bus-route',
            name: 'errorBusRouteFeedback',
            component: errorBusRoute
        },
        {
            path: '/error-bus-other',
            name: 'errorBusOtherFeedback',
            component: errorBusOther
        },
        {
            path: '/submit-success',
            name: 'submitSuccess',
            component: submitSuccess
        },
        {
            path: '/no-site',
            name: 'noSite',
            component: noSite
        },
        {
            path: '/no-network/:type',
            name: 'noNetwork',
            component: noNetwork
        },
        {
            path: '/Inaccurate-positioning',
            name: 'InaccuratePositioning',
            component: InaccuratePositioning
        },
        {
            path: '/start-position-index',
            name: 'startPositionIndex',
            component: startPositionIndex
        },
        {
            path: '/start-position',
            name: 'startPosition',
            component: startPosition
        },
        {
            path: '/no-position',
            name: 'noPosition',
            component: noPosition
        },
        {
            path: '/week-gps',
            name: 'weekGps',
            component: weekGps
        },
        {
            path: '/unable-locate',
            name: 'unableLocate',
            component: unableLocate
        },
        {
            path: '/drive-record',
            name: 'driveRecord',
            component: driveRecord
        },
        {
            path: '/other-drive-navigation',
            name: 'otherDriveNavigation',
            component: otherDriveNavigation
        },
        {
            path: '/drive-navigation',
            name: 'driveNavigation',
            component: driveNavigation
        },
        {
            path: '/other-usage-issue',
            name: 'otherUsageIssue',
            component: otherUsageIssue
        },
        {
            path: '/my-feedback',
            name: 'myFeedback',
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
            path: '/feedback-sucess',
            name: 'feedbackSuccess',
            component: feedbackSuccess
        },
        {
            path: '/bus-function',
            name: 'busFunction',
            component: busFunction
        },
        {
            path: '/walk-record',
            name: 'walkRecord',
            component: walkRecord
        },
        {
            path: '/other-walk-navigation',
            name: 'otherWalkNavigation',
            component: otherWalkNavigation
        },
        {
            path: '/walk-navigation',
            name: 'walkNavigation',
            component: walkNavigation
        },
        {
            path: '/ride-record',
            name: 'rideRecord',
            component: rideRecord
        },
        {
            path: '/other-ride-navigation',
            name: 'otherRideNavigation',
            component: otherRideNavigation
        },
        {
            path: '/ride-navigation',
            name: 'rideNavigation',
            component: rideNavigation
        },
        {
            path: '/map-usage-help',
            name: 'mapUsageHelp',
            component: mapUsageHelp
        },
        {
            path: '/how-contact',
            name: 'howContact',
            component: howContact
        },
        {
            path: '/how-search-consistent',
            name: 'howSearchConsistent',
            component: howSearchConsistent
        },
        {
            path: '/how-contact-use',
            name: 'howContactUse',
            component: howContactUse
        },
        {
            path: '/add-feedback',
            name: 'addFeedback',
            component: addFeedback
        },
        {
            path: '/other-function',
            name: 'otherFunction',
            component: otherFunction
        },
        {
            path: '/zero-flow',
            name: 'zeroFlow',
            component: zeroFlow
        },
        {
            path: '/street-view',
            name: 'streetView',
            component: streetView
        },
        {
            path: '/how-use-position',
            name: 'howUsePosition',
            component: howUsePosition
        },
        {
            path: '/leak-information',
            name: 'leakInformation',
            component: leakInformation
        },
        {
            path: '/how-contact-us',
            name: 'howContactUs',
            component: howContactUs
        },
        {
            path: '/check-flow',
            name: 'checkFlow',
            component: checkFlow
        },
        {
            path: '/zoom-map',
            name: 'zoomMap',
            component: zoomMap
        },
        {
            path: '/three-map',
            name: 'threeMap',
            component: threeMap
        },
        {
            path: '/satellite-map',
            name: 'satelliteMap',
            component: satelliteMap
        },
        {
            path: '/how-login',
            name: 'howLogin',
            component: howLogin
        },
        {
            path: '/check-road',
            name: 'checkRoad',
            component: checkRoad
        },
        {
            path: '/query-route',
            name: 'queryRoute',
            component: queryRoute
        },
        {
            path: '/how-search',
            name: 'howSearch',
            component: howSearch
        },
        {
            path: '/zero-flow-mode',
            name: 'zeroFlowMode',
            component: zeroFlowMode
        },
        {
            path: '/upgread-use',
            name: 'upGreadeUse',
            component: upGreadeUse
        },
        {
            path: '/is-free',
            name: 'isFree',
            component: isFree
        },
        {
            path: '/differ-zero-off',
            name: 'differZeroOff',
            component: differZeroOff
        },
        {
            path: '/start-zero-flow',
            name: 'startZeroFlow',
            component: startZeroFlow
        },
        {
            path: '/reporter',
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
            path: '/zero-diff',
            name: 'zeroDiff',
            component: zeroDiff
        },
        {
            path: '/update-no',
            name: 'updaTeno',
            component: updaTeno
        },
        {
            path: '/download-need',
            name: 'downLoadNeed',
            component: downLoadNeed
        },
        {
            path: '/abnormal-function',
            name: 'abnormalFunction',
            component: abnormalFunction
        },
        {
            path: '/street-view-error',
            name: 'streetViewError',
            component: streetViewError
        },
        {
            path: '/inaccurate-position',
            name: 'inaccuratePosition',
            component: inaccuratePosition
        },
        {
            path: '/map-tip',
            name: 'mapTip',
            component: mapTip
        },
        {
            path: '/download-failed',
            name: 'downloadFailed',
            component: downloadFailed
        },
        {
            path: '/location-problem',
            name: 'locationProblem',
            component: locationProblem
        },
        {
            path: '/new-institution',
            name: 'newInstitution',
            component: newInstitution
        },
        {
            path: '/new-institution',
            name: 'newInstitution',
            component: newInstitution
        },
        {
            path: '/error-notification',
            name: 'errorNotification',
            component: errorNotification
        },
        {
            path: '/line-change',
            name: 'lineChange',
            component: lineChange
        },
        {
            path: '/name-notshown',
            name: 'nameNotshown',
            component: nameNotshown
        },
        {
            path: '/no-information',
            name: 'noInforMation',
            component: noInforMation
        },
        {
            path: '/label-merchant',
            name: 'labelMerchant',
            component: labelMerchant
        }
    ]
})
// router.beforeEach((to, from, next) => {
//     document.activeElement.blur();
//     next()
// })
export default router;
