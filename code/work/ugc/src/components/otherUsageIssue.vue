<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title radio-title">请选择问题类型</div><div class="xing">*</div>
            <div class="radio-container">
                <div class="radio">
                    <input type="radio" id="timeerror" :value="pick[0]" ref="timeerror" @click='pickClick'>
                    <label for="timeerror">改进建议</label>
                </div>
                <div class="radio">
                    <input type="radio" id="changeerror" :value="pick[1]" ref="changeerror" @click='pickClick'>
                    <label for="changeerror">卡顿</label>
                </div>
                <div class="radio">
                    <input type="radio" id="nameerror" :value="pick[2]" ref="nameerror" @click='pickClick'>
                    <label for="nameerror">闪退</label>
                </div>
                <div class="radio" style="margin-left:0.28rem">
                    <input type="radio" id="other" :value="pick[3]" ref="other" @click='pickClick'>
                    <label for="other">其他问题</label>
                </div>
            </div>
        </div>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请输入问题描述，以便我们及时为你解决' :required="true"></description>
        <photo @photoListChange='onPhotoListChange' imgTxt='拍摄包含正确的信息，核实速度可加快50%'></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' @clickBtn='otherUsage' :loadShow="loadingShow"></submit>
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
    name: 'otherUsageIssue',
    mixins: [mixin],
    data: function () {
        return {
            picked: '',
            mobilePhone: '',
            disable: true,
            description: '',
            photoList: [],
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
                'issue_type':this.issue_type,
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photoList,  
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
    created: function () {
        this.pick = ['改进建议', '卡顿', '闪退', '其他问题']
    },
    mounted: function () {
        var  self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '其他使用问题'}, function (result) { 
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
        photo,
        description,
        contact,
        submit
    },
    methods: {
        pickClick (e) {
            this.$refs.timeerror.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.changeerror.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.nameerror.style.backgroundImage = "url('" + normalImg + "')"
            this.$refs.other.style.backgroundImage = "url('" + normalImg + "')"
            e.target.style.backgroundImage = "url('" + checkedImg + "')"
            this.picked = e.target.value
            this.checkSubmitStatus()
            var radio2 = {
                    '改进建议': 9001,
                    '卡顿': 9002,
                    '闪退': 9003,
                    '其他问题': 9004,
                }
            this.issue_type =  radio2[e.target.value]
        },
        onDescriptionChange (desc) {
            this.description = desc
            this.checkSubmitStatus()
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        checkSubmitStatus () {
            // if (!this.checkPhoneNumber() && !this.description) {
            //     this.disable = true
            // } else {
            //     if (this.picked !== '') {
            //         this.disable = false
            //     } else {
            //         this.disable = true
            //     }
            // }
            if (this.description && this.checkPhoneNumber() && this.picked !== '') {
                this.disable = false
            } else {
                this.disable = true
            }
        },
        otherUsage (){
            var  self = this
            self.loadingShow = true
            if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: String(self.photoList)}, function (result) {
                    console.log(result, 'upLoadPics')
                    if(result) {
                        // photo：照片 poi_license: 营业执照
                        self.photo = String(result)
                        console.log(self.photo)
                        if(self.photo){
                            console.log(self,'upload');
                            var url = baseUrl+'other/issue'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'other/issue'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
            } else {
               // 没图片
                var url = baseUrl+'other/issue'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           }  
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
</style>
