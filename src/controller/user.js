/**
 * @description user controller
 * @author Alun
 */

const { getUserInfo, createUser } = require('../services/user')
const doCrypto = require('../utils/cryp')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo } = require('../model/ErrorInfo')
/**
 * 用户名是否存在
 * @param username
 * @returns {Promise<void>}
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)
    if( userInfo ){
        //已存在
        return new SuccessModel(userInfo)
    }else {
        //不存在
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}

/**
 * 注册
 * @param userName
 * @param password
 * @param gender
 * @returns {Promise<void>}
 */
async function register({userName, password, gender}){
    const userInfo = await getUserInfo(userName)
    if( userInfo ){
        //已存在
        return new ErrorModel(registerUserNameExistInfo)
    }
    try {
        await createUser({
            userName, password:doCrypto(password), gender
        })
        return new SuccessModel()
    } catch (e) {
        console.error(e.message, e.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 *
 * @param ctx koa2 ctx
 * @param userName
 * @param password
 * @returns {Promise<void>}
 */
async function login(ctx, userName, password){
    //获取用户信息
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if( !userInfo ){
        //登录失败
        return new ErrorModel(loginFailInfo)
    }

    //登录成功
    ctx.session.userInfo = userInfo
    return new SuccessModel()

}

module.exports = {
    isExist,
    register,
    login
}















