/**
 * @description user view 路由
 * @author Alun
 */

const router = require('koa-router')()

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

module.exports = router












