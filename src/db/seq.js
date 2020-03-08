/**
 * @description sequelize 实例
 * @author Alun
 */
const {isProd, isTest} = require('../utils/env')
const Sequelize = require('sequelize')
const {MYSQL_CONF} = require('../conf/db')
const {host, user, password, database} = MYSQL_CONF
const conf = {
    host: 'localhost',
    dialect: 'mysql'
}

if (isTest) {
    conf.logging = () => {}
}

//线上环境使用连接池
if (isProd) {
    conf.pool = {
        max: 5, //连接池中最大的链接数量
        min: 0, //最小
        idle: 10000 //如果一个连接池10s之内没有被使用，则释放
    }
}


const seq = new Sequelize(database, user, password, conf)

/*
测试链接
seq.authenticate().then(()=>{
    console.log('ok')
}).catch(()=>{
    console.log('err')
})*/


module.exports = seq
















