import md5 from '@/config/md5'  //新增的加密方式
import objKeySort from '@/config/sort'
export default {
    created: function () {
        var self = this
        // 当前经纬度
        window.nativeGetPosition(function (lat, lon) {
            console.log('定位')
            //alert(lat,lon)
            console.log(lat, lon)
            self.lat = lat
            self.lon = lon
        })
        // 用户id
        window.mapGetUserInfo(function (data) {
            console.log('用户表示')
            console.log(data)
            if (data) {
                self.user_id = data.userId
                self.nick_name = data.nick
            }
        })
        // 设备信息
        window.nativeDeviceInfo(function (data) {
            console.log('设备信息,mixin里面')
            console.log(data)
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
            }
        })
        window.nativeGetLocationPlace(function (data) {
            // console.log('纠错 搜索弹框')
            // console.log(data,'这块是纠错的内容')
        })

        baseUrl = 'http://maptest.sparta.html5.qq.com/ugcfeedback?cmd=/api/'
        baseUrls = 'http://maptest.sparta.html5.qq.com/ugcfeedback?qt=/api/ticket'
        searchUrl = 'http://maphttpbeta.sparta.html5.qq.com'
        nearUrl = 'https://syn0.map.qq.com'
        stopidUrl = 'https://maptest.sparta.html5.qq.com'

    },
    methods: {
        sendReq (url, param) {
            var self = this
            console.log(param,'看下这块')   
            var s=''  //拼接所有字段的和
            for (var key in objKeySort.objKeySort(param)) {
                s += objKeySort.objKeySort(param)[key];
            }
            param.sign = ''
            param.sign = md5(s+'sosomap')
            self.$http.post(url, JSON.stringify(param)).then(function (res) {
                self.loadingShow = false
                console.log(res,'-=/.')
                if (res.data.code == 0){
                    self.$router.push( {name: 'submitSuccess'})
                }
            }).catch(function (error) {
                console.log('fail')
                console.log(error)
                self.loadingShow = false
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
        checkPhoneNumber () {
            if (this.mobilePhone) {
                if (this.mobilePhone.length === 11) {
                    if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobilePhone))) {
                        window.mqq.invoke('ugc', 'showToast', {
                            'text': '请输入正确的电话号码',
                            'duration': 1
                        })
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            } else {
                return false
            }
        },

        // 节流函数
        debounce (fn, wait) {
            console.log('debounce')
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
                    console.log('debounce debounce')
                    fn.apply(context, args)
                }, wait)
            }
        }
    }
}
