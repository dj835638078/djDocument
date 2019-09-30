<template>
    <div class="addLine">
        <place  @placeChange='onRouteChange' :pla='stationPosition' :simple='simple' titleName='线路名称' plaholder='例如:  375路'></place>
        <photo imgTxt='请对准新增公交站牌拍照，提供真实照片，通过率更高' @photoListChange='onPhotoListChange' :positionNameThrow="positionNameThrow"></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述线路首末班车时间等'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' :loadShow="loadingShow"  @clickBtn='addLine'></submit>
    </div>
</template>
<script>
/* 新增公交线 */
import place from './subComponents/place'
import photo from './subComponents/photo'
import description from './subComponents/description'
import submit from './subComponents/submit'
import contact from './subComponents/contact'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'addLine',
    mixins: [mixin],
    data: function () {
        return {
            simple: true,
            stationPosition: '',
            isMerchant: false,
            description: '',
            mobilePhone: '',
            disable: true,
            tid:'',
            reqId: '',
            photoList: [],
            loadingShow: false,
            entry:'',
            positionNameThrow:"bus"
        }
    },
    components: {
        place,
        photo,
        description,
        contact,
        submit
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': parseInt(this.entry)  || 14,
                'issue_type':2200,
                'issue_time': 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'station_route_name':this.stationPosition,
            }
            return {
                ...data,
                ...this.deviceInfo
            }

        }
    },
    methods: {
        addLine(v){
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
                    window.nativeShowToast('网络错误')
                }
            })
        })
        },
        submitOpe () {
            var  self = this
            if (self.$route.name == "addLineFeedback") {
                mapDataReport("ugcreport_addbus_submit")
            } else {
                mapDataReport("homepage_report_addbus_submit")
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
                            var url = baseUrl+'?cmd=/api/station/route/new'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'?cmd=/api/station/route/new'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/station/route/new'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           } 
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        checkSubmitStatus () {
            if (!this.checkPhoneNumber()) {
                this.disable = true
            } else {
                if (this.stationPosition !== '') {
                    this.disable = false
                } else {
                    this.disable = true
                }
            }
        },
        onRouteChange (route) {
            this.stationPosition = route
            this.checkSubmitStatus()
        },
        onDescriptionChange (desc) {
            this.description = desc
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
        }
    },
    mounted: function () {
        var  self = this
        if (self.$route.name == "addLineFeedback") {
            mapDataReport("ugcreport_addbus")
        } else {
            mapDataReport("homepage_report_addbus")
        }
        nativeSetNavBarTitle('新增路线')
        nativeSetNavBarVisible()
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            //console.log(result,'entry 上报')
            if (result && result.entry) {
                self.entry = result.entry
            }
            if (self.$route.name == "addLineReporter") {
                console.log(self.$route.name)
                self.entry = 13
            }
        })
    },
}
</script>
