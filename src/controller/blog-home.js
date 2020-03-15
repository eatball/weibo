/**
 * @description 首页
 * @author Alun
 */
const {createBlog} = require('../services/blog')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {createBlogFailInfo} = require('../model/ErrorInfo')
const xss = require('xss')
/**
 * 创建微博
 * @param userId
 * @param content
 * @param image
 * @returns {Promise<void>}
 */
async function create({userId, content, image}) {
    try {
        const blog = await createBlog({userId, content:xss(content), image})
        return new SuccessModel(blog)
    } catch (e) {
        console.error(e.message, e.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}


module.exports = {
    create
}













