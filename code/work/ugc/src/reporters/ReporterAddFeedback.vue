<template>
    <div class="container-wrap">
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请输入问题描述，以便我们及时为你解决' :required="true" :heightFlag="true"></description>
        <photo @photoListChange='onPhotoListChange' imgTxt='拍摄包含正确的信息，核实速度可加快50%'></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' @clickBtn='addFeedback' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
/* 我要反馈 */
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
            loadingShow: false,
            entry: ''
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': parseInt(this.entry) || 32,
                'issue_type':9004,
                'issue_time': 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
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
        var self = this
        nativeSetNavBarTitle('我要反馈')
        nativeGetNavBarBackClick(function(data){
            nativePerformNavBarBackClick(function(data){})
        })
        // 获取entry
        window.mqq.invoke('ugc', 'getUgcEntry', function(result) {
            if (result && result.entry) {
                self.entry = result.entry
                //console.log(result,'从客户端获取entry')
            }
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
            this.checkPhoneNumber()
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
        addFeedback (){
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
                    var url = baseUrl+'?qt=/api/ticket/spawn&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
                    
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
    }
}
</script>
<style scoped>
</style>
