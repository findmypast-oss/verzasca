const request = require('superagent')

module.exports = function getStatus({url, auth}, build, done) {
  request
    .get(`${url}/httpAuth/app/rest/builds/?locator=buildType:${build}`)
    .set('Authorization', `Basic ${auth}`)
    .accept('application/json')
    .end(done)
}
