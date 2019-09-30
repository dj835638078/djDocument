<template>
    <div class="errorRoad"> <!--  -->
        <place  @placeChange='onRoadChange' :pla='roadName' :simple='simple' titleName='道路名称' plaholder='请输入道路的名称' :plaRequire="false"></place>
        <position @positionChange='onPositionChange' @positionNameChange = 'onPositionNameChange' :posi='position' titleName='道路位置'></position>
        <div class="container">
            <div class="title">道路错误类型</div><div class="xing">*</div>
            <div class="radio-container">
                <div class="radio">
                    <input type="radio" id="forbidding" value="禁行错误" ref="forbidding" v-model="picked" @click='pickClick'>
                    <label for="forbidding">禁行错误</label>
                </div>
                <div class="radio">
                    <input type="radio" id="road" value="道路不存在" ref="road" v-model="picked" @click='pickClick'>
                    <label for="road">道路不存在</label>
                </div>
                <div class="radio">
                    <input type="radio" id="limiting" value="限速错误" ref="limiting" v-model="picked" @click='pickClick'>
                    <label for="limiting">限速错误</label>
                </div>
                <div class="radio">
                    <input type="radio" id="other" value="其他" ref="other" v-model="picked" @click='pickClick'>
                    <label for="other">其他</label>
                </div>
            </div>
        </div>
        <div class="border"></div>
        <div class="forbid-con container-wrap" v-show="isForbidShow">
            <div class="container">
                <div class="title">禁行详情</div><div class="xing">*</div>
                <div class='forbid-option'>
                    <div class='forbid-left' ref="forbid-left" id="1"   @click="forbidClick" ></div>
                    <div class='forbid-right' ref="forbid-right" id="2"   @click="forbidClick"></div>
                    <div class='forbid-turnAround' ref="forbid-turnAround" id="3"  @click="forbidClick"></div>
                    <div class='forbid-forward' ref="forbid-forward" id="4"  @click="forbidClick"></div>
                </div>
            </div>
            <div class="border"></div>
        </div>
        <photo @photoListChange='onPhotoListChange' :positionNameThrow="positionNameThrow"></photo>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述该地点特征，如周边建筑或所在街道等' :required="required"></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable'  @clickBtn='errorRoad' :loadShow="loadingShow"></submit>
    </div>
</template>

