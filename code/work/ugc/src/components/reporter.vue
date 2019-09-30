<template>
  <div class="container-wrap">
    <div
      style="display:inline-block;width:100%;height:30%;margin-left: 0.38rem;margin-top: 0.3rem;"
    >
      <span style="display:block;margin-bottom: 0.2rem;font-size:0.145rem;letter-spacing: 0.017rem;">路况上报</span>
      <div>
        <ul>
          <li style="float:left;width:30%">
            <div class="imgshow" @click="goAccident()">
              <img style="width: 0.5rem;display: block;" ref="Accident" src alt />
              <span class="spanshow">事故</span>
            </div>
          </li>
          <li style="float:left;width:30%">
            <div class="imgshow" @click="goconstruction()">
              <img ref="construction" style="width: 0.5rem;display: block;" />
              <span class="spanshow">施工</span>
            </div>
          </li>
          <li style="float:left;width:30%">
            <div class="imgshow" @click="goRoadclosed()">
              <img ref="Roadclosed" style="width: 0.5rem;display: block;" />
              <span class="spanshow">封路</span>
            </div>
          </li>
          <li style="float:left;width:30%">
            <div class="imgshow" @click="goCongestion()">
              <img ref="Congestion" style="width: 0.5rem;display: block;" />
              <span class="spanshow">拥堵</span>
            </div>
          </li>
          <li style="float:left;width:30%">
            <div class="imgshow" @click="gotrafficcontrol()">
              <img ref="trafficcontrol" style="width: 0.5rem;display: block;" />
              <span class="spanshow">管制</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="fankuishow">
      <span style="display:block;margin-bottom: 0.2rem;font-size:0.145rem;letter-spacing: 0.017rem;">反馈问题</span>
      <div>
        <ul>
          <li style="float:left;">
            <div class="imgshow" @click="addPoi()">
              <img ref="addpoi" style="width: 0.5rem;display: block;" />
              <span class="spanshow">新增地点</span>
            </div>
          </li>
          <li style="float:left;">
            <div class="imgshow" @click="errorPoi()">
              <img ref="ErrorCorrection" style="width: 0.5rem;display:block;" />
              <span class="spanshow">地点纠错</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <button class="Btnshow" @click="gomyfeedback()">我的上报记录</button>
    <modal v-show="addPoiShow" @modalHidden="addPoiShow = false">
      <router-link to="/add-poi">
        <div class="modal-line">新增地点</div>
      </router-link>
      <router-link to="/add-road">
        <div class="modal-line">新增道路</div>
      </router-link>
      <router-link to="/add-station">
        <div class="modal-line">新增公交站</div>
      </router-link>
      <router-link to="/add-line">
        <div class="modal-line-border">新增公交线路</div>
      </router-link>
      <div @click="addPoiShow = false" class="modal-line" style="border: 0">取消</div>
    </modal>
    <modal v-show="errorPoiShow" @modalHidden="errorPoiShow = false">
      <router-link to="/error-poi">
        <div class="modal-line">地点报错</div>
      </router-link>
      <router-link to="/error-road">
        <div class="modal-line">道路报错</div>
      </router-link>
      <router-link to="/error-bus-near-route">
        <div class="modal-line">公交站报错</div>
      </router-link>
      <router-link to="/error-bus-line">
        <div class="modal-line-border">公交线路报错</div>
      </router-link>
      <div @click="errorPoiShow = false" class="modal-line" style="border: 0">取消</div>
    </modal>
  </div>
</template>
<script>
import modal from "./subComponents/modal";
import AccidentImg from "../commons/img/ic_Accident.png";
import constructionImg from "../commons/img/ic_construction.png";
import RoadclosedImg from "../commons/img/ic_Roadclosed.png";
import CongestionImg from "../commons/img/ic_Congestion.png";
import trafficcontrolImg from "../commons/img/ic_trafficcontrol.png";
import addpoiImg from "../commons/img/ic_addpoi.png";
import ErrorCorrectionImg from "../commons/img/ic_ErrorCorrection.png";
export default {
  components: {
    modal
  },
  created() {
    window.mqq.invoke("ugc", "setNavBarTitle", { title: "上报" }, function(
      result
    ) {});
    window.mqq.invoke("ugc", "setNavBarRightButton", { right: "" }, function(
      result
    ) {});
    nativeGetNavBarBackClick(function(data) {
      nativePerformNavBarBackClick(function(data) {});
    });
  },
  data() {
    return {
      picke: "",
      addPoiShow: false,
      errorPoiShow: false
    };
  },
  methods: {
    goRoadclosed() {
      this.$router.push({ name: "roadClosed", query: { from: 'index' }});
    },
    goAccident() {
      this.$router.push({ name: "accident",query:{from:'index'}});
    },
    goCongestion() {
      this.$router.push({ name: "congestion",query:{from:'index'} });
    },
    gotrafficcontrol() {
      this.$router.push({ name: "trafficControl",query:{from:'index'} });
    },
    goconstruction() {
      this.$router.push({ name: "construction",query:{from:'index'} });
    },
    gomyfeedback() {
      let self = this;
      checkLogin(function() {
        self.$router.push({ name: "myfeedback" });
      });
    },
    addPoi() {
      let self = this;
      checkLogin(function() {
        self.addPoiShow = true;
      });
    },
    errorPoi() {
      let self = this;
      checkLogin(function() {
        self.errorPoiShow = true;
      });
    }
  },
  mounted() {
    console.log(this.$refs.Accident);
    this.$refs.Accident.src = AccidentImg;
    this.$refs.construction.src = constructionImg;
    this.$refs.Roadclosed.src = RoadclosedImg;
    this.$refs.Congestion.src = CongestionImg;
    this.$refs.trafficcontrol.src = trafficcontrolImg;
    this.$refs.addpoi.src = addpoiImg;
    this.$refs.ErrorCorrection.src = ErrorCorrectionImg;
  }
};
</script>

<style scoped>
.imgshow {
  float: left;
  text-align: center;
  padding-right: 0.6rem;
  margin-top:0.2rem;
}
.container-wrap {
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  background: #fff;
}
.spanshow {
  font-size: 0.13rem;
  letter-spacing: 0.017rem;
}
.fankuishow {
  display: inline-block;
  width: 100%;
  margin-top: 0.84rem;
  margin-left: 0.38rem;
}
.Btnshow {
     display: block;
    width: 1.47rem;
    overflow: hidden;
    height: 0.34rem;
    line-height: 0.32rem;
    border-radius: 0.1rem;
    background: #FFFFFF;
    border: 0.01rem solid #DDDDDD;
    text-align: center;
    position: fixed;
    bottom: 0.3rem;
    left: 1.14rem;
    font-size: 0.14rem;
    color: #666666;
}
</style>


