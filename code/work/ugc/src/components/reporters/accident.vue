<template>
  <div :class="[isNight ? 'blackBg' : '', 'containerss']">
    <position v-if="!isNav" @positionChange="onPositionChange" :posi="posi" titleName="事故位置"></position>
    <laneSelection :isNight='isNight' :isNav='isNav' :checkboxData="checkboxData" @selectionChange="selectionChanged"></laneSelection>
    <photo
      @photoSubmitStatusChange="onPhotoSubmitStatusChange"
      @photoListChange="onPhotoListChange"
      :isNight='isNight'
    ></photo>
    <description v-if="!isNav" @descriptionChange="onDescriptionChange" :desc="desc" plaholder="请描述事故相关内容等"></description>
    <submit :disable="disable" @clickBtn="subMit" :loadShow="loadingShow"></submit>
  </div>
</template>
<script>
import position from "../subComponents/position";
import photo from "../subComponents/photo";
import description from "../subComponents/description";
import laneSelection from "../subComponents/laneSelection";
import submit from "../subComponents/submit";
export default {
  name: "Roadclosed",
  data() {
    return {
      isNav: false,
      isNight: false,
      posi: "",
      desc: "",
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
      loadingShow: false
    };
  },
  computed: {
  },
  methods: {
    selectionChanged(data) {
      this.tag = data;
      this.checkSubmitStatus();
    },

    /**
     * 单选确认选择
     */
    onPositionChange(position) {
      // this.position1 = position.placeName
      // console.log(position.name,'/')
      this.posi = position;
      this.checkSubmitStatus();
    },
    onPhotoSubmitStatusChange(photoSubmitStatus) {
    },
    onPhotoListChange(photoList) {
      console.log("photoList这块是addPoi，，， ", photoList); //这块是图片的路径
      this.photoList = photoList;
    },
    onDescriptionChange(desc) {
      this.desc = desc;
      console.log(this.description);
    },
    checkSubmitStatus() {
      if (this.tag.length > 0 && ((!this.isNav && this.posi != "") || (this.isNav))) {
        this.disable = false;
      }else{
        this.disable = true
      }
    },
    subMit() {
      console.log('ddd',  { position: this.posi, tag: this.tag,desc: this.desc })
      var self = this;
      window.mqq.invoke(
        "ugc",
        "reportData",
        {
          position: self.posi.point,
          tag: self.tag,
          desc:self.desc,
          photo: String(this.photoList)
        },
        function() {
          history.go(-1)
        }
      );
    },
  },
  created() {
    let self = this
    if (!self.$route || !self.$route.query || self.$route.query.from != 'index') {
      nativeGetReportInfo(function(data) {
        self.isNav = data.isNav;
        self.isNight = data.isNight;
      })
    } 
  },
  mounted() {
    window.mqq.invoke("ugc", "setNavBarTitle", { title: "事故" }, function(
      result
    ) {});
    window.mqq.invoke("ugc", "setNavBarRightButton", { right: "" }, function(
      result
    ) {});
    nativeGetNavBarBackClick(function(data) {
      history.go(-1);
    });
  },
  components: {
    position,
    laneSelection,
    photo,
    description,
    submit
  }
};
</script>
<style scoped>
.containerss {
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
}
.blackBg .container{
  background: #45454A;
}
</style>
