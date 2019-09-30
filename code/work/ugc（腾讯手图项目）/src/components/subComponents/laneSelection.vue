<template>
  <div :class="[isNight ? 'blackBg' : '',isNav ? 'isNav' : '', 'Time-box']" ref="box">
    <div class="duoxuantitle">
      {{text}}
      <div class="xing">*</div>
    </div>

    <div class="city-box">
      <div
        :class="cityList.indexOf(checkboxData[index].name)==-1?'time-item hairline choose':' time-item hairline chooseOn'"
        ref="times"
        v-for="(data,index) in checkboxData"
        :key="index"
        @click.stop="timesChoose(index)"
      >{{data.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "车道选择"
    },
    checkboxData: {
      type: Array,
      default() {
        return [];
      }
    },
    isNight: {
        type: Boolean,
        default: false
    },
    isNav: {
        type: Boolean,
        default: false
    }
  },
  data() {
    return {
      cityList: [],
      cityListData: []
    };
  },
mounted(){},
  //方法
  methods: {
    /*
     * 点击时间段
     */
    timesChoose(index) {
      // let allTime = this.$refs.allTime;
      let times = this.$refs.times;
      // allTime.className = "choose";
      times[index].className =
        times[index].className == "choose" ? "chooseOn" : "choose";
      if (this.cityList.indexOf(this.checkboxData[index].name) == -1) {
        this.cityList.push(this.checkboxData[index].name);
      } else {
        this.cityList.splice(
          this.cityList.indexOf(this.checkboxData[index].name),
          1
        );
      }
      this.$emit("selectionChange", this.cityList); 
    }
  },
  watch: {
    checkboxData(data) {
      this.cityList = [];
      for (let i = 0; i < this.checkboxData.length; i++) {
        if (this.cityListData.indexOf(this.checkboxData[i].name) != -1) {
          this.cityList.push(this.checkboxData[i]);
        }
      }
      if (this.cityListData.length != 0) {
        if (this.cityList.length == 0) {
          this.cityListData = 0;
          // this.ensureCity( );
          this.checkboxShow = true;
        }
      }
    }
  }
};
</script>


<style scoped>
.Time-box {
  /* width: 100%; */
  overflow: hidden;
  background: #fff;
  padding: 0.18rem;
  /* border-bottom: 0.01rem solid #dddee3; */
  border-bottom: 1px solid #dddee3;
}

.duoxuantitle {
  font-size: 0.17rem;
  color: #000000;
  margin-bottom: 0.18rem;
}

.duoxuantitle span {
  color: #427cff;
  margin-left: 0.05rem;
}

.city-box {
  overflow: hidden;
  width: 100%;
}

.time-cont {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 2.38rem;
}

.time-item {
  position: relative;
  width: 0.8rem;
  height: 0.32rem;
  line-height: 0.32rem;
  float: left;
  text-align: center;
  font-size: 0.13rem;
  color: #666666;
  margin-right: 0.03rem;
  overflow: hidden;
  border-radius: 1rem;
  /* border: 0.01rem solid #CCCCCC; */
  border: 1px solid #CCCCCC;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #F3F3F3;
  box-sizing: border-box;
}
.chooseOn {
  background: #fff;
  color: #4875FD;
}
.blackBg .duoxuantitle {
  color: #FFFFFF;
}
.blackBg .time-item {
  background: #333333;
  /* border: 0.01rem solid #59595B; */
  border: 1px solid #59595B;
  border-radius: 0.83rem;
}
.blackBg .chooseOn {
  color: #fff;
  background: #59595B;
  /* border: 0.01rem solid #AAAAAA; */
  border: 1px solid #AAAAAA;
}
.isNav .time-item {
  width: 1.6rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin-bottom: 0.18rem;
  font-size: 0.17rem;
}
</style>

<!--逻辑-->

