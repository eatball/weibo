/**
 * @description 数据模型入口文件
 * @author Alun
 */

const User = require('./User')
const Blog = require('./blog')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}
















