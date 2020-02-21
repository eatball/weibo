/**
 * @description sequelize同步数据库
 * @author Alun
 * @type {any}
 */

const seq = require('./seq')
//require('./model')

//测试链接
seq.authenticate().then(()=>{
    console.log('ok')
}).catch(()=>{
    console.log('err')
})

//执行同步
seq.sync({
    force:true //如果数据库中有这个表就直接删掉
}).then(()=>{
    console.log('同步成功')
    process.exit() //退出。不然占用进程
})















