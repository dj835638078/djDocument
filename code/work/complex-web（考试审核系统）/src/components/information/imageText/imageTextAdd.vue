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
    <div class="imgAddContent">
      <div class="imgAddContent-title">
        <div class="img-title-box">
          <div class="img-title-box-content">
            <div class="img-title-box-left">
              <div
                class="img-title-box-left-red"
                :class="judgeType ? 'img-title-box-left-white' : ''"
                v-text="judgeType ? '' : '*'"
              ></div>
              <div class="img-title-box-left-name">
                审核时间：
              </div>
            </div>
            <div class="img-title-box-right">
              <el-date-picker
                :disabled="judgeType"
                v-model="processDate"
                type="datetime"
                :placeholder="judgeType ? '' : '请选择审核时间'"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="error-tips">
            <span v-if="judgeProcessDate">请选择审核时间</span>
          </div>
        </div>
        <div class="img-title-box img-title-box-separate">
          <div class="img-title-box-content">
            <div class="img-title-box-left">
              <div
                class="img-title-box-left-red"
                :class="judgeType ? 'img-title-box-left-white' : ''"
                v-text="judgeType ? '' : '*'"
              ></div>
              <div class="img-title-box-left-name">
                来源：
              </div>
            </div>
            <div class="img-title-box-right">
              <el-select
                :disabled="judgeType"
                clearable
                v-model="dataSource"
                :placeholder="judgeType ? '' : '请选择来源'"
                class="smallWidth"
              >
                <el-option
                  v-for="(item, index) in lookUp.DATASOURCE_CD_TW"
                  :label="item.itemName"
                  :value="item.itemCode"
                  :key="index"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="error-tips">
            <span v-if="judgeBlock">请选择来源</span>
          </div>
        </div>
        <div class="img-title-box">
          <div class="img-title-box-content">
            <div class="img-title-box-left">
              <div
                class="img-title-box-left-red"
                :class="judgeType ? 'img-title-box-left-white' : ''"
                v-text="judgeType ? '' : '*'"
              ></div>
              <div class="img-title-box-left-name">
                审核结果：
              </div>
            </div>
            <div class="img-title-box-right">
              <el-radio
                :disabled="judgeType"
                v-model="processResult"
                label="pass"
                style="margin-top:10px;"
                >通过</el-radio
              >
              <el-radio
                :disabled="judgeType"
                v-model="processResult"
                label="fail"
                style="margin-top:10px;"
                >不通过</el-radio
              >
            </div>
          </div>
          <div class="error-tips">
            <span v-if="judgeProcessResult">请选择审核结果</span>
          </div>
          <!-- <div style="color:red;margin-left:90px;">
            请上传图片judgeProcessResult
          </div> -->
        </div>
        <div class="img-title-box img-title-box-separate">
          <div class="img-title-box-content">
            <div class="img-title-box-left">
              <div
                class="img-title-box-left-red"
                :class="judgeType ? 'img-title-box-left-white' : ''"
                v-text="judgeType ? '' : '*'"
              ></div>
              <div class="img-title-box-left-name">
                质检来源：
              </div>
            </div>
            <div class="img-title-box-right">
              <el-select
                v-model="checkChannel"
                :placeholder="judgeType ? '' : '请选择质检来源'"
                :clearable="true"
                :disabled="judgeType"
              >
                <el-option
                  v-for="item in lookUp.COMPLEX_CHECK_CHANNEL_VIDEO"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="error-tips">
            <span v-if="judgeCheckChannel">请选择质检来源</span>
          </div>
        </div>
        <div class="img-title-box" v-if="judgeType">
          <div class="img-title-box-content">
            <div class="img-title-box-left">
              <div
                class="img-title-box-left-red"
                :class="judgeType ? 'img-title-box-left-white' : ''"
                v-text="judgeType ? '' : '*'"
              ></div>
              <div class="img-title-box-left-name">
                质检人员：
              </div>
            </div>
            <div class="img-title-box-right">
              <el-input
                :disabled="judgeType"
                clearable
                v-model="checkAccount"
                :placeholder="judgeType ? '' : '请输入质检人员'"
                class="smallWidth"
              ></el-input>
            </div>
          </div>
          <div class="error-tips"></div>
        </div>
        <div class="img-title-box img-title-box-separate" v-if="judgeType">
          <div class="img-title-box-content">
            <div class="img-title-box-left">
              <div
                class="img-title-box-left-red"
                :class="judgeType ? 'img-title-box-left-white' : ''"
                v-text="judgeType ? '' : '*'"
              ></div>
              <div class="img-title-box-left-name">
                质检时间：
              </div>
            </div>
            <div class="img-title-box-right">
              <el-date-picker
                :disabled="judgeType"
                v-model="checkDate"
                type="datetime"
                :placeholder="judgeType ? '' : '选择质检时间'"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="error-tips">
            <span v-if="judgeBlock">请选择版块</span>
          </div>
        </div>
      </div>
      <ul
        class="img-content-List"
        v-for="(item, index) in imgAddData"
        :key="index"
      >
        <li class="img-content-List-box">
          <div
            class="deleteBtn el-icon-delete"
            @click="deleteBtn(index)"
            v-if="index != 0"
          ></div>
          <div class="img-title-box">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  标题：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <el-input
                  v-model="item.contentTitle"
                  maxlength="50"
                  :disabled="judgeType"
                  class="smallWidth"
                  :placeholder="judgeType ? '' : '请输入标题'"
                ></el-input>
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeContentTitle">请输入标题</span>
            </div>
          </div>
          <div class="img-title-box" style="margin-left: 42px;">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  审核人员：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <Human
                  v-if="!judgeType"
                  :disabledFlag="judgeType"
                  :difference="index"
                  val=""
                  :showYN="item.processAccount"
                  setImg="yes"
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
          <div class="img-title-box">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  rowkey：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <el-input
                  v-model="item.rowkey"
                  :disabled="judgeType"
                  maxlength="30"
                  class="smallWidth"
                  :placeholder="judgeType ? '' : '请输入rowkey'"
                ></el-input>
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeRowkey">请输入rowkey</span>
            </div>
          </div>
          <div class="img-title-box" style="margin-left: 42px;">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red img-title-box-left-white"
                ></div>
                <div class="img-title-box-left-name">
                  审核人QQ：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <el-input
                  :disabled="judgeType"
                  v-model="item.processQq"
                  clearable
                  @keyup.native="inputEnter(index)"
                  @change="inputEnter(index)"
                  maxlength="12"
                  class="smallWidth"
                  :placeholder="judgeType ? '' : '请输入审核人QQ号码'"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>

          <div class="img-title-box">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  文章类型：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <el-select
                  :disabled="judgeType"
                  clearable
                  v-model="item.graGenre"
                  :placeholder="judgeType ? '' : '请选择文章类型'"
                  class="smallWidth"
                >
                  <el-option
                    v-for="(item, index) in lookUp.ENTRY_CHECK_G_GENRE"
                    :label="item.itemName"
                    :value="item.itemCode"
                    :key="index"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeGGenre">请选择文章类型</span>
            </div>
          </div>
          <div class="img-title-box" style="margin-left: 42px;">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  错误程度：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <el-select
                  :disabled="judgeType"
                  clearable
                  v-model="item.errorLevel"
                  :placeholder="judgeType ? '' : '请选择错误程度'"
                  class="smallWidth"
                >
                  <el-option
                    v-for="(item, index) in lookUp.ENTRY_CHECK_G_ERR_LEVEL"
                    :label="item.itemName"
                    :value="item.itemCode"
                    :key="index"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeErrorLevel">请选择错误程度</span>
            </div>
          </div>
          <div class="img-title-box">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red img-title-box-left-white"
                ></div>
                <div class="img-title-box-left-name">
                  发布时间：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <el-date-picker
                  :disabled="judgeType"
                  v-model="item.publishDate"
                  type="datetime"
                  :placeholder="judgeType ? '' : '选择发布时间'"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="img-title-box" style="margin-left: 42px;">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red img-title-box-left-white"
                ></div>
                <div class="img-title-box-left-name">
                  领单时间：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <el-date-picker
                  :disabled="judgeType"
                  v-model="item.leadDate"
                  type="datetime"
                  :placeholder="judgeType ? '' : '选择领单时间'"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>

          <div class="img-title-box" style="height:auto;min-height:32px;">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  错误类型：
                </div>
              </div>
              <div
                class="img-title-box-right img-title-box-width"
                style="height:auto;"
              >
                <el-select
                  v-if="processResult == 'pass'"
                  :disabled="judgeType"
                  v-model="item.errorTypeArr"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  :multiple-limit="6"
                  :placeholder="judgeType ? '' : '请输入或选择错误类型'"
                >
                  <el-option
                    v-for="(item, index) in lookUp.ENTRY_CHECK_G_ERR_TYPE"
                    :label="item.itemName"
                    :value="item.itemCode"
                    :key="index"
                  >
                  </el-option>
                </el-select>
                <el-select
                  v-else
                  :disabled="judgeType"
                  v-model="item.errorTypeArr"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  :multiple-limit="6"
                  :placeholder="judgeType ? '' : '请输入或选择错误类型'"
                >
                  <el-option
                    v-for="(item, index) in lookUp.ENTRY_G_FALSE_REFUSE_TYPE"
                    :label="item.itemName"
                    :value="item.itemCode"
                    :key="index"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="error-tips">
              <span v-if="item.judgeErrorType">请输入或选择错误类型</span>
            </div>
          </div>
          <div class="img-title-box" style="margin-left: 42px;">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red img-title-box-left-white"
                ></div>
                <div class="img-title-box-left-name">
                  账号UIN：
                </div>
              </div>
              <div class="img-title-box-right img-title-box-width">
                <el-input
                  v-model="item.accountId"
                  :disabled="judgeType"
                  maxlength="30"
                  class="smallWidth"
                  :placeholder="judgeType ? '' : '请输入账号UIN'"
                ></el-input>
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="img-title-box" v-if="judgeType">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  是否正确：
                </div>
              </div>
              <div
                class="img-title-box-right "
                style="width:400px;line-height:32px;padding-left:10px;color:rgb(96, 98, 102)"
              >
                {{ spotCheckResult }}
              </div>
            </div>
            <div class="error-tips"></div>
          </div>
          <div class="img-title-box" style="width:1170px;min-height:65px">
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <!-- <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div> -->
                <div
                  class="img-title-box-left-red img-title-box-left-white"
                ></div>
                <div class="img-title-box-left-name">
                  问题点描述：
                </div>
              </div>
              <div class="img-title-box-right-a">
                <el-input
                  v-model="item.errorDesc"
                  :disabled="judgeType"
                  :rows="3"
                  :placeholder="
                    judgeType ? '' : '请填写问题点描述，最多输入200字'
                  "
                  maxlength="200"
                  type="textarea"
                ></el-input>
              </div>
            </div>
          </div>
          <div class="clear"></div>
          <div class="error-tips">
            <span v-if="item.judgeAppealReason"
              >请填写问题点描述，最多输入200字</span
            >
          </div>

          <div
            v-if="!judgeType"
            class="img-title-box"
            style="width:1170px;min-height:65px;margin-top:5px;"
          >
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  问题点截图：
                </div>
                <!-- <div style="float:left;">请上传一张真实审核数量的数据截图（支持上传jpg、png、jpeg、gif格式）</div> -->
              </div>
              <div
                class="img-title-box-right-a"
                style="width:110px;"
                @click="uploadIndex(index)"
              >
                <el-upload
                  class="avatar-uploader"
                  action="./complex/service/file/upload?fileType=public"
                  :show-file-list="false"
                  :headers="myHeaders"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img
                    v-if="item.imageUrl"
                    :src="item.imageUrl"
                    class="avatar"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <span
                style="line-height:90px;color: rgba(0, 0, 0, 0.45)"
                v-if="!item.imageUrl"
                >请上传一张真实审核数量的数据截图（支持上传jpg、png、jpeg、gif格式）</span
              >
            </div>
          </div>
          <div
            v-else
            class="img-title-box"
            style="width:1170px;min-height:65px;margin-top:5px;"
          >
            <div class="img-title-box-content">
              <div class="img-title-box-left">
                <div
                  class="img-title-box-left-red"
                  :class="judgeType ? 'img-title-box-left-white' : ''"
                  v-text="judgeType ? '' : '*'"
                ></div>
                <div class="img-title-box-left-name">
                  问题点截图：
                </div>
              </div>
              <div class="img-title-box-right-a" @click="uploadIndex(index)">
                <img
                  :src="downImg(item.graImgId)"
                  style="width:700px;height:295px"
                />
              </div>
            </div>
          </div>
          <div class="clear"></div>
          <div class="error-tips">
            <span v-if="item.judgeGImgId"
              >请上传一张真实审核数量的数据截图（支持上传jpg、png、jpeg、gif格式）</span
            >
          </div>
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
      //审核时间
      processDate: "",
      judgeProcessDate: false,
      //来源
      dataSource: "",
      judgeBlock: false,
      //审核结果
      processResult: "",
      judgeProcessResult: false,
      //质检渠道
      checkChannel: "",
      judgeCheckChannel: false,
      //质检人
      checkAccount: "",
      checkDate: "",
      spotCheckResult: "",
      imgAddData: [
        {
          //
          //来源
          dataSource: "",
          judgeBlock: false,
          //标题
          contentTitle: "",
          judgeContentTitle: false,
          //QQ
          processQq: "",
          //judgeProcessQq: false,
          //审核人员
          processAccount: "",
          judgeProcessAccount: false,
          //rowkey
          rowkey: "",
          judgeRowkey: false,
          //账号UIN
          accountId: "",
          //judgeAccountId: false,
          //发布时间
          publishDate: "",
          //领单时间
          leadDate: "",
          //审核时间
          processDate: "",
          judgeProcessDate: false,
          //审核结果
          processResult: "",
          judgeProcessResult: false,
          //质检渠道
          checkChannel: "",
          judgeCheckChannel: false,
          //截图ID
          graImgId: "",
          judgeGImgId: false,
          imageUrl: "",
          //错误类型
          errorTypeArr: [],
          errorType: "",
          judgeErrorType: false,
          //错误程度
          errorLevel: "",
          judgeErrorLevel: false,
          //文章类型
          graGenre: "",
          judgeGGenre: false,
          //问题点描述
          errorDesc: "",
          judgeAppealReason: false
        }
      ],
      //
      infoDialogShow: false,
      //判断是新增还是详情
      judgeType: false,
      imgType: "图文审核",
      judgeTypeName: true,
      uploadIndexNum: ""
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
        checkType: "1"
      };
      let url = "./complex/service/checkEntry/findDetail";
      if (this.$route.name == "appealAdd") {
        url = "./complex/service/appealEntry/findDetail";
      }
      this.api
        .post(url, data)
        .then(response => {
          if (response.status == 200) {
            window.scrollTo(0, 0);
            let obj = response.data;
            this.dataSource = obj.dataSource;
            this.processDate = obj.processDate;
            this.processResult = obj.processResult;
            this.checkChannel = obj.checkChannel;
            this.imgAddData[0].contentTitle = obj.contentTitle;
            if (obj.spotCheckResult) {
              if (obj.spotCheckResult == "pass") {
                this.spotCheckResult = "正确";
              } else {
                this.spotCheckResult = "错误";
              }
            } else {
              this.spotCheckResult = "-";
            }
            if (obj.processQq) {
              this.imgAddData[0].processQq = obj.processQq;
            }
            this.imgAddData[0].processAccount = this.tools.setName(
              obj.processAccount
            );
            this.imgAddData[0].rowkey = obj.rowkey;
            if (obj.accountId) {
              this.imgAddData[0].accountId = obj.accountId;
            }

            this.imgAddData[0].publishDate = obj.publishDate;
            this.imgAddData[0].leadDate = obj.leadDate;

            if (obj.errorType) {
              this.imgAddData[0].errorTypeArr = obj.errorType.split(",");
            }
            this.imgAddData[0].errorLevel = obj.errorLevel;
            this.checkAccount = this.tools.setName(obj.checkAccount);
            this.checkDate = obj.checkDate;
            this.imgAddData[0].graGenre = obj.graGenre;
            this.imgAddData[0].graImgId = obj.graImgId;
            this.imgAddData[0].errorDesc = obj.errorDesc;
          }
        })
        .catch(error => {});
    },
    downImg(fId) {
      if (fId) {
        return (
          location.origin + `/complex/publicservice/file/download?fId=${fId}`
        );
      }
    },
    //转换QQ
    inputEnter(index) {
      this.imgAddData[index].processQq = this.imgAddData[
        index
      ].processQq.replace(/^(0+)|[^\d]+/g, "");
    },
    //删除
    deleteBtn(index) {
      this.imgAddData.splice(index, 1);
    },
    //新增
    addArrData() {
      let obj = {
        dataSource: "",
        judgeBlock: false,
        contentTitle: "",
        judgeContentTitle: false,
        processQq: "",
        processAccount: "",
        judgeProcessAccount: false,
        rowkey: "",
        judgeRowkey: false,
        accountId: "",
        publishDate: "",
        leadDate: "",
        processDate: "",
        judgeProcessDate: false,
        processResult: "pass",
        checkChannel: "",
        judgeCheckChannel: false,
        graImgId: "",
        judgeGImgId: false,
        imageUrl: "",
        errorTypeArr: [],
        errorType: "",
        judgeErrorType: false,
        errorLevel: "",
        judgeErrorLevel: false,
        graGenre: "",
        judgeGGenre: false,
        errorDesc: "",
        judgeAppealReason: false
      };
      this.imgAddData.push(obj);
    },
    //校验
    verification() {
      let arr = this.imgAddData;
      for (var i = 0; i < arr.length; i++) {
        arr[i].processDate = this.processDate;
        arr[i].judgeProcessDate = this.judgeProcessDate;
        arr[i].dataSource = this.dataSource;
        arr[i].judgeBlock = this.judgeBlock;
        arr[i].processResult = this.processResult;
        arr[i].checkChannel = this.checkChannel;
        arr[i].judgeCheckChannel = this.judgeCheckChannel;

        // if (!arr[i].errorDesc) {
        //   arr[i].judgeAppealReason = true;
        // } else {
        //   arr[i].judgeAppealReason = false;
        // }
        if (!this.processResult) {
          this.judgeProcessResult = true;
        } else {
          this.judgeProcessResult = false;
        }
        if (!this.checkChannel) {
          this.judgeCheckChannel = true;
        } else {
          this.judgeCheckChannel = false;
        }
        if (!this.dataSource) {
          this.judgeBlock = true;
        } else {
          this.judgeBlock = false;
        }
        if (!arr[i].contentTitle) {
          arr[i].judgeContentTitle = true;
        } else {
          arr[i].judgeContentTitle = false;
        }
        if (!arr[i].processAccount) {
          arr[i].judgeProcessAccount = true;
        } else {
          arr[i].judgeProcessAccount = false;
        }
        if (!arr[i].rowkey) {
          arr[i].judgeRowkey = true;
        } else {
          arr[i].judgeRowkey = false;
        }

        if (!this.processDate) {
          this.judgeProcessDate = true;
        } else {
          this.judgeProcessDate = false;
        }
        if (arr[i].errorTypeArr.length == 0) {
          arr[i].judgeErrorType = true;
        } else {
          arr[i].judgeErrorType = false;
        }
        if (!arr[i].errorLevel) {
          arr[i].judgeErrorLevel = true;
        } else {
          arr[i].judgeErrorLevel = false;
        }
        if (!arr[i].graGenre) {
          arr[i].judgeGGenre = true;
        } else {
          arr[i].judgeGGenre = false;
        }
        if (!arr[i].graImgId) {
          arr[i].judgeGImgId = true;
        } else {
          arr[i].judgeGImgId = false;
        }
      }
    },
    //保存
    storageData() {
      this.verification();
      let arrList = this.imgAddData;
      for (var j = 0; j < arrList.length; j++) {
        if (
          this.judgeProcessDate ||
          this.judgeBlock ||
          this.judgeCheckChannel ||
          this.judgeProcessResult ||
          // arrList[j].judgeAppealReason ||
          arrList[j].judgeContentTitle ||
          arrList[j].judgeProcessAccount ||
          arrList[j].judgeRowkey ||
          arrList[j].judgeErrorType ||
          arrList[j].judgeErrorLevel ||
          arrList[j].judgeGGenre ||
          arrList[j].judgeGImgId
        ) {
          return;
        }
      }
      this.infoDialogShow = true;
    },
    infoConfirm() {
      let vm = this;
      for (var i = 0; i < this.imgAddData.length; i++) {
        this.imgAddData[i].errorType = this.imgAddData[i].errorTypeArr.join(
          ","
        );
      }
      let data = this.imgAddData;
      vm.api
        .post(`./complex/service/checkEntry/insertGraphics`, data)
        .then(response => {
          if (response.status == 200) {
            vm.infoDialogShow = false;
            vm.$router.push({ name: "imageText" });
          }
        })
        .catch(error => {});
    },
    infoCancel() {
      this.infoDialogShow = false;
    },
    goBack() {
      this.$router.go(-1); //返回上一层
    },
    uploadIndex(index) {
      this.uploadIndexNum = index;
    },
    handleAvatarSuccess(res, file, index) {
      this.imgAddData[this.uploadIndexNum].imageUrl = URL.createObjectURL(
        file.raw
      );
      this.imgAddData[this.uploadIndexNum].graImgId = res[0].fId;
    },
    beforeAvatarUpload(file) {
      const flag = file.name
        .split(".")
        .pop()
        .toLowerCase();
      let arr = ["jpg", "png", "jpeg", "gif"];
      let isTYPE;
      for (var i = 0; i < arr.length; i++) {
        if (flag === arr[i]) {
          isTYPE = true;
          break;
        } else {
          isTYPE = false;
        }
      }
      if (!isTYPE) {
        this.$message.error("上传文件只能是jpg,png,jpeg,gif格式!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isTYPE && isLt2M;
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
  .imgAddContent {
    .imgAddContent-title {
      margin-top: 15px;
      overflow: hidden;
    }
    .img-content-List-box {
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
    .img-title-box-separate {
      margin-left: 60px !important;
    }
    .img-title-box-width {
      width: 462px !important;
    }
    .img-title-box {
      width: 570px;
      float: left;
      margin-bottom: 5px;
      .img-title-box-content {
        height: 32px;
        .img-title-box-left {
          float: left;
          height: 32px;
          line-height: 32px;
          .img-title-box-left-red {
            color: red;
            float: left;
            width: 10px;
          }
          .img-title-box-left-white {
            color: #fff !important;
            width: 10px !important;
            height: 32px;
          }
          .img-title-box-left-name {
            float: left;
            width: 85px;
          }
        }
        .img-title-box-right {
          float: left;
          height: 32px;
          width: 475px;
          .el-date-editor,
          .el-select {
            width: 100% !important;
          }
        }
        .img-title-box-right-a {
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
      width: 100%;
      color: red;
      margin-left: 105px;
      height: 16px;
    }
    .img-content-List {
      overflow: hidden;
    }
  }
}
</style>