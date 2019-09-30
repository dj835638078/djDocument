<template>
    <div class="container-wrap">
        <div v-show="!visible">
           <div class="container">
                <div class="title radio-title">请选择站点问题</div><div class="xing">*</div>
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
                </div>
            </div>
            <div @click='lineVisible' class="container">
                <div style="display:inline-block;" >选择线路</div><div style="display:inline-block;" class="xing">*</div>
                <div class="arrow">></div>
                <div style="display:inline-block;width:150px;">
                    <input type="text" class="place-content" v-model='lineNames' :style='{display: display}' style="width:100px;background-image:none">
                </div>
            </div>
            <position v-show='picked === pick[0] || picked === pick[1]' @positionChange='onPositionChange' @positionNameChange="onPositionNameChange" :posi='position' :titleName='titleName'></position>
            <place v-show='picked === pick[2]' @placeChange='onNameChange' :pla='rightName' :simple='simple' titleName='正确名称' plaholder='输入该站点名称'></place> 
            <photo imgTxt='请在错误位置拍摄站牌照片'  @photoListChange='onPhotoListChange'></photo>
            <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请输入问题描述，以便我们及时为你解决'></description>
            <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
            <submit :disable='disable' :subData='submitData' @clickBtn='errorBusStation' :loadShow="loadingShow"></submit>
        </div>
        <div>
            <busLine v-show="visible" @lineSelect='onBusLineBtn'></busLine> 
        </div>    
    </div>
</template>
<script>
import normalImg from '@/commons/img/ic_radio_normal.png'
import checkedImg from '@/commons/img/ic_radio_checked.png'
import busLine from '@/components/subComponents/busLine'
import position from '@/components/subComponents/position'
import place from '@/components/subComponents/place'
import photo from '@/components/subComponents/photo'
import description from '@/components/subComponents/description'
import contact from '@/components/subComponents/contact'
import submit from '@/components/subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'

export default {
    name: 'errorBusStation',
    mixins: [mixin],
    data: function () {
        return {
            titleName: '在哪找不到该点',
            simple: true,
            picked: '',
            position: '',
            rightName: '',
            description: '',
            disable: true,
            photoList: [],
            mobilePhone: '',
            tid:'',
            reqId: '',
            sUid:'',  //这块是从附近站点传过来的id 用于渲染起始公交站点
            id:'',
            issue_type:'',
            names:'',
            a:'',
            b:this.$route.query.lon,
            c:this.$route.query.lat,
            visible:false,
            display:'block',
            lineNames: '',
            loadingShow: false
        }
    },
    computed: {
        submitData: function () {
            var obj = {}
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 11,
                'issue_type': this.issue_type || 2401,
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photoList,  
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'station_err_name':this.$route.query.name,
                'station_name':this.rightName,
                'station_route_name':this.lineNames,
                'station_longitude':this.poi_longitude || 0,
                'station_latitude':this.poi_latitude || 0,
            }
            return {
                //...obj,
                ...data,
                ...this.deviceInfo
            }
        }
    },
    created: function () {
        this.pick = ['找不到站点', '站点位置错误', '站点名称错误', '其他问题']
        document.title = '站点报错'
    },
    mounted: function () {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '站点报错'}, function (result) { 
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
        busLine,
        position,
        place,
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
            this.$refs.rideNavigation.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            this.picked = e.target.value
            this.checkSubmitStatus()
            var radio1 = {
                    '找不到站点': 2401,
                    '站点位置错误': 2402,
                    '站点名称错误': 2403,
                    '其他问题': 2404,
                }
            this.issue_type =  radio1[e.target.value]
        },
        onPositionChange (position) {
            this.position = position
            var poi_longitude = "";
            var poi_latitude = "";
            this.poi_longitude= this.position.point.mLongitudeE6
            this.poi_latitude= this.position.point.mLatitudeE6
            this.checkSubmitStatus()
        },
        onPositionNameChange (positionName) {
            if (!positionName) {
                this.disable = true
            } else {
                this.checkSubmitStatus()
            }
        },
        onNameChange (name) {
            this.rightName = name
            this.checkSubmitStatus()
        },
        onDescriptionChange (desc) {
            this.description = desc
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
        },
        checkSubmitStatus () {
            console.log(this.picked)
            if (!this.checkPhoneNumber() || !this.picked) {
                this.disable = true
            } 
            else if (this.picked === this.pick[0] || this.picked === this.pick[1]) {
                if (this.lineNames && this.position) {
                    this.disable = false
                } else {
                    this.disable = true
                }
            } else if (this.picked === this.pick[2]) {
                if (this.lineNames && this.rightName) {
                    this.disable = false
                } else {
                    this.disable = true
                }
            } else {
                if (this.lineNames) {
                    this.disable = false
                } else {
                    this.disable = true
                }
            } 
        },
        errorBusStation(){
            // console.log(this.$route.query.names,'这个是busLine里面的name')
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
                            var url = baseUrl+'station/correct'
                            var param = self.submitData
                            param.photo = self.photo
                            param.station_err_longitude = self.lon
                            param.station_err_latitude = self.lat
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            param.station_err_longitude = self.lon
                            param.station_err_latitude = self.lat
                            var url = baseUrl+'station/correct'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'station/correct'
                var param = self.submitData
                param.photo = ''
                param.station_err_longitude = self.lon
                param.station_err_latitude = self.lat
                self.sendReq (url, param)
           } 
        },
        onBusLineBtn(lineNames){
            this.lineNames = lineNames;
            this.visible = false;
            this.checkSubmitStatus()
        },
        lineVisible(){
            this.visible = true;
        },
    },
    watch: {
        picked: function () {
            if (this.picked === this.pick[0]) {
                this.titleName = '在哪找不到该点'
            } else {
                this.titleName = '纠正位置'
            }
        }
    }
}
</script>
<style scoped>
.radio {
    margin-top: 0.18rem;
    display: inline-block;
    margin-right: 0.4rem;
}
input {
    width: 0.24rem;
    height: 0.24rem;
    background-image: url('../../commons/img/ic_radio_normal.png');
    background-size: 100% 100%;
    background-repeat:no-repeat;
    vertical-align: middle;
}
label {
    vertical-align: middle;
}
.xing{
    display:inline-block;
}
.arrow {
    position: absolute;
    right: 0.2rem;
    top: 0.14rem;
    color: #888888;
}
</style>
