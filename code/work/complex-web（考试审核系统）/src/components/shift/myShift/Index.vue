<template>
  <div class="shiftData">
    <div class="shiftData-search">
      <div class="search-one-box">
        <div class="search-one-box-name" style="width:70px;">班次：</div>
        <div class="search-one-box-name">
          <el-date-picker v-model="beginTime" type="month" placeholder="选择月"></el-date-picker>
        </div>
      </div>
      <!--<div style="float:right">
        <div class="query interval" @click="query">查询</div>
        <div class="release" v-if="!beginTime">重置</div>
        <div class="main" @click="release" v-else>重置</div>
      </div>-->
    </div>
    <el-table :data="tableData" style="width: 100%" tooltip-effect="light">
      <el-table-column
        prop="userName"
        label="姓名"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="fwmAccount"
        label="工号"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="restDay"
        label="休息天数"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="workDay"
        label="上班天数"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="cworkDay"
        label="C班天数"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="leaveHour"
        label="事假（时）"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="yearHour"
        label="年假（时）"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="diseaseHour"
        label="病假（时）"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="changeHour"
        label="调休（时）"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
      <el-table-column
        prop="returnHour"
        label="还班（时）"
        align="center"
        :show-overflow-tooltip="true"
        :label-class-name="handclass"
      >
      </el-table-column>
    </el-table>
    <div class="week_title">     
      <div class="week_title_item"><span>周一</span></div>
      <div class="week_title_item"><span>周二</span></div>
      <div class="week_title_item"><span>周三</span></div>
      <div class="week_title_item"><span>周四</span></div>
      <div class="week_title_item"><span>周五</span></div>
      <div class="week_title_item"><span>周六</span></div>
      <div class="week_title_item"><span>周日</span></div>
    </div>
    <ul class="week_list" v-for="(item,index) in dayData" :key="index">
        <li class="week_list_box" v-for="(day,i) in item" :key="i">
          <div class="week_list_day" :class="day.shiftClass" v-if="day!=null">
            <i class="fa fa-exclamation-circle" v-if="day.shiftLog!=''"></i>
            <div class="day"><span v-text="day.dayValue"></span></div>
            <el-tooltip placement="top" effect="light">
              <div slot="content">{{setShiftType(day.shiftType)+day.shiftLog}}</div>
              <div class="shift">
                <span v-text="setShiftType(day.shiftType)+day.shiftLog"></span>
              </div>
            </el-tooltip>
          </div>
          <div class="week_list_day week_list_day5" v-else></div>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      beginTime: this.currentDate(),
      dayData: [],
      tableData:[],
      handclass:'el-table-th',
      notData: true
    };
  },
  watch: {//监听月份变化
    beginTime() {
      this.getMyShiftInfo();
    }
  },
  components: {  },
  computed: {
    ...mapState(["homeContentHeight", "userInfo", "lookUp"])
  },
  mounted() {
    this.getMyShiftInfo();
  },
  methods: {
    //设置班次类型
    setShiftType(data) {
      if (data) {
        for (var key in this.lookUp.EMPLOYEE_SHIFT_TYPE) {
          if (data == this.lookUp.EMPLOYEE_SHIFT_TYPE[key].itemCode) {
            return this.lookUp.EMPLOYEE_SHIFT_TYPE[key].itemName;
          }
        }
      }else{
        return "";
      }
    },
    //获取当前月份
    currentDate() {
      var cdate = new Date();
      if(cdate.getDate()>=21){
        cdate.setMonth(cdate.getMonth() +1);
      }
      cdate.setDate(1);
      return cdate;
    },
    //获取数据
    getMyShiftInfo() {
      let data = {
        beginTime: this.beginTime
      };
      this.api
        .post(`./complex/service/shift/findc`,data)
        .then(response => {
          if (response.status == 200) {
            let baseData = {
              fwmAccount:response.data.fwmAccount,
              userName:response.data.userName,
              restDay:response.data.restDay>0?parseFloat(response.data.restDay):"",
              workDay:response.data.workDay>0?parseFloat(response.data.workDay):"",
              cworkDay:response.data.cworkDay>0?parseFloat(response.data.cworkDay):"",
              leaveHour:response.data.leaveHour>0?response.data.leaveHour:"",
              yearHour:response.data.yearHour>0?response.data.yearHour:"",
              diseaseHour:response.data.diseaseHour>0?response.data.diseaseHour:"",
              changeHour:response.data.changeHour>0?response.data.changeHour:"",
              returnHour:response.data.returnHour>0?response.data.returnHour:""
            };
            this.tableData = [baseData];
            //组装每日班次数据
            var regExp = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
            this.dayData = [];
            var weekData = [];
            var weekStartIdx = 1;
            var weekSumCount = 0;
            for(var key in response.data){
              //是否无班次
              if(response.data[key].shiftType){
                this.notData = false;
              }
              if(regExp.test(key)){
                var arys1 =key.split('-');
                var ssdate=new Date(arys1[0],parseInt(arys1[1]-1),arys1[2]);
                while(weekStartIdx!=ssdate.getDay() && weekSumCount<31){
                  weekData.push(null);
                  if(weekStartIdx==6){
                    weekStartIdx=0;
                  }else{
                    weekStartIdx++;
                  }
                  weekSumCount++;
                }
                if(weekStartIdx==ssdate.getDay()){
                  var dclass = "week_list_day5";
                  if(response.data[key].shiftType!=null && response.data[key].shiftType!=""){
                    dclass="week_list_day"+response.data[key].shiftType;
                  }
                  let shiftLog = "";
                  if(response.data[key].shiftLog && response.data[key].shiftLog!=null){
                      shiftLog="/"+response.data[key].shiftLog;
                  }
                  let day = {
                  dateValue:key,
                  dayValue:key.substr(5,2)+"月"+key.substr(8,2)+"日",
                  shiftType:response.data[key].shiftType,
                  workHour:response.data[key].workHour,
                  shiftLog:shiftLog,
                  shiftClass:dclass
                  };
                  weekData.push(day);
                }
                weekStartIdx++;
                if(weekStartIdx==7){weekStartIdx=0;}
                if(weekStartIdx==1){this.dayData.push(weekData);weekData = [];}
              }
            }
            var wcount = weekData.length;
            if(wcount>0){
              if(wcount<7){
                for(var i=0;i<7-wcount;i++){
                  weekData.push(null);
                }
              }
              this.dayData.push(weekData);
            }
          }
        })
        .catch(error => {});
        
    }
  }
};
</script>

