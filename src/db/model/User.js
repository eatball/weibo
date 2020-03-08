/**
 * @description 用户数据模型
 * @author Alun
 */

const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')
//创建User模型，数据表的名字是users

const User = seq.define('user', {
    username:{
        type: STRING, //类型
        allowNull:false, //不为空
        unique:true, //唯一
        comment:'用户名，唯一'
    },
    password:{
        type:STRING,
        allowNull:true,
        comment:'密码'
    },
    nickname:{
        type:STRING,
        allowNull:false,
        comment:'昵称'
    },
    gender:{
        type:DECIMAL,
        allowNull:false,
        defaultValue:3,
        comment:'性别(1 男，2 女，3 保密)'
    },
    picture:{
        type:STRING,
        allowNull:true,
        comment:'头像'
    },
    city:{
        type:STRING,
        comment:'城市'
    }
})

module.exports = User