<script>
/* 道路报错 */
import normalImg from '../commons/img/ic_radio_normal.png'
import checkedImg from '../commons/img/ic_radio_checked.png'
import place from './subComponents/place'
import position from './subComponents/position'
import photo from './subComponents/photo'
import description from './subComponents/description'
import contact from './subComponents/contact'
import submit from './subComponents/submit'
import leftImg from '../commons/img/report_left_normal.png'
import rightImg from '../commons/img/report_right_normal.png'
import straightImg from '../commons/img/report_straight_normal.png'
import turnAroundImg from '../commons/img/report_turnAround_normal.png'
import leftImgSelect from '../commons/img/report_left_select.png'
import rightImgSelect from '../commons/img/report_right_select.png'
import straightImgSelect from '../commons/img/report_straight_select.png'
import turnAroundImgSelect from '../commons/img/report_turnAround_select.png'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'errorRoad',
    mixins: [mixin],    
    data: function () {
        return {
            picked: '',
            simple: true,
            roadName: '',
            position: '',
            description: '',
            mobilePhone: '',
            disable: true,
            isForbidShow: false,
            forbid: '',
            tid:'',
            reqId: '',
            photoList: [],
            loadingShow: false,
            issue_type:3101,
            entry:'',
            positionName:"",
            required:false,
            positionNameThrow:"road"
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
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': parseInt(this.entry)  || 14,
                'issue_type': this.issue_type || 3101,  
                'issue_time': 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                'photo': this.photo,
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'route_name':this.roadName,
                'route_longitude':this.poi_longitude || this.longitude,
                'route_latitude':this.poi_latitude || this.latitude,
                'route_forbid_type': Number(this.forbid),
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    mounted: function () {
        var  self = this
        if (self.$route.name == "errorRoadFeedback") {
            mapDataReport("ugcreport_roaderror")
        } else {
            mapDataReport("homepage_report_roaderror")
        }
        nativeSetNavBarTitle('道路报错')
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            if (result && result.entry) {
                self.entry = result.entry
            }
            if (self.$route.name == "errorRoadReporter") {
                console.log(self.$route.name)
                self.entry = 13
            }
        })
    },
    methods: {
        forbidClick (e) {
            document.querySelector('.forbid-left').style.backgroundImage = "url('" + leftImg + "')"
            document.querySelector('.forbid-right').style.backgroundImage = "url('" + rightImg + "')"
            document.querySelector('.forbid-turnAround').style.backgroundImage = "url('" + turnAroundImg + "')"
            document.querySelector('.forbid-forward').style.backgroundImage = "url('" + straightImg + "')"
            if (e.target.id === '1') {
                this.forbid = e.target.id
                e.target.style.backgroundImage = "url('" + leftImgSelect + "')"
            } else if (e.target.id === '2') {
                this.forbid = e.target.id
                e.target.style.backgroundImage = "url('" + rightImgSelect + "')"
            } else if (e.target.id === '3') {
                this.forbid = e.target.id
                e.target.style.backgroundImage = "url('" + turnAroundImgSelect + "')"
            } else if (e.target.id === '4') {
                this.forbid = e.target.id
                e.target.style.backgroundImage = "url('" + straightImgSelect + "')"
            }
        },
        pickClick (e) {
            this.$refs.forbidding.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.road.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.limiting.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.other.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            var radio1 = {
                    '禁行错误': 3102,
                    '限速错误': 3101,
                    '道路不存在': 3103,
                    '其他': 3104,
                }
            this.issue_type =  radio1[e.target.value]
            if(e.target.value == '其他'){
                this.required = true
            }else{
                this.required = false
            }
        },
        checkSubmitStatus () {
            if (!this.checkPhoneNumber()) {
                this.disable = true
            }
            else if(this.issue_type === 3104){
                if(this.description && this.positionName){
                    this.disable = false
                }else{
                    this.disable = true
                }
            }
             else {
                // this.disable = false
                if (this.issue_type != 3102 && this.picked !== '' && this.position !== '' && this.positionName !=="") {
                    this.disable = false
                } else if (this.issue_type == 3102 && this.position !== '' && this.forbid !== '' && this.positionName !== "") {
                    this.disable = false
                } else {
                    this.disable = true
                }
            }

        },
        onRoadChange (place) {
            this.roadName = place
            //this.checkSubmitStatus()
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
            this.positionName = positionName
            if (!positionName) {
                this.disable = true
            } else {
                this.checkSubmitStatus()
            }
        },
        onDescriptionChange (desc) {
            this.description = desc
            this.checkSubmitStatus()
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkPhoneNumber()
            this.checkSubmitStatus()
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        errorRoad (){
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
                        url = baseUrl+'?qt=/api/ticket/spawn&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
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
            if (self.$route.name == "errorRoadFeedback") {
                mapDataReport("ugcreport_roaderror_submit")
            } else {
                mapDataReport("homepage_report_roaderror_submit")
            }
            if (self.issue_type === 3104) {
                if (self.description && self.description.length < 5) {
                window.nativeShowToast('问题描述至少5字')
                return
            }
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
                            var url = baseUrl+'?cmd=/api/route/correct'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'?cmd=/api/route/correct'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
            } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/route/correct'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
            } 
        }
    },    
    watch: {
        picked: function () {
            this.checkSubmitStatus()
            if (this.picked === '禁行错误') {
                // this.forbid = ''
                let forbidFlag = this.forbid
                this.isForbidShow = true
                document.querySelector('.forbid-left').style.backgroundImage = "url('" + leftImg + "')"
                document.querySelector('.forbid-right').style.backgroundImage = "url('" + rightImg + "')"
                document.querySelector('.forbid-turnAround').style.backgroundImage = "url('" + turnAroundImg + "')"
                document.querySelector('.forbid-forward').style.backgroundImage = "url('" + straightImg + "')"
                if (forbidFlag === '1') {
                    document.querySelector('.forbid-left').style.backgroundImage = "url('" + leftImgSelect + "')"
                } else if (forbidFlag === '2') {
                    document.querySelector('.forbid-right').style.backgroundImage = "url('" + rightImgSelect + "')"
                } else if (forbidFlag === '3') {
                    document.querySelector('.forbid-turnAround').style.backgroundImage = "url('" + turnAroundImgSelect + "')"
                } else if (forbidFlag === '4') {
                    document.querySelector('.forbid-forward').style.backgroundImage = "url('" + straightImgSelect + "')"
                }
                this.checkSubmitStatus()
            } else {
                this.isForbidShow = false
            }
        },
        roadName: function () {
            this.checkSubmitStatus()
        },
        forbid: function () {
            if (this.isForbidShow) {
                this.checkSubmitStatus()
            }
        }
    }
}
</script>
<style scoped>
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
.forbid-option{
    overflow: hidden;
    margin-top: 0.1rem;
}
.forbid-option> div{
    width: 0.8rem;
    height: 0.9rem;
    border-radius: 0.02rem;
    float: left;
    margin-right: 0.05rem;
    background-size: 0.8rem 0.9rem;
    background-repeat: no-repeat;
}
.forbid-option> div:nth-last-of-type(1){
    margin-right: 0.0rem;
}
#forbidding{
    -webkit-tap-highlight-color:transparent;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
