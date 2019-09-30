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
                <div style="display:inline-block;" >多余的线路</div><div style="display:inline-block;" class="xing">*</div>
                <div class="excess-line" style="">
                    <input type="text" class="place-content" v-model='lineNames' :style='{display: display}' style="background-image:none">
                </div>
            </div>
            <position v-show='picked === pick[0]' @positionChange='onPositionChange' @positionNameChange = 'onPositionNameChange' :posi='position' :titleName='titleName'></position>
            <photo imgTxt='请拍摄相关照片'  @photoListChange='onPhotoListChange'></photo>
            <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='错误的线路是' :required="true"></description>
            <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
            <submit :disable='disable' :loadShow="loadingShow" @clickBtn='errorBusRoute'></submit>
        </div>
        <div>
            <chooseBusLine v-show="visible" @busLineBtn='onBusLineBtn'></chooseBusLine>
        </div>
    </div>
</template>
<script>
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
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 11,
                'issue_type': this.issue_type || 2501,
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photoList,  
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'station_path_name':this.lineNames,
                'station_longitude':this.poi_longitude || 1,
                'station_latitude':this.poi_latitude || 1,
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
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '途径线路错误'}, function (result) { 
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
                    var s=''  //拼接所有字段的和
                    for(var key in objKeySort.objKeySort(param)){
                        s += objKeySort.objKeySort(param)[key];
                    }
                    param.sign = ''
                    param.sign = md5(s+'sosomap')
                    console.log(self,'看下有无请求方式')
                    url = baseUrls+'/spawn&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
                    self.$http.get(url).then(function (res) {
                    // tid = res.data.data.tid
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
            // console.log(this.position,'popopo&&&&&&&&&&&&&&')
            // console.log(this.poi_latitude,'wowowowowo-')

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
            this.checkSubmitStatus ()
        },
        checkSubmitStatus () {
            console.log(this.picked)
            if (!this.checkPhoneNumber() || !this.picked) {
                this.disable = true
            } else if(this.picked === this.pick[0])  {
                if(this.position && this.description){
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
            // console.log('这个是errBusRoute',String(photoList))
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
        },
        errorBusRoute(){
            //var url = 'station/path/correct'
            var  self = this;
           self.loadingShow = true
           if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: String(self.photoList)}, function (result) {
                    console.log(result, 'upLoadPics')
                    if(result) {
                        self.photo = String(result)
                        console.log(self.photo)
                        if(self.photo){
                            console.log(self.photo,'upload');
                            console.log(self,'upload');
                            var url = baseUrl+'station/path/correct'
                            var param = self.submitData
                            self.sendReq(url, param)
                        }else{
                            var url = baseUrl+'station/path/correct'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'station/path/correct'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           }   
            
        },
        onBusLineBtn(names){
            this.lineNames = names
            //console.log('hello')
            this.visible = false;
            this.checkSubmitStatus()
            //console.log(this.lineNames,'ppphahahah')  //已经获取到了
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
}
</style>
