/**
 * @description user service
 * @author Alun
 */
const {User} = require('../db/model/index')
const {formatUser} = require('./_format')

/**
 * 获取用户信息
 * @param userName 用户名
 * @param password 密码
 * @returns {Promise<void>}
 */
async function getUserInfo(userName, password) {

    //查询条件
    const whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, {password})
    }
    //查询
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        //未找到
        return result
    }
    //格式化
    const formatRes = formatUser(result.dataValues)

    return formatRes
}

/**
 * 创建用户
 * @param userName
 * @param password
 * @param gender
 * @param nickName
 * @returns {Promise<void>}
 */
async function createUser({userName, password, gender = 3, nickName}) {
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName
    })
    return result.dataValues
}

/**
 * 删除用户
 * @param userName
 * @returns {Promise<void>}
 */
async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    })
    // result 删除的行数
    return result > 0
}

/**
 * 修改用户信息
 * @param newPassword
 * @param newNickName
 * @param newPicture
 * @param newCity
 * @param userName
 * @param password
 * @returns {Promise<void>}
 */
async function updateUser({newPassword, newNickName, newPicture, newCity}, {userName, password}) {
    //拼接修改内容
    const updateData = {}
    if (newPassword) {
        updateData.password = newPassword
    }
    if (newNickName) {
        updateData.nickName = newNickName
    }
    if (newPicture) {
        updateData.picture = newPicture
    }
    if (newCity) {
        updateData.city = newCity
    }
    //拼接查询条件
    const whereData = {
        userName
    }
    if (password) {
        whereData.password = password
    }
    //执行
    const result = await User.update(updateData, {
        where: whereData
    })
    return result[0] > 0 //修改的行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}
















