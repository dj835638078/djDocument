const querystring = require('querystring')
//路由信息
const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')

//1、session 数据
const SESSION_DATA = {};
//获取cookie的过期时间
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}

//用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {  //监听传入的data的变化，当有变化时就拼接
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )
        })
    })
    return promise
}
//业务代码
const serverHandle = (req, res) => {
    //设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    //获取path
    const url = req.url
    req.path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || ''  //获取cookie 格式k1=v2;k2=v2
    cookieStr.split(';').forEach(item => {
        if (!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    });

    //2、解析session
    let needSetCookie = false
    let userId = req.cookie.userid
    if (userId) {
        if (!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        needSetCookie = true
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
    }
    req.session = SESSION_DATA[userId]

    //使用getPostData （处理post data过后的数据）
    getPostData(req).then(postData => {
        req.body = postData  //post请求取数据时可去req.body中获取

        //处理blog路由
        // const blogData = handleBlogRouter(req, res)
        // if (blogData) { 
        //     res.end(
        //         JSON.stringify(blogData)
        //     )
        //     return
        // }
        const blogResult = handleBlogRouter(req, res)
        if (blogResult) {
            blogResult.then(blogData => {
                if (needSetCookie) { //3、判断是否需要设置userid(session)
                    res.setHeader('Set-Cookie', `userid=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
                }

                res.end(
                    JSON.stringify(blogData)
                )
            })
            return
        }

        //处理user路由
        // const userData = handleUserRouter(req, res)
        // if (userData) {
        //     res.end(
        //         JSON.stringify(userData)
        //     )
        //     return
        // }
        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if (userData) {
                    if (needSetCookie) { //判断是否需要设置userid(session)
                        res.setHeader('Set-Cookie', `userid=${userId};path=/; httpOnly; expires=${getCookieExpires()}`)
                    }
                    res.end(
                        JSON.stringify(userData)
                    )
                }
            })
            return
        }

        //未命中路由，返回404
        res.writeHead(404, { 'Content-type': 'text/plain' })
        res.write('404 Not Found\n')
        res.end()

    })




}

module.exports = serverHandle

//process.env.NODE_ENV