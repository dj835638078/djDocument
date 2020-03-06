const redis = require("redis")
const { REDIS_CONF } = require("../conf/db")

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

function set(key, val) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) { //容错
                reject(err)
                return
            }
            if (val == null) { //容错
                resolve(null)
                return
            }
            try {  //兼容json转换模式
                resolve(JSON.parse(val))
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}


module.exports = {
    set,
    get
}
//退出操作删除