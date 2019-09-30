!
function (a, b) {
    function c() {
        var a = $.Deferred();
        return chrome.extension.sendMessage({
                    opt: "rpc",
                    func: arguments[0],
                    args: Array.prototype.slice.call(arguments, 1)
                },
                function (b) {
                    a.resolve(b)
                }),
            a
    }

    function d(a, b) {
        l && highlighter.highlight(a || document.body || document, k, b)
    }

    function e(a) {
        highlighter.clearHighlighted(a || document.body || document)
    }

    function f() {
        return c("getKeywords").done(function (a) {
            k = a
        })
    }

    function g() {
        return c("getActiveStatus").done(function (a) {
            l = a
        })
    }

    function h() {
        d(),
            b.on("storageChange",
                function (a, b) {
                    b.key == i && g().done(function () {
                        l ? d() : e()
                    })
                });
        var a;
        b.on("storageChange",
                function (b, c) {
                    c.key == j && (clearTimeout(a), a = setTimeout(function () {
                            f().done(function () {
                                d(null, !0)
                            })
                        },
                        200))
                }),
            document.body.addEventListener("DOMSubtreeModified",
                function (a) {
                    d(a.target)
                },
                !0)
    }
    var i = "isActive",
        j = "fwm_keywordsArray",
        k = [],
        l = !0;
    chrome.runtime.onMessage.addListener(function (a) {
            "event" == a.opt && b.trigger(a.event, a.args)
        }),
        $('span[onmouseover="ktrTipShowHide(this);"]').css({
            display: "inline-block"
        }),
        $.when(f(), g()).done(h)
}(this, $(this));