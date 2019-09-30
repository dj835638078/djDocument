<template>
    <div :class="[isNight ? 'blackBg' : '', 'container-wrap']">
        <div class="container">
            <div class="root-img " v-show='!showTwo'>
                <div class="title" style='margin-bottom: 0.1rem'>拍照上传</div><div v-show='required' class="xing">*</div>
                <div class="img-arry">
                    <div class="img-hidden">
                        <div class="img1 hiding" ref='imgbig' v-for="n in 3" :key="n"></div>
                        <div class="img5" id="imgadd" @click='imgaddClick' v-show='imgaddShow'></div>
                    </div>
                    <div class="img-txt">{{imgTxt}}</div>
                </div>
            </div>
            <div class="root-photo" v-show='showTwo'>
                <div class="title" style='margin-bottom: 0.1rem'>拍照上传</div>
                <div class="root-photo-container">
                    <div class="root-photo-add">
                        <div class="root-door-photo" ref='rooDoorPhoto' v-show='doorPhotoShow'></div>
                        <div class="root-photo-add-door" @click='doorAddClick' v-show='!doorPhotoShow'></div>
                        <div class="root-photo-add-des">门面照片 <span class="root-photo-add-xing">*</span></div>
                    </div>
                    <div class="root-photo-business">
                        <div class="root-business-photo" ref='rootBusinessPhoto' v-show='businessPhotoShow'></div>
                        <div class="root-photo-business-door" @click='bussinessAddClick' v-show='!businessPhotoShow'></div>
                        <div class="root-photo-business-des">营业执照 <span class="root-photo-business-xing">*</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="border"></div>
    </div>
