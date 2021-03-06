var createError = require('http-errors'); //处理404请求
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');  //解析cookie插件
var logger = require('morgan'); //使用后 类似于access方法，记录access log（记录日志）
const session = require('express-session') //引用session
const RedisStore = require('connect-redis')(session) //执行函数并引用session

// var indexRouter = require('./routes/index');  //引用路由
// var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');

var app = express(); //通过express初始化一个app,本次app请求的一个实例

// view engine setup   视图引擎的设置，相关于views文件夹中的内容，在只开发后台服务时可忽略
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));  //通过配置后实现写日志功能
const ENV = process.env.NODE_ENV
if (ENV != 'production') {
  // 开发环境/测试环境
  app.use(logger('dev'))
} else {
  // 线上环境  写入到日志文件夹中
  const logFileName = path.join(__dirname, 'logs', 'assess.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', {
    stream: writeStream
  }))
}

app.use(express.json()); //使用express.json ， 处理post data数据。当post请求有数据传入时，在路由中可通过req.body获取
app.use(express.urlencoded({ extended: false }));  //处理post data数据 ,post请求兼容content-type不是json格式数据时的data
app.use(cookieParser());  //注册cookie方法，注册后能在路由中通过req.cookies获取cookie
app.use(express.static(path.join(__dirname, 'public')));  //对应的时public文件夹中的内容，只写后台代码可忽略

const redisClient = require('./db/redis') //引用redis
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(session({ //解析session
  resave: false, //添加 resave 选项
  saveUninitialized: true, //添加 saveUninitialized 选项
  secret: 'WJiol#231123_',
  cookie: {
    // path: '/',  //默认配置
    // httpOnly: true,  //默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}));
// app.use('/', indexRouter);  //注册路由 
// app.use('/users', usersRouter); //此处的路径为父路径，可与userRouter中的子路径进行拼接，最终路径为组合后的路径
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler  检测404请求
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler   错误处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
