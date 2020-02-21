/**
 * @description jest server
 * @author Alun
 */

const request = require('supertest')
const server = require('../src/app').callback()

module.exports = request(server)














