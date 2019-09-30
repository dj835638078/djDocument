!
function (a, b) {
    if ("object" == typeof module && "object" == typeof module.exports) {
        var c = require("jQuery");
        module.exports = b(c)
    } else "function" == typeof define && define.amd ? define(["jQuery"],
        function (a) {
            return b(a)
        }) : a.highlighter = a.highlighter || b(a.jQuery)
}(this,
    function (a) {
        function b() {
            for (var a in m) clearTimeout(m[a])
        }
        var c, d, e, f, g, h = this,
            i = "_mh_cid",
            j = "chrome-extension-mutihighlight",
            k = "chrome-extension-mutihighlight-style-",
            l = {};
        c = function (a, b, c) { //顺序2--b为KEY
                var datas = [];
                $.each(b, function (indexs, vals) {
                    $.each(vals, function (indexs, domEles) {
                        datas.push(domEles);
                    });
                });
                if (a && !l.isScriptOrStyle(a) && !l.isContentEditable(a)) {
                    c && e(a, datas);
                    for (var d = document.createNodeIterator(a, NodeFilter.SHOW_TEXT,
                            function (datas) {
                                return l.isUnderContentEditableOrStyleScript(datas, a) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
                            },
                            !1), g = d.nextNode(); g;) f(g, datas),
                        g = d.nextNode()
                }
            },
            d = function (a) {
                a.previousSibling && a.nextSibling ? (
                    a.previousSibling.nodeValue = a.previousSibling.nodeValue + a.innerText + (a.nextSibling.nodeValue?a.nextSibling.nodeValue:""), a.nextSibling.nodeValue?a.nextSibling.remove():""
                    ) : a.previousSibling ? 
                    a.previousSibling.nodeValue = a.previousSibling.nodeValue + a.innerText : a.nextSibling && a.nextSibling.nodeValue ? 
                    a.nextSibling.nodeValue = a.innerText + (a.nextSibling.nodeValue?a.nextSibling.nodeValue:"") : a.parentNode && a.parentNode.insertBefore(document.createTextNode(a.innerText), a);
                    a.remove();
            },
            e = function (b, c) {
                a(b).find("." + j).each(function () {
                    -1 == c.indexOf(this.innerText) && d(this)
                })
            },
            f = function (a, b) { //顺序1--b为KEY
                var c, d, e, f = a.parentNode;
                var datas = [];
                $.each(b, function (indexs, vals) {
                    if (typeof (vals) === "string") {
                        datas.push(vals);
                    } else {
                        if(vals){datas.push(vals.words);}
                    }
                });
                if (!f || "string" != typeof f.className || -1 == f.className.indexOf(j)) {
                    for (var h = datas.length - 1; h >= 0; h--) {
                        c = datas[h];
                        c.length < 1 || (
                            d = a.nodeValue.toLowerCase().indexOf(c),
                            e = d + c.length,
                            -1 == d || /^[A-z_-]+$/.test(c) && !/^([^A-z])*$/.test(a.nodeValue.charAt(d - 1) + a.nodeValue.charAt(e)) || g(b, a, f, d, e, h)
                        );
                    }
                }
            },
            g = function (a, b, c, d, e, g) { //顺序3--a为KEY[{"colour":"#995656","words":"个人"}]
                var datas = [];
                var gl = a[g].colour;
                $.each(a, function (indexs, vals) {
                    datas.push(vals.words);
                });
                var h = b.nodeValue,
                    i = 0 != d ? document.createTextNode(h.slice(0, d)) : null,
                    l = document.createElement("i");
                    if(!gl){gl=1;}
                    l.className = j + " " + k + gl, //+ " " + k + (g % 6 + 1),
                    //l.style = a[g].colour,
                    l.innerHTML = h.slice(d, e),
                    b.nodeValue = h.slice(e),
                    c.insertBefore(l, b),
                    null != i && (c.insertBefore(i, l), f(i, a)),
                    f(b, a)
            },
            l.isContentEditable = function (a) {
                return a && (a.parentNode && a.parentNode.isContentEditable || a.isContentEditable)
            },
            l.isUnderContentEditableOrStyleScript = function (a, b) {
                for (; a && a != b;) {
                    if (a.tagName && (a.isContentEditable || -1 != ["style", "script"].indexOf(a.tagName.toLowerCase()))) return !0;
                    a = a.parentNode
                }
                return !1
            },
            l.isScriptOrStyle = function (a) {
                return a.tagName && (-1 != ["style", "script"].indexOf(a.tagName.toLowerCase()) || a.parentNode && -1 != ["style", "script"].indexOf(a.parentNode.tagName.toLowerCase()))
            },
            l.isChildNode = function (a, b) {
                return -1 != Array.prototype.indexOf.call(b.childNodes, a)
            },
            l.isWrapNode = function (a) {
                return a == document || document.body && a == document.body
            },
            l.cid = function (a) {
                return function () {
                    return ++a
                }
            }(0);
        var m = {},
            n = {
                highlight: function (a, d, e) {
                    var f = a[i];
                    f || (a[i] = f = l.cid()),
                        l.isWrapNode(a) && b(),
                        clearTimeout(m[f]),
                        m[f] = setTimeout(function () {
                                c.call(h, a, d, e)
                            },
                            200)
                },
                clearHighlighted: function (c) {
                    b(),
                        a(c).find("." + j).each(function () {
                            d(this)
                        })
                }
            };
        return n
    });