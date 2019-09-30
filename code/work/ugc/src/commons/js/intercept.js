/**
 * Created by v_mqguan on 2016/7/25.
 */
(function (window) {
    /**
     * 获取dom元素
     */
    var byClass = function (ele) {
        return document.getElementsByClassName(ele)[0]
    }
    var byId = function (ele) {
        return document.getElementById(ele)
    }
    /**
     * 按照符号格式化数据
     */
    var kuoz = function (ele) {
        return ele.replace(/\(/g, '（')
    }
    var kuoy = function (ele) {
        return ele.replace(/\)/g, '）')
    }
    var quanjiao = function (ele) {
        return ele.replace(new RegExp(';', 'g'), '、')
    }
    var douhao = function (ele) {
        return ele.replace(new RegExp(',', 'g'), '，')
    }
    var hen = function (ele) {
        return ele.replace(new RegExp('-', 'g'), ' - ')
    }
    var douhaoDou = function (ele) {
        return ele.replace(new RegExp(';', 'g'), '，')
    }
    var delKong = function (ele) {
        return ele.replace(new RegExp('""', 'g'), '')
    }
    var formatTime = function (t) {
        var newDate = new Date(t * 1000)
        return newDate.toLocaleDateString().replace(new RegExp('/', 'g'), '.')
    }
    var computerStar = function (score) {
        if (score >= 1 && score <= 10) {
            return 0.5
        } else if (score >= 11 && score <= 20) {
            return 1
        } else if (score >= 21 && score <= 30) {
            return 1.5
        } else if (score >= 31 && score <= 40) {
            return 2
        } else if (score >= 41 && score <= 50) {
            return 2.5
        } else if (score >= 51 && score <= 60) {
            return 3
        } else if (score >= 61 && score <= 70) {
            return 3.5
        } else if (score >= 71 && score <= 80) {
            return 4
        } else if (score >= 81 && score <= 90) {
            return 4.5
        } else if (score >= 91 && score <= 100) {
            return 5
        }
    }
    var computerGrade = function (grade) {
        var re = /A/g
        return grade.match(re).length
    }
    var formatImg = function (url) {
        var code1 = url.charAt(url.length - 2)
        var code2 = url.charAt(url.length - 1)
        if (code1 === '/' && code2 === '0') {
            var index = url.lastIndexOf('/')
            var s = url.substring(0, index)
            return s + '/278'
        } else {
            return url
        }
    }
    var delImgFormat = function (url) {
        var code1 = url.charAt(url.length - 2)
        var code2 = url.charAt(url.length - 1)
        if (code1 === '/' && code2 === '0') {
            var index = url.lastIndexOf('/')
            var imgUrl = url.substring(0, index)
            return imgUrl
        } else {
            return url
        }
    }
    window.formatImg = formatImg
    window.delImgFormat = delImgFormat
    window.computerGrade = computerGrade
    window.computerStar = computerStar
    window.byClass = byClass
    window.byId = byId
    window.kuoz = kuoz
    window.kuoy = kuoy
    window.quanjiao = quanjiao
    window.douhao = douhao
    window.hen = hen
    window.douhaoDou = douhaoDou
    window.formatTime = formatTime
    window.delKong = delKong
}(window))
