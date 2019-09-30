<template>
  <div class="container">
    <div v-show="!subwayVisible && !emptyVisible">
      <div class="stations">
        <div class="stationList" v-for="(item, index) in dataList" :key="'data' + index">
          <div class="stationItem" :class="item.line1.isSelected ? 'active': ''" @click="selectItem(item.line1)" v-if="item.line1 && item.line1.name && item.line1.from &&  item.line1.to">
            <span>{{item.line1.name}}({{item.line1.from}}-{{item.line1.to}})</span>
          </div>
          <div class="stationItem" :class="item.line2.isSelected ? 'active': ''" @click="selectItem(item.line2)" v-if="item.line2 && item.line2.name && item.line2.from && item.line2.to">
            <span>{{item.line2.name}}({{item.line2.from}}-{{item.line2.to}})</span>
          </div>
        </div>
      </div>
      <div class="confirm">
        <div class="confirmBtn" :style='{opacity: opacity}' :disabled='disabled' @click="selectedList(selectedValue)">确认</div>
      </div>
    </div>

    <div v-show='subwayVisible && !emptyVisible'>
      <div class="stations">
        <div class="stationList"  v-for="(item, index) in subwayList" :key="'data' + index">
          <div class="stationItem" :class="item.isSelected ? 'active': ''" @click="selectItem2(item)" v-if="item.name && item.from &&  item.to">
            <span>{{item.name}}({{item.from}}-{{item.to}})</span>
          </div>
        </div>
      </div>
      <div class="confirm">
        <div class="confirmBtn" :style='{opacity: opacity}' :disabled='disabled' @click="selectedList2(selectedValue)">确认</div>
      </div>
    </div>
    <div class="container-box" v-if="emptyVisible">
          <div class='addr-icon'></div>
          <div class='not-find'>没有查询到该地点</div>
          <div class='explore-other-place'>试试探索其他地方</div>
          <div class="add-poi" @click='addLineBtn'>新增公交线</div>
    </div>
  </div>
</template>

<script>
/* 多余线路 */
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import getReqId from '@/config/seqid'
import jsonp from 'jsonp'
export default {
  name: 'chooseBusLine',
  mixins: [mixin],
  props: {
        type:{
            default: ''
        }
    },
  data() {
    return {
      dataList: [],
      deviceInfo:{},
      emptyVisible:false,
      disabled: true,
      opacity: 0.4,
      subwayList:[],
      subwayVisible:false,
      aa:true
    }
  },
  mounted() {
        // nativeSetNavBarTitle('选择线路')
        // nativeGetNavBarBackClick(function(data){
        //    history.go(-1)
        // })

        var self = this
        let px = self.lon
        let py = self.lat
        let imei = self.deviceInfo.imei
        let device = self.deviceInfo.platform
        //let app_ver = self.deviceInfo.appVersion
        //var url = stopidUrl+'/rtbus?qt=bus_stop_line_tag&stopUid='+self.$route.query.id+'&isOnlyRealtimeLine=0&isNeedLineGroup=1&imei='+imei+'&osVersion=android&softVersion=8.7.8&strNettp=61.135.172.68&strSessionId=&strPf=&strMobver=&strUserNetType=WiFi'
        let url = ""
        console.log(self.type,'===看下type')
        if (self.type == 1 || self.type == 100) {
            url = stopidUrl + '/rtbus?qt=bus_stop_line_tag&stopUid='+self.$route.query.id+'&isOnlyRealtimeLine=0&isNeedLineGroup=1&imei='+self.imei+'&osVersion='+self.platform+'&softVersion=8.7.8&strNettp=61.135.172.68&strSessionId=&strPf=&strMobver=&strUserNetType=WiFi&uAccIp='
        } else if (self.type == 2 || self.type == 200) {
            url = subwayidUrl + `/?s=2&fm=0&uid=${self.$route.query.id}&tp=1&qt=dt&imei=${self.imei}&device=${self.platform}&app_ver=${self.appVersion}&referer=qqmap_app&output=jsonp&rich_source=index&rich=mobile&cb=afda&cb=__jp0`
        }
        jsonp(url, {param:'cb', timeout: 5000}, function(err, res) {
          // console.log(res,'途径线路获取到的值')
            if (res && res.stopTag && res.stopTag.linePairs) {
                self.dataList = res.stopTag.linePairs.filter(item => {
                    item.line1 && (item.line1.isSelected = false);
                    item.line2 && (item.line2.isSelected = false);
                    return item;
                });
                if(self.dataList == 0){
                    self.emptyVisible = false
                    self.subwayVisible = true
                } else {
                    self.emptyVisible = false
                    self.subwayVisible = false
                }
            }
            else if(res && res.detail && res.detail.poi && res.detail.poi.lines){
              self.subwayList = res.detail.poi.lines || []
              console.log(self.subwayList,'==')
              if(self.subwayList.length == 0){
                  self.emptyVisible = true
                  self.subwayVisible = false
              } else {
                  self.emptyVisible = false
                  self.subwayVisible = true
              }
                }
             else {
              self.emptyVisible = true
            }
        });
  },
  watch: {
      // chooseFlag (newVal,lodVal) {
      //   if (newVal) {
      //     this.disabled = false
      //     this.opacity = 1 
      //   }
      // }
  },
  methods: {
    selectItem(line) {
      this.$set(line, 'isSelected', !line.isSelected);
      let listArr = [];
      this.dataList.forEach(item => {
        if (item.line1 && item.line1.isSelected) {
          listArr.push(item.line1.name);
        }
        if (item.line2 && item.line2.isSelected) {
          listArr.push(item.line2.name);
        }
      });
      if (listArr.length) {
        this.disabled = false
        this.opacity = 1 
      } else {
        this.disabled = true
        this.opacity = 0.4
      }
    },
    selectItem2(line) {
      this.$set(line, 'isSelected', !line.isSelected);
      let listArr = [];
      this.subwayList.forEach(item => {
        if (item && item.isSelected) {
          listArr.push(item.name);
        }
      });
      if (listArr.length) {
        this.disabled = false
        this.opacity = 1 
      } else {
        this.disabled = true
        this.opacity = 0.4
      }
    },
    selectedList() {
      if (this.disabled) {
          return;
      }
      let listArr = [];
      this.dataList.forEach(item => {
        if (item.line1 && item.line1.isSelected) {
          listArr.push(item.line1.name);
        }
        if (item.line2 && item.line2.isSelected) {
          listArr.push(item.line2.name);
        }
      });
      let selectedValue = listArr.join(',');
      // console.log(selectedValue,'选择到的值');
      this.$emit('busLineBtn',selectedValue)
    },
    selectedList2() {
      if (this.disabled) {
          return;
      }
      let listArr = [];
      this.subwayList.forEach(item => {
        if (item && item.isSelected) {
          listArr.push(item.name);
        }
      });
      let selectedValue = listArr.join(',');
       console.log(selectedValue,'选择到的值');
      this.$emit('busLineBtn',selectedValue)
    },
    addLineBtn(){
      this.$router.push({path:'/add-line'})
    }
  }
}
</script>

