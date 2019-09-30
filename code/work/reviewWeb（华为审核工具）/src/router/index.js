import Vue from 'vue'
import Router from 'vue-router'
//系统配置页
import Home from 'components/home/home'
//系统配置页
import System from 'components/home/system'
//登录
import Login from 'components/pages/Login'
//个人中心
import InfoModify from 'components/personal/infoModify/InfoModify'
import PasswordModify from 'components/personal/passwordModify/PasswordModify'
import ImportList from 'components/personal/import/ImportList'
import ExportList from 'components/personal/export/ExportList'
//系统管理
import UserManage from 'components/system/UserManage/UserManage'
import RoleManage from 'components/system/RoleManage/RoleManage'
import DataDictionary from 'components/system/DataDictionary/DataDictionary'
import MenuManage from 'components/system/MenuManage/MenuManage'
import Journal from 'components/system/Journal/Journal'
import Lookup from 'components/system/Lookup/Lookup'
import OrganizeStructure from 'components/system/OrganizeStructure/OrganizeStructure'
import ChannelSet from 'components/system/ChannelSet/ChannelSet'
import RedisList from 'components/system/RedisList/RedisList'
import temporaryHome from 'components/system/Home/Home'
import Common from 'components/system/Home/Common'
import Demo from 'components/system/Home/imageLabelDemo'
import Developing from 'components/system/Home/developing'
//图文审核
import ImgExamine from 'components/examine/imgExamine/ImgExamine'
import VideoExamine from 'components/examine/videoExamine/VideoExamine'
import Condition from 'components/examine/imgExamine/condition'
import ConditionVideo from 'components/examine/videoExamine/condition'
import VideoQuery from 'components/examine/query/VideoQuery'
import ImgQuery from 'components/examine/query/ImgQuery'
import Abnormal from 'components/examine/abnormal/abnormal'
import Expert from 'components/examine/expert/expert'
//质检
import ImgQuality from 'components/quality/imgQuality/imgQuality'
import VideoQuality from 'components/quality/VideoQuality/videoQuality'
//客户质检
import customerImg from 'components/customer/imgQuality/imgQuality'
import customerVideo from 'components/customer/videoQuality/VideoQuality'
//系统监控
import Record from 'components/monitor/Record/Record'
//自动化
//敏感词
import Sensitive from 'components/automation/Sensitive/Sensitive'
import AutoAssignTask from 'components/automation/AutoAssignTask/AutoAssignTask'
import AutoAssignTaskRule from 'components/automation/AutoAssignTask/AutoAssignTaskRule'
import AutoAssignDaily from 'components/automation/AutoAssignTask/AutoAssignDaily'
import AuditTaskAuto from 'components/automation/AuditTaskAuto/AuditTaskAuto'
import AuditTaskAutoRule from 'components/automation/AuditTaskAuto/AuditTaskAutoRule'
import AuditTaskDaily from 'components/automation/AuditTaskAuto/AuditTaskDaily'
import AutoLookup from 'components/automation/AutoLookup/AutoLookup'
//报表管理
import Quality from 'components/reportforms/quality/quality'
import QualityDetail from 'components/reportforms/quality/qualityDetail'
import Detail from 'components/reportforms/manage/detail'
import Director from 'components/reportforms/manage/director/director'
import Chargehand from 'components/reportforms/manage/chargehand/chargehand'
import reportWash from 'components/reportforms/washLabel/index'
import personal from 'components/reportforms/washLabel/personal'

//图文标注
//任务分配
import taskList from 'components/imageLabel/taskList/taskList'
import distribute from 'components/imageLabel/distribute/distribute'
import tastDetail from 'components/imageLabel/taskList/tastDetail'
import orderDetail from 'components/imageLabel/taskList/orderDetail'
//清洗
import wash from 'components/imageLabel/wash/washDetail/wash'
import washCheck from 'components/imageLabel/wash/washDetail/washCheck'
import washList from 'components/imageLabel/wash/washList/index'
import washDetail from 'components/imageLabel/wash/washList/washDetail'
//标注
import labelList from 'components/imageLabel/label/labelList/labelList'
import labelDetail from 'components/imageLabel/label/labelList/labelDetail'
import labelImage from 'components/imageLabel/label/labelImage/label'
Vue.use(Router)

