var docuW = document.documentElement.clientWidth,
    abc = docuW / 375;
document.getElementsByTagName('html')[0].style.fontSize = abc * 100 + 'px';
// 禁止鼠标右键、长按选择等事件
document.oncontextmenu = new Function("event.returnValue=false");
document.onselectstart = new Function("event.returnValue=false");
document.documentElement.style.webkitTouchCallout = 'none';

setTimeout(function () {
    if (!docuW) {
        docuW = document.documentElement.clientWidth, abc = docuW / 375;
        document.getElementsByTagName('html')[0].style.fontSize = abc * 100 + 'px';
    }
}, 300)
setTimeout(function () {
    if (!docuW) {
        docuW = document.documentElement.clientWidth, abc = docuW / 375;
        document.getElementsByTagName('html')[0].style.fontSize = abc * 100 + 'px';
    }
}, 600)