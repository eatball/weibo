/**
 * @description 加密方法
 * @author Alun
 */

const crypto = require('crypto')

//密钥
const SECRET_KEY = 'yyy'

//md5加密
function md5(content){
    const md5 = crypto.createHash('md5')
    return md5.update(content).digest('hex')
}

function doCrypto(content) {
    const str = `password=${content}&key=${SECRET_KEY}`
    return md5(str)
}

module.exports = doCrypto















