<template>
    <div class="container-wrap">
        <posi titleName='地点位置' @posiChange='onPosiChange'  @positionNameChange='onPositionNameChange'></posi> 
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请输入问题描述，以便我们为你解决'></description>
        <photo imgTxt='拍摄包含正确信息的照片，核实速度可加快50%'  @photoListChange='onPhotoListChange'></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' @clickBtn='walkNavigationBtn' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
import posi from '@/components/subComponents/posi'
import photo from '@/components/subComponents/photo'
import description from '@/components/subComponents/description'
import contact from '@/components/subComponents/contact'
import submit from '@/components/subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'walkNavigation',
    mixins: [mixin],
    data: function () {
        return {
            pos: '',
            description: '',
            disable: true,
            photoList: [],
            mobilePhone: '',
            tid:'',
            reqId: '',
            nav_start_longitude:'',
            nav_start_latitude:'',
            nav_end_longitude:'',
            nav_end_latitude:'',
            nav_issue_longitude:'',
            nav_issue_latitude:'',
            loadingShow:false
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 1,
                'issue_type':6003,
                "issue_time": 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                'tid':this.tid,
                'seq_id': this.reqId,
                "city_code": "110000",
                'nav_date':0,
                'nav_start_longitude':Number(this.nav_start_longitude),
                'nav_start_latitude':Number(this.nav_start_latitude),
                'nav_end_longitude':Number(this.nav_end_longitude),
                'nav_end_latitude':Number(this.nav_end_latitude),
                'nav_issue_longitude':Number(this.nav_issue_longitude),
                'nav_issue_latitude':Number(this.nav_issue_latitude),
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '步行导航问题'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
        })
        var  self = this
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
                    url = baseUrls+'/spawn&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
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
        posi,
        photo,
        description,
        contact,
        submit
    },
    methods: {
        onPosiChange(result){
            console.log(result, 'result')
            var self = this
            self.pos = result
            var a = JSON.parse(result.endLatLng)
            var b = JSON.parse(result.startLatLng)
            var d = JSON.parse(result.poi)
            self.nav_start_longitude = b.mLongitudeE6
            self.nav_start_latitude = b.mLatitudeE6
            self.nav_end_longitude =  a.mLongitudeE6
            self.nav_end_latitude =  a.mLatitudeE6
            self.nav_issue_longitude =  d.point.mLongitudeE6
            self.nav_issue_latitude =  d.point.mLatitudeE6

            this.checkSubmitStatus()
        },
        onPositionNameChange(pos){
            if (!pos) {
                this.disable = true
            } else {
                this.checkSubmitStatus()
            }
        },
        onDescriptionChange (desc) {
            this.description = desc
        },
        checkSubmitStatus () {
            if (this.checkPhoneNumber() && this.pos) {
                this.disable = false
            } else {
                this.disable = true
            }
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
        },
        walkNavigationBtn () {
            var  self = this
            self.loadingShow = true
            if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: String(self.photoList)}, function (result) {
                    console.log(result, 'upLoadPics')
                    if(result) {
                        self.photo = String(result)
                        console.log(self.photo)
                        if(self.photo){
                            var url = baseUrl+'nav/issue'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'nav/issue'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
            } else {
               // 没图片
                var url = baseUrl+'nav/issue'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           }  
        },
    },
}
</script>
<style scoped>
</style>
