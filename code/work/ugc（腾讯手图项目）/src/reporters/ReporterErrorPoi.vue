<template>
    <div class="container-wrap">
        <div class="container error-container">
            <div class="error-title">{{poiName}}</div>
            <div class="title-desc">{{poiAddr}}</div>
        </div>
        <div class="container">
            <div class="title radio-title">请选择问题场景</div><div class="xing">*</div>
            <div class="radio-container">
                <div class="radio">
                    <input type="radio" id="driveNavigation" :value="pick[0]" ref="driveNavigation" @click='pickClick'>
                    <label for="driveNavigation">{{pick[0]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="busNavigation" :value="pick[1]" ref="busNavigation" @click='pickClick'>
                    <label for="busNavigation">{{pick[1]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="walkNavigation" :value="pick[2]" ref="walkNavigation" @click='pickClick'>
                    <label for="walkNavigation">{{pick[2]}}</label>
                </div>
            </div>
        </div>
        <div class="border"></div>
        <div  v-show='picked === pick[2]'>
            <div class="msg-error">修改以下信息（至少一项）<div class="xing">*</div></div>
            <place  @placeChange='onAddrChange' :pla='addrName' :simple='simple' titleName='地点名称' plaholder='请输入地点的名称' :plaRequire="false"></place>
            <position @positionChange='onPositionChangeInfo' @positionNameChange ='onPositionNameChangeInfo' :posi='positionInfo' :posTextVisible="posTextVisible" :posiAddrInfo="posiAddrInfo" titleName='正确位置' :required="false"></position>
            <!-- <phone @phoneChange='onPhoneChange' :pho='phone'></phone> -->
            <place  @placeChange='onTelChange' :pla='telName' :simple='simple' titleName='地点电话' plaholder='输入该地点电话' :plaRequire="false"></place>
            <place  @placeChange='onOpenTimeChange' :pla='openTime' :simple='simple' titleName='营业时间' plaholder='请输入营业时间' :plaRequire="false"></place>
        </div>
        <position v-show='picked === pick[1]' @positionChange='onPositionChangeSite' @positionNameChange ='onPositionNameChangeSite' :posi='positionSite' titleName='正确位置'></position>
        <photo @photoListChange='onPhotoListChange'></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述该地点特征，如周边建筑或所在街道等'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' :loadShow="loadingShow" @clickBtn='errorPoi'></submit>
    </div>
</template>

<script>
import normalImg from '../commons/img/ic_radio_normal.png'
import checkedImg from '../commons/img/ic_radio_checked.png'
import place from '../components/subComponents/place'
import position from '../components/subComponents/position'
import photo from '../components/subComponents/photo'
import description from '../components/subComponents/description'
import contact from '../components/subComponents/contact'
import submit from '../components/subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'

export default {
    name: 'App',
    mixins: [mixin],
    data: function () {
        return {
            simple: true,
            stationPosition: '',
            poiName: '',
            poiAddr: '',
            picked: '',
            photoList: [],
            description: '',
            mobilePhone: '',
            disable: true,
            reliability: true,
            tid:'',
            reqId: '',
            poi_id:'',
            poi_province: '',
            poi_city: '',
            poi_district: '',
            poi_area_code: '', 
            poi_category: '',
            poi_category_code: '', 
            poi_correct_name: '', 
            poi_correct_address:'',
            poi_correct_longitude: '',
            poi_correct_latitude: '',
            poi_correct_tel: '',
            poi_correct_license: '',  
            poi_correct_openting_time: '',
            credibility:'',
            phone: '',
            addrName:'',
            positionInfo:'',
            positionSite:'',
            position:'',
            openTime:'',
            loadingShow: false,
            posiAddrSite:"",
            posiAddrInfo:"",
            posTextVisible: false,
            posiAddr:"",
            poiNameFlag: "",
            telName:"",
            telNameFlag:"",
            entry:'',
            telNameOther:"",
            openTimeOther:'',
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id': this.user_id,
                'entry': parseInt(this.entry) || 31,
                'issue_type': this.issue_type,
                'nick_name':this.nick_name,
                'issue_time': 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code':'110000',
                'poi_correct_name': this.poiNameFlag,
                "poi_id": this.poi_id,
                "poi_province": this.poi_province,
                "poi_city": this.poi_city,
                "poi_district": this.poi_district,
                "poi_category": this.poi_category,
                "poi_category_code": this.poi_category_code,
                "poi_correct_longitude": Number(this.poi_correct_longitude) || this.longitude,  // 正确位置
                "poi_correct_latitude": Number(this.poi_correct_latitude) || this.latitude,    // 正确位置
                "poi_correct_openting_time":this.poi_correct_openting_time ,   //营业时间
                // "poi_correct_address": this.poiAddr,     //地点名称
                "poi_correct_address": this.getPicked(this.picked),     //地点名称
                "poi_correct_tel": this.telName || "",   //地点电话
                "poi_correct_license": "",
                "poi_area_code":'' ,   
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    created: function () {
        this.pick = ['地点仍在运营', '位置错误', '信息错误']
    },
    mounted: function () {
        var self = this
        nativeSetNavBarTitle('地点报错')
        // nativeGetNavBarBackClick(function(data){
        //     history.go(-1)
        // })
        nativeGetNavBarBackClick(function(data) {
            nativePerformNavBarBackClick(function(data) {});
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            //console.log(result,'entry，poi详情')
            if (result && result.entry) {
                self.entry = +result.entry
            }
        })
        //获取所需要的poi信息
        nativeUgcGetPoi(function(data) {
            if (data) {
                var poi = JSON.parse(data.poi)
                console.log(poi)
                self.credibility = poi.credibility
                if(self.credibility == 41 || self.credibility == 12 || self.credibility == 11 ||self.credibility == 4 ||self.credibility == 3 ||self.credibility == 2){
                   self.pick[0] = '地点仍在运营'
                } else {
                    self.pick[0] = '地点不存在'
                }
                self.poiName = poi.name || ''
                self.poiNameFlag = poi.name
                self.poiAddr = poi.addr || ''
                self.poi_id= poi.uid || ''
                self.poi_province = poi.province || ''
                self.poi_city = poi.city || ''
                self.poi_district = poi.district || ''
                self.poi_area_code = poi.uid || ''
                self.poi_category = poi.category || ''
                self.poi_category_code = String(poi.categoryCode) || ''
                self.poi_correct_name = poi.name || ''
                self.poi_correct_longitude = poi.point.mLongitudeE6 || ''
                self.poi_correct_latitude = poi.point.mLatitudeE6 || ''
                self.poi_correct_openting_time = poi.openTime || ''
                self.openTimeOther = poi.openTime || ''  //营业时间
                self.telNameFlag = poi.phone || ""  //地点电话 
                self.telNameOther = poi.phone || ""  //地点电话
            }
        })
    },
    components: {
        place,
        position,
        photo,
        description,
        contact,
        submit
    },
    methods: {
        getPicked(val){
            if (val === this.pick[2]) {
                return this.posiAddrInfo
            } else if (val === this.pick[1]) {
                return this.posiAddrSite
            } else {
                return this.poiAddr
            }
        },
        pickClick (e) {
            this.$refs.driveNavigation.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.busNavigation.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.walkNavigation.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            this.picked = e.target.value
            var radio1 = {
                    '地点仍在运营': 1104,
                    '位置错误': 1103,
                    '信息错误': 1101,
                    '地点不存在':1102,
                }
            this.issue_type =  radio1[e.target.value]
            this.checkSubmitStatus()
        },
        onDescriptionChange (desc) {
            this.description = desc
        },
        onAddrChange (route) {
            this.addrName = route
            this.checkSubmitStatus()
        },
       onPositionChangeInfo (position) {
            this.positionInfo = position;
            this.checkSubmitStatus()
        },
        onPositionChangeSite (position) {
            this.positionSite = position;
            this.checkSubmitStatus()
        },
        onPositionNameChangeInfo(positionName){
            this.posiAddrInfo = positionName;
            this.checkSubmitStatus()
        },
        onPositionNameChangeSite(positionName){
            this.posiAddrSite = positionName;
            this.checkSubmitStatus()
        },
        onTelChange (route) {
            this.telName = route
            this.telNameFlag = route
            this.checkSubmitStatus()
        },
        onOpenTimeChange (route) {
            this.openTime = route
            this.checkSubmitStatus()
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            if (this.poiName == this.poiNameFlag && this.posiAddrInfo == this.poiAddr && this.telName==this.telNameOther && this.openTime==this.openTimeOther && this.picked == "信息错误") {
                this.disable = true
            } else {
                this.checkSubmitStatus()
            }
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        checkSubmitStatus () {
            let self = this
            if (!this.checkPhoneNumber()) {
                this.disable = true
            }
            else if(this.picked == this.pick[2]){
                if(this.poiName == this.poiNameFlag && this.posiAddrInfo == this.poiAddr && this.telName==this.telNameOther && this.openTime==this.openTimeOther){
                    setTimeout(function () {
                        self.disable = true
                    }, 300);
                }else{
                    setTimeout(function () {
                        self.disable = false
                    }, 300);
                }
            }
            else if(this.picked == this.pick[1]){
                if(this.posiAddrSite ){
                    this.disable = false
                }else{
                    this.disable = true
                }
            }
            else {
                if (this.picked !== '') {
                    this.disable = false
                } else {
                    this.disable = true
                }
            }
        },
        errorPoi(v){
            var self = this;
            mapGetUserInfo(function(data){
            var user_id,nick_name,reqid
            var param = {}
            user_id = data.userId
            nick_name = data.nick
            var url = baseUrl+'?qt=/api/ticket/spawn'
            
            //获取reqid
            getReqId.getReqId(function(reqid){
                if(reqid){
                    function sendReq (url, param) {
                    param = {
                        user_id,
                        reqid
                    }
                    var s='' 
                    for(var key in objKeySort(param)){
                        s += objKeySort(param)[key];
                    }
                    param.sign = ''
                    param.sign = md5(s+'sosomap')
                    var url = baseUrl+'?qt=/api/ticket/spawn&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
                    self.$http.get(url).then(function (res) {
                        self.tid = res.data.data.tid;
                        self.reqId = reqid;
                        self.submitOpe()
                    }).catch(function (error) {
                    })
                }
                sendReq (url, param)    
                }else{
                }
            })
        })
        },
        submitOpe () {
            var  self = this
            if (!self.checkPoiPhoneNumber(self.telName)) {
                return
            }
            self.loadingShow = true
            if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: self.photoList.join(",")}, function (result) {
                    if(result) {
                        if (result[0] instanceof Array) {
                            self.photo = result[0].join(";")
                        } else {
                            self.photo = result.join(";")
                        }
                        if(self.photo){
                            var url = baseUrl+'?cmd=/api/poi/correct'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param, 1)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'?cmd=/api/poi/correct'
                            var param = self.submitData
                            self.sendReq(url, param, 1)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/poi/correct'
                var param = self.submitData
                param.photo = ''
                self.sendReq(url, param, 1)
           } 
        }
    },
    watch: {
        addrName: function () {
            this.poiNameFlag =  this.addrName
        },
        openTime: function(){
            this.poi_correct_openting_time = this.openTime
        },
        position: function(){
            this.poi_correct_latitude = this.position.point.mLatitudeE6 || 1
            this.poi_correct_longitude = this.position.point.mLongitudeE6 || 1
        },
        positionSite: function(){
            this.poi_correct_latitude = this.positionSite.point.mLatitudeE6 || 1
            this.poi_correct_longitude = this.positionSite.point.mLongitudeE6 || 1
        },
        positionInfo: function(){
            this.poi_correct_latitude = this.positionInfo.point.mLatitudeE6 || 1
            this.poi_correct_longitude = this.positionInfo.point.mLongitudeE6 || 1
        },
        picked(newVal, oldVal){
            if (newVal == "位置错误") {
                if (this.positionSite.point && this.positionSite.point.mLatitudeE6) {
                    this.poi_correct_latitude = this.positionSite.point.mLatitudeE6 || 1
                    this.poi_correct_longitude = this.positionSite.point.mLongitudeE6 || 1
                } else {
                    this.poi_correct_latitude = 1
                    this.poi_correct_longitude = 1
                }
            } else if (newVal == "信息错误") {
                let self = this
                if (!this.positionInfo) {
                    this.addrName = this.poiNameFlag
                    this.posiAddrInfo = this.poiAddr
                    if (this.poiAddr) {
                        this.posTextVisible = true
                    }
                    this.openTime = this.poi_correct_openting_time
                    this.telName = this.telNameFlag
                    setTimeout(function () {
                        self.disable = true
                    }, 200);
                }
                else if (this.positionInfo.point && this.positionInfo.point.mLatitudeE6) {
                    this.poi_correct_latitude = this.positionInfo.point.mLatitudeE6 || 1
                    this.poi_correct_longitude = this.positionInfo.point.mLongitudeE6 || 1
                } else {
                    this.poi_correct_latitude = 1
                    this.poi_correct_longitude = 1
                }
            }
        }
    }
}
</script>
<style scoped>
.error-title {
    font-size: 0.17rem;
    color: #000000;
    letter-spacing: 0;
}
.error-container {
    border-bottom: 0.06rem solid #DDDDDD;
}
.radio {
    margin-top: 0.18rem;
    display: inline-block;
    margin-right: 0.5rem;
}
input {
    width: 0.24rem;
    height: 0.24rem;
    background-image: url('../commons/img/ic_radio_normal.png');
    background-size: 100% 100%;
    background-repeat:no-repeat;
    vertical-align: middle;
}
label {
    vertical-align: middle;
}
.msg-error{
    font-size: 0.13rem;
    color: #888888;
    padding-left:0.2rem;
    height:0.3rem;
    line-height:0.4rem;
}
</style>
