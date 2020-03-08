/**
 * @description user controller
 * @author Alun
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const doCrypto = require('../utils/cryp')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { registerUserNameNotExistInfo, registerUserNameExistInfo, registerFailInfo, loginFailInfo, deleteUserFailInfo, changeInfoFailInfo } = require('../model/ErrorInfo')
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
 * 登录
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

/**
 * 删除一个用户
 * @param userName
 * @returns {Promise<ErrorModel|*|SuccessModel>}
 */
async function deleteCurUser(userName){
    //service
    const result = await deleteUser(userName)
    //成功
    if( result ){
        return new SuccessModel()
    }
    //失败
    return new ErrorModel(deleteUserFailInfo)

}

/**
 * 修改个人信息
 * @param ctx ctx
 * @param nickName 昵称
 * @param city 城市
 * @param picture 头像
 * @returns {Promise<void>}
 */
async function changeInfo(ctx, {nickName, city, picture}){
    const { userName } = ctx.session.userInfo
    if( !nickName ){
        nickName = userName
    }
    // service
    const result = await updateUser({newNickName:nickName, newPicture:picture, newCity:city}, {userName})
    if(result){
        //执行成功
        Object.assign(ctx.session.userInfo, {
            nickName, city, picture
        })
        return new SuccessModel()
    }
    //失败
    return new ErrorModel(changeInfoFailInfo)
}


module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo
}















