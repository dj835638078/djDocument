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
        <photo @photoListChange='onPhotoListChange'></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述该地点特征，如周边建筑或所在街道等'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' :loadShow="loadingShow" @clickBtn='errorPoi'></submit>
    </div>
</template>
<script>
import normalImg from '../commons/img/ic_radio_normal.png'
import checkedImg from '../commons/img/ic_radio_checked.png'
import photo from './subComponents/photo'
import description from './subComponents/description'
import contact from './subComponents/contact'
import submit from './subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'errorPoi',
    mixins: [mixin],
    data: function () {
        return {
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
            loadingShow: false
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id': this.user_id,
                'entry': 11,
                'issue_type': this.issue_type,
                'nick_name':this.nick_name,
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo':this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code':'110000',
                'poi_correct_name': this.poiName,
                "poi_id": this.poi_id,
                "poi_province": this.poi_province,
                "poi_city": this.poi_city,
                "poi_district": this.poi_district,
                "poi_category": this.poi_category,
                "poi_category_code": this.poi_category_code,
                "poi_correct_longitude": Number(this.poi_correct_longitude),
                "poi_correct_latitude": Number(this.poi_correct_latitude),
                "poi_correct_openting_time":this.poi_correct_openting_time ,
                "poi_correct_address": this.poiAddr,  
                "poi_correct_tel": "",
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
        console.log('created')
        this.pick = ['地点仍在运营', '位置错误', '信息错误']
        document.title = '地点报错'
    },
    mounted: function () {
        var self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '地点报错'}, function (result) { 
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
                    var s='' 
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
        //获取所需要的poi信息
        window.mqq.invoke('ugc', 'searchPoi', {
                'type': 12  //纠错  新增
            }, function (result) {
                console.log(result, 'result search poi')
                if(!result || (!result.poiName && !result.poi)){
                    history.go(-1)
                }
                self.credibility = JSON.parse(result.poi).credibility
                //console.log(JSON.parse(result.poi).credibility,'打印可信度的值')
               if(self.credibility == '99' || self.credibility == '94' || self.credibility == '91' ||self.credibility == '70' ||self.credibility == '40' ||self.credibility == '其他值'){
                   //console.log('我是 地点不存在')
                   self.pick[0] = '地点不存在'
               }else if(self.credibility == '41' || self.credibility == '12' || self.credibility == '11' ||self.credibility == '4' ||self.credibility == '3' ||self.credibility == '2'){
                   self.pick[0] = '地点仍在运营'
                //    console.log(self.pick[0] = '地点仍在运营','看下有无this')
               }
                self.poiName = result.poiName
                self.poiAddr = JSON.parse(result.poi).addr
                self.poi_id = JSON.parse(result.poi).uid
                self.poi_province = JSON.parse(result.poi).province
                self.poi_city = JSON.parse(result.poi).city
                self.poi_district = JSON.parse(result.poi).district
                self.poi_area_code = JSON.parse(result.poi).uid
                self.poi_category = JSON.parse(result.poi).category
                self.poi_category_code = String(JSON.parse(result.poi).categoryCode)
                self.poi_correct_name = JSON.parse(result.poi).name
                self.poi_correct_longitude = JSON.parse(result.poi).point.mLongitudeE6
                self.poi_correct_latitude = JSON.parse(result.poi).point.mLatitudeE6
                self.poi_correct_openting_time = JSON.parse(result.poi).openTime
        })
    },
    components: {
        photo,
        description,
        contact,
        submit
    },
    methods: {
        pickClick (e) {
            this.$refs.driveNavigation.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.busNavigation.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.walkNavigation.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            this.picked = e.target.value
            this.checkSubmitStatus()
            var radio1 = {
                    '地点仍在运营': 1104,
                    '位置错误': 1103,
                    '信息错误': 1101,
                    '地点不存在':1102,
                }
            this.issue_type =  radio1[e.target.value]
            //console.log(this.issue_type,'看下能否替换 地点错误类型')
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
        onPhotoListChange (photoList) {
            console.log('photoList ', photoList)
            this.photoList = photoList
        },
        checkSubmitStatus () {
            if (!this.checkPhoneNumber()) {
                this.disable = true
            } else {
                if (this.picked !== '') {
                    this.disable = false
                } else {
                    this.disable = true
                }
            }
        },
        errorPoi(v){
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
                            var url = baseUrl+'poi/correct'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'poi/correct'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'poi/correct'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           }    
        },
    },
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
</style>
