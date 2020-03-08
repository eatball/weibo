/**
 * @description user api
 * @author Alun
 */

const router = require('koa-router')()
router.prefix('/api/user')

const { isTest } = require('../../utils/env')

const { isExist, register, login, deleteCurUser } = require('../../controller/user')
const { loginCheck } = require('../../middlewares/loginChecks')

const userValidate = require('../../validator/user')
const { genValidator } = require('../../middlewares/validator')

//注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body

    ctx.body = await register({
        userName, password, gender
    })
})
//登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

//用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})
//删除
router.post('/delete', loginCheck, async (ctx, next)=>{
    if( isTest ){
        //测试环境下，测试账号登录后，删除自己
        const { userName } = ctx.session.userInfo
        //调用controller
        ctx.body = await deleteCurUser(userName)
    }
})

module.exports = router
















