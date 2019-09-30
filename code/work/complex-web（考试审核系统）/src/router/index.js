import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const routes = [
  // 根路径
  {
    path: "/",
    redirect: "/index"
  },
  //首页
  {
    path: '/index',
    name: 'index',
    component: () => import("components/pages/Frame"),
    redirect: '/index',
    meta: {
      title: '框架文件'
    },
    children: [{
        path: '/index',
        name: 'home',
        component: () => import("components/home/Index"),
        meta: {
          title: '首页内容区'
        }
      }, {
        path: '/noticeType/:type',
        name: 'noticeType',
        component: () => import("components/home/noticeType/noticeType"),
        meta: {
          title: '公告更多区'
        }
      }, {
        path: '/noticeSearch',
        name: 'noticeSearch',
        component: () => import("components/home/noticeSearch/noticeSearch"),
        meta: {
          title: '搜索公告'
        }
      }, {
        path: '/noticeNew',
        name: 'noticeNew',
        component: () => import("components/home/noticeNew/noticeNew"),
        meta: {
          title: '公告三天内容'
        }
      }, {
        path: '/myCollection',
        name: 'myCollection',
        component: () => import("components/myCollection/MyCollection"),
        meta: {
          title: '我的收藏'
        }
      }, {
        path: '/information',
        name: 'information',
        component: () => import("components/information/Index"),
        meta: {
          title: '信息录入'
        }
      }, {
        path: '/informationAdd',
        name: 'informationAdd',
        component: () => import("components/information/informationAdd"),
        meta: {
          title: '信息录入'
        }
      }, {
        path: '/reportFunction',
        name: 'reportFunction',
        component: () => import("components/reportFunction/Index"),
        meta: {
          title: '报备功能'
        }
      }, {
        path: '/reportAdd',
        name: 'reportAdd',
        component: () => import("components/reportFunction/reportAdd"),
        meta: {
          title: '报备新增'
        }
      }, {
        path: '/reportDetail/:filingId',
        name: 'reportDetail',
        component: () => import("components/reportFunction/reportDetail"),
        meta: {
          title: '报备详情'
        }
      }, {
        path: '/shift',
        name: 'shift',
        component: () => import("components/shift/Index"),
        meta: {
          title: '换班申请'
        }
      }, {
        path: '/shift/:type',
        name: 'shifta',
        component: () => import("components/shift/Index"),
        meta: {
          title: '换班申请'
        }
      }, {
        path: '/imageText',
        name: 'imageText',
        component: () => import("components/information/imageText/Index"),
        meta: {
          title: '质检图文信息录入'
        }
      }, {
        path: '/imageTextAdd/:type?',
        name: 'imageTextAdd',
        component: () => import("components/information/imageText/imageTextAdd"),
        meta: {
          title: '图文审核申诉'
        }
      }, {
        path: '/appealAdd/:type?',
        name: 'appealAdd',
        component: () => import("components/information/imageText/imageTextAdd"),
        meta: {
          title: '图文审核申诉'
        }
      }, {
        path: '/videoInput',
        name: 'videoInput',
        component: () => import("components/information/video/Index"),
        meta: {
          title: '质检视频信息录入'
        }
      }, {
        path: '/entryNumText',
        name: 'entryNum',
        component: () => import("components/information/entryNum/imgText/Index"),
        meta: {
          title: '质检图文数量录入'
        }
      }, {
        path: '/entryNumTextAdd',
        name: 'entryNumTextAdd',
        component: () => import("components/information/entryNum/imgText/imgTextAdd"),
        meta: {
          title: '质检图文数量录入'
        }
      }, {
        path: '/VideoAdd/:type?',
        name: 'VideoAdd',
        component: () => import("components/information/video/VideoAdd"),
        meta: {
          title: '质检视频信息新增'
        }
      }, {
        path: '/imageTextAppeal',
        name: 'imageTextAppeal',
        component: () => import("components/information/imageTextAppeal/Index"),
        meta: {
          title: '质检图文信息录入'
        }
      }, {
        path: '/imageTextAppealAdd/:type/:id',
        name: 'imageTextAppealAdd',
        component: () => import("components/information/imageTextAppeal/imageTextAppealAdd"),
        meta: {
          title: '质检图文信息申诉'
        }
      }, {
        path: '/videoAppeal',
        name: 'videoAppeal',
        component: () => import("components/information/videoAppeal/Index"),
        meta: {
          title: '视频审核申诉'
        }
      }, {
        path: '/videoAppealAdd/:type/:id',
        name: 'videoAppealAdd',
        component: () => import("components/information/videoAppeal/videoAppealAdd"),
        meta: {
          title: '视频审核申诉内容'
        }
      }, {
        path: '/videoAppealDetail/:checkId',
        name: 'videoAppealDetail',
        component: () => import("components/information/videoAppeal/videoAppealDetail"),
        meta: {
          title: '视频审核申诉详情'
        }
      }, {
        path: '/personal',
        name: 'personal',
        component: () => import("components/home/personal/index"),
        meta: {
          title: '个人中心'
        }
      }, {
        path: '/importExport',
        name: 'importExport',
        component: () => import("components/home/ieport/index"),
        meta: {
          title: '导入导出'
        }
      }, {
        path: '/importExport/:type?',
        name: 'importExportA',
        component: () => import("components/home/ieport/index"),
        meta: {
          title: '导入导出'
        }
      }, {
        path: '/detail/:bulletinId',
        name: 'detail',
        component: () => import("components/home/Detail"),
        meta: {
          title: '公告详情'
        }
      }, {
        path: '/detail/:bulletinIdIsNew',
        name: 'detailIsNew',
        component: () => import("components/home/Detail"),
        meta: {
          title: '公告详情'
        }
      }, {
        path: '/approval',
        name: 'approval',
        component: () => import("components/approval/ApprovalList"),
        meta: {
          title: '管理员审批'
        }
      }, {
        path: '/approvalDetail',
        name: 'approvalDetail',
        component: () => import("components/approval/approvalDetail"),
        meta: {
          title: '审批详情'
        }
      }, {
        path: '/train',
        name: 'train',
        component: () => import("components/train/Index"),
        meta: {
          title: '培训考试'
        }
      }, {
        path: '/trainDetail/:trainFileId/:trainId',
        name: 'trainDetail',
        component: () => import("components/train/TrainDetail"),
        meta: {
          title: '培训考试详情'
        }
      }, {
        path: '/caseBank',
        name: 'caseBank',
        component: () => import("components/caseBank/Index"),
        meta: {
          title: '案例库'
        }
      }, {
        path: '/caseBankDetail/:caseId',
        name: 'caseBankDetail',
        component: () => import("components/caseBank/caseBankDetail"),
        meta: {
          title: '案例库详情'
        }
      }, {
        path: '/ruleBank',
        name: 'ruleBank',
        component: () => import("components/ruleBank/Index"),
        meta: {
          title: '规则库'
        }
      }, {
        path: '/ruleBankDetail/:ruleId',
        name: 'ruleBankDetail',
        component: () => import("components/ruleBank/RuleBankDetail"),
        meta: {
          title: '规则库详情'
        }
      }, {
        path: '/paper/:errorNum/:testId',
        name: 'paper',
        component: () => import("components/paper/Paper"),
        meta: {
          title: '试卷'
        }
      }, {
        path: '/itemBank',
        name: 'itemBank',
        component: () => import("components/itemBank/table/Index"),
        meta: {
          title: '试卷列表'
        }
      }, {
        path: '/paperResult/:type?',
        name: 'paperResult',
        component: () => import("components/itemBank/table/Index"),
        meta: {
          title: '试卷结果列表'
        }
      }, {
        path: '/examinationResults/:testId/:paperCode/:fwmAccount',
        name: 'examinationResults',
        component: () => import("components/paper/Paper"),
        meta: {
          title: '试卷结果详情'
        }
      }, {
        path: '/examinationChecked/:type/:testId',
        name: 'examinationChecked',
        component: () => import("components/paper/Paper"),
        meta: {
          title: '试卷打分'
        }
      }, {
        path: '/staff/:testId/:name/:range/:type/:num/:time',
        name: 'staff',
        component: () => import("components/itemBank/table/staffTable/Index"),
        meta: {
          title: '工作人员查看试卷'
        }
      }, {
        path: '/todoList/:type?',
        name: 'todoList',
        component: () => import("components/todo/Index"),
        meta: {
          title: '待办列表'
        }
      }, {
        path: '/todoDetailReport/:taskId',
        name: 'todoDetailReport',
        component: () => import("components/todo/todoDetailReport"),
        meta: {
          title: '待办列表详情'
        }
      }, {
        path: '/leaveDetail/:taskId',
        name: 'leaveDetail',
        component: () => import("components/todo/leaveDetail"),
        meta: {
          title: '请假'
        }
      },
      {
        path: '/shiftDetail/:taskId',
        name: 'shiftDetail',
        component: () => import("components/todo/shiftDetail"),
        meta: {
          title: '换班'
        }
      },
      {
        path: '/leaveDetailInfo/:taskId',
        name: 'leaveDetailInfo',
        component: () => import("components/todo/leaveDetail"),
        meta: {
          title: '请假详情'
        }
      },
      {
        path: '/shiftDetailInfo/:taskId',
        name: 'shiftDetailInfo',
        component: () => import("components/todo/shiftDetail"),
        meta: {
          title: '请假详情'
        }
      },
      {
        path: '/leaveRelevant/:shiftReviseId',
        name: 'leaveRelevant',
        component: () => import("components/todo/leaveDetail"),
        meta: {
          title: '请假详情'
        }
      },
      {
        path: '/shiftRelevant/:shiftReviseId',
        name: 'shiftRelevant',
        component: () => import("components/todo/shiftDetail"),
        meta: {
          title: '换班详情'
        }
      },
      {
        path: '/doneDetailReport/:taskId',
        name: 'doneDetailReport',
        component: () => import("components/todo/todoDetailReport"),
        meta: {
          title: '待办列表详情'
        }
      }, {
        path: '/todoDetailImg/:taskId',
        name: 'todoDetailImg',
        component: () => import("components/todo/todoDetailImg"),
        meta: {
          title: '待办列表详情'
        }
      }, {
        path: '/doneDetailImg/:taskId',
        name: 'doneDetailImg',
        component: () => import("components/todo/todoDetailImg"),
        meta: {
          title: '待办列表详情'
        }
      }, {
        path: '/todoDetailVideo/:taskId',
        name: 'todoDetailVideo',
        component: () => import("components/todo/todoDetailVideo"),
        meta: {
          title: '待办列表详情'
        }
      }, {
        path: '/doneDetailVideo/:taskId',
        name: 'doneDetailVideo',
        component: () => import("components/todo/todoDetailVideo"),
        meta: {
          title: '待办列表详情'
        }
      }, {
        path: '/reportForm/checkData',
        name: 'checkData',
        component: () => import("components/reportForm/Index"),
        meta: {
          title: '质检数据'
        }
      }, {
        path: '/reportForm/videoCheckData',
        name: 'videoCheckData',
        component: () => import("components/videoReportForm/Index"),
        meta: {
          title: '视频质检数据'
        }
      }, {
        path: '/staffQuery',
        name: 'staffQuery',
        component: () => import("components/staffQuery/Index"),
        meta: {
          title: '员工查询'
        }
      }
    ]
  },
  //登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import("components/entrance/LoginIndex"),
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  //注册页面、忘记密码页面
  {
    path: '/loginPage/:name',
    name: 'loginPage',
    component: () => import("components/entrance/operateIndex")
  },
  //注册页面、忘记密码提示页面
  {
    path: '/pageMessage/:name',
    name: 'pageMessage',
    component: () => import("components/entrance/operateIndex")
  }

]

const router = new Router({
  routes
});


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(m => m.meta.requireAuth)) {
//     //获取时间戳判断是否过期
//     let judgeLogin = window.localStorage.isLogin;
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
//简单粗暴法(登录是否已过有效期)
router.beforeEach((to, from, next) => {
  console.log(to, "abcdefg")
  let judgeTime = window.localStorage.time;
  //const isLogin = sessionStorage.getItem('loginData')
  let timeOut = new Date().getTime();
  // < judgeTime
  if (timeOut < judgeTime) {
    next()
  } else {
    if (to.path === '/login') { //这就是跳出循环的关键
      next()
    } else {
      if (to.path === '/pageMessage/forgetPassword' || to.path === '/pageMessage/messagePassword' || to.path === '/pageMessage/messageLogin' || to.path === '/loginPage/registration') {
        next()
      } else {
        next('/login')
      }

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
