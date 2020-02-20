const env = process.env.NODE_ENV

//配置
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'dj@19920213',
        port: '3306',
        database: 'nodestudy'
    }
}
//线上环境配置
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'dj@19920213',
        port: '3306',
        database: 'nodestudy'
    }
}

module.exports = {
    MYSQL_CONF
}