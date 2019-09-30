!
    function (a) {
        chrome.runtime.getBackgroundPage(function (b) {
            !function (c) {
                //页面加载时判断是否登录/登录是否超过12小时
                var box = '<li class="listBox" style="width:100%;margin-top:38px;border-bottom:1px solid #EAEAEA;height:85px;padding-bottom:15px;position: relative;"><div style="width:3px;height:23px;background:#5675f5;position: absolute;left: 12px;top: -30px"></div><div class="textBtn" style="position:absolute;top:-30px;left:20px;width:280px;height:32px;"><textarea maxlength="20" class="textName" title="" value="" placeholder="请输入名称" ></textarea></div><div class="colorSelect chrome-extension-mutihighlight-style-1" style="position: absolute;left:320px;top:-30px;cursor:pointer; width: 50px;height: 23px;float:left;margin-left:10px;"></div><div class="highlight-words1" id="highlight-words" style="width: 440px;float: left;margin-left:10px;" ><textarea class="content"  style="width: 100%;min-height:80px;border-radius:4px;resize:none" placeholder="请输入高亮词，多个以空格隔开"></textarea></div><div style="width:25px;height:23px;float:left;margin-left:18px;"></div><span title="启用/禁用" class="switcher setBtn" data-on="true" style="position: absolute;left: 398px;top: -30px;"><i></i></span><img class="rem" style="width:14px;height:14px;position: absolute;left: 438px;top: -28px" src="img/delete.svg" /></li>'
                var apiUrl = "http://139.159.149.124:38081"
                $(".setUrl").val(apiUrl)
                function isLogin() {
                    var loginTimeSaved
                    if (localStorage.getItem("loginTime")) {
                        loginTimeSaved = localStorage.getItem("loginTime")
                    }
                    //var loginTimeSaved = localStorage.getItem("loginTime") && localStorage.getItem("loginTime")
                    var timeCurrent = (new Date()).getTime()
                    if (loginTimeSaved) {
                        if (timeCurrent >= loginTimeSaved) {
                            $("#login").val("登录")
                            $("#update")[0].style.display = "none"
                            localStorage.removeItem("loginTime")
                            localStorage.removeItem("loginData")
                        } else {
                            $("#login").val("退出")
                            $("#update")[0].style.display = "inline-block"
                        }
                    } else {
                        $("#login").val("登录")
                        $("#update")[0].style.display = "none"
                    }
                }
                isLogin()
                function clock() {
                    isLogin()
                }
                setInterval(clock, 1000 * 60 * 5)
                $(".setUrl").change(function () {
                    apiUrl = $(".setUrl").val()
                })
                // dj
                for (var index = 1; index < 21; index++) {
                    $(".colorBox").append("<li class=chrome-extension-mutihighlight-style-" + index + "></li>")
                }
                var indexFlag;
                var listData = []
                $("#add").click(function () {
                    $("#text-box").prepend(box)
                    var obj = {
                        colour: 1,
                        data: "",
                        status: 1,
                        name: "",
                    }
                    listData.unshift(obj)
                });

                //点击其他地方关闭弹框
                $(document).on("click", function (e) {
                    if ($(e.target).closest('.colorSelect').length > 0) {

                    } else {
                        if ($(e.target).closest('.colorBox').length > 0) {

                        } else {
                            $(".colorBox")[0].style.display = "none"
                        }
                    }

                })
                //dj登录按钮点击事件
                $("body").on("click", "#login", function () {
                    var loginFlag = $(this).val();
                    if (loginFlag == "登录") {
                        $(".loginBox")[0].style.display = "flex"
                        $(".fwmAccount").val("")
                        $(".passWords").val("")
                    }
                    if (loginFlag == "退出") {
                        $("#update")[0].style.display = "none"
                        //清缓存
                        localStorage.removeItem("loginTime")
                        localStorage.removeItem("loginData")
                        $("#login").val("登录")
                    }
                    // loginFlag == "登录" ? $(this).val("退出") : $(this).val("登录")

                })
                //dj登录确认按钮点击事件
                $("body").on("click", "#loginBtn", function () {
                    var data = {
                        fwmAccount: $(".fwmAccount").val(),
                        passWords: $(".passWords").val()
                    }
                    $.ajax({
                        type: "post",
                        url: apiUrl + "/manage/publicservice/pcommon/highlight/login",
                        data: JSON.stringify(data),
                        contentType: 'application/json',
                        success: function (result) {
                            if (result.code == 1) {
                                $(".loginBox")[0].style.display = "none"
                                $("#update")[0].style.display = "inline-block"
                                $("#login").val("退出")
                                $(".loginFail").text("")
                                $(".urlBox")[0].style.display = "none"
                                var timestamp = (new Date()).getTime() + 24 * 60 * 60 * 1000
                                localStorage.setItem("loginTime", timestamp)
                                localStorage.setItem("loginData", JSON.stringify(result.data))
                            } else {
                                $(".loginFail").text(result.message)
                            }
                        }
                    });

                })
                //dj更新按钮点击
                $("body").on("click", "#update", function () {
                    var userToken = JSON.parse(localStorage.getItem("loginData")).authorization
                    $.ajax({
                        type: "post",
                        url: apiUrl + "/manage/publicservice/pcommon/highlight/query",
                        headers: {
                            contentType: 'application/json',
                            Authorization: userToken//此处放置请求到的用户token
                        },
                        success: function (result) {
                            if (result && result.length) {
                                $("#text-box").html("")
                                c.setKeywordsString2(result);
                                for (var i = 0; i < result.length; i++) {
                                    $("#text-box").append(box)
                                    $('.content')[i].value = result[i].data
                                    if (result[i].name) {
                                        $(".textName")[i].value = result[i].name
                                    } else {
                                        $(".textName")[i].value = ""
                                    }

                                    $($(".colorSelect")[i]).addClass("chrome-extension-mutihighlight-style-" + result[i].colour)
                                    if (result[i].status == 1) {
                                        $($('.setBtn')[i]).attr("data-on", "true" == 'true')
                                    } else {
                                        $($('.setBtn')[i]).attr("data-on", "true" == 'false')
                                    }
                                }
                            } else {
                                alert("暂无配置")
                            }
                        }
                    });
                })
                //dj登录取消按钮点击事件
                $("body").on("click", "#loginCancelBtn", function () {
                    $(".loginBox")[0].style.display = "none"
                    $(".loginFail").text("")
                })
                //dj设置url按钮点击事件
                $("body").on("click", "#loginSet", function () {
                    ($(".urlBox")[0].style.display == "none" || !($(".urlBox")[0].style.display)) ? $(".urlBox")[0].style.display = "block" : $(".urlBox")[0].style.display = "none"

                })
                // dj触发颜色弹框
                $("body").on("click", ".colorSelect", function () {
                    indexFlag = $(".colorSelect").index($(this))
                    $(".colorBox")[0].style.display = "block"

                })
                // dj触发颜色弹框点击事件
                $(".colorBox").on("click", "li", function (event) {
                    $(".colorBox")[0].style.display = "none"
                    for (var index = 1; index < 21; index++) {
                        if ($($(".colorSelect")[indexFlag]).hasClass("chrome-extension-mutihighlight-style-" + index)) {
                            $($(".colorSelect")[indexFlag]).removeClass("chrome-extension-mutihighlight-style-" + index)
                        }
                    }
                    $($(".colorSelect")[indexFlag]).addClass("chrome-extension-mutihighlight-style-" + ($("li").index($(this)) + 1))
                    //zx
                    listData[indexFlag].colour = $("li").index($(this)) + 1
                    c.setKeywordsString2(listData);
                })
                //关键词名称设置
                $("body").on("keyup", '.textName', function (event, index) {
                    listData[$(".textName").index($(this))].name = $.trim($(".textName")[$(".textName").index($(this))].value)
                    $($('.textName')[$(".textName").index($(this))]).attr("title", listData[$(".textName").index($(this))].name)
                    //     //设置localStorage
                    c.setKeywordsString2(listData);
                })
                $("body").on("keyup", '.content', function (event, index) {
                    listData[$(".content").index($(this))].data = $(this)[0].value
                    //设置localStorage
                    c.setKeywordsString2(listData);
                })
                //点击删除元素
                $("body").on("click", '.rem', function (event, index) {
                    //点击截取数组中的对应下标
                    listData.splice($(".rem").index($(this)), 1)
                    //删除元素
                    $('.listBox')[$(".rem").index($(this))].remove();
                    //设置localStorage
                    c.setKeywordsString2(listData);
                })
                //点击启用禁用          
                $("body").on("click", '.setBtn', function (event, index) {
                    //点击截取数组中的对应下标
                    if (listData[($(".setBtn").index($(this)))].status == 1) {
                        listData[($(".setBtn").index($(this)))].status = 0
                        $($('.setBtn')[$(".setBtn").index($(this))]).attr("data-on", "true" == $($('.setBtn')[$(".setBtn").index($(this))]).attr("data-on") ? "false" : "true")
                    } else {
                        listData[($(".setBtn").index($(this)))].status = 1
                        $($('.setBtn')[$(".setBtn").index($(this))]).attr("data-on", "true" == $($('.setBtn')[$(".setBtn").index($(this))]).attr("data-on") ? "false" : "true")
                    }

                    //设置localStorage
                    c.setKeywordsString2(listData);
                })
                //进入时查看是否有本地存储
                var olddata = c.getKeywordsString2();
                //初始化创建判断
                if (olddata.length) {
                    listData = olddata
                    for (var i = 0; i < olddata.length; i++) {
                        $("#text-box").append(box)
                        $('.content')[i].value = olddata[i].data
                        if (olddata[i].name) {
                            $(".textName")[i].value = olddata[i].name
                        } else {
                            $(".textName")[i].value = ""
                        }

                        $($(".colorSelect")[i]).addClass("chrome-extension-mutihighlight-style-" + olddata[i].colour)
                        if (listData[i].status == 1) {
                            $($('.setBtn')[i]).attr("data-on", "true" == 'true')
                        } else {
                            $($('.setBtn')[i]).attr("data-on", "true" == 'false')
                        }
                    }
                    //加载出现滚动条时 置顶
                    var int = setInterval(function () {
                        if ($(document).scrollTop() > 0) {
                            $(document).scrollTop(0)
                            clearInterval(int);
                        }
                    }, 10)
                } else {
                    var obj = {
                        colour: 1,
                        data: "",
                        status: 1,
                        name: "",
                    }
                    listData.push(obj)
                    $("#text-box").append(box)
                }


                // function d(a) { //改变缓存值
                //     //debugger
                //     clearTimeout(l),

                //         l = setTimeout(function () {
                //                 debugger
                //                 // var datas = [];
                //                 // $(".textarea-wrap").find(".valuess").each(function () {
                //                 //     var data = {};
                //                 //     //data.colour=$($(this).find(".color")[0]).css("background-color");
                //                 //     data.colour = "color: #fff; background: red;";
                //                 //     data.data = $($($(this).find(".highlight-words")[0]).find("textarea")[0]).val();
                //                 //     if (data.data) {
                //                 //         datas.push(data);
                //                 //     }
                //                 // });
                //                 // //设置localStorage
                //                 // c.setKeywordsString2(datas);
                //                 c.setKeywordsString2(listData);
                //             },
                //             1 == a ? 0 : 100)
                // }

                // a.bgWindow = b;
                // //获取localStorage的方法

                // console.log(olddata, "zx")
                // var e = $("#highlight-words");
                // e.html(olddata[0].data || "");
                // var f = e.height() + 50,
                //     g = e.width(),
                //     h = e.html(),
                //     i = 100,
                //     j = $('<textarea spellcheck="false"></textarea>').val(h).attr({
                //         placeholder: e.attr("placeholder") || ""
                //     }).css({
                //         height: f > i ? i : f,
                //         width: g,
                //         maxWidth: g
                //     });
                // e.empty().append(j);



                var k, l, m = $("#switcher").attr("data-on", c.getActiveStatus() ? "true" : "false").on("click",
                    function () {
                        m.attr("data-on", "true" == m.attr("data-on") ? "false" : "true"),
                            clearTimeout(k),
                            k = setTimeout(function () {
                                c.setActiveStatus("true" == m.attr("data-on") ? !0 : !1)
                            },
                                100)
                    });
                //j.on("keyup change paste", d),
                $("#support-link").click(function () {
                    chrome.tabs.create({
                        url: "http://feeling-oa.com/fwm/login.html"
                    })
                }),
                    ///[\s\r\n]/.test(j.val()[j.val().length - 1]) || "" == $.trim(j.val()) || j.val(j.val() + " "),
                    setTimeout(function () {
                        //j[0].selectionStart = j[0].selectionEnd = j[0].value.length,
                        $("#support-link")[0].scrollIntoView()
                    },
                        200)
            }(b.background)
        })
    }(this, $(this));