/**
 * @description utils controller
 * @author Alun
 */
const path = require('path')
const {ErrorModel, SuccessModel} = require('../model/ResModel')
const {uploadFileSizeFailInfo} = require('../model/ErrorInfo')
const fse = require('fs-extra')
//文件体积最大1兆
const MAX_SIZE = 1024 * 1024 * 1024
//文件夹路径
const DIST_FOLDER_PATH = path.join(__dirname, '..', '..', 'uploadFiles')
//是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then(exist => {
    if(!exist){
        fse.ensureDir(DIST_FOLDER_PATH)
    }
})
/**
 * 保存文件
 * @param name 文件名
 * @param type 文件类型
 * @param size 大小
 * @param filePath 路径
 * @returns {Promise<void>}
 */
async function saveFile({name, type, size, filePath}) {
    if (size > MAX_SIZE) {
        await fse.remove(filePath)
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    //移动文件
    const fileName = Date.now() + '.' + name //防止重名
    const distFilePath = path.join(DIST_FOLDER_PATH, fileName)
    await fse.move(filePath, distFilePath)
    //返回信息
    return new SuccessModel({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}

















