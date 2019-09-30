<template>
    <div class="container-wrap">
        <router-link to='/start-position-index' style="color:white;">
            <div class="how-position">
                如何更准确定位？
            </div>
        </router-link>
        <div class="container">
            <div class="title radio-title">请选择问题场景</div><div class="xing">*</div>
            <div class="radio-container">
                <div class="radio">
                    <input type="radio" id="driveNavigation" :value="pick[0]" ref="driveNavigation"  @click='pickClick'>
                    <label for="driveNavigation">{{pick[0]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="busNavigation" :value="pick[1]" ref="busNavigation"  @click='pickClick'>
                    <label for="busNavigation">{{pick[1]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="walkNavigation" :value="pick[2]" ref="walkNavigation" @click='pickClick'>
                    <label for="walkNavigation">{{pick[2]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="rideNavigation" :value="pick[3]" ref="rideNavigation"  @click='pickClick'>
                    <label for="rideNavigation">{{pick[3]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="otherDrive" :value="pick[4]" ref="otherDrive"  @click='pickClick'>
                    <label for="otherDrive">{{pick[4]}}</label>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="title radio-title">请选择问题类型</div><div class="xing">*</div>
            <div class="radio-container">
                <div class="radio">
                    <input type="radio" id="Inaccurate" :value="pick0[0]" ref="Inaccurate"  @click='pickClick0'>
                    <label for="Inaccurate">{{pick0[0]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="pointer" :value="pick0[1]" ref="pointer"  @click='pickClick0'>
                    <label for="pointer">{{pick0[1]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="weak" :value="pick0[2]" ref="weak"  @click='pickClick0'>
                    <label for="weak">{{pick0[2]}}</label>
                </div>
                <div class="radio" style="margin-left:-0.14rem;">
                    <input type="radio" id="unableInaccurate" :value="pick0[3]" ref="unableInaccurate" @click='pickClick0'>
                    <label for="unableInaccurate">{{pick0[3]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="otherType" :value="pick0[4]" ref="otherType" @click='pickClick0'>
                    <label for="otherType">{{pick0[4]}}</label>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="title radio-title">定位不准时间</div><div class="xing">*</div>
            <div class="radio-container">
                <div class="radio">
                    <input type="radio" id="now" :value="pick1[0]" ref="now" @click='pickClick1'>
                    <label for="now">{{pick1[0]}}</label>
                </div>
                <div class="radio"  style="margin-left:0.27rem;">
                    <input type="radio" id="fifteen" :value="pick1[1]" ref="fifteen"  @click='pickClick1'>
                    <label for="fifteen">{{pick1[1]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="thirty" :value="pick1[2]" ref="thirty"  @click='pickClick1'>
                    <label for="thirty">{{pick1[2]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="oneHour" :value="pick1[3]" ref="oneHour"  @click='pickClick1'>
                    <label for="oneHour">{{pick1[3]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="beforeOneHour" :value="pick1[4]" ref="beforeOneHour" @click='pickClick1'>
                    <label for="beforeOneHour">{{pick1[4]}}</label>
                </div>
            </div>
        </div>
        <position @positionChange='onPositionChange' @positionNameChange = 'onPositionNameChange' :posi='position' titleName='定位不准时的位置'></position>
        <description style="word-wrap:break-word;" @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述您出现定位问题时的真实位置，和大致时间点（如上午8点左右，下午等）'></description>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' @clickBtn='inaccuratePositionBtn' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
import normalImg from '../commons/img/ic_radio_normal.png'
import checkedImg from '../commons/img/ic_radio_checked.png'
import position from './subComponents/position'
import description from './subComponents/description'
import contact from './subComponents/contact'
import submit from './subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  //新增的加密方式
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'InaccuratePositioning',
    mixins: [mixin],
    data: function () {
        return {
            position: '',
            picked3: '',
            picked0:'',
            picked1:'',
            mobilePhone: '',
            disable: true,
            description: '',
            tid:'',
            reqId: '',
            loadingShow: false
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 11,
                'issue_type': 4002,
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photoList,  //这块的数据格式 ，志强还没给
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'location_scene':5,
                'location_duration':this.navigationDur,
                'location_longitude':this.poi_longitude,
                'location_latitude':this.poi_latitude,
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    created: function () {
        this.pick = ['驾车导航', '公交导航', '步行导航', '骑行导航','其他']
        this.pick0 = ['定位不准', '指针方向不准', 'GPS信号弱', '无法定位','其他']
        this.pick1 = ['现在', '15分钟内', '半小时内', '1小时内','1小时之前']
    },
    mounted: function () {
        var  self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '定位不准'}, function (result) { 
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
        position,
        description,
        contact,
        submit
    },
    methods: {
        pickClick (e) {
            this.$refs.driveNavigation.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.busNavigation.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.walkNavigation.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.rideNavigation.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.otherDrive.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            this.picked3 = e.target.value
            this.checkSubmitStatus()
            var radio1 = {
                    '驾车导航': 1,
                    '公交导航': 2,
                    '步行导航': 3,
                    '骑行导航': 4,
                    '其他': 5,
                }
            this.navigation =  radio1[e.target.value]
        },
        pickClick0 (e) {
            this.$refs.Inaccurate.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.pointer.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.weak.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.unableInaccurate.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.otherType.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            //this.pickType = e.target.value
            this.picked0 = e.target.value
            this.checkSubmitStatus()
            var radio2 = {
                    '定位不准': 4001,
                    '指针方向不准': 4002,
                    'GPS信号弱': 4003,
                    '无法定位': 4004,
                    '其他': 4005,
                }
            this.weekNavigation =  radio2[e.target.value]
        },
        pickClick1 (e) {
            this.$refs.now.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.fifteen.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.thirty.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.oneHour.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.beforeOneHour.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            this.picked1 = e.target.value
            this.checkSubmitStatus()
            var radio3 = {
                    '现在': 1,
                    '15分钟内': 2,
                    '半小时内': 3,
                    '1小时内': 4,
                    '1小时之前': 5,
                }
            this.navigationDur =  radio3[e.target.value]
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
        onDescriptionChange (desc) {
            this.description = desc
            console.log(this.description)
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            console.log(this.mobilePhone)
            this.checkSubmitStatus()
        },
        
        checkSubmitStatus () {
            console.log(this.picked3, this.picked1, this.picked0)
            if (!this.checkPhoneNumber()) {
                this.disable = true
            }else {
                if (this.position !== '' && this.picked3 !== '' && this.picked0 !== '' && this.picked1 !== '') { 
                    this.disable = false
                } else {
                    this.disable = true
                }
            }
        },
        inaccuratePositionBtn () {
            var  self = this
            self.loadingShow = true
            var url = baseUrl+'location/issue'
            var param = self.submitData
            self.sendReq (url, param)
        },
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
.how-position{
    height:0.38rem;
    font-size: 0.14rem;
    color: #FFFFFF;
    background: #427CFF;
    padding-left:0.2rem;
    line-height:0.38rem;
    z-index:1
}
</style>
