window.query = {}
var u = navigator.userAgent
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
window.query.isAndroid = isAndroid
window.query.isiOS = isiOS