<style lang="less">
.el-table-th{ 
  color: #2A2A2A;
  font-weight: 700;
  font-size: 14px;
  background: #ebeef5!important;
}
.el-tooltip__popper {
    max-width: 150px !important;
}
</style>
<style scoped lang="less">
.checkData-search /deep/.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 190px;
  height: 32px;
}
.shiftData {
  width: 100%;
  margin-bottom: 100px;
  .shiftData-search {
    height: 32px;
    width: 100%;
    margin-top: 20px;
    padding-bottom: 10px;
    margin-bottom: 10px;
    .search-one-box {
      height: 32px;
      float: left;
      margin-right: 15px;
      .search-one-box-name,
      .search-one-box-input {
      float: left;
      }
      .search-one-box-name {
        width: 64px;
        height: 32px;
        line-height: 32px;
        text-align: left;
      }
      .search-one-box-input {
        width: 167px;
        height: 32px;
      }
      .search-one-box-time {
        width: 170px;
        float: left;
        .el-date-editor {
          width: 170px;
        }
      }
    }
  }
}

.week_list {
  width: 100%;
  overflow: hidden;
  .week_list_box {
    float: left;
    margin-right: 5px;
    width: 13.7%;
    margin-top: 5px;
    border: 1px solid #ebeef5;
    .week_list_day {
      height: 70px;
      position: relative;
      i {
        color: #F56C6C;
        position: absolute;
        top: 5px;
        right: 5px;
      }
      .day {
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-weight: 700;
        font-size: 14px;
      }
      .shift {
        text-align: center;
        height: 40px;
        line-height: 40px;
        cursor:pointer;
        font-size: 14px;
        span {
          width: 110px;
          display: inline-block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-top: -4px;
        }
      }
      a.shift:hover {
        color: #333 !important;
        font-weight: 400;
      }
    }
    .week_list_day1 {
      background: rgba(0,205,202,0.1);
      color: #00CDCA;
    }
    .week_list_day2 {
      background: rgba(245,108,108,0.1);
      color: #F56C6C;
    }
    .week_list_day3 {
      background: rgba(230,162,59,0.1);
      color: #E6A23B;
    }
    .week_list_day4 {
      background: rgba(102,194,58,0.1);
      color: #66C23A;
    }
    .week_list_day5 {
      background: rgba(240,242,245,0.1);
    }
  }
}

.week_title {
  display: inline-block;
  width: 100%;
  height: 36px;
  line-height: 36px;
  background: #ebeef5;
  margin-top: 15px;
  .week_title_item{
    width: 13.28%;
    text-align: center;
    float: left;
    margin-right: 10px;
    color: #2A2A2A;
    font-weight: 700;
    font-size: 14px;
  }
}

</style>