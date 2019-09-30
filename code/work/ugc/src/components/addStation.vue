<template>
    <div class="addStation">
        <place  @placeChange='onPlaceChange' :pla='stationName' :simple='simple' titleName='车站名称' plaholder='例如:  海淀桥北站'></place>
        <place  @placeChange='onRouteChange' :pla='stationPosition' :simple='simple' titleName='线路名称' plaholder='例如:  375路'></place>
        <position @positionChange='onPositionChange' @positionNameChange = 'onPositionNameChange' :posi='position' titleName='地点位置'></position>
        <photo imgTxt='请对准公交站牌拍照，提供真实照片，通过率更高' @photoListChange='onPhotoListChange'></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述车站相关信息'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' :loadShow="loadingShow"  @clickBtn='addStation'></submit>
    </div>
</template>
<script>
import place from './subComponents/place'
import position from './subComponents/position'
import photo from './subComponents/photo'
import description from './subComponents/description'
import submit from './subComponents/submit'
import contact from './subComponents/contact'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'addStation',
    mixins: [mixin],
    data: function () {
        return {
            simple: true,
            stationName: '',
            stationPosition: '',
            route: '',
            position: '',
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
        position,
        photo,
        description,
        contact,
        submit
    },
    created: function () {
        document.title = '新增车站'
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 11,
                'issue_type':2100,
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'station_name':this.stationName,
                'station_route_name':this.stationPosition,
                "station_longitude": this.poi_longitude,
                "station_latitude": this.poi_latitude,
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    methods: {
        addStation(v){
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
                            var url = baseUrl+'station/new'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'station/new'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'station/new'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           } 
        },
        checkSubmitStatus () {
            console.log(this.disable)
            if (!this.checkPhoneNumber()) {
                this.disable = true
            } else {
                //this.disable = false
                if (this.stationName !== '' && this.stationPosition !== '' && this.position !== '') {
                    this.disable = false
                } else {
                    this.disable = true
                }
            }
        },
        onPlaceChange (place) {
            this.stationName = place
            this.checkSubmitStatus()
        },
        onRouteChange (route) {
            this.stationPosition = route
            this.checkSubmitStatus()
        },
        onPositionChange (position) {
            this.position = position
            var poi_longitude = "";
            var poi_latitude = "";
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
        onPhotoListChange (photoList) {
            this.photoList = photoList
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
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '新增车站'}, function (result) { 
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
            var url = baseUrls+'/ticket/spawn'
            
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
                            console.log(res)
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
