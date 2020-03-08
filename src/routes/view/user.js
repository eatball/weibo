/**
 * @description user view 路由
 * @author Alun
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

function getLoginInfo(ctx){
    let data = {
        isLogin: false //默认未登录
    }
    const userInfo = ctx.session.userInfo
    if( userInfo ){
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }
    return data
}

//注册
router.get('/register', async (ctx, next)=>{
    await ctx.render('register',getLoginInfo(ctx))
})

//登录
router.get('/login', async (ctx, next)=>{
    await ctx.render('login',getLoginInfo(ctx))
})

//修改基本信息
router.get('/setting', loginRedirect, async (ctx, next)=>{
    await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router












