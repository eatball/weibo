/**
 * @description 数据格式化
 * @author Alun
 */

const {DEFAULT_PICTURE} = require('../conf/constant')


/**
 * 用户默认头像
 * @param obj 用户对象
 * @returns {{picture}|*}
 * @private
 */
function _formatUserPicture(obj) {
    if( obj.picture == null ){
        obj.picture = DEFAULT_PICTURE
    }
    return obj
}

/**
 * 格式化用户信息
 * @param list 用户列表或者单个用户对象
 * @returns {({picture}|*)[]|{picture}|*}
 */
function formatUser(list) {
    if( list == null ){
        return list
    }
    if( list instanceof Array){
        //数组
        return list.map(_formatUserPicture)
    }
    //单个对象
    return _formatUserPicture(list)
}

module.exports = {
    formatUser
}














