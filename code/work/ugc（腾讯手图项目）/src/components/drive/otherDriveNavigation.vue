<template>
    <div class="container-wrap">
        <date @dateChange='onDateChange' :date='date'></date>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请输入问题描述，以便我们及时为你解决' :required="true" :heightFlag="true"></description>
        <photo imgTxt='拍摄包含正确信息的照片，核实速度可加快50%'  @photoListChange='onPhotoListChange'></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' @clickBtn='driveNavigation' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
/* 驾车导航 其他导航问题 */
import date from '@/components/subComponents/date'
import photo from '@/components/subComponents/photo'
import description from '@/components/subComponents/description'
import contact from '@/components/subComponents/contact'
import submit from '@/components/subComponents/submit'
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'otherDriveNavigation',
    mixins: [mixin],
    data: function () {
        return {
            description: '',
            disable: true,
            photoList: [],
            mobilePhone: '',
            tid:'',
            reqId: '',
            date:'',
            nav_date:0,
            loadingShow: false
        }
    },
    computed: {
        submitData: function () {
            var obj = {}
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 14,
                'issue_type':6001,
                'issue_time': 0,
                'my_longitude': this.lon || this.longitude,
                'my_latitude': this.lat || this.latitude,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'nav_date':this.nav_date || 0,
                'nav_start_longitude':0,
                'nav_start_latitude':0,
                'nav_end_longitude':0,
                'nav_end_latitude':0,
                'nav_issue_longitude':0,
                'nav_issue_latitude':0,
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    mounted: function () {
        mapDataReport("ugcreport_car_other")
        var  self = this
        nativeSetNavBarTitle('驾车导航问题')
        nativeGetNavBarBackClick(function(data){
            history.go(-1)
            // if(self.$route.query.lineLength == '0'){
            //     history.go(-2)
            // }else{
            //     history.go(-1)
            // }
        })
    },
    components: {
        photo,
        description,
        contact,
        submit,
        date
    },
    methods: {
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
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkPhoneNumber()
            this.checkSubmitStatus()
        },
        driveNavigation(){
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
            mapDataReport("ugcreport_car_submit")
            var  self = this;
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
                            var url = baseUrl+'?cmd=/api/nav/issue'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'?cmd=/api/nav/issue'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
            } else {
               // 没图片
                var url = baseUrl+'?cmd=/api/nav/issue'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           } 
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        onDateChange (date) {
            this.date = date;
            this.nav_date = new Date(this.date).getTime()
            //this.checkSubmitStatus()
        },
    },
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
