// 获取设备信息
function nativeDeviceInfo(callBack) {
    window.mqq.invoke('common', 'getDeviceInfo', {}, function (data) {
        if (data) {
            callBack(data)
        } else {
            callBack(undefined)
        }
    })
}
window.nativeDeviceInfo = nativeDeviceInfo

// 获取用户信息
function mapGetUserInfo(callback) {
    window.mqq.invoke('common', 'getUserInfo', {}, callback)
}
window.mapGetUserInfo = mapGetUserInfo

// 获取经纬度：
function nativeGetPosition(callBack) {
    window.mqq.invoke('common', 'getPosition', {},
        function (data) {
            // console.log(data.time,'=-=-=-888')
            if (data && data.status == 0) {
                callBack(data.lat, data.lon)
            } else {
                callBack(undefined, undefined)
            }
        })
}
window.nativeGetPosition = nativeGetPosition

// 上传图片
function nativeReportPhoto(photoList, callBack) {
    window.mqq.invoke('ugc', 'reportPhoto', { photoList: photoList },
        function (data) {
            callBack(data)
        })
}
window.nativeReportPhoto = nativeReportPhoto

// 获取信息 poi
function nativeGetReportInfo(callback) {
    window.mqq.invoke('ugc', 'getReportInfo', {},
        function (data) {
            console.log(data, '这块是native 里面的native_interface')
            /* data.poiName //poi名称，新增可以为空，纠错必须有值
                data.poiAddr //poi地址，新增可以为空，纠错必须有值
                data.type  //上报类型，初定1为新增、2为纠错，后面可能根据后台的字段定义做修改*/
            callback(data)
        })
}
window.nativeGetReportInfo = nativeGetReportInfo

// 获取路线信息
function nativeGetRouteInfoList(callback) {
    window.mqq.invoke('walkScore', 'getRouteInfoList', { type: 'car' }, function (result) {
        console.log(result, '这块是获取路线的信息native')
        callback(result)
    })
}
window.nativeGetRouteInfoList = nativeGetRouteInfoList

function nativeGetWalkRouteInfoList(callback) {
    window.mqq.invoke('walkScore', 'getRouteInfoList', { type: 'walk' }, function (result) {
        console.log(result, '这块是获取步行路线的信息native')
        callback(result)
    })
}
window.nativeGetWalkRouteInfoList = nativeGetWalkRouteInfoList

function nativeGetBikeRouteInfoList(callback) {
    window.mqq.invoke('walkScore', 'getRouteInfoList', { type: 'bike' }, function (result) {
        console.log(result, '这块是获取骑行路线的信息native')
        callback(result)
    })
}
window.nativeGetBikeRouteInfoList = nativeGetBikeRouteInfoList

//测试一下纠错的输入框的问题
function nativeGetLocationPlace(callback) {
    window.mqq.invoke("ugc", "getLocationPlace", {}, function (result) {
        console.log(result, '看下这块是神魔')
        // if (result && result.placeName){
        //     document.getElementById("position-txt").innerText=result.placeName;
        // }
    })
}
window.nativeGetLocationPlace = nativeGetLocationPlace

//右上角 按钮的问题
function nativeSetNavBarRightButton(callback) {
    window.mqq.invoke('ugc', 'setNavBarRightButton', { right: '我的反馈' }, function (result) {
        console.log(result, '这块是右上角按钮问题')
        callback(result)
    })
}
window.nativeSetNavBarRightButton = nativeSetNavBarRightButton

//back 事件
function nativeGetNavBarBackClick(callback) {
    window.mqq.invoke('ugc', 'getNavBarBackClick', {}, callback)
}
window.nativeGetNavBarBackClick = nativeGetNavBarBackClick

//原生的back点击 index
function nativePerformNavBarBackClick(callback) {
    window.mqq.invoke('ugc', 'performNavBarBackClick', {}, callback)
}
window.nativePerformNavBarBackClick = nativePerformNavBarBackClick

//标题事件
function nativeSetNavBarTitle(callback) {
    window.mqq.invoke('ugc', 'setNavBarTitle', { title: '' }, function (result) {
        console.log(result, '这块是标题')
        callback(result)
    })
}
window.nativeSetNavBarTitle = nativeSetNavBarTitle

//上报
function nativereportData(callBack) {
    window.mqq.invoke('ugc', 'reportData', {}, {
    }, function (result) {
        console.log(result)
        callBack(result)
    })
}
window.nativereportData = nativereportData

// 判断是否登录
function checkLogin(callBack) {
    mqq.invoke('common', 'getUserInfo', {}, function (data) {
        if (data.loginStatus == 1) {
            callBack()
        } else {
            mqq.invoke("common", "login", {
                "feture": "请登录"
            }, function(data) {
                if (data.loginStatus == 1) {
                    callBack()
                }
            });
        }
    });
}
window.checkLogin = checkLogin
