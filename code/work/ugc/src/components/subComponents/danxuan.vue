<template>
  <div :class="[isNight ? 'blackBg' : '',isNav ? 'isNav' : '', 'Time-box']" ref="box">
    <div class="duoxuantitle">
      {{text}}
      <span>*</span>
    </div>

    <div class="city-box">
      <div
        v-for="(data,index) in danxuanData"
        @click.stop="danxunDataChange(index,data)"
        :class="index==chanindex?'chooseOn time-item hairline':'choose time-item hairline'"
      >{{data.value}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "详情"
    },
    danxuanData: {
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
      cityListData: {},
      chanindex: -1
    };
  },

  //方法
  methods: {
    //点击时间段

    danxunDataChange(index, item) {
      this.chanindex = index;
      this.$emit("danxunDataChange", item);
    }
  },
  watch: {
    //
  }
};
</script>




<style scoped>
.Time-box {
  /* width: 100%; */
  overflow: hidden;
  background: #fff;
  padding: 0.18rem;
  border-bottom: 0.01rem solid #dddee3;
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
  border: 0.01rem solid #CCCCCC;
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
  border: 0.01rem solid #59595B;
  border-radius: 0.83rem;
}
.blackBg .chooseOn {
  color: #fff;
  background: #59595B;
  border: 0.01rem solid #AAAAAA;
}
.isNav .time-item {
  width: 1.6rem;
  height: 0.4rem;
  line-height: 0.4rem;
  margin-bottom: 0.18rem;
}
</style>

<!--逻辑-->

