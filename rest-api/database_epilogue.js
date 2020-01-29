
/*
The reason I change to finale-rest was because I had the next issue with Epilogue:

Unhandled rejection Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at validateHeader (_http_outgoing.js:500:11)
    at ServerResponse.setHeader (_http_outgoing.js:507:3)
    at ServerResponse.header (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/express/lib/response.js:771:10)
    at /Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/epilogue/lib/Controllers/list.js:170:13
    at tryCatcher (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/util.js:16:23)
    at Promise._settlePromiseFromHandler (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:547:31)
    at Promise._settlePromise (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:604:18)
    at Promise._settlePromise0 (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:649:10)
    at Promise._settlePromises (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:729:18)
    at Promise._fulfill (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:673:18)
    at Promise._resolveCallback (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:466:57)
    at Promise._settlePromiseFromHandler (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:559:17)
    at Promise._settlePromise (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:604:18)
    at Promise._settlePromise0 (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:649:10)
    at Promise._settlePromises (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:729:18)
    at Promise._fulfill (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:673:18)
    at PromiseArray._resolve (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise_array.js:127:19)
    at PromiseArray._promiseFulfilled (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise_array.js:145:14)
    at Promise._settlePromise (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:609:26)
    at Promise._settlePromise0 (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:649:10)
    at Promise._settlePromises (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/promise.js:729:18)
    at _drainQueueStep (/Users/omaryahir/zrepos/oauth2_course/rest-api/node_modules/bluebird/js/release/async.js:93:12)


*/

const Sequelize = require('sequelize')
const epilogue = require('epilogue')

const database = new Sequelize({
  dialect: 'sqlite',
  storage: './test.sqlite',
  operatorAliases: false
})

const Part = database.define('parts', {
  partNumber: Sequelize.STRING,
  modelNumber: Sequelize.STRING,
  name: Sequelize.STRING,
  description: Sequelize.TEXT
})

const initializeDatabase = async (app) => {
  epilogue.initialize({ app, sequelize: database })
  epilogue.resource({
    model: Part,
    endpoints: ['/parts', '/parts/:id']
  })

  await database.sync()
}

module.exports = initializeDatabase
