const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const handleUserRouter = (req, res) => {
    const method = req.method //GET POST

    // //登录
    // if (method === 'POST' && req.path === '/api/user/login') {
    //     const { username, password } = req.body
    //     const result = login(username, password)
    //     return result.then(val=>{
    //         if (val.username) {
    //             return new SuccessModel()
    //         } else {
    //             return new ErrorModel("登录失败")
    //         }
    //     })
        
    // }

    //演示cookie登录
    if (method === 'GET' && req.path === '/api/user/login') {
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(val=>{
            if (val.username) {

                //操作cookie
                res.setHeader('Set-Cookie', `username=${val.username};path=/`)

                return new SuccessModel(
                    {
                        username:
                    }
                )
            } else {
                return new ErrorModel("登录失败")
            }
        })
        
    }

    //登录验证测试
    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel())  //promise.resolve可直接封装一个promise返回
        }
        return Promise.resolve(new ErrorModel('尚未登录'))
    }


}

module.exports = handleUserRouter