const routes = [
  //首页
  {
    path: '/home',
    name: 'home',
    component: temporaryHome,
    redirect: '/index',
  },
  //个人中心
  {
    path: '/user',
    name: 'System',
    component: System,
    redirect: '/user/InfoModify',
    meta: {
      title: '个人信息'
    },
    children: [{
        path: '/user/InfoModify',
        name: 'InfoModify',
        component: InfoModify,
        meta: {
          title: '个人信息修改'
        }
      },
      {
        path: '/user/PasswordModify',
        name: 'PasswordModify',
        component: PasswordModify,
        meta: {
          title: '密码修改'
        }
      },
      {
        path: '/user/ImportList',
        name: 'ImportList',
        component: ImportList,
        meta: {
          title: '我的导入'
        }
      },
      {
        path: '/user/ExportList',
        name: 'ExportList',
        component: ExportList,
        meta: {
          title: '我的导出'
        }
      },
    ]
  },
  //审核内容
  {
    path: '/examine',
    name: 'systemE',
    component: System,
    redirect: '/examine/ImgExamine',
    meta: {
      title: '任务审核'
    },
    children: [{
        path: '/examine/ImgExamine',
        name: 'ImgExamine',
        component: ImgExamine,
        meta: {
          title: '图文审核'
        }
      }, {
        path: '/examine/Condition',
        name: 'Condition',
        component: Condition,
        meta: {
          title: '图文审核统计'
        }
      }, {
        path: '/videoExamine/Condition',
        name: 'ConditionVideo',
        component: ConditionVideo,
        meta: {
          title: '视频审核统计'
        }
      }, {
        path: '/examine/VideoExamine',
        name: 'VideoExamine',
        component: VideoExamine,
        meta: {
          title: '视频审核'
        }
      },
      {
        path: '/query/VideoQuery',
        name: 'VideoQuery',
        component: VideoQuery,
        meta: {
          title: '视频查询'
        }
      },
      {
        path: '/query/ImgQuery',
        name: 'ImgQuery',
        component: ImgQuery,
        meta: {
          title: '图文查询'
        }
      },
      {
        path: '/abnormal/ImgAbnormal',
        name: 'ImgAbnormal',
        component: Abnormal,
        meta: {
          title: '图文质检异常'
        }
      },
      {
        path: '/abnormal/VideoAbnormal',
        name: 'VideoAbnormal',
        component: Abnormal,
        meta: {
          title: '视频质检异常'
        }
      },
      {
        path: '/expert/ImgExpert',
        name: 'ImgExpert',
        component: Expert,
        meta: {
          title: '图文专家'
        }
      },
      {
        path: '/expert/VideoExpert',
        name: 'VideoExpert',
        component: Expert,
        meta: {
          title: '视频专家'
        }
      },
    ]
  },
  //质检
  {
    path: '/quality',
    name: 'systemQ',
    component: System,
    redirect: '/quality/ImgQuality',
    meta: {
      title: '任务质检'
    },
    children: [{
        path: '/quality/ImgQuality',
        name: 'ImgQuality',
        component: ImgQuality,
        meta: {
          title: '图文质检'
        }
      },
      {
        path: '/quality/VideoQuality',
        name: 'VideoQuality',
        component: VideoQuality,
        meta: {
          title: '视频质检'
        }
      }
    ]
  },
  //客户质检
  {
    path: '/customer',
    name: 'systemR',
    component: System,
    redirect: '/customer/ImgQuality',
    meta: {
      title: '任务质检'
    },
    children: [{
        path: '/customer/ImgQuality',
        name: 'customerImg',
        component: customerImg,
        meta: {
          title: '图文质检'
        }
      },
      {
        path: '/customer/VideoQuality',
        name: 'customerVideo',
        component: customerVideo,
        meta: {
          title: '视频质检'
        }
      }
    ]
  },
  //自动化
  {
    path: '/automation',
    name: 'systemW',
    component: System,
    redirect: '/automation/Sensitive',
    meta: {
      title: '配置中心'
    },
    children: [{
        path: '/system/ChannelSet',
        name: 'ChannelSet',
        component: ChannelSet,
        meta: {
          title: '渠道管理'
        }
      }, {
        path: '/automation/Sensitive',
        name: 'Sensitive',
        component: Sensitive,
        meta: {
          title: '敏感词设置'
        }
      }, {
        path: '/automation/AutoAssignTask',
        name: 'AutoAssignTask',
        component: AutoAssignTask,
        meta: {
          title: '自动化配置模块'
        }
      }, {
        path: '/automation/AutoAssignTaskRule/:name/:id',
        name: 'AutoAssignTaskRule',
        component: AutoAssignTaskRule,
        meta: {
          title: '新建规则'
        }
      }, {
        path: '/automation/AutoAssignDaily/:id',
        name: 'AutoAssignDaily',
        component: AutoAssignDaily,
        meta: {
          title: '查看日志'
        }
      }, {
        path: '/automation/AuditTaskAuto',
        name: 'AuditTaskAuto',
        component: AuditTaskAuto,
        meta: {
          title: '自动化审批流程'
        }
      }, {
        path: '/automation/AuditTaskAutoRule/:name/:id',
        name: 'AuditTaskAutoRule',
        component: AuditTaskAutoRule,
        meta: {
          title: '新建规则'
        }
      }, {
        path: '/automation/AuditTaskDaily/:id',
        name: 'AuditTaskDaily',
        component: AuditTaskDaily,
        meta: {
          title: '查看日志'
        }
      }, {
        path: '/automation/AutoLookup',
        name: 'AutoLookup',
        component: AutoLookup,
        meta: {
          title: '分类列表'
        }
      },

    ]
  },
  //报表管理
  {
    path: '/reportforms',
    name: 'reportforms',
    component: System,
    meta: {
      title: '报表管理'
    },
    children: [{
        path: '/reportforms/Quality',
        name: 'Quality',
        component: Quality,
        meta: {
          title: '质检产出统计'
        }
      }, {
        path: '/reportforms/QualityDetail/:type/:dataSource/:sDate/:eDate',
        name: 'QualityDetail',
        component: QualityDetail,
        meta: {
          title: '质检产出统计详情'
        }
      }, {
        path: '/reportforms/director',
        name: 'Director',
        component: Director,
        meta: {
          title: '团队产出统计'
        }
      }, {
        path: '/reportforms/Chargehand',
        name: 'Chargehand',
        component: Chargehand,
        meta: {
          title: '个人产出统计'
        }
      },
      //清洗分类报表
      {
        path: '/reportforms/reportWash',
        name: 'reportWash',
        component: reportWash,
        meta: {
          title: '清洗分类团队产出统计'
        }
      },
      {
        path: '/reportforms/personWash',
        name: 'personWash',
        component: reportWash,
        meta: {
          title: '个人产出统计详情'
        }
      },
      {
        path: '/reportforms/personal/:id/:type/:s/:e',
        name: 'personal',
        component: personal,
        meta: {
          title: '个人产出统计详情'
        }
      },
      {
        path: '/reportforms/reportLabel',
        name: 'reportLabel',
        component: reportWash,
        meta: {
          title: '标注团队产出统计'
        }
      },
      {
        path: '/reportforms/personLabel',
        name: 'personLabel',
        component: reportWash,
        meta: {
          title: '个人产出统计详情'
        }
      },
      // {
      //   path: '/reportforms/personal/:id/:type',
      //   name: 'personal',
      //   component: personal,
      //   meta: {
      //     title: '个人产出统计详情'
      //   }
      // },

      {
        path: '/reportforms/Detail/:name/:type/:sDate/:eDate',
        name: 'Detail',
        component: Detail,
        meta: {
          title: '个人产出统计详情'
        }
      }
    ]
  },
  //系统监控
  {
    path: '/monitor',
    name: 'monitor',
    component: System,
    redirect: '/monitor/Record',
    meta: {
      title: '系统监控'
    },
    children: [{
      path: '/monitor/Record',
      name: 'Record',
      component: Record,
      meta: {
        title: '操作记录'
      }
    }]
  },
  //系统管理
  {
    path: '/',
    name: 'system',
    component: System,
    redirect: '/index',
    meta: {
      title: '系统管理'
    },
    children: [{
        path: '/system/UserManage',
        name: 'UserManage',
        component: UserManage,
        meta: {
          title: '用户管理'
        }
      },
      {
        path: '/system/RoleManage',
        name: 'RoleManage',
        component: RoleManage,
        meta: {
          title: '角色管理'
        }
      },
      {
        path: '/system/DataDictionary',
        name: 'DataDictionary',
        component: DataDictionary,
        meta: {
          title: '数据字典'
        }
      },
      {
        path: '/system/MenuManage',
        name: 'MenuManage',
        component: MenuManage,
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: '/system/Journal',
        name: 'Journal',
        component: Journal,
        meta: {
          title: '系统日志'
        }
      },
      {
        path: '/system/Lookup',
        name: 'Lookup',
        component: Lookup,
        meta: {
          title: '下拉管理'
        }
      },
      {
        path: '/system/OrganizeStructure',
        name: 'OrganizeStructure',
        component: OrganizeStructure,
        meta: {
          title: '组织架构'
        }
      },
      {
        path: '/system/RedisList',
        name: 'RedisList',
        component: RedisList,
        meta: {
          title: 'Redis缓存'
        }
      }, {
        path: '/index',
        name: 'temporaryHome',
        component: temporaryHome,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/Common',
        name: 'Common',
        component: Common,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/Demo',
        name: 'Demo',
        component: Demo,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/Developing/:id?',
        name: 'Developing',
        component: Developing,
        meta: {
          title: '首页'
        }
      },
    ]
  },
  //图文标注
  {
    path: '/imageLabel',
    name: 'imageLabel',
    component: System,
    meta: {
      title: '发布任务'
    },
    children: [{
        path: '/imageLabel/taskList',
        name: 'taskList',
        component: taskList,
        meta: {
          title: '任务列表'
        }
      }, {
        path: '/imageLabel/managerList',
        name: 'taskLista',
        component: taskList,
        meta: {
          title: '任务列表'
        }
      }, {
        path: '/imageLabel/distribute/:type/:id/:clientAccount/:orderName/:orderCode/:endDate',
        name: 'distribute',
        component: distribute,
        meta: {
          title: '任务分配'
        }
      }, {
        path: '/imageLabel/tastDetail/:role/:name/:id',
        name: 'tastDetail',
        component: tastDetail,
        meta: {
          title: '新增任务'
        }
      }, {
        path: '/imageLabel/orderDetail/:role/:name/:id',
        name: 'orderDetail',
        component: orderDetail,
        meta: {
          title: '订单详情'
        }
      }, {
        path: '/imageLabel/wash/:id/:nodeState/:orderStatus',
        name: 'wash',
        component: wash,
        meta: {
          title: '清洗'
        }
      }, {
        path: '/imageLabel/washCheck/:id/:nodeState/:orderStatus',
        name: 'washCheck',
        component: washCheck,
        meta: {
          title: '清洗质检'
        }
      }, {
        path: '/imageLabel/washList',
        name: 'washList',
        component: washList,
        meta: {
          title: '清洗列表'
        }
      },
      {
        path: '/imageLabel/checkWashList',
        name: 'checkWashList',
        component: washList,
        meta: {
          title: '质检清洗列表'
        }
      }, {
        path: '/imageLabel/washDetail/:id',
        name: 'washDetail',
        component: washDetail,
        meta: {
          title: '查询列表'
        }
      }, {
        path: '/imageLabel/labelList',
        name: 'labelList',
        component: labelList,
        meta: {
          title: '标注列表'
        }
      },
      {
        path: '/imageLabel/checkLabelList',
        name: 'checkLabelList',
        component: labelList,
        meta: {
          title: '质检标注列表'
        }
      }, {
        path: '/imageLabel/labelDetail/:id',
        name: 'labelDetail',
        component: labelDetail,
        meta: {
          title: '查询列表'
        }
      }, {
        path: '/imageLabel/labelImage/:id/:nodeState/:orderStatus',
        name: 'labelImage',
        component: labelImage,
        meta: {
          title: '标注'
        }
      }, {
        path: '/imageLabel/labelCheck/:id/:nodeState/:orderStatus',
        name: 'labelCheck',
        component: labelImage,
        meta: {
          title: '标注质检'
        }
      },
    ]
  },
  //登录
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    }
  }

]


const router = new Router({
  routes
});


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(m => m.meta.requireAuth)) {
//     //获取时间戳判断是否过期
//     let judgeLogin = window.localStorage.isLogin;
//     console.log(judgeTime, "zxzx")
//     if (judgeLogin == '1') {
//       next()
//     } else {
//       if (to.path == '/login') {
//         next()
//       } else {
//         next({
//           path: '/login'
//         })
//       }

//       //Vue.prototype.$message.warning('检测到您还未登录,请登录后操作！')
//     }
//   } else {
//     next()
//   }
// })
//简单粗暴法
router.beforeEach((to, from, next) => {
  let judgeTime = window.localStorage.time;
  //const isLogin = sessionStorage.getItem('loginData')
  let timeOut = new Date().getTime();
  if (timeOut < judgeTime) {
    next()
  } else {
    if (to.path === '/login') { //这就是跳出循环的关键
      next()
    } else {
      next('/login')
    }
  }

  // if (judgeTime) {
  //   next()
  // } else {
  //   //next('/login')
  //   if (to.path === '/login') { //这就是跳出循环的关键
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }
})
export default router;
