<template>
  <div class="informationAdd">
    <el-dialog
      title="提示"
      :visible.sync="infoDialogShow"
      width="400px"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <p style="margin-top:20px">请确认填写的信息真实无误~</p>
      <p style="color:#F5A623;margin-top:20px">确定后不可修改</p>
      <span slot="footer" class="dialog-footer">
        <div class="dialogShow-footer footerAdd" @click="infoConfirm">
          确定
        </div>
        <div class="dialogShow-footer" @click="infoCancel">
          取消
        </div>
      </span>
    </el-dialog>
    <div class="informationAddTitle">
      <div class="line"></div>
      <div class="title" v-if="judgeType">质检详情</div>
      <div class="title" v-else>质检详情录入</div>
      <div class="main" style="float:right" @click="goBack()">
        返回列表
      </div>
    </div>
    <div class="vdoAddContent">
      <div class="vdoAddContent-title">
        <div class="vdo-title-box ">
          <div class="vdo-title-box-content">
            <div class="vdo-title-box-left">
              <div
                class="vdo-title-box-left-red"
                :class="judgeType ? 'vdo-title-box-left-white' : ''"
                v-text="judgeType ? '' : '*'"
              ></div>
              <div class="vdo-title-box-left-name">
                业务来源：
              </div>
            </div>
            <div class="vdo-title-box-right">
              <el-select
                :disabled="judgeType"
                clearable
                filterable
                v-model="dataSource"
                placeholder="请选择业务来源"
                class="smallWidth"
              >
                <el-option
                  v-for="(item, index) in lookUp.DATASOURCE_WX_SP"
                  :label="item.itemName"
                  :value="item.itemCode"
                  :key="index"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="error-tips">
            <span v-if="judgeDataSource">请选择业务来源</span>
          </div>
        </div>
        <div class="vdo-title-box vdo-title-box-separate">
          <div class="vdo-title-box-content">
            <div class="vdo-title-box-left">
              <div
                class="vdo-title-box-left-red"
                :class="judgeType ? 'vdo-title-box-left-white' : ''"
                v-text="judgeType ? '' : '*'"
              ></div>
              <div class="vdo-title-box-left-name">
                质检时间：
              </div>
            </div>
            <div class="vdo-title-box-right">
              <el-date-picker
                :disabled="judgeType"
                v-model="checkDate"
                type="datetime"
                placeholder="请选择质检时间"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="error-tips" style="padding-left:125px;">
            <span v-if="judgeCheckDate">请选择质检时间</span>
          </div>
        </div>
      </div>
      <ul
        class="vdo-content-List"
        v-for="(item, index) in imgAddData"
        :key="index"
      >
        <li class="vdo-content-List-box">
          <div
            class="deleteBtn el-icon-delete"
            @click="deleteBtn(index)"
            v-if="index != 0"
          ></div>
          <div class="vdo-title-box">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  来源：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  v-model="item.dataOrigin"
                  maxlength="50"
                  :disabled="judgeType"
                  class="smallWidth"
                  :placeholder="judgeType ? '' : '请输入来源'"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box " style="margin-left: 42px;">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name ">
                  分类：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  :disabled="judgeType"
                  clearable
                  v-model="item.vClassify"
                  class="smallWidth"
                  :placeholder="judgeType ? '' : '请输入分类'"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red "
                  :class="judgeType ? 'vdo-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="vdo-title-box-left-name">
                  启用状态：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-radio
                  :disabled="judgeType"
                  v-model="item.openState"
                  :label="1"
                  style="margin-top:10px;"
                  >已启用</el-radio
                >
                <el-radio
                  :disabled="judgeType"
                  v-model="item.openState"
                  :label="0"
                  style="margin-top:10px;"
                  >禁用</el-radio
                >
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeOpenState">请选择启用状态</span>
            </div>
          </div>
          <div class="vdo-title-box" style="margin-left: 42px;">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  标注状态：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-radio
                  :disabled="judgeType"
                  v-model="item.labelState"
                  :label="1"
                  style="margin-top:10px;"
                  >已标注</el-radio
                >
                <el-radio
                  :disabled="judgeType"
                  v-model="item.labelState"
                  :label="0"
                  style="margin-top:10px;"
                  >未标注</el-radio
                >
              </div>
            </div>
            <div class="error-tips"></div>
          </div>

          <div class="vdo-title-box">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  内容链接：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  :disabled="judgeType"
                  clearable
                  v-model="item.contentTitle"
                  class="bigWidth"
                  :placeholder="judgeType ? '' : '请输入内容链接'"
                  maxlength="30"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box" style="margin-left: 42px;">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  标签：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  :disabled="judgeType"
                  clearable
                  v-model="item.vSign"
                  class="bigWidth"
                  :placeholder="judgeType ? '' : '请输入标签'"
                  maxlength="30"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  视频质量：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-select
                  :disabled="judgeType"
                  clearable
                  v-model="item.videoQuality"
                  :placeholder="judgeType ? '' : '请选择视频质量'"
                  class="smallWidth"
                >
                  <el-option
                    v-for="(itema, index) in lookUp.ENTRY_CHECK_V_QUALITY"
                    :label="itema.itemName"
                    :value="itema.itemCode"
                    :key="index"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box" style="margin-left: 42px;">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  内容尺度：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-select
                  :disabled="judgeType"
                  clearable
                  v-model="item.videoScale"
                  :placeholder="judgeType ? '' : '请选择内容尺度'"
                  class="smallWidth"
                >
                  <el-option
                    v-for="(itema, index) in lookUp.ENTRY_CHECK_V_SCALE"
                    :label="itema.itemName"
                    :value="itema.itemCode"
                    :key="index"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  广告：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-radio
                  :disabled="judgeType"
                  v-model="item.adAudit"
                  label="1"
                  style="margin-top:10px;"
                  >含</el-radio
                >
                <el-radio
                  :disabled="judgeType"
                  v-model="item.adAudit"
                  label="0"
                  style="margin-top:10px;"
                  >不含</el-radio
                >
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box" style="margin-left: 42px;">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red "
                  :class="judgeType ? 'vdo-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="vdo-title-box-left-name">
                  是否正确：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-radio
                  :disabled="judgeType"
                  v-model="item.checkResult"
                  label="pass"
                  style="margin-top:10px;"
                  >正确</el-radio
                >
                <el-radio
                  :disabled="judgeType"
                  v-model="item.checkResult"
                  label="fail"
                  style="margin-top:10px;"
                  >错误</el-radio
                >
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeCheckResult">请选择是否正确</span>
            </div>
          </div>
          <div class="vdo-title-box">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  账号名称：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  :disabled="judgeType"
                  clearable
                  maxlength="30"
                  v-model="item.vAccount"
                  class="smallWidth"
                  :placeholder="judgeType ? '' : '请输入作者账号名称'"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box" style="margin-left: 42px;">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red "
                  :class="judgeType ? 'vdo-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="vdo-title-box-left-name">
                  审核人员：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <Human
                  v-if="!judgeType"
                  :disabledFlag="judgeType"
                  :difference="index"
                  val=""
                  :showYN="item.processAccount"
                  setVideo="yes"
                />
                <el-input
                  v-else
                  :disabled="judgeType"
                  clearable
                  v-model="item.processAccount"
                  class="smallWidth"
                ></el-input>
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeProcessAccount">请输入审核人员</span>
            </div>
          </div>
          <div class="vdo-title-box">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red "
                  :class="judgeType ? 'vdo-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="vdo-title-box-left-name">
                  视频rowkey:
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  :disabled="judgeType"
                  clearable
                  maxlength="30"
                  v-model="item.rowkey"
                  class="smallWidth"
                  placeholder="请输入视频rowkey"
                ></el-input>
              </div>
            </div>
            <div class="error-tips" v-if="item.judgeRowkey">
              请输入视频rowkey
            </div>
          </div>
          <div class="vdo-title-box" style="margin-left: 42px;">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red i"
                  :class="judgeType ? 'vdo-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="vdo-title-box-left-name">
                  质检来源：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-radio
                  v-model="item.checkChannel"
                  label="1"
                  style="margin-top:10px;"
                  :disabled="judgeType"
                  >自检</el-radio
                >
                <el-radio
                  v-model="item.checkChannel"
                  label="2"
                  style="margin-top:10px;"
                  :disabled="judgeType"
                  >客检</el-radio
                >
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeCheckChannel">请选择质检来源</span>
            </div>
          </div>
          <div class="vdo-title-box">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  错误分级：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-select
                  :disabled="judgeType"
                  clearable
                  v-model="item.errorLevel"
                  :placeholder="judgeType ? '' : '请选择错误分级'"
                  class="smallWidth"
                >
                  <el-option
                    v-for="(itema, index) in lookUp.ENTRY_CHECK_V_ERR_LEVEL"
                    :label="itema.itemName"
                    :value="itema.itemCode"
                    :key="index"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box" style="margin-left: 42px;">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  错误原因：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  :disabled="judgeType"
                  clearable
                  v-model="item.errorReason"
                  class="bigWidth"
                  :placeholder="judgeType ? '' : '请输入错误原因'"
                  maxlength="30"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box" v-if="judgeType">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  组别：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  :disabled="judgeType"
                  clearable
                  v-model="groupName"
                  class="bigWidth"
                  :placeholder="judgeType ? '' : '请输入组别'"
                  maxlength="30"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div
            class="vdo-title-box"
            style="margin-left: 42px;"
            v-if="judgeType"
          >
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  质检人员：
                </div>
              </div>
              <div class="vdo-title-box-right vdo-title-box-width">
                <el-input
                  :disabled="judgeType"
                  clearable
                  v-model="checkAccount"
                  class="bigWidth"
                  :placeholder="judgeType ? '' : '请输入质检人员'"
                  maxlength="30"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="vdo-title-box" v-if="judgeType">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name" style="width:100px;">
                  抽检是否正确：
                </div>
              </div>
              <div
                class="vdo-title-box-right "
                style="width:400px;line-height:32px;padding-left:10px;color:rgb(96, 98, 102)"
              >
                {{ spotCheckResult }}
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <!--*********************************************************************** -->
          <div class="vdo-title-box" style="width:1170px;min-height:65px">
            <div class="vdo-title-box-content">
              <div class="vdo-title-box-left">
                <div
                  class="vdo-title-box-left-red vdo-title-box-left-white"
                ></div>
                <div class="vdo-title-box-left-name">
                  错误备注：
                </div>
              </div>
              <div class="vdo-title-box-right-a">
                <el-input
                  v-model="item.errorRemark"
                  :disabled="judgeType"
                  :rows="3"
                  :placeholder="
                    judgeType ? '' : '请填写错误备注，最多输入200字'
                  "
                  maxlength="200"
                  type="textarea"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="clear"></div>
          <div class="error-tips"></div>
          <div class="clear"></div>
        </li>
      </ul>
      <div style="overflow:hidden;" v-if="!judgeType">
        <div class="blank" style="margin-left:500px;" @click="addArrData()">
          添加
        </div>
        <div class="query" style="margin-left:40px;" @click="storageData()">
          保存
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Human from "../../public/Human";
export default {
  data() {
    return {
      dataSource: "",
      judgeDataSource: false,
      checkDate: "",
      judgeCheckDate: false,
      groupName: "",
      checkAccount: "",
      spotCheckResult: "",
      imgAddData: [
        {
          //来源
          dataOrigin: "",
          //分类
          vClassify: "",
          //启用状态
          openState: "3",
          judgeOpenState: false,
          //标注状态
          labelState: "",
          //内容链接
          contentTitle: "",
          //标签
          vSign: "",
          //视频质量
          videoQuality: "",
          //内容尺度
          videoScale: "",
          //广告
          adAudit: "",
          //是否正确
          checkResult: "",
          judgeCheckResult: false,
          //账号名称
          vAccount: "",
          //审核人员
          processAccount: "",
          judgeProcessAccount: false,
          //质检来源
          checkChannel: "",
          judgeCheckChannel: false,
          //视频rowkey
          rowkey: "",
          judgeRowkey: false,
          //错误分级
          errorLevel: "",
          //错误原因
          errorReason: "",
          //问题点描述
          errorRemark: "",
          judgeAppealReason: false,
          humanAccountName: ""
        }
      ],
      //
      infoDialogShow: false,
      //判断是新增还是详情
      judgeType: false
    };
  },
  components: { Human },
  computed: {
    ...mapState(["detailHeight", "userInfo", "lookUp", "datasourceStore"]),
    myHeaders() {
      return {
        Authorization: localStorage.getItem("token")
      };
    }
  },
  mounted() {
    if (this.$route.params.type) {
      this.judgeType = true;
      this.getDetailForm();
    }
  },
  watch: {
    processResult() {
      if (!this.judgeType) {
        for (var i = 0; i < this.imgAddData.length; i++) {
          this.imgAddData[i].errorTypeArr = [];
        }
      }
    }
  },
  methods: {
    getDetailForm() {
      let data = {
        checkId: this.$route.params.type,
        checkType: "2"
      };
      this.api
        .post(`./complex/service/checkEntry/findDetail`, data)
        .then(response => {
          if (response.status == 200) {
            window.scrollTo(0, 0);
            let obj = response.data;
            this.dataSource = obj.dataSource;
            this.checkDate = obj.checkDate;
            this.groupName = this.tools.getRegionName(obj.verifyGroup);
            this.checkAccount = this.tools.setName(obj.checkAccount);
            if (obj.spotCheckResult) {
              if (obj.spotCheckResult == "pass") {
                this.spotCheckResult = "是";
              } else {
                this.spotCheckResult = "否";
              }
            } else {
              this.spotCheckResult = "一";
            }
            //来源
            this.imgAddData[0].dataOrigin = obj.dataOrigin;
            //分类
            this.imgAddData[0].vClassify = obj.vClassify;
            //启用状态
            this.imgAddData[0].openState = obj.openState;
            //标注状态
            this.imgAddData[0].labelState = obj.labelState;
            //内容链接
            this.imgAddData[0].contentTitle = obj.contentTitle;
            //标签
            this.imgAddData[0].vSign = obj.vSign;
            //视频质量
            this.imgAddData[0].videoQuality = obj.videoQuality;
            //内容尺度
            this.imgAddData[0].videoScale = obj.videoScale;
            //广告
            this.imgAddData[0].adAudit = obj.adAudit;
            //是否正确
            this.imgAddData[0].checkResult = obj.checkResult;
            //账号名称
            this.imgAddData[0].vAccount = obj.vAccount;
            //审核人员
            this.imgAddData[0].processAccount = this.tools.setName(
              obj.processAccount
            );
            //质检来源
            this.imgAddData[0].checkChannel = obj.checkChannel;
            //视频rowkey
            this.imgAddData[0].rowkey = obj.rowkey;
            //错误分级
            this.imgAddData[0].errorLevel = obj.errorLevel;
            //错误原因
            this.imgAddData[0].errorReason = obj.errorReason;
            //问题点描述
            this.imgAddData[0].errorRemark = obj.errorRemark;
          }
        })
        .catch(error => {});
    },

    //删除
    deleteBtn(index) {
      this.imgAddData.splice(index, 1);
    },
    //新增
    addArrData() {
      let obj = {
        dataOrigin: "",
        vClassify: "",
        openState: "3",
        judgeOpenState: false,
        labelState: "",
        contentTitle: "",
        vSign: "",
        videoQuality: "",
        videoScale: "",
        adAudit: "",
        checkResult: "",
        judgeCheckResult: false,
        vAccount: "",
        processAccount: "",
        judgeProcessAccount: false,
        checkChannel: "",
        judgeCheckChannel: false,
        rowkey: "",
        judgeRowkey: false,
        errorLevel: "",
        errorReason: "",
        errorRemark: "",
        humanAccountName: "",
        judgeAppealReason: false
      };
      this.imgAddData.push(obj);
    },
    //校验
    verification() {
      let arr = this.imgAddData;
      for (var i = 0; i < arr.length; i++) {
        arr[i].dataSource = this.dataSource;
        arr[i].judgeDataSource = this.judgeDataSource;
        arr[i].checkDate = this.checkDate;
        arr[i].judgeCheckDate = this.judgeCheckDate;

        if (!this.dataSource) {
          this.judgeDataSource = true;
        } else {
          this.judgeDataSource = false;
        }
        if (!this.checkDate) {
          this.judgeCheckDate = true;
        } else {
          this.judgeCheckDate = false;
        }

        if (!arr[i].checkChannel) {
          arr[i].judgeCheckChannel = true;
        } else {
          arr[i].judgeCheckChannel = false;
        }
        if (!arr[i].checkResult) {
          arr[i].judgeCheckResult = true;
        } else {
          arr[i].judgeCheckResult = false;
        }
        if (arr[i].openState < 3) {
          arr[i].judgeOpenState = false;
        } else {
          arr[i].judgeOpenState = true;
        }
        if (!arr[i].rowkey) {
          arr[i].judgeRowkey = true;
        } else {
          arr[i].judgeRowkey = false;
        }
        if (!arr[i].processAccount) {
          arr[i].judgeProcessAccount = true;
        } else {
          arr[i].judgeProcessAccount = false;
        }
      }
    },
    //保存
    storageData() {
      this.verification();
      let arrList = this.imgAddData;
      for (var j = 0; j < arrList.length; j++) {
        if (
          this.judgeDataSource ||
          this.judgeCheckDate ||
          arrList[j].judgeRowkey ||
          arrList[j].judgeProcessAccount ||
          arrList[j].judgeOpenState ||
          arrList[j].judgeCheckResult ||
          arrList[j].judgeCheckChannel
        ) {
          return;
        }
      }
      this.infoDialogShow = true;
    },
    infoConfirm() {
      let vm = this;
      let data = this.imgAddData;
      vm.api
        .post(`./complex/service/checkEntry/insertVideo`, data)
        .then(response => {
          if (response.status == 200) {
            vm.infoDialogShow = false;
            vm.$router.push({ name: "videoInput" });
          }
        })
        .catch(error => {});
    },
    infoCancel() {
      this.infoDialogShow = false;
    },
    goBack() {
      this.$router.go(-1); //返回上一层
    }
  }
};
</script>

