<template>
    <div class="addRoad">
        <place @placeChange='onPlaceChange' :pla='place' :simple='simple' :plaRequire='placeRequire' titleName='道路名称' plaholder='请输入缺失的道路名称'></place>
        <positions @positionChange='onPositionChange' @newNameChange='onNewNameChange' :posi='addRoadPosi' titleName='所在位置'></positions>
        <photo imgTxt='请对准新增道路路牌拍照，提供真实照片，通过率更高' @photoListChange='onPhotoListChange' :positionNameThrow="positionNameThrow"></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述道路相关信息'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' :loadShow="loadingShow"  @clickBtn='addRoad'></submit>
    </div>
</template>
<script>
/* 新增道路 */
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
            entry:'',
            positionNameThrow:"road",
            positionName:""
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': parseInt(this.entry)  || 14,
                'issue_type':3001,  
                'issue_time': 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'route_name':this.place,
                'route_start_longitude':this.route_start_longitude || this.longitude,
                'route_start_latitude':this.route_start_latitude || this.latitude,
                'route_end_longitude':this.route_end_longitude || this.longitude,
                'route_end_latitude':this.route_end_latitude || this.latitude,
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    mounted: function () {
        var  self = this;
        if (self.$route.name == "addRoadFeedback") {
            mapDataReport("ugcreport_addraod")
        } else {
            mapDataReport("homepage_report_addraod")
        }
        nativeSetNavBarTitle('新增道路')
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            if (result && result.entry) {
                self.entry = result.entry
            }
            if (self.$route.name == "addRoadReporter") {
                console.log(self.$route.name)
                self.entry = 13
            }
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
            var  self = this
            if (self.$route.name == "addRoadFeedback") {
                mapDataReport("ugcreport_addroad_submit")
            } else {
                mapDataReport("homepage_report_addroad_submit")
            }
            self.loadingShow = true
            //console.log(self.photoList.length,'新增道路里面，图片长度')
            if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: self.photoList.join(",")}, function (result) {
                    if(result) {
                        if (result[0] instanceof Array) {
                            self.photo = result[0].join(";")
                        } else {
                            self.photo = result.join(";")
                        }
                        if(self.photo){
                            var url = baseUrl+'?cmd=/api/route/new'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'?cmd=/api/route/new'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/route/new'
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
                //console.log(this.newPosi,'看下有添加进来吗？')
            }
            this.checkSubmitStatus()
        },
        onNewNameChange(newName){
            this.positionName = newName
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
        },
        onDescriptionChange (desc) {
            this.description = desc
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
            if (!this.positionName) {
                this.disable = true
            }
        },
    }
}
</script>
<style scoped>

</style>
