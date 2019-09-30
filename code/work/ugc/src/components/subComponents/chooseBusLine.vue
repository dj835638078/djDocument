<template>
  <div class="container">
    <div  v-show="!emptyVisible">
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
        <div class="confirmBtn" @click="selectedList(selectedValue)">确认</div>
      </div>
    </div>
    <div class="container-empty-wrap" v-if="emptyVisible">
        <div class="container-empty">
            <div class='addr-icon'></div>
            <div class='not-find'>没有查询到该地点</div>
            <div class='explore-other-place'>试试探索其他地方</div>
            <div class="add-poi" @click='addLineBtn'>新增公交线</div>
        </div>    
    </div>
        
  </div>
</template>

<script>
import mixin from '@/config/mixin'
import md5 from '@/config/md5'  
import objKeySort from '@/config/sort'
import getReqId from '@/config/seqid'
import jsonp from 'jsonp'
export default {
  name: 'chooseBusLine',
  mixins: [mixin],
  data() {
    return {
      dataList: [],
      deviceInfo:{},
      emptyVisible:false
    }
  },
  mounted() {
        window.mqq.invoke('ugc', 'setNavBarTitle', {title: '选择线路'}, function (result) { 
        })
        window.mqq.invoke('ugc', 'setNavBarRightButton', {right: ''}, function (result) { 
        })
        nativeGetNavBarBackClick(function(data){
           history.go(-1)
        })

        var self = this
        console.log(self.$route.query.id,'是否能取到ididid')  //能取到
        let px = self.lon
        let py = self.lat
        let imei = self.deviceInfo.imei
        let device = self.deviceInfo.platform
        //let app_ver = self.deviceInfo.appVersion
        console.log(self.deviceInfo, 'deviceInfo')
        var url = stopidUrl+'/rtbus?qt=bus_stop_line_tag&stopUid='+self.$route.query.id+'&isOnlyRealtimeLine=0&isNeedLineGroup=1&imei='+imei+'&osVersion=android&softVersion=8.7.8&strNettp=61.135.172.68&strSessionId=&strPf=&strMobver=&strUserNetType=WiFi'
        
        jsonp(url, {param:'cb', timeout: 5000}, function(err, res) {
          console.log(res,'途径线路获取到的值')
            if (res && res.stopTag && res.stopTag.linePairs) {
                console.log(res.stopTag.linePairs,'zhi')
                self.dataList = res.stopTag.linePairs.filter(item => {
                    item.line1 && (item.line1.isSelected = false);
                    item.line2 && (item.line2.isSelected = false);
                    return item;
                });
                if(self.dataList == 0){
                    self.emptyVisible = true
                } else {
                    self.emptyVisible = false
                }
            } else {
              self.emptyVisible = true
            }
        });
  },
  methods: {
    selectItem(line) {
      this.$set(line, 'isSelected', !line.isSelected);
    },
    selectedList() {
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
  border-bottom: 0.01rem solid #E5E5E5;
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
  border-top: 0.01rem solid #E5E5E5;
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
.container-empty-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
}
.container-empty {
    position: absolute;
    left: calc(50% - 0.2rem);
    top: 770%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
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
    border: 0.01rem solid #427CFF;
    border-radius: 0.3rem;
    color:#427CFF;
    margin-top:0.4rem;
}
</style>


