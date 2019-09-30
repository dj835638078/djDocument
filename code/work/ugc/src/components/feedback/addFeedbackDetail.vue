<template>
    <div class="container-wrap">
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请输入问题描述' :required="requireDesc"></description>
        <photo @photoListChange='onPhotoListChange' imgTxt='拍摄包含正确的信息，核实速度可加快50%' :required="requirePhoto"></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone' :required="requirePhone"></contact>
        <submit :disable='disable' @clickBtn='addFeedback' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
/* 反馈补充 */
import photo from '@/components/subComponents/photo'
import description from '@/components/subComponents/description'
import contact from '@/components/subComponents/contact'
import submit from '@/components/subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'addFeedbackDetail',
    mixins: [mixin],
    data: function () {
        return {
            mobilePhone: '',
            disable: true,
            description: '',
            photo:"",
            photoList: [],
            tid:'',
            reqId: '',
            loadingShow: false,
            ticket_id:'',
            requireDesc: false,
            requirePhoto: false,
            requirePhone: false
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id || '',
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photoList,  
                'ticket_id':this.ticket_id,
                //'ticket_id':'293667',
                'seq_id': this.reqId,
            }
            return {
                ...data
            }
        }
    },
    beforeRouteLeave(to,from,next){
        nativeSetTabNavBarTitle('')
        next()
    },
    created:function(){
        var  self = this
        self.requireDesc = self.$route.query.requireDesc == "1" ? true : false;
        self.requirePhoto = self.$route.query.requirePhoto == "1" ? true : false;
        self.requirePhone = self.$route.query.requirePhone == "1" ? true : false;
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
           nativeSetTabNavBarTitle('')
        })
    },
    mounted: function () {
        mapDataReport("ugcreport_detail_supplement")
        var  self = this
        self.ticket_id = self.$route.query.id
        nativeSetTabNavBarTitle('反馈补充')
        nativeSetNavBarTitle('反馈补充')
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
            // this.checkPhoneNumber()
            this.checkSubmitStatus()
            // if (this.requirePhone) {
            //     this.checkPhoneNumber()
            // } else {
            //     this.checkPhoneNumber(true)
            // }
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
            this.checkSubmitStatus()
        },
        checkSubmitStatus () {
            // if (this.description && this.checkPhoneNumber()) {
            //     this.disable = false
            // } else {
            //     this.disable = true
            // }
            // if (this.requireDesc && this.requirePhoto && this.requirePhone) {
            //     if (this.description && this.checkPhoneNumber() && this.photoList.length) {
            //         this.disable = false
            //     } else {
            //         this.disable = true
            //     }
            // }
            if (this.requireDesc) {
                if (this.requirePhoto && this.requirePhone) {
                    if (this.description && this.photoList.length && this.checkPhoneNumber()) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }
                }
                if (this.requirePhoto && !this.requirePhone) {
                    if (this.description && this.photoList.length && this.checkPhoneNumber(true)) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }
                }
                if (!this.requirePhoto && this.requirePhone) {
                    if (this.description && this.checkPhoneNumber()) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }
                }
                if (!this.requirePhoto && !this.requirePhone) {
                    if (this.description && this.checkPhoneNumber(true)) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }
                }
            }
            if (!this.requireDesc) {
                if (this.requirePhoto && this.requirePhone) {
                    if (this.photoList.length && this.checkPhoneNumber()) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }
                }
                if (this.requirePhoto && !this.requirePhone) {
                    if (this.photoList.length && this.checkPhoneNumber(true)) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }
                }
                if (!this.requirePhoto && this.requirePhone) {
                    if (this.checkPhoneNumber()) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }
                }
                if (!this.requirePhoto && !this.requirePhone) {
                    if (this.checkPhoneNumber(true)) {
                        this.disable = false
                    } else {
                        this.disable = true
                    }
                }
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
            mapDataReport("ugcreport_detail_supplement_submit")
            var  self = this
            if (self.requireDesc == 1) {
                if (!self.checkDesLength()) {
                    return;
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
                            var url = baseUrl+'?cmd=/api/ticket/append'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'?cmd=/api/ticket/append'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
            } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/ticket/append'
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
