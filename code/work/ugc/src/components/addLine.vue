<template>
    <div class="addLine">
        <place  @placeChange='onRouteChange' :pla='stationPosition' plaRequire='placeRequire' :simple='simple' titleName='线路名称' plaholder='例如:  375路'></place>
        <photo imgTxt='请对准新增公交站牌拍照，提供真实照片，通过率更高' @photoListChange='onPhotoListChange'></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述线路首末班车时间等'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' :loadShow="loadingShow"  @clickBtn='addLine'></submit>
    </div>
</template>
<script>
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
            loadingShow: false
        }
    },
    components: {
        place,
        photo,
        description,
        contact,
        submit
    },
    created: function () {
        document.title = '新增公交线路'
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 11,
                'issue_type':2200,
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
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
            var  self = this
            self.loadingShow = true
            if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: String(this.photoList)}, function (result) {
                    console.log(result, 'upLoadPics')
                    if(result) {
                        self.photo = String(result)
                        console.log(self.photo)
                        if(self.photo){
                            console.log(self.photo,'upload');
                            console.log(self,'upload');
                            var url = baseUrl+'station/route/new'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'station/route/new'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'station/route/new'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           } 
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
            // console.log('这个是addpoi',String(photoList))
        },
        checkSubmitStatus () {
            console.log(this.disable)
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
            console.log(this.description)
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            console.log(this.mobilePhone)
            this.checkSubmitStatus()
        }
    },
    mounted: function () {
        var  self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '新增路线'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarVisible', {visible: true}, function (result) {})
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
                        var s=''  
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
    }
}
</script>
