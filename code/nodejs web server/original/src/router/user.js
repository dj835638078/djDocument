const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')

const handleUserRouter = (req, res) => {
    const method = req.method //GET POST

    //登录
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        // const { username, password } = req.query//演示cookie登录,Get请求
        const result = login(username, password)
        return result.then(val => {
            if (val.username) {
                //设置session
                req.session.username = val.username
                req.session.realname = val.realname
                //同步到redis
                set(req.sessionId, res.session)
                return new SuccessModel()
            } else {
                return new ErrorModel("登录失败")
            }
        })

    }

    //登录验证测试
    // if (method === 'GET' && req.path === '/api/user/login-test') {
    //     if (req.session.username) {
    //         return Promise.resolve(new SuccessModel())  //promise.resolve可直接封装一个promise返回
    //     }
    //     return Promise.resolve(new ErrorModel('尚未登录'))
    // }


}

module.exports = handleUserRouter