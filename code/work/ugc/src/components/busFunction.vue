<template>
    <div class="container-wrap">
        <date @dateChange='onDateChange' :date='date'></date>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述遇到的问题，以便我们及时为你解决'></description>
        <photo imgTxt='拍摄包含正确信息的照片，核实速度可加快50%'  @photoListChange='onPhotoListChange'></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' @clickBtn='busFunction' :loadShow="loadingShow"></submit>
    </div>
</template>
<script>
import date from '@/components/subComponents/date'
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
    name: 'driveNavigation',
    mixins: [mixin],
    data: function () {
        return {
            titleName: '问题所在位置',
            picked: '',
            position: '',
            description: '',
            disable: true,
            photoList: [],
            mobilePhone: '',
            tid:'',
            reqId: '',
            date:'',
            loadingShow: false,
            issue_time:0,
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 11,
                'issue_type':5000,
                'issue_time': this.issue_time || 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photo,  
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                //'nav_date':this.date,
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    mounted: function () {
        var  self = this
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '公交功能问题'}, function (result) { 
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
                        console.log(self,'看下有无请求方式')
                        url = baseUrls+'/spawn&user_id='+user_id+'&seq_id='+ reqid +'&sign=' +param.sign;
                        self.$http.get(url).then(function (res) {
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
        date,
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
        },
        checkSubmitStatus () {
            console.log(this.picked)
            if (!this.checkPhoneNumber()) {
                this.disable = true
            } else {
                this.disable = false
            }
        },
        onPhotoListChange (photoList) {
            this.photoList = photoList
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            this.checkSubmitStatus()
        },
        busFunction(){
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
                            var url = baseUrl+'bus/issue'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'bus/issue'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
            } else {
               // 没图片
                var url = baseUrl+'bus/issue'
                var param = self.submitData
                param.photo = ''
                self.sendReq (url, param)
           }   
        },
        onDateChange (date) {
            this.date = date;
            this.issue_time = new Date(this.date).getTime()
            this.checkSubmitStatus()
        },
    },
}
</script>
<style scoped>

</style>
