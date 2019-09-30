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
            if (data && data.status == 0) {
                callBack(data.lat, data.lon)
            } else {
                callBack(undefined, undefined)
            }
        })
}
window.nativeGetPosition = nativeGetPosition

// 获取屏幕中心点经纬度：
function nativeGetScreenCenterPoint(callBack) {
    window.mqq.invoke('ugc', 'getScreenCenterPoint', {},
        function (data) {
            if (data) {
                callBack(data.latitude, data.longitude)
            } else {
                callBack(undefined, undefined)
            }
        })
}
window.nativeGetScreenCenterPoint = nativeGetScreenCenterPoint

// 上传图片
function nativeReportPhoto(photoList, callBack) {
    window.mqq.invoke('ugc', 'reportPhoto', { photoList: photoList },
        function (data) {
            callBack(data)
        })
}
window.nativeReportPhoto = nativeReportPhoto

// 获取信息 
function nativeGetReportInfo(callback) {
    window.mqq.invoke('ugc', 'getReportInfo', {},
        function (data) {
            // console.log(data, '这块是native 里面的native_interface')
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
        //console.log(result, '这块是获取路线的信息native')
        callback(result)
    })
}
window.nativeGetRouteInfoList = nativeGetRouteInfoList

function nativeGetWalkRouteInfoList(callback) {
    window.mqq.invoke('walkScore', 'getRouteInfoList', { type: 'walk' }, function (result) {
        //console.log(result, '这块是获取步行路线的信息native')
        callback(result)
    })
}
window.nativeGetWalkRouteInfoList = nativeGetWalkRouteInfoList

function nativeGetBikeRouteInfoList(callback) {
    window.mqq.invoke('walkScore', 'getRouteInfoList', { type: 'bike' }, function (result) {
        // console.log(result, '这块是获取骑行路线的信息native')
        callback(result)
    })
}
window.nativeGetBikeRouteInfoList = nativeGetBikeRouteInfoList

//测试一下纠错的输入框的问题
function nativeGetLocationPlace(callback) {
    window.mqq.invoke("ugc", "getLocationPlace", {}, function (result) {
        // console.log(result, '看下这块是神魔')
        // if (result && result.placeName){
        //     document.getElementById("position-txt").innerText=result.placeName;
        // }
    })
}
window.nativeGetLocationPlace = nativeGetLocationPlace

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

// 设置NavBar的title名称
function nativeSetNavBarTitle(title, callback) {
    window.mqq.invoke('ugc', 'setNavBarTitle', { title }, function (result) {
        callback(result)
    })
}
window.nativeSetNavBarTitle = nativeSetNavBarTitle

//切换tab的页面
function nativeSetTabNavBarTitle(title, callback) {
    window.mqq.invoke('ugc', 'setTabNavBarTitle', { title }, function (result) {
        callback(result)
    })
}
window.nativeSetTabNavBarTitle = nativeSetTabNavBarTitle

//设置右上角按钮
function nativeSetNavBarRightButton(right = "", callback) {
    window.mqq.invoke('ugc', 'setNavBarRightButton', { right }, function (result) {
        callback(result)
    })
}
window.nativeSetNavBarRightButton = nativeSetNavBarRightButton

//设置NavBar的显示隐藏
function nativeSetNavBarVisible(visible = true, callback) {
    window.mqq.invoke('ugc', 'setNavBarVisible', { visible }, function (result) {
        callback(result)
    })
}
window.nativeSetNavBarVisible = nativeSetNavBarVisible

//设置错误信息的提示框的打开
function nativeShowToast(text, duration = 1) {
    window.mqq.invoke('ugc', 'showToast', {
        text,
        duration
    })
}
window.nativeShowToast = nativeShowToast

//上报
function nativereportData(callBack) {
    window.mqq.invoke('ugc', 'reportData', {}, {
    }, function (result) {
        callBack(result)
    })
}
window.nativereportData = nativereportData

// 判断是否登录
function checkLogin(callBack) {
    window.mqq.invoke('common', 'getUserInfo', {}, function (data) {
        if (data.loginStatus == 1) {
            callBack(data,"strat")
        } else {
            mqq.invoke("common", "login", {
                "feture": "登录后就可以提交反馈或查看反馈进度哦"
            }, function(data) {
                if (data.loginStatus == 1) {
                    callBack(data,"reStart")
                }
            });
        }
    });
}
window.checkLogin = checkLogin

// 获取poi信息
function nativeGetPoi(callBack) {
    window.mqq.invoke('poi', 'getPoi', {key: 'poi'}, function (data) {
        if (data) {
            callBack(data);
        } else {
            callBack(undefined);
        }
    })
}
window.nativeGetPoi = nativeGetPoi

// 获取ugc信息
function nativeUgcGetPoi(callBack) {
    window.mqq.invoke('ugc', 'getPoi', {key: 'poi'}, function (data) {
        if (data) {
            callBack(data);
        } else {
            callBack(undefined);
        }
    })
}
window.nativeUgcGetPoi = nativeUgcGetPoi

// 端内埋点上报
function mapDataReport(code, data) {
    if (!data) {
        data = {}
    }
    window.mqq.invoke('common', 'dataReport', {
        code,
        data
    })
}
window.mapDataReport = mapDataReport

// poi新增地点获取name
function nativeReporterAddPoiName(callBack) {
    window.mqq.invoke('ugc', 'getReporterAddPoiName', function(data) {
        if (data && data.poiName) {
            callBack(data.poiName)
        } else {
            callBack(undefined)
        }
    })
}
window.nativeReporterAddPoiName = nativeReporterAddPoiName

