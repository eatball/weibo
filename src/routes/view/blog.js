/**
 * @description 微博 view 路由
 * @author Alun
 * @type {*|module:koa-router|Router|undefined}
 */

const router = require('koa-router')()
const { loginRedirect } = require('../../middlewares/loginChecks')

router.get('/', loginRedirect, async (ctx, next)=>{
    await ctx.render('index',{

    })
})

module.exports = router













