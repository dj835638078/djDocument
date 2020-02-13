const querystring = require('querystring')
//路由信息
const handleBlogRouter = require('./src/router/blog.js')
const handleUserRouter = require('./src/router/user.js')

//用于处理 post data
const getPostData = (req) =>{
    const promise = new Promise((resolve, reject)=>{
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data',chunk =>{  //监听传入的data的变化，当有变化时就拼接
            postData += chunk.toString()
        })
        req.on('end', ()=>{
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
const serverHandle = ( req, res ) => {
    //设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')
    //获取path
    const url = req.url
    req.path = url.split('?')[0]
    //解析query
    req.query = querystring.parse(url.split('?')[1])

    //使用getPostData （处理post data过后的数据）
    getPostData(req).then(postData =>{
        req.body = postData  //post请求取数据时可去req.body中获取

        //处理blog路由
        const blogData = handleBlogRouter(req, res)
        if (blogData) { 
            res.end(
                JSON.stringify(blogData)
            )
            return
        }

        //处理user路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(
                JSON.stringify(userData)
            )
            return
        }

        //未命中路由，返回404
        res.writeHead(404, {'Content-type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end()
        
    })

    

    
}

module.exports = serverHandle

//process.env.NODE_ENV