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
import phone from '../components/subComponents/phone'
import merchant from '../components/subComponents/merchant'
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
            entry:'',
            positionName:"",
            poiTel:""
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id || '',
                'nick_name':this.nick_name || '',
                'entry': parseInt(this.entry) || 10,
                'issue_type':1001,
                "issue_time": 0,
                'my_longitude': this.lon ,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                "poi_name": this.place,
                "city_code": "110000",
                'poi_longitude': this.poi_longitude,
                'poi_latitude': this.poi_latitude,
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
        nativeSetNavBarTitle('新增地点')
        // nativeGetNavBarBackClick(function(data){
        //     history.go(-1)
        // })
        nativeReporterAddPoiName(function(name) {
            if (name) {
                self.place = name
            }
        })
        nativeGetNavBarBackClick(function(data) {
            nativePerformNavBarBackClick(function(data) {});
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            if (result && result.entry) {
                self.entry = +result.entry
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
                }
            })

        })
        },
        submitOpe () {
            var  self = this;
           if (!self.checkPoiPhoneNumber(self.poiTel)) {
                return
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
                            self.sendReq(url, param, 1)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/poi/new'
                var param = self.submitData
                param.photo = ''
                param.poi_license = ''
                self.sendReq(url, param, 1)
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
            this.photoList = photoList//这块是图片的路径
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
