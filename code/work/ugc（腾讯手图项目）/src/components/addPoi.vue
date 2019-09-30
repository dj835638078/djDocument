<template>
    <div class="addReport">
        <merchant @isMerchantChange='onIsMerchantChange' :isMerch='isMerchant'></merchant>
        <place @placeChange='onPlaceChange' :pla='place' :plaRequire='placeRequire' titleName='地点名称' plaholder='输入该地点名称'></place>
        <position @positionChange='onPositionChange' @positionNameChange = 'onPositionNameChange' :posi='position' titleName='地点位置'></position>
        <phone @phoneChange='onPhoneChange' :pho='poiTel'></phone>
        <photo :showTwo='isMerchant' @photoSubmitStatusChange='onPhotoSubmitStatusChange' @photoListChange='onPhotoListChange' @licensePhotoListChange='onlicensePhotoListChange'></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述该地点特征，如周边建筑或所在街道等'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable'  @clickBtn='addPoi' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
/* 新增地点 */
import phone from './subComponents/phone'
import merchant from './subComponents/merchant'
import place from './subComponents/place'
import position from './subComponents/position'
import photo from './subComponents/photo'
import description from './subComponents/description'
import contact from './subComponents/contact'
import submit from './subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'addPoi',
    mixins: [mixin],
    data () {
        return {
            isMerchant: false,
            phone: '',
            place: '',
            photoList: [],
            licensePhotoList: [],
            placeRequire: true,
            position: '',
            photoSubmitStatus: false,
            description: '',
            mobilePhone: '',
            disable: true,
            tid:'',
            reqId: '',
            photo:'',
            photoLicense:'',
            poi_longitude: '',
            poi_latitude: '',
            loadingShow: false,
            issue_type:1001,
            entry:'',
            positionName:"",
            poiTel:""
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id || '',
                'nick_name':this.nick_name,
                'entry': parseInt(this.entry)  || 14,
                'issue_type':this.issue_type || 1001,
                "issue_time": 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                "poi_name": this.place,
                "city_code": "110000",
                'poi_longitude': this.poi_longitude || this.longitude,
                'poi_latitude': this.poi_latitude || this.latitude,
                // 'poi_address': this.position.addr,
                'poi_address': this.positionName,
                'poi_tel': this.poiTel,  // this.position.phone,
                'poi_license':this.photoLicense,  
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    mounted: function () {
        var  self = this
        if (self.$route.name == "addPoiFeedback") {
            mapDataReport("ugcreport_addpoi")
        } else {
            mapDataReport("homepage_report_addpoi")
        }
        nativeSetNavBarTitle('新增地点')
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            if (result && result.entry) {
                self.entry = result.entry
                //console.log(result,'首页addpoi 从客户端获取entry')
            }
            if (self.$route.name == "addPoiReporter") {
                console.log(self.$route.name)
                self.entry = 13
            }
        })
    },
    components: {
        phone,
        merchant,
        place,
        position,
        photo,
        description,
        contact,
        submit
    },
    methods: {
       addPoi(v){
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
                        var s=''  //拼接所有字段的和
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
                    window.nativeShowToast('网络错误')
                }
            })
        })
        },
        submitOpe () {
            var self = this;
           if (!self.checkPoiPhoneNumber(self.poiTel)) {
                return
            }
           if (self.$route.name == "addPoiFeedback") {
                if (!self.isMerchant) {
                    mapDataReport("ugcreport_addpoi_submit")
                } else { //商户提交
                    mapDataReport("ugcreport_addbusipoi_submit")
                }
            } else {
                if (!self.isMerchant) {
                    mapDataReport("homepage_report_addpoi_submit")
                } else { //商户提交
                    mapDataReport("homepage_report_addbusipoi_submit")
                }
            }
           self.loadingShow = true
           if (self.photoList.length) {
                //商户
                if (self.isMerchant) {
                    self.photoList = self.photoList.concat(self.licensePhotoList)
                }
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: self.photoList.join(",")}, function (result) {
                    if(result) {
                        // photo：照片 poi_license: 营业执照
                        if (self.isMerchant) {
                            if (result[0] instanceof Array) {
                                self.photo = result[0][0]
                                self.photoLicense = result[0][1]
                            } else {
                                self.photo = result[0]
                                self.photoLicense = result[1]
                            }
                        } else {
                            if (result[0] instanceof Array) {
                                self.photo = result[0].join(";")
                            } else {
                                self.photo = result.join(";")
                            }
                        }
                        if(self.photo){
                            var url = baseUrl+'?cmd=/api/poi/new'
                            var param = self.submitData
                            self.sendReq(url, param)
                        }else{
                            var url = baseUrl+'?cmd=/api/poi/new'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/poi/new'
                var param = self.submitData
                param.photo = ''
                param.poi_license = ''
                self.sendReq (url, param)
           } 
        },
        checkSubmitStatus () {
            // 商户： 门店 营业执照必填
            if (this.isMerchant && !this.photoSubmitStatus) {
                this.disable = true
                return
            }
            if (!this.checkPhoneNumber() && this.lat != undefined && this.lon != undefined) {
                this.disable = true
            } else {
                if (this.place !== '' && this.position !== '' && this.positionName !=='') {
                    this.disable = false
                } else {
                    this.disable = true
                }
            }
        },
        onPhoneChange (phoneNum) {
            this.poiTel = phoneNum
        },
        onIsMerchantChange (isMerchant) {
            this.isMerchant = isMerchant
            if(this.isMerchant == true){
                this.issue_type = 1002
            }else{
                this.issue_type = 1001
            }
        },
        onPlaceChange (place) {
            this.place = place
            this.checkSubmitStatus()
        },
        onPositionChange (position) {
            this.position = position;
            this.poi_longitude= this.position.point.mLongitudeE6
            this.poi_latitude= this.position.point.mLatitudeE6
            this.checkSubmitStatus()
        },
        onPositionNameChange(positionName){
            this.positionName = positionName
            if (!positionName) {
                this.disable = true
            } else {
                this.checkSubmitStatus()
            }
        },
        onPhotoSubmitStatusChange (photoSubmitStatus) {
            this.photoSubmitStatus = photoSubmitStatus
            this.checkSubmitStatus()
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        onlicensePhotoListChange (photoList) {
            this.licensePhotoList = photoList
        },
        onDescriptionChange (desc) {
            this.description = desc
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
        }
    }
}
</script>
<style scoped>
</style>
