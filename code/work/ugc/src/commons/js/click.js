(function () {
    var TouchClick = function () {
        console.log('TouchClick')
    }
    TouchClick.prototype.bind = function (method, context) {
        return function () {
            return method.apply(context, arguments)
        }
    }
    TouchClick.prototype.init = function (id, callback, options) {
        this.id = id
        this.callback = callback
        this.options = options || null
        this.trackingClick = false
        this.trackingClickStart = 0
        this.lastClickTime = 0
        this.tapDelay = 1000
        this.tapTimeout = 1000
        this.touchStartX = 0
        this.touchStartY = 0
        this.touchBoundary = 10
        this.isOnEvent = false
        this.targetElement = null
        var methods = ['onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel']
        for (var i = 0; i < methods.length; i++) {
            this[methods[i]] = this.bind(this[methods[i]], this)
        }

        var forceClick = false

        if (this.options) {
            if (this.options.isOnEvent) {
                this.isOnEvent = this.options.isOnEvent
            }
            if (this.options.tapDelay) {
                this.tapDelay = this.options.tapDelay
            }
            if (this.options.tapTimeout) {
                this.tapTimeout = this.options.tapTimeout
            }
            if (this.options.forceClick) {
                forceClick = true
            }
            if (this.options.isElement) {
                this.targetElement = this.id
            }
        }

        if (!this.targetElement) {
            this.targetElement = document.querySelector(this.id)
        }

        if (this.targetElement.that) {
            this.targetElement.that.destroy()
        }
        this.targetElement.that = this

        if (forceClick) {
            this.targetElement.addEventListener('click', this.onClick, false)
        } else {
            if (this.isOnEvent) {
                this.targetElement.ontouchstart = this.onTouchStart
                this.targetElement.ontouchmove = this.onTouchMove
                this.targetElement.ontouchend = this.onTouchEnd
                this.targetElement.ontouchcancel = this.onTouchCancel
            } else {
                this.targetElement.addEventListener('touchstart', this.onTouchStart, false)
                this.targetElement.addEventListener('touchmove', this.onTouchMove, false)
                this.targetElement.addEventListener('touchend', this.onTouchEnd, false)
                this.targetElement.addEventListener('touchcancel', this.onTouchCancel, false)
            }
        }
    }
    TouchClick.prototype.destroy = function () {
        if (this.targetElement) {
            if (this.isOnEvent) {
                this.targetElement.ontouchstart = null
                this.targetElement.ontouchmove = null
                this.targetElement.ontouchend = null
                this.targetElement.ontouchcancel = null
            } else {
                this.targetElement.removeEventListener('touchstart', this.onTouchStart, false)
                this.targetElement.removeEventListener('touchmove', this.onTouchMove, false)
                this.targetElement.removeEventListener('touchend', this.onTouchEnd, false)
                this.targetElement.removeEventListener('touchcancel', this.onTouchCancel, false)
                this.targetElement.removeEventListener('click', this.onClick, false)
            }
        }
    }
    TouchClick.prototype.onClick = function (event) {
        this.callback.apply(this, arguments)
    }
    TouchClick.prototype.touchHasMoved = function (event) {
        if (!event || !event.target || event.target.disabled) {
            return true
        }

        var touch = event.changedTouches[0]
        var boundary = this.touchBoundary

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true
        }

        return false
    }
    TouchClick.prototype.onTouchStart = function (event) {
        if (!event || !event.target || event.target.disabled) {
            return true
        }

        this.trackingClick = true
        this.touchStartX = event.touches[0].pageX
        this.touchStartY = event.touches[0].pageY
        // event.timeStamp有些ios为负数
        // that.trackingClickStart = event.timeStamp;
        this.trackingClickStart = Date.now()
        if (this.trackingClickStart - this.lastClickTime < this.tapDelay) {
            return true
        }
        return true
    }
    TouchClick.prototype.onTouchMove = function (event) {
        if (!event || !event.target || event.target.disabled) {
            return true
        }
        if (!this.trackingClick) {
            return true
        }
        if (this.touchHasMoved(event)) {
            this.trackingClick = false
        }
        return true
    }
    TouchClick.prototype.onTouchEnd = function (event) {
        if (!event || !event.target || event.target.disabled) {
            return true
        }
        if (!this.trackingClick) {
            return true
        }

        // event.timeStamp有些ios为负数
        var timeStamp = Date.now()
        // 两次触摸结束时间没有达到设定时间，触摸失效
        if (timeStamp - this.lastClickTime < this.tapDelay) {
            return true
        }
        // 触摸开始与结束超过设定时间，触摸失效
        if (timeStamp - this.trackingClickStart > this.tapTimeout) {
            return true
        }
        this.lastClickTime = timeStamp
        this.trackingClick = false
        this.trackingClickStart = 0
        this.callback.apply(this, arguments)
        return false
    }
    TouchClick.prototype.onTouchCancel = function (event) {
        if (!event || !event.target || event.target.disabled) {
            return false
        }
        this.trackingClick = false
        this.trackingClickStart = 0
        return true
    }

    window.touchClick = function (id, cb, options) {
        return new TouchClick().init(id, cb, options)
    }
})()