</template>
<script>
/* 照片 */
export default {
    /**
     * showTwo: 是否展示两个相机
     */
    name: 'photo',
    props: {
        imgTxt: {
            default: '添加地点正面照片，处理通过率更高'
        },
        positionNameThrow:{
            default: ""
        },
        showTwo: {
            type: Boolean,
            default: false
        },
        isNight: {
            type: Boolean,
            default: false
        },
        required: {
            type: Boolean,
            default: false
        },
    },
    data () {
        return {
            doorPhotoShow: false,
            businessPhotoShow: false,
            imgaddShow: true,
            imgList: [],
            doorImgList:[],
            licensePhotoList: [],
            positionName: ""
        }
    },
    computed: {
        photoSubmitStatus: function () {
            return this.showTwo ? this.doorPhotoShow && this.businessPhotoShow : true
        }
    },
    watch: {
        photoSubmitStatus: function (val) {
            this.$emit('photoSubmitStatusChange', val)
        },
        //多张照片上传
        imgList: function (val) {
            this.$emit('photoListChange', val)
        },
        //门面照片
        doorImgList: function (val) {
            this.$emit('photoListChange', val)
        },
        //营业执照
        licensePhotoList: function (val) {
            this.$emit('licensePhotoListChange', val)
        }
    },
    created: function () {
        var self = this
        self.imgList = []
        self.doorImgList = []
        self.normalTotal = 3
        window.mqq.invoke('ugc', 'getScreenshotPicture', function(result) {
            if (result && result.filePath && JSON.parse(result.filePath)[0]) {
                if (localStorage.getItem("screenPicturePath") && localStorage.getItem("screenPicturePath") == JSON.parse(result.filePath)[0]) {
                    self.imgList = []
                    self.$refs.imgbig[0].style.display = 'none'        
                    self.$refs.imgbig[0].style.backgroundImage = ''
                } else {
                    self.imgList.push(JSON.parse(result.filePath)[0])
                    self.$refs.imgbig[0].style.display = 'inline-block'        
                    self.$refs.imgbig[0].style.backgroundImage = 'url(' + self.imgList[0] + ')'
                }
                localStorage.setItem("screenPicturePath",JSON.parse(result.filePath)[0])
            }
        })
    },
    mounted: function () {
        var self = this
        /**
         * 可上传一张时，每张图片的点击事件
         */
        for (var i = 0; i < self.$refs.imgbig.length; i++) {
            (function (index) {
                window.touchClick(self.$refs.imgbig[index], function () {
                    window.mqq.invoke('ugc', 'showPicture', {index: index, pathList: self.imgList.join(",")}, function (result) {
                        if (result) {
                            self.imgList = result.filePaths
                            if (self.imgList && self.imgList.length >= self.normalTotal) {
                                self.imgaddShow = false
                            } else {
                                self.imgaddShow = true
                            }
                            for (var n = 0; n < self.$refs.imgbig.length; n++) {
                                if (n >= self.imgList.length) {
                                    self.$refs.imgbig[n].style.display = 'none'
                                } else {
                                    self.$refs.imgbig[n].style.display = 'inline-block'
                                    self.$refs.imgbig[n].style.backgroundImage = 'url(' + self.imgList[n] + ')'
                                }
                            }
                        }
                    })
                }, {isElement: true})
            })(i)
        }
        /**
         * 上传两张照片时，每个照片的点击事件
         */
        window.touchClick(self.$refs.rooDoorPhoto, function () {
            window.mqq.invoke('ugc', 'showPicture', {index: 0, pathList: self.doorImgList.join(",")}, function (result) {
                if (result) {
                    self.doorImgList = result.filePaths
                    if (self.doorImgList && self.doorImgList.length > 0) {
                        self.$refs.rooDoorPhoto.style.backgroundImage = 'url(' + self.doorImgList[0] + ')'
                        self.doorPhotoShow = true
                    } else {
                        self.doorPhotoShow = false
                    }
                }
            })
        }, {isElement: true})
        window.touchClick(self.$refs.rootBusinessPhoto, function () {
            window.mqq.invoke('ugc', 'showPicture', {index: 0, pathList: self.licensePhotoList.join(",")}, function (result) {
                if (result) {
                    self.licensePhotoList = result.filePaths
                    if (self.licensePhotoList && self.licensePhotoList.length > 0) {
                        self.$refs.rootBusinessPhoto.style.backgroundImage = 'url(' + self.licensePhotoList[0] + ')'
                        self.businessPhotoShow = true
                    } else {
                        self.businessPhotoShow = false
                    }
                }
            })
        }, {isElement: true})
    },
    methods: {
        /**
         * 可上传一张时，相机的点击事件
         */
        imgaddClick: function () {
            if (this.imgList.length >= this.normalTotal) {
                this.imgaddShow = false
            } else {
                var self = this
                this.imgaddShow = true
                window.mqq.invoke('ugc', 'takePicture', {position: self.positionNameThrow ? self.positionNameThrow : self.positionName, maxCount: 3, selectedCount: self.imgList.length}, function (result) {
                    if (result) {
                        self.imgList = self.imgList.concat(result.filePaths)
                        if (self.imgList && self.imgList.length >= self.normalTotal) {
                            self.imgaddShow = false
                        } else {
                            self.imgaddShow = true
                        }
                        for (var i = 0; i < self.imgList.length; i++) {
                            if (i === self.normalTotal) {
                                break
                            }
                            self.$refs.imgbig[i].style.display = 'inline-block'
                            self.$refs.imgbig[i].style.backgroundImage = 'url(' + self.imgList[i] + ')'
                        }
                    }
                })
            }
        },
        /**
         * 可上传两张时，左边相机的点击事件
         */
        


        doorAddClick: function () {
            var self = this
            window.mqq.invoke('ugc', 'takePicture', {position: 'shopFront', maxCount: 1, selectedCount: self.doorImgList.length}, function (result) {
                if (result) {
                    self.doorImgList = self.doorImgList.concat(result.filePaths)
                    if (self.doorImgList && self.doorImgList.length > 1) {
                        nativeShowToast('最多添加一张照片')
                    }
                    if (self.doorImgList && self.doorImgList.length > 0) {
                        self.doorPhotoShow = true
                        self.$refs.rooDoorPhoto.style.backgroundImage = 'url(' + self.doorImgList[0] + ')'
                    } else {
                        self.doorPhotoShow = false
                    }
                }
            })
        },
        /**
         * 可上传两张时，右边相机的点击事件
         */
        bussinessAddClick: function () {
            var self = this
            window.mqq.invoke('ugc', 'takePicture', {position: 'license', maxCount: 1, selectedCount: self.licensePhotoList.length}, function (result) {
                if (result) {
                    self.licensePhotoList = self.licensePhotoList.concat(result.filePaths)
                    if (self.licensePhotoList && self.licensePhotoList.length > 1) {
                        nativeShowToast('最多添加一张照片')
                    }
                    if (self.licensePhotoList && self.licensePhotoList.length > 0) {
                        self.businessPhotoShow = true
                        self.$refs.rootBusinessPhoto.style.backgroundImage = 'url(' + self.licensePhotoList[0] + ')'
                    } else {
                        self.businessPhotoShow = false
                    }
                }
            })
        }
    }
}
</script>
<style scoped>
.root-img {
    position: relative;
    width: 100%;
    color: rgb(0, 0, 0);
    background: rgb(255, 255, 255);
}
.img-hidden {
    overflow: hidden;
}
.img-txt {
    padding-top: 0.1rem;
    font-size: 0.13rem;
    color: rgb(153, 153, 153);
    letter-spacing: 0px;
}
.img1 {
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 0.03rem;;
    background: url("") no-repeat;
    -webkit-background-size: 0.8rem 0.8rem;
    background-size: 0.8rem 0.8rem;
}
.root-photo {
    position: relative;
    background-color: rgb(255, 255, 255);
}
.root-photo-title {
    padding-top: 0.18rem;
    padding-left: 0.18rem;
}
.root-door-photo {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.root-photo-add, .root-photo-business {
    display: inline-block;
    width: 0.82rem;
}
.img5, .root-photo-add-door, .root-door-photo, .root-photo-business-door, .root-business-photo {
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    display: inline-block;
    background: #FCFCFC url("../../commons/img/add_pic.png") no-repeat;
    background-position: center center;
    background-size: 0.8rem 0.8rem;
    border: 1px solid #CCCCCC;
    /* border: 0.01rem solid #CCCCCC; */
    border-radius: 0.03rem;
}
.root-photo-add-des {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    width: 0.8rem;
    height: 0.18rem;
    font-size: 0.13rem;
    color: #333333;
    margin-top: 0.1rem;
}
.root-photo-add-xing, .root-photo-business-xing {
    display: inline-block;
    vertical-align: middle;
    color: red;
    font-size: 0.1rem;
}
.root-business-photo {
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.root-photo-business-des {
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    width: 0.8rem;
    height: 0.18rem;
    font-size: 0.13rem;
    color: #333333;
    margin-top: 0.1rem;
}
.root-photo-container {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    background: #ffffff;
    box-sizing: border-box;
}
.blackBg .container-wrap {
    background: #45454A;
}
.blackBg .container {
    background: #45454A;
}
.blackBg .root-img {
    background: #45454A;
}
.blackBg .title{
    color: #fff;
}
.blackBg .img5, .blackBg .root-photo-add-door, .blackBg .root-door-photo, .blackBg .root-photo-business-door, .blackBg .root-business-photo {
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    display: inline-block;
    background: #45454A url("../../commons/img/add_pic_night.png") no-repeat;
    background-position: center center;
    background-size: 0.8rem 0.8rem;
    border: 0.01rem solid #CCCCCC;
    border-radius: 0.03rem;
}
</style>
