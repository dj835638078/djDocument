<template>
    <div class="container-wrap">
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请输入问题描述，以便我们及时为你解决' :required="true" :heightFlag="true"></description>
        <photo imgTxt='拍摄包含正确的信息，核实速度可加快50%'  @photoListChange='onPhotoListChange' :positionNameThrow="positionNameThrow"></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' :loadShow="loadingShow" @clickBtn='errorBusOther'></submit>
    </div>
</template>
<script>
/* 纠错车站 其他 */
import normalImg from '@/commons/img/ic_radio_normal.png'
import checkedImg from '@/commons/img/ic_radio_checked.png'
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
    name: 'errorBusOther',
    mixins: [mixin],
    data: function () {
        return {
            titleName: '在哪找不到该路线',
            picked: '',
            position: '',
            description: '',
            disable: true,
            photoList: [],
            mobilePhone: '',
            tid:'',
            reqId: '',
            loadingShow:false,
            entry:'',
            positionNameThrow:"bus"
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': parseInt(this.entry) || 14,
                'issue_type':9004, 
                'issue_time': 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photoList,  //参照addpoi
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    mounted: function () {
        var  self = this
        if (self.$route.name == "errorBusOtherFeedback") {
            mapDataReport("ugcreport_busstoperror_othererror")
        } else {
            mapDataReport("homepage_report_busstoperror_othererror")
        }
        nativeSetNavBarTitle('其他问题')
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            if (result && result.entry) {
                self.entry = result.entry
            }
        })
    },
    components: {
        position,
        photo,
        description,
        contact,
        submit
    },
    methods: {
        onPositionChange (position) {
            this.position = position
            this.checkSubmitStatus()
        },
        onDescriptionChange (desc) {
            this.description = desc
            this.checkSubmitStatus ()
        },
        checkSubmitStatus () {
            if (this.description && this.checkPhoneNumber()) {
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
            this.checkPhoneNumber()
            this.checkSubmitStatus()
        },
        errorBusOther(){
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
            var  self = this
            if (self.$route.name == "errorBusOtherFeedback") {
                mapDataReport("ugcreport_busstoperror_othererror_submit")
            } else {
                mapDataReport("homepage_report_busstoperror_othererror_submit")
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
                            var url = baseUrl+'?cmd=/api/other/issue'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'?cmd=/api/other/issue'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/other/issue'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           }
        }
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
</style>
