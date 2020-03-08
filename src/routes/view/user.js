/**
 * @description user view 路由
 * @author Alun
 */

const router = require('koa-router')()

//注册
router.get('/register', async (ctx, next)=>{
    await ctx.render('register',{

    })
})

//登录
router.get('/login', async (ctx, next)=>{
    await ctx.render('login',{

    })
})

module.exports = router












