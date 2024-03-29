(function () {
    var __QZAppExternal = window.__QZAppExternal = window.QZAppExternal || {getCommands: function () {
        }};
    var QZAppExternal = window.QZAppExternal = {};
    var androidGetCmdTimer;
    var cbFnId = 0;
    var ua = navigator.userAgent;
//    alert("ua ia " + ua);
    var isQzone = ua.match(/qzone/i);
    var android = ua.match(/(Android)[\s\/]+([\d.]+)/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
    var ipod = !ipad && !iphone && ua.match(/(iPod).*OS\s([\d_]+)/);
    var ie = ua.match(/(MSIE)\s([\d.]+)/);
    var os = {}, util = {}, event = {};
    var hasNotify = false;
    try {
        window.external.notify('');
        hasNotify = true;
    } catch (e) {
    }
    if (ie && hasNotify) {
        os.ie = true, os.version = ie[2];
    } else if (android) {
        os.android = true, os.version = android[2];
    } else if (iphone) {
        os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.');
    } else if (ipad) {
        os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.');
    } else if (ipod) {
        os.ios = os.ipod = true, os.version = ipod[2].replace(/_/g, '.');
    }

//    for (var a in os) {
//        alert("attr is " + a + " value is " + os[a]);
//    }
    event = {fireEvent: function (type, data) {
        var e = document.createEvent("Events");
        e.initEvent(type, false, false);
        e.data = data;
        document.dispatchEvent(e);
    }};
    util = {isFn: function (fn) {
        return typeof fn === 'function';
    }, execFn: function (fn, data) {
        if (QZAppExternal._util.isFn(fn)) {
            return fn.call(window, data);
        }
        else if (typeof fn === 'string') {
            if (/\./.test(fn)) {
                var fnNameArr = fn.split('.');
                var tmp = window;
                var fnNameStr = 'window';
                for (var i = 0, l = fnNameArr.length; i < l; i++) {
                    var cur = fnNameArr[i];
                    tmp = tmp[cur];
                    fnNameStr += '[\"' + cur + '\"]';
                }
                if (tmp) {
                    if (fn.indexOf('__') === 0) {
                        return eval(fnNameStr + '(' + data + ');');
                    }
                    else {
                        return tmp.call(window, data);
                    }
                }
            }
            else {
                return window[fn].call(window, data);
            }
        }
    }, log: function (msg) {
        window.console && window.console.log && window.console.log(msg);
    }, parseData: function (data) {
        try {
            if (location.href.indexOf("/widget/mobile/test/index.html") != -1) {
                // console.log(data);
            }
            ;
            data = JSON.parse(data);
        }
        catch (e) {
            data = {code: '1001', message: 'json parse error', data: {}};
        }
        return data;
    }, requestWithIframe: function (url) {
        if (window.CONSOLE_AVAILABLE) {
            // console.log(url);
            return;
        } else if (window.PROMPT_AVAILABLE) {
            prompt("USE_PROMPT_CONNECT", url);
            return;
        }
        var tmpIframe = document.createElement('iframe');
        tmpIframe.setAttribute('width', 0);
        tmpIframe.setAttribute('height', 0);
        tmpIframe.setAttribute('style', 'display: none;');
        document.body.appendChild(tmpIframe);
        tmpIframe.src = url;
        setTimeout(function () {
            document.body.removeChild(tmpIframe);
            androidIframe = null;
        }, 1000);
    }};
    QZAppExternal._os = os;
    QZAppExternal._event = event;
    QZAppExternal._util = util;
    var wkPostMessage = function (cmd) {
        var messageHandlers;
        if (window.webkit && (messageHandlers = window.webkit.messageHandlers) && messageHandlers.qzoneBridge && messageHandlers.qzoneBridge.postMessage) {
            messageHandlers.qzoneBridge.postMessage(typeof(cmd) == 'string' ? cmd : JSON.stringify(cmd));
            return true;
        }
        return false;
    };
    QZAppExternal.wkPostMessage = wkPostMessage;
    QZAppExternal.domReady = false;
    QZAppExternal.cmdsQuene = [];
    QZAppExternal.getCommands = function () {
        var cmds = '';
        if (QZAppExternal.domReady && QZAppExternal.cmdsQuene.length > 0) {
            if (QZAppExternal._os.android) {
                cmds = JSON.stringify(QZAppExternal.cmdsQuene.shift());
                while (cmds.length < 10 * 1000 && QZAppExternal.cmdsQuene.length) {
                    cmds += ',' + JSON.stringify(QZAppExternal.cmdsQuene.shift());
                }
                QZAppExternal._util.requestWithIframe('jsbridge://' + encodeURIComponent('[' + cmds + ']'));
                if (QZAppExternal.cmdsQuene.length) {
                    setTimeout(QZAppExternal.getCommands, 200);
                }
            } else {
                cmds = JSON.stringify(QZAppExternal.cmdsQuene);
                QZAppExternal.cmdsQuene.length = 0;
            }
        }
        return cmds;
    };
    QZAppExternal.exec = function (fnName, params, cbFn) {
        var cbFnName = cbFn ? 'cbFn' + (++cbFnId) : '';
        var cmd = ['QZAppExternal.' + fnName, params, cbFn ? 'QZAppExternal.' + fnName + '.' + cbFnName : ''];
        if (cbFn) {
            QZAppExternal[fnName] = QZAppExternal[fnName] || {};
            QZAppExternal[fnName][cbFnName] = function (data) {
                if (typeof data === 'string') {
                    data = QZAppExternal._util.parseData(data);
                }
                var ___persist___ = false;
                if (data && data.data) {
                    ___persist___ = data.data.___persist___;
                    delete data.data.___persist___;
                }
                QZAppExternal._util.execFn(cbFn, data);
                if (!___persist___) {
                    QZAppExternal[fnName][cbFnName] = null;
                    delete QZAppExternal[fnName][cbFnName];
                }
            };
        }
        if (QZAppExternal._os.android) {
            QZAppExternal.cmdsQuene.push(cmd);
            if (QZAppExternal.cmdsQuene.length == 1) {
                androidGetCmdTimer = setTimeout(function () {
                    QZAppExternal.getCommands();
                }, 200);
            }
        }
        else if (QZAppExternal._os.ios) {
            if (!wkPostMessage(cmd)) {
                QZAppExternal.cmdsQuene.push(cmd);
            }
        } else if (QZAppExternal._os.ie) {
            window.external.notify(JSON.stringify(cmd));
        }
    };
    QZAppExternal._addInterface = function (fnName, opts) {
        QZAppExternal[fnName] = QZAppExternal[fnName] || function (cbFn, params) {
                var cbFnName = 'cbFn' + Math.floor((Math.random() * 1000000));
                if (typeof cbFn === 'object' && !params) {
                    params = cbFn;
                    cbFn = null;
                }
                QZAppExternal.exec(fnName, params, cbFn);
            };
    };
    QZAppExternal._addInterface('getQUA');
    QZAppExternal.getQUAEx = (function () {
        var quaArr = [];
        return function (cbFn) {
            if (QZAppExternal._util.isFn(cbFn)) {
                if (quaArr.length) {
                    cbFn({code: 0, message: 'success', data: quaArr});
                }
                else {
                    QZAppExternal.getQUA(function (data) {
                        if (data && data.data) {
                            quaArr = data.data.split('_');
                            cbFn({code: 0, message: 'success', data: quaArr});
                        }
                        else {
                            cbFn(data);
                        }
                    });
                }
            }
        };
    })();
    QZAppExternal._addInterface('getUserInfo');
    QZAppExternal._addInterface('getConn');
    QZAppExternal._addInterface('refresh');
    QZAppExternal._addInterface('data');
    var _sendData = QZAppExternal.data;
    QZAppExternal.data = (function () {
        var seg = 100 * 1000;
        return function (obj) {
            if (obj.total == 0) {
                if (obj.content.length > seg) {
                    var end = seg;
                    var len = obj.content.length;
                    var total = Math.ceil(len / seg);
                    var idx = 0;
                    while (idx < total) {
                        _sendData({key: obj.key, total: total, current: idx, type: obj.type, content: obj.content.substring(idx * seg, end < len ? end : len), params: obj.params});
                        idx++;
                        end += seg;
                    }
                } else {
                    obj.total = 1;
                    obj.current = 0;
                    _sendData(obj);
                }
            } else {
                _sendData(obj);
            }
        };
    })(), QZAppExternal._addInterface('call');
    QZAppExternal._addInterface('finish');
    QZAppExternal._addInterface('setOrientation');
    QZAppExternal.setOrientationEx = function (isVertical) {
        QZAppExternal.setOrientation({isVertical: isVertical});
    }
    var _finish = QZAppExternal.finish;
    QZAppExternal.finish = function (obj) {
        QZAppExternal.getQUAEx(function (data) {
            if (!data.data || !data.data[3] || parseFloat(data.data[3]) < 4.5) {
                _finish(obj);
            } else {
                QZAppExternal.data({key: 'finish_object', total: 0, type: 'base64', content: obj.base64});
                delete obj.base64;
                obj.photos = ['finish_object'];
                QZAppExternal.call({key: 'add_mood', type: 'operation', subtype: 'mood', params: obj});
            }
        });
    };
    QZAppExternal._addInterface('qzoneMusic');
    QZAppExternal._addInterface('qzoneBuyVip');
    QZAppExternal._addInterface('openVip');
    QZAppExternal._addInterface('closeWebview');
    QZAppExternal._addInterface('callSchema');
    QZAppExternal._addInterface('setTopbar');
    QZAppExternal._addInterface("getLocation");
    QZAppExternal._addInterface("startAccelerometer");
    QZAppExternal._addInterface("stopAccelerometer");
    QZAppExternal._addInterface("getDeviceInfo");
    QZAppExternal._addInterface("vibrate");
    QZAppExternal._addInterface("preloadSound");
    QZAppExternal._addInterface("playLocalSound");
    QZAppExternal._addInterface("playLocalBackSound");
    QZAppExternal._addInterface("stopSound");
    QZAppExternal._addInterface("stopBackSound");
    QZAppExternal._addInterface("reportScore");
    QZAppExternal._addInterface("loadgame");
    QZAppExternal._addInterface("isAppInstallIOS");
    QZAppExternal._addInterface("httpProxy");
    QZAppExternal._addInterface("setShare");
    QZAppExternal._addInterface("registerCallback");
    QZAppExternal._addInterface("webviewConsole");
    QZAppExternal._addInterface("sendShortcut");
    function AndroidAppApiExec(cmd, data, callback) {
        if (QZAppExternal.appApi) {
            data = data || {};
            data.type = cmd;
            QZAppExternal.appApi(callback, data);
        }
    }

    QZAppExternal.isAppInstall = function (packageName, callback) {
        if (QZAppExternal._os.android) {
            AndroidAppApiExec('isAppInstall', {packageName: packageName}, callback);
        }
        if (QZAppExternal._os.ios) {
            QZAppExternal.isAppInstallIOS(callback, {'schema': packageName});
        }
    }
    QZAppExternal.getAppState = function (url, callback) {
        AndroidAppApiExec('getDownloadState', {url: url}, callback);
    }
    QZAppExternal.listenDownloadState = function () {
        AndroidAppApiExec('listenDownloadState');
    }
    QZAppExternal.cancelListenDownloadState = function () {
        AndroidAppApiExec('cancelListenDownloadState');
    }
    QZAppExternal.startDownloadApp = function (data) {
        if (typeof data == "string") {
            AndroidAppApiExec('startDownload', {url: data});
        } else {
            AndroidAppApiExec('startDownload', data);
        }
    }
    QZAppExternal.installApp = function (path, callback) {
        AndroidAppApiExec('installApp', {path: path}, callback);
    }
    QZAppExternal.pauseDownloadApp = function (url) {
        AndroidAppApiExec('pauseDownload', {url: url});
    }
    QZAppExternal.cancelDownloadApp = function (url) {
        AndroidAppApiExec('cancelDownload', {url: url});
    }
    QZAppExternal._addInterface("getPageVisibility");
    QZAppExternal.fireEvent = function (params) {
        if (typeof params === 'string') {
            params = QZAppExternal._util.parseData(params);
        }
        var type = params.type;
        var data = params.data;
        if (type) {
            QZAppExternal._event.fireEvent(type, data);
        }
    };
    QZAppExternal.getPlatform = function () {
        if (isQzone && android) {
            return 1;
        } else if (isQzone && (ipad || iphone || ipod)) {
            return 2;
        } else {
            return 3;
        }
    };
    var loadFns = [];
    var whenWindowReady = function () {
        for (var i = 0, len = loadFns.length; i < len; i++) {
            loadFns[i].apply(window);
        }
    };
    QZAppExternal.ready = function (fn) {
        if (typeof(fn) == "function") {
            if (QZAppExternal.domReady) {
                fn.apply(window);
            } else {
                loadFns.push(fn);
            }
        }
    };
    QZAppExternal._addInterface('qzoneGameBar');
    QZAppExternal._addInterface('sendFeedback');
    if (QZAppExternal._os.android) {
        QZAppExternal._addInterface('appApi');
    }
    var bbsFrame;
    QZAppExternal.openBBS = function (url) {
        bbsFrame = null;
        if (!url) {
            return false;
        }
        bbsFrame = document.createElement('iframe');
        bbsFrame.style.cssText = "width:100%;height:100%;position:absolute;left:0px;top:0px;background-color:white;z-index:99999;border:none;";
        bbsFrame.src = url + "&_close=true";
        document.body.appendChild(bbsFrame);
    };
    window.addEventListener('message', function (e) {
        var c = e && e.data;
        if (c == 'close' && bbsFrame && bbsFrame.parentNode) {
            bbsFrame.parentNode.removeChild(bbsFrame);
        }
    }, false);
    (function () {
        if ('loaded|complete|interactive'.indexOf(document.readyState) == -1) {
            setTimeout(arguments.callee, 50);
        } else {
            QZAppExternal.domReady = true;
            if (QZAppExternal._os.android) {
                QZAppExternal.getCommands();
            }
            whenWindowReady();
        }
    })();
    QZAppExternal.report = function () {
        var self = this;
    };
    QZAppExternal.report.string = (function () {
        var StringReport = function (arg) {
            var tmp = {commandid: 'app' + arg.gameid, appid: '1000019', frequency: 3, dtype: 1, odetails: arg.string};
            var report = {mm_timestat: [parseParam(tmp)]};
            var base = {locuin: arg.openid || '0', touin: arg.openid || '0', deviceinfo: arg.deviceinfo || '0', dnstime: arg.dnstime || '0', httptime: arg.httptime || '0', tcptime: arg.tcptime || '0', os: arg.os || '0', sdkversion: arg.sdkversion || '0', sdkid: arg.sdkid || '0', device: arg.device || '0', releaseversion: arg.releaseversion || '0', r: Math.random()};
            var baseStr = parseParam(base);
            var img = new Image();
            img.src = 'http://mmspeed.qq.com/client/report?report_data=' + encodeURIComponent(JSON.stringify(report)) + '&comm_data=' + encodeURIComponent(baseStr);
        };

        function parseParam(obj) {
            var ret = [];
            for (var i in obj) {
                ret.push(i + "=" + encodeURIComponent(obj[i]));
            }
            return ret.join("&");
        };
        return StringReport;
    })();
    QZAppExternal.report.returnCode = (function () {
        var commurl = "http://c.isdspeed.qq.com/code.cgi", urlParse = /^http:\/\/([\s\S]*?)(\/[\s\S]*?)(?:\?|$)/;
        var s = '';
        var index = 0;
        var reportTimer;
        var img;
        var MAX_URL_LENGTH = 900;

        if(location.protocol === 'https:'){
            commurl = "https://huatuocode.weiyun.com/code.cgi";
        }

        function valueStat(arg) {
            var defaultConf = {domain: arg.domain, cgi: arg.cgi.replace(urlParse, ''), type: arg.type, code: arg.code, time: arg.time, rate: arg.rate || 10};
            if (Math.random() > 1 / defaultConf.rate)
                return;
            setTimeout(function () {
                pushData(defaultConf);
            }, 0);
        }

        var pushData = function (data) {
            index++;
            var param = [];
            param.push([index, '_', 1, '=', data.domain].join(''));
            param.push([index, '_', 2, '=', data.cgi].join(''));
            param.push([index, '_', 3, '=', data.type].join(''));
            param.push([index, '_', 4, '=', data.code].join(''));
            param.push([index, '_', 5, '=', data.time].join(''));
            param.push([index, '_', 6, '=', data.rate].join(''));
            s += '&' + param.join('&');
            clearTimeout(reportTimer);
            if (s.length >= MAX_URL_LENGTH) {
                report();
            } else {
                reportTimer = setTimeout(function () {
                    report();
                }, 2500);
            }
        };
        var report = function () {
            if (!s) {
                return;
            }
            img = new Image();
            var url = commurl + '?key=domain,cgi,type,code,time,rate&r=' + Math.random() + '&' + s;
            img.src = url;
            s = '';
            index = 0;
        };
        return valueStat;
    })();
})();
;

//for(var a in window.QZAppExternal){
//    alert('attr is '+ a + " value is " + window.QZAppExternal[a]);
//}
//alert(window.mqq);
(function (name, definition) {
    var ua = navigator.userAgent;
    var REGEXP_ANDROID = /Android/;
    var REGEXP_JSSDK = /QZONEJSSDK\/([\d\.]+)/;
    var REGEXP_QQJSSDK = /QQJSSDK\/([\d\.]+)/;
    var PROMPT_AVAILABLE = window.PROMPT_AVAILABLE = false;
    var CONSOLE_AVAILABLE = window.CONSOLE_AVAILABLE = false;
    var SDKVersion = function (re) {
        return re && re[1];
    }(ua.match(REGEXP_JSSDK));
    if (!SDKVersion) {
        SDKVersion = function (re) {
            return re && re[1];
        }(ua.match(REGEXP_QQJSSDK));
    }
    ;
    var jssdk = !!SDKVersion;
    if (!jssdk) {
        window.mqq = window.mqq || {};
        window.mqq = {invoke: function () {
            return console.log('当前环境不支持通用JSSDK.');
        }, support: function () {
            return false;
        }, addEventListener: function () {
            return console.log('当前环境不支持通用JSSDK.');
        }}
        return console.log('当前环境不支持通用JSSDK.');
    } else if (this[name]) {
        window.mqq.newVersion = ua.match(/NewVersion/i);
        return;
    }
    var mqq = this[name] = definition();
    if (mqq.iOS) {
        var qqv = function (re) {
            return re && re[1];
        }(ua.match(REGEXP_QQJSSDK));
        var qzonev = function (re) {
            return re && re[1];
        }(ua.match(REGEXP_JSSDK));
        if (mqq.compare2(qqv, qzonev) == -1) {
            SDKVersion = qzonev;
        } else {
            SDKVersion = qqv;
        }
    } else if (mqq.android) {
        //      alert('connect bridge1');
        var qqJsSdkVer = function (re) {
            return re && re[1];
        }(ua.match(REGEXP_QQJSSDK));
        //      alert('qqsdkv ' + qqJsSdkVer);
        //      alert(ua);
        //   alert(ua.match(/qzone/i));
        if (ua.match(/qzone/i) && (qqJsSdkVer >= 1.3)) {
            //          alert('connect bridge2');
            prompt("PING_FOR_OPTIMAL_PATH", "pingJsbridge://");
            console.log("pingJsbridge://");
        }
    }
    mqq.SDKVersion = SDKVersion;
    mqq.jssdk = jssdk;
    mqq.newVersion = ua.match(/NewVersion/i);
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(mqq);
    } else if (typeof module === 'object') {
        module.exports = mqq;
    }
})('mqq', function (options, undefined) {
    "use strict";
    var exports = {};
    var ua = navigator.userAgent;
    var firebug = window.MQQfirebug;
    var SLICE = Array.prototype.slice;
    var toString = Object.prototype.toString;
    var REGEXP_IOS = /(iPad|iPhone|iPod).*? (IPad)?/;
    var REGEXP_ANDROID = /Android/;
    var UUIDSeed = 1;
    var aCallbacks = {};
    var isInitEvent = false;
    if (firebug) {
        exports.debuging = true;
        ua = firebug.ua || ua;
    } else {
        exports.debuging = false;
    }
    exports.iOS = REGEXP_IOS.test(ua);
    exports.android = REGEXP_ANDROID.test(ua);
    if (exports.iOS && exports.android) {
        exports.iOS = false;
    }

    exports.version = '20150308005';
    exports.compare = function (version) {
        var a = exports.SDKVersion.split('.');
        var b = String(version).split('.');
        try {
            for (var i = 0, len = Math.max(a.length, b.length); i < len; i++) {
                var l = isFinite(a[i]) && Number(a[i]) || 0, r = isFinite(b[i]) && Number(b[i]) || 0;
                if (l < r) {
                    return-1;
                } else if (l > r) {
                    return 1;
                }
            }
        } catch (e) {
            return-1;
        }
        return 0;
    }
    exports.compare2 = function (sdkVersion, version) {
        var a = String(sdkVersion).split('.');
        var b = String(version).split('.');
        try {
            for (var i = 0, len = Math.max(a.length, b.length); i < len; i++) {
                var l = isFinite(a[i]) && Number(a[i]) || 0, r = isFinite(b[i]) && Number(b[i]) || 0;
                if (l < r) {
                    return-1;
                } else if (l > r) {
                    return 1;
                }
            }
        } catch (e) {
            return-1;
        }
        return 0;
    }
    if (!exports.android && !exports.iOS) {
        console.log('QQJSSDK: not android or ios');
    }
    function log(params) {
        var firebug = window.MQQfirebug;
        if (exports.debuging && firebug && firebug.log) {
            try {
                firebug.log(params);
            } catch (e) {
            }
        }
    }

    function storeCallback(callback) {
        var sn = UUIDSeed++;
        if (callback) {
            aCallbacks[sn] = callback;
        }
        window.aCallbacks = aCallbacks;
        return sn;
    }

    function execGlobalCallback(sn) {
        var callback = typeof sn === 'function' ? sn : aCallbacks[sn];
        var argus = SLICE.call(arguments, 1);
        if (typeof callback === 'function') {
            setTimeout(function () {
                log({sn: sn});
                callback.apply(null, argus);
            }, 0);
        } else {
            console.log('QQJSSDK: not found such callback: ' + sn);
        }
    }

    function openURL(url, ns, method, sn) {
        if (window.CONSOLE_AVAILABLE) {
            return;
        } else if (window.PROMPT_AVAILABLE) {
            prompt("USE_PROMPT_CONNECT", url);
            return;
        }

        var iframe = document.createElement('iframe');
        iframe.style.cssText = 'display:none;width:0px;height:0px;';
        var failCallback = function () {
            sn && execGlobalCallback(sn, {retcode: -201, msg: 'error'});
        };
        if (exports.iOS) {
            //       alert('open Url3');
            iframe.onload = failCallback;
            iframe.src = url;
        }
        var container = document.body || document.documentElement;
        container.appendChild(iframe);
        if (exports.android) {
            //          alert('open Url4');
            iframe.onload = failCallback;
            iframe.src = url;
        }
        log({ns: ns, method: method, url: url});
        setTimeout(function () {
            iframe.parentNode.removeChild(iframe);
        }, 0);
        return null;
    }

    function invokeClientMethod(ns, method, argus, callback) {
        if (ns == "game" && QZAppExternal[method] && !mqq.newVersion) {
            if (typeof QZAppExternal[method] === 'function') {
                QZAppExternal[method].call(arguments, callback, argus);
                return;
            }
            ;
        }
        ;
        if (doubleCallbackParams(ns, method, argus, callback)) {
            return;
        }
        ;
        if (!ns || !method) {
            return null;
        }

        var arg = arguments, cb = arg[arg.length - 1], url, sn, params;
        if (arg.length > 2) {
            if (toString.call(argus) === '[object Object]') {
                params = argus;
            } else {
                params = {};
            }
            if (typeof cb === 'function') {
                sn = storeCallback(cb);
                params.callback = String(sn);
            }
        }
        if (exports.jssdk) {
            url = 'jsbridge://' + encodeURIComponent(ns) + '/' + encodeURIComponent(method);
            if (params) {

                if (exports.nativeData && typeof exports.nativeData == "object") {
                    for (var i in exports.nativeData) {
                        params[i] = exports.nativeData[i];
                    }
                }

                url += '?p=' + encodeURIComponent(JSON.stringify(params))
            }


            if (!QZAppExternal.wkPostMessage(url)) {
                openURL(url, ns, method, sn);
            }
        }
        return null;
    }

    function addEventListener(eventName, handler) {
        if (!isInitEvent && exports.android) {
            isInitEvent = true;
            mqq.invoke('event', 'init');
        }
        if (eventName === 'qbrowserVisibilityChange') {
            document.addEventListener(eventName, handler, false);
            return true;
        }
        var evtKey = 'evt-' + eventName;
        (aCallbacks[evtKey] = aCallbacks[evtKey] || []).push(handler);
        return true;
    }

    function removeEventListener(eventName, handler) {
        var evtKey = 'evt-' + eventName;
        var handlers = aCallbacks[evtKey];
        var flag = false;
        if (!handlers) {
            return false;
        }
        if (!handler) {
            delete aCallbacks[evtKey];
            return true;
        }
        for (var i = handlers.length - 1; i >= 0; i--) {
            if (handler === handlers[i]) {
                handlers.splice(i, 1);
                flag = true;
            }
        }
        return flag;
    }

    function execEventCallback(eventName, data, source) {
        var evtKey = 'evt-' + eventName;
        var handlers = aCallbacks[evtKey];
        if (handlers) {
            handlers.forEach(function (handler) {
                execGlobalCallback(handler, data, source);
            });
        }
    }

    function dispatchEvent(eventName, data, options) {
        var params = {event: eventName, data: data || {}, options: options || {}};
        invokeClientMethod('event', 'dispatchEvent', params);
    }

    function support(fn) {
        var map = {iOS: {"mqq.qzui.topicSend": 5.5, "mqq.qzui.topicComment": 5.5, "mqq.qzui.setTransparentPullDown": 5.5, "mqq.qzui.setMessageButton": 5.5, "mqq.qzui.setUploadButton": 5.6, "mqq.qzui.topicUploadVideo": 5.7, "mqq.ui.openUrl": 5.5, "mqq.ui.pageVisibility": 5.5, "mqq.ui.setPullDown": 5.5, "mqq.ui.showPicture": 5.5, "mqq.ui.refreshTitle": 5.5, "mqq.ui.popBack": 5.5, "mqq.ui.closeWebViews": 5.5, "mqq.ui.setTitleButtons": 5.5, "mqq.ui.setLeftButton": 5.5, "mqq.ui.setRightButton": 5.5, "mqq.ui.setTitleButton": 5.5, "mqq.ui.showShareMenu": 5.5, "mqq.game.addShortcut": 5.5, "mqq.system.addGameShortcut": 5.5, "mqq.sensor.getLocation": 5.5, "mqq.device.getDeviceInfo": 5.5, "mqq.device.getClientInfo": 5.5, "mqq.device.getNetworkInfo": 5.5, "mqq.setShareInfo": 5.5, "mqq.data.pbReport": 5.5, "mqq.data.getPageLoadStamp": 5.5, "mqq.data.getPerformance": 5.5, "mqq.app.isAppInstalledBatch": 6.0, "mqq.app.isAppInstalled": 6.0, "mqq.app.launchApp": 6.0, "mqq.app.checkAppInstalled": 6.0, "mqq.app.checkAppInstalledBatch": 6.0, "mqq.addEventListener": 5.5, "mqq.removeEventListener": 5.5, "mqq.dispatchEvent": 5.5, "mqq.qzui.topicPlayVideo": '5.7.0.4', "end": 0}, android: {"mqq.qzui.topicSend": 5.5, "mqq.qzui.topicComment": 5.5, "mqq.qzui.setTransparentPullDown": 5.5, "mqq.qzui.setMessageButton": 5.5, "mqq.qzui.setUploadButton": 5.6, "mqq.qzui.topicUploadVideo": 5.7, "mqq.qzui.topicGetUgcKey": 5.7, "mqq.qzui.topicPlayVideo": 5.7, "mqq.ui.openUrl": 5.5, "mqq.ui.pageVisibility": 5.5, "mqq.ui.setPullDown": 5.5, "mqq.ui.showPicture": 5.5, "mqq.ui.refreshTitle": 5.5, "mqq.ui.popBack": 5.5, "mqq.ui.closeWebViews": 5.5, "mqq.ui.setTitleButtons": 5.5, "mqq.ui.setLeftButton": 5.5, "mqq.ui.setRightButton": 5.5, "mqq.ui.setMessageButton": 5.5, "mqq.ui.showActionSheet": 5.5, "mqq.ui.showDialog": 5.5, "mqq.ui.setTitleButton": 5.5, "mqq.ui.showShareMenu": 5.5, "mqq.game.addShortcut": 5.5, "mqq.system.addGameShortcut": 5.5, "mqq.sensor.getLocation": 5.5, "mqq.sensor.getRealLocation": 5.5, "mqq.media.playLocalSound": 5.5, "mqq.media.preloadSound": 5.5, "mqq.device.getDeviceInfo": 5.5, "mqq.device.getClientInfo": 5.5, "mqq.device.getNetworkInfo": 5.5, "mqq.setShareInfo": 5.5, "mqq.data.pbReport": 5.5, "mqq.data.getPageLoadStamp": 5.5, "mqq.data.getPerformance": 5.5, "mqq.data.deleteH5Data": 5.5, "mqq.data.writeH5Data": 5.5, "mqq.app.isAppInstalledBatch": 5.5, "mqq.app.isAppInstalled": 5.5, "mqq.app.launchApp": 5.5, "mqq.app.checkAppInstalled": 5.5, "mqq.app.checkAppInstalledBatch": 5.5, "mqq.addEventListener": 5.5, "mqq.removeEventListener": 5.5, "mqq.dispatchEvent": 5.5, "end": 0}};
        var version;
        if (exports.iOS) {
            version = map["iOS"][fn] || 100;
        } else {
            version = map["android"][fn] || 100;
        }
        if (exports.compare(version) == 1 || exports.compare(version) == 0) {
            return true;
        }
        ;
        return false;
    }

    function doubleCallbackParams(ns, method, argus, callback) {
        if (ns == "ui" && method == "setTitleButtons") {
            var left = argus["left"];
            var right = argus["right"];
            if (left) {
                mqq.invoke(ns, "setLeftButton", left, left.callback);
            }
            ;
            if (right) {
                mqq.invoke(ns, "setRightButton", right, right.callback);
            }
            ;
            return true;
        }
        ;
        return false;
    }

    function injectNativeData(data) {
        exports.nativeData = data;
    }

    function pingNativeCallback(){
        window.CONSOLE_AVAILABLE = true;
        if(exports.nativeReadyListener){
            exports.nativeReadyListener.call(null);
        }
    }

    function setNativeReadyListener(callback){
        exports.nativeReadyListener = callback;
    }

    exports.__aCallbacks = aCallbacks;
    exports.nativeReadyListener;
    exports.invoke = invokeClientMethod;
    exports.execGlobalCallback = execGlobalCallback;
    exports.addEventListener = addEventListener;
    exports.removeEventListener = removeEventListener;
    exports.execEventCallback = execEventCallback;
    exports.dispatchEvent = dispatchEvent;
    exports.support = support;
    exports.injectNativeData = injectNativeData;
    exports.pingNativeCallback = pingNativeCallback;
    exports.setNativeReadyListener = setNativeReadyListener;
    return exports;
});