<style scoped>
.stations {
  background-color: #fff;
}
.stationList {
  width: 100%;
}
.stationItem {
  padding: 0.15rem 0;
  height: 0.24rem;
  line-height: 0.24rem;
  border-bottom: 1px solid #E5E5E5;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  font-size: 0.16rem;
  color: #333;
  padding-left: 0.36rem;
  background-image: url('../../commons/img/ic_radio_normal.png');
  background-size: 0.24rem 0.24rem;
  background-repeat: no-repeat;
  background-position: 0 0.15rem;
}
.stationItem.active {
    background-image: url('../../commons/img/ic_radio_checked.png');
}
.confirm {
  position: fixed;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 0.12rem 0.2rem;
  background-color: #fff;
  border-top: 1px solid #E5E5E5;
}
.confirmBtn {
  width: 100%;
  height: 0.36rem;
  line-height: 0.36rem;
  text-align: center;
  color: #fff;
  font-size: 0.16rem;
  background-color: #427CFF;
  border-radius: 1rem;
}
/* 公共的部分 */
.container-box {
    position: fixed;
    left: 0;
    top: .8rem;
    left: 0;
    right: 0;
    width: 100%;
    height: calc(100% - .8rem);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
}
.addr-icon{
    display: inline-block;
    width:0.85rem;
    height:0.85rem;
    background-size:100% 100%;
    background: url('../../commons/img/tent.png');
    background-size: 100% 100%;
    background-repeat:no-repeat;
}
.not-find{
    font-size: 0.16rem;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.2rem;
}
.explore-other-place{
    font-size: 0.14rem;
    color: #999999;
    letter-spacing: 0;
    text-align: center;
    line-height: 0.16rem;
    margin-top: 0.08rem;
}
.add-poi{
    display: inline-block;
    width:1rem;
    height:0.3rem;
    line-height:0.3rem;
    border: 1px solid #427CFF;
    border-radius: 0.3rem;
    color:#427CFF;
    margin-top:0.4rem;
}
</style>


