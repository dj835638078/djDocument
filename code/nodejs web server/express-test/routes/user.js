var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET users listing. */
router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  const result = login(username, password)
  return result.then(data => {
    if (data.username) {
      // 设置 session
      req.session.username = data.username
      req.session.realname = data.realname
      // 同步到 redis   会自动同步
      // set(req.sessionId, req.session)
      res.json(new SuccessModel())
      return
    }
    res.json(new ErrorModel('登录失败'))
  })
});
// router.get('/login-test', (req, res, next) => {
//   if (req.session.username) {
//     res.json({
//       errno: 0,
//       msg: '登录成功'
//     })
//     return
//   }
//   res.json({
//     errno: -1,
//     msg: "未登录"
//   })
// })
module.exports = router;
