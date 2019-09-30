<template>
    <div class="addRoad">
        <place @placeChange='onPlaceChange' :pla='place' :simple='simple' :plaRequire='placeRequire' titleName='道路名称' plaholder='请输入缺失的道路名称'></place>
        <positions @positionChange='onPositionChange' @newNameChange = 'onNewNameChange' :posi='addRoadPosi' titleName='所在位置'></positions>
        <photo imgTxt='请对准新增道路路牌拍照，提供真实照片，通过率更高' @photoListChange='onPhotoListChange'></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述道路相关信息'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' :loadShow="loadingShow"  @clickBtn='addRoad'></submit>
    </div>
</template>
<script>
import place from './subComponents/place'
import positions from './subComponents/positions'
import photo from './subComponents/photo'
import description from './subComponents/description'
import contact from './subComponents/contact'
import submit from './subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'addRoad',
    mixins: [mixin],
    props: ['subData'],
    data () {
        return {
            simple: true,
            place: '',
            placeRequire: false,
            position: '',
            description: '',
            mobilePhone: '',
            disable: true,
            tid:'',
            reqId: '',
            route_start_longitude:'',
            route_start_latitude:'',
            route_end_longitude:'',
            route_end_latitude:'',
            addRoadPosi:'',
            photoList: [],
            loadingShow: false,
            newPosi:'',
        }
    },
    created: function () {
        document.title = '新增道路'
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 11,
                'issue_type':3001,  
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'route_name':this.place,
                'route_start_longitude':this.route_start_longitude,
                'route_start_latitude':this.route_start_latitude,
                'route_end_longitude':this.route_end_longitude,
                'route_end_latitude':this.route_end_latitude,
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    mounted: function () {
        var  self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '新增道路'}, function (result) { 
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
    },
    components: {
        place,
        positions,
        photo,
        description,
        contact,
        submit
    },
    methods: {
        addRoad(v){
            var  self = this
            self.loadingShow = true
            //console.log(self.photoList.length,'新增道路里面，图片长度')
            if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: String(this.photoList)}, function (result) {
                    console.log(result, 'upLoadPics')
                    if(result) {
                        self.photo = String(result)
                        console.log(self.photo)
                        if(self.photo){
                            console.log(self.photo,'upload');
                            console.log(self,'upload');
                            var url = baseUrl+'route/new'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'route/new'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'route/new'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           } 
        },
        onPlaceChange (place) {
            this.place = place
        },
        onPositionChange (addRoadObj) {
            if(addRoadObj){
                this.route_start_latitude = addRoadObj.startPoi.point.mLatitudeE6
                this.route_start_longitude = addRoadObj.startPoi.point.mLongitudeE6
                this.route_end_latitude = addRoadObj.endPoi.point.mLatitudeE6
                this.route_end_longitude = addRoadObj.endPoi.point.mLongitudeE6
                // console.log(addRoadObj.endPoi.addr,'-0-')

                this.newPosi = addRoadObj.newPosi
                //console.log(addRoadObj.newPosi,'看下有添加进来吗？')
            }
            //this.checkSubmitStatus()
        },
        onNewNameChange(newName){
            if (!newName) {
                this.disable = true
            } else {
                this.checkSubmitStatus()
            }
        },
        checkSubmitStatus () {
            if (this.checkPhoneNumber() && this.newPosi) {
                this.disable = false
            }else {
                this.disable = true
            }
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
            // console.log('这个是addpoi',String(photoList))
        },
        onDescriptionChange (desc) {
            this.description = desc
            console.log(this.description)
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            console.log(this.mobilePhone)
            this.checkSubmitStatus()
        },
    }
}
</script>
<style scoped>

</style>
