/**
 * @description 环境变量
 * @author Alun
 */

const ENV = process.env.NODE_ENV

module.exports = {
    isDev: ENV === 'dev',
    notDev: ENV !== 'dev',
    isProd: ENV === 'production',
    notProd: ENV !== 'production',
    isTest: ENV === 'dev',
    notTest: ENV !== 'dev',
}













