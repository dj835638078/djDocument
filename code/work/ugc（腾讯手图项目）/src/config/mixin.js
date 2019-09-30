import md5 from '@/config/md5'  //新增的加密方式
import objKeySort from '@/config/sort'
export default {
    created: function () {
        var self = this
        //清空右上角按钮
        window.nativeSetNavBarRightButton()
        // 当前经纬度
        window.nativeGetPosition(function (lat, lon) {
            //console.log('定位',lat,lon)
            self.lat = lat
            self.lon = lon
        })
        // 屏幕中心点经纬度
        window.nativeGetScreenCenterPoint(function (latitude, longitude) {
            self.latitude = latitude
            self.longitude = longitude
            //console.log(self.latitude,self.longitude,'这个是屏幕中心点经纬度')
        })
        // 用户id
        window.mapGetUserInfo(function (data) {
            // console.log('用户表示')
            if (data) {
                self.user_id = data.userId
                self.nick_name = data.nick
            }
        })
        // 设备信息
        window.nativeDeviceInfo(function (data) {
            // console.log('设备信息,mixin里面')
            // console.log(data,'设备信息')
            if (data) {
                if (!self.userId) {
                    self.userId = data.imei
                }
                var netType = {
                    'wifi': 1,
                    '2g': 2,
                    '3g': 3,
                    '4g': 4,
                    '5g': 5,
                    '未知网络类型': 0
                }
                self.deviceInfoAll = data
                self.deviceInfo = {}
                self.deviceInfo.app_version = data.appVersion || ""
                //self.deviceInfo.net_type = netType[data.netType] || 0
                self.deviceInfo.net_type = netType[data.netType]
                self.deviceInfo.imei = data.imei || ""
                self.deviceInfo.imsi = data.imsi || ""
                self.deviceInfo.machine_model = data.machineModel || ""
                self.deviceInfo.os_version = data.osVersion || ""
                //self.deviceInfo.machine_model = data.model
                self.deviceInfo.phone_brand = data.brand || ""
                self.deviceInfo.qimei = data.qimei || ""
                self.deviceInfo.channel_id = data.channel || ""
            }
        })
        window.nativeGetLocationPlace(function (data) {
            // console.log('纠错 搜索弹框')
            // console.log(data,'这块是纠错的内容')
        })

        //baseUrl = 'http://maptest.sparta.html5.qq.com/ugcfeedback?cmd=/api/'
        baseUrl = 'http://syn0.map.qq.com/ugcfeedback'//正式环境地址
        // baseUrl = 'http://maptest.sparta.html5.qq.com/ugcfeedback'//测试环境地址
        //baseUrls = 'http://maptest.sparta.html5.qq.com/ugcfeedback?qt=/api/ticket'
        searchUrl = 'http://syn0.map.qq.com'  //正式环境地址
        // searchUrl = 'http://maphttpbeta.sparta.html5.qq.com'  //测试环境地址
        nearUrl = 'https://syn0.map.qq.com'
        stopidUrl = 'https://syn0.map.qq.com'
        subwayidUrl = 'https://search.map.qq.com'
        
        if (/Android [4-6]/.test(navigator.appVersion)) {
           window.addEventListener('resize', function () {
             if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
                window.setTimeout(function () {
                  document.activeElement.scrollIntoViewIfNeeded();
                }, 0)
              }
           })
        }
    },
    methods: {
        sendReq (url, param, returnToNative) {
            var self = this
            if(!navigator.onLine){
                window.nativeShowToast('网络异常')
                return
            }
            // console.log(param,'看下这块')   
            var s=''  //拼接所有字段的和
            for (var key in objKeySort(param)) {
                s += objKeySort(param)[key];
            }
            param.sign = ''
            param.sign = md5(s+'sosomap')
            self.$http.post(url, JSON.stringify(param)).then(function (res) {
                self.loadingShow = false
                if (res.data.code == 0){
                    if (param && param.phone) {
                        localStorage.setItem('mobilePhone', param.phone);
                    }
                    self.$router.push({name: 'submitSuccess', query:{ returnToNative: returnToNative}})
                } else {
                    if(navigator.onLine){
                        window.nativeShowToast('提交失败')
                    }else{
                        window.nativeShowToast('网络异常')
                    }
                }
            }).catch(function (error) {
                self.loadingShow = false
                if(navigator.onLine){
                    window.nativeShowToast('提交失败')
                }else{
                    window.nativeShowToast('网络异常')
                }
            })
        },
        //毫秒转换成年月日（日期）
        getMyDate (str) {
            var oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth()+1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay) +' '+ addZero(oHour) +':'+
        addZero(oMin) +':'+addZero(oSen);
            return oTime;
        },
        //补零操作
        addZero(num){
            if(parseInt(num) < 10){
                num = '0'+num;
            }
            return num;
        },
        // 电话校验
        checkPhoneNumber (flag) {
            if (this.mobilePhone) {
                if (this.mobilePhone.length === 11) {
                    if (!(/^1(3|4|5|6|7|8)\d{9}$/.test(this.mobilePhone))) {
                        window.nativeShowToast('请输入正确的电话号码')
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            } else {
                return flag ? true : false;
            }
        },
        // 地点电话校验
        checkPoiPhoneNumber (val) {
            if (val) {
                if (new RegExp("[\\u4E00-\\u9FFF]+","g").test(val) ||/[a-zA-Z]/.test(val)) {
                    window.nativeShowToast('请输入正确的地点电话')
                    return false
                } else {
                    return true
                }
            } else {
                return true
            }
        },
        // 必填描述校验
        checkDesLength(){
            if (this.description && this.description.length < 5) {
                window.nativeShowToast('问题描述至少5字')
                return false
            } else {
                return true
            }
        },
        //反馈描述转换
        changeDes(type,title,des,name){
            if (type == 1001 || type == 1002 || type == 2100|| type == 2200|| type == 3001 ) {
                if (name || title) {
                    return title + name
                } else {
                    return ""
                }
            } else if (type == 1101 || type == 1102 || type == 1103 || type == 1104 || type == 2301 || type == 2302 || type == 2303 || type == 2304 || type == 2401 || type == 2402 || type == 2403 || type == 2404 || type == 2501 || type == 2502 || type == 2503 || type == 3101 || type == 3102 || type == 3103 || type == 3104) {
                if (name || title) {
                    return name + title
                } else {
                    return ""
                }
            } else {
                return des
            }
        },
        // 节流函数
        debounce (fn, wait) {
            // console.log('debounce')
            if (!wait) {
                wait = 500
            }
            var timer = null;
            return function () {
                var context = this
                var args = arguments
                if (timer) {
                    clearTimeout(timer);
                    timer = null;
                }
                timer = setTimeout(function () {
                    fn.apply(context, args)
                }, wait)
            }
        }
    }
}
