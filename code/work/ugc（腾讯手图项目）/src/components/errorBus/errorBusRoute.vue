<template>
    <div class="container-wrap">
        <div  v-show="!visible">
            <div class="container">
                <div class="title">该地点现状</div><div class="xing">*</div>
                <div class="radio-container">
                    <div class="radio" style="margin-right: 0.57rem">
                        <input type="radio" id="forbidding" :value="pick[0]" ref="forbidding" @click='pickClick'>
                        <label for="forbidding">{{pick[0]}}</label>
                    </div>
                    <div class="radio" style="margin-right: 0">
                        <input type="radio" id="road" :value="pick[1]" ref="road" @click='pickClick'>
                        <label for="road">{{pick[1]}}</label>
                    </div>
                    <div class="radio">
                        <input type="radio" id="other" :value="pick[2]" ref="other" @click='pickClick'>
                        <label for="other">{{pick[2]}}</label>
                    </div>
                </div>
            </div>
            <div @click='lineVisible' class="container" v-show='picked === pick[1]'>
                <div style="display:inline-block;font-size:0.16rem;" >多余的线路</div><div style="display:inline-block;" class="xing">*</div>
                <div class="arrow">></div>
                <div class="excess-line" style="">
                    <div class="place-content" :style='{display: display}'>{{lineNames}}</div>
                    <!-- <input type="text" class="place-content" v-model='lineNames' :style='{display: display}' style="background-image:none"> -->
                </div>
            </div>
            <position v-show='picked === pick[0]' @positionChange='onPositionChange' @positionNameChange = 'onPositionNameChange' :posi='position' :titleName='titleName' :required="false"></position>
            <photo imgTxt='请拍摄相关照片'  @photoListChange='onPhotoListChange' :positionNameThrow="positionNameThrow"></photo>
            <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述错误的线路的相关信息' :required="true"></description>
            <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
            <submit :disable='disable' :loadShow="loadingShow" @clickBtn='errorBusRoute'></submit>
        </div>
        <div>
            <chooseBusLine v-show="visible" @busLineBtn='onBusLineBtn' :type ="$route.query.type"></chooseBusLine>
        </div>
    </div>
</template>
<script>
/* 纠错车站 途径 */
import normalImg from '@/commons/img/ic_radio_normal.png'
import checkedImg from '@/commons/img/ic_radio_checked.png'
import chooseBusLine from '@/components/subComponents/chooseBusLine'
import position from '@/components/subComponents/position'
import photo from '@/components/subComponents/photo'
import description from '@/components/subComponents/description'
import contact from '@/components/subComponents/contact'
import submit from '@/components/subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'errorBusRoute',
    mixins: [mixin],
    data: function () {
        return {
            titleName: '在那找不到该线路',
            picked: '',
            busLine: 'dd',
            position: '',
            description: '',
            disable: true,
            photoList: [],
            mobilePhone: '',
            tid:'',
            reqId: '',
            names:'',
            loadingShow:false,
            visible:false,
            deviceInfo:{},
            lineNames:'',
            entry:'',
            positionNameThrow:"bus",
            display:'block'
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': parseInt(this.entry) || 14,
                'issue_type': this.issue_type || 2501,
                'issue_time': 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photoList,  
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'station_path_name':this.$route.query.name + this.lineNames,
                'station_longitude':this.poi_longitude || this.longitude,
                'station_latitude':this.poi_latitude || this.latitude,
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    created: function () {
        this.pick = ['地图线路缺失', '地图线路多余', '其他问题']
    },
    mounted: function () {
        var  self = this
        if (self.$route.name == "errorBusRouteFeedback") {
            mapDataReport("ugcreport_busstoperror_lineerror")
        } else {
            mapDataReport("homepage_report_busstoperror_lineerror")
        }
        nativeSetNavBarTitle('途径线路错误')
        nativeGetNavBarBackClick(function(data){
            if (self.visible) {
                self.visible = false
            } else {
                history.go(-1)
            }
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            if (result && result.entry) {
                self.entry = result.entry
            }
        })
    },
    components: {
        chooseBusLine,
        position,
        photo,
        description,
        contact,
        submit
    },
    methods: {
        pickClick (e) {
            this.$refs.forbidding.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.road.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.other.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            this.picked = e.target.value
            this.checkSubmitStatus()
            var radio1 = {
                    '地图线路缺失': 2501,
                    '地图线路多余': 2502,
                    '其他问题': 2503,
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
        onPositionNameChange(positionName){
            // if (!positionName) {
            //     this.disable = true
            // } else {
                this.checkSubmitStatus()
            // }
        },
        onDescriptionChange (desc) {
            this.description = desc
            this.checkSubmitStatus ()
        },
        checkSubmitStatus () {
            if (!this.checkPhoneNumber() || !this.picked) {
                this.disable = true
            } else if(this.picked === this.pick[0])  {
                if(this.description){
                    this.disable = false
                }else{
                    this.disable = true
                }
            } else if(this.picked === this.pick[1]){
                if(this.lineNames && this.description){
                    this.disable = false
                }else{
                    this.disable = true
                }
            } else {
                if(this.description){
                    this.disable = false
                }else{
                    this.disable = true
                }
            }
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
        },
        errorBusRoute(){
             var self = this;
            if (self.tid && self.reqId) {
                self.submitOpe()
            } else {
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
                    // tid = res.data.data.tid
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
            }
        },
        submitOpe () {
            //var url = 'station/path/correct'
            var  self = this;
            if (self.$route.name == "errorBusRouteFeedback") {
                mapDataReport("ugcreport_busstoperror_lineerror_submit")
            } else {
                mapDataReport("homepage_report_busstoperror_lineerror_submit")
            }
            if (!self.checkDesLength()) {
                return;
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
                            var url = baseUrl+'?cmd=/api/station/path/correct'
                            var param = self.submitData
                            self.sendReq(url, param)
                        }else{
                            var url = baseUrl+'?cmd=/api/station/path/correct'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/station/path/correct'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           }  
        },
        onBusLineBtn(names){
            this.lineNames = names
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
                this.titleName = '在哪找不到该路线'
            } else {
                this.titleName = '选择多余的路线'
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
.excess-line{
    display:inline-block;
    white-space: nowrap; 
    position:absolute;
    top:0.14rem;
}
.place-content {
    width:2.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size:0.13rem;
    margin-top:0.04rem;
}
.arrow {
    position: absolute;
    right: 0.2rem;
    top: 0.15rem;
    color: #888888;
    z-index:1;
}
</style>
