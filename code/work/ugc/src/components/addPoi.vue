<template>
    <div class="addReport">
        <merchant @isMerchantChange='onIsMerchantChange' :isMerch='isMerchant'></merchant>
        <place @placeChange='onPlaceChange' :pla='place' plaRequire='placeRequire' titleName='地点名称' plaholder='输入该地点名称'></place>
        <position @positionChange='onPositionChange' @positionNameChange = 'onPositionNameChange' :posi='position' titleName='地点位置'></position>
        <phone @phoneChange='onPhoneChange' :pho='phone'></phone>
        <photo :showTwo='isMerchant' @photoSubmitStatusChange='onPhotoSubmitStatusChange' @photoListChange='onPhotoListChange' @licensePhotoListChange='onlicensePhotoListChange'></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述该地点特征，如周边建筑或所在街道等'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable'  @clickBtn='addPoi' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
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
            poi_longitude: '',
            poi_latitude: '',
            loadingShow: false
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id || '',
                'nick_name':this.nick_name || '',
                'entry': 11,
                'issue_type':1001,
                "issue_time": 0,
                'my_longitude': this.lon ,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                "poi_name": this.position.name,
                "city_code": "110000",
                'poi_longitude': this.poi_longitude,
                'poi_latitude': this.poi_latitude,
                'poi_address': this.position.addr,
                'poi_tel': '',  // this.position.phone,
                'poi_license':'',  
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    created: function () {
        document.title = '新增地点'
    },
    mounted: function () {
        var  self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '新增地点'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
        })
        var tid = ''
        mapGetUserInfo(function(data){
            var user_id,nick_name,reqid
            var param = {}
            user_id = data.userId
            nick_name = data.nick
            var url = baseUrls+'/spawn'
            
            //获取reqid
            getReqId.getReqId(function(reqid){
                if(reqid){
                    function sendReq (url, param) {
                        param = {
                            user_id,
                            reqid
                        }
                        var s=''  //拼接所有字段的和
                        for(var key in objKeySort.objKeySort(param)){
                            s += objKeySort.objKeySort(param)[key];
                        }
                        param.sign = ''
                        param.sign = md5(s+'sosomap')
                        var url = baseUrls+'/spawn&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
                        self.$http.get(url).then(function (res) {
                            self.tid = res.data.data.tid;
                            self.reqId = reqid;
                        }).catch(function (error) {
                        })
                    }
                    sendReq (url, param)    
                }else{
                }
            })

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
           var  self = this;
           self.loadingShow = true
           if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: String(self.photoList)}, function (result) {
                    console.log(result, 'upLoadPics')
                    if(result) {
                        // photo：照片 poi_license: 营业执照
                        self.photo = String(result)
                        console.log(self.photo)
                        if(self.photo){
                            console.log(self.photo,'upload');
                            console.log(self,'upload');
                            var url = baseUrl+'poi/new'
                            var param = self.submitData
                            self.sendReq(url, param)
                        }else{
                            var url = baseUrl+'poi/new'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'poi/new'
                var param = self.submitData
                param.photo = ''
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
                if (this.place !== '' && this.position !== '') {
                    this.disable = false
                } else {
                    this.disable = true
                }
            }
        },
        onPhoneChange (phoneNum) {
            this.phone = phoneNum
        },
        onIsMerchantChange (isMerchant) {
            this.isMerchant = isMerchant
        },
        onPlaceChange (place) {
            this.place = place
            this.checkSubmitStatus()
        },
        onPositionChange (position) {
            console.log(position, 'position')
            this.position = position;
            this.poi_longitude= this.position.point.mLongitudeE6
            this.poi_latitude= this.position.point.mLatitudeE6
            this.checkSubmitStatus()
        },
        onPositionNameChange(positionName){
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
            console.log('onPhotoListChange ', photoList)  //这块是图片的路径
            this.photoList = photoList
        },
        onlicensePhotoListChange (photoList) {
            console.log('onlicensePhotoListChange', photoList)
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