<style scoped lang="less">
.informationAdd /deep/ .el-dialog__body {
  text-align: center;
  background: #f5f7fa;
}
.informationAdd /deep/ .el-dialog__footer {
  text-align: center;
  background: #f5f7fa;
}
.textareaHeight /deep/ textarea {
  height: 90px;
}
.informationAdd {
  width: 100%;
  height: auto;
  box-sizing: border-box;
  padding: 0 0 80px 0px;
  .informationAddTitle {
    overflow: hidden;
    margin-top: 18px;
    .line {
      width: 2px;
      height: 18px;
      background: rgba(0, 205, 202, 1);
      float: left;
      //margin-top: 5px;
      margin-right: 5px;
    }
    .title {
      width: 145px;
      //height: 29px;
      font-size: 18px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(42, 42, 42, 1);
      //line-height: 30px;
      float: left;
    }
  }
  .vdoAddContent {
    .vdoAddContent-title {
      margin-top: 15px;
      overflow: hidden;
    }
    .vdo-content-List-box {
      padding: 25px 0px 0px 15px;
      background: #f5f7fa;
      margin-bottom: 20px;
      position: relative;
      .deleteBtn {
        position: absolute;
        width: 24px;
        height: 24px;
        line-height: 24px;
        background: rgba(245, 108, 108, 1);
        border-radius: 2px;
        right: 0;
        top: 0;
        cursor: pointer;
        color: #fff;
        font-size: 18px;
        text-align: center;
      }
    }
    .vdo-title-box-separate {
      margin-left: 60px !important;
    }
    .vdo-title-box-width {
      width: 462px !important;
    }
    .vdo-title-box {
      width: 570px;
      float: left;
      margin-bottom: 5px;
      .vdo-title-box-content {
        height: 32px;
        .vdo-title-box-left {
          float: left;
          height: 32px;
          line-height: 32px;
          .vdo-title-box-left-red {
            color: red;
            float: left;
            width: 10px;
          }
          .vdo-title-box-left-white {
            color: #fff !important;
            width: 10px !important;
            height: 32px;
          }
          .vdo-title-box-left-name {
            float: left;
            width: 85px;
          }
        }
        .vdo-title-box-right {
          float: left;
          height: 32px;
          width: 475px;
          .el-date-editor,
          .el-select {
            width: 100% !important;
          }
        }
        .vdo-title-box-right-a {
          float: left;
          width: 1075px;
          .el-date-editor,
          .el-select {
            width: 100% !important;
          }
        }
      }
    }
    .error-tips {
      color: red;
      padding-left: 110px;
      height: 16px;
    }
    .vdo-content-List {
      overflow: hidden;
    }
  }
}
</style>