<template>
    <div class="container-wrap">
        <div class="container">
            <div class="title radio-title">该路线的问题</div><div class="xing">*</div>
            <div class="radio-container">
                <div class="radio">
                    <input type="radio" id="timeerror" :value="pick[0]" ref="timeerror" @click='pickClick'>
                    <label for="timeerror">{{pick[0]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="changeerror" :value="pick[1]" ref="changeerror" @click='pickClick'>
                    <label for="changeerror">{{pick[1]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="nameerror" :value="pick[2]" ref="nameerror" @click='pickClick'>
                    <label for="nameerror">{{pick[2]}}</label>
                </div>
                <div class="radio">
                    <input type="radio" id="other" :value="pick[3]" ref="other" @click='pickClick'>
                    <label for="other">{{pick[3]}}</label>
                </div>
            </div>
        </div>
        <description @descriptionChange='onDescriptionChange' :desc='description' plaholder='请描述遇到的问题，以便我们及时为你解决'></description>
        <photo @photoListChange='onPhotoListChange' imgTxt="拍摄包含正确信息的照片，核实速度加快50%"></photo>
        <contact @mobileChange='onMobileChange' :mobile='mobilePhone'></contact>
        <submit :disable='disable' @clickBtn='errorBusLine' :loadShow="loadingShow"></submit>
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
import md5 from '@/config/md5'  //新增的加密方式
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
export default {
    name: 'errorBusLine',
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
            routeName:'',
            loadingShow:false,
        }
    },
    computed: {
        submitData: function () {
            var data = {
                'user_id':this.user_id,
                'nick_name':this.nick_name,
                'entry': 11,
                'issue_type': this.issue_type,
                'issue_time': 0,
                'my_longitude': this.lon,
                'my_latitude': this.lat,
                'issue_desc': this.description,
                'phone': this.mobilePhone,
                //'photo': this.photoList,  
                'tid':this.tid,
                'seq_id': this.reqId,
                'city_code': "110000",
                'station_route_name':this.routeName || '',
            }
            return {
                ...data,
                ...this.deviceInfo
            }
        }
    },
    created: function () {
        console.log('created')
        this.pick = ['时间票价错误', '线路改道', '线路名称错误', '其他问题']
        document.title = '公交路线报错'
    },
    mounted: function () {
        //直接在这里取出
        this.routeName = this.$route.query.name
        console.log(this.routeName,'纠错 公交线')
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '公交线路报错'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right:""}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })

        // console.log(this,'-----/////----')
        // console.log(getReqId.getReqId,'8000')
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
                    // reqId = ""
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
            var radio1 = {
                    '时间票价错误': 2301,
                    '线路改道': 2302,
                    '线路名称错误': 2303,
                    '其他问题': 2304,
                }
            this.issue_type =  radio1[e.target.value]
        },
        onDescriptionChange (desc) {
            this.description = desc
            console.log(this.description)
        },
        onMobileChange (mobile) {
            this.mobilePhone = mobile
            console.log(this.mobilePhone)
            this.checkSubmitStatus()
        },
        onPhotoListChange (photoList) {
            //console.log('photoList ', photoList)
            this.photoList = photoList
        },
        checkSubmitStatus () {
            if (!this.checkPhoneNumber()) {
                this.disable = true
            } else {
                if (this.picked !== '') {
                    this.disable = false
                } else {
                    this.disable = true
                }
            }
        },
        errorBusLine(){
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
                            var url = baseUrl+'station/route/correct'
                            var param = self.submitData
                            param.photo = self.photo
                            self.sendReq(url, param)
                        }else{
                            param.photo = self.photo
                            var url = baseUrl+'station/route/correct'
                            var param = self.submitData
                            self.sendReq (url, param)
                        }
                    }
                })
           } else {
               // 没图片
                var url = baseUrl+'station/route/correct'
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
