<template>
    <div class="container-wrap">
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请输入问题描述，以便我们及时为你解决' :required="true"></description>
        <photo @photoListChange='onPhotoListChange' imgTxt='拍摄包含正确的信息，核实速度可加快50%'></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' @clickBtn='addFeedback' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
import photo from '@/components/subComponents/photo'
import description from '@/components/subComponents/description'
import contact from '@/components/subComponents/contact'
import submit from '@/components/subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'addFeedback',
    mixins: [mixin],
    data: function () {
        return {
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
                'issue_type':9004,
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
    mounted: function () {
        var  self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '我要反馈'}, function (result) { 
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
            if (this.description && this.checkPhoneNumber()) {
                this.disable = false
            } else {
                this.disable = true
            }
        },
        checkPhoneNumber () {
            if (this.mobilePhone) {
                if (this.mobilePhone.length === 11) {
                    if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobilePhone))) {
                        window.mqq.invoke('ugc', 'showToast', {
                            //'text': '请输入正确的电话号码',
                            'duration': 1
                        })
                        return false
                    } else {
                        return true
                    }
                } else {
                    window.mqq.invoke('ugc', 'showToast', {
                        //'text': '请输入正确的电话号码',
                        'duration': 1
                    })
                    return false
                }
            } else {
                return false
            }
        },
        addFeedback (){
            var  self = this
            self.loadingShow = true
            if (self.photoList.length) {
                window.mqq.invoke('ugc', 'upLoadPics', {pathList: String(self.photoList)}, function (result) {
                    console.log(result, 'upLoadPics')
                    if(result) {
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
</style>
