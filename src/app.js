const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const koaStatic = require('koa-static')

const {REDIS_CONF} = require('./conf/db')

const { isProd } = require('./utils/env')

//路由注册
const blogHomeApiRouter = require('./routes/api/blog-home')
// blog 页面路由
const blogViewRouter = require('./routes/view/blog')
//user 页面路由
const userViewRouter = require('./routes/view/user')
//user Api路由
const userApiRouter = require('./routes/api/user')
//utils api路由
const utilsApiRouter = require('./routes/api/utils')


//404，error
const errorViewRouter = require('./routes/view/error')


// error handler 匹配error页面
let onerrorConf = {}
if( isProd ){
    onerrorConf = {
        redirect:'/error'
    }
}
onerror(app, onerrorConf)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))

//session 配置
app.keys = ['weibo']
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 'koa.sid'
    prefix: 'weibo:sess:', //redis key 的前缀 默认是 'koa:sess:'
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //ms
    },
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// logger
/*app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})*/

// routes
app.use(blogViewRouter.routes(),blogViewRouter.allowedMethods())
//home
app.use(blogHomeApiRouter.routes(),blogHomeApiRouter.allowedMethods())
//user 页面路由
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
//user Api路由
app.use(userApiRouter.routes(), userApiRouter.allowedMethods())
//utils Api路由
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods())

//404路由注册到最下面
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
