/**
 * @description 存储配置
 * @author Alun
 */
const { isProd } = require('../utils/env')
let REDIS_CONF = {
    port:6379,
    host:'127.0.0.1'
}

let MYSQL_CONF = {
    host:'localhost',
    user:'root',
    password:'123',
    port: '3306',
    database:'weibo'
}

if(isProd){
    //线上的redis配置
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
    //线上的mysql配置
    MYSQL_CONF = {
        host:'localhost',
        user:'root',
        password:'123',
        port: '3306',
        database:'weibo'
    }
}

module.exports = {
    REDIS_CONF,
    MYSQL_CONF
}