//for(var a in window){
//    alert(window.mqq);
//}


(function () {
    if (window.mqq) {
        QZAppExternal.setShare = function (cbFn, params) {
            if (typeof cbFn === 'object' && !params) {
                params = cbFn;
                cbFn = null;
            }
            mqq.invoke('share', 'setShare', params, cbFn);
        };
        if (mqq.iOS && mqq.newVersion) {
            var funcMap = [
                ['game', 'getPageVisibility'],
                ['sensor', 'vibrate'],
                ['game', 'startAccelerometer'],
                ['game', 'stopAccelerometer'],
                ['game', 'getQUA'],
                ['game', 'getUserInfo'],
                ['game', 'getConn'],
                ['game', 'getDeviceInfo'],
                ['game', 'isAppInstallIOS'],
                ['game', 'loadgame'],
                ['game', 'preloadSound'],
                ['game', 'playLocalSound'],
                ['game', 'playLocalBackSound'],
                ['game', 'webviewConsole'],
                ['game', 'setOrientation'],
                ['game', 'getLocation'],
                ['game', 'stopSound'],
                ['game', 'stopBackSound'],
                ['data', 'httpProxy'],
                ['qzone', 'sendFeedback'],
                ['system', 'refresh'],
                ['qzone', 'qzoneMusic'],
                ['qzone', 'qzoneBuyVip'],
                ['qzone', 'callSchema'],
                ['system', 'closeWebview'],
                ['qzui', 'setTopbar'],
                ['qzone', 'qzoneGameBar'],
                ['qzone', 'data'],
                ['game', 'reportScore'],
                ['qzone', 'sendShortcut'],
                ['qzone', 'finish'],
                ['qzone', 'call'],
                ['qzone', 'openVip']
            ];
            for (var i = 0; i < funcMap.length; i++) {
                (function (arg) {
                    var module = funcMap[i][0];
                    var method = funcMap[i][1];
                    if (typeof QZAppExternal[method] == 'function') {
                        QZAppExternal[method] = function (cbFn, params) {
                            if (typeof cbFn === 'object' && !params) {
                                params = cbFn;
                                cbFn = null;
                            }
                            if (method == 'loadgame' && params && ('callback'in params)) {
                                params['_callback'] = params['callback'];
                            }
                            ;
                            mqq.invoke(module, method, params, cbFn);
                        };
                    }
                    ;
                })(i);
            }
            ;
        }
        ;
    }
})()