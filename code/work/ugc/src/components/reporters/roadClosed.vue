<template>
  <div :class="[isNight ? 'blackBg' : '', 'RoadClosedshow']">
      <position v-if="!isNav" @positionChange="onPositionChange" @positionNameChange = 'onPositionNameChange' :posi="posi" titleName="封路位置"></position>
      <laneSelection :isNight='isNight' :isNav='isNav' :checkboxData="checkboxData" @selectionChange="selectionChanged"></laneSelection>
      <danxuan :isNight='isNight' :isNav='isNav' :danxuanData="danxuanData" @danxunDataChange="danxunDataChanged"></danxuan>
      <photo
        @photoSubmitStatusChange="onPhotoSubmitStatusChange"
        @photoListChange="onPhotoListChange"
        :isNight='isNight'
        imgTxt='添加封路道路照片，处理通过率更高'
      ></photo>
      <description v-if="!isNav" @descriptionChange="onDescriptionChange" :desc="desc" plaholder="请描述封路时间，封路原因等"></description>
      <submit :disable="disable" @clickBtn="subMit" :loadShow="loadingShow"></submit>
  </div>
</template>
<script>
import position from "../subComponents/position";
import photo from "../subComponents/photo";
import description from "../subComponents/description";
import laneSelection from "../subComponents/laneSelection";
import danxuan from "../subComponents/danxuan";
import submit from "../subComponents/submit";
import mixin from '@/config/mixin'
export default {
  name: "Roadclosed",
  mixins: [mixin],
  data() {
    return {
      showFlag:false,
      isNav: false,
      isNight: false,
      posi: "",
      address: '',
      point: {},
      desc: "",
      detail: "",
      tag: [],
      photoList: [],
      disable: true,
      checkboxData: [
        {
          //多选列表数据
          name: "对向车道"
        },
        {
          name: "左侧车道"
        },
        {
          name: "中间车道"
        },
        {
          name: "右侧车道"
        }
      ],
      danxuanData: [
        {
          //单选列表数据
          value: "影响通行"
        },
        {
          value: "无法通行"
        }
      ],
      loadingShow: false,
      positionName:""
    };
  },
  created() {
    let self = this
    if (!self.$route || !self.$route.query || self.$route.query.from != 'index') {
      nativeGetReportInfo(function(data) {
        self.isNav = data.isNav;
        self.isNight = data.isNight;
        self.showFlag = true
      })
    }
  },
  mounted() {
    nativeSetNavBarTitle('封路')
    nativeGetNavBarBackClick(function(data) {
      history.go(-1);
    });
  },
  computed: {},
  methods: {
    selectionChanged(data) {
      this.tag = data;
      this.checkSubmitStatus();
    },
    /**
     * 单选确认选择
     */
    danxunDataChanged(data) {
      if (data.value) {
        this.detail = data.value;
      } else {
        this.detail = "";
      }
      this.checkSubmitStatus();
    },
    onPositionChange(position) {
      this.posi = position;
      this.address = position.addr;
      this.point = {
        mLatitudeE6: position.point.mLatitudeE6 || '',
        mLongitudeE6: position.point.mLongitudeE6 || ''
      }
      this.checkSubmitStatus();
    },
    onPositionNameChange(positionName){
      this.positionName = positionName
        if (!positionName) {
            this.disable = true
        } else {
            this.checkSubmitStatus()
        }
    },
    subMit() {
      var self = this;
      window.mqq.invoke(
        "ugc",
        "reportData",
        {
          eType: 3,
          address: self.address,
          selectPoint: self.point,
          tag: self.tag,
          desc:self.desc,
          photo: self.photoList.join(","),
          detail: self.detail
        },
        function() {
          history.go(-1)
        }
      );
    },
    onPhotoSubmitStatusChange(photoSubmitStatus) {},
    onPhotoListChange(photoList) {
      // console.log("photoList这块是Roadclosed，，， ", photoList); //这块是图片的路径
      this.photoList = photoList;
    },
    onDescriptionChange(desc) {
      this.desc = desc;
    },
    checkSubmitStatus() {
      //if (this.tag.length > 0 && this.detail !== "" && ((!this.isNav && this.address != "" && this.positionName != "") || (this.isNav))) {
      if (this.tag.length > 0 && this.detail !== "" &&  ((this.positionName != "") || (this.isNav))) {
        this.disable = false;
      } else {
        this.disable = true;
      }
    }
  },
  components: {
    position,
    danxuan,
    laneSelection,
    photo,
    description,
    submit
  }
};
</script>
<style scoped>
.RoadClosedshow {
  width: 100%;
  /* overflow: hidden; */
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background: #fff;
}
.blackBg {
  background: #45454A;
}
.blackBg .Time-box{
  background: #45454A;
  border-bottom: 0.01rem solid #59595B;
}
.blackBg .container{
  background: #45454A;
}
</style